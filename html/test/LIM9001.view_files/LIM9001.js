/**
 * LIM9000.js 
 */

$(document).ready(function(){
	//금속법 일반금융소비자탭변경
	$('.normal_cus').click(function(){
		$('.normal_div').show();
		$('.topTab li').removeClass('on');
		$(this).addClass('on');
		$('#finCsmrDvcd').val("11");
	});
	
	//금속법 전문금융소비자탭변경
	$('.pro_cus').click(function(){
		$('.normal_div').hide();
		$('.topTab li').removeClass('on');
		$(this).addClass('on');
		$('#finCsmrDvcd').val("21");
	});
	
	var year = $('#serverTime').val().substr(0, 4);
	var month = $('#serverTime').val().substr(4, 2);
	var day = $('#serverTime').val().substr(6, 2);
	
	var innerHtml = '';
	innerHtml += year + '년 ' + month + '월 ' + day + '일';
	$('#agreeDTM').html(innerHtml);
	
	$('#nextBtn').click(function(){
		callSAList();
	});	
	
});


function callSAList() {
	//var agree13 		= true;												// [필수]보이스피싱 방지여부
			
	//필수약관
	var agree1 		= $('#c_agree1').is(":checked");			// [필수] 대학생 · 청년층을 위한 공적지원 안내문 및 확인서
	var agree2 		= $('#c_agree2').is(":checked");			// [필수] 채무조정 진행자를 위한 공적지원제도 설명 확인서
	var agree21 		= $('#c_agree21').is(":checked");			// [필수] 대출상품설명서
	var agree3 		= $('#c_agree3').is(":checked");			// [필수] 개인(신용)정보 수집·이용·제공 동의서 [여신 (금융)거래]
	var agree4 		= $('#c_agree4').is(":checked");			// [필수] 개인(신용)정보 수집·이용 요약 동의서 [비여신 (금융)거래]
	var agree5 		= $('#c_agree5').is(":checked");			// [필수] 개인(신용)정보 수집·이용·제공·조회 요약 동의서
	
	//선택약관
	var agree77 		= $('#c_agree77').is(":checked");			// [선택] 개인(신용)정보 수집·이용 요약 동의서 [비여신 (금융)거래]
	var agree77_3 	= $('#c_agree77_3').is(":checked");		// [선택] 민감정보 수집이용 동의
	var agree77_4 	= $('#c_agree77_4').is(":checked");		// [선택] 개인신용정보 수집이용 제공 동의
	var agree7 		= $('#c_agree7').is(":checked");			// [선택] 개인(신용)정보 수집·이용 요약 동의서 [여신 (금융)거래]
	var agree7_3 		= $('#c_agree7_3').is(":checked");			// [선택] 민감정보 수집이용 동의
	var agree7_4 		= $('#c_agree7_4').is(":checked");			// [선택] 개인신용정보 수집이용 제공 동의
	var agree8 		= $('#c_agree8').is(":checked");			// [선택] 개인(신용)정보 수집·이용·제공 동의서 [상품서비스 안내 등]
	var agree8_1 		= $('#c_agree8_1').is(":checked");			// [선택] 문자
	var agree8_2 		= $('#c_agree8_2').is(":checked");			// [선택] 이메일
	var agree8_3 		= $('#c_agree8_3').is(":checked");			// [선택] 전화
	var agree8_4 		= $('#c_agree8_4').is(":checked");			// [선택] 앱푸쉬
	var agree10 		= $('#c_agree10').is(":checked");			// [선택] 대출거절 사유 고지 동의
	var agree12 		= $('#c_agree12').is(":checked");			// [선택] 알림톡 관련 서비스 동의사항
	
	if( !agree1 || !agree2 || !agree3  || !agree4 || !agree5 
			|| !agree13 || !agree21 ) {
		$('.agg>li').removeAttr('id');
		$('.subClsN:checked').eq(0).parents('li').attr('id','scrollTop');
		location.href='#scrollTop';
		
		messageErrorView("약관동의는 필수입니다.");
		return;
	} 
	
	/* 동의항목 별 값 셋팅 */
	var agreeList = [];
	if(agree1) agreeList.push("01:Y");
	if(agree2) agreeList.push("02:Y");
	if(agree3) {
		agreeList.push("agree_b1:Y");
		agreeList.push("agree_b3:Y");
		agreeList.push("agree_b4:Y");
		agreeList.push("agree_b5:Y");
		agreeList.push("agree_b6:Y");
	}
	if(agree4) {
		agreeList.push("agree_bc1:Y");
		agreeList.push("agree_bc2:Y");
		agreeList.push("agree_bc3:Y");
	}
	if(agree5) {
		agreeList.push("agree_bd1:Y");
		agreeList.push("agree_bd2:Y");
		agreeList.push("agree_bd3:Y");
		agreeList.push("agree_bd4:Y");
		agreeList.push("agree_bd5:Y");
		agreeList.push("agree_bd6:Y");
	}
	if(agree77) {
		agreeList.push("agree_fa1:Y");
		agreeList.push("agree_fa2:Y");
	} else {
		agreeList.push("agree_fa1:N");
		agreeList.push("agree_fa2:N");
	}
	if(agree7) {
		agreeList.push("agree_fb1:Y");
		agreeList.push("agree_fb2:Y");
	} else {
		agreeList.push("agree_fb1:N");
		agreeList.push("agree_fb2:N");
	}
	if(agree8) {
		agreeList.push("agree_c6:Y");
		var agr8_1 = agree8_1 == true ? "Y" : "N";
		var agr8_3 = agree8_3 == true ? "Y" : "N";
		var agr8_2 = agree8_2 == true ? "Y" : "N";
		var agr8_4 = agree8_4 == true ? "Y" : "N";
		
		agreeList.push("agree_c3:"+agr8_1);
		agreeList.push("agree_c4:"+agr8_3);
		agreeList.push("agree_c5:"+agr8_2);
		agreeList.push("agree_c8:"+agr8_4);
	} else {
		agreeList.push("agree_c6:N");
		agreeList.push("agree_c3:N");
		agreeList.push("agree_c4:N");
		agreeList.push("agree_c5:N");
		agreeList.push("agree_c8:N");
	}
	if(agree10) agreeList.push("10:Y"); else agreeList.push("10:N");
	if(agree12) agreeList.push("12:Y");
	if(agree13) agreeList.push("13:Y");
	agreeList.push("21:Y");
	
	$('#agreeList').hide();
	$('#agreeListSA').show();	
	$('h1>span').html('대출계약자 적합성 · 확인서');
	
	$(".btn-prev").unbind();
	$(".btn-prev").click(function(){
		$('#agreeList').show();
		$('#agreeListSA').hide();	
		$('h1>span').html('본인인증');
		
		$("#nextBtn").unbind();
		$("#nextBtn").click(function(){
			callSAList();
		});	
	});
	
	$("#nextBtn2").unbind();
	$("#nextBtn2").click(function(){
		checkSAList(agreeList);
	});	
}

function checkSAList(a) {
	
	var finCsmrDvcd = $('#finCsmrDvcd').val();
	var ageDvcd = $('input:radio[name="check1"]:checked').val();
	var cntrCncdPrpsCd = $('input:radio[name="check2"]:checked').val();
	var aninSecd = $('input:radio[name="check3"]:checked').val();
	var astSecd = $('input:radio[name="check4"]:checked').val();
	var debtSecd = $('input:radio[name="check5"]:checked').val();
	var crdtScrSecd = $('input:radio[name="check6"]:checked').val();
	var rpayMtcd = $('input:radio[name="check7"]:checked').val();
	var fixExpnCostCd = $('input:radio[name="check9"]:checked').val();
	
	if(valiCheck(finCsmrDvcd)) {
		messageErrorView("금융소비자 보호법 관련 확인사항을 선택해주세요.");
		return;		
	} else {
		if("21" == finCsmrDvcd) {
			goNext(a);
		} else {
			if(valiCheck(ageDvcd)
					|| valiCheck(cntrCncdPrpsCd)
					|| valiCheck(aninSecd)
					|| valiCheck(astSecd)
					|| valiCheck(debtSecd)
					|| valiCheck(crdtScrSecd)
					|| valiCheck(rpayMtcd)
					|| valiCheck(fixExpnCostCd)) {
				messageErrorView("금융소비자 보호법 관련 확인사항을 선택해주세요.");
				return;
			} else {
				goNext(finCsmrDvcd, ageDvcd, cntrCncdPrpsCd, aninSecd, astSecd, debtSecd, crdtScrSecd, rpayMtcd, fixExpnCostCd, a);
			}
		}
	}
}
		

function goNext(a) {
	var agreeListSA = [];
	agreeListSA.push(a);
	
	var hpAuthReqForm = makeForm("hpAuthReqForm");
	addFormData(hpAuthReqForm, "nextPage", "LIM9002")
	addFormData(hpAuthReqForm, "appNumber", $('#appNumber').val())
	addFormData(hpAuthReqForm, "appStatus", $('#appStatus').val())
	addFormData(hpAuthReqForm, "nextPrcsFunc", "nextPage")
	addFormData(hpAuthReqForm, "prdctCode", "06");	// 신청코드 06:본인인증
	addFormData(hpAuthReqForm, "agreeList", z);
	addFormData(hpAuthReqForm, "agreeListSA", agreeListSA);
	addFormData(hpAuthReqForm, "appNumber", $('#appNumber').val());
	
	doActionView("COM0000", hpAuthReqForm);
}

function goNext(a, b, c, d, e, f, g, h, i, z) {
	
	var agreeListSA = [];
	agreeListSA.push(a);
	agreeListSA.push(b);
	agreeListSA.push(c);
	agreeListSA.push(d);
	agreeListSA.push(e);
	agreeListSA.push(f);
	agreeListSA.push(g);
	agreeListSA.push(h);
	agreeListSA.push(i);
	
	var hpAuthReqForm = makeForm("hpAuthReqForm");
	addFormData(hpAuthReqForm, "nextPage", "LIM9002")
	addFormData(hpAuthReqForm, "appNumber", $('#appNumber').val())
	addFormData(hpAuthReqForm, "appStatus", $('#appStatus').val())
	addFormData(hpAuthReqForm, "nextPrcsFunc", "nextPage")
	addFormData(hpAuthReqForm, "prdctCode", "06");	// 신청코드 06:본인인증
	addFormData(hpAuthReqForm, "agreeList", z);
	addFormData(hpAuthReqForm, "agreeListSA", agreeListSA);
	addFormData(hpAuthReqForm, "appNumber", $('#appNumber').val());
	
	doActionView("COM0000", hpAuthReqForm);
}


function valiCheck(str, result) {
	result = false;
	
	if(typeof str == "undefiend" || str == null || str == "") {
		result = true;
	}
	
	return result;
}