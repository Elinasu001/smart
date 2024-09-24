/**
 * 네이티브 테스트 코드
 */
/**
 * TODO 요 밑으로는 남교 네이티브 테스트
 * 
 * 
 **/ 
var namkyoCustNo='56603505001';

//FDS
function nativeTest01() {
	var reqJson = {
			"serviceCd":"FDS"
		   ,"params":{"PRCS_DVCD":"U",  // PRCS_DVCD: U - UUID요청 , D - Data요청 
			          "key":""			// KEY:암호화키
			}	  
		};
	ftBridgeExcutor.postMessage(reqJson, 
		function(resJson){ // Success Function
			if (isNotEmpty(resJson.resultCd) && resJson.resultCd == '0000') { // 처리 정상
				var com0000Form = makeForm("com0000Form");
				addFormData(com0000Form, "uuid", resJson.params.uuid);
				addFormData(com0000Form, "txGbnCd", "KEY");
				doAction("COM0000", com0000Form
				,function(com0000Res){
					reqJson.params.PRCS_DVCD = "D"; 		// 데이터요청
					reqJson.params.key = com0000Res.key;	// 암호화 키
					ftBridgeExcutor.postMessage(reqJson
					,function(dataResJson){
						var com0000Form2 = makeForm("com0000Form2");
						addFormData(com0000Form2, "txGbnCd", "DEC");
						addFormData(com0000Form2, "uuid", dataResJson.params.uuid);
						addFormData(com0000Form2, "key", 	dataResJson.params.key);
						addFormData(com0000Form2, "data", dataResJson.params.data);
						addFormData(com0000Form2, "UUID1", 	dataResJson.params.UUID1);
						addFormData(com0000Form2, "UUID2", dataResJson.params.UUID2);
						doAction("COM0000", com0000Form2
								,function(com0000Res2){
									if (com0000Res2.APP_HEADER.respCd=='N00003') {
										messageView(com0000Res2);
									} else {
										messageErrorView(com0000Res2.APP_HEADER.respMsg);
									}
								}
						        ,function(com0000Res2){
						        	var errMesg = com0000Res2.APP_HEADER.respMsg;
						        	if (errMesg == '') errMesg = "서버에서 응답이 없습니다. 잠시 후 다시 시도하여 주십시오.";
						        	messageErrorView(errMesg);
						        }, false);
					}
					,function(dataResJson){
						messageErrorView("기기 정보 조회 중 오류가 발생하였습니다.");		
					}, false);
				}
				,function(com000Res){
					messageErrorView("서버에서 응답이 없습니다. 잠시 후 다시 시도하여 주십시오.");	
				}, false);
				
			} else {
				// FDS UUID 조회 오류
				messageErrorView("기기 정보 조회 중 오류가 발생하였습니다. FDS UUID 조회 오류");
			}
		}
		,function(resJson){ // Fail Function
			messageErrorView("기기 정보 처리 중 오류가 발생하였습니다.");
		});
}

//핀번호등록
function nativeTest02() {
	var com2001Req = makeForm("com2001Req");
	addFormData(com2001Req, "csno", namkyoCustNo); 	// 고객번호
	addFormData(com2001Req, "KND", "P"); 			// P사설인증
	doAction("COM2001", com2001Req ,
		function(com2001Res){
			if (typeof(com2001Res.TOKEN) != "undefined" && com2001Res.TOKEN != "") { // 중앙회 오픈API 토큰조회성공
				authReg("1",function(result){
								if(result.resultCd="0000"){
									messageView("핀번호 등록성공");
								}else{
									
									messageView("취소");
								}
							},com2001Res.TOKEN); // 1:핀번호 등록 
			}else{
				messageView("인증정보 등록 중 오류가 발생하였습니다.");
			}
		}
	,messageView("오류가 발생하였습니다."));
}

//핀번호 인증
function nativeTest03() {
	doLogin();
}
//지문등록
function nativeTest04() {
	var com2001Req = makeForm("com2001Req");
	addFormData(com2001Req, "csno", namkyoCustNo); 	// 고객번호
	addFormData(com2001Req, "KND", "P"); 			// P사설인증
	doAction("COM2001", com2001Req ,
		function(com2001Res){
			if (typeof(com2001Res.TOKEN) != "undefined" && com2001Res.TOKEN != "") { // 중앙회 오픈API 토큰조회성공
				authReg("2",function(result){
								if(result.resultCd="0000"){
									messageView("지문 등록성공");
								}else{
									messageView("취소");
								}
							}); // 2:지문
			}else{
				messageView("인증정보 등록 중 오류가 발생하였습니다.");
			}
		}
	,messageView("오류가 발생하였습니다."));
}
//지문인증
function nativeTest05() {
	doLogin();
}
//패턴 등록
function nativeTest06() {
	var com2001Req = makeForm("com2001Req");
	addFormData(com2001Req, "csno", namkyoCustNo); 	// 고객번호
	addFormData(com2001Req, "KND", "P"); 			// P사설인증
	doAction("COM2001", com2001Req ,
		function(com2001Res){
			if (typeof(com2001Res.TOKEN) != "undefined" && com2001Res.TOKEN != "") { // 중앙회 오픈API 토큰조회성공
				authReg("3",function(result){
								if(result.resultCd="0000"){
									messageView("패턴 등록성공");
								}else{
									messageView("취소");
								}
							}); // 3: 패턴
			}else{
				messageView("인증정보 등록 중 오류가 발생하였습니다.");
			}
		}
	,messageView("오류가 발생하였습니다."));
}
//패턴 인증
function nativeTest07() {
	doLogin();
}
//OCR
function nativeTest08() {
	var reqJson = {
			"serviceCd":"OCR"
		   ,"params":{	"isMasking":false
			   			,"isDetail":false}
			   };  
	
		ftBridgeExcutor.postMessage(reqJson, 
				function(result){
					alert(JSON.stringify(result))
				}
				,function(result){
					alert(JSON.stringify(result))
				});
//	runOcr(function(idcdData) {
//		var paramForm = makeForm("paramForm");
//		addFormData(paramForm, "appNumber", $('#appNumber').val());
//		addFormData(paramForm, "fileType", "01");
//		addFormData(paramForm, "photoStr", idcdData.params.photoStr);
//		addFormData(paramForm, "issueDate", idcdData.params.issueDate);
//		if (idcdData.params.secureNo == "") {
//			addFormData(paramForm, "idCardType", "1");
//			addFormData(paramForm, "dln", "");
//			addFormData(paramForm, "dlnSerialNumber", "");
//			addFormData(paramForm, "dlnAgencyName", "지역시청");
//		} else {
//			addFormData(paramForm, "idCardType", "2");
//			addFormData(paramForm, "dln", idcdData.params.driveNo);
//			addFormData(paramForm, "dlnSerialNumber", idcdData.params.secureNo);
//			addFormData(paramForm, "dlnAgencyName", "지역지방경찰청");
//		}
//		doAction("LIM3003", paramForm,
//					function(resData) {
//						var respCd = resData.data.loanRequestProcessResultCode;
//						
//						if("01" == respCd) {
//							documentConfirm("isCmptOcr", true); // 신분증제출완료
//							
//							var lim3104Form = makeForm("lim3104Form");
//							addFormData(lim3104Form, "appNumber", $('#appNumber').val());
//							doActionView("LIM3104", lim3104Form);
//						} else {
//							messageErrorView("신분증 촬영 이미지 처리중 오류가 발생했습니다.");
//						}
//					},
//					function() {
//						messageErrorView("신분증 촬영 이미지 처리중 오류가 발생했습니다.");
//					});
//	}, function(){return;});
	
}
//스크랩핑
function nativeTest09() {
	// TODO 공통 스크래핑 펑션 호출
	//runping("1", function(resData){alert(JSON.stringify(resData));});
	var reqJson = {
			"serviceCd":"SCRAPING"
				 ,"params":{
					   "gubun": "HOME" //MINWON, NHIS ,HOME
					   ,"MinWon_1":{"Module":"MinWon","Class":"민원신청조회","Job":"비회원로그인","Input":{"구분":"1","이름":"김남교","주민등록번호":"TCZrYbFvH9vBQTphRq9AkQ==","연락처":"","핸드폰번호":"","법인명":"","법인등록번호":"","사업자등록번호":"","보안문자":""}}
					   ,"MinWon_2":{"Module":"MinWon","Class":"민원신청조회","Job":"주민등록표등초본교부","Input":{"민원사무구분":"2","신청내용출력여부":"22222221","시도":"서울특별시","시군구":"은평구","인증서":{"이름":"","만료일자":"","비밀번호":""}}}
					   ,"MinWon_3":{"Module":"MinWon","Class":"민원신청조회","Job":"로그아웃","Input":{}}
					   ,"NHIS_1":{"Module": "NHIS", "Class": "민원신청조회", "Job": "로그인", "Input":{"로그인방식": "CERT", "사용자아이디": "", "사용자비밀번호": "", "주민사업자번호": "TCZrYbFvH9vBQTphRq9AkQ==","인증서등록":"1","자동등록여부":"Y", "인증서":{"이름": "", "만료일자": "", "비밀번호": ""}}}
	 				   ,"NHIS_2":{"Module": "NHIS", "Class": "민원신청조회", "Job": "납부확인서", "Input":{ "조회시작년월": "202003", "조회종료년월": "202102", "팩스전송여부": "N", "팩스번호": "" } }
					   ,"NHIS_3":{"Module": "NHIS", "Class": "민원신청조회", "Job": "자격득실확인서", "Input": {}}
					   ,"HOME_1":{"Module": "HomeTax", "Class": "PC조회발급서비스", "Job": "공인인증서등록", "Input":{"로그인방식": "","주민사업자번호": "TCZrYbFvH9vBQTphRq9AkQ==", "인증서":{"이름": "", "만료일자": "", "비밀번호": ""}}}
					   ,"HOME_2":{"Module": "HomeTax", "Class": "PC조회발급서비스", "Job": "로그인", "Input":{"로그인방식": "CERT", "사용자아이디": "", "사용자비밀번호": "", "세무대리인_관리번호": "", "세무대리인_비밀번호": "", "성명": "김남교", "주민등록번호": "TCZrYbFvH9vBQTphRq9AkQ==", "인증서":{"이름": "", "만료일자": "", "비밀번호": ""}}}
					   ,"HOME_3":{"Module": "HomeTax", "Class": "PC조회발급서비스", "Job": "소득금액증명", "Input":{"증명구분": "101","과세시작년": "2015","과세종료년":"2020","주소_공개여부":"Y","주민등록번호_공개여부":"Y"}}
					   ,"HOME_4":{"Module": "HomeTax", "Class": "PC조회발급서비스", "Job": "부가가치세과세표준증명원", "Input":{"사업자등록번호": "","과세시작월": "202001","과세종료월":"202012","주민등록번호_공개여부":"Y"}}
					   }
					  };
	ftBridgeExcutor.postMessage(reqJson, 
			function(result){
		        //prompt('결과',JSON.stringify(result));
				alert(JSON.stringify(result))
			}
			,function(result){
				alert(JSON.stringify(result))
			});
}
//공동인증서 관리
function nativeTest10() {
	var reqJson = {
			"serviceCd":"SIGN_CERT_MANAGE"
		   ,"params":{"":""
			}	  
		};
	ftBridgeExcutor.postMessage(reqJson, 
			function(result){
				alert(JSON.stringify(result))
			}
			,function(result){
				alert(JSON.stringify(result))
			});
}
//공동인증서 인증
function nativeTest11() {
	var reqJson = '* 이름 : 김남교<br>* 주민번호 : 931103-●●●●●●●<br>* 인증일시 : 2021년 03월 14일 23:07:39<br>* 인증방법 : 공인인증서<br>* 자금용도 : 생활안정자금<br>* 여신(한도)금액 : 1,000,000원<br>* 계좌번호(여신신청번호) :7029093<br>* 이자율 등 : 여신기간 만료일까지 연 14.17% 고정금리<br>* 연체이자율 : 당행기준적용 최고 연체이율 14.173% 이내<br>* 중도상환수수료율 : (기한전상환대출금액 x 기한전상환수수료율 x 대출잔여일수) / 대출약정기간<br>* 상환방식 : 원리금균등분할<br>* 상환방법 : 매월(14)일마다 분할 상환합니다.<br>* 인지세 : 0원<br>* 기타수수료 : 0원<br> ◇ 입금의뢰<br>* 입금기관명 : 신한은행<br>* 예금주 : 김남교<br>* 계좌번호 :110267860178<br>* 입금금액 :1,000,000<br>CMS출금이체 신청서<br>○ 수납기관 기재란<br>* 수납기관 : 스마트저축은행 주식회사 <br>* 자동이체 사유 : 대출불입금<br>* 이체개시 일자 :2021년 03월 14일 <br>* 지정출금일 : 14일<br>* 출금 지정금액 : 여신거래약정서에 준함<br>○ 출금이체 신청내용<br>* 예금주명 :김남교<br>* 주민등록번호 :931103-●●●●●●●<br>* 주소 : 서울 은평구  불광로13가길 23-2 삼아리츠빌  아<br>* 전화번호 : 01046249022<br>* 출금은행 :신한은행<br>* 지정출금 계좌번호 :110267860178<br>위와 같이 출금이체 거래를 신청합니다.<br>[약관동의]<br>(Y) 1.고객 권리 안내문에 관련된 확인 <br>(Y) 2.대출상품 설명서에 관한 확인 <br>(Y) 3.대출거절사유 고지신청서 <br>(Y) 4.대학생·청년층을 위한 공적지원제도 안내문 <br>(Y) 5.금융소비자 불명 : 신한은행<br>* 예금주 : 김남교<br>* 계좌번호 :110267860178<br>* 입금금액 :1,000,000<br>CMS출금이체 신청서<br>○ 수납기관 기재란<br>* 수납기관 : 스마트저축은행 주식회사 <br>* 자동이체 사유 : 대출불입금<br>* 이체개시 일자 :2021년 03월 14일 <br>* 지정출금일 : 14일<br>* 출금 지정금액 : 여신거래약정서에 준함<br>○ 출금이체 신청내용<br>* 예금주명 :김남교<br>* 주민등록번호 :931103-●●●●●●●<br>* 주소 : 서울 은평구  불광로13가길 23-2 삼아리츠빌  아<br>* 전화번호 : 01046249022<br>* 출금은행 :신한은행<br>* 지정출금 계좌번호 :110267860178<br>위와 같이 출금이체 거래를 신청합니다.<br>[약관동의]<br>(Y) 1.고객 권리 안내문에 관련된 확인 <br>(Y) 2.대출상품 설명서에 관한 확인 <br>(Y) 3.대출거절사유 고지신청서 <br>(Y) 4.대학생·청년층을 위한 공적지원제도 안내문 <br>(Y) 5.금융소비자 불\354\235이익 우선설명확인서 <br>(Y) 6.금리인하요구권에 대한 상기의 설명을 확인하였습니다.<br>(Y) 7.대출계약철회권에 대한 상기의 설명을 확인하였습니다.<br>(Y) 8.고액 신용대출의 사후 용도관리 강화 관련 추가 약정에 대한 상기의 설명을 확인하였습니다.<br>——————————————— <br>스마트저축은행 약관에 동의하고 인증 하였습니다 <br>' ;
	doSign(reqJson, 
			function(result){
				alert(JSON.stringify(result))
			}
			,function(result){
				alert(JSON.stringify(result))
			});
}
//공동인증서 가져오기
//서버에서 파라미터 채워서 가야함
function nativeTest12() {
	var reqJson = {
			"serviceCd":"SIGN_CERT_REG"
		   ,"params":{"CODE":"",
			   		"MESSAGE":"",		
			   		"RANDOMNUMBER":""		
			}	  
		};
	ftBridgeExcutor.postMessage(reqJson, 
			function(result){
				alert(JSON.stringify(result))
			}
			,function(result){
				alert(JSON.stringify(result))
			});
}
//키보드 테스트
function nativeTest13() {
	var type=1
	var com0000Form = makeForm("com0000Form");
	addFormData(com0000Form, "txGbnCd", "RSA_PUB_KEY"); // RSA Public Key 요청
	doAction("COM0000", com0000Form, 
			function(com0000Res){
				var reqData = {
					"serviceCd":"TRANSKEY",
					"params":{
						 "KEYBOARD_TYPE":"1"         
						,"LABEL":"주민번호 뒷자리"
						,"HINT":"주민번호 뒷자리"
						,"MIN":"7"
						,"MAX":"7"
					    ,"KEY":com0000Res.rsaPubKey 
					}};
				switch (type) {
				case "1": // 주민번호 뒷자리 숫자키패드
					reqData.params.KEYBOARD_TYPE = "1";
					reqData.params.LABEL = "주민번호 뒷자리";
					reqData.params.HINT = "주민번호 뒷자리";
					reqData.params.MIN = "7";
					reqData.params.MAX = "7";
					break;
				case "2": // 계좌비밀번호 4자리 숫자키패드
					reqData.params.KEYBOARD_TYPE = "1";
					reqData.params.LABEL = "계좌 비밀번호";
					reqData.params.HINT = "계좌 비밀번호";
					reqData.params.MIN = "4";
					reqData.params.MAX = "4";
					break;
				case "3": // 비밀번호 8~12자리 영문키패드
					reqData.params.KEYBOARD_TYPE = "2";
					reqData.params.LABEL = "비밀번호";
					reqData.params.HINT = "비밀번호";
					reqData.params.MIN = "8";
					reqData.params.MAX = "12";
					break;
				case "4": // 인뱅 초기비밀번호 6자리 영문키패드
					reqData.params.KEYBOARD_TYPE = "2";
					reqData.params.LABEL = "초기 비밀번호";
					reqData.params.HINT = "초기 비밀번호";
					reqData.params.MIN = "6";
					reqData.params.MAX = "6";
					break;
				case "5": // OTP 일련번호
					reqData.params.KEYBOARD_TYPE = "1";
					reqData.params.LABEL = "OTP인증번호";
					reqData.params.HINT = "OTP인증번호";
					reqData.params.MIN = "6";
					reqData.params.MAX = "6";
					break;
				default:
					break;
				}
				ftBridgeExcutor.postMessage(reqData, 
						function(resData){
							var val=JSON.stringify(resData.params.encData);
							//alert(val);
							alert(decKey(val));
						}, 
						function(){messageErrorView("보안키패드 기동 중 오류가 발생하였습니다.");});
			}, 
			function(){messageErrorView("보안키패드 기동 중 오류가 발생하였습니다.")});
}
//키보드2
function nativeTest14() {
	var type=2
	var reqData = {
			"serviceCd":"TRANSKEY",
			"params":{
				 "KEYBOARD_TYPE":"1"         
				,"LABEL":"주민번호 뒷자리"
				,"HINT":"주민번호 뒷자리"
				,"MIN":"7"
				,"MAX":"7"
			    ,"KEY":pubKey()
			}};
		switch (type) {
		case "1": // 주민번호 뒷자리 숫자키패드
			reqData.params.KEYBOARD_TYPE = "1";
			reqData.params.LABEL = "주민번호 뒷자리";
			reqData.params.HINT = "주민번호 뒷자리";
			reqData.params.MIN = "7";
			reqData.params.MAX = "7";
			break;
		case "2": // 계좌비밀번호 4자리 숫자키패드
			reqData.params.KEYBOARD_TYPE = "1";
			reqData.params.LABEL = "계좌 비밀번호";
			reqData.params.HINT = "계좌 비밀번호";
			reqData.params.MIN = "4";
			reqData.params.MAX = "4";
			break;
		case "3": // 비밀번호 8~12자리 영문키패드
			reqData.params.KEYBOARD_TYPE = "2";
			reqData.params.LABEL = "비밀번호";
			reqData.params.HINT = "비밀번호";
			reqData.params.MIN = "8";
			reqData.params.MAX = "12";
			break;
		case "4": // 인뱅 초기비밀번호 6자리 영문키패드
			reqData.params.KEYBOARD_TYPE = "2";
			reqData.params.LABEL = "초기 비밀번호";
			reqData.params.HINT = "초기 비밀번호";
			reqData.params.MIN = "6";
			reqData.params.MAX = "6";
			break;
		case "5": // OTP 일련번호
			reqData.params.KEYBOARD_TYPE = "1";
			reqData.params.LABEL = "OTP인증번호";
			reqData.params.HINT = "OTP인증번호";
			reqData.params.MIN = "6";
			reqData.params.MAX = "6";
			break;
		default:
			break;
		}
		ftBridgeExcutor.postMessage(reqData, 
				function(keypadResData){
					alert(JSON.stringify(keypadResData));
				}, 
				function(){messageErrorView("보안키패드 기동 중 오류가 발생하였습니다.");});
}

