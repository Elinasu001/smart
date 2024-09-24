//****************************************************************************************************
//	Filename     :   fin_cert.js
//	Description  :   금융인증서 업무공통 JavaScript
//****************************************************************************************************

var FinCert = function(){
	//금융인증서 SDK 주입 
	//개발
	if(SYSTEM_MODE!='L'){
//		document.write('<script src="https://t-4user.yeskey.or.kr/v1/fincert.js?dt='+SERVER_TIME.substr(0,8)+'"></script>');
		//운영
		document.write('<script src="https://4user.yeskey.or.kr/v1/fincert.js?dt='+SERVER_TIME.substr(0,8)+'"></script>');
	}
	
	/**
	 * 금융인증서 전자서명
	 * @param gubun 전자서명 구분
	 * @param msg 전자서명문 원본
	 * @param nFunc 전자서명후 콜백함수
	 */
	var _finSign = function(signType,msg,nFunc){
		/**
		 * 1. 세션체크
		 */
		try{
			if(SYSTEM_MODE=='L'){
				alert('로컬에서 금융인증서 지원 X');
				return false;
			}
			if(AUTH_RESULT=='E'){
				progressBar(false);
			}else{
				progressBar(true,'금융인증서 목록 조회');
				/**
				 * 2. FDS 기기등록정보 조회
				 */
				setTimeout(function(){
						authFDS(function(authFdsRes){
							/**
							 * 3. 금융인증서 서명
							 */
							init(signType,authFdsRes,msg,function(esgnCtns,certInfo){

								progressBar(true,'전자서명 검증 중');
								setTimeout(function(){
									/**
									 * 4. 전자서명 검증
									 */
									isVaild(esgnCtns,function(){
										/**
										 * 5. 서명후 결과 리턴
										 */
										progressBar(true,'전자서명 검증 완료');
										setTimeout(function(){
											nFunc(esgnCtns,certInfo);
										},1000);
									});
								},1000);
							});
						});
				},100);
			}
		}catch(e){
			errorAlert(e);
		}
	};
	
	var isVaild = function(esgnCtns,nStep){
		var isVaildForm = new makeForm("mOTPForm");
		addFormData(isVaildForm	, 	"signature"		, esgnCtns.signedVal);
		addFormData(isVaildForm	, 	"appNumber"	, (isEmpty($('#appNumber').val())? '31653174' : $('#appNumber').val()));
		addFormData(isVaildForm	,	'esgnCtns'		,esgnCtns.base64);
		doAction('FIN0000',isVaildForm,function(resDs){
			try{
				if(resDs.isValid=='Y'){
//					messageView('금융인증서 검증이 완료되었습니다.',function(){
						nStep();
//					});
				}else{
					messageView('유효하지 않는 인증서입니다.');
				}
			}catch(e){
				alert(e);
			}
		},function(resDs){
			messageErrorView("처리 중 오류가 발생하였습니다.");
		});
	}
	
	/**
	 * 실행여부
	 */
	var option = {
			open : true   //점검여부
			,MinWon : true //민원24 실행여부
			,NHIS : true //건강보험공단 실행여부
			,HomeTax : true //국세청 실행여부
	}
	/**
	 * 금융인증서 스크래핑
	 * @param gubun 전자서명 구분
	 * @param msg 전자서명문 원본
	 * @param nFunc 전자서명후 콜백함수
	 */
	var _finScraping = function(nFunc){

		messageView("주민등록초본 제출을 위해 주민등록 소재지 주소를 검색하여 주십시오.", function(){
		
		
			/**
			 * 1. 세션체크
			 */
			sessionCheck(function(){
				/**
				 * 2-1 사용할 스크래핑 전문기관 사용여부 (민원24)
				 */
				if(option.open){
					
					/**
					 * 3. 서버에서 요청할 값 취득
					 */
					getCooconReqData("FIN_CERT","02,03,04,05,06",function(cooconReqData){
						
						
						/**
						 * 4. 주소조회
						 */
						fnAddrSearch(function(resAddrJson){
							confirmView("&lt;&nbsp;" + JSON.stringify(resAddrJson.ZPCD_ADDR).split("\\")[0].replace('"', '') + "&gt;<br>정확한 주소지를 선택하셨습니까?<br>잘못 선택하셨을시 다시 시도해주세요.", 
								function(){
								/**
								 * 5. 주소조회후 맵핑
								 */
								addressMapping(resAddrJson,function(sido,gugun){
									cooconReqData.MinWon_3.Input.시도 = String(sido);
									cooconReqData.MinWon_3.Input.시군구 = gugun;
									
									/**
									 * 7. 스크랩핑 모듈 초기화
									 */
									cooconInit(function(){
										/**
										 * 8. 민원24 스크랩핑
										 */
										minwonRun(cooconReqData,function(minwonResult){
											
											/**
											 * 9. 건강보험공단 스크랩핑 
											 */
											nhisRun(cooconReqData,function(nhisResult){
												//사업자번호
												var napbu = nhisResult.params.NHIS_2.Output.Result.납부내역;
												
												if(napbu.length>0){
													var rbrNo = napbu[0].사업자번호;
													if(isNotEmpty(rbrNo)){
														cooconReqData.HOME_4.Input.사업자등록번호=rbrNo.substring(0,10);
														/**
														 * 10. 국세청 스크랩핑 
														 */
														homeRun(cooconReqData,function(homeResult){
															nFunc(homeResult.params);
	//														send(homeResult,function(scrpResJson){
	////															messageView("서류제출이 완료되었습니다.", function(){
	////																nFunc(scrpResJson);
	////															});
	//															nFunc(scrpResJson.params);
	//														});
														});
													}
												}
											});
										});
									});
								})	;
								},
								function() {
									_priScraping(nFunc);
							});
						});
					});
				}else{
					messageErrorView('점검중입니다.');
				}
			});
		});
	};
	
	/**
	 * 실제 업무 로직과 연동 하는 함수
	 */
	var _finScraping2 = function(company,scrapTarget,resAddrJson,nFunc){
		progressBar(true,"금융인증서 연결중");
		setTimeout(function(){
			if(SYSTEM_MODE=='L'){
				alert('로컬에서 금융인증서 지원 X');
				return false;
			}
			progressBar(false);
			if(AUTH_RESULT!='E'){
				getCooconReqData(company,scrapTarget,function(cooconReqData){
					/**
					 * 6. 주소조회후 맵핑
					 */
					addressMapping(resAddrJson,function(sido,gugun){
						cooconReqData.MinWon_3.Input.시도 = String(sido);
						cooconReqData.MinWon_3.Input.시군구 = gugun;
					
						/**
						 * 7. 스크랩핑 모듈 초기화
						 */
						cooconInit(function(){
							/**
							 * 8. 민원24 스크랩핑
							 */
							minwonRun(cooconReqData,function(minwonResult){
								
								/**
								 * 9. 건강보험공단 스크랩핑 
								 */
								nhisRun(cooconReqData,function(nhisResult){
									//사업자번호
									var napbu = nhisResult.params.NHIS_2.Output.Result.납부내역;
									
									if(napbu.length>0){
										var rbrNo = napbu[0].사업자번호;
										if(isNotEmpty(rbrNo)){
											cooconReqData.HOME_4.Input.사업자등록번호=rbrNo.substring(0,10);
											/**
											 * 10. 국세청 스크랩핑 
											 */
											homeRun(cooconReqData,function(homeResult){
												nFunc(homeResult.params);
											});
										}
									}
								});
							});
						});
					});
				});
			}
		},1000);
	};
	
	
	/**
	 * 금융인증서 초기화
	 */
	var init = function(signType,authFdsRes,msg,nFunc){
		
		getAppData('autoConnInfo,custNo',function(resAppData){

//			var orgCode='DF40330000';//개발
			var orgCode='RF40330000';//운영
//			var apiKey='c3c16d90-560a-4c0c-a1da-9c37b985fd01'; //개발
			var apiKey='7760573b-9530-4a52-9de6-14db2ffc5351';//운영
			var authFds=getParseData(authFdsRes);
			
			//FDS 기기식별값 파싱
			var autoConnInfo=isEmpty(resAppData.params.autoConnInfo)?'':resAppData.params.autoConnInfo;
			var autoConnInfoYn=isEmpty(autoConnInfo)?false:true;
			
			//아이폰인경우 uuid값이 안뽑힐수 있어서 방어로직
			var inca01=authFds.incaDtoStr.uuid;
			var inca02=authFds.uuid;
			var inca03=authFds.uuid2;

			var uuid=(IS_MOBILE && IS_IPHONE)?inca03:inca01;
			if(isEmpty(uuid)){
				uuid=(IS_MOBILE && IS_IPHONE)?inca01:inca02;
			}
			if(isEmpty(uuid)){
				uuid=(IS_MOBILE && IS_IPHONE)?inca02:inca03;
			}
			if(isEmpty(uuid)){
				uuid=resAppData.params.custNo;
			}

			var clientOrigin  = authFds.incaDtoStr.packageName;

			if(isEmpty(uuid)){
				messageErrorView("기기 정보 처리 중 오류가 발생하였습니다.");
			}
			else{
				var iniVal = {
						'orgCode'		:orgCode 														//고객사 기관코드
						,'apiKey'			:apiKey															//고객사 apiKey
						,'lang'			:'kor'																//언어설정
						,'clientType'	:(IS_MOBILE && IS_IPHONE) ? 'IOS' : 'ANDROID'	//OS종류
						,'clientOrigin'	:clientOrigin													//앱 번들ID
						,'uniqVal'		:uuid																//핸드폰 고유식별코드
						,'useAutoConnInfo':true														//자동연결정보주입
						,'success' : function(){					//성공 콜백
							//자동 고객정보 주입
							setAuthData(function(){
								makeAutoConnInfo(autoConnInfoYn,autoConnInfo,function(){
									sign(signType,msg,nFunc);
								});
							});
						}
						,'fail':function(error){					//실패 콜백
							errorMsg(error);
						}
				};

				try{
					FinCert.Sdk.init(iniVal);
				}catch(e){
					errorAlert(e);
				}
			}
		});
	};
	
	/**
	 * 금융인증서 전자서명
	 */
	var sign = function(signType,msg,nFunc){
		var param={
				'signFormat':{
					'type':'CMS',
					'CMSInfo':{
						'generalSyntax':true,
						'includeR':true,
						'ssn':'dummy'
					}
				},
				'content':{
					'plainText':{
						'plainTexts':[msg]
						,'encoding':'UTF-8'
					}
				},
				'algorithms':'RSASSA-PKCS1-v1_5_SHA256',
				'view':{
					'lastAccessCert':false,
					'oid':{
						'1.2.410.200005.1.1.1.10':true
					},
					'enableTextView':false
				},
				'info':{
					'signType':signType
				}
				,'success':function(result){					//성공 콜백
//					alert('===금융인증서정보===\n'+JSON.stringify(result));
					progressBar(true,'전자서명 중');
					setTimeout(function(){
						var esgnCtns=Object();
						esgnCtns.certSeqNum=result.certSeqNum;
						esgnCtns.signedVal=result.signedVals[0];
						esgnCtns.rValue=result.rValue;
						convertBase64UrlToBase64(esgnCtns.signedVal,function(base64){
							esgnCtns.base64=base64;
							getSignerCertFromSignedVal(msg,esgnCtns,nFunc);
						});
					},1000);
				}
				,'fail':function(error){					//실패 콜백
					messageView('금융인증서비스 창이 종료되었습니다.');
				}
		};
		try{
			FinCert.Sdk.sign(param);
		}catch(e){
			errorAlert(e);
		}
	};
	/**
	 * 금융인증서 전자서명한 결과로 인증서 정보 추출
	 */
	var getCertInfo = function(msg,esgnCtns,certificate,nFunc){
		var param={
			'certificate':certificate
			,'success':function(certInfo){					//성공 콜백
				progressBar(false);
				nFunc(esgnCtns,certInfo);
			}
			,'fail':function(error){					//실패 콜백
				errorMsg(error);
			}
		};
		try{
			FinCert.Sdk.getCertInfo(param);
		}catch(e){
			errorAlert(e);
		}
	};
	/**
	 * 금융인증서 CMS포맷 서명문 인증서 추출
	 */
	var getSignerCertFromSignedVal = function(msg,esgnCtns,nFunc){
		var param={
			'signedVal':esgnCtns.signedVal
			,'success':function(result){					//성공 콜백
				esgnCtns.certificate=result.certificate;
				getCertInfo(msg,esgnCtns,result.certificate,nFunc);
			}
			,'fail':function(error){					//실패 콜백
				errorMsg(error);
			}
		};
		try{
			FinCert.Sdk.getSignerCertFromSignedVal(param);
		}catch(e){
			errorAlert(e);
		}
	};
	/**
	 * 금융인증서 자동연결 정보를 생성
	 */
	var makeAutoConnInfo = function(autoConnInfoYn,autoConnInfo,nStep){
		var param={
			'success':function(result){					//성공 콜백
				setAutoConnInfo(autoConnInfoYn,autoConnInfo,result.autoConnInfo,nStep);
			}
			,'fail':function(error){					//실패 콜백
				errorMsg(error);
			}
		};
		try{
			FinCert.Sdk.makeAutoConnInfo(param);
		}catch(e){
			errorAlert(e);
		}
	};
	/**
	 * 금융인증서 로그인정보 자동셋팅  이유:본인인증을 하고 들어온 본 앱에서 다른사람 명의 인증서 로그인 차단하기위한 목적
	 */
	var setAuthData = function(nStep){
		var param={
				'phone':'+82'+MNO.substr(1,MNO.length)
				,'name':CUST_NM
				,'birthday':((SEX_CD=='1'||SEX_CD=='2')?'19'+RBRNO1:'20'+RBRNO1)
//				,'disableInput':(SYSTEM_MODE=='R') ? true : false
				,'disableInput':false
				,'success':function(result){					//성공 콜백
					nStep();
				}
				,'fail':function(error){					//실패 콜백
					errorMsg(error);
				}
		};
		try{
			FinCert.Sdk.setAuthData(param);
		}catch(e){
			errorAlert(e);
		}
	};
	/**
	 * 금융인증서 자동연결 정보를 주입
	 */
	var setAutoConnInfo = function(autoConnInfoYn,autoConnInfo1,autoConnInfo2,nStep){
		var autoConnInfo = (autoConnInfoYn ? autoConnInfo1 : autoConnInfo2);
		var param={
			'autoConnInfo':autoConnInfo,
			'success':function(result){					//성공 콜백
				var needAutoConnInfo=result.needAutoConnInfo;
				if(result.needAutoConnInfo){
					messageErrorView('금융인증서 로그인 본인인증을 진행합니다.',function(){
						setAutoConnInfo(!autoConnInfoYn,autoConnInfo1,autoConnInfo2,nStep);
					});
				}else{
					setAppData({'autoConnInfo':autoConnInfo});
					nStep();
				}
			},
			'fail':function(error){					//실패 콜백
				errorMsg(error);
			}
		};
		try{
			FinCert.Sdk.setAutoConnInfo(param);
		}catch(e){
			errorAlert(e);
		}
	};
	/**
	 * base64 url => base64
	 */
	var convertBase64UrlToBase64 = function(base64Url,nStep){
		var param={
				'base64Url':base64Url
				,'success':function(result){					//성공 콜백
					nStep(result.base64);
				}
				,'fail':function(error){					//실패 콜백
					errorMsg(error);
				}
		}
		try{
			FinCert.Sdk.convertBase64UrlToBase64(param);
		}catch(e){
			errorAlert(e);
		}
	};
	
	
	
	
	/**
	 * 쿠콘 솔루션 요청 데이터 생성
	 */
	var getCooconReqData = function(compnay,scrapTarget,nFunc){
		var com0015Form = makeForm("com0015Form");
		addFormData(com0015Form, "txGbnCd", "S");
		addFormData(com0015Form, "scrapTarget", scrapTarget); // 스크래핑 대상
		doAction("COM0015", com0015Form,function(com0015Res){
			var scrapExecYn = com0015Res.scrapExecYn; // 스크래핑기동여부
			var addrInqYn = com0015Res.addrInqYn;     // 주소조회필요여부
			var scrpResJson = com0015Res.scrpResJson; // 스크래핑 응답JSON
					
			//서버에서 개인정보 조회
			var scrpReqJson = getParseData(com0015Res.scrpReqJson);
			var rrn = scrpReqJson.params.MinWon_1.Input.주민등록번호;
			var cooconReqData = {
					"MinWon_0":{"Module":"MinWon","Class":"민원신청조회","Job":"간편인증","Input":{"핸드폰번호":MNO}}
					,"MinWon_1":{"Module":"MinWon","Class":"민원신청조회","Job":"비회원로그인","Input":{"구분":"1","이름":CUST_NM,"주민등록번호":rrn,"연락처":"","핸드폰번호":MNO,"법인명":"","법인등록번호":"","사업자등록번호":"","보안문자":"","로그인방식":compnay}}
					,"MinWon_2":{"Module":"MinWon","Class":"민원신청조회","Job":"FIN_CERT","Input":{"res":[{"signedVals":[],"certSeqNum":""}]}}
					,"MinWon_3":{"Module":"MinWon","Class":"민원신청조회","Job":"주민등록표등초본교부","Input":{"민원사무구분":"2","신청내용출력여부":"11111111","세대원_성명":"","세대원_주민등록번호":"","파일저장":"","시도":"","시군구":""}}
					,"MinWon_4":{"Module":"MinWon","Class":"민원신청조회","Job":"로그아웃","Input":{}}
					,"NHIS_0":{"Module":"NHIS","Class":"민원신청조회","Job":"로그인","Input":{"로그인방식":compnay,"성명":CUST_NM,"핸드폰번호":MNO,"생년월일":(((SEX_CD=='1'||SEX_CD=='2')?'19':'20') + RBRNO1),"통신사":(((MP_TSCD_DVCD.length==1)?'0':'')+MP_TSCD_DVCD)}}
					,"NHIS_1":{"Module":"NHIS","Class":"민원신청조회","Job":"FIN_CERT","Input":{"인증서등록":"","주민사업자번호":rrn,"res":[{"signedVals":[],"certSeqNum":""}]}}
					,"NHIS_2":{"Module":"NHIS","Class":"민원신청조회","Job":"납부확인서","Input":{"팩스번호":"","팩스전송여부":"","조회종료년월": scrpReqJson.params.NHIS_2.Input.조회종료년월,"조회시작년월":scrpReqJson.params.NHIS_2.Input.조회시작년월}}
					,"NHIS_3":{"Module":"NHIS","Class":"민원신청조회","Job":"자격득실확인서","Input":{}}
					,"NHIS_4":{"Module":"NHIS","Class":"민원신청조회","Job":"로그아웃","Input":{}}//NONMEMBER_
					,"HOME_1":{"Module":"HomeTax","Class":"PC조회발급서비스","Job":"로그인","Input":{"로그인방식":(compnay),"성명":CUST_NM,"핸드폰번호":MNO,"주민등록번호":rrn,"통신사":(((MP_TSCD_DVCD.length==1)?'0':'')+MP_TSCD_DVCD)}}
					,"HOME_2":{"Module":"HomeTax","Class":"PC조회발급서비스","Job":"FIN_CERT","Input":{"res":[{"signedVals":[],"certSeqNum":"","rValue":"","certificate":""}]}}
					,"HOME_3":{"Module":"HomeTax","Class":"PC조회발급서비스","Job": "소득금액증명", "Input":{"증명구분": "101","과세시작년": scrpReqJson.params.HOME_3.Input.과세시작년,"과세종료년":scrpReqJson.params.HOME_3.Input.과세종료년,"주소_공개여부":"Y","주민등록번호_공개여부":"Y"}}
					,"HOME_4":{"Module":"HomeTax","Class":"PC조회발급서비스","Job": "부가가치세과세표준증명원", "Input":{"사업자등록번호": "","과세시작월": scrpReqJson.params.HOME_4.Input.과세시작월,"과세종료월":scrpReqJson.params.HOME_4.Input.과세종료월,"주민등록번호_공개여부":"Y"}}	   
			}
			nFunc(cooconReqData);
		});
	};
	
	
	/**
	 * 서류제출
	 */
	var send = function(scrapDataStr,nFunc){
		var scrapDataStr = getParseData(scrapDataStr);
		var com0015Form = makeForm("com0015Form");
		addFormData(com0015Form, "txGbnCd", "I");
		addFormData(com0015Form, "scrapData", JSON.stringify(scrapDataStr));
		doAction("COM0015", com0015Form, 
			function(com0015Res){
				var msg='';
				if(scrapDataStr.params.MinWon_2.Output.ErrorCode != '00000000'){
					msg+='<br><div style="text-align: left;">[민원24] 주민등록초본 : '+scrapDataStr.params.MinWon_2.Output.ErrorMessage+"</div>";
				}
				if(scrapDataStr.params.NHIS_2.Output.ErrorCode != '00000000'){
					msg+='<br><div style="text-align: left;">[건강보험공단] 납부내역 : '+scrapDataStr.params.NHIS_2.Output.ErrorMessage+"</div>";
				}
				if(scrapDataStr.params.NHIS_3.Output.ErrorCode != '00000000'){
					msg+='<br><div style="text-align: left;">[건강보험공단] 자격득실확인서 : '+scrapDataStr.params.NHIS_3.Output.ErrorMessage+"</div>";
				}
				if(scrapDataStr.params.HOME_3.Output.ErrorCode != '00000000'){
					msg+='<br><div style="text-align: left;">[국세청] 부가가치세증명원 : '+scrapDataStr.params.HOME_3.Output.ErrorMessage+"</div>";
				}
				if(scrapDataStr.params.HOME_4.Output.ErrorCode != '00000000'){
					msg+='<br><div style="text-align: left;">[국세청] 소득금액증명원 : '+scrapDataStr.params.HOME_4.Output.ErrorMessage+"</div>";
				}
				if(msg==''){
					nFunc(scrapDataStr);
				}else{
					messageView(msg,function(){
						nFunc(scrapDataStr);
					});
				}
			}, 
			function(){messageErrorView("서류제출 처리 중 오류가 발생하였습니다.");});
	}
	/**
	 * 주소검색후 민원24 스크래핑용 주소로 변환
	 */
	var addressMapping = function(resAddrJson,nFunc){
		var sidoMapping = "서울:서울특별시,부산:부산광역시,대구:대구광역시,인천:인천광역시,광주:광주광역시,대전:대전광역시,울산:울산광역시,세종:세종특별자치시,경고:경기도,강원:강원도,충북:충청북도,충남:충청남도,전북:전라북도,전남:전라남도,경북:경상북도,경남:경상남도,제주:제주특별자치도";
		var sidoMappingArry = sidoMapping.split(",");
		var zpcdAddr = resAddrJson.ZPCD_ADDR;
		var sido = zpcdAddr.split(" ")[0];   
		var gugun = zpcdAddr.split(" ")[1];
		
		for (var i=0; i < sidoMappingArry.length; i++) {
			//if (sido == sidoMappingArry[i]) {
			if (sidoMappingArry[i].includes(sido)) {
				if (sido == "세종") {
					sido = sidoMappingArry[i].split(":")[1];
					gugun = sido;
				} else {
					sido = sidoMappingArry[i].split(":")[1];	
				}
				break;
			}
		}		
		nFunc(String(sido),gugun);
	}
	
	/**
	 * 로그인 세션체크
	 */
	var sessionCheck = function(nFunc){
		try{
			if(AUTH_RESULT=='E'){
				progressBar(false);
			}else{
				progressBar(true);
				setTimeout(function(){
					progressBar(false);
					nFunc();
				},100);
			}
		}catch(e){
			errorAlert(e);
		}
	};
	
	/**
	 * 스크랩핑 모듈 초기화
	 */
	var cooconInit = function(nFunc){
		var reqData = {
				'serviceCd':'PRI_SCRAPING'
				,'params':{
					"PRCS_DVCD":'I' //I : 모듈 초기화
				}
		};
		nativeCall(reqData,function(res){
			nFunc();
		},'스크래핑 진행중입니다. (1/11)\n\n스크래핑 모듈 초기화\n\n5~10초 소요됩니다 잠시만 기다려주세요.');
	};

	/**
	 * 스크랩핑[건강보험공단]
	 */
	var nhisRun = function(cooconReqData,nFunc){
		if(option.NHIS){
			/**
			 * 1. 건강보험공단 사설인증 로그인요청
			 */
			priNhisReq(cooconReqData,nFunc,function(){

				/**
				 * 2. 건강보험공단 금융인증 전자서명
				 */
				_finSign('01','공인인증서로그인',function(esgnCtns,certInfo){
					cooconReqData.NHIS_1.Input.res[0].signedVals = [esgnCtns.base64];
					cooconReqData.NHIS_1.Input.res[0].certSeqNum = String(certInfo.certSeqNum);
					
				
					/**
					 * 3. 건강보험공단 사설인증 로그인 응답
					 */
					priNhisRes(cooconReqData,function(){
						
						progressBar(true,'건강보험공단 연결');
						setTimeout(function(){
							/**
							 * 4. 건강보험공단
							 */
							nhisScraping(cooconReqData,function(resData){
								progressBar(true,'건강보험공단 연결 종료');
								setTimeout(function(){
									nFunc(resData);
								},1000);
							});
						},1000);
					});
				});
			});
		}else{
			nFunc(cooconReqData);
		}
	};
	
	/**
	 * 스크랩핑[국세청]
	 */
	var homeRun = function(cooconReqData,nFunc){
		if(option.HomeTax){
			/**
			 * 1. 국세청 사설인증 로그인요청
			 */
			priHomeReq(cooconReqData,nFunc,function(){

				/**
				 * 2. 국세청 금융인증 전자서명
				 */
				_finSign('01','공인인증서로그인',function(esgnCtns,certInfo){
					cooconReqData.HOME_2.Input.res[0].signedVals = [esgnCtns.base64];
					cooconReqData.HOME_2.Input.res[0].certSeqNum = String(certInfo.certSeqNum);
					cooconReqData.HOME_2.Input.res[0].certificate = esgnCtns.certificate;
					cooconReqData.HOME_2.Input.res[0].rValue = esgnCtns.rValue;
					
					/**
					 * 3. 국세청 사설인증 로그인 응답
					 */
					priHomeRes(cooconReqData,function(){
						/**
						 * 4. 국세청
						 */
						homeScraping(cooconReqData,function(result){
							nFunc(result);
						});
					});
				});
			});
		}else{
			nFunc(cooconReqData);
		}
	};
	
	/**
	 * 스크랩핑[민원24]
	 */
	var minwonRun = function(cooconReqData,nFunc){
		if(option.MinWon){
			/**
			 * 1. 민원24 보안문자 요청
			 */
			secuNum(function(secuNumStr){
				cooconReqData.MinWon_1.Input.보안문자=secuNumStr;
				/**
				 * 2. 민원24 금융인증 로그인요청
				 */
				finMinwonReq(cooconReqData,nFunc,function(){
					
					/**
					 * 3. 민원24 금융인증 전자서명
					 */
					_finSign('01','공인인증서로그인',function(esgnCtns,certInfo){
						
						cooconReqData.MinWon_2.Input.res[0].signedVals = [esgnCtns.base64];
						cooconReqData.MinWon_2.Input.res[0].certSeqNum = String(certInfo.certSeqNum);
						
						/**
						 * 4. 민원24 사설인증 로그인 응답
						 */
						finMinwonRes(cooconReqData,function(){
							/**
							 * 5. 민원24 스크래핑 실행
							 */
							finMinwonLogout(cooconReqData,function(result){
								var temp = result.params.MinWon_2.Output;
								result.params.MinWon_2.Output = result.params.MinWon_3.Output;
								result.params.MinWon_3.Output = temp;
								nFunc(result);
							});
						});
					});
					
				});
			});
		}else{
			nFunc(cooconReqData);
		}
	}
	
	var finScrapSign = function(nStep){

		/**
		 *  금융인증서 서명
		 */
		_finSign('01','공인인증서로그인',function(esgnCtns,certInfo){
			alert('===전자서명문===\n'+esgnCtns.base64);
			alert('===금융인증서정보===\n'+JSON.stringify(certInfo));
			nStep(esgnCtns,certInfo)
		});
		
	}
	
	
	/**
	 * 민원24 보안문자 호출
	 */
	var secuNum = function(nStep){
		var reqData = {
				'serviceCd':'PRI_SCRAPING'
				,'params':{
					"PRCS_DVCD":'S' //S :보안코드요청
			}
		};
		//보안문자 호출
		nativeCall(reqData,function(res){
			var resData = getParseData(res);
			if(resData.resultCd=='0000'){
				var code = resData.params.code;
				nStep(code);
			}
			else if(resData.resultCd=='9998'){
				editConfirmView('스크래핑을 취소하시겠습니까?','','재시도','취소',function(){
					secuNum(nStep);
				},function(){
					messageView('스크래핑을 취소했습니다.');
				});
			}
			else{
				secuNum(nStep);
			}
		},'스크래핑 진행중입니다. (2/11)\n\n보안문자 요청\n\n5~10초 소요됩니다 잠시만 기다려주세요.');
	};

	/**
	 * 민원24 로그인 요청
	 */
	var finMinwonReq = function(cooconReqData,nFunc,nStep){
		var reqData = {
				'serviceCd':'PRI_SCRAPING'
				,'params':{
					"PRCS_DVCD":'MR' // MR :민원24 로그인 
					,"MinWon_1":cooconReqData.MinWon_1
					,"MinWon_3":cooconReqData.MinWon_3
				}
		};
		nativeCall(reqData,function(res){
			try{
				var resData = getParseData(res);
				var MinWon_1 = resData.params.MinWon_1;
				var MinWon_3 = resData.params.MinWon_3;
				
//				var signParam = MinWon_3.Output.Result.req.SignParam;
				
				
				if(MinWon_1.Output.ErrorCode == '00000000'){
					nStep();
				}
				/**
				 * 보안문자 틀렸을때 재실행
				 */
				else{
					var errMsg = '';
					if(isEmpty(MinWon_1.Output.ErrorMessage)){
						errMsg='보안문자 인증에 실패했습니다.';
					}else{
						errMsg=MinWon_1.Output.ErrorMessage;
					}
					editConfirmView(errMsg,'','재시도','취소',function(){
						minwonRun(cooconReqData,nFunc);
					},function(){
						messageView('스크래핑을 취소했습니다.');
					});
				}
			}catch(e){
				messageView('스크래핑오류(3/11) : '+e);
			}
		},'스크래핑 진행중입니다. (3/11)\n\n민원24 로그인 요청\n\n5~10초 소요됩니다 잠시만 기다려주세요.');
	};

	/**
	 * 민원24 로그인 응답
	 */
	var finMinwonRes = function(cooconReqData,nStep){
		var reqData = {
				'serviceCd':'PRI_SCRAPING'
				,'params':{
					"PRCS_DVCD":'MS' // MR :민원24 로그인 인증
					,"MinWon_2":cooconReqData.MinWon_2
				}
		};
		
		nativeCall(reqData,function(res){
			try{
				var resData = getParseData(res);
				var MinWon_2 = resData.params.MinWon_2;
				
				if(MinWon_2.Output.ErrorCode == '00000000'){
					nStep();
				}else{
					var showMsg = '<br>'+MinWon_2.Output.ErrorMessage+'<br>';
					editConfirmView(showMsg,'','재인증','취소',function(){
						finMinwonRes(cooconReqData,nStep);
					},function(){
						editConfirmView('스크래핑을 취소하시겠습니까?','','예','재인증',function(){
							messageView('스크래핑을 취소했습니다.');
						},function(){
							finMinwonRes(cooconReqData,nStep);
						});
					});
				}
			}catch(e){
				messageView('스크래핑오류(4/11) : '+e);
			}
		},'스크래핑 진행중입니다. (4/11)\n\n민원24 로그인 응답\n\n1~2분 소요됩니다 잠시만 기다려주세요.');
	};
	
	/**
	 * 민원24 로그아웃
	 */
	var finMinwonLogout = function(cooconReqData,nStep){
		var reqData = {
				'serviceCd':'PRI_SCRAPING'
				,'params':{
					"PRCS_DVCD":'MP' //S :로그아웃
					,"MinWon_4":cooconReqData.MinWon_4
				}
		};
		
		nativeCall(reqData,function(res){
			var resData = getParseData(res);
			nStep(resData);
		},'스크래핑 진행중입니다. (5/11)\n\n주민등록초본 출력\n\n1~2분 소요됩니다 잠시만 기다려주세요.');
	};
	

	/**
	 * 건강보험공단 로그인요청
	 */
	var priNhisReq = function(cooconReqData,nFunc,nStep){
		var reqData = {
				'serviceCd':'PRI_SCRAPING'
				,'params':{
					"PRCS_DVCD":'NR' // NR : 건강보험공단 로그인 요청
					,"NHIS_0":cooconReqData.NHIS_0
				}
		};
		
		nativeCall(reqData,function(res){
			try{
				var resData = getParseData(res);
				var NHIS_0 = resData.params.NHIS_0;
				if(NHIS_0.Output.ErrorCode == '00000000'){
					nStep();
				}
				else{
					messageView(NHIS_0.Output.ErrorMessage);
				}
			}catch(e){
				messageView('스크래핑오류(6/11) : '+e);
			}
		},'스크래핑 진행중입니다. (6/11)\n\n건강보험공단 로그인 요청\n\n1~2분 소요됩니다 잠시만 기다려주세요.');
	}

	/**
	 * 건강보험공단 로그인 응답
	 */
	var priNhisRes = function(cooconReqData,nStep){
		var reqData = {
				'serviceCd':'PRI_SCRAPING'
				,'params':{
					"PRCS_DVCD":'NS' // NS : 건강보험공단 로그인 응답
					,"NHIS_1":cooconReqData.NHIS_1
				}
		};
		
		nativeCall(reqData,function(res){
			try{
				var resData = getParseData(res);
				var NHIS_1 = resData.params.NHIS_1;
				
				if(NHIS_1.Output.ErrorCode == '00000000'){
					nStep();
				}else{
					var showMsg = '<br>'+NHIS_1.Output.ErrorMessage+'<br>';
					editConfirmView(showMsg,'','재인증','취소',function(){
						priNhisRes(cooconReqData,nStep);
					},function(){
						editConfirmView('스크래핑을 취소하시겠습니까?','','예','재인증',function(){
							messageView('스크래핑을 취소했습니다.');
						},function(){
							priNhisRes(cooconReqData,nStep);
						});
					});
				}
			}catch(e){
				messageView('스크래핑오류(7/11) : '+e);
			}
		},'스크래핑 진행중입니다. (7/11)\n\n건강보험공단 로그인\n\n1~2분 소요됩니다 잠시만 기다려주세요.');
	};
	
	/**
	 * 건강보험공단 스크래핑
	 */
	var nhisScraping = function(cooconReqData,nStep){
		var reqData = {
				'serviceCd':'PRI_SCRAPING'
				,'params':{
					"PRCS_DVCD":'NP' // 
					,"NHIS_2":cooconReqData.NHIS_2
					,"NHIS_3":cooconReqData.NHIS_3
				}
		};
		//왜인지는 모르지만 로딩바가 끈키는 현상으로인해 연속 호출
		var ment = '스크래핑 진행중입니다. (8/11)\n\n납부내역,자격득실확인서\n\n1~2분 소요됩니다 잠시만 기다려주세요.';
		progressBar(true,ment);
		setTimeout(function(){
			nativeCall(reqData,function(res){
				try{
					var resData = getParseData(res);
					progressBar(true,ment);
					setTimeout(function(){
						nStep(resData);
					},1000);
				}catch(e){
					messageView('스크래핑오류(8/11) : '+e);
				}
			},ment);
		},100);
		
	};
	
	/**
	 * 국세청 로그인요청
	 */
	var priHomeReq = function(cooconReqData,nFunc,nStep){
		var reqData = {
				'serviceCd':'PRI_SCRAPING'
				,'params':{
					"PRCS_DVCD":'HR' // HR : 국세청 로그인 요청
					,"HOME_1":cooconReqData.HOME_1
				}
		};
		nativeCall(reqData,function(res){
			try{
				var resData = getParseData(res);
				var HOME_1 = resData.params.HOME_1;
				
				
				if(HOME_1.Output.ErrorCode == '00000000'){
					nStep();
				}
				
				else{
					messageView(HOME_1.Output.ErrorMessage);
				}
			}catch(e){
				messageView('스크래핑오류(9/11) : '+e);
			}
		},'스크래핑 진행중입니다. (9/11)\n\n국세청 로그인 요청\n\n1~2분 소요됩니다 잠시만 기다려주세요.');
	}
	/**
	 * 국세청 로그인 응답
	 */
	var priHomeRes = function(cooconReqData,nStep){
		var reqData = {
				'serviceCd':'PRI_SCRAPING'
				,'params':{
					"PRCS_DVCD":'HS' // HS : 국세청 로그인 응답
					,"HOME_2":cooconReqData.HOME_2
				}
		};
		
		nativeCall(reqData,function(res){
			try{
				var resData = getParseData(res);
				var HOME_2 = resData.params.HOME_2;

				nStep();
			}catch(e){
				messageView('스크래핑오류(10/11) : '+e);
			}
			messageView('스크래핑오류(10/11) : '+e);
		},'스크래핑 진행중입니다. (10/11)\n\n국세청 로그인 응답\n\n1~2분 소요됩니다 잠시만 기다려주세요.');
	};
	/**
	 * 국세청 스크래핑
	 */
	var homeScraping = function(cooconReqData,nStep){
		var reqData = {
				'serviceCd':'PRI_SCRAPING'
				,'params':{
					"PRCS_DVCD":'HP' // 
					,"HOME_3":cooconReqData.HOME_3
					,"HOME_4":cooconReqData.HOME_4
				}
		};
		
		nativeCall(reqData,function(res){
			var resData = getParseData(res);
			try{
//				var HOME_3 = getParseData(res.params.HOME_3);
//				var HOME_4 = getParseData(res.params.HOME_4);
//				if(HOME_3.Output.ErrorCode=='00000000'){
//					nStep(res);
//				}else{
//					messageView(HOME_3.Output.ErrorMessage);
//				}
				nStep(resData);
			}catch(e){
				messageView('스크래핑오류(11/11) : '+e);
			}
		},'스크래핑 진행중입니다. (11/11)\n\n부가가치세증명원,소득금액증명원 출력\n\n1~2분 소요됩니다 잠시만 기다려주세요.');
	};

	/**
	 * 네이티브 호출
	 */
	var nativeCall = function(reqData,nStep,msg){
		if(isNotEmpty(msg)){
			progressBar(true,msg);
		}else{
			progressBar(true);
		}
		setTimeout(function(){
			ftBridgeExcutor.postMessage(reqData, 
				function(result){
					nStep(result);
//					setTimeout(function(){
//						progressBar(false);
//					},5000);
				}
				,function(result){
					progressBar(false);
					setTimeout(function(){
						alert(JSON.stringify(result));
					},100);
			});
		},100);
		
	};
	
	var getParseData = function(reqData){
		var parseStr = JSON.stringify(reqData).replace(/"{/g, '{').replace(/}"/g, '}').replace(/\\/g, "");
		return JSON.parse(parseStr);
	}
	
	return {
		finSign : _finSign
		,finScraping : _finScraping
		,finScraping2 : _finScraping2
	};
}();