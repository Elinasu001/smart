/**
 * Filename    : ft_biz_common.js
 * Description : 업무공통 JavaScript
 */
var AUTH_ERROR_CNT       = 0;	// 인증오류건수
var AUTH_ERROR_CHECK_CNT = 0; 	// 인증오류 허용 건  수
var AUTH_ERROR_MAX_CNT   = 4; 	// 인증오류 최대 허용 건  수

//****************************************************************************************************
//1. Description : 업무콜백
//2. Parameters : 
//3. Return Type : void
//****************************************************************************************************
var BizCallBack = function(){
	this.regMOTP = function(regMOTPRes){
		regMOTP(goMainPage, false);
	}
	
	this.authRegProcess = function(authRegProcessRes){
		setAppData({"custNo":authRegProcessRes.custNo,"tokenId":"","authType":"0"});
		
		messageView("본인인증이 완료되었습니다.<br>로그인에 필요한 핀번호를 등록합니다.",function(){authRegProcess();})
	}
	this.nextPage = function(){
		var nextForm = makeForm("nextForm");
		var nextPage = "";
		$.each(REQ_JSON_DATA, function(k,v){
			if (k=="nextPage") nextPage = v;
			addFormData(nextForm, k, v);
		});
		if (nextPage == "") nextPage = "main";
		doActionView(nextPage, nextForm);
	}
}

//****************************************************************************************************
//1. Description : 주소검색
//2. Parameters : callbackFunc(selectedAddr); BLDG_MNGNO:건물관리번호 ZPCD:우편번호 ZPCD_ADDR:기본주소
//3. Return Type : void
//****************************************************************************************************
var ADDR_PAGE_NUM = 1;  // 주소검색 페이징넘버
var ADDR_CALLBACK = function(){};
function fnAddrSearch(callbackFunc) {
	
	ADDR_PAGE_NUM = 1;
	ADDR_CALLBACK = function(resJson){
		$("#searchAddresss").hide();
		$("#INPT_ADDR").val(""); // 검색어초기화
		callbackFunc(resJson);
	};
	
	//진입시 초기화
	$("#searchAddresss").show();
	$("#searchAddresssList").show();
	$(".nodata").hide();
	$("#INPT_ADDR").val(""); // 검색어초기화
	
	$("#searchAddresssList").html("<li class='th'><p>우편번호</p><p>주소</p></li>");
	
	$("#searchAddresssBtn").unbind();
	$("#searchAddresssBtn").click(function(){
		var inptAddr = $.trim($("#INPT_ADDR").val()); // 검색어
		if (inptAddr == "") {
			$("#searchAddresssList").hide();	
			$(".nodata").show();
			$(".d_tc").html("검색어를 입력하세요.");
			
		} else {
			var addrForm = makeForm("addrForm");
			addFormData(addrForm, "ADDR_DSTC", "03");		// 주소구분
			addFormData(addrForm, "INPT_ADDR", inptAddr);	// 검색 주소
			addFormData(addrForm, "FLAG", ADDR_PAGE_NUM);	// 검색 페이징
			doAction('COM0001', addrForm, function(addrRes){
				$("#searchAddresssList").html("<li class='th'><p>우편번호</p><p>주소</p></li>");
				var addrHtml = $("#searchAddresssList").html();
				if (isEmpty(addrRes.REC)) {
					$("#searchAddresssList").hide();	
					$(".nodata").show();
					
					if (addrRes.API_RS_MSG != "SUCCESS"){
						var mesg = addrRes.API_RS_MSG;
					} else {
						var mesg = "검색된 주소가 없습니다.";
					}
					$(".d_tc").html(mesg);
				} else {
					$("#searchAddresssList").show();	
					$(".nodata").hide();
					for (var i=0; i < addrRes.REC.length; i++) {
						var RETURN_ADDR = {"ZPCD":"","ZPCD_ADDR":"","BLDG_MNGNO":""};
						
						var addrRec = addrRes.REC[i];
						var ZPCD = addrRec.ZPCD;
						var ZPCD_ADDR = addrRec.ZPCD_ADDR;
						if (ZPCD_ADDR.indexOf("[지번주소]")>-1) {
							ZPCD_ADDR = ZPCD_ADDR.substr(8, ZPCD_ADDR.indexOf("[지번주소]")-10);
						}
						var BLDG_MNGNO = addrRec.BLDG_MNGNO;
						RETURN_ADDR.ZPCD = ZPCD;
						RETURN_ADDR.ZPCD_ADDR = ZPCD_ADDR;
						RETURN_ADDR.BLDG_MNGNO = BLDG_MNGNO;
						var addHtml = "<li onclick='ADDR_CALLBACK("+JSON.stringify(RETURN_ADDR)+");'><p>"+ZPCD+"</p><p>"+ZPCD_ADDR+"</p></li>";
						addrHtml+=addHtml;
					}
				}
				$("#searchAddresssList").html(addrHtml);
			}, function(){messageErrorView("주소 검색 중 오류가 발생하였습니다.")});
		}
	});
}

//****************************************************************************************************
//1. Description : 보안키패드기동
//2. Parameters : type 1:주민번호(7자리), 2:계좌비밀번호(4자리) 3:비밀번호(8~12자리) 4:인뱅최초비밀번호(6자리) 5:OTP일련번호(6자리)
//               ,callbackFunc(암호화된 입력값);
//               ,labelText LABEL, HINT Text
//3. Return Type : void
//****************************************************************************************************
function runTransKey(type, callbackFunc, labelText) {
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
				case "6": // 제휴사 적금상품 이벤트코드
					reqData.params.KEYBOARD_TYPE = "2";
					reqData.params.LABEL = "이벤트 코드";
					reqData.params.HINT = "이벤트 코드";
					reqData.params.MIN = "6";
					reqData.params.MAX = "10";
					break;	
				default:
					break;
				}
				
				if (isNotEmpty(labelText)) {
					reqData.params.LABEL = labelText;
					reqData.params.HINT = labelText;
				}
				
				ftBridgeExcutor.postMessage(reqData, 
						function(keypadResData){
							callbackFunc(keypadResData.params.encData); // 암호화 문자열 리턴
						}, 
						function(){messageErrorView("보안키패드 기동 중 오류가 발생하였습니다.");});
			}, 
			function(){messageErrorView("보안키패드 기동 중 오류가 발생하였습니다.")});
}

//****************************************************************************************************
//1. Description : 스크래핑 기동
//2. Parameters : scrapTarget, callbackFunc
//3. Return Type : void
//4. example : runScraping("02,03,04,05", callbackFunc);
//TODO JT 비회원 로그인 input 과 차이 있음. "MinWon_1":{"Module":"MinWon","Class":"민원신청조회","Job":"비회원로그인","Input":{"이름":custNm,"주민등록번호":encRbrno,"기본주소":juso,"주소코드":jusoCode,"우편번호":pscd,"연락처":"","핸드폰번호":"","보안문자":""}},
//****************************************************************************************************
function runScraping(scrapTarget, callbackFunc) {

	var com0015Form = makeForm("com0015Form");
	addFormData(com0015Form, "txGbnCd", "S");
	addFormData(com0015Form, "scrapTarget", scrapTarget); // 스크래핑 대상
	doAction("COM0015", com0015Form,
			function(com0015Res){
				var scrapExecYn = com0015Res.scrapExecYn; // 스크래핑기동여부
				var addrInqYn = com0015Res.addrInqYn;     // 주소조회필요여부
				var scrpReqJson = com0015Res.scrpReqJson; // 스크래핑 요청JSON 
				var scrpResJson = com0015Res.scrpResJson; // 스크래핑 응답JSON
				
				if (scrapExecYn == "N") { // 스크래핑 기동안함 조회데이터 응답
					callbackFunc(scrpResJson);
				} else {
					if (addrInqYn == "N") { // 주소조회 하지 않음
						scrapingProcess(scrpReqJson, scrpResJson, callbackFunc);
					} else {
						messageView("주민등록초본 제출을 위해 주민등록 소재지 주소를 검색하여 주십시오.", function(){
							fnAddrSearch(function(resAddrJson){
								confirmView("&lt;&nbsp;" + JSON.stringify(resAddrJson.ZPCD_ADDR).split("\\")[0].replace('"', '') + "&gt;<br>정확한 주소지를 선택하셨습니까?<br>잘못 선택하셨을시 다시 시도해주세요.", 
										function(){
									
											scrapingComanyConfirmView(function(company){
												switch(company){
												//금융인증
												case 'FIN_CERT':
													FinCert.finScraping2(company,scrapTarget,resAddrJson,function(scrpResJson){
														callbackFunc(scrpResJson);
													});
													break;
												//사설인증
												case 'KAKAO':
												case 'SAMSUNG':
												case 'PAYCO':
												case 'PASS':
												case 'NAVER':
												case 'SHINHAN':
													PriCert.priScraping2(company,scrapTarget,resAddrJson,function(scrpResJson){
														callbackFunc(scrpResJson);
													});
													break;
												//공동인증
												case 'COM':
													scrapingProcess(scrpReqJson, scrpResJson, callbackFunc, resAddrJson);
													break;
												default:
													break;
												}
											});
											
										},
										function() {
											return;
										});
								
							});	
						});
					}
				}
			}, 
			function(){
				messageErrorView("서류 제출 전 조회 중 오류가 발생하였습니다.");
			});
}



function scrapingComanyConfirmView(nStep){
	$('.sc').unbind();
	$('.sc').click(function(){
		var compnay = $(this)[0].id;
		progressBar(true);
	    setTimeout(function(){
			progressBar(false);
		    closeMessage();
			nStep(compnay);
	    },100);
	});
	$("#scrapingMessageImgBtn").click(function(){
	    closeMessage();
	});
	$("#alertScrapChoisMessageBox").show();
}

// 스크래핑 실행함수
function scrapingProcess(reqJson, resJson, callbackFunc, resAddrJson) {
	var scrpReqJson = JSON.parse(reqJson);
	var scrpResJson = JSON.parse(resJson);
	
	if (isNotEmpty(resAddrJson)) { // 주소조회 후 실행
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
		scrpReqJson.params.MinWon_2.Input.시도 = String(sido);
		scrpReqJson.params.MinWon_2.Input.시군구 = gugun;
	}
	
	ftBridgeExcutor.postMessage(scrpReqJson, 
			function(scrapData){
				
				var scrapDataStr = JSON.stringify(scrapData);
				scrapDataStr = scrapDataStr.replace(/"{/g, '{').replace(/}"/g, '}').replace(/\\/g, "");
				
				if("0000" == scrapData.resultCd) {
				
				var com0015Form = makeForm("com0015Form");
					addFormData(com0015Form, "txGbnCd", "I");
					addFormData(com0015Form, "scrapData", scrapDataStr);
					doAction("COM0015", com0015Form, 
						function(com0015Res){
							// 조회응답 병합
							if (isNotEmpty(scrapData.params.MinWon_2.Output)) scrpResJson.MinWon_2.Output = scrapData.params.MinWon_2.Output;
							if (isNotEmpty(scrapData.params.NHIS_2.Output)) scrpResJson.NHIS_2.Output = scrapData.params.NHIS_2.Output;
							if (isNotEmpty(scrapData.params.NHIS_3.Output)) scrpResJson.NHIS_3.Output = scrapData.params.NHIS_3.Output;
							if (isNotEmpty(scrapData.params.HOME_3.Output)) scrpResJson.HOME_3.Output = scrapData.params.HOME_3.Output;
							if (isNotEmpty(scrapData.params.HOME_4.Output)) scrpResJson.HOME_4.Output = scrapData.params.HOME_4.Output;
							messageView("서류제출이 완료되었습니다.", function(){callbackFunc(scrpResJson);});
						}, 
						function(){messageErrorView("서류제출 처리 중 오류가 발생하였습니다.");});
				} else if("9990" == scrapData.resultCd){
					messageErrorView("현재 기기에 등록된 공동인증서가 없습니다.");
				} else if("9998" == scrapData.resultCd){
					messageView("공동인증서명을 취소하셨습니다.");
				}
			}, 
			function(){messageErrorView("서류제출 처리 중 오류가 발생하였습니다.");});
	
}

//****************************************************************************************************
//1. Description : 고객번호 재등록 // 재설정
//2. Parameters : callback Function
//3. Return Type : void
//****************************************************************************************************
function custNoReReg() {
	setAppData({"custNo":"","tokenId":"","authType":"0"});
	setCookie("authorization", ""); // 인증토큰삭제
	var authForm = makeForm("authForm");
	addFormData(authForm, "nextPrcsFunc", "authRegProcess");
	doActionView("COM0000", authForm);
}
// 고객번호 재설정 
function custNoReSetting() {
	setCookie("authorization", ""); // 인증토큰삭제
	var reCustNo = prompt("고객번호를 입력하세요");
	setAppData({"custNo":reCustNo});
	doLogin();
}

//****************************************************************************************************
//1. Description : OCR기동
//2. Parameters : callback Function
//3. Return Type : void
//****************************************************************************************************
function runOcr(callbackFunc) {
	var isDetail = (IDCD_DETAIL_CHECK_YN == 'Y') ? "true" : "false"; // 사진특장점 사용여부
	var isMasking = (IDCD_MASKING_YN == 'Y') ? "true" : "false";	 // 신분증 마스킹 사용여부
	
	confirmView("비대면 본인확인을 위해 신분증진위확인(주민등록증,운전면허)을 수행합니다.<br>신분증  촬영을 진행하시겠습니까?",
		
		function(){ // agree Function
		
			var ocrReqData = {
				"serviceCd":"OCR"
			   ,"params":{"isMasking":isMasking,"isDetail":isDetail}
			};
		
			ftBridgeExcutor.postMessage(ocrReqData, 
					// OCR SUCC Function
					function(ocrResData){
						if (ocrResData.resultCd == "0000") { // 신분증촬영정상
							authFDS(function(fdsRes){
								ocrResData.uuid = fdsRes.uuid;	// FDS 고유식별값
								ocrResData.key  = fdsRes.key;   // FDS KEY
								ocrResData.data = fdsRes.data;  // FDS DATA
								idcdAuthorization(ocrResData, callbackFunc);	
							});
						} else {
							// 신분증촬영오류
							messageErrorView("신분증 촬영 처리 중 오류가 발생하였습니다.")	
						}
					}, 
					// OCR FAIL Function
					function(){
						messageErrorView("신분증 촬영 처리 중 오류가 발생하였습니다.")
					});
	  }
	  ,function(){ // disagree Function
	   		messageView("신분증 촬영을 취소하였습니다.");  
	  });
}


//****************************************************************************************************
//1. Description : 앱설치 후 회원가입시 OCR기동
//2. Parameters : callback Function
//3. Return Type : void
//****************************************************************************************************
function runOcrForJoin(callbackFunc, param) {
	var isDetail = (IDCD_DETAIL_CHECK_YN == 'Y') ? "true" : "false"; // 사진특장점 사용여부
	var isMasking = (IDCD_MASKING_YN == 'Y') ? "true" : "false";	 // 신분증 마스킹 사용여부
	
	confirmView("비대면 본인확인을 위해 신분증진위확인(주민등록증,운전면허)을 수행합니다.<br>신분증  촬영을 진행하시겠습니까?",
		
		function(){ // agree Function
		
			var ocrReqData = {
				"serviceCd":"OCR"
			   ,"params":{"isMasking":isMasking,"isDetail":isDetail}
			};
		
			ftBridgeExcutor.postMessage(ocrReqData, 
					// OCR SUCC Function
					function(ocrResData){
						if (ocrResData.resultCd == "0000") { // 신분증촬영정상
							ocrResData.uuid = "";	// FDS 고유식별값
							ocrResData.key  = "";   // FDS KEY
							ocrResData.data = "";  // FDS DATA
							ocrResData.rbrno = param;
							idcdAuthorization(ocrResData, callbackFunc);							
						} else {
							// 신분증촬영오류
							messageErrorView("신분증 촬영 처리 중 오류가 발생하였습니다.")	
						}
					}, 
					// OCR FAIL Function
					function(){
						messageErrorView("신분증 촬영 처리 중 오류가 발생하였습니다.")
					});
	  }
	  ,function(){ // disagree Function
	   		messageView("신분증 촬영을 취소하였습니다.");  
	  });
}



//****************************************************************************************************
//1. Description : 신분증 진위확인
//2. Parameters : idcdData, callback Function
//3. Return Type : void
//****************************************************************************************************
function idcdAuthorization(idcdData, callbackFunc) {
	var authForm = makeForm("authForm");
	addFormData(authForm, "name", idcdData.params.name);
	addFormData(authForm, "regno", idcdData.params.rbrNo);	
	addFormData(authForm, "driveNo", idcdData.params.driveNo);
	addFormData(authForm, "secureNo", idcdData.params.secureNo);
	addFormData(authForm, "issueDate", idcdData.params.issueDate);
	addFormData(authForm, "photoStr", idcdData.params.photoStr); // 신분증이미지		
	addFormData(authForm, "detailImage", idcdData.params.detailPhotoStr); // 사진특장점
	addFormData(authForm, "detailImageScore", idcdData.params.detailPhotoScore);// 사진특장점
	//addFormData(authForm, "detailImageScore", "90");// 사진특장점
	addFormData(authForm, "uuid", idcdData.uuid);  	// FDS UUID
	addFormData(authForm, "key", idcdData.key); 	// FDS KEY
	addFormData(authForm, "data", idcdData.data);	// FDS DATA
	addFormData(authForm, "rbrno", idcdData.rbrno);	// FDS DATA
	
	//20220720 아이폰에서 주민등록증찍을때 해당값을 아예안주기때문에 아래 주민등록증 if문을 먹지않음 
	if(typeof(idcdData.params.driveNo) =='undefined'){
		idcdData.params.driveNo='';
	}
	
	if (idcdData.params.driveNo == '') { // 주민등록증 
		addFormData(authForm, "bankCd", "104");		
	} else { // 운전면허증 촬영
		//addFormData(authForm, "bankCd", "111");
		addFormData(authForm, "bankCd", "814");
	}
	doAction("COM0020", authForm, 
	    function(com0020Res){
			if (com0020Res.confirmYn == 'Y') { // 신분증진위확인완료
				messageView("신분증 진위확인이 완료되었습니다.", function(){callbackFunc(idcdData);});
				
			} else if(com0020Res.confirmYn == 'N') { // 신분증진위확인실패
				if ($.trim(com0020Res.confirmMessage) == "N") {
					messageErrorView("신분증 진위확인 처리에 실패하였습니다. 신분증에서 인식된 정보가 정확한지 확인 후 수행바랍니다.", function(){runOcr(callbackFunc);});
				} else {
//					messageErrorView(com0020Res.confirmMessage);	
					messageErrorView("신분증 진위확인 처리에 실패하였습니다. 신분증에서 인식된 정보가 정확한지 확인 후 수행바랍니다.", function(){runOcr(callbackFunc);});
				}
			} else {
				messageErrorView("신분증 진위확인 처리 중 오류가 발생하였습니다.", function(){runOcr(callbackFunc);})
			}
	    }
   	  , function(){
   		  messageErrorView("신분증 진위확인 처리 중 오류가 발생하였습니다.");
   	  });
}

//****************************************************************************************************
//1. Description : 로그인여부 체크 후 거래 호출
//2. Parameters : boolean flag - true, false
//3. Return Type : void
//****************************************************************************************************
function checkLoginView(callBackFunc) {
	
	NEXT_PROCESS_FUNC = callBackFunc;
	
	var loginCheckFrom = makeForm("loginCheckForm");
	doAction("COM0002", loginCheckFrom, function(com0002Res){
		if (com0002Res.APP_HEADER.respCd != 'E00000') {
			callBackFunc();
		} else {
			doLogin();
		}
	}, function(com0002Res){
		doLogin();
	}, false);
	
}

//****************************************************************************************************
//1. Description : 푸시 수신동의여부 변경
//2. Parameters : boolean flag - true, false
//3. Return Type : void
//****************************************************************************************************
function chngPushRecptYn(flag, callbackFunc) {
	getAppData("pushKey", 
		function(appDataRes){	// SuccFunc
			var pushChngReqForm = makeForm("pushChngReqForm");
			addFormData(pushChngReqForm, "pushKeyVl", appDataRes.params.pushKey);
			if (flag) {
				addFormData(pushChngReqForm, "pushUseYn", "1");
			} else{
				addFormData(pushChngReqForm, "pushUseYn", "0");
			}
			doAction("COM1000", pushChngReqForm, callbackFunc, function(){messageErrorView("푸시 수신상태 변경 처리 중 오류가 발생하였습니다.")});
		}, 
		function(appDataRes){	// FailFunc
			messageErrorView("푸시 수신상태 변경 처리 중 오류가 발생하였습니다.");
		});
}

//****************************************************************************************************
//1. Description : 고객상태 체크 (요구불계좌 없는경우 비대면계좌개설, 인터넷뱅킹ID없는경우 전자금융 서비스 신청)
//2. Parameters : 
//3. Return Type : void
//****************************************************************************************************
function checkCustStats() {
	
	var regInbnIdForm = makeForm("regInbnIdForm");
	if (AUTH_RESULT != "S") {
		messageView("로그인 후 이용가능한 메뉴입니다.", function(){goMainPage();});
	} else if (DPM_ACNT_YN=='N') { // 요구불 계좌없음
		confirmView("서비스 사용을 위해서는 당행의 계좌가 필요합니다. 비대면 계좌개설을 진행하시겠습니까?", function(){
			doActionView("DEP0001", regInbnIdForm);	
		}, function(){goMainPage();});
		return false;
		
	} else if (USR_ID == ''){
		confirmView("서비스 사용을 위해서는 전자금융서비스 신청이 필요합니다. 신청 메뉴로 이동하시겠습니까?", function(){
			addFormData(regInbnIdForm, "ibFlag", "Y"); // 인뱅만 가입여부
			doActionView("DEP0000_2", regInbnIdForm);	
		}, function(){goMainPage();});
		return false;
		
	} else if (FRST_PSWD_REG_YN == "Y" && SERVICE_CD != "DEP2506_1") {
		confirmView("인터넷뱅킹 최초 패스워드 등록대상입니다. 등록 메뉴로 이동하시겠습니까?", function(){
			doActionView("DEP2506_1", regInbnIdForm);	
		}, function(){goMainPage();});
		return false;
		
	} else {
		// 정상
		return true;
	}
}

//****************************************************************************************************
//1. Description : 스마트앱인증 수행
//2. Parameters : 
//3. Return Type : void
//****************************************************************************************************
function authSmartAppAuth(callbackFunc, failCallbackFunc){
	if (typeof(failCallbackFunc) == 'undefined') failCallbackFunc = function(){goMainPage();};

	var smartAppAuthID = ""; 
	var smartAppAuthForm = makeForm("smartAppAuthForm");
	addFormData(smartAppAuthForm, "KND", "A"); // 스마트앱인증
	
	doAction("COM2002", smartAppAuthForm, function(com2002Res){
		if (isNotEmpty(com2002Res.ID)) {
			smartAppAuthID = com2002Res.ID;
			
			var reqDataAuth = {"serviceCd":"AUTHORIZATION",
					 "params":{
						  "PRCS_DVCD":"AP"  				// T:토큰등록(변경), R:인증수단등록, P:인증수행, M:mOtp 등록, MP:mOTP인증수행 , A:smartApp인증등록, AP:스마트앱인증수행
						 ,"AUTH_TYPE":"0"	  				// 0:최종등록타입 1:핀번호 2:지문 3:패턴 -> 등록 순서 1/2/3  
						 ,"AUTH_TOKEN":""				 	// 기기정보로 저장할 인증토큰
						 ,"AUTH_MESG": smartAppAuthID 		// 서명 시 싸인할 문구
						 ,"RANDOM_KEY":smartAppAuthID 		// 인증수행 시 사용할 랜덤키
						}};
			progressBar(false);
			ftBridgeExcutor.postMessage(reqDataAuth, 
				function(resSmartAppAuth){
					if(resSmartAppAuth.resultCd == "0000") {		// 정상일 경우 
							
							if (isNotEmpty(resSmartAppAuth.params.SIGN)) { // 서명데이터 존재
								var elecSignData = resSmartAppAuth.params.SIGN; // 전자서명데이터
								// 서명검증
								var signAuthForm = makeForm("signAuthForm");
								addFormData(signAuthForm, "txGbnCd", "P"); 			// P:인증수행 서명검증
								addFormData(signAuthForm, "ID", smartAppAuthID); 	// 랜덤키
								addFormData(signAuthForm, "SIG", elecSignData);  	// 서명데이터
								addFormData(signAuthForm, "MSG", smartAppAuthID); 	// 서명데이터원문 없으면 랜덤키로 
								addFormData(signAuthForm, "tokenId", ""); 			// 토큰ID
								
								doAction("COM2003", signAuthForm, 
									// doAction callbackFunc
									function(resSignAuthRes){
									
										if (resSignAuthRes.VLD == "true") { 
											// 서명정상
											AUTH_ERROR_CNT = 0;
											callbackFunc(resSignAuthRes);
											
										} else {
											// 서명검증 오류 케이스
											AUTH_ERROR_CNT++;
											messageErrorView("인증에 실패하였습니다.<br>현재 오류 횟수 : "+AUTH_ERROR_CNT+"회", function(){authSmartAppAuth(callbackFunc, failCallbackFunc);});
										}
										
									}, function(){
										// 응답오류 케이스 (기관장애)
										messageView("기관으로 부터 응답이 없습니다. 잠시 후 다시 시도하여 주십시오.", failCallbackFunc);
									}, false);
								
							} else {
								messageView("인증처리 중 오류가 발생하였습니다.",
										function(){authSmartAppAuth(callbackFunc, failCallbackFunc);});	
							}
							
						} else if(resSmartAppAuth.resultCd == "9998"){ // 취소시
							messageView("인증을 취소하였습니다.", function(){failCallbackFunc()});	
						} else if(resSmartAppAuth.resultCd == "9990"){ // 등록된 스마트앱 없음
							confirmView("등록된 스마트앱 인증이 없습니다.<br>ARS인증 후에 스마트앱 인증을 등록하시겠습니까?", function(){
								addAuth(function(){regSmartAppAuth(callbackFunc, failCallbackFunc);}, function(){failCallbackFunc();}, "reg");
							});
						} else {
							messageView("인증처리 중 오류가 발생하였습니다.", failCallbackFunc);
						}
				}, 
				function(resSmartAppAuth){
					messageErrorView("스마트앱 인증 처리 중 오류가 발생하였습니다.", failCallbackFunc);
				});

		} else {
			messageErrorView("기관으로부터 응답이 없습니다.", failCallbackFunc);
		}
	}, function(com2002Res){
		messageErrorView("스마트앱 발급 처리 중 오류가 발생하였습니다.", failCallbackFunc);
	});
}

//****************************************************************************************************
//1. Description : 스마트앱인증 등록
//2. Parameters : 
//3. Return Type : void
//****************************************************************************************************

function regSmartAppAuth(callbackFunc, failCallbackFunc){
	var smartAppAuthToken = ""; 
	var smartAppAuthForm = makeForm("smartAppAuthForm");
	addFormData(smartAppAuthForm, "KND", "A"); // 스마트앱인증
	
	doAction("COM2001", smartAppAuthForm, function(com2001Res){
		if (isNotEmpty(com2001Res.ID)) {
			smartAppAuthToken = com2001Res.TOKEN;
			var reqDataAuth = {"serviceCd":"AUTHORIZATION",
					 "params":{
						  "PRCS_DVCD":"A"  			// T:토큰등록(변경), R:인증수단등록, P:인증수행, M:mOtp 등록, MP:mOTP인증수행 , A:smartApp인증등록, AP:스마트앱인증수행
						 ,"AUTH_TYPE":"0"	  		// 0:최종등록타입 1:핀번호 2:지문 3:패턴 -> 등록 순서 1/2/3  
						 ,"AUTH_TOKEN":smartAppAuthToken 	// 기기정보로 저장할 인증토큰
						 ,"AUTH_MESG":""  			// 서명 시 싸인할 문구
						 ,"RANDOM_KEY":"" 			// 인증수행 시 사용할 랜덤키
						}};
			progressBar(false);
			ftBridgeExcutor.postMessage(reqDataAuth, 
				function(resSmartAppAuth){
					if(resSmartAppAuth.resultCd == "0000"){						
						//보안매체별 인증처리
						if(SECU_MEDI_DVCD == "O"){
							authOTP		(function(resDs){messageView("스마트앱 등록이 완료되었습니다.",function(){authSmartAppAuth(callbackFunc, failCallbackFunc);});}
							, function(resDs){failCallbackFunc(resDs)});	//OTP 기동
						} else if(SECU_MEDI_DVCD == "M"){
							authMOTP	(function(resDs){messageView("스마트앱 등록이 완료되었습니다.",function(){authSmartAppAuth(callbackFunc, failCallbackFunc);});}
							, function(resDs){failCallbackFunc(resDs)});	//mOTP 기동
						} else if(SECU_MEDI_DVCD == "C"){
							authSecuCard(function(resDs){messageView("스마트앱 등록이 완료되었습니다.",function(){authSmartAppAuth(callbackFunc, failCallbackFunc);});}
							, function(resDs){failCallbackFunc(resDs)});	//보안카드 기동
						} else {
							messageView	("스마트앱인증 등록을 위해서 OTP 또는 MOTP 인증을 추가로 해야합니다.<br>OTP나 MOTP를 등록 후 이용하여 주시기 바랍니다.");
						}
					} else if(resSmartAppAuth.resultCd == "9994") {	// 연속된 비밀번호 다를 때 
						messageErrorView("입력한 숫자가 일치하지 않습니다.", function() {regSmartAppAuth();});
					} else if(resSmartAppAuth.resultCd == "9995") {	// 유효성검사
						messageErrorView(resSmartAppAuth.params.msg, function() {regSmartAppAuth();});
					} else if(resSmartAppAuth.resultCd == "9996") {	// 비밀번호 틀렸을시
						messageErrorView("비밀번호가 일치하지 않습니다.", function() {regSmartAppAuth();});
					} else if(resSmartAppAuth.resultCd == "9997") {	// 스마트앱 이미 존재할시
						messageErrorView("등록 된 스마트앱이 존재합니다.");
					} else if(resSmartAppAuth.resultCd == "9998") {	// 인증 취소시
						
					} else if(resSmartAppAuth.resultCd == "9999") {	// 로그인 필요시
						messageErrorView("로그인이 필요합니다.", function(){goMainPage();});
					} else {
						messageErrorView("스마트앱 등록 처리 중 오류가 발생하였습니다.");
					}
				},
				function(resSmartAppAuth){
					messageErrorView("스마트앱 등록 처리 중 오류가 발생하였습니다.");
				});
		} else {
			messageErrorView("스마트앱 등록 처리 중 오류가 발생하였습니다.");
		}
	}, function(){
		messageErrorView("스마트앱 발급 처리 중 오류가 발생하였습니다.");
	});
}
//****************************************************************************************************
//1. Description : APP LINK DATA 처리
//2. Parameters : 
//3. Return Type : 
//****************************************************************************************************
function prcsAppLnkData(nextFunc) {
	var com0000ReqDs = makeForm("com0000ReqDs");
	addFormData(com0000ReqDs, "txGbnCd", "LNK_INQ");
	doAction("COM0000", com0000ReqDs, 
		function(com0000ResDs){
			var appLnkData = com0000ResDs.APP_LNK_DATA; 
			if (isNotEmpty(appLnkData)) {
				var appLnkDataJson = JSON.parse(appLnkData);
				var lnkForm = makeForm("lnkForm");
				$.each(appLnkDataJson, function(k,v){
					addFormData(lnkForm, k, v);
				});
				
				if (isNotEmpty(appLnkDataJson.nextPage)) { // 이동페이지가 있는 경우
					addFormData(com0000ReqDs, "lnkPrcsYn", "Y"); // 링크처리 업데이트	
					doAction("COM0000", com0000ReqDs, function(){
						doActionView(appLnkDataJson.nextPage, lnkForm);	
					}, function(){});
					
				} else { // 단순 앱기동 거래 시 처리여부 업데이트
					addFormData(com0000ReqDs, "lnkPrcsYn", "Y"); // 링크처리 업데이트
					doAction("COM0000", com0000ReqDs, function(){
						nextFunc();
					}, function(){
						nextFunc();
					});
				}
				
			} else {
				nextFunc(); // 앱링크 데이터 조회되지 않는 경우 다음 펑션 수행
			}
		});
}

//****************************************************************************************************
//1. Description : FDS 처리
//2. Parameters : {"serviceCd":"FDS", "params":{"PRCS_DVCD":"U or D", "key":"암호화키"}
//3. Return Type : {"resultCd":"0000", "params":{"uuid":"기기uuid", "key":"암호화키", "data":"기기정보"}
//****************************************************************************************************
function authFDS(callbackFunc) {
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
										callbackFunc(com0000Res2);
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

//****************************************************************************************************
//1. Description : mOTP 인증
//2. Parameters : 
//3. Return Type : void
//****************************************************************************************************
function authMOTP(callbackFunc, failCallbackFunc){
	if (typeof(failCallbackFunc) == 'undefined') failCallbackFunc = function(){goMainPage();};
	if (SECU_MEDI_DVCD != "M") {
		messageView("등록된 mOTP가 없습니다.");
		return;
	}
	var randomKey = ""; 	// 서명랜덤키
	var token = "";			// MOTP TOKEN
	
	var mOtpForm = makeForm("mOtpForm");
	addFormData(mOtpForm, "txGbnCd", "T"); 	// 처리구분코드 T:mOTP 트랜잭션생성 
	
	doAction("COM2002", mOtpForm, function(com2002Res){
		if (isNotEmpty(com2002Res.ID)) {	// 중앙회오픈API 랜덤키 조회성공
			randomKey = com2002Res.ID; 		// 서명용 랜덤KEY
			
			if (AUTH_ERROR_CNT > AUTH_ERROR_MAX_CNT) {
				messageView("인증 가능 횟수를 초과하였습니다.", function(){regMOTP();});
			} else {
				// 응답토큰 셋팅하여 인증서명 기동
				var reqDataAuth = {"serviceCd":"AUTHORIZATION",
						 "params":{
							  "PRCS_DVCD":"MP"  		// T:토큰등록(변경), R:인증수단등록, P:인증수행, M:mOtp 등록, MP:mOTP인증수행
							 ,"AUTH_TYPE":"0"  	 		// 0:최종등록타입 1:핀번호 2:지문 3:패턴 -> 등록 순서 1/2/3  
							 ,"AUTH_TOKEN":""  			// 기기정보로 저장할 인증토큰
							 ,"AUTH_MESG":randomKey  	// 서명 시 싸인할 문구
							 ,"RANDOM_KEY":randomKey 	// 인증수행 시 사용할 랜덤키
							}};
				progressBar(false);
				ftBridgeExcutor.postMessage(reqDataAuth, function(resMOtp){
					if (resMOtp.resultCd == "0000") { 			// 서명정상
						if (isNotEmpty(resMOtp.params.SIGN)) { 	// 서명데이터 존재
							var mOtpSignForm = makeForm("mOtpSignForm");
							addFormData(mOtpSignForm, "txGbnCd", "S")
							addFormData(mOtpSignForm, "ID", randomKey); 				// MOTP 토큰
							addFormData(mOtpSignForm, "SIG", resMOtp.params.SIGN); 		// 서명데이터
							addFormData(mOtpSignForm, "MSG", randomKey); 				// 서명원문
							addFormData(mOtpSignForm, "OTP_LEN", 0); 					// OTP길이
							addFormData(mOtpSignForm, "BKCD", "566"); 					// 은행코드
							addFormData(mOtpSignForm, "PA_TRN_TYPE", "1"); 				// 1:중앙회거래 2:저축은행거래
							token = resMOtp.params.TOKEN;
							
							doAction("COM2000", mOtpSignForm, 
								function(com2000Res){
									if (com2000Res.VLD == 'Y') {
										// com2000Res.VLD : Y:정상 그외 오류 
										AUTH_ERROR_CNT = 0;
										callbackFunc(com2000Res);
									} else {
										// 서명검증 오류 케이스
										AUTH_ERROR_CNT++;
										messageErrorView("서명에 실패하였습니다.<br>현재 오류 횟수 : "+AUTH_ERROR_CNT+"회", function(){authMOTP(callbackFunc, failCallbackFunc);});
									}
								}, 
								function(com2000Res){
									// 응답오류 케이스 (기관장애)
									messageErrorView("기관으로 부터 응답이 없습니다. 잠시 후 다시 시도하여 주십시오.", failCallbackFunc);
								}, false);
						}
					} else if(resMOtp.resultCd == "9998"){ // 인증 취소시
						messageView("인증을 취소하였습니다.", function(){failCallbackFunc();});
					} else if(resMOtp.resultCd == "9990"){ // 기기에 mOTP 존재하지 않을 때
						messageView("현재 기기에 mOTP가 존재하지 않습니다.<br>mOTP 등록 후 이용바랍니다.", function(){regMOTP(function(){authMOTP(callbackFunc);});});
					} else {
						messageView("인증처리 중 오류가 발생하였습니다.", function(){authMOTP(callbackFunc, failCallbackFunc);});
					}
				}, 
				function(resMOtp){
					// 응답오류 케이스 (기기장애)
					messageErrorView("인증처리 중 오류가 발생하였습니다.", function(){authMOTP(callbackFunc, failCallbackFunc);});
				}, false);
			}	
		}
		}, 
		function(com2000Res){
			messageErrorView("기관으로 부터 응답이 없습니다. 잠시 후 다시 시도하여 주십시오.", failCallbackFunc);
		}, false);
}

//****************************************************************************************************
//1. Description : mOTP 해지
//2. Parameters : 
//3. Return Type : void
//****************************************************************************************************
function terminateMOTP(){

	// mOTP 인증처리
	authMOTP(function(mOTPAuthRes){
		
		if (mOTPAuthRes.VLD == 'Y') { // mOTP 인증정상
			var mOtpForm = makeForm("mOtpForm");
			addFormData(mOtpForm, "txGbnCd", "M"); 			// 처리구분코드 M:mOTP등록
			addFormData(mOtpForm, "AUTH_TYPE", "0"); 		// 인증방식
			addFormData(mOtpForm, "TOKEN", ""); 			// MOTP 토큰 
			addFormData(mOtpForm, "TRMN_TRN_DVCD", "03"); 	// 01:등록 02:변경 03:해제
			// 해지 수행
			doAction("COM2000", mOtpForm,
					function(com2000Res){
						
				// 응답토큰 셋팅하여 인증서명 기동
				var reqDataTerminate = {"serviceCd":"AUTHORIZATION",
						 "params":{
							  "PRCS_DVCD":"MD"  // T:토큰등록(변경), R:인증수단등록, P:인증수행, M:mOtp 등록, MP:mOTP인증수행, MD:mOTP해지
							 ,"AUTH_TYPE":""  	// 0:최종등록타입 1:핀번호 2:지문 3:패턴 -> 등록 순서 1/2/3  
							 ,"AUTH_TOKEN":""  	// 기기정보로 저장할 인증토큰
							 ,"AUTH_MESG":""  	// 서명 시 싸인할 문구
							 ,"RANDOM_KEY":"" 	// 인증수행 시 사용할 랜덤키
							}};
				progressBar(false);
				ftBridgeExcutor.postMessage(reqDataTerminate, 
						function(resMOtp){
							if(resMOtp.resultCd == "0000") {		// 정상
								messageView("mOTP 해제 되었습니다.", function(){goMainPage();});
							} else if(resMOtp.resultCd == "9998") {	// 인증취소시
								
							} else if(resMOtp.resultCd == "9999") {	// 로그인 필요시
								messageView("로그인이 필요합니다.", goMainPage());
							} else {
								messageErrorView("mOTP 해제 처리 중 오류가 발생하였습니다.");
							}
						}, 
						function(resMOtp){
							messageErrorView("mOTP 해제 처리 중 오류가 발생하였습니다.");
						});
					}, 
					function(com2000Res){
						messageErrorView("mOTP 해제 처리 중 오류가 발생하였습니다.");
					});
		} else {
			messageErrorView("mOTP 해제 처리 중 오류가 발생하였습니다.");
		}
	});
}

//****************************************************************************************************
//1. Description : mOTP 등록
//2. Parameters : 
//3. Return Type : void
//****************************************************************************************************
function regMOTP(callbackFunc, frsReqYn){
	
	if (typeof(frsReqYn) == 'undefined' || frsReqYn === true) { // 최초요청인 경우 본인인증 수행
		var mOTPForm = new makeForm("mOTPForm");
		addFormData(mOTPForm, "nextPrcsFunc", "regMOTP");
		doActionView('COM0000', mOTPForm);
		
	} else {
		// 최초요청이 아닌경우
		var mOtpToken = ""; 
		var mOtpForm = makeForm("mOtpForm");
		addFormData(mOtpForm, "KND", "M"); // MOTP 
		doAction("COM2001", mOtpForm, function(com2001Res){
			mOtpToken = com2001Res.TOKEN;
			var reqDataAuth = {"serviceCd":"AUTHORIZATION",
					 "params":{
						  "PRCS_DVCD":"M"  			// T:토큰등록(변경), R:인증수단등록, P:인증수행, M:mOtp 등록, MP:mOTP인증수행 , A:smartApp인증등록, AP:스마트앱인증수행
						 ,"AUTH_TYPE":"0"	  		// 0:최종등록타입 1:핀번호 2:지문 3:패턴 -> 등록 순서 1/2/3  
						 ,"AUTH_TOKEN":mOtpToken 	// 기기정보로 저장할 인증토큰
						 ,"AUTH_MESG":""  			// 서명 시 싸인할 문구
						 ,"RANDOM_KEY":"" 			// 인증수행 시 사용할 랜덤키
						}};
			progressBar(false);
			ftBridgeExcutor.postMessage(reqDataAuth, 
				function(resMOtp){
					if(resMOtp.resultCd == "0000") {	// 정상일 경우 
						addFormData(mOtpForm, "txGbnCd", "M"); 			// 처리구분코드 M:mOTP등록 
						addFormData(mOtpForm, "TOKEN", mOtpToken); 		// MOTP 토큰
						addFormData(mOtpForm, "TRMN_TRN_DVCD", "01"); 	// 01:등록 02:변경 03:해제
						doAction("COM2000", mOtpForm, 
							function(com2000Res){
								if (typeof(callbackFunc) != 'undefined') {
									messageView("mOTP 등록이 완료되었습니다.", callbackFunc);
								} else {
									messageView("mOTP 등록이 완료되었습니다.", function(){goMainPage();});
								}
								SECU_MEDI_DVCD = "M";	// 등록완료시 보안매체구분코드 M:MOTP 셋팅
							}, 
							function(com2000Res){
								messageErrorView("mOTP 등록 처리 중 오류가 발생하였습니다.");
							});
					} else if(resMOtp.resultCd == "9994") {	// 연속된 비밀번호 다를 때 
						messageErrorView("입력한 숫자가 일치하지 않습니다.", function() {regMOTP(callbackFunc, false);});
					} else if(resMOtp.resultCd == "9995") {	// 유효성검사
						messageErrorView(resMOtp.params.msg, function() {regMOTP(callbackFunc, false);});
					} else if(resMOtp.resultCd == "9996") {	// 비밀번호 틀렸을시
						messageErrorView("비밀번호가 일치하지 않습니다.", function() {regMOTP(callbackFunc, false);});
					} else if(resMOtp.resultCd == "9997") {	// MOTP 이미 존재할시
						messageErrorView("등록 된 mOTP가 존재합니다.");
					} else if(resMOtp.resultCd == "9998") {	// 인증 취소시
						
					} else if(resMOtp.resultCd == "9999") {	// 로그인 필요시
						messageErrorView("로그인이 필요합니다.", function(){goMainPage();});
					} else {
						messageErrorView("mOTP 등록 처리 중 오류가 발생하였습니다.");
					}
				}, 
				function(resMOtp){
					messageErrorView("mOTP 등록 처리 중 오류가 발생하였습니다.");
				});
			
		}, function(){
			messageErrorView("mOTP 발급 처리 중 오류가 발생하였습니다.");
		});
	}
}

//****************************************************************************************************
//1. Description : 배너페이지 링크
//2. Parameters : 링크URL // 웹링크 또는 페이지 링크 처리
//3. Return Type : void
//****************************************************************************************************
function goBanner(value){
	if (value.indexOf("http") > -1) {
		webLink(value);
	} else {
		doActionURL(value);	
	}
}

//****************************************************************************************************
//1. Description : 공인인증서명처리
//2. Parameters : 서명데이터, 콜백
//3. Return Type : 서명데이터 
//params = {cn, dn, signCtns, encSignCtns, orgnlCtns}
//TODO 2021.02.24. 전자서명 요청 시 암호화된 실명번호 params.rbrno 필드에 setting 되도록 수정 전자서명 검증 시 실명검증 모듈로 호출필요
//****************************************************************************************************
function doSign(signData, signCallBack, signErrCallBack) {
	var com0002Form = makeForm("com0002Form");
	addFormData(com0002Form, "txGbnCd", "R"); // 암호화 실명번호 요청
	doAction("COM0002", com0002Form, 
			function(com0002ResDs){
				var reqData = {
						"serviceCd" : "SIGN_CERT",
						"params" : {
							"rbrno" : com0002ResDs.rbrno,
							"crtsNm" : "",
							"signData" : signData
						}
				};
				if (typeof(signErrCallBack) == "undefined") signErrCallBack = function(){messageErrorView("서명처리 중 오류가 발생하였습니다.")};
				ftBridgeExcutor.postMessage(reqData, signCallBack, signErrCallBack);
			}, 
			function(){
				messageErrorView("전자서명 처리 중 오류가 발생하였습니다.");
			});
}

//****************************************************************************************************
//1. Description : 사설인증서명처리
//2. Parameters : 서명데이터(생략시 인증만 수행), 콜백펑션, 오류콜백펑션
//3. Return Type : {"signOriData":서명원문,"elecSignData":전자서명문,"randomKey":서명랜덤키,"tokenId":서명토큰ID}
//****************************************************************************************************
function doSimpleSign(signOriData, signCallBack, signErrCallBack) { 
	if (typeof(signErrCallBack) == 'undefined') signErrCallBack = function(){goMainPage();};
	var randomKey = ""; 	// 서명랜덤키
	var tokenId   = ""; 	// 토큰ID
	var authType  = "0"; 	// 인증타입 1:PIN 0:최종등록 방식
	
	// APP_DATA 요청  (토큰ID, 인증타입)
	getAppData("tokenId,authType", 

		// bridge callbackFunc
		function(resData){
			tokenId = resData.params.tokenId;	// 토큰ID
			// 서명문 포함하는 거래는 PIN 인증으로만 수행
			authType = resData.params.authType;	// 인증타입
		
			// 중앙회오픈API 랜덤Key요청
			var com2002Form = makeForm("com2002Form");
			doAction("COM2002", com2002Form, 
					// doAction callBackFunc
					function(com2002resDs){
				
						if (isNotEmpty(com2002resDs.ID)) { // 중앙회오픈API 랜덤키 조회성공
					
							randomKey = com2002resDs.ID; // 인증서명용 랜덤키
					
							// TODO 아이폰 서명문 검증 조치 후 주석제거
							if (IS_IPHONE) signOriData = "";
							
							if (signOriData == "") signOriData = randomKey; // 서명문없이 들어오는 경우 랜덤키가 서명값
							
							if (AUTH_ERROR_CNT > AUTH_ERROR_MAX_CNT) {
								messageView("인증 가능 횟수를 초과하였습니다.", signErrCallBack);
							} else {
								// 응답토큰 셋팅하여 인증서명 기동
								var reqDataAuth = {"serviceCd":"AUTHORIZATION",
										 "params":{
											  "PRCS_DVCD":"P"  			// T:토큰등록(변경), R:인증수단등록, P:인증수행, M:mOtp 등록, MP:mOTP인증수행
											 //,"AUTH_TYPE":authType   	// 0:최종등록타입 1:핀번호 2:지문 3:패턴 -> 등록 순서 1/2/3  
											 ,"AUTH_TYPE":"0"   	// 0:인증선택 1:핀번호 2:지문 3:패턴 -> 등록 순서 1/2/3 
											 ,"AUTH_TOKEN":""  			// 기기정보로 저장할 인증토큰
											 ,"AUTH_MESG":signOriData  	// 서명 시 싸인할 문구
											 ,"RANDOM_KEY":randomKey 	// 인증수행 시 사용할 랜덤키
											// ,"TITLE":authTitle		// 인증수행 시 타이틀
											}};
								progressBar(false);
								ftBridgeExcutor.postMessage(reqDataAuth, function(signResData){
									if (signResData.resultCd == "0000") { // 서명정상
										
										if (isNotEmpty(signResData.params.SIGN)) { // 서명데이터 존재
											var elecSignData = signResData.params.SIGN; // 전자서명데이터
											// 서명검증
											var signAuthForm = makeForm("signAuthForm");
											addFormData(signAuthForm, "txGbnCd", "P"); 			// P:인증수행 서명검증
											addFormData(signAuthForm, "ID", randomKey); 		// 랜덤키
											addFormData(signAuthForm, "SIG", elecSignData);  	// 서명데이터
											addFormData(signAuthForm, "MSG", signOriData); 		// 서명데이터원문 없으면 랜덤키로 
											addFormData(signAuthForm, "tokenId", tokenId); 		// 토큰ID
											
											doAction("COM2003", signAuthForm, 
												// doAction callbackFunc
												function(resSignAuthRes){
												
													if (typeof(resSignAuthRes.COMDEVICE_YN) != "undefined") {
														if (resSignAuthRes.COMDEVICE_YN == "N") {
															messageView("기기 인증정보가 변경되었습니다.<br/>사용자인증을 수행합니다.", signErrCallBack);
														} else if (resSignAuthRes.VLD == "true") { 
															// 서명정상
															AUTH_ERROR_CNT = 0;
															var signRsltResDs = {"VLD":resSignAuthRes.VLD,"signOriData":signOriData,"elecSignData":elecSignData,"randomKey":randomKey,"tokenId":tokenId};
															signCallBack(signRsltResDs);
														} else {
															// 서명검증 오류 케이스
															AUTH_ERROR_CNT++;
															messageErrorView("서명에 실패하였습니다.<br>현재 오류 횟수 : "+AUTH_ERROR_CNT+"회", function(){doSimpleSign(signOriData, signCallBack, signErrCallBack)});
														}
													} else {
														messageView("인증처리 중 오류가 발생하였습니다.",
																function(){doSimpleSign(signOriData, signCallBack, signErrCallBack)});	
													}
												}, function(){
													// 응답오류 케이스 (기관장애)
													messageView("기관으로 부터 응답이 없습니다. 잠시 후 다시 시도하여 주십시오.", signErrCallBack);
															//function(){doSimpleSign(signOriData, signCallBack, signErrCallBack)});		
												}, false);
											
										} else {
											messageView("인증처리 중 오류가 발생하였습니다.",
													function(){doSimpleSign(signOriData, signCallBack, signErrCallBack)});	
										}
									} else if(signResData.resultCd == "9998"){ // 사설인증 취소시
										messageView("인증을 취소하였습니다.", function(){signErrCallBack()});	
									} else {
										messageView("인증처리 중 오류가 발생하였습니다.",
												function(){doSimpleSign(signOriData, signCallBack, signErrCallBack)});
									}
								});
							}
				} else {
					messageView("인증처리 중 오류가 발생하였습니다.", function(){doSimpleSign(signOriData, signCallBack, signErrCallBack)});			
				}
			}, function(){
				messageView("기관으로 부터 응답이 없습니다. 잠시 후 다시 시도하여 주십시오.", signErrCallBack);
						//function(){doSimpleSign(signOriData, signCallBack, signErrCallBack)});	
			}, false);
		});
}


//****************************************************************************************************
//1. Description : 본인인증완료 처리
//2. Parameters : 
//3. Return Type : void
//****************************************************************************************************
function authComplete(custNo) {
	setAppData({"custNo":custNo}, authRegProcess);
}

//****************************************************************************************************
//1. Description : 보안카드 보안매체
//2. Parameters : 
//3. Return Type : void
//****************************************************************************************************
function authSecuCard(callbackFunc, signErrCallBack) {
	messageView("현재 보안매체(보안카드) 사용중이십니다<br>mOTP을 등록하겠습니다", function(){regMOTP(function(){authMOTP(callbackFunc, signErrCallBack);});});
	
//	if (typeof(signErrCallBack) == 'undefined') signErrCallBack = function(){goMainPage();};
//	
//	//input 초기화
//	$("#inputCardNum1").val("");
//	$("#inputCardNum2").val("");
//	$("#inputCardNum3").val("");
//	
//	var reqSecuCardForm = makeForm("reqSecuCardForm");
//	addFormData(reqSecuCardForm, "txGbnCd", "CARD_Q");		//보안카드인증요청
//	doAction("DEP2500", reqSecuCardForm, function(resDs){
//		
//		if(resDs.API_RS_MSG === "SUCCESS" ) {
//			
//			var SECUNO_IDX1 = resDs.SECUNO_IDX1;
//			var SECUNO_IDX2 = resDs.SECUNO_IDX2;
//			$("#secuCard1").html(SECUNO_IDX1);
//			$("#secuCard2").html(SECUNO_IDX2);
//			//팝업 show
//			$(".alert_pop").show();
//			$('.authCard_lay').show();
//			
//			$("#reqAuthCardBtn").unbind();
//			$("#reqAuthCardBtn").click(function(){
//				//팝업 hide
//				$(".alert_pop").hide();
//				$(".authCard_lay").hide();
//				
//				var SECU_CARD_PWD1_700 	= $("#inputCardNum1").val();
//				var SECU_CARD_PWD2_700 	= $("#inputCardNum2").val();
//				var SECU_CARD_SRNO 		= $("#inputCardNum3").val();
//				
//				var authSecuCardForm = makeForm("authSecuCardForm");
//				addFormData(authSecuCardForm, "txGbnCd", "CARD_A");					//보안카드인증확인
//				addFormData(authSecuCardForm, "SECU_CARD_INDC_NO1", SECUNO_IDX1);
//				addFormData(authSecuCardForm, "SECU_CARD_PWD1_700", SECU_CARD_PWD1_700);
//				addFormData(authSecuCardForm, "SECU_CARD_INDC_NO2", SECUNO_IDX2);
//				addFormData(authSecuCardForm, "SECU_CARD_PWD2_700", SECU_CARD_PWD2_700);
//				addFormData(authSecuCardForm, "ATSH_ISS_YN", "");
//				addFormData(authSecuCardForm, "SECU_CARD_SRNO", SECU_CARD_SRNO);
//
//				doAction("DEP2500", authSecuCardForm, function(resDs){
//					if(resDs.API_RS_MSG === "SUCCESS" ) {
//						callbackFunc(resDs);
//					} else {
//						messageView(resDs.API_RS_MSG, function(){authSecuCard(callbackFunc, signErrCallBack)});
//					}
//					
//				},function(){ 
//					messageView(resDs.API_RS_MSG, function(){authSecuCard(callbackFunc, signErrCallBack)});
//				});
//			});
//			
//			//취소버튼 클릭 시
//			$("#cancleAuthCardBtn").unbind();
//			$("#cancleAuthCardBtn").click(function(){
//				//팝업 hide
//				$(".alert_pop").hide();
//				$(".authCard_lay").hide();
//				
//				signErrCallBack();
//			});
//		} else {
//			messageView(resDs.API_RS_MSG, signErrCallBack);
//		}
//	}, function(){ 
//		messageView("인증처리 중 오류가 발생하였습니다.", signErrCallBack);	
//	});
}

//****************************************************************************************************
//1. Description : OTP 보안매체
//2. Parameters : 
//3. Return Type : void
//****************************************************************************************************
function authOTP(callbackFunc, failCallbackFunc) {
	if (typeof(failCallbackFunc) == 'undefined') failCallbackFunc = function(){goMainPage();};
	
	if (IS_MOBILE) {
		runTransKey("5", function(encData){
			if (isEmpty(encData)) {
				messageErrorView("OTP 인증처리 중 오류가 발생하였습니다.", failCallbackFunc);
			} else {
				authOTPProcess(encData, callbackFunc, failCallbackFunc);
			}
		});
	
	} else {
		var acntPwd = prompt("발급받으신 OTP에 생성된 번호 6자리를 입력해주세요.");
		authOTPProcess(acntPwd, callbackFunc, failCallbackFunc);
	}
}
function authOTPProcess(encData, callbackFunc, failCallbackFunc) {

	var authOTPForm = makeForm("authOTPForm");
	addFormData(authOTPForm, "OTP_TRN_GBN", "200101");	// OTP거래구분
	addFormData(authOTPForm, "OTP_OTPT_VAL", encData);	// OTP인증번호
	doAction("COM2101", authOTPForm,
			function(com2101Res){
				var respCd = com2101Res.RESP_CD;
				var errNtm = com2101Res.ERR_NTM;
				
				switch(respCd) {
					case "0000" : 
						callbackFunc(com2101Res);
						break;
					case "6000" : 
						messageErrorView("인증실패, 현재 오류횟수 " + errNtm + "회", function(){authOTP(callbackFunc, failCallbackFunc)}); 
						break;
					case "6001" : 
						messageErrorView("인증실패, 현재 오류횟수 " + errNtm + "회", function(){authOTP(callbackFunc, failCallbackFunc)}); 
						break;
					case "6002" : 
						// OTP 사용자보정 펑션생성  => 0000 6003(보정거래불가 케이스) 나머지 기타오류
						messageErrorView("인증실패, OTP 사용자 보정을 진행하세요", failCallbackFunc); 
						break;
					case "6006" :
						// OTP 등록메뉴로 이동  => 레이어 호출
						messageErrorView("등록된 기기가 아닙니다. OTP 등록 후 사용가능합니다.", failCallbackFunc); 
						break;
					case "6010" : 
						messageErrorView("인증번호 자리수 또는 숫자/문자 오입력", function(){authOTP(callbackFunc, failCallbackFunc)}); 
						break;
					default : 
						messageErrorView(com2101Res.API_RS_MSG, failCallbackFunc); 
						break;
				}
			}, function(com2101Res){
				messageErrorView(com2101Res.API_RS_MSG, failCallbackFunc);
			}, false);
}
//****************************************************************************************************
//1. Description : 사설인증등록
//2. Parameters : 
//3. Return Type : void
//****************************************************************************************************
function authRegProcess() {
try {
	setCookie("authorization", ""); // 기존인증정보 삭제
	
	// 고객번호 요청
	getAppData("custNo",
		
		// bridgeExcutor callBackFunc
		function(resData){
		
			if (isNotEmpty(resData.params.custNo)) {
				
				var com2001Form = makeForm("com2001Form");
				addFormData(com2001Form, "UUID", resData.params.custNo); // 고객번호
				addFormData(com2001Form, "KND", "P"); 					 // P사설인증
				doAction("COM2001", com2001Form,
					// doAction callBackFunc	
					function(com2001Res){
						if (typeof(com2001Res.TOKEN) != "undefined" && com2001Res.TOKEN != "") { // 중앙회 오픈API 토큰조회성공

							authReg("1", // 1:핀번호 등록 
									// callBackFunc
									function(authRegResData){
										if (authRegResData.resultCd == "0000") {
											setAppData({"authType":"1"});
											confirmView("생체(지문,페이스)인증 수단을 등록하시겠습니까?", 
													// confirmView agreeFunc
													function(){
														authReg("2",
																// bridgeExcutor callBackFunc															
																function(authRegResData2){
																	if (authRegResData2.resultCd == "0000") {	// 정상
																		setAppData({"authType":"2"});
																		confirmView("패턴을 등록하시겠습니까?",
																				// confirmView agreeFunc
																				function(){
																					authReg("3", 
																							// bridgeExcutor callBackFunc
																							function(authRegResData3){
																								if (authRegResData3.resultCd == "0000") {	// 정상
																									setAppData({"authType":"3"});
																									NEXT_PROCESS_FUNC();
																								} else {	// 오류
																									messageErrorView(authRegResData3.params.msg, NEXT_PROCESS_FUNC);
																								}
																							});
																				}, 
																				// confirmView disAgreeFunc																		
																				NEXT_PROCESS_FUNC);	
																	} else {	// 오류
																		messageErrorView(authRegResData2.params.msg, function(){confirmView("패턴을 등록하시겠습니까?",
																				// confirmView agreeFunc
																				function(){
																					authReg("3", 
																							// bridgeExcutor callBackFunc
																							function(authRegResData3){
																								if (authRegResData3.resultCd == "0000") {	// 정상
																									setAppData({"authType":"3"});
																									NEXT_PROCESS_FUNC();
																								} else {	// 오류
																									messageErrorView(authRegResData3.params.msg, NEXT_PROCESS_FUNC);
																								}
																							});
																				}, 
																				// confirmView disAgreeFunc																		
																				NEXT_PROCESS_FUNC);
																		});
																	}	
																});
													}, 
													// confirmView disAgreeFunc
													function(){confirmView("패턴을 등록하시겠습니까?",
															// confirmView agreeFunc
															function(){
																authReg("3", 
																		// bridgeExcutor callBackFunc
																		function(authRegResData3){
																			if (authRegResData3.resultCd == "0000") {	// 정상
																				setAppData({"authType":"3"});
																				NEXT_PROCESS_FUNC();
																			} else {	// 오류
																				messageErrorView(authRegResData3.params.msg, NEXT_PROCESS_FUNC);
																			}
																		});
															}, 
															// confirmView disAgreeFunc																		
															NEXT_PROCESS_FUNC)});
										} else if (authRegResData.resultCd == "9998") {	//취소시
											confirmView("핀번호를 설정하지 않으면 본인인증이 완료되지 않습니다.<br> 본인인증을 취소하시겠습니까?",
													function(){goMainPage();}, function(){authRegProcess()});
										} else if(authRegResData.resultCd == "9996") {	// 연속된 비밀번호 다를 때 
											messageErrorView("입력한 숫자가 일치하지 않습니다.", function(){authRegProcess()});
										} else if(authRegResData.resultCd == "9995") {	// 유효성검사
											messageErrorView(authRegResData.params.msg, function(){authRegProcess()});
										} else {
											messageErrorView("PIN번호 등록 처리 중 오류가 발생하였습니다.");
										}
									}, com2001Res.TOKEN);
							
						} else { // 중앙회 오픈API 토큰조회오류
							messageView("인증정보 등록 중 오류가 발생하였습니다.");
						}
				});
			} else {
				confirmView("회원인증정보가 존재하지 않습니다. 회원인증을 수행합니다.", goAuthPage, goMainPage);
			}
		}); 
} catch(e) {
	alert(e);
}
	
}



//****************************************************************************************************
//1. Description : 토큰 key에 해당하는 데이터를 얻는다
//2. Parameters : String key 
//3. Return Type : String value
//****************************************************************************************************
function getAppData(reqField, succFunc, failFunc){
	
	if (typeof(failFunc) == "undefined") {
		failFunc = function(){};
	}
	var reqData = {
			"serviceCd":"APP_DATA", 
			"params":{"gubun":"R", "reqData":reqField}
	};
	try {
		ftBridgeExcutor.postMessage(reqData, succFunc, failFunc);	
	} catch (e) {
		alert(e);
	}
	
}
//****************************************************************************************************
//1. Description : 앱데이터등록
//2. Parameters : reqField JSONObject ex) {"authType":"1"}
//3. Return Type : void
//****************************************************************************************************
function setAppData(reqField, callbackFunc) {
	var reqData = {
			"serviceCd":"APP_DATA", 
			"params":{"gubun":"C", "reqData":reqField}
		};
	ftBridgeExcutor.postMessage(reqData, callbackFunc);
}

//****************************************************************************************************
//1. Description : 사설인증방식등록
//2. Parameters : 
//3. Return Type : void
//****************************************************************************************************
function authReg(authType, callbackFunc, authToken) {
	
	var prcsDvcd = ""; // 처리구분
	
	if (isEmpty(authToken)) {
		authToken = "";
		prcsDvcd = "R"; // 처리구분 R:인증수단등록
	} else {
		prcsDvcd = "T"; // 처리구분 T:토큰등록(변경)
	}
	if (isEmpty(callbackFunc)) {
		callbackFunc = goMainPage;
	}
	
	var reqData = {"serviceCd":"AUTHORIZATION",
			"params":{
			  "PRCS_DVCD":prcsDvcd		// T:토큰등록(변경), R:인증수단등록, P:인증수행, M:mOtp 등록, MP:mOTP인증수행
			 ,"AUTH_TYPE":authType 		// 0:최종등록타입 1:핀번호 2:지문 3:패턴 -> 등록 순서 1/2/3  
			 ,"AUTH_TOKEN":authToken	// 기기정보로 저장할 인증토큰
			 ,"AUTH_MESG":"" 			// 서명 시 싸인할 문구
			 ,"RANDOM_KEY":"" 			// 인증수행 시 사용할 랜덤키
			 //,"TITLE":""				// 인증수행 시 타이틀 미 요청 시 간편로그인 (요거 없는듯?)
			}};
	progressBar(false);
	ftBridgeExcutor.postMessage(reqData, callbackFunc);
}

function logoutExec() {
	
	//앱최초기동시 뒤로가기버튼 방지 
	if($("#frsReqYn").val()==""){
		return;
	}
	
	confirmView("앱을 종료하시겠습니까?", 
			function(){
				setCookie("authorization", ""); // 인증토큰삭제
				var reqData = {
					"serviceCd":"APP_CLOSE"
				   ,"params":{}
				};
				ftBridgeExcutor.postMessage(reqData, function(){});
			}, function(){});
} 

//****************************************************************************************************
//1. Description : 로그인실행
//2. Parameters : 
//3. Return Type : void
//****************************************************************************************************
function loginExec(randomKey, authType, callbackFunc, authMesg, authTitle){

	if (typeof(authMesg) == "undefined" || authMesg == "") authMesg = randomKey;
	
	if (AUTH_ERROR_CNT > AUTH_ERROR_CHECK_CNT && authType != "1") authType = "1"; // 오류 발생 시 PIN 으로  인증시도 
	if (AUTH_ERROR_CNT > AUTH_ERROR_MAX_CNT) {
		messageView("인증 가능 횟수를 초과하였습니다. 사용자 인증을 다시 수행합니다.", goAuthPage);
	} else {
		// 응답토큰 셋팅하여 인증서명 기동
		var reqDataAuth = {"serviceCd":"AUTHORIZATION",
				 "params":{
					  "PRCS_DVCD":"P"  			// T:토큰등록(변경), R:인증수단등록, P:인증수행, M:mOtp 등록, MP:mOTP인증수행
					 ,"AUTH_TYPE":authType   	// 0:최종등록타입 1:핀번호 2:지문 3:패턴 -> 등록 순서 1/2/3  
					 ,"AUTH_TOKEN":""  			// 기기정보로 저장할 인증토큰
					 ,"AUTH_MESG":authMesg   	// 서명 시 싸인할 문구
					 ,"RANDOM_KEY":randomKey 	// 인증수행 시 사용할 랜덤키
					// ,"TITLE":authTitle			// 인증수행 시 타이틀
					}};
		progressBar(false);
		ftBridgeExcutor.postMessage(reqDataAuth, callbackFunc);
	}
}

//****************************************************************************************************
//1. Description : 사설인증서명
//2. Parameters :
//3. Return Type : void
//****************************************************************************************************
function signAuthorization(signReqData, callbackFunc) {
	var randomKey = ""; // 랜덤키
	var tokenId   = ""; // 토큰ID

	// APP_DATA 고객번호 요청
	getAppData("tokenId", function(resAppData) {
		tokenId = resAppData.params.tokenId;
		
		// 서명용 중앙회오픈API 랜덤Key요청
		var com2002Form = makeForm("com2002Form");
		addFormData(com2002Form, "txGbnCd", "R"); // R:랜덤키요청
		
		doAction("COM2002", com2002Form, 
			// doAction callBackFunc
			function(com2002ResDs){
			
				if (isNotEmpty(com2002ResDs.ID)) { // 중앙회오픈API 랜덤키 조회성공
					
					randomKey = com2002ResDs.ID;
					
					loginExec(randomKey, 
							"1",	// 인증타입 1:PIN 
							// bridge callbackFunc
							function(loginExecResData){
						
								if (loginExecResData.resultCd == "0000") { // 서명정상
								
									if (isNotEmpty(loginExecResData.params.SIGN)) { // 서명데이터 존재
										
										var signData = loginExecResData.params.SIGN;
										
										// 서명검증
										var signAuthForm = makeForm("signAuthForm");
										addFormData(signAuthForm, "txGbnCd", "P"); 							// P:인증수행 서명검증
										addFormData(signAuthForm, "ID", randomKey); 						// 랜덤키
										addFormData(signAuthForm, "SIG", signData);  						// 서명데이터
										addFormData(signAuthForm, "MSG", signReqData.replace(/\n/g, "")); 	// 서명데이터원문  
										addFormData(signAuthForm, "tokenId", tokenId); 						// 서명토큰ID
										
										doAction("COM2003", signAuthForm, 
											// doAction callbackFunc
											function(resSignAuthRes){
											
												if (typeof(resSignAuthRes.tokenReSettingYn) != "undefined" && resSignAuthRes.tokenReSettingYn == "Y") {
													messageView("기기 인증정보가 변경되었습니다.<br/>사용자인증을 수행합니다.", goAuthPage);
													
												} else if (typeof(resSignAuthRes.VLD) != "undefined" &&  resSignAuthRes.VLD == "true") { // 서명정상
													AUTH_ERROR_CNT = 0;
													
													try {
														var signResData = { // 서명응답데이터
															    "crtsKeyInf":tokenId 	  			// 서명키정보
															   ,"crtsSignCtns":signReqData  		// 서명내용
															   ,"signMsgOrgnlCtns":signData 		// 서명메시지원문
															};
														callbackFunc(signResData);	
													} catch(e) {
														alert(e);
													}
													
												} else { // 서명오류
													AUTH_ERROR_CNT++;
													messageView("서명에 실패하였습니다.", 
														function(){
															signAuthorization(signReqData, callbackFunc);
														});
												}
											});
									} else {
										messageView("서명처리 중 오류가 발생하였습니다.");	
									}
								} else if (loginExecResData.resultCd == "9998") {	//취소시
									
								} else {
									messageView("취소 되었습니다.");
								}
							},
							// 서명문
							signReqData.replace(/\n/g, ""),
							// 타이틀
							"전자서명");	
				} else {
					messageView("서명처리 중 오류가 발생하였습니다.");			
				}
			});
	});
}

/**
 * 외부APP 연결
 */
function linkApp(uri, appId){
	
	// SB톡톡+
	if (appId == "kr.or.sbbank.plus" && IS_IPHONE) {
		uri = "itms-apps://apps.apple.com/kr/app/sb톡톡플러스/id1469002262";
		appId = "sbtokplus://";
	}
	
	// 민원(정부)24
	if (appId == "kr.go.minwon.m" && IS_IPHONE) {
		uri = "itms-apps://apps.apple.com/fr/app/민원24-모바일/id586454505";
		appId = "minwon24apk://";
	}
	
	var reqData = {
		"serviceCd":"APP_LINK",
		"params":{
			"uri":uri,
			"appId":appId
		}
	};
	ftBridgeExcutor.postMessage(reqData);
}

/**
 * 로그인처리
 */
function doLogin(){
	
	try {
		var custNo 	  = ""; 	// 고객번호
		var randomKey = ""; 	// 서명랜덤키
		var signData  = ""; 	// 서명데이터
		var pushKey   = ""; 	// 푸시키
		var tokenId   = ""; 	// 토큰ID
		var authType  = "0"; 	// 인증타입
		
		if (AUTH_ERROR_CNT > AUTH_ERROR_MAX_CNT) {
			messageView("인증 가능 횟수를 초과하였습니다. 사용자 인증을 다시 수행합니다.", goAuthPage);
		} else {
			// APP_DATA 고객번호 요청
			getAppData("custNo,pushKey,tokenId,authType", 

				// bridge callbackFunc
				function(resData){
					if (isNotEmpty(resData.params.custNo)) { // 고객번호 존재
						
						custNo = resData.params.custNo;
						pushKey = resData.params.pushKey;
						tokenId = resData.params.tokenId;
						authType = (typeof(resData.params.authType) == "undefined" || resData.params.authType == "") ? "0" : resData.params.authType;
						
						if (isEmpty(tokenId)) { // 인증토큰 존재하지 않음
							messageView("인증정보가 등록되지 않았습니다.<br/>사용자인증을 수행합니다.", goAuthPage);
						} else {
							// 로그인 기동 중앙회오픈API 랜덤Key요청
							var com2002Form = makeForm("com2002Form");
							doAction("COM2002", com2002Form, 
								// doAction callBackFunc
								function(com2002resDs){
									if (isNotEmpty(com2002resDs.ID)) { // 중앙회오픈API 랜덤키 조회성공
										
										randomKey = com2002resDs.ID;
										
										// 응답토큰 셋팅하여 인증서명 기동
										var reqDataAuth = {"serviceCd":"AUTHORIZATION",
												 "params":{
													  "PRCS_DVCD":"P"  			// T:토큰등록(변경), R:인증수단등록, P:인증수행, M:mOtp 등록, MP:mOTP인증수행
													 //,"AUTH_TYPE":authType   	// 0:최종등록타입 1:핀번호 2:지문 3:패턴 -> 등록 순서 1/2/3  
													 ,"AUTH_TYPE":"0"   	// 0:인증선택 1:핀번호 2:지문 3:패턴 -> 등록 순서 1/2/3  
													 ,"AUTH_TOKEN":""  			// 기기정보로 저장할 인증토큰
													 ,"AUTH_MESG":randomKey  	// 서명 시 싸인할 문구
													 ,"RANDOM_KEY":randomKey 	// 인증수행 시 사용할 랜덤키
													// ,"TITLE":authTitle			// 인증수행 시 타이틀
													}};
										progressBar(false);
										ftBridgeExcutor.postMessage(reqDataAuth, function(loginExecResData){
											if (loginExecResData.resultCd == "0000") { // 서명정상
												
												if (isNotEmpty(loginExecResData.params.SIGN)) { // 서명데이터 존재
													signData = loginExecResData.params.SIGN;
													
													// 서명검증
													var signAuthForm = makeForm("signAuthForm");
													addFormData(signAuthForm, "txGbnCd", "P"); 			// P:인증수행 서명검증
													addFormData(signAuthForm, "ID", randomKey); 		// 랜덤키
													addFormData(signAuthForm, "SIG", signData);  		// 서명데이터
													addFormData(signAuthForm, "MSG", randomKey); 		// 서명데이터원문 없으면 랜덤키로 
													addFormData(signAuthForm, "pushKeyVl", pushKey); 	// 푸시키
													addFormData(signAuthForm, "tokenId", tokenId); 		// 토큰ID
													addFormData(signAuthForm, "appCustNo", custNo);		// 고객번호
													addFormData(signAuthForm, "isLogin", "Y");			// 로그인거래여부
													
													doAction("COM2003", signAuthForm, 
														// doAction callbackFunc
														function(resSignAuthRes){
														
															if (typeof(resSignAuthRes.COMDEVICE_YN) != "undefined"){
																
																if (resSignAuthRes.COMDEVICE_YN == "N") {
																	messageView("기기 인증정보가 변경되었습니다.<br/>사용자인증을 수행합니다.", goAuthPage);
																	
																} else if (resSignAuthRes.VLD == "true") { // 서명정상
																	AUTH_ERROR_CNT = 0;
																	NEXT_PROCESS_FUNC();
																} else { // 서명오류
																	AUTH_ERROR_CNT++;
																	messageErrorView("올바르지 않은 인증데이터 입니다. [" + AUTH_ERROR_CNT + "]회 오류", doLogin);	
																}
																
															} else {
																messageErrorView("인증 처리 중 오류가 발생하였습니다. 잠시 후 다시 시도하여 주십시오.", goMainPage);
															}
														}, function(){
															messageErrorView("인증 처리 중 오류가 발생하였습니다. 잠시 후 다시 시도하여 주십시오.");
														}, false);
												} else {
													AUTH_ERROR_CNT++;
													messageView("인증처리 중 오류가 발생하였습니다.", doLogin);
												}
											} else {
												confirmView("앱을 종료하시겠습니까?", 
													function(){
														setCookie("authorization", ""); // 인증토큰삭제
														var reqData = {
															"serviceCd":"APP_CLOSE"
														   ,"params":{}
														};
														ftBridgeExcutor.postMessage(reqData, function(){});
													}, doLogin);
											}
										}, function(loginExecResData){
											messageView("회원인증 처리 중 오류가 발생하였습니다.", doLogin);	
										});	
											
									} else {
										messageErrorView("서버에서 응답이 없습니다. 잠시 후 다시 시도하여 주십시오.");
									}
								}
								,function(){
									progressBar(false);
									messageErrorView("서버에서 응답이 없습니다. 잠시 후 다시 시도하여 주십시오.");
								} 
								,false // 프로그래스바 종료하지 않음
								);
						}
					} else {
						messageView("스마트저축은행의 모바일 뱅킹 앱 smart-i는 회원 가입 후 이용 가능합니다. 회원가입을 진행 해주세요.", goAuthPage);
					}
				});
		}

	} catch (e) {
		alert(e);
	}
}

/**
 * 외부브라우저 웹링크
 * PARAMS
 * url : 호출URL
 * succFuncName : 성공 callBack function Name :: 셋팅하지 않으면 기본 로그 success call
 * failFuncName : 실패 callBack function Name :: 셋팅하지 않으면 기본 로그 fail call
 * ex: webLink("https://www.jtchinae-bank.co.kr/customer/custormerNote.do")
 */  
function webLink(url, succFunc, failFunc) {
	var reqData = {
			"serviceCd":"WEB_LINK",
			"params":{"url":url}
	};
	ftBridgeExcutor.postMessage(reqData, succFunc, failFunc);
}

/**
 * 달력연동
 */
function getCalendar(calendar) {
	var reqData = {
			"serviceCd":"CALENDAR", 
			"params":{}
	};
	ftBridgeExcutor.postMessage(reqData, succFunc, failFunc);
}

//****************************************************************************************************
//1. Description : 콜센터 전화하기
//2. Parameters : String 메시지
//3. Return Type : void
//****************************************************************************************************
function callCenter(number) {
	if (number == undefined ||  number == "undefined" || number == "") {
		number = "15990060";
	}
	top.location.href = "tel:" + number;
}


//****************************************************************************************************
//1. Description : 추가인증
//2. Parameters : 
//3. Return Type : void
//****************************************************************************************************
var ARS_AUTHTELNO = "";
function addAuth(callbackFunc, signErrCallBack, reqCd) {

	if (typeof(signErrCallBack) == 'undefined') signErrCallBack = function(){goMainPage();};
	
	// 추가인증 팝업스크립트 ARS/스마트앱인증
	$('.x2 li').click(function(){
		var tab_id = $(this).attr('data-tab');
		$("#tab_dstc").val(tab_id);
	});
	
	// 추가인증 Layer close
	$("#certCloseBtn").click(function(){
		confirmView("인증을 취소하시겠습니까?"
			, function(){
				modalOff();
				signErrCallBack();}
			, function(){
				modalOn('certification');	
			});
	});
	
	// 요청코드 reg 는 스마트앱인증 등록 거래
	if (reqCd == "reg") {
		$("#smaAppAuthBtn").hide();
		$("#arsAuthBtn").click();
	} else {
		$("#smaAppAuthBtn").show();
	}
	
	//input 초기화
	$("#cel_tlno").html("");
	$("#home_tlno").html("");
	$("#com_tlno").html("");
	var CEL_TLNO = "";	// 휴대폰번호
	var HOME_TLNO = "";	// 집전화번호
	var COM_TLNO = "";	// 직장전화번호
	
	// 고객 전화번호 조회 
	var reqSecuARSForm = makeForm("reqSecuARSForm");
	addFormData(reqSecuARSForm, "txGbnCd", "TS");		// ARS인증용 연락처조회
	doAction("DEP2500", reqSecuARSForm, 
			// 고객전화번호 조회 SuccFunc
			function(resDs){
				modalOn('certification');		
				//$(".certification_lay").show();	// ARS인증 레이어
				if (resDs.API_RS_MSG == "SUCCESS") {
					CEL_TLNO = resDs.CEL_TLNO;
					HOME_TLNO = resDs.HOME_TLNO;
					COM_TLNO = resDs.COM_TLNO;
					// 휴대전화번호 처리
					if (CEL_TLNO != "") {
						$("#celTlno").show();
						$("#cel_tlno").html(CEL_TLNO.substring(0,3) + "-" + CEL_TLNO.substring(3,7) + "-");
					} else {
						$("#certification_radio1").prop("checked", false);
						if(HOME_TLNO != "") {
							$("#certification_radio2").prop("checked", true);
						} else if(COM_TLNO != "") {
							$("#certification_radio3").prop("checked", true);
						}
					}
					// 집전화 처리
					if (HOME_TLNO != "") {
						$("#homeTlno").show();
						$("#home_tlno").html(HOME_TLNO.substring(0,3) + "-" + HOME_TLNO.substring(3,7) + "-");
					}
					// 회사전화번호 처리
					if (COM_TLNO != "") {
						$("#comTlno").show();
						$("#com_tlno").html(COM_TLNO.substring(0,3) + "-" + COM_TLNO.substring(3,7) + "-");
					}
					
					// 추가인증 인증요청 클릭시
					$(".addAuth_req").unbind();
					$(".addAuth_req").click(function(){		
						if ($("#tab_dstc").val() == "certi-ARS") { // ARS인증
							if((CEL_TLNO != "") || (HOME_TLNO != "") || (COM_TLNO != "")){	
								//$(".certification_alt1").show(); // 인증을 하시겠습니까 메시지
								editConfirmView("전화승인(ARS)를 요청하셨습니다.<br>	단, 통신사 부가서비스나 고객님 핸드폰에서 수신거절 처리된 경우 전화수신이 안될 수 있습니다.", "알림", "확인", "취소",
										function()/**확인시*/{
											if($("#certification_radio1").is(":checked")){
												ARS_AUTHTELNO = CEL_TLNO;
											}
											else if($("#certification_radio2").is(":checked")){
												ARS_AUTHTELNO = HOME_TLNO;
											}
											else if($("#certification_radio3").is(":checked")){
												ARS_AUTHTELNO = COM_TLNO;
											}
											authARSStep1(callbackFunc, signErrCallBack); // ARS 인증요청 이벤트 등록
								}, function()/**취소시*/{
									messageView("ARS인증을 취소하였습니다.", signErrCallBack);
								});
							}
						} else if ($("#tab_dstc").val() == "certi-SMART") { // 스마트앱 인증 
							// 스마트앱인증 기동 만 처리
							authSmartAppAuth(callbackFunc, signErrCallBack);
						}
					});
				} else { // API메시지 오류
					messageErrorView(resDs.API_RS_MSG, signErrCallBack);
				}
				
			}, function(){ 
				// ARS인증용 연락처조회 doAction Fail Func
				messageView("인증처리 중 오류가 발생하였습니다.", signErrCallBack);	
			});
}

/**
 * ARS인증
 * @param callbackFunc
 * @param signErrCallBack
 */
function authARSStep1(callbackFunc, signErrCallBack) {			
			
		var authARSForm = makeForm("authARSForm");
	addFormData(authARSForm, "txGbnCd", "ARS");					// 2채널인증(ARS전화승인)_인증요청
	addFormData(authARSForm, "ARS_ORGCD", "566"); 
	addFormData(authARSForm, "ARS_FLAG", "4");					// ARS 인증 타입(0:인증요청, 1:인증확인, 4:인증번호 요청)
	addFormData(authARSForm, "ARS_TARGETSERVICE", "07");		// 목적 서비스(01 : 아이디 조회, 02 : 공인 인증서 관리, 03 : 단말기 지정 관리, 04 : 단말기 등록 관리, 05 : 미지정 단말 이체, 06 : 고객 정보 변경, 07 : 서비스 관리 ) TODO 코드 확인
	addFormData(authARSForm, "ARS_AUTHTELNO", ARS_AUTHTELNO); 	// 승인전화번호
	addFormData(authARSForm, "ARS_SVCMANWORKCD", "01");
		
	doAction("DEP2500", authARSForm, 
		function(resAuthARSDs){
			if (resAuthARSDs.API_RS_MSG == "SUCCESS") { // 인증번호 요청 성공

				// 트랜잭션 ID /인증번호 초기화
				$("#arsTransid").val("");
				$("#arsSsn").val("");	
				//인증요청 팝업 호출
				messageView("인증번호"+resAuthARSDs.ARS_SSN+"을 눌러주세요.");
				$("#arsTransid").val(resAuthARSDs.ARS_TRANSID);
				$("#arsSsn").val(resAuthARSDs.ARS_SSN);
				setTimeout(function(){
					authARSStep2(callbackFunc, signErrCallBack);	
				}, 1000);
					
			} else {
				messageErrorView(resAuthARSDs.API_RS_MSG, function(){signErrCallBack()});
			}},
		function(){
			messageErrorView("인증요청 중 오류가 발생하였습니다.", function(){signErrCallBack()});
		}, false);
}
/*
 * ARS 인증요청
 */
function authARSStep2(callbackFunc, signErrCallBack) {

	//2채널인증(ARS전화승인)_인증번호요청
	var reqARSForm = makeForm("reqARSForm");
	addFormData(reqARSForm, "txGbnCd", "ARS");
	addFormData(reqARSForm, "ARS_ORGCD", "566"); 
	addFormData(reqARSForm, "ARS_FLAG", "0"); 							// ARS 인증 타입(0:인증요청, 1:인증확인, 4:인증번호 요청)
	addFormData(reqARSForm, "ARS_TARGETSERVICE", "07"); 				// 목적 서비스(01 : 아이디 조회, 02 : 공인 인증서 관리, 03 : 단말기 지정 관리, 04 : 단말기 등록 관리, 05 : 미지정 단말 이체, 06 : 고객 정보 변경, 07 : 서비스 관리 )
	addFormData(reqARSForm, "ARS_AUTHTELNO", ARS_AUTHTELNO); 			// 승인전화번호
	addFormData(reqARSForm, "ARS_SVCMANWORKCD", "01");					// 서비스관리 업무구분코드(01 : 추가인증서비스 신청)
	addFormData(reqARSForm, "ARS_TRANSID", $("#arsTransid").val());		// Transaction Id (ARS_FLAG - 4:인증번호 요청시 결과값)
	addFormData(reqARSForm, "ARS_SSN", $("#arsSsn").val());				// 인증번호.,주민등록번호 (ARS_FLAG - 4:인증번호 요청시 결과값)
	addFormData(reqARSForm, "ARS_MOBILECD", "");
	addFormData(reqARSForm, "ARS_CLIENTNAME", "");
	addFormData(reqARSForm, "ARS_INBANKNAME", "");
	addFormData(reqARSForm, "ARS_INAMOUNT", "");
	addFormData(reqARSForm, "ARS_TOTALCNT", "");
	addFormData(reqARSForm, "ARS_TOTALAMOUNT", "");
	addFormData(reqARSForm, "ARS_RESTFDATETIME", "");
	addFormData(reqARSForm, "ARS_AUTOTFDATETIME", "");
	addFormData(reqARSForm, "ARS_IDMANWORKCD", "");
	addFormData(reqARSForm, "ARS_CERTWORKCD", "");
	addFormData(reqARSForm, "ARS_PCMANWORKCD", "");
	addFormData(reqARSForm, "ARS_PCMANSTATUS", "");
	addFormData(reqARSForm, "ARS_PCMANCHANGE", "");
	addFormData(reqARSForm, "ARS_CERTWORKCD", "");
	addFormData(reqARSForm, "ARS_PCREGWORKCD", "");
	addFormData(reqARSForm, "ARS_PCREGCHANGE", "");
	addFormData(reqARSForm, "ARS_PCREGSTATUS", "");
	addFormData(reqARSForm, "ARS_TRANSFERWORKCD", "");
	addFormData(reqARSForm, "ARS_INCLIENTNAME", "");
	//doAction(
	doActionAsync(	
			"DEP2500", 
			reqARSForm, 
		function(resReqARSDs){
				progressBar(true);
				setTimeout(function(){
					if(resReqARSDs.API_RS_MSG == "SUCCESS" && resReqARSDs.ARS_RESULTCODE == "0000") {
						progressBar(false);
						authARSStep3(callbackFunc, signErrCallBack);	
					} else {
						progressBar(false);
						messageErrorView("전화를 받지않았거나 승인하지 않고 전화를 끊었습니다.<br>재시도 하시기 바랍니다.", signErrCallBack);
					}
				}, 4000);
		},
		function(){ 
			messageErrorView("인증 요청 중 오류가 발생하였습니다.", function(){signErrCallBack()});
		});
}

/*
 * ARS인증 수행 처리
 */
function authARSStep3(callbackFunc, signErrCallBack) {
	var confirmARSForm = makeForm("reqARSForm");
	addFormData(confirmARSForm, "txGbnCd", "ARS");
	addFormData(confirmARSForm, "ARS_ORGCD", "566"); 
	addFormData(confirmARSForm, "ARS_FLAG", "1");				 		//ARS 인증 타입(0:인증요청, 1:인증확인, 4:인증번호 요청)
	addFormData(confirmARSForm, "ARS_TARGETSERVICE", "07"); 			//목적 서비스(01 : 아이디 조회, 02 : 공인 인증서 관리, 03 : 단말기 지정 관리, 04 : 단말기 등록 관리, 05 : 미지정 단말 이체, 06 : 고객 정보 변경, 07 : 서비스 관리 )
	addFormData(confirmARSForm, "ARS_AUTHTELNO", ARS_AUTHTELNO); 		//승인전화번호
	addFormData(confirmARSForm, "ARS_SVCMANWORKCD", "01");				// 서비스관리 업무구분코드(01 : 추가인증서비스 신청)
	addFormData(confirmARSForm, "ARS_TRANSID", $("#arsTransid").val());	//Transaction Id (ARS_FLAG - 4:인증번호 요청시 결과값)
	addFormData(confirmARSForm, "ARS_SSN", $("#arsSsn").val());			//인증번호.,주민등록번호 (ARS_FLAG - 4:인증번호 요청시 결과값)
	addFormData(confirmARSForm, "ARS_MOBILECD", "");
	addFormData(confirmARSForm, "ARS_CLIENTNAME", "");
	addFormData(confirmARSForm, "ARS_INBANKNAME", "");
	addFormData(confirmARSForm, "ARS_INAMOUNT", "");
	addFormData(confirmARSForm, "ARS_TOTALCNT", "");
	addFormData(confirmARSForm, "ARS_TOTALAMOUNT", "");
	addFormData(confirmARSForm, "ARS_RESTFDATETIME", "");
	addFormData(confirmARSForm, "ARS_AUTOTFDATETIME", "");
	addFormData(confirmARSForm, "ARS_IDMANWORKCD", "");
	addFormData(confirmARSForm, "ARS_CERTWORKCD", "");
	addFormData(confirmARSForm, "ARS_PCMANWORKCD", "");
	addFormData(confirmARSForm, "ARS_PCMANSTATUS", "");
	addFormData(confirmARSForm, "ARS_PCMANCHANGE", "");
	addFormData(confirmARSForm, "ARS_CERTWORKCD", "");
	addFormData(confirmARSForm, "ARS_PCREGWORKCD", "");
	addFormData(confirmARSForm, "ARS_PCREGCHANGE", "");
	addFormData(confirmARSForm, "ARS_PCREGSTATUS", "");
	addFormData(confirmARSForm, "ARS_TRANSFERWORKCD", "");
	addFormData(confirmARSForm, "ARS_INCLIENTNAME", "");
	doAction("DEP2500", confirmARSForm, function(resConfirmARSDs){
		if(resConfirmARSDs.API_RS_MSG == "SUCCESS") {
			messageView("ARS(전화승인)이 완료되었습니다.", function(){callbackFunc()});
		} else {
			messageView("인증번호 입력이 실패하였습니다.<br>재시도 하시기 바랍니다.", function(){signErrCallBack()});
		}
	},function(){ 
		//오류팝업 호출
		messageView("처리 중 오류가 발생하였습니다.", function(){signErrCallBack()});
	});
}


/*
 * 은행코드변환 
 * @Desc 농협, 지역농협 은행코드변환
 * @input 은행코드, 계좌번호
 * @Output 은행코드 
 */
function fnBkcdConvert(bkcd, acno){
	
	var convertBkcd = bkcd;
	var chkAcno = acno.replace(/-/gi,"");
	var acnoLength = acno.length;
	
	if (bkcd == '011' || bkcd == '012') { // 은행코드 011:농협
		switch (acnoLength) {
		case 10:
			if ("8" == chkAcno.substring(9,10)) {
				convertBkcd = "011";	// 은행코드
			} else if ("9" == chkAcno.substring(9,10)) {
				convertBkcd = "012";
			}
			break;
			
		case 11: //(11자리)농협은행(구)계좌번호
			convertBkcd = "011";
			break;
			
		case 12: //(12자리)농협은행(구)계좌번호
			convertBkcd = "011";
			break;
			
		case 13: //(13자리) 농협은행 신계좌번호 (마지막자리 F : 1,2)
			if ("9" == chkAcno.substring(12,13)) {
				convertBkcd = "012";
			} else {
				convertBkcd = "011";
			}
			break;
			
		case 14: //(14자리)농협은행 신계좌번호(790,791)
			convertBkcd = "012";
			break;
			
		default:
			convertBkcd = "012";
			break;
		}
	}
	return convertBkcd;
}