function nativeTest15() {

	regMOTP( function(mOtpResDs) {
					alert(JSON.stringify(mOtpResDs)
				)
			},false );
	
}
function nativeTest16() {
			authMOTP(function(mOtpResDs) {
				alert(JSON.stringify(mOtpResDs))
			}, function(mOtpResDs){
				alert(JSON.stringify(mOtpResDs))
			});
}
function nativeTest17() {
	regSmartAppAuth(function(mOtpResDs) {
		alert(JSON.stringify(mOtpResDs))
	}, function(mOtpResDs){
		alert(JSON.stringify(mOtpResDs))
	});
	
}
function nativeTest18() {
	runScraping("02,03,04,05,06", testScrpSuccFunc);
}

function nativeTest19() {
	var com2001Req = makeForm("com2001Req");
	addFormData(com2001Req, "txGbnCd", "DEPO_TRN"); 	//구분
	addFormData(com2001Req, "acntNo", "55661220033126"); 	// 계좌번호
	addFormData(com2001Req, "custNo", "00000000002"); 	// 고객번호
	addFormData(com2001Req, "prdctCd", "902"); 	// 상품코드
	addFormData(com2001Req, "trnDstCd", "01"); 	// 거래구분
	addFormData(com2001Req, "ptCd", " "); 	// 협약사코드
	addFormData(com2001Req, "trnAmt", "1000000"); 	// 고객번호
	doAction("COM0000", com2001Req ,
		function(com2001Res){
		messageView("성공");
		}
	,function(com2001Res){
		messageView("실패");
		}
	);
}

function testScrpSuccFunc(scrapData) {
	var scrapForm = makeForm("scrapForm");
	var scrapDataStr = JSON.stringify(scrapData);
	scrapDataStr = scrapDataStr.replace(/"{/g, '{');
	scrapDataStr = scrapDataStr.replace(/}"/g, '}');
	scrapDataStr = scrapDataStr.replace(/\\/g, "");
	
	addFormData(scrapForm, "appNumber", $('#appNumber').val());
	addFormData(scrapForm, "scrapData", scrapDataStr);
	doAction("LIM3004", scrapForm, lim3004SuccFunc, lim3004FailFunc, false);
	
}

//공동인증서 관리
function nativeTest19() {
	var reqJson = {
			"serviceCd":"CAMERA"
		   ,"params":{"":""
			}	  
		};
	ftBridgeExcutor.postMessage(reqJson, 
			function(result){
				alert(JSON.stringify(result))
			}
			,function(result){
				alert(JSON.stringify(result))
			});
}

// APP PUSH HISTORY
function nativeTest20() {
	var reqJson = {
			"serviceCd":"PUSH_HIST"
		   ,"params":{"":""
			}	  
		};
	ftBridgeExcutor.postMessage(reqJson, 
			function(result){
				alert(JSON.stringify(result))
			}
			,function(result){
				alert(JSON.stringify(result))
			});
}

//키 요청
function pubKey() {
	var com0000Form = makeForm("com0000Form");
	addFormData(com0000Form, "txGbnCd", "RSA_PUB_KEY"); // RSA Public Key 요청
	doAction("COM0000", com0000Form, 
			function(com0000Res){
				return com0000Res.rsaPubKey
			}, 
			function(){
				messageErrorView("보안키패드 기동 중 오류가 발생하였습니다.");
				return "";
			});
}
//des
function decKey(encData) {
	var com0000Form = makeForm("com0000Form");
	addFormData(com0000Form, "txGbnCd", "RSA_PUB_KEY_DES"); // RSA Public Key 요청
	addFormData(com0000Form, "encData", encData); 
	doAction("COM0000", com0000Form, 
			function(com0000Res){
				return JSON.stringify(com0000Res.val);
			}, 
			function(){
				messageErrorView("보안키패드 기동 중 오류가 발생하였습니다.");
				return "";
	});
}