/*
* DM 동의 체크
*/
function dmAndAgree(){
	if($(".clsDmY").is(":checked")){
		$('.clsDm').prop("checked",true);
	}else if($(".clsDmN").is(":checked")){
		$('.clsDm').prop("checked",false);
	};
};



/*$(document).ready(function(){
	
	$('ul.menu_tab li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.menu_tab li').removeClass('active');
		?$('.tab-panel.active').removeClass('active');

		$(this).addClass('active');
		$("#"+tab_id).addClass('active');
	
	});

	$('a.b_menu').click(function(){
		var tab_id = $(this).attr('data-tab2');

		$(this).toggleClass('active');
		?$("#"+tab_id).toggleClass('active');
	
	});



	  $('button.close-panel').on('click',function(){
		$('.menu_box.active').removeClass("active");
		});

		$('a.btn-menu').on('click',function(){
		$('.menu_box').addClass("active");
		});



})*/
$(document).ready(function(){
	
	$('.clsDm').click(function(){
		var dmChkLength	= $(".clsDm:checked").length;
		if(dmChkLength==0){
			$('.clsDmN').prop("checked",true); 
		}else{
			$('.clsDmY').prop("checked",true); 
		}
		termsAndAgree("all_check");	
	});
	
	
	/*
	* 서브약관 Y체크시 체크 Y*/
 	
	$('.subClsY').click(function(){
		if($(this).is(":checked")){
			$(this).parents().parents().prev('.identification02').find('.argee').prop("checked",true); 
		};
	});
	
	$('.subClsY').click(function(){
		if($(this).is(":checked")){
			$(this).parents().parents().prev('.identification03').find('.argee').prop("checked",true); 
		};
	});
	/*
	* 서브약관 N 체크시 체크 N*/
	$('.subClsN').click(function(){
		if($(this).is(":checked")){
			$(this).parents().parents().prev('.identification02').find('.argee').prop("checked",false); 
		}; 
	});
	
	$('.subClsY').click(function(){
		if($(this).is(":checked")){
			$(this).parents().parents().prev('.identification03').find('.argee').prop("checked",true); 
		};
	});
	
	/*
	* 서브약관 전체체크시 동의함 체크
	*/
	$('.subCls').click(function(){
		var clsUl = $(this).parents().parents().parents('.identification02');  
		var subClsLength	= clsUl.find(".subCls").length;
		var subClsChkLength	= clsUl.find(".subCls:checked").length;
				
		if(subClsLength == subClsChkLength){
			clsUl.next().find('.subClsY').prop("checked",true); 

		}else{
			clsUl.next().find('.subClsN').prop("checked",true); 
		}
		termsAndAgree("all_check");	
	});
	
	//0901
	$('.subCls').click(function(){
		var clsUl = $(this).parents().parents().parents('.identification03');  
		var subClsLength	= clsUl.find(".subCls").length;
		var subClsChkLength	= clsUl.find(".subCls:checked").length;
				
		if(subClsLength == subClsChkLength){
			clsUl.next().find('.subClsY').prop("checked",true); 

		}else{
			clsUl.next().find('.subClsN').prop("checked",true); 
		}
		termsAndAgree("all_check");	
	});
	$('.subClsT').click(function(){
		var clsUl = $(this).parents().parents().parents('.identification03');  
		var subClsLength	= clsUl.find(".subClsT").length;
		var subClsChkLength	= clsUl.find(".subClsT:checked").length;
		termsAndAgree("all_check02");	
	});

	
	
	$(".as-hidden01").click(function(){ // 제증명신청-고객정보입력 라디오 히든
		$(".as-hidden-con>div").hide();
		$(".as-hidden-con>div:nth-child(1)").show();
	});
	$(".as-hidden02").click(function(){
		$(".as-hidden-con>div").hide();
		$(".as-hidden-con>div:nth-child(2)").show();
	});
	$(".as-hidden03").click(function(){
		$(".as-hidden-con>div").hide();
		$(".as-hidden-con>div:nth-child(3)").show();
	});

	/*$('ul.menu_tab li').click(function(){

		$('ul.menu_tab li').removeClass('active');
		?$('.tab-panel.active').removeClass('active');

		$(this).addClass('active');
		$("#"+tab_id).addClass('active');
	
	});*/

	
	
	

	$('a.b_menu').click(function(){
		var tab_id = $(this).attr('data-tab2');

		$(this).toggleClass('active');
		?$("#"+tab_id).toggleClass('active');
	
	});
		



	  $('button.close-panel').on('click',function(){
		$('.menu_box.active').removeClass("active");
		});

		$('a.btn-menu').on('click',function(){
			alertOff();
			modalOff();
			$('.menu_box').addClass("active");
		});

		
	$(".as-link-text p").click(function(){ // 알럿 팝업 텍스트 > 인풋 전달 [자기압수표 사고 신고 알럿]
		var linkText = $(this).text();
		$(".as-link-text input").val(linkText);
	});
	
	$(".as-link-text p").click(function(){ // 라디오 체크 탭 > 인풋 전달 [자기압수표 사고 신고 알럿]
		var linkText = $(this).text();
		$(".as-link-text input").val(linkText);
	});
	
})


/********************************************************************************/

$('.menu_tab li a').on('click', function(event) {
    $(this).parent().find('a').removeClass('active');
    $(this).addClass('active');
});

$('.tab-conts').on('scroll', function() {
    $('.tab-panel').each(function() {
        if($('.tab-conts').scrollTop() >= $(this).offset().top) {
            var id = $(this).attr('id');
            $('.menu_tab li a').removeClass('active');
            $('.menu_tab li a[href=#menu_'+ id +']').addClass('active');
        }
    });
});



/*
* 3자리수 ,
*/
function setComma(str)
{
	str = String(str);
	return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

/*
* 4자리수 ,
*/
function setCommaFour(str) {
    return str.toString().replace(/\B(?=(\d{4})+(?!\d))/g, ",");
}

/*
* , 제거
*/
function setUncomma(str)
{
	return str.replace(/[^\d]+/g,'');
}
/*
* 숫자만 입력
*/
function setNum(obj)
{
	obj.value = setUncomma(obj.value);
}

/*
* 3자리수 콤마
*/
function setCommaNum(obj)
{
	obj.value = setComma(setUncomma(obj.value));
}

/*
* 4자리수 콤마
*/
function setCommaNumFour(obj)
{
	obj.value = setCommaFour(setUncomma(obj.value));
}
// 2020.02.24 추가 //


/*
* 약관전체동의 체크 함수 | 동의함 : termsY / 동의안함 : termsN | argID : 전체동의 체크박스 아이디
*/
function termsAndAgree(argID){
	var agreeLength		= $(".termsY").length;
	var agreeChkLength	= $(".termsY:checked").length;
	
	/* 체크용 추후 삭제  */
	var chkInfo="";

	chkInfo += "agreeLength - 약관 동의함 총 갯수  : [ "+agreeLength+" ]\n";
	chkInfo += "agreeChkLength - 약관 동의함 체크된 총 갯수 : [ "+agreeChkLength+" ]\n";

	//alert(chkInfo);
	/* 체크용 추후 삭제  */

	if(agreeLength==agreeChkLength && agreeChkLength !=0){
		$('#'+argID).prop("checked",true); 
	}else{
		$('#'+argID).prop("checked",false); 
	}
	
}

/*
* selectbox 제어 | argSEQ : selectbox 클래스 | argCls : show,hide 영역의 클래스
*/
function selControll(argSEQ,argCls){
	if($("."+argSEQ+" option:last").prop("selected")==true){
		$("."+argCls).show();
	}else{
		$("."+argCls).hide();
	}
}

/*
* radio button 제어 | argY : 라디오버튼 클래스 선택되면 argSh를 보여줌 | argN :라디오버튼 클래스 선택되면 argSh를 숨김 | argSh : show, hide 영역의 클래스
*/
function receiveCnt(argY,argN,argSh){
	if($("."+argY).is(":checked")){
		$("."+argSh).show();
	}else if($("."+argN).is(":checked")){
		$("."+argSh).hide();
	}					
}

/*
* 체크박스 라디오버튼처럼 사용
*/
function fnceInfoVe(obj,argNr,argVe,argInfo){
	if ($(obj).prop('checked')){
		//checkbox 전체를 checked 해제후 click한 요소만 true지정
		$("."+argNr).prop('checked', false);
		$("."+argVe).prop('checked', false);
		$(obj).prop('checked', true);
		
		fnceInfo(argNr,argInfo);
	}else{
		$("."+argInfo).hide();
	}
}

/*
* 취약계층일 경우 안내 show,hide
*/
function fnceInfo(argNmr,argInfo){
	if ($("."+argNmr).prop('checked')) {
		$("."+argInfo).hide();
	}else{
		$("."+argInfo).show();
	}
}

/*
* 체크박스,라디오버튼 체크해제 
*/
function trnfLmt(argReSet){
	$("."+argReSet).removeAttr('checked');
}

/*
* 클래스제거 함수 | argCls : 기준클래스 | remvCls : 제거할 클래스
*/
function remvClass(argCls,remvCls){
	$("."+argCls).removeClass(remvCls);
}

/*
* 클래스추가 함수 | argCls : 기준클래스 | remvCls : 제거할 클래스
*/
function addClass(argCls,addCls){
	$("."+argCls).addClass(addCls);
}



/************************************** // 모바일앱고도화 2차 ************************/



/*오늘날짜 0000-00-00. 형식반환*/


		function fnGetTodayType(){
		  var date = new Date();
		  return date.getFullYear() + "-" + ("0"+(date.getMonth()+1)).slice(-2) + "-" + ("0"+date.getDate()).slice(-2);
		};

		/* argDD 일전 날짜 */
		function fnDayDiff(argDD){
			var onDate  = new Date();  
			var mm		= onDate.getMonth();  
			var dd		= onDate.getDate();  
			var yy		= onDate.getFullYear(); 

			date = new Date(yy, mm, dd);
			date.setDate(date.getDate() - argDD);

			var onDay = fnGetTodayType();
			var stDay = date.toLocaleString();
			
			var jbSplit = stDay.split('.');
			var yyy = jbSplit[0].trim();
			var mmm = jbSplit[1].trim();
			if(parseInt(mmm)<10){
				mmm = "0"+mmm;
			}
			var ddd = jbSplit[2].trim();
			if(parseInt(ddd)<10){
				ddd = "0"+ddd;
			}
			stDay = yyy+"-"+mmm+"-"+ddd;

			$('.startDay' ).val(stDay);
			$('.endDay').val(onDay); 
		};
		
		/* argMM 월전 날짜 */
		function fnMomDiff(argMM){
			var onDate  = new Date();  
			var mm		= onDate.getMonth();  
			var dd		= onDate.getDate();  
			var yy		= onDate.getFullYear();
			
			date = new Date(yy, mm, dd);
			date.setMonth(date.getMonth() - argMM);

			var onDay = fnGetTodayType();
			var stDay = date.toLocaleString();

			var jbSplit = stDay.split('.');
			var yyy = jbSplit[0].trim();
			var mmm = jbSplit[1].trim();
			if(parseInt(mmm)<10){
				mmm = "0"+mmm;
			}
			var ddd = jbSplit[2].trim();
			if(parseInt(ddd)<10){
				ddd = "0"+ddd;
			}
			stDay = yyy+"-"+mmm+"-"+ddd;

			$('.startDay' ).val(stDay);
			$('.endDay').val(onDay); 
		};


        $(document).ready(function(){
        	$('ul.agg li span.btn a').text("보기");
			//약관동의팝업
			$('ul.agg li span.btn a').click(function(){
				var tab_id = $(this).attr('data-tab');
				$('.agg_pop').removeClass('on');
				$(this).addClass('on');
				$("#"+tab_id).addClass('on');
				$("#"+tab_id).show();
				
				var lootPoint = $(this).parent().parent().next(); // P class="agg_btn" 기준 체크 박스 활성화
				
				lootPoint.children("span:nth-child(2)").children("input").prop("checked",true);
				lootPoint.children().children().children("input").prop("checked",true);
				lootPoint.next().children("span:nth-child(2)").children("input").prop("checked",true);
				lootPoint.children().children().children().children().children("input").prop("checked",true);
				
				$(".scr-modal-agreeImg").show();
				$(".scr-modal-agreeImg .agree-img>img").remove();
				$(".agree-img").css("width","100%");
				$(".agree-img").append("<img src='../../WEB/images/K_cert/" + tab_id + ".png' />");

			});
			
			$('ul.identification02>li>span>a').click(function(){
				var tab_id = $(this).attr('data-tab');
				$(".scr-modal-agreeImg").show();
				$(".scr-modal-agreeImg .agree-img>img").remove();
				$(".agree-img").css("width","100%");
				$(".agree-img").append("<img src='../../WEB/images/K_cert/" + tab_id + ".png' />");
			});
			
			$('ul.identification03>li>span>a').click(function(){
				alert("개별약관222");
				var tab_id = $(this).attr('data-tab');
				$(".scr-modal-agreeImg").show();
				$(".scr-modal-agreeImg .agree-img>img").remove();
				$(".agree-img").css("width","100%");
				$(".agree-img").append("<img src='../../WEB/images/K_cert/" + tab_id + ".png' />");
			});
			
			$('.COM2000 ul.agg li label').click(function(){
				var tab_id = $(this).attr('data-tab');
				$('.agg_pop').removeClass('on');
				$(this).addClass('on');
				$("#"+tab_id).addClass('on');
			}); 
			
			
			
		
			
			
			/* 2020.09.08 동의시 약관보이기 */
			$('.termsY').change(function(){
				if($(this).is(":checked")){
					var tab_id = $(this).parents().parents().parents("li").find("a").attr('data-tab');
					$('#'+tab_id).addClass('on');
					$('#'+tab_id).show();
				}
				
			});
			
			/* 2020.09.08 개별약관내용 닫기 */
			$('.btn-close_').click(function(){
				var tab_id = $(this).attr('data-tab');
				$('#'+tab_id).removeClass('on');
				$('#'+tab_id).hide();
				
				/* 2020.10.07 X클릭시 동의하지 않음 처리 START */
				var tab_id_N = tab_id+'_N'  
				//alert("tab_id_N : "+tab_id_N);
				$('.'+tab_id_N).prop("checked",true);
				termsAndAgree("all_check");		
				
				if(tab_id =="agg_2"){
					$('.c_agree2').prop("checked",false);
				}
				
				if(tab_id =="agg_41"){
					$('.c_agree41_chk').prop("checked",false);
				}
				/* 2020.10.07 X클릭시 동의하지 않음 처리 END*/
			});
			
			/* 2020.09.08 팝업 동의시 동의함으로 체크*/
			$('.pop_btn_').click(function(){
				var tab_id = $(this).attr('data-tab');
				// alert("tab_id : "+tab_id);
				$('#'+tab_id).removeClass('on');
				$('#'+tab_id).hide();
				
				if(tab_id=="agg_2"){
					$('.c_agree2').prop("checked",true); /* LIM2001_1.jsp 에서만 쓰임*/		
				}
				
				if(tab_id=="agg_24"){
					$('.c_agree2').prop("checked",true); /* LIM2003_2.jsp 에서만 쓰임*/		
				}
				
				if($('.argee').hasClass('telYn')){ /* DEP0006_2.view 에서 사용 */
					$('.telYn').prop("checked",true);
				}
				
				$('.'+tab_id).prop("checked",true);
				
				termsAndAgree("all_check");		
				
				if(tab_id=="agg_21"){
					fnSubContrY('clsDmDf');
				}
				
				if(tab_id=="agg_41"){
					$('.c_agree41_chk').prop("checked",true); 		
				}
			});

			/*
			* 전체동의 Y,N 체크
			*/
			$('.argee').click(function(){
				termsAndAgree("all_check");					
			});
				
			
			//20.09.21 대출모집인 설명확인서
			$('#agg_18_2.LIM0021_1_pop a.btn-close').click(function(){
				$('#agg_18_2.LIM0021_1_pop').hide();
			});
			
			$('#agg_18_2.LIM0021_1_pop a.pop_btn').click(function(){
				$('#agg_18_2.LIM0021_1_pop').hide();
			});
			
			$('.agree_18_2_alert p.btn a').click(function(){
				$('.agree_18_2_alert').hide();
			});
			
			$('.alert_18_2').click(function(){
				$('.agree_18_2_alert').show();
			});	
			
			$('#agg_18_2 .hide').click(function(){
				if($('#agg_18_2 .hide').is(":checked")){
					$('li.btn_chk').hide();
					$('.agree_18_2_alert').show();
				}
			});	
			
			$('#agg_18_2 .show').click(function(){
				if($('#agg_18_2 .show').is(":checked")){
					$('li.btn_chk').show();
				}
			});	


			// 당타행, CMS 출금여부 chek
		$("#dep02_chk1").change(function(){

			if($("#dep02_chk1").is(":checked")){
				$(".applicable_bank").removeClass("on");
				$(".CMS_bank").addClass("on")
				$(".top_blue_box").removeClass("on");
			}else{
				$(".applicable_bank").addClass("on")
				$(".CMS_bank").removeClass("on");
				$(".top_blue_box").addClass("on");
			};
		});

			// 타행출금여부 chec
			/*$("#dep02_chk1").change(function(){
				if($("#dep02_chk1").is(":checked")){
					$(".account_name").addClass('on')
				}else{
					$(".account_name").removeClass('on')
				}
			});*/

			// 자주쓰는계좌등록 chec
			$(".chk_name").click(function(){
				if($(this).is(":checked")){
					fnAddActShow();
				}else{
					fnSetNull();
				}
			});

			$(".name_btn").click(function(){
				fnAddActHide();
				fnActSetShow();
			});

			$(".nope").click(function(){
				fnAddActHide();
				fnSetNull();
			});		

			$(".actComplete").click(function(){
				fnActSethide();
			}); 

			//날짜
			$('.select_day').show()
			var stDay = fnGetTodayType();
			var enDay = fnGetTodayType();
			$('.startDay' ).val(stDay);
			$('.endDay').val(enDay); 
			
			$('input#term5').on("change",function(){
				
				if( $('input#term5').length==$('input#term5:checked').length){ 
					$('li.term').show();
					$('.direct_input').show();
				} 

				else{ 
					$('li.term').hide();
					$('.direct_input').hide();
	
				}

			
			});

			//입금은행 탭
		

		/* 최근, 내계좌, 자주쓰는 팝업 선택시 자동 입력 최근입금에만 적용시켜 놓음 */
		$('.actInfo').click(function(){
			var bankNm = $(this).children( 'dt' ).text();
			var bankNum = $(this).children( 'dd' ).text();
			var custNm = $(this).children( 'dd' ).children( 'span' ).text();
			bankNum = bankNum.replace(custNm,"");
			
			/* 자동이체의 타행출금 체크때문에 추가  start */
			if($('.otherBankInput').is(":checked")){
				fnBankValNull();
				$('.otherBankNm').val(bankNm);
				$('.otherBankNum').val(bankNum);
			}else{
				fnBankValNull();
				$('.bankNm').val(bankNm);
				$('.bankNum').val(bankNum);
			}
			/* 자동이체의 타행출금 체크때문에 추가 end */
			
			$('.alert_pop').hide();
			$('.alert_pop > div').hide();
		});

			/* 출금계좌선택시 자동입력 */
			$('.actInfo_').click(function(){
				var bankNum = $(this).children( 'p:eq(1)' ).text();
				
				$('.withdrawNum').text(bankNum);
				
				/* 자동이체의 타행출금 체크때문에 추가  start */
				if($('.otherBankInput').is(":checked")){	
					$('.inputBankNum').val(bankNum);
				}else{
					$('.withdrawNum').text(bankNum);
				}
				/* 자동이체의 타행출금 체크때문에 추가 end */

				$('.alert_pop').hide();
				$('.alert_pop > div').hide();
			});

			//인풋입력시border-bottom효과
			$('ul.li_input li').click(function(){
				$('ul.li_input li').removeClass('on');
				$(this).addClass('on');
				$(this).removeClass('error');
			});

				//출금계좌선택시 팝업
			$('.top_blue_box>div.rink').click(function(){
				$('.alert_pop').show();
				$('.account').show();			
			});

			//입금계좌선택시 팝업모음
			$('.deposit_select').click(function(){
				$('.alert_pop').show();
				$('.account').show();			
			});
			

			//입금은행 선택
			$('.banking_btn').click(function(){
				fnBanking_btn()
				
			});   

			/* 입금은행선택시 자동입력 */
			$('.bnkStokNm').click(function(){
				var bankNm = $(this).text();
				var DEP2019 = $('.DEP2019_1').val();
				
				/* 자동이체의 타행출금 체크때문에 추가  start */
				if($('.otherBankInput').is(":checked")){	
					fnBankValNull();
					$('.otherBankNm').val(bankNm);
					
				}else if(DEP2019 == 'bankNm_1'){
					$('.bankNum_1').val("");
				}else if(DEP2019 == 'bankNm_2'){
					$('.otherBankNum').val("");
				}else{
					fnBankValNull();
					$('.bankNm').val(bankNm);
				}
				/* 자동이체의 타행출금 체크때문에 추가 end */
				

				$('.alert_pop').hide();
				$('.alert_pop > div').hide();
			});



			//저축은행선택 팝업
			$('.banking_btn').click(function(){
				$('.banking_list.alert').addClass('on');
				
			});
		
			$('.banking_list .pop_btn2').click(function(){
				$('.banking_list.alert').removeClass('on');
			});




			//알럿 닫기
			$('.alert_pop .confirm_box p.btn a').click(function(){
					$('.alert_pop').hide();
					$('.alert_pop > div').hide();
			});

			//알럿 닫기
			$('.alert_pop .alert_box p.btn a').click(function(){
					$('.alert_pop').hide();
					$('.alert_pop > div').hide();
			});
			
			//메세지알럿 닫기
			$('.message_pop .confirm_box p.btn a').click(function(){
					$('.message_pop').hide();
					$('.message_pop > div').hide();
			});

			//메세지알럿 닫기
			$('.message_pop .alert_box p.btn a').click(function(){
					$('.message_pop').hide();
					$('.message_pop > div').hide();
			});

			//추가인증 알럿 닫기
			$('.certification_alert .alert_pop2 p.btn a').click(function(){
				$('.alert_pop2').hide();
			});
			
			//보이시피상 피해주의 팝업
			$('.damage_btn').click(function(){
				$('.alert_pop').show();
				$('.damage_pop').show();
				
			});
/*
			//보이시피상 사고신고 팝업버튼
			$('.report_btn').click(function(){

				
			});

*/			//자동이체 미등록 팝업버튼
			$('.withdrawal_btn').click(function(){
				$('.detail_lay').show();			
			});

			$('a.pop_btn').click(function(){
				$('.detail_lay').hide();			
			});
			
			//예적금해지-가입상세내용 팝업닫기버튼
			$('a.pop_btn').click(function(){
				$('.detail_layup').hide();			
			});

			//상세보기 팝업
			$('.notice_box>a').on('click', function(){
				$('.pop_view1').show();
			});	

			//상세보기 닫기 팝업
			$('a.pop_btn').click(function(){
				$('.pop_lay').removeClass('on');
				
			});
			
			/***추가인증 팝업스크립트***/
			/****$('.certification_lay ul.tab li').click(function(){

				var tab_id = $(this).attr('data-tab');

				$('.certification_lay ul.tab li').removeClass('on');
				$('.certification_cont').hide();

				$(this).addClass('on');
				$("."+tab_id).show();
			});***/

		

			//조회버튼 클릭시 이체내역조회
			/*$('.btn_t_history').click(function(){
				$('.deal_history').addClass('on');
				
			});*/

				//자동이체등록조회 당행,타행 tab 
			$(".signup>li").click(function(){							
			var tab_id = $(this).attr("data-tab");

			$(".signup li").removeClass("current");
			$(".signup li").removeClass("on");
			$(".tab-content").removeClass("current");		

			$(this).addClass("current");	
			$(this).addClass("on");
			$("." + tab_id).addClass("current");
			});
			
			//입금든행 tab선택시 border효과
			/*$('ul.tab_menu li').click(function(){
				$('ul.tab_menu li').removeClass('on');
				$(this).addClass('on');
				
			});*/

			//입금은행 탭
			$('.alert_tab > li').click(function(){
				$('.alert_pop').show();
				$('.account_alert').show();

				var tab_id = $(this).attr('data-tab');

				$('.alert_tab > li').removeClass('on');
				$('.alert_tab_cont').removeClass('on');

				$(this).addClass('on');
				$("."+tab_id).addClass('on');
			});

			//최근 입금
			$('li.account_alert1').click(function(){
				$('.account_alert1').addClass('on');
				

			});
			//자주쓰는
			$('li.account_alert2').click(function(){
				$('.account_alert2').addClass('on');

			});

			//내계좌
			$('li.account_alert3').click(function(){
				$('.account_alert3').addClass('on');

			});

			//입급지정
			$('li.account_alert4').click(function(){
				$('.account_alert4').addClass('on');

			});

			//은행
			$('li.account_alert5').click(function(){
				$('.account_alert5').addClass('on');

			});

			//은행
			$('li.account_alert6').click(function(){
				$('.account_alert6').addClass('on');

			});



			/* 이체일 매월 말일시 입력이체일 NULL처리*/
			$('.receiveEmY').click(function(){
				if($(this).is(":checked")){
					$('.tranDay').val("");
				}
			});

			//수표선택시 팝업
			$('.cheque').click(function(){
				$('.alert_pop').show();
				$('.account2').show();			
			});

			//카드선택시 팝업
			$('.cheque2').click(function(){
				$('.alert_pop').show();
				$('.account3').show();			
			});

			// 수표밯행은행구분 당행 타행


			//수표선택시 팝업
			$('.chequeBank').click(function(){
				var seq = $('.chequeBank:checked').index( '.chequeBank' );  // 체크된 라디오버튼의 index
				if (seq==0)	// 당행이라면 
				{
					$('.anotherline_bank').removeClass('on'); // 수표종류 숨기기
					$('.nowbank').show();  // ?? 이건 뭐지 ???
					$('.ourCheque').show();  // 당행에서발행된수표를 선택하세요 show 
				}
				else
				{
					$('.anotherline_bank').addClass('on');	// 수표종류 숨기기
					$('.nowbank').hide();	// ?? 이건 뭐지 ???
					$('.ourCheque').hide();  // 당행에서발행된수표를 선택하세요 show 
				}
			});

			//수표종류, 수표번호 선택시 input 
			$('.actInfo_cheque').click(function(){
				
				/*
				var seq = $('.chequeBank:checked').index( '.chequeBank' );  // 체크된 라디오버튼의 index
				var chequeNumDvn = $(this).children( 'p:eq(0)' ).text();
				alert("chequeNumDvn : "+chequeNumDvn);
				alert("bb");
				if (seq==0)	// 당행이라면 
				{
					$('.ourChequeNum').val('on'); // 수표종류 숨기기
					$('.nowbank').show();  // ?? 이건 뭐지 ???
					$('.ourCheque').show();  // 당행에서발행된수표를 선택하세요 show 
				}
				else
				{
					$('.anotherline_bank').addClass('on');	// 수표종류 숨기기
					$('.nowbank').hide();	// ?? 이건 뭐지 ???
					$('.ourCheque').hide();  // 당행에서발행된수표를 선택하세요 show 
				}

				var seq = $('.chequeBank:checked').index( '.chequeBank' );  // 체크된 라디오버튼의 index
				alert("seq : ");

				if (seq==0)	// 당행이라면 
				{
					$('.anotherline_bank').removeClass('on'); // 수표종류 숨기기
					$('.nowbank').show();  // ?? 이건 뭐지 ???
					$('.ourCheque').show();  // 당행에서발행된수표를 선택하세요 show 
				}
				else
				{
					$('.anotherline_bank').addClass('on');	// 수표종류 숨기기
					$('.nowbank').hide();	// ?? 이건 뭐지 ???
					$('.ourCheque').hide();  // 당행에서발행된수표를 선택하세요 show 
				}
				*/
			});

			/*
			 $('input[type=radio][name=dep02_rdo01]').on('click', function() {
				var chkValue = $('input[type=radio][name=dep02_rdo01]:checked').val();
				if (chkValue == '1') {
					$('.anotherline_bank').removeClass('on');
					$('.nowbank').show();
				}else if (chkValue == '2') {
					$('.anotherline_bank').addClass('on');
					$('.nowbank').hide();
				};
			 });
			 */


			/* DEP2007.jsp 당행 수펴번호, 타행 수표종류 input*/
			$('.actInfo_cheque').click(function(){
				var seq = $('.chequeBank:checked').index( '.chequeBank' );  // 체크된 라디오버튼의 index
				var chequeNumDvn = $(this).children( 'p:eq(0)' ).text();	// 클릭한 수표번호, 수표종류 

				if (seq==0)	// 당행이라면 
				{
					$('.otherChequeDvn').val("");	// 수표종류 입력 null 처리
					$('.ourChequeNum').val(chequeNumDvn); // 당행에서 발행한 수표번호 입력
				}
				else	// 타행이라면
				{
					$('.ourChequeNum').val(""); // 당행에서 발행한 수표번호 입력 null 처리
					$('.otherChequeDvn').val(chequeNumDvn);	// 타행일 경우  수표종류 입력
				}
				$('.alert_pop').hide();		// 팝업닫기
				$('.account2').hide();		// 팝업닫기
			});

			 /* DEP2009.jsp 카드번호 input */
			$('.actInfo_card').click(function(){
				var cardCompNm		= $(this).children( 'p:eq(0)' ).text();	// 카드사명
				var cardNum			= $(this).children( 'p:eq(1)' ).text();	// 카드번호
				//alert("cardCompNm : "+cardCompNm+"\ncardNum : "+cardNum);
				$('.card_Num').val(cardNum);
				$('.alert_pop').hide();
				$('.account3').hide();		
				/*
					
				*/
			});
			 //신고구분 신고인주민번호 수표번호
			 $('input[type=radio][name=dep02_rdo01]').on('click', function() {
				var chkValue = $('input[type=radio][name=dep02_rdo01]:checked').val();
				if (chkValue == '1') {
					$('.radio_value1').show();
					$('.radio_value2').hide();
				}else if (chkValue == '2') {
					$('.radio_value1').hide();
					$('.radio_value2').show();
				};
			 });
/*

			//DEP2003
			$('.ver3').click(function(){
				$('.toto').show();
				btnrink();
				function btnrink(){
					$('.ver3').click(function(){location.href = "./DEP2003_1.jsp";});
				}
			});

			//DEP2004
			$('.ver4').click(function(){
				$('.toto').show();
				btnrink;
				function btnrink(){
					$('.ver4').click(function(){location.href = "./DEP2004_1.jsp";});
				};
			});

*/


	

		//즉이체 추가이체 버튼 클릭시  닫기
		/*$('.now_transfer .round_btn a.bg_blue').click(function(){
				$('.alert_pop').hide();
				$('.alert_pop > div').hide();
		});*/

		//즉시이체 보이스피싱안내 팝업
/*		$('.now_transfer .damage_btn').click(function(){
			$('.damage_pop').show();
			$('.now_transfer').hide();	
		});
*/
		//보이시피상 사고신고 팝업버튼
		$('.now_transfer .report_btn').click(function(){
			$('.alert_pop').show();
			$('.report_pop').show();
			
		});

		//이체내역 알럿 닫기 버튼
		$('.now_transfer a.page_close').click(function(){
			$('.alert_pop').hide();
			$('.now_transfer').hide();
		});

	/**인증탭**/
		$('.cfn_tab > span.radio').click(function(){

			var tab_id = $(this).attr('data-tab');

			$('.cfn_tab > span.radio').removeClass('on');
			$('.cfn_cont').hide();

			$(this).addClass('on');
			$("."+tab_id).show();
		});

		
		//공동인증 체크
		$("#all_check_i").change(function(){ 
			$('.argee_i').prop("checked",$(this).prop("checked")); 
			}); /*Handler For rest of the checkbox*/ 
			$('.argee_i').change(function(){ 
				if( $('.argee_i').length==$('.argee_i:checked').length){ $("#all_check_i").prop("checked",true); } 
				else{ $("#all_check_i").prop("checked",false); } 
		}); 

		//DEP2018_3 상세내역보기 팝업
		$('.detail_info').on('click', function(){
			$('.pop_view1').show();
		});	

			//DEP2022 가입상세내용 팝업
		$('.DEP22').on('click', function(){
			$('.pop_view1').show();
		});



		$('.DEP23').on('click', function(){
			$('.pop23').show();
		});	
});
/* document.ready - END */
        
	/*자동이체에만 적용 은행명, 계좌번호 null 처리 */
	function fnBankValNull(){
		$(".bankNm").val("");
		$(".bankNum").val("");
		$(".otherBankNm").val("");
		$(".otherBankNum").val("");
	}
	
	/* 계좌별칭 입력창 show */
	function fnAddActShow(){		
		$(".alert_pop").show();
		$(".actSet").show();
		$(".account_name").show();
	}

	/* 계좌별칭 입력창 hide */
	function fnAddActHide(){
		$(".alert_pop").hide();
		$(".actSet").hide();
		$(".account_name").hide();
	}

	/* 계좌등록 알림창 show */
	function fnActSetShow(){
		$(".alert_pop").show();
		$(".name_pop").show();
		/*$(".actTxt").text("자주쓰는계좌가 등록되었습니다.");*/
	}

	/* 계좌등록 알림창 hide */
	function fnActSethide(){
		$(".alert_pop").hide();
		$(".name_pop").hide();
	}
	
	/* 계좌별칭 Null 처리 */
	function fnSetNull(){
		$(".actVal").val("");
		/*$(".actTxt").text("자주쓰는 계좌등록");  */  
		$(".contrNm").val("");  // 기존별칭
		$(".chk_name").prop("checked",false); /*20201022 계좌등록알림창 취소버튼클릭시 체크해제*/
	}


	/* 은행 선택 팝업 */
	function fnBanking_btn(){
		$('.alert_pop').show();
		$('.banking_list').show();
		// $('.alert_tab>li').removeClass('on');
		$('.bbbb').removeClass('on');
		$('.aaaa').addClass('on');
		$('.alert_tab6').removeClass('on');
		$('.alert_tab5').addClass('on');
	}

	/*
	* 입력값 자동증가 - argMony: 증가값 | argHando : 증가값 입력될곳의 클래스 
	*/
	function fnPlusMony(argMony,argHando,argTrnf){
		var maxMony = $(".maxMoney").text();
		maxMony = maxMony.replace("잔액","");
		maxMony = maxMony.replace("원","");
		maxMony = setUncomma(maxMony);
		
		var handoMony = $("."+argHando).val() // 현재입력값
		handoMony = setUncomma(handoMony);
		
		var plusMony = parseInt(handoMony) + argMony;

		if(plusMony > parseInt(maxMony)){
			plusMony = 0;
			messageErrorView("이체금액은 잔액을 초과할 수 없습니다.");
		}
		$("."+argHando).val(setComma(plusMony));    //    
	}

	/*
	* 전액송금
	*/
	function fnAllMony(argMony,argHando,argTrnf){
		var maxMony = $(".maxMoney").text();
		maxMony = maxMony.replace("잔액","");
		maxMony = maxMony.replace("원","");
		maxMony = setUncomma(maxMony);
		
		$("."+argHando).val(setComma(maxMony));
	}

/* 스마트 저축은행 */

	function alertOn(alertNo) { // 알럿창 호출
		$(".popup-layout").hide();
		$(".popup-layout-full").hide();
		
		//2022-09-21 저축은행명 상세표시
		if(alertNo=='bank-select'){
			var sbcdForm = makeForm("loginCheckForm");
			addFormData(sbcdForm, "SBCD", "332");
			doAction("COM0004", sbcdForm, function(com0004Res){
				var tagStr = '';
				for(i in com0004Res.OUT_REC){
					var bank = com0004Res.OUT_REC[i];
					var tag = '<li class="sb bnkStokNm '+bank.BANK_CODE+'" data-bkcd="050"><span>'+bank.BANK_NAME+'</span></li>';
					tagStr+=tag;
				}
				$('.bank-select-tab01 ul').append(tagStr);
			    $("body").addClass("body-lock");
				$("html").css("overflow","hidden");
				$(".scr-alert-"+alertNo).show();
			}, function(com0004Res){
						messageErrorView("인증 처리 중 오류가 발생하였습니다.");
			},true);
		}else{
			$("body").addClass("body-lock");
			$("html").css("overflow","hidden");
			$(".scr-alert-"+alertNo).show();
		}
	};

	function modalOn(modalNo) { // 모달창 호출
		$(".popup-layout").hide();
		$(".popup-layout-full").hide();
		$(".scr-modal-"+modalNo).show();
	};

	function alertOff() { // 알럿창 닫기
		$(".popup-layout").hide();
		$(".popup-layout-full").hide();
		$("body").removeClass("body-lock");
		$("html").css("overflow","auto");
	};

	function modalOff(confinYn) { // 모달창 닫기
		if(confinYn==true){
			confirmView('<br>약관에 동의하시겠습니까?<br><br>', function(){
				$(".popup-layout").hide();
				$(".popup-layout-full").hide();
			}, function(){
				
			});
		}else{
			$(".popup-layout").hide();
			$(".popup-layout-full").hide();
		}
	};

	function depthOn() { //
		$(".Depth-02").css("display","block");
	};
	
	function buttontoggle() {
		$(".button-if").toggleClass("on");
		$(".hidden-area").toggle();
	}
	
	/* 즐겨찾기 등록 해제 S */
	function markinOn() {
		$(".bankmark").addClass("ok");
	}

	function markinOff() {
		$(".bankmark").removeClass("ok");
	}
	/* 즐겨찾기 등록 해제 E */
	

$(document).ready(function(){
	
	$(".ST-Accordion .ST-Ac-Button").click(function(){ // 아코디언
		var tg = $(this).siblings(".ST-Accordion .ST-Ac-Action");
		var dis = tg.css("display");
		if (dis=="none") {
			$(".ST-Accordion .ST-Ac-Button").removeClass("Active");
			$(".ST-Accordion .ST-Ac-Action").slideUp(300);
			$(this).addClass("Active");
			tg.slideDown(300);
		} else {
			$(".ST-Accordion .ST-Ac-Button").removeClass("Active");
			$(".ST-Accordion .ST-Ac-Action").slideUp(300);
		}
		return false;
	});
	
	$('.tab-layout>ul>li').click(function(){ // 탭 액션
		var tab_id = $(this).attr('data-tab');
		$('.tab-layout>ul>li').removeClass('on');
		$(this).addClass('on');
		$('.'+tab_id).addClass();
		$('.tab-layout>div>div').hide();
		$('.'+tab_id).show();
	});




	$(".action-tabmenu li").click(function() { // addclass="action-tabmenu"
		$(".action-tabmenu li").removeClass("active");
		$(this).addClass("active");
	});
	
	$(".button-if").click(function(){ // 즉시 이체 타행출금여부
		if($("#hiddenBox").is(":checked")==true) {
			$(".hidden-area").css("display","block")
			$(".hidden-area02").hide();
		}else{
			$(".hidden-area02").show();
			$(".hidden-area").css("display","none")
		}
	});
	
	$('ul.add_tab li').click(function(){ // 주소 검색 탭
		var tab_id = $(this).attr('data-tab');
		$('ul.add_tab li').removeClass('bg_blue');
		$(this).addClass('bg_blue');
		$('.add_list').removeClass('on');
		$("#"+tab_id).addClass('on');
	});
	
	$(".Depth-02").hide(); // 계좌 숨

	$('.tab_menu04 li').click(function(){
		var tab_id = $(this).attr('data-tab');
		$('.tab_menu04 li').removeClass('on');
		var tab_class = $(this).attr("class");
		$("."+tab_class).addClass("on");
		$('.linktab-layout .linktab-con>div').hide();
		$('.'+tab_id).show();
		$('.linktab-layout>ul>.'+tab_id).addClass('on');
	});
	
	$(".ac-radioTab input").click(function(){ // 라디오 탭
		if($(".ac-radioTab li:first-child>input").is(":checked")==true) {
			$(".ac-radioContent:nth-child(1)").css("display","block")
			$(".ac-radioContent:nth-child(2)").hide();
		}else{
			$(".ac-radioContent:nth-child(1)").show();
			$(".ac-radioContent:nth-child(2)").css("display","none")
		}
	});
	
	$(".accoBtn").click(function(){ //자주묻는질문 아코디언
		var tg = $(this).siblings(".accordion");
		var dis = tg.css("display");
		if (dis=="none") {
			$(".accoBtn").removeClass("Active");
			$(".accordion").slideUp(300);
			$(this).addClass("Active");
			tg.slideDown(300);
		} else {
			$(".accoBtn").removeClass("Active");
			$(".accordion").slideUp(300);
		}
		return false;
	});
	
////<span><em>[선택]</em> 개인(신용)정보 수집 · 이용 동의서 (여신 금융거래)</span>
	$(".check-ipt02").change(function() {
		if( $('.check-ipt02:checked').length <= 0 ){
			$(".check-ipt-Y02").prop("checked",false);
		}else{
			$(".check-ipt-Y02").prop("checked",true);
		};
	});
	$(".check-ipt-Y02").click(function() {
		$(".allcheckYN02 input").prop("checked",true);
	});

	$(".check-ipt-N02").click(function() {
		$(".allcheckYN02 input").prop("checked",false);
	});
///////////////////////////////////////////////////////////////
	$(".check-ipt01").change(function() {
		if( $('.check-ipt01:checked').length <= 0 ){
			$(".check-ipt-Y01").prop("checked",false);
		}else{
			$(".check-ipt-Y01").prop("checked",true);
		};
	});
	$(".check-ipt-Y01").click(function() {
		$(".allcheckYN01 input").prop("checked",true);
	});

	$(".check-ipt01-N01").click(function() {
		$(".allcheckYN01 input").prop("checked",false);
	});
///////////////////////////////////////////////////////////////
	$(".check-ipt03").change(function() {
		if( $('.check-ipt03:checked').length <= 0 ){
			$(".check-ipt-N03").prop("checked",true);
		}else{
			$(".check-ipt-Y03").prop("checked",true);
		};
	});
	$(".check-ipt-Y03").click(function() {
		$(".allcheckYN03 input").prop("checked",true);
	});

	$(".check-ipt01-N03").click(function() {
		$(".allcheckYN03 input").prop("checked",false);
	});
///////////////////////////////////////////////////////////////
	$(".check-ipt").change(function() {
		if( $('.check-ipt:checked').length <= 0 ){
			$(".check-ipt-N").prop("checked",true);
		}else{
			$(".check-ipt-Y").prop("checked",true);
		};
	});
	$(".check-ipt-Y").click(function() {
		$(".allcheckYN input").prop("checked",true);
	});

	$(".check-ipt-N").click(function() {
		$(".allcheckYN input").prop("checked",false);
	});
	
	/*  2022.09.20 주석처리 
	$(".all #all_check,.all02 #all_check").click(function() { // 약관 전체 동의 클릭 시 약관 모아 보여 주기
		agreeAllView();
		$(".check-ipt").prop("checked",true);
	});
	*/
});

function  depthOn() {
	$(".Depth-02").show();
}

function imgPP(n){ // 이미지 컨테이너 크기 n 만큼 확대 -> 이미지 넓이 100%
	var asd = $(".agree-img").width();
	$(".agree-img").animate({ width : asd * n + "px" }, 500);
}
function imgMM(n){ // 이미지 컨테이너 크기 n 만큼 확대 -> 이미지 넓이 100%
	var asd = $(".agree-img").width(); 
	if ($(".agree-img").width() <= 468 )
	{
		$(".agree-img").animate({ width : 100 + "%" }, 500);
	}else{
		$(".agree-img").animate({ width : asd * n + "px" }, 500);
	}
}

function agreeView() { // 모달 쇼 -> data-tab 이미지 파일명 변경
	var tab_id = $(this).attr('data-tab');
	$(".scr-modal-agreeImg").show();
	$(".scr-modal-agreeImg .agree-img>img").remove();
	$(".agree-img").css("width","100%");
	$(".agree-img").append("<img src='../../WEB/images/K_cert/" + tab_id + ".png' />");
}

function agreeAllView() { // 모달 쇼 -> 이미지 삭제 -> btn a data 수집 -> 이미지 추가
	$(".scr-modal-agreeImg").show();
	$(".scr-modal-agreeImg .agree-img>img").remove();

	$(".btn a,.agree_chk02 a").each(function(index, item) {
		var agreeimg = $(item).attr("data-tab");
		$(".agree-img").append("<img src='../../WEB/images/K_cert/" + agreeimg + ".png' />");
	});
}


///////////////////////////////////////////

$(document).ready(function(){
	
	$(".checkbox-allselect .all_check").change(function() { // 전체 선택 | 해제
		
		/*
		if( $(".checkbox-allselect .all_check").is(":checked") ) {
			$(this).parents().next(".agg").find(".subClsY").prop("checked", true);
			$(this).parents().next(".agg").find(".subCls").prop("checked", true);
			
			$(this).parents().next(".agg").find(".subClsNY").prop("checked", true);			
			$(this).parents().next(".agg").find(".subClsS").prop("checked", true);
		}else{
			$(this).parents().next(".agg").find(".subClsN").prop("checked", true);
			$(this).parents().next(".agg").find(".subCls").prop("checked", false);
			
			$(this).parents().next(".agg").find(".subClsS").prop("checked", false);
			$(this).parents().next(".agg").find(".subClsNN").prop("checked", true);
		}
		*/
	});
		
	//0901
		$(".checkbox-allselect .all_check02").change(function() { // 전체 선택 | 해제
			if( $(".checkbox-allselect .all_check02").is(":checked") ) {
				$(this).parents().next(".agg").find(".subClsT").prop("checked", true);
		
				$(this).parents().next(".agg").find(".subClsS").prop("checked", true);
			}else{
				$(this).parents().next(".agg").find(".subClsT").prop("checked", false);
				
				$(this).parents().next(".agg").find(".subClsS").prop("checked", false);
			}
		});

	
	$(".agg .meta-chk .subCls").change(function() { // 필수 동의
		
		if( $(this).is(":checked") ) {
			$(this).parents(".meta-chk").find(".subCls").prop("checked", true);
			$(this).parents(".meta-chk").next(".agg_btn").find(".subClsY").prop("checked",true);
		}else{
			$(this).parents(".meta-chk").find(".subCls").prop("checked", false);
			$(this).parents(".meta-chk").next(".agg_btn").find(".subClsN").prop("checked",true);
		}

		allbuttonControl()

	});
	/*
	$(".agg .choice-chk .subCls").change(function() { // 선택 동의
		
		if( $(this).is(":checked") ) {
			$(this).parents(".choice-chk").find(".subClsS").prop("checked", true);
			$(this).parents(".choice-chk").find(".subCls").prop("checked", true);
			$(this).parents(".choice-chk").next(".agg_btn").find(".subClsNY").prop("checked",true);
		}else{
			$(this).parents(".choice-chk").find(".subClsS").prop("checked", false);
			$(this).parents(".choice-chk").find(".subCls").prop("checked", false);
			$(this).parents(".choice-chk").next(".agg_btn").find(".subClsNN").prop("checked",true);
		}

		allbuttonControl()

	});*/
	
	//0901
	$(".agg .choice-chk .subClsT").change(function() { // 선택 동의
		
		if( $(this).is(":checked") ) {
			$(this).parents(".choice-chk").find(".subClsS").prop("checked", true);
			$(this).parents(".choice-chk").find(".subClsT").prop("checked", true);
			$(this).parents(".choice-chk").next(".agg_btn").find(".subClsNY").prop("checked",true);
		}else{
			$(this).parents(".choice-chk").find(".subClsS").prop("checked", false);
			$(this).parents(".choice-chk").find(".subClsT").prop("checked", false);
			$(this).parents(".choice-chk").next(".agg_btn").find(".subClsNN").prop("checked",true);
		}

	//	allbuttonControl()

	});

	$(".agg .choice-chk .subClsS").change(function() { // 선택 선택 동의

		if( $(this).parents(".choice-chk").find(".subClsS:checked").length >= 1 ) { // 체크선택이 1이상이면 동의함 활성화, 이하면 동의하지 않음 활성화
			$(this).parents(".choice-chk").find(".subCls").prop("checked", true);
			$(this).parents(".choice-chk").next(".agg_btn").find(".subClsNY").prop("checked",true);
		}else{
			$(this).parents(".choice-chk").find(".subCls").prop("checked", false);
			$(this).parents(".choice-chk").next(".agg_btn").find(".subClsNN").prop("checked",true);
		}

	});
	
	
	
	//0901선택약전체동의
	$(".is-allselect .subClsT").change(function() { // 선택 선택 동의
		var  checkBOX01 = $(this).parents('.is-allselect').find(".subClsT").length; // 동의함
		var checkBOXChekc01 = $(this).parents('.is-allselect').find(".subClsT:checked").length; // 동의함 체크		
		if( checkBOXChekc01 == 5 ) { // 체크선택이 1이상이면 동의함 활성화, 이하면 동의하지 않음 활성화
			$('#all_check02').prop("checked",true);
		}else{
			$('#all_check02').prop("checked",false);
		}
	});
	

	

	$(".subClsY").change(function() { // 동의함 버튼 위치 기준 상위 li 하위 ul 하위 li .subCls 찾아서 체크
		$(this).parents("li").children().children("li").find(".subCls").prop("checked",true);
		allbuttonControl()
	});

	$(".subClsN").change(function() { // 동의하지 않음 클릭 시 버튼 위치 기준 상위 li 하위 ul 하위 li .subCls 찾아서 체크 해제
		$(this).parents("li").children().children("li").find(".subCls").prop("checked",false);
		allbuttonControl()
	});

	$(".subClsNY").change(function() { // 동의함 버튼 위치 기준 상위 li 하위 ul 하위 li .subCls 찾아서 체크
		$(this).parents("li").children().children("li").find(".subCls").prop("checked",true);
		$(this).parents("li").children().children("li").find(".subClsS").prop("checked",true);
		allbuttonControl()
	});

	$(".subClsNN").change(function() { // 동의하지 않음 클릭 시 버튼 위치 기준 상위 li 하위 ul 하위 li .subCls 찾아서 체크 해제
		$(this).parents("li").children().children("li").find(".subCls").prop("checked",false);
		$(this).parents("li").children().children("li").find(".subClsS").prop("checked",false);
		allbuttonControl()
	});
	
	$(".sct-orderradio-ac").hide();

	$(".sct-orderradio input").change(function() { // 필수 동의
		
		var linkdepth = $(this).parents("ul").find('.sct-orderradio-bt');

		if( linkdepth.is(":checked") ) {
			 $(this).parents("ul").find(".sct-orderradio-ac").show();
		}else{
			 $(this).parents("ul").find(".sct-orderradio-ac").hide();
		}
	});

	$("#check10_1").click(function() { // 금소법
		$(".case001").show();
	});
	$("#check10_2").click(function() { // 금소법
		$(".case001").hide();
	});

	$("#check11_3").click(function() { // 금소법
		$(".case002").toggle();
	});
	
	/* 약정서, 전자서명 */
	/*
	$('#doc1000').hide(); // 가계대출상품설명서
	$('#doc1001').hide(); // 여신거래약정서
	$('#doc1002').hide(); // 추가약정서
	$('#doc2000').hide(); // 신용보증약정서(서민금융진흥원)
	$('#doc2001').hide(); // 햇살론 SB톡톡 여신거래약정서
	
	
	$('.call-doc>.agg_btn>span:last-child>input').click(function(){
		var openDOC = $(this).attr('data-tab');
		$("body").addClass("non-footer");
		$("h1").css("padding-left","15px");
		//$(".btn-prev").css("display","none");
		$('section').hide();
		$('#' + openDOC).show();
	});
	
	$('.close-doc').click(function(){
		$("body").removeClass("non-footer");
		$("h1").css("padding-left","0px");
		//$(".btn-prev").css("display","inline-block");
		$('section').hide();
		$('#baseSection').show();
	})
	
	
	$('.call-doc>.agg_btn>span:last-child>input').click(function(){
		var openDOC = $(this).attr('data-tab');
		$("body").addClass("non-footer");
		$('header').hide();
		$('section').hide();
		$('#' + openDOC).show();
	});
	
	$('.close-doc').click(function(){
		$("body").removeClass("non-footer");
		$('section').hide();
		$('#baseSection').show();
		$('header').show();
	})
	*/
});



function allbuttonControl() {

	var checkBOX = $(".subClsY").length; // 동의함
	var checkBOXChekc = $(".subClsY:checked").length; // 동의함 체크
	if( checkBOX == checkBOXChekc && checkBOX > 0 ) {
		$(".checkbox-allselect #all_check").prop("checked",true); 
	}else{
		$(".checkbox-allselect #all_check").prop("checked",false); 
	}
}



function incrsAmtT(plusVal){
	
	var resultVal = 0;
	
	if ( !isEmpty(plusVal) ) {
		if ( plusVal == 0 ) { 
			resultVal = plusVal;
		} else {
			var inputVal  = setUncomma($(".transAmt").val());   // 현재입력값	
			resultVal = setComma(parseInt(inputVal) + plusVal); // 현재입력값+증가값
		}
	} 
	$(".transAmt").val(resultVal);	// 결과값 화면세팅 
	
	// 에러텍스트 
	if ( resultVal == 0 ) {
		$(".transAmt").parent("div").addClass("errtxt");
	} else {
		$(".transAmt").parent("div").removeClass("errtxt");
	}
	  
}



/* 개인정보 통합 약관 */
function totalagreeOn(agreeNo) { // 모달창 호출
	$(".popup-layout").hide();
	$(".popup-layout-full").hide();
	$(".scr-totalagree-"+agreeNo).show();
};


$(document).ready(function() {

	$(".agree-Wrap input").attr("disabled", true);

	$(".case-agree .img-detail").click(function() {
		$(this).parents("dd").find(".agree-Wrap:nth-child(1)").hide();
		$(this).parents("dd").find(".agree-Wrap:nth-child(2)").show();
	});

	$(".case-agree .img-normal").click(function() {
		$(this).parents("dd").find(".agree-Wrap:nth-child(1)").show();
		$(this).parents("dd").find(".agree-Wrap:nth-child(2)").hide();
	});
});

/* 필수 약관 미 동의 시 포커스 이동 S
function agreechkfocus() {
	var agreechkY = $('.subClsY').length;
	var agreechkYY = $('.subClsY:checked').length;
	
	if( agreechkY == agreechkYY ) {
		alert('pass');
	}else{
		$('.agg>li').removeAttr('id');
		$('.subClsN:checked').eq(0).parents('li').attr('id','scrollTop');
		location.href='#scrollTop';
	}
};
 필수 약관 미 동의 시 포커스 이동 E */