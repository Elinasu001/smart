/**
 * LIM3000_5.js 
 */
$(document).ready(function(){
	// 사전문진표 닫기 이벤트
	$("#endModal").click(function(){
		var var01 = $('.voice-modal ul li button').eq(1).parents().attr('class');
		var var02 = $('.voice-modal ul li button').eq(3).parents().attr('class');
		var var03 = $('.voice-modal ul li button').eq(5).parents().attr('class');
//		alert('var01 : '+var01+',var02 : '+var02+', var03 : '+var03);
		if(var01 == 'active' && var02 == 'active' &&  var03 == 'active'){
			alertOff();
		}else{
			messageView('대출 빙자 보이스 피싱이 의심되오니<br> 고객센터 1577-3800로 연락 바랍니다.',function(){
				$('.voice-modal').show();
			});
		}
	});
	
	/*
	* 필수 약관 전체동의 Y,N
	*/
	/**
	 * 2020.09.08 전체동의시 전체약관보이기
	 */
	$('#all_check').click(function(){
		
		var confirm_id = $(this).attr('data-id');
		$("#cntl_YN").val(confirm_id);
		
		if($(this).is(":checked")){
			
			$('.termsE_Y').prop("checked",true);
			
			agreeAllView();
			
			if($('.argee').hasClass('telYn')){ /* DEP0006_2.view 에서 사용  ??? 먼지 모름 */
				$('.telYn').prop("checked",true);
			}
		}else{
			$('.termsE_Y').prop("checked",false); 
		}
	});

	$('#all_check02').click(function(){
		
		var confirm_id = $(this).attr('data-id');
		$("#cntl_YN").val(confirm_id);
		
		if($(this).is(":checked")){
			
			$('.subClsT').prop("checked",true);
			
			agreeAllView();
			
			if($('.argee').hasClass('telYn')){ /* DEP0006_2.view 에서 사용  ??? 먼지 모름 */
				$('.telYn').prop("checked",true);
			}
		}else{
			$('.subClsT').prop("checked",false); 
		}
	});
	
	/* 2022.09.20 필수 개별약관 1개라도 해제시 전체약관 동의 해제 */
	$('.termsE_Y').click(function(){
		if($(this).prop("checked")){
			termsAndAgreeE('all_check', 'termsE_Y');
			var confirm_id = $(this).attr('data-id');
			$("#cntl_YN").val(confirm_id);
			var viwe_id = $(this).attr('data-tab');
			$(".scr-modal-agreeImg").show();
			$(".scr-modal-agreeImg .agree-img>img").remove();
			$(".agree-img").css("width","100%");
			$(".agree-img").append("<img src='../../WEB/images/K_cert/" + viwe_id + ".png' />");
			$("#view_YN").val(viwe_id);
		}
	});
	
	/* s : 2022.09.19 개인(신용)정보 수집·이용·제공 동의서[상품 서비스안내 등] 체크 제어 */
	$(".setCntl").change(function() { // 선택 선택 동의
			
			//alert("321")
			var  checkBOX01 = $(".setCntl").length; // 동의함
			//alert("checkBOX01 : "+checkBOX01);
			var checkBOXChekc01 = $(".setCntl:checked").length; // 동의함 체크
			//alert("checkBOXChekc01 : "+checkBOXChekc01);

			if( checkBOXChekc01 == 0 ) { // 체크선택이 0 이라면 개인(신용)정보 수집·이용·제공 동의서[상품 서비스안내 등] 체크해제
				$("#identification16").prop("checked",false);
				
			}else{// 체크선택이 0 보다 크다면 개인(신용)정보 수집·이용·제공 동의서[상품 서비스안내 등] 체크
				
				$("#identification16").prop("checked",true);
			}

			termsAndAgreeE('all_check02', 'subClsT')
		});
		/* e : 2022.09.19 */
	
});

/* 2022.09.20 개별약관 1개라도 해제시 전체약과동의 해제 */
function termsAndAgreeE(totID,indID){
	var agreeLength		= $("."+indID).length;
	var agreeChkLength	= $("."+indID+":checked").length;
	
	/* 체크용 추후 삭제  */
	var chkInfo="";

	chkInfo += "agreeLength - 약관 동의함 총 갯수  : [ "+agreeLength+" ]\n";
	chkInfo += "agreeChkLength - 약관 동의함 체크된 총 갯수 : [ "+agreeChkLength+" ]\n";

	//alert(chkInfo);
	/* 체크용 추후 삭제  */

	if(agreeLength==agreeChkLength && agreeChkLength !=0){
		$('#'+totID).prop("checked",true); 
	}else{
		$('#'+totID).prop("checked",false); 
	}
	
}

/* 2022.09.20 필수 약관 동의하시겠습니까? Y 일 경우 필수약관 동의 유지  */
function fnConfirm_Yes(argID){
	if(argID=="all_check"){
		$('.termsE_Y').prop("checked",true); 
		$('#all_check').prop("checked",true); 
	}else{
		$('#'+argID).prop("checked",true);  
		termsAndAgreeE('all_check', 'termsE_Y');
	}
}

/* 2022.09.20 필수 약관 동의하시겠습니까? Y 일 경우 필수약관 동의 유지  */
// function fnConfirm_No(argID){
	
// 	if(argID=="all_check"){
// 		$('.termsE_Y').prop("checked",false); 
// 		$('#all_check').prop("checked",false); 
// 		agreeAllView();
// 	}else{
// 		$('#'+argID).prop("checked",false);  
// 		termsAndAgreeE('all_check', 'termsE_Y');
		
// 		var viwe_id = $("#view_YN").val();
		
// 		// 약관동의 아니오 클릭시 팝업 띄우기 
// 		$(".scr-modal-agreeImg").show();
// 		$(".scr-modal-agreeImg .agree-img>img").remove();
// 		$(".agree-img").css("width","100%");
// 		$(".agree-img").append("<img src='../../WEB/images/K_cert/" + viwe_id + ".png' />");
// 	}
// }
  
