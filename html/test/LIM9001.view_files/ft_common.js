//****************************************************************************************************
//Filename     :   ft_common.js
//Description  :   핀테크 업무공통 JavaScript
//****************************************************************************************************
// 전역변수 **********************************************************************************************
var SYSTEM_MODE  	 = $('#ft_common').attr("data-system_mode"); 	// 환경구분
var AUTH_RESULT  	 = $('#ft_common').attr("data-authResult");  	// 인증결과
var SERVICE_CD   	 = $('#ft_common').attr("data-serviceCd");   	// 서비스코드
var PUSH_NOTI_YN 	 = $('#ft_common').attr("data-pushNotiYn");  	// 푸시수신알림여부
var CUST_NM      	 = $('#ft_common').attr("data-custNm");  		// 고객명
var RBRNO1       	 = $('#ft_common').attr("data-rbrno1");  		// 생년월일
var SEX_CD       	 = $('#ft_common').attr("data-sexCd");  	 	// 고객성별
var SERVER_TIME  	 = $('#ft_common').attr("data-serverTime");  	// 서버시각
var MNO          	 = $('#ft_common').attr("data-mno");  			// 휴대폰번호
var MP_TSCD_DVCD  	 = $('#ft_common').attr("data-mpTscoDvcd");  	// 통신사구분코드
var USR_ID  		 = $('#ft_common').attr("data-usrId");			// 인뱅ID
var SECU_MEDI_DVCD   = $('#ft_common').attr("data-secuMediDvcd");	// 보안매체구분코드 C:보안카드 O:OTP M:MOTP
var INDV_CORP_DSTCD  = $('#ft_common').attr("data-indvCorpDstcCd");	// 개인법인구분 1:개인 2:법인
var OTP_VNDR_CD  	 = $('#ft_common').attr("data-otpVndrCd");		// OTP 벤더코드 
var OTP_SRNO_VAL  	 = $('#ft_common').attr("data-otpSrnoVal");		// OTP 시리얼넘버
var INDV_BUSI_DVCD   = $('#ft_common').attr("data-indvBusiDvcd");	// 개인/법인사업자구분 1:법인사업자 2:개인사업자
var DPM_ACNT_YN      = $('#ft_common').attr("data-dpmAcntYn");		// 수신계좌존재여부
var DPM_DMN_ACNT_YN  = $('#ft_common').attr("data-dpmDmnAcntYn");	// 요구불계좌존재여부
var DPM_RT_ACNT_YN	 = $('#ft_common').attr("data-dpmRtAcntYn");	// 정기 예금,정기적금 계좌존재여부
var LOGIN_PRCS_YN    = $('#ft_common').attr("data-loginPrcsYn");	// 로그인처리여부
var FRST_PSWD_REG_YN = $('#ft_common').attr("data-frstPswdRegYn");	// 인뱅ID 최초비밀번호 등록처리 여부
var IDCD_DETAIL_CHECK_YN = $('#ft_common').attr("data-idcdDetailCheckYn");	// 사진특장점 적용여부
var IDCD_MASKING_YN  = $('#ft_common').attr("data-idcdMaskingYn");	// 신분증마스킹여부
var APP_FRS_REQ_YN   = $('#ft_common').attr("data-frsReqYn");		// 앱 최초기동여부
var APP_CUST_NO      = "";											// 앱고객번호
var IS_MOBILE		 = false;										// 모바일 기동여부
var IS_IPHONE 	 	 = false; 										// 아이폰여부
var TRANSACTION_FLAG = false;	 									// 중복거래 방지 플래그
var APP_VERSION  	 = "";											// 앱 버전
var APP_LNK_URL  	 = "";											// 앱링크URL 
var ANDROID_APP_VER  = "2.3.9";  							 		// 안드로이드버전 [2021.07.21]24.0
var IOS_APP_VER      = "2.0";									// IOS버전 [2020.10.26]1.32
var ANDROID_URL  	 = "https://play.google.com/store/apps/details?id=kr.co.smartbank.app";
var IOS_URL 		 = "https://apps.apple.com/kr/app/스마트저축은행-smart-i/id1552329994";  

var MOTP_YN 		 = ""; 	// 기기 MOTP 등록여부
var SMART_AUTH_YN 	 = "";	// 기기 스마트앱인증 등록여부
// ***************************************************************************************************

//공통로깅
var LOG = function() {
	var _debug = function(logMessage) {
		if (SYSTEM_MODE != "R") { // 운영환경이 아닌 경우만 Debug 로그 출력
			if (IS_IPHONE == false) console.log("[DEBUG]:"+ logMessage);	
		}
	};
	var _info = function(logMessage) {
		if (IS_IPHONE == false) console.log("[INFO]:"+ logMessage);
	};
	var _error = function(logMessage) {
		if (IS_IPHONE == false) console.log("[ERROR]:"+ logMessage);
	};
	return {
		debug : _debug
	   ,info : _info
	   ,error: _error
	};
}();

//히스토리 거절페이지 등록 TODO 히스토리 접근 거부 페이지 추가등록
var HISTORY_REFUSE_PAGE = ["DEP0000_1", "DEP2101_1"];

// Next Process Function
var NEXT_PROCESS_FUNC = function(){goMainPage();};



// DOC READY
$(document).ready(function(){
	
	progressBar(false); // 화면로드 시 프로그래스 바 종료
	
	// 홈버튼 이벤트 등록
	$(".homeBtn").click(function(){
		goMainPage();
	});
	
	// 뒤로가기 이벤트 등록
	$(".btn-prev").click(function(){
		history.back();		
	});
	
	// 뒤로가기 실제 전화면 이동
	$(".btn-prev-go").click(function(){
		history.go(-1);
	});
	
	// <a> 태그 하이퍼링크 비활성화
	$("a").removeAttr("href");
	
	// 안내문구 활성화 
	$("."+SERVICE_CD).show(); /* 안내 문구 활성화  */
	
	// 숫자만 입력가능 필드처리
	$(".onlyNumber").keyup(function(){
		$(this).val($(this).val().replace(/[^0-9]/g,''));
	});
	
	// 숫자만 입력가능 필드처리
	$(".onlyNumber").change(function(){
		$(this).val($(this).val().replace(/[^0-9]/g,''));
	});
	
	if (AUTH_RESULT != "S" && SERVICE_CD != "COM0000" && APP_FRS_REQ_YN != "") { // 로그인 상태 아닐 시 로그인 프로세스 수행
		doLogin();
	} else {
//		alert(LOGIN_PRCS_YN);
		if (LOGIN_PRCS_YN == 'Y') { // 로그인 수행 
			// 로그인 처리 전 요청 데이터 처리
			NEXT_PROCESS_FUNC = function() {
				var nextReqForm = makeForm("nextReqForm");
				$.each(REQ_JSON_DATA, function(k,v){
					addFormData(nextReqForm, k, v);
				});
				doActionView(SERVICE_CD, nextReqForm);
			};
			doLogin();
		} else if (AUTH_RESULT == "E") { // 인증만료
			messageViewAuth("장시간 이용이 없어 로그인을 다시 수행합니다.", 
					function(){
						setCookie("authorization", ""); // 인증토큰삭제
						doLogin();
					});
		} 
	}
});

// 뒤로가기 이벤트 메인
history.back = function(){
	var historyPage = document.referrer; // 이전페이지
	historyPage = historyPage.substring(historyPage.lastIndexOf("/")+1, historyPage.lastIndexOf("."));
	if (isEmpty(historyPage)) {
		goMainPage();
	} else {
		if (!IS_IPHONE) { // 아이폰 뒤로가기 프로그레스바 꺼지지 않는 현상 대응
			progressBar(true);	
		}
		if ($.inArray(historyPage, HISTORY_REFUSE_PAGE) > 0) {
			// 뒤로가기 접근금지 페이지
			goMainPage(); // 메인페이지로
		} else {
			history.go(-1); // 전 페이지로
		}
	}
}

/*
 * 디바이스 정보조회
 */
function deviceAppDataInq(callbackFunc) {
	getAppData("mOTP,smartAuth,appVersion,custNo", function(appResDs){
		if (isNotEmpty(appResDs.params)) {
			MOTP_YN = isEmpty(appResDs.params.mOTP) ? "N" : appResDs.params.mOTP;
			SMART_AUTH_YN = isEmpty(appResDs.params.smartAuth) ? "N" : appResDs.params.smartAuth;
			APP_VERSION = isEmpty(appResDs.params.appVersion) ? "" : appResDs.params.appVersion;
			callbackFunc(appResDs);
		}
	}, function(){});
}

/*
 * 로그인여부
 */
function isLogin(){
	return AUTH_RESULT == "S" ? true : false;
}

// 앱종료버튼
function appClose() {
	var reqData = {
			"serviceCd":"APP_CLOSE", 
			"params":{}
	};
	ftBridgeExcutor.postMessage(reqData);
}

// 모바일 체크
var mobileInfo = new Array('Android', 'iPhone', 'iPod', 'iPad', 'BlackBerry', 'Windows CE', 'SAMSUNG', 'LG', 'MOT', 'SonyEricsson');
for (var info in mobileInfo) {
	if (navigator.userAgent.match(mobileInfo[info]) != null) { // 모바일기동
		 IS_MOBILE = true;
         if (mobileInfo[info].indexOf("iP") > -1) {
             IS_IPHONE = true;
        }
		break;
	} else {
		IS_MOBILE = false;
	}
}

LOG.debug("[ft_common.js] :: ====================================================");
LOG.debug("[ft_common.js] :: IS_MOBILE [" + IS_MOBILE + "] IS_IPHONE [" + IS_IPHONE + "]");
LOG.debug("[ft_common.js] :: navigator.userAgent [" + navigator.userAgent + "]");
LOG.debug("[ft_common.js] :: ====================================================");

//****************************************************************************************************
//1. Description : 앱버전체크 TODO 마켓배포이후 버전체크 주석제거
//2. Parameters : 앱버전
//3. Return Type : void
//****************************************************************************************************
function fnAppVersionCheck(appVersion, custNo) {
	var linkUrl = "";
	if (IS_IPHONE) {
		if (appVersion != IOS_APP_VER) { 
			linkUrl = IOS_URL;
		}
	} else {
		if (appVersion != ANDROID_APP_VER) {
			linkUrl = ANDROID_URL;
		}
	}
	if (linkUrl != "" && SYSTEM_MODE == "R") {
		messageView("앱의 새버전이 있습니다. 업데이트를 수행합니다.", function(){
			webLink(linkUrl, function(){}, function(){});
		});
	} else {
		doLogin();
	}
}

//****************************************************************************************************
//1. Description : 요소 보이거나 숨기기
//2. Parameters : element ID, flag
//3. Return Type : void
//****************************************************************************************************
function elementController(elementId, flag){
	if (flag) {
		$("#"+elementId).show();
	} else {
		$("#"+elementId).hide();
	}
}

//****************************************************************************************************
//1. Description : 정상 메시지 Layer 호출
//2. Parameters : String 메시지, 확인버튼 이벤트 function
//3. Return Type : void
//****************************************************************************************************
function messageView(message, btnFunc) {
	
	var errMesg = "";
	if (typeof(message) == 'undefined' || message == '') {
		errMesg = "기관에서 응답이 없습니다. 잠시 후 다시 시도하여 주십시오.";
	} else {
		errMesg = message;
	}
	
	$("#alertMessage").html(errMesg);
	if (typeof(btnFunc) != 'undefined') {
		$("#alertMessageCloseBtn").unbind();
		$("#alertMessageCloseBtn").click(function(){
		    closeMessage();
			btnFunc();
		});
	} else {
		$("#alertMessageCloseBtn").unbind();
		$("#alertMessageCloseBtn").click(function(){
		    closeMessage();
		});
	}
	openMessage('messageView');
	//$("#alertMessageBox").show();
	
	progressBar(false);
}

//****************************************************************************************************
//1. Description : 정상 메시지 Layer 호출 (타이틀 추가)
//2. Parameters : 메시지, 타이틀, agreeFunc, disagreeFunc
//3. Return Type : 
//****************************************************************************************************
function messageViewTitle(message, messageTitle, btnFunc) {
	var errMesg = "";
	if (typeof(message) == 'undefined' || message == '') {
		errMesg = "기관에서 응답이 없습니다. 잠시 후 다시 시도하여 주십시오.";
	} else {
		errMesg = message;
	}
	
	progressBar(false);
	$("#TitleMessageTitle").html(messageTitle);
	$("#TitleMessageMsg").html(errMesg);
	if (typeof(btnFunc) != 'undefined') {
		$("#TitleMessageBtn").unbind();
		$("#TitleMessageBtn").click(function(){
		    closeMessage();
			btnFunc();
		});
	} else {
		$("#TitleMessageBtn").unbind();
		$("#TitleMessageBtn").click(function(){
		    closeMessage();
		});
	}
	
	openMessage('messageViewTitle');
	$("#alertTitleMessageBox").show();
}
//****************************************************************************************************
//1. Description : 정상 이미지 메시지 Layer 호출 (타이틀 추가)
//2. Parameters : 메시지, 타이틀, agreeFunc, disagreeFunc
//3. Return Type : 
//****************************************************************************************************
function messageViewTitleImage(imgSrc, messageTitle,key, btnFunc) {
	var imageTag = new Image();
	imageTag.src=imgSrc;
	imageTag.onclick = function(){
		var webUrl = $(location).attr('protocol')+'//'+$(location).attr('hostname')+(isNotEmpty($(location).attr('port'))?(':'+$(location).attr('port')):'')+imgSrc;
		webLink(webUrl, function(){}, function(){});
	}
	
	progressBar(false);
	$("#TitleMessageImgTitle").html(messageTitle);
	$("#TitleMessageImgMsg").html(imageTag);
	if (typeof(btnFunc) != 'undefined') {
		//확인버튼
		$("#TitleMessageImgBtn").unbind();
		$("#TitleMessageImgBtn").click(function(){
		    closeMessage();
			btnFunc();
		});
		//24시간열지않기 버튼
		$("#TitleMessageImgBtn2").unbind();
		$("#TitleMessageImgBtn2").click(function(){
			if(SYSTEM_MODE=='L'){
			    setCookie(key,SERVER_TIME,1);
			}else{
				var cookieData = new Object();
				cookieData[key] = SERVER_TIME;
				setAppData(cookieData);
			}
		    closeMessage();
			btnFunc();
		});
	} else {
		$("#TitleMessageImgBtn").unbind();
		$("#TitleMessageImgBtn").click(function(){
		    closeMessage();
		});
		//24시간열지않기 버튼
		$("#TitleMessageImgBtn2").unbind();
		$("#TitleMessageImgBtn2").click(function(){
			if(SYSTEM_MODE=='L'){
			    setCookie(key,SERVER_TIME,1);
			}else{
				var cookieData = new Object();
				cookieData[key] = SERVER_TIME;
				setAppData(cookieData);
			}
		    closeMessage();
		});
	}
	
	
	$("#TitleMessageImgBtn2").click(function(){
		/**
		 * 네이티브앱에 쿠키허용이 되어있지않다
		 */
		if (typeof(btnFunc) != 'undefined') {
//			$("#TitleMessageImgBtn2").unbind();
			$("#TitleMessageImgBtn2").click(function(){
				if(SYSTEM_MODE=='L'){
				    setCookie(key,SERVER_TIME,1);
				}else{
					var cookieData = new Object();
					cookieData[key] = SERVER_TIME;
					setAppData(cookieData);
				}
			    closeMessage();
				btnFunc();
			});
		} else {
			$("#TitleMessageImgBtn2").unbind();
			$("#TitleMessageImgBtn2").click(function(){
				if(SYSTEM_MODE=='L'){
				    setCookie(key,SERVER_TIME,1);
				}else{
					var cookieData = {key:SERVER_TIME}
					setAppData(cookieData);
				}
			    closeMessage();
			});
		}
	});
	
	openMessage('messageViewTitleImg');
	$("#alertTitleImgMessageBox").show();
}
//****************************************************************************************************
//1. Description : 정상 메시지 Layer 호출 확인액션
//2. Parameters : String 메시지
//3. Return Type : void
//****************************************************************************************************
function messageViewAuth(message, authFunc) {
	messageView(message, authFunc);
}

//****************************************************************************************************
//1. Description : 경고 메시지 Layer 호출
//2. Parameters : String 메시지
//3. Return Type : void
//****************************************************************************************************
function messageErrorView(message, btnFunc) {
	var errMesg = "";
	if (typeof(message) == 'undefined' || message == '') {
		errMesg = "기관에서 응답이 없습니다. 잠시 후 다시 시도하여 주십시오.";
	} else {
		errMesg = message;
	}
	
	progressBar(false);
	$("#alertErrorMessage").html(errMesg);
	if (typeof(btnFunc) != 'undefined') {
		$("#alertErrorMessageCloseBtn").unbind();
		$("#alertErrorMessageCloseBtn").click(function(){
		    closeMessage();
			btnFunc();
		});
	} else {
		$("#alertErrorMessageCloseBtn").unbind();
		$("#alertErrorMessageCloseBtn").click(function(){
		    closeMessage();
		});
	}
	openMessage('messageErrorView');
	$("#alertErrorMessageBox").show();
}

//****************************************************************************************************
//1. Description : 경고 메시지 Layer 호출 확인액션
//2. Parameters : String 메시지
//3. Return Type : void
//****************************************************************************************************
function messageErrorViewAuth(message, authFunc) {
	messageErrorView(message, authFunc);
}

//****************************************************************************************************
//1. Description : 컨펌 메시지 Layer 호출
//2. Parameters : String 메시지, agreeFunc, disagreeFunc, classAddYn
//3. Return Type : 
//****************************************************************************************************
function confirmView(message, agreeFunc, disagreeFunc, classAddYn) {
	
	if(isNotEmpty(classAddYn) && "Y"==classAddYn){
		// 컨펌뷰 테이블 클래스 추가
		$(".scr-alert-confirmViewTitle li").addClass("col-table01 th-l td-r one-line");
		$(".scr-alert-confirmViewTitle div").removeClass("compled");
	} else {
		// 컨펌뷰 클래스 원복
		$(".scr-alert-confirmViewTitle li").removeClass("col-table01 th-l td-r one-line");
	}
	
	confirmViewTitle(message, '알림', agreeFunc, disagreeFunc);
}

//****************************************************************************************************
//1. Description : 컨펌 메시지 Layer 호출
//2. Parameters : 메시지, 타이틀, agreeFunc, disagreeFunc
//3. Return Type : 
//****************************************************************************************************
function confirmViewTitle(message, messageTitle, agreeFunc, disagreeFunc) {
	var errMesg = "";
	if (typeof(message) == 'undefined' || message == '') {
		errMesg = "기관에서 응답이 없습니다. 잠시 후 다시 시도하여 주십시오.";
	} else {
		errMesg = message;
	}
	
	progressBar(false);
	$("#confirmMessage").html(errMesg);
	//$("#confirmMessageTitle").html(messageTitle);
	
	if (typeof(agreeFunc) != 'undefined') {
		$("#confirm_yes").unbind();
		$("#confirm_yes").click(function(){
		    closeMessage();
		    agreeFunc();
		});
	} else {
		$("#confirm_yes").unbind();
		$("#confirm_yes").click(function(){
		    closeMessage();
		});
	}
	
	if (typeof(disagreeFunc) != 'undefined') {
		$("#confirm_no").unbind();
		$("#confirm_no").click(function(){
			closeMessage();
			disagreeFunc();
		});
	} else {
		$("#confirm_no").unbind();
		$("#confirm_no").click(function(){
		    closeMessage();
		});
	}

	openMessage("confirmViewTitle");
	$("#confirmMessageBox").show();
}

//****************************************************************************************************
//1. Description : Edit 컨펌 메시지 Layer 호출
//2. Parameters : 메시지, 타이틀, agreeFunc, disagreeFunc
//3. Return Type : 
//****************************************************************************************************
function editConfirmView(message, messageTitle, agreeBtnNm, disagreeBtnNm , agreeFunc, disagreeFunc) {
	var errMesg = "";
	if (typeof(message) == 'undefined' || message == '') {
		errMesg = "기관에서 응답이 없습니다. 잠시 후 다시 시도하여 주십시오.";
	} else {
		errMesg = message;
	}
	
	progressBar(false);
	$("#editConfirmMsg").html(errMesg);
	//$("#editConfirmTitle").html(messageTitle);
	$("#editConfirm_yes").html("<span>"+agreeBtnNm+"</span>");
	$("#editConfirm_no").html("<span>"+disagreeBtnNm+"</span>");
	
	if (typeof(agreeFunc) != 'undefined') {
		$("#editConfirm_yes").unbind();
		$("#editConfirm_yes").click(function(){
		    closeMessage();
		    agreeFunc();
		});
	} else {
		$("#editConfirm_yes").unbind();
		$("#editConfirm_yes").click(function(){
		    closeMessage();
		});
	}
	
	if (typeof(disagreeFunc) != 'undefined') {
		$("#editConfirm_no").unbind();
		$("#editConfirm_no").click(function(){
			closeMessage();
			disagreeFunc();
		});
	} else {
		$("#editConfirm_no").unbind();
		$("#editConfirm_no").click(function(){
		    closeMessage();
		});
	}

	openMessage('confirmViewTitle');
	$("#editConfirmMessageBox").show();
}

//****************************************************************************************************
//1. Description : 메시지 Layer 닫기
//2. Parameters : 
//3. Return Type : 
//****************************************************************************************************
function closeMessage() {
	alertOff();
	$("#alertMessage").html("");
	$("#alertErrorMessage").html("");
	$("#confirmMessage").html("");
	
	//$("#editConfirmTitle").html("");
	//$("#editConfirmTitle").html("");
	$("#editConfirm_yes").html("");
	$("#editConfirm_no").html("");
	
	//$("#TitleMessageTitle").html("");
	//$("#TitleMessageTitle").html("");	
	$("#confirmMessageTitle").html("스마트 저축은행에서 알립니다.");
}
function openMessage(className) {
	alertOn(className);
}

//****************************************************************************************************
//1. Description : 프로그래스바 Layer 호출
//2. Parameters : String flag (true, false)
//3. Return Type : 
//****************************************************************************************************
var PROGRESS_DELAY_FUNC = function(){};
var PROGRESS_BAR_TIMER = null;
function progressBar(flag,msg) {
	var reqData = {
			"serviceCd":"LOADING", 
			"params":{"FLAG":"OFF"}
	};
	if(isNotEmpty(msg)){
		reqData = {
				"serviceCd":"LOADING", 
				"params":{"FLAG":"OFF","MSG":msg}
		};
	}
	if (flag == true) {
		LOG.debug("true call");
		reqData.params.FLAG = "ON";
	}
	if (flag == false) {
		LOG.debug("false call");
		
		PROGRESS_DELAY_FUNC = function(){
			var reqData = {
					"serviceCd":"LOADING", 
					"params":{"FLAG":"OFF"}
			};
			ftBridgeExcutor.postMessage(reqData);
		}; 
		PROGRESS_BAR_TIMER = setTimeout(PROGRESS_DELAY_FUNC, 1000);
		
	} else {
		if (PROGRESS_BAR_TIMER != null) {
			clearTimeout(PROGRESS_BAR_TIMER);
		}
		PROGRESS_DELAY_FUNC = function(){};
		ftBridgeExcutor.postMessage(reqData);
	}
		
}
//****************************************************************************************************
//1. Description : 프로그래스바 Layer 호출
//2. Parameters : String flag (true, false)
//3. Return Type : 
//****************************************************************************************************
/*var progressFlag = null;
function progressBar(flag) {
	if (flag == true) {
		if(progressFlag != null) progressFlag = null;
		$(".loading").show();
	} else {
		if(progressFlag == null){
			progressFlag = setTimeout(function(){				
				$(".loading").hide();
			},1000);
		}
	}
}*/

//****************************************************************************************************
//1. Description : form data copy
//2. Parameters :Object form 
//3. Return Type : Object form
//****************************************************************************************************
function copyForm(srcForm) {
	var reqForm = srcForm.clone();
	var selects = srcForm.find("select");
	selects.each(function(i) {
		reqForm.find("select").eq(i).val($(this).val());
	});
	return reqForm;
}

//****************************************************************************************************
//1. Description : 폼 데이터 유효성검증
//2. Parameters : 대상 form 객체
//3. Return Type : boolean
//****************************************************************************************************
function doValidate(srcForm) {
	LOG.debug("doValidate call");
	
	var errCnt = 0;
	srcForm.find("input, select").each(function(i, item) {
		var dataValidate = $(this).attr("data-validate");
		if (typeof(dataValidate) == "undefined") return true;
		var validateOpt = dataValidate.split(",");
		
		LOG.debug("doValidate Opt::" + validateOpt.length);
		
		if (validateOpt.length > 0) { // 유효성검증대상
			for (var i=0; i < validateOpt.length; i++) {
				var validateType = validateOpt[i];
				LOG.debug("doValidate validateType:"+validateType);
				if (validateType=="required") {
					if ($.trim($(this).val()) == "") {
						errCnt++;
						LOG.debug("doValidate required:" + $(this).attr("name"));
						doValidateError($(this));
					}
				} else if (validateType=="number") {
					var numberVal = $(this).val().replace(/[0|,|-]/g,"");
					// 숫자여부 확인
					if ($.trim(numberVal) == "" || !/^[0-9]*$/.test(numberVal)) {
						errCnt++;
						doValidateError($(this));
					}
					
				} else if (validateType=="phoneNo") {
					// 휴대전화여부
					if (!/^\d{2,3}\d{3,4}\d{4}$/.test($(this).val())) {
						errCnt++;
						doValidateError($(this));
					}
				} else if (validateType=="korean") {
					// 한글만입력가능
					if (!/[가-힣]/.test($(this).val())) {
						errCnt++;
						doValidateError($(this));
					}
				} else if (validateType=="email") {
					// 이메일형식
					if (!/^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{1,5}$/.test($(this).val())) {
						errCnt++;
						doValidateError($(this));
					}
				}
				// ValidateType 추가지점
			}
		}
	});
	
	LOG.debug("doValidate errCnt:" + errCnt);
	return (errCnt > 0) ? false : true;
}
function doValidateError(target){
	$(target).parents("div").addClass("errtxt");
	$(target).click(function(){
		$(target).parents("div").removeClass("errtxt");
	});
	LOG.error($(target).attr(name) + " is Error");
}

//****************************************************************************************************
//1. Description : RESTFul API 호출 (비동기)
//2. Parameters : String serviceCd, Form Object, function callback, boolean loginChk 
//3. Return Type : CallBack
//****************************************************************************************************
function doAction(serviceCd, srcForm, succFunc, failFunc) {

	// Validation Check
	if (!doValidate(srcForm)) {
		return;
	}
	
	var url = serviceCd + ".act";
	var data = srcForm.serializeObject();
	var loadingEnd = true;	//로딩바종료여부 
	
	/*
	//특정화면별 로딩바 유지시 아래 소스로 적용 
	var urlName = "";
		
	if(data["urlName"]){
		urlName = data["urlName"];
	}
	
	messageView("값은"+urlName, function(){return});
	*/
	
	//doActionURL메서드를 통해서 호출시 해당 변수를 담고있음(무한로딩유지) 
	if(data["loginCheckYn"]){
		loadingEnd = false;
	}
	
	$.ajax({
		 url: url
		,type : 'POST'
		,accept: "application/json"
		,contentType: "application/json; charset=utf-8"
		,async : false
		,cache : false
		,headers : {
			 "Content-Type":"application/json; charset=UTF-8"
		}
		,dataType: "json"
		,data : JSON.stringify(data)
		,beforeSend : function (xhr, opts) {
			if (false) {
	            xhr.abort(); // submit Cancel
	        }
			progressBar(true);
		}
		,success: function(resData){
			succFunc(resData);
		}
		,error: function(request, status, error){			
			failFunc(resData);
		}
		,complete: function(xhr, status) {
			if(loadingEnd){
				progressBar(false);
			}
		}
	});
}

function doActionAsync(serviceCd, srcForm, succFunc, failFunc) {
	
	// Validation Check
	if (!doValidate(srcForm)) {
		return;
	}
	
	var url = serviceCd + ".act";
	var data = srcForm.serializeObject();

	$.ajax({
		 url: url
		,type : 'POST'
		,accept: "application/json"
		,contentType: "application/json; charset=utf-8"
		,async : true
		,cache : false
		,headers : {
			 "Content-Type":"application/json; charset=UTF-8"
		}
		,dataType: "json"
		,data : JSON.stringify(data)
		,beforeSend : function (xhr, opts) {
			if (false) {
	            xhr.abort(); // submit Cancel
	        }
			progressBar(true);
		}
		,success: function(resData){
			succFunc(resData);
		}
		,error: function(request, status, error){
			failFunc(status, error);
		}
		,complete: function(xhr, status) {
//			progressBar(false);
		}
	});
}

//****************************************************************************************************
//1. Description : file upload 처리
//2. Parameters : String serviceCd, Object formId, function succFunc, function failFunc 
//3. Return Type : Call Back
//****************************************************************************************************
function doFileUpload(loanRqsNo, fileFieldID, succFunc, failFunc) {
	
	var uploadData = new FormData();
	uploadData.append("uploadFile", $("#"+fileFieldID)[0].files[0]);
	uploadData.append("loanRqsNo", loanRqsNo);
	
	$.ajax({
		url: "fileUpload.act",
		data: uploadData,
		processData: false,
		contentType: false,
		type:"post",
		enctype: "multipart/form-data",
		async:false,
		beforeSend: function(){
			progressBar(true);
		},
		success: function(data){
			succFunc(data);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			LOG.debug("파일업로드오류:"+errorThrown);
			messageErrorView("파일업로드 처리 중 오류가 발생하였습니다.");
		},
		fail: function(data){
			failFunc(data);
		},
		complete: function(){
			progressBar(false);
		}
	});
}

// HTML to IMG 변환 후 WAS 저장 (사용안함)
function doPdfFileUpload(target, succFunc) {
	
	target = $('#'+target);
	var url = "COM3006.act";
	
	if(target != null && target.length > 0) {
		
		var t = target[0];
		
		html2canvas(t).then(function(canvas) {
			
			var imgSrc = canvas.toDataURL("image/png");
			imgSrc = imgSrc.replace("data:image/png;base64,", "");
			
			$.ajax({
				 url: url
				,data : JSON.stringify({
								"txGbnCd" : "U"
								, "imgSrc" : imgSrc
							})						
				,type : 'POST'
				,dataType: "text"
				,accept: "application/json"
				,contentType: "application/json; charset=utf-8"
				,headers : {
					 "Content-Type":"application/json; charset=UTF-8"
				}
				,beforeSend : function (xhr, opts) {
					if (false) {
			            xhr.abort(); // submit Cancel
			        }
					progressBar(true);
				}
				,success: function(resData){
					// TODO 추후 약관 다운로드 해야될 경우 해당부분에서 처리
					resData.fileName;
				}
				,error: function(request, status, error){
					messageErrorView("약관 PDF저장에 실패했습니다.");
				}
				,complete: function(xhr, status) {
					progressBar(false);	
				}
			});
			
		});
	}
	
	
}

// TODO 증명서 다운로드
/**
 * serviceCd : 호출 서비스명 COM3006
 * fileName : 다운로드 받을 대상 파일명
 */
function doFileDownload(serviceCd, fileName) {
	
	var url = serviceCd + ".act";	// param으로 전달받은 Service act 호출로 기동
	
	$.ajax({
		 url: url
		,data : JSON.stringify({
						"txGbnCd" : "D"	// 거래코드 고정 D
						, "fileName" : fileName	// 다운로드 받을 파일명
				})
						
		,type : 'POST'
		,accept: "application/json"
		,contentType: "application/json; charset=utf-8"
		,async : false
		,cache : false
		,headers : {
			 "Content-Type":"application/json; charset=UTF-8"
		}
		,beforeSend : function (xhr, opts) {
			if (false) {
	            xhr.abort(); // submit Cancel
	        }
			progressBar(true);
		}
		,success: function(resData){
			var reqJson = {
					"serviceCd":"DOWN"
						,"params":{
							"url":resData.url
						}
			};
			ftBridgeExcutor.postMessage(reqJson,	
					function(resData){
						messageView("파일을 다운로드 합니다.");
					});
			
		}
		,error: function(request, status, error){
			messageErrorView("파일 다운로드에 실패했습니다.");
		}
		,complete: function(xhr, status) {
			progressBar(false);	
		}
	});
	
}


//****************************************************************************************************
//1. Description : JSP 호출 (동기)
//2. Parameters : String serviceCd, Object srcForm 
//3. Return Type : void
//****************************************************************************************************
function doActionView(serviceCd, srcForm) {
	progressBar(true);
	if (typeof($(".btnGnbClose"))!="undefined") {
		$(".btnGnbClose").click();	
	}
	
	setTimeout(function(){
		if (typeof(srcForm) == "undefined") srcForm = makeForm("srcForm");
		
		if (serviceCd == "main") {
			addFormData(srcForm, "frsReqYn", "N");
		}
		var reqForm = copyForm(srcForm);
		reqForm.attr("action", serviceCd + '.view');
		reqForm.attr("method", 'POST');
		reqForm.appendTo($(document.body));
		reqForm.submit();	
	}, 300);
}

//****************************************************************************************************
//1. Description : JSP 호출 (URL동기)
//2. Parameters : String URL, boolean loginCheckYn 
//3. Return Type : void
//****************************************************************************************************
function doActionURL(url, loginCheckYn) {
	progressBar(true);
	if (typeof($(".btnGnbClose"))!="undefined") {
		$(".btnGnbClose").click();	
	}
	if (url.indexOf('main') > -1) { // 메인페이지이동
		url += "?frsReqYn=N"; // 최초요청여부 N
	}
	if (PROGRESS_BAR_TIMER != null) {
		clearTimeout(PROGRESS_BAR_TIMER);
	}
	PROGRESS_DELAY_FUNC = function(){};
	
	if (typeof(loginCheckYn) == 'undefined') {
		loginCheckYn = false;
	}
	if (loginCheckYn) {
		NEXT_PROCESS_FUNC = function() {
			location.href = url;		
		};	
		var loginCheckForm = makeForm("loginCheckForm");
		
		 
		addFormData(loginCheckForm, "loginCheckYn", "Y");	//해당값에 따른 로딩바 유지
		//addFormData(loginCheckForm, "urlName", url);		//해당값에 따른 로딩바 유지
		
		doAction("COM0002", loginCheckForm, function(com0002Res){
			if (isEmpty(com0002Res.custNo)) {
				messageView("로그인 후 이용가능한 거래입니다.", function(){doLogin();});
			} else {
				location.href = url;	
			}
		}, function(com0002Res){
			messageErrorView("인증 처리 중 오류가 발생하였습니다.");
		},false);
	} else {
		location.href = url;	
	}
}

//****************************************************************************************************
//1. Description : history.back()
//2. Parameters : 
//3. Return Type : 
//****************************************************************************************************
function goBack() {
	if ($("#loading").attr('display') != 'table') {
		history.back();
	}
}

//****************************************************************************************************
//1. Description : 메인화면이동
//2. Parameters : 
//3. Return Type : 
//****************************************************************************************************
function goMainPage(){
	doActionURL("main.view");
}

//****************************************************************************************************
//1. Description : 메인화면 이동 후 로그인 실행
//2. Parameters : 
//3. Return Type : 
//****************************************************************************************************
function goMainPageAndLogin(){
	var mainForm = makeForm("mainForm");
	$.each(REQ_JSON_DATA, function(k,v){
		addFormData(mainForm, k, v);
	});
	addFormData(mainForm, "frsReqYn", "Y"); // 최초요청여부 Y로 셋팅하여 링크데이터 재조회 되지 않도록 처리
	// 210607. 수신관련 신규개설 거래 완료시 보안매체 재조회 FLAG 추가
	addFormData(mainForm, "isReReq", "Y"); // 세션데이터 업데이트
	mainForm.attr("action", 'main.view');
	mainForm.attr("method", 'POST');
	mainForm.appendTo($(document.body));
	progressBar(true);
	mainForm.submit();
}

//****************************************************************************************************
//1. Description : 인증페이지이동
//2. Parameters : 
//3. Return Type : 
//****************************************************************************************************
function goAuthPage(){
	//고객번호 미존재시 마케팅동의 이동
	getAppData("custNo", function(appResDs){
		if (isNotEmpty(appResDs.params)) {
			if (isEmpty(appResDs.params.custNo)){
				doActionURL("COM0006.view");
			}else{
				var authForm = makeForm("authForm");
				addFormData(authForm, "nextPrcsFunc", "authRegProcess");
				$.each(REQ_JSON_DATA, function(k,v){
					addFormData(authForm, k, v);
				});
				doActionView("COM0000", authForm);
			}
		}
	}, function(){});
	
}

//****************************************************************************************************
//1. Description : form 객체생성
//2. Parameters : String formId 
//3. Return Type : Object Form
//****************************************************************************************************
function makeForm(formId) {
	var newForm =  $('<form>', {
		'id' : formId
		,'name' : formId
		,'method' : 'POST'
	});
	return newForm;
}

//****************************************************************************************************
//1. Description : form 객체에 데이터 추가
//2. Parameters : Object form, String name, String value 
//3. Return Type : void
//****************************************************************************************************
function addFormData(form, name, value) {
	var inputField;
	if (typeof($("input[name="+name+"]", form).val()) == 'undefined') {
		inputField = $("<input>").attr("type", "hidden").attr("name", name).val(value);	
		$(form).append($(inputField));
	} else {
		$("input[name="+name+"]", form).val(value);
	}
}

//****************************************************************************************************
//1. Description : JWT(JSON Web Token) 파싱
//2. Parameters : String jwtToken 
//3. Return Type : Object jsonData
//****************************************************************************************************
function parseJwt(token) {
	var base64Url = token.split(".")[1];
	var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c){
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));
	return JSON.parse(jsonPayload);
}

//****************************************************************************************************
//1. Description : cookie 등록, 조회, 삭제
//2. Parameters : String cookieName, String cookieValue 
//3. Return Type : void
//****************************************************************************************************
function setCookie(cookieName, cookieValue , exdays) {
	if(exdays != undefined || exdays != ''){
		$.cookie(cookieName, cookieValue);
	}else{
		$.cookie(cookieName, cookieValue , {expires:exdays});
	}
}
function getCookie(cookieName) {
	return $.cookie(cookieName);
}
function removeCookie(cookieName) {
	$.removeCookie(cookieName);
}

jQuery.fn.serializeObject = function() {
    var obj = null;
    try {
        if (this[0].tagName && this[0].tagName.toUpperCase() == "FORM") {
            var arr = this.serializeArray();
            if (arr) {
                obj = {};
                jQuery.each(arr, function() {
                    obj[this.name] = this.value;
                });
            }//if ( arr ) {
        }
    } catch (e) {
        alert(e.message);
    } finally {
    }
 
    return obj;
};

/*
 * Array Key에 해당하는 값 추출 
 */
function getData(obj, key) {
	
	var val = "";
	$.each(obj, function(k,v){
		if (k==key) val = v;
	});
	return val;
}
/*
 * 협약사 통계 적재 함수실행
 */
function regTrStatistic(obj) {
	var com2001Req = makeForm("com0000Req");
	addFormData(com2001Req, "txGbnCd"	, "DEPO_TRN"	); 	//구분
	addFormData(com2001Req, "acntNo"	, obj.ACNT_NO	); 	// 계좌번호
	addFormData(com2001Req, "custNo"	, obj.CUST_NO	); 	// 고객번호
	addFormData(com2001Req, "prdctCd"	, obj.PRDCT_CD	); 	// 상품코드
	addFormData(com2001Req, "trnDstCd"	, obj.TRN_DST_CD); 	// 거래구분
	addFormData(com2001Req, "ptCd"		, obj.PR_CD		); 	// 협약사코드
	addFormData(com2001Req, "trnAmt"	, obj.TRN_AMT	); 	// 고객번호
	//결과처리없음
	doAction("COM0000", com2001Req ,function(com2001Res){},function(com2001Res){});
}



//설명서다운로드테스트
function kht_test(){
	var url = "SMT0001.act";	// param으로 전달받은 Service act 호출로 기동
	$.ajax({
		 url: url
		,data : JSON.stringify({
						  "fdnPrdctKncd" : "30"									//예금종류
						, "prod_nm" 	 : "테스트상품명"							//상품명
						, "cntr_amt_n15" : "테스트금액" 			//계약금액
						, "expt_dt"		 : "2025-09-29" 					//계약기간
						, "insv_acno"    : "566TEST" 				//계좌번호
						, "txtn_cd_50" 	 : "과세테스트"				//과세 구분
						, "inrt_n8" 	 : "이율"					//기본 이율
						, "atpay_cntp_bkcd_nm" : "신한"	//자동이체계좌은행
						, "atpay_cntp_bk_acno" : "자동이체계좌테스트"	//자동이체계좌번호
						, "attr_dsgt_dt_nm"    : "이체일테스트"	//이체주기 및 이체일
						, "user_cert_dn"	: "dnajeiQJIOECNOIQWNEIOFNOQIWEJIORJQWIOERJIOQWEJROIQEWJNROIWQEBNCOIQWNEOIRBH"			//전자서명정보
						, "fileDownPath" : "/sw/apprun/SMART_SB_APP/WebContent/WEB-INF/deposit_contract/test.pdf"
						, "cssStream" :  "/sw/apprun/SMART_SB_APP/WebContent/WEB-INF/deposit_contract/smt.css"
						, "fontRegister" : "/sw/apprun/SMART_SB_APP/WebContent/WEB-INF/deposit_contract/SEBANG Gothic.ttf"
						, "imgName" :"/sw/apprun/SMART_SB_APP/WebContent/WEB-INF/deposit_contract/logo02.png"
							
				})
		,type : 'POST'
		,accept: "application/json"
		,contentType: "application/json; charset=utf-8"
		,async : false
		,cache : false
		,headers : {
			 "Content-Type":"application/json; charset=UTF-8"
		}
		,beforeSend : function (xhr, opts) {
			
			if (false) {
	            xhr.abort(); // submit Cancel
	        }
			progressBar(true);
			
		}
		,success: function(resData){
			
			var reqJson = {
					"serviceCd":"DOWN"
						,"params":{
							"url":resData.url
						}
			};
			ftBridgeExcutor.postMessage(reqJson,	
					function(resData){
						messageView("파일을 다운로드 합니다.");
					});
			
		}
		,error: function(request, status, error){
			messageErrorView("파일 다운로드에 실패했습니다.");
		}
		,complete: function(xhr, status) {
			progressBar(false);	
		}
	});
}
