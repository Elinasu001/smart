/*
* DM ���� üũ
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
	* ������ Yüũ�� üũ Y*/
 	
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
	* ������ N üũ�� üũ N*/
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
	* ������ ��üüũ�� ������ üũ
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

	
	
	$(".as-hidden01").click(function(){ // �������û-�������Է� ���� ����
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

		
	$(".as-link-text p").click(function(){ // �˷� �˾� �ؽ�Ʈ > ��ǲ ���� [�ڱ�м�ǥ ��� �Ű� �˷�]
		var linkText = $(this).text();
		$(".as-link-text input").val(linkText);
	});
	
	$(".as-link-text p").click(function(){ // ���� üũ �� > ��ǲ ���� [�ڱ�м�ǥ ��� �Ű� �˷�]
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
* 3�ڸ��� ,
*/
function setComma(str)
{
	str = String(str);
	return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

/*
* 4�ڸ��� ,
*/
function setCommaFour(str) {
    return str.toString().replace(/\B(?=(\d{4})+(?!\d))/g, ",");
}

/*
* , ����
*/
function setUncomma(str)
{
	return str.replace(/[^\d]+/g,'');
}
/*
* ���ڸ� �Է�
*/
function setNum(obj)
{
	obj.value = setUncomma(obj.value);
}

/*
* 3�ڸ��� �޸�
*/
function setCommaNum(obj)
{
	obj.value = setComma(setUncomma(obj.value));
}

/*
* 4�ڸ��� �޸�
*/
function setCommaNumFour(obj)
{
	obj.value = setCommaFour(setUncomma(obj.value));
}
// 2020.02.24 �߰� //


/*
* �����ü���� üũ �Լ� | ������ : termsY / ���Ǿ��� : termsN | argID : ��ü���� üũ�ڽ� ���̵�
*/
function termsAndAgree(argID){
	var agreeLength		= $(".termsY").length;
	var agreeChkLength	= $(".termsY:checked").length;
	
	/* üũ�� ���� ����  */
	var chkInfo="";

	chkInfo += "agreeLength - ��� ������ �� ����  : [ "+agreeLength+" ]\n";
	chkInfo += "agreeChkLength - ��� ������ üũ�� �� ���� : [ "+agreeChkLength+" ]\n";

	//alert(chkInfo);
	/* üũ�� ���� ����  */

	if(agreeLength==agreeChkLength && agreeChkLength !=0){
		$('#'+argID).prop("checked",true); 
	}else{
		$('#'+argID).prop("checked",false); 
	}
	
}

/*
* selectbox ���� | argSEQ : selectbox Ŭ���� | argCls : show,hide ������ Ŭ����
*/
function selControll(argSEQ,argCls){
	if($("."+argSEQ+" option:last").prop("selected")==true){
		$("."+argCls).show();
	}else{
		$("."+argCls).hide();
	}
}

/*
* radio button ���� | argY : ������ư Ŭ���� ���õǸ� argSh�� ������ | argN :������ư Ŭ���� ���õǸ� argSh�� ���� | argSh : show, hide ������ Ŭ����
*/
function receiveCnt(argY,argN,argSh){
	if($("."+argY).is(":checked")){
		$("."+argSh).show();
	}else if($("."+argN).is(":checked")){
		$("."+argSh).hide();
	}					
}

/*
* üũ�ڽ� ������ưó�� ���
*/
function fnceInfoVe(obj,argNr,argVe,argInfo){
	if ($(obj).prop('checked')){
		//checkbox ��ü�� checked ������ click�� ��Ҹ� true����
		$("."+argNr).prop('checked', false);
		$("."+argVe).prop('checked', false);
		$(obj).prop('checked', true);
		
		fnceInfo(argNr,argInfo);
	}else{
		$("."+argInfo).hide();
	}
}

/*
* �������� ��� �ȳ� show,hide
*/
function fnceInfo(argNmr,argInfo){
	if ($("."+argNmr).prop('checked')) {
		$("."+argInfo).hide();
	}else{
		$("."+argInfo).show();
	}
}

/*
* üũ�ڽ�,������ư üũ���� 
*/
function trnfLmt(argReSet){
	$("."+argReSet).removeAttr('checked');
}

/*
* Ŭ�������� �Լ� | argCls : ����Ŭ���� | remvCls : ������ Ŭ����
*/
function remvClass(argCls,remvCls){
	$("."+argCls).removeClass(remvCls);
}

/*
* Ŭ�����߰� �Լ� | argCls : ����Ŭ���� | remvCls : ������ Ŭ����
*/
function addClass(argCls,addCls){
	$("."+argCls).addClass(addCls);
}



/************************************** // ����Ͼ۰�ȭ 2�� ************************/



/*���ó�¥ 0000-00-00. ���Ĺ�ȯ*/


		function fnGetTodayType(){
		  var date = new Date();
		  return date.getFullYear() + "-" + ("0"+(date.getMonth()+1)).slice(-2) + "-" + ("0"+date.getDate()).slice(-2);
		};

		/* argDD ���� ��¥ */
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
		
		/* argMM ���� ��¥ */
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
        	$('ul.agg li span.btn a').text("����");
			//��������˾�
			$('ul.agg li span.btn a').click(function(){
				var tab_id = $(this).attr('data-tab');
				$('.agg_pop').removeClass('on');
				$(this).addClass('on');
				$("#"+tab_id).addClass('on');
				$("#"+tab_id).show();
				
				var lootPoint = $(this).parent().parent().next(); // P class="agg_btn" ���� üũ �ڽ� Ȱ��ȭ
				
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
				alert("�������222");
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
			
			
			
		
			
			
			/* 2020.09.08 ���ǽ� ������̱� */
			$('.termsY').change(function(){
				if($(this).is(":checked")){
					var tab_id = $(this).parents().parents().parents("li").find("a").attr('data-tab');
					$('#'+tab_id).addClass('on');
					$('#'+tab_id).show();
				}
				
			});
			
			/* 2020.09.08 ����������� �ݱ� */
			$('.btn-close_').click(function(){
				var tab_id = $(this).attr('data-tab');
				$('#'+tab_id).removeClass('on');
				$('#'+tab_id).hide();
				
				/* 2020.10.07 XŬ���� �������� ���� ó�� START */
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
				/* 2020.10.07 XŬ���� �������� ���� ó�� END*/
			});
			
			/* 2020.09.08 �˾� ���ǽ� ���������� üũ*/
			$('.pop_btn_').click(function(){
				var tab_id = $(this).attr('data-tab');
				// alert("tab_id : "+tab_id);
				$('#'+tab_id).removeClass('on');
				$('#'+tab_id).hide();
				
				if(tab_id=="agg_2"){
					$('.c_agree2').prop("checked",true); /* LIM2001_1.jsp ������ ����*/		
				}
				
				if(tab_id=="agg_24"){
					$('.c_agree2').prop("checked",true); /* LIM2003_2.jsp ������ ����*/		
				}
				
				if($('.argee').hasClass('telYn')){ /* DEP0006_2.view ���� ��� */
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
			* ��ü���� Y,N üũ
			*/
			$('.argee').click(function(){
				termsAndAgree("all_check");					
			});
				
			
			//20.09.21 ��������� ����Ȯ�μ�
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


			// ��Ÿ��, CMS ��ݿ��� chek
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

			// Ÿ����ݿ��� chec
			/*$("#dep02_chk1").change(function(){
				if($("#dep02_chk1").is(":checked")){
					$(".account_name").addClass('on')
				}else{
					$(".account_name").removeClass('on')
				}
			});*/

			// ���־��°��µ�� chec
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

			//��¥
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

			//�Ա����� ��
		

		/* �ֱ�, ������, ���־��� �˾� ���ý� �ڵ� �Է� �ֱ��Աݿ��� ������� ���� */
		$('.actInfo').click(function(){
			var bankNm = $(this).children( 'dt' ).text();
			var bankNum = $(this).children( 'dd' ).text();
			var custNm = $(this).children( 'dd' ).children( 'span' ).text();
			bankNum = bankNum.replace(custNm,"");
			
			/* �ڵ���ü�� Ÿ����� üũ������ �߰�  start */
			if($('.otherBankInput').is(":checked")){
				fnBankValNull();
				$('.otherBankNm').val(bankNm);
				$('.otherBankNum').val(bankNum);
			}else{
				fnBankValNull();
				$('.bankNm').val(bankNm);
				$('.bankNum').val(bankNum);
			}
			/* �ڵ���ü�� Ÿ����� üũ������ �߰� end */
			
			$('.alert_pop').hide();
			$('.alert_pop > div').hide();
		});

			/* ��ݰ��¼��ý� �ڵ��Է� */
			$('.actInfo_').click(function(){
				var bankNum = $(this).children( 'p:eq(1)' ).text();
				
				$('.withdrawNum').text(bankNum);
				
				/* �ڵ���ü�� Ÿ����� üũ������ �߰�  start */
				if($('.otherBankInput').is(":checked")){	
					$('.inputBankNum').val(bankNum);
				}else{
					$('.withdrawNum').text(bankNum);
				}
				/* �ڵ���ü�� Ÿ����� üũ������ �߰� end */

				$('.alert_pop').hide();
				$('.alert_pop > div').hide();
			});

			//��ǲ�Է½�border-bottomȿ��
			$('ul.li_input li').click(function(){
				$('ul.li_input li').removeClass('on');
				$(this).addClass('on');
				$(this).removeClass('error');
			});

				//��ݰ��¼��ý� �˾�
			$('.top_blue_box>div.rink').click(function(){
				$('.alert_pop').show();
				$('.account').show();			
			});

			//�Աݰ��¼��ý� �˾�����
			$('.deposit_select').click(function(){
				$('.alert_pop').show();
				$('.account').show();			
			});
			

			//�Ա����� ����
			$('.banking_btn').click(function(){
				fnBanking_btn()
				
			});   

			/* �Ա����༱�ý� �ڵ��Է� */
			$('.bnkStokNm').click(function(){
				var bankNm = $(this).text();
				var DEP2019 = $('.DEP2019_1').val();
				
				/* �ڵ���ü�� Ÿ����� üũ������ �߰�  start */
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
				/* �ڵ���ü�� Ÿ����� üũ������ �߰� end */
				

				$('.alert_pop').hide();
				$('.alert_pop > div').hide();
			});



			//�������༱�� �˾�
			$('.banking_btn').click(function(){
				$('.banking_list.alert').addClass('on');
				
			});
		
			$('.banking_list .pop_btn2').click(function(){
				$('.banking_list.alert').removeClass('on');
			});




			//�˷� �ݱ�
			$('.alert_pop .confirm_box p.btn a').click(function(){
					$('.alert_pop').hide();
					$('.alert_pop > div').hide();
			});

			//�˷� �ݱ�
			$('.alert_pop .alert_box p.btn a').click(function(){
					$('.alert_pop').hide();
					$('.alert_pop > div').hide();
			});
			
			//�޼����˷� �ݱ�
			$('.message_pop .confirm_box p.btn a').click(function(){
					$('.message_pop').hide();
					$('.message_pop > div').hide();
			});

			//�޼����˷� �ݱ�
			$('.message_pop .alert_box p.btn a').click(function(){
					$('.message_pop').hide();
					$('.message_pop > div').hide();
			});

			//�߰����� �˷� �ݱ�
			$('.certification_alert .alert_pop2 p.btn a').click(function(){
				$('.alert_pop2').hide();
			});
			
			//���̽��ǻ� �������� �˾�
			$('.damage_btn').click(function(){
				$('.alert_pop').show();
				$('.damage_pop').show();
				
			});
/*
			//���̽��ǻ� ���Ű� �˾���ư
			$('.report_btn').click(function(){

				
			});

*/			//�ڵ���ü �̵�� �˾���ư
			$('.withdrawal_btn').click(function(){
				$('.detail_lay').show();			
			});

			$('a.pop_btn').click(function(){
				$('.detail_lay').hide();			
			});
			
			//����������-���Ի󼼳��� �˾��ݱ��ư
			$('a.pop_btn').click(function(){
				$('.detail_layup').hide();			
			});

			//�󼼺��� �˾�
			$('.notice_box>a').on('click', function(){
				$('.pop_view1').show();
			});	

			//�󼼺��� �ݱ� �˾�
			$('a.pop_btn').click(function(){
				$('.pop_lay').removeClass('on');
				
			});
			
			/***�߰����� �˾���ũ��Ʈ***/
			/****$('.certification_lay ul.tab li').click(function(){

				var tab_id = $(this).attr('data-tab');

				$('.certification_lay ul.tab li').removeClass('on');
				$('.certification_cont').hide();

				$(this).addClass('on');
				$("."+tab_id).show();
			});***/

		

			//��ȸ��ư Ŭ���� ��ü������ȸ
			/*$('.btn_t_history').click(function(){
				$('.deal_history').addClass('on');
				
			});*/

				//�ڵ���ü�����ȸ ����,Ÿ�� tab 
			$(".signup>li").click(function(){							
			var tab_id = $(this).attr("data-tab");

			$(".signup li").removeClass("current");
			$(".signup li").removeClass("on");
			$(".tab-content").removeClass("current");		

			$(this).addClass("current");	
			$(this).addClass("on");
			$("." + tab_id).addClass("current");
			});
			
			//�Աݵ��� tab���ý� borderȿ��
			/*$('ul.tab_menu li').click(function(){
				$('ul.tab_menu li').removeClass('on');
				$(this).addClass('on');
				
			});*/

			//�Ա����� ��
			$('.alert_tab > li').click(function(){
				$('.alert_pop').show();
				$('.account_alert').show();

				var tab_id = $(this).attr('data-tab');

				$('.alert_tab > li').removeClass('on');
				$('.alert_tab_cont').removeClass('on');

				$(this).addClass('on');
				$("."+tab_id).addClass('on');
			});

			//�ֱ� �Ա�
			$('li.account_alert1').click(function(){
				$('.account_alert1').addClass('on');
				

			});
			//���־���
			$('li.account_alert2').click(function(){
				$('.account_alert2').addClass('on');

			});

			//������
			$('li.account_alert3').click(function(){
				$('.account_alert3').addClass('on');

			});

			//�Ա�����
			$('li.account_alert4').click(function(){
				$('.account_alert4').addClass('on');

			});

			//����
			$('li.account_alert5').click(function(){
				$('.account_alert5').addClass('on');

			});

			//����
			$('li.account_alert6').click(function(){
				$('.account_alert6').addClass('on');

			});



			/* ��ü�� �ſ� ���Ͻ� �Է���ü�� NULLó��*/
			$('.receiveEmY').click(function(){
				if($(this).is(":checked")){
					$('.tranDay').val("");
				}
			});

			//��ǥ���ý� �˾�
			$('.cheque').click(function(){
				$('.alert_pop').show();
				$('.account2').show();			
			});

			//ī�弱�ý� �˾�
			$('.cheque2').click(function(){
				$('.alert_pop').show();
				$('.account3').show();			
			});

			// ��ǥ�W�����౸�� ���� Ÿ��


			//��ǥ���ý� �˾�
			$('.chequeBank').click(function(){
				var seq = $('.chequeBank:checked').index( '.chequeBank' );  // üũ�� ������ư�� index
				if (seq==0)	// �����̶�� 
				{
					$('.anotherline_bank').removeClass('on'); // ��ǥ���� �����
					$('.nowbank').show();  // ?? �̰� ���� ???
					$('.ourCheque').show();  // ���࿡������ȼ�ǥ�� �����ϼ��� show 
				}
				else
				{
					$('.anotherline_bank').addClass('on');	// ��ǥ���� �����
					$('.nowbank').hide();	// ?? �̰� ���� ???
					$('.ourCheque').hide();  // ���࿡������ȼ�ǥ�� �����ϼ��� show 
				}
			});

			//��ǥ����, ��ǥ��ȣ ���ý� input 
			$('.actInfo_cheque').click(function(){
				
				/*
				var seq = $('.chequeBank:checked').index( '.chequeBank' );  // üũ�� ������ư�� index
				var chequeNumDvn = $(this).children( 'p:eq(0)' ).text();
				alert("chequeNumDvn : "+chequeNumDvn);
				alert("bb");
				if (seq==0)	// �����̶�� 
				{
					$('.ourChequeNum').val('on'); // ��ǥ���� �����
					$('.nowbank').show();  // ?? �̰� ���� ???
					$('.ourCheque').show();  // ���࿡������ȼ�ǥ�� �����ϼ��� show 
				}
				else
				{
					$('.anotherline_bank').addClass('on');	// ��ǥ���� �����
					$('.nowbank').hide();	// ?? �̰� ���� ???
					$('.ourCheque').hide();  // ���࿡������ȼ�ǥ�� �����ϼ��� show 
				}

				var seq = $('.chequeBank:checked').index( '.chequeBank' );  // üũ�� ������ư�� index
				alert("seq : ");

				if (seq==0)	// �����̶�� 
				{
					$('.anotherline_bank').removeClass('on'); // ��ǥ���� �����
					$('.nowbank').show();  // ?? �̰� ���� ???
					$('.ourCheque').show();  // ���࿡������ȼ�ǥ�� �����ϼ��� show 
				}
				else
				{
					$('.anotherline_bank').addClass('on');	// ��ǥ���� �����
					$('.nowbank').hide();	// ?? �̰� ���� ???
					$('.ourCheque').hide();  // ���࿡������ȼ�ǥ�� �����ϼ��� show 
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


			/* DEP2007.jsp ���� �����ȣ, Ÿ�� ��ǥ���� input*/
			$('.actInfo_cheque').click(function(){
				var seq = $('.chequeBank:checked').index( '.chequeBank' );  // üũ�� ������ư�� index
				var chequeNumDvn = $(this).children( 'p:eq(0)' ).text();	// Ŭ���� ��ǥ��ȣ, ��ǥ���� 

				if (seq==0)	// �����̶�� 
				{
					$('.otherChequeDvn').val("");	// ��ǥ���� �Է� null ó��
					$('.ourChequeNum').val(chequeNumDvn); // ���࿡�� ������ ��ǥ��ȣ �Է�
				}
				else	// Ÿ���̶��
				{
					$('.ourChequeNum').val(""); // ���࿡�� ������ ��ǥ��ȣ �Է� null ó��
					$('.otherChequeDvn').val(chequeNumDvn);	// Ÿ���� ���  ��ǥ���� �Է�
				}
				$('.alert_pop').hide();		// �˾��ݱ�
				$('.account2').hide();		// �˾��ݱ�
			});

			 /* DEP2009.jsp ī���ȣ input */
			$('.actInfo_card').click(function(){
				var cardCompNm		= $(this).children( 'p:eq(0)' ).text();	// ī����
				var cardNum			= $(this).children( 'p:eq(1)' ).text();	// ī���ȣ
				//alert("cardCompNm : "+cardCompNm+"\ncardNum : "+cardNum);
				$('.card_Num').val(cardNum);
				$('.alert_pop').hide();
				$('.account3').hide();		
				/*
					
				*/
			});
			 //�Ű��� �Ű����ֹι�ȣ ��ǥ��ȣ
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


	

		//����ü �߰���ü ��ư Ŭ����  �ݱ�
		/*$('.now_transfer .round_btn a.bg_blue').click(function(){
				$('.alert_pop').hide();
				$('.alert_pop > div').hide();
		});*/

		//�����ü ���̽��ǽ̾ȳ� �˾�
/*		$('.now_transfer .damage_btn').click(function(){
			$('.damage_pop').show();
			$('.now_transfer').hide();	
		});
*/
		//���̽��ǻ� ���Ű� �˾���ư
		$('.now_transfer .report_btn').click(function(){
			$('.alert_pop').show();
			$('.report_pop').show();
			
		});

		//��ü���� �˷� �ݱ� ��ư
		$('.now_transfer a.page_close').click(function(){
			$('.alert_pop').hide();
			$('.now_transfer').hide();
		});

	/**������**/
		$('.cfn_tab > span.radio').click(function(){

			var tab_id = $(this).attr('data-tab');

			$('.cfn_tab > span.radio').removeClass('on');
			$('.cfn_cont').hide();

			$(this).addClass('on');
			$("."+tab_id).show();
		});

		
		//�������� üũ
		$("#all_check_i").change(function(){ 
			$('.argee_i').prop("checked",$(this).prop("checked")); 
			}); /*Handler For rest of the checkbox*/ 
			$('.argee_i').change(function(){ 
				if( $('.argee_i').length==$('.argee_i:checked').length){ $("#all_check_i").prop("checked",true); } 
				else{ $("#all_check_i").prop("checked",false); } 
		}); 

		//DEP2018_3 �󼼳������� �˾�
		$('.detail_info').on('click', function(){
			$('.pop_view1').show();
		});	

			//DEP2022 ���Ի󼼳��� �˾�
		$('.DEP22').on('click', function(){
			$('.pop_view1').show();
		});



		$('.DEP23').on('click', function(){
			$('.pop23').show();
		});	
});
/* document.ready - END */
        
	/*�ڵ���ü���� ���� �����, ���¹�ȣ null ó�� */
	function fnBankValNull(){
		$(".bankNm").val("");
		$(".bankNum").val("");
		$(".otherBankNm").val("");
		$(".otherBankNum").val("");
	}
	
	/* ���º�Ī �Է�â show */
	function fnAddActShow(){		
		$(".alert_pop").show();
		$(".actSet").show();
		$(".account_name").show();
	}

	/* ���º�Ī �Է�â hide */
	function fnAddActHide(){
		$(".alert_pop").hide();
		$(".actSet").hide();
		$(".account_name").hide();
	}

	/* ���µ�� �˸�â show */
	function fnActSetShow(){
		$(".alert_pop").show();
		$(".name_pop").show();
		/*$(".actTxt").text("���־��°��°� ��ϵǾ����ϴ�.");*/
	}

	/* ���µ�� �˸�â hide */
	function fnActSethide(){
		$(".alert_pop").hide();
		$(".name_pop").hide();
	}
	
	/* ���º�Ī Null ó�� */
	function fnSetNull(){
		$(".actVal").val("");
		/*$(".actTxt").text("���־��� ���µ��");  */  
		$(".contrNm").val("");  // ������Ī
		$(".chk_name").prop("checked",false); /*20201022 ���µ�Ͼ˸�â ��ҹ�ưŬ���� üũ����*/
	}


	/* ���� ���� �˾� */
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
	* �Է°� �ڵ����� - argMony: ������ | argHando : ������ �Էµɰ��� Ŭ���� 
	*/
	function fnPlusMony(argMony,argHando,argTrnf){
		var maxMony = $(".maxMoney").text();
		maxMony = maxMony.replace("�ܾ�","");
		maxMony = maxMony.replace("��","");
		maxMony = setUncomma(maxMony);
		
		var handoMony = $("."+argHando).val() // �����Է°�
		handoMony = setUncomma(handoMony);
		
		var plusMony = parseInt(handoMony) + argMony;

		if(plusMony > parseInt(maxMony)){
			plusMony = 0;
			messageErrorView("��ü�ݾ��� �ܾ��� �ʰ��� �� �����ϴ�.");
		}
		$("."+argHando).val(setComma(plusMony));    //    
	}

	/*
	* ���׼۱�
	*/
	function fnAllMony(argMony,argHando,argTrnf){
		var maxMony = $(".maxMoney").text();
		maxMony = maxMony.replace("�ܾ�","");
		maxMony = maxMony.replace("��","");
		maxMony = setUncomma(maxMony);
		
		$("."+argHando).val(setComma(maxMony));
	}

/* ����Ʈ �������� */

	function alertOn(alertNo) { // �˷�â ȣ��
		$(".popup-layout").hide();
		$(".popup-layout-full").hide();
		
		//2022-09-21 ��������� ��ǥ��
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
						messageErrorView("���� ó�� �� ������ �߻��Ͽ����ϴ�.");
			},true);
		}else{
			$("body").addClass("body-lock");
			$("html").css("overflow","hidden");
			$(".scr-alert-"+alertNo).show();
		}
	};

	function modalOn(modalNo) { // ���â ȣ��
		$(".popup-layout").hide();
		$(".popup-layout-full").hide();
		$(".scr-modal-"+modalNo).show();
	};

	function alertOff() { // �˷�â �ݱ�
		$(".popup-layout").hide();
		$(".popup-layout-full").hide();
		$("body").removeClass("body-lock");
		$("html").css("overflow","auto");
	};

	function modalOff(confinYn) { // ���â �ݱ�
		if(confinYn==true){
			confirmView('<br>����� �����Ͻðڽ��ϱ�?<br><br>', function(){
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
	
	/* ���ã�� ��� ���� S */
	function markinOn() {
		$(".bankmark").addClass("ok");
	}

	function markinOff() {
		$(".bankmark").removeClass("ok");
	}
	/* ���ã�� ��� ���� E */
	

$(document).ready(function(){
	
	$(".ST-Accordion .ST-Ac-Button").click(function(){ // ���ڵ��
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
	
	$('.tab-layout>ul>li').click(function(){ // �� �׼�
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
	
	$(".button-if").click(function(){ // ��� ��ü Ÿ����ݿ���
		if($("#hiddenBox").is(":checked")==true) {
			$(".hidden-area").css("display","block")
			$(".hidden-area02").hide();
		}else{
			$(".hidden-area02").show();
			$(".hidden-area").css("display","none")
		}
	});
	
	$('ul.add_tab li').click(function(){ // �ּ� �˻� ��
		var tab_id = $(this).attr('data-tab');
		$('ul.add_tab li').removeClass('bg_blue');
		$(this).addClass('bg_blue');
		$('.add_list').removeClass('on');
		$("#"+tab_id).addClass('on');
	});
	
	$(".Depth-02").hide(); // ���� ��

	$('.tab_menu04 li').click(function(){
		var tab_id = $(this).attr('data-tab');
		$('.tab_menu04 li').removeClass('on');
		var tab_class = $(this).attr("class");
		$("."+tab_class).addClass("on");
		$('.linktab-layout .linktab-con>div').hide();
		$('.'+tab_id).show();
		$('.linktab-layout>ul>.'+tab_id).addClass('on');
	});
	
	$(".ac-radioTab input").click(function(){ // ���� ��
		if($(".ac-radioTab li:first-child>input").is(":checked")==true) {
			$(".ac-radioContent:nth-child(1)").css("display","block")
			$(".ac-radioContent:nth-child(2)").hide();
		}else{
			$(".ac-radioContent:nth-child(1)").show();
			$(".ac-radioContent:nth-child(2)").css("display","none")
		}
	});
	
	$(".accoBtn").click(function(){ //���ֹ������� ���ڵ��
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
	
////<span><em>[����]</em> ����(�ſ�)���� ���� �� �̿� ���Ǽ� (���� �����ŷ�)</span>
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
	
	/*  2022.09.20 �ּ�ó�� 
	$(".all #all_check,.all02 #all_check").click(function() { // ��� ��ü ���� Ŭ�� �� ��� ��� ���� �ֱ�
		agreeAllView();
		$(".check-ipt").prop("checked",true);
	});
	*/
});

function  depthOn() {
	$(".Depth-02").show();
}

function imgPP(n){ // �̹��� �����̳� ũ�� n ��ŭ Ȯ�� -> �̹��� ���� 100%
	var asd = $(".agree-img").width();
	$(".agree-img").animate({ width : asd * n + "px" }, 500);
}
function imgMM(n){ // �̹��� �����̳� ũ�� n ��ŭ Ȯ�� -> �̹��� ���� 100%
	var asd = $(".agree-img").width(); 
	if ($(".agree-img").width() <= 468 )
	{
		$(".agree-img").animate({ width : 100 + "%" }, 500);
	}else{
		$(".agree-img").animate({ width : asd * n + "px" }, 500);
	}
}

function agreeView() { // ��� �� -> data-tab �̹��� ���ϸ� ����
	var tab_id = $(this).attr('data-tab');
	$(".scr-modal-agreeImg").show();
	$(".scr-modal-agreeImg .agree-img>img").remove();
	$(".agree-img").css("width","100%");
	$(".agree-img").append("<img src='../../WEB/images/K_cert/" + tab_id + ".png' />");
}

function agreeAllView() { // ��� �� -> �̹��� ���� -> btn a data ���� -> �̹��� �߰�
	$(".scr-modal-agreeImg").show();
	$(".scr-modal-agreeImg .agree-img>img").remove();

	$(".btn a,.agree_chk02 a").each(function(index, item) {
		var agreeimg = $(item).attr("data-tab");
		$(".agree-img").append("<img src='../../WEB/images/K_cert/" + agreeimg + ".png' />");
	});
}


///////////////////////////////////////////

$(document).ready(function(){
	
	$(".checkbox-allselect .all_check").change(function() { // ��ü ���� | ����
		
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
		$(".checkbox-allselect .all_check02").change(function() { // ��ü ���� | ����
			if( $(".checkbox-allselect .all_check02").is(":checked") ) {
				$(this).parents().next(".agg").find(".subClsT").prop("checked", true);
		
				$(this).parents().next(".agg").find(".subClsS").prop("checked", true);
			}else{
				$(this).parents().next(".agg").find(".subClsT").prop("checked", false);
				
				$(this).parents().next(".agg").find(".subClsS").prop("checked", false);
			}
		});

	
	$(".agg .meta-chk .subCls").change(function() { // �ʼ� ����
		
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
	$(".agg .choice-chk .subCls").change(function() { // ���� ����
		
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
	$(".agg .choice-chk .subClsT").change(function() { // ���� ����
		
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

	$(".agg .choice-chk .subClsS").change(function() { // ���� ���� ����

		if( $(this).parents(".choice-chk").find(".subClsS:checked").length >= 1 ) { // üũ������ 1�̻��̸� ������ Ȱ��ȭ, ���ϸ� �������� ���� Ȱ��ȭ
			$(this).parents(".choice-chk").find(".subCls").prop("checked", true);
			$(this).parents(".choice-chk").next(".agg_btn").find(".subClsNY").prop("checked",true);
		}else{
			$(this).parents(".choice-chk").find(".subCls").prop("checked", false);
			$(this).parents(".choice-chk").next(".agg_btn").find(".subClsNN").prop("checked",true);
		}

	});
	
	
	
	//0901���þ���ü����
	$(".is-allselect .subClsT").change(function() { // ���� ���� ����
		var  checkBOX01 = $(this).parents('.is-allselect').find(".subClsT").length; // ������
		var checkBOXChekc01 = $(this).parents('.is-allselect').find(".subClsT:checked").length; // ������ üũ		
		if( checkBOXChekc01 == 5 ) { // üũ������ 1�̻��̸� ������ Ȱ��ȭ, ���ϸ� �������� ���� Ȱ��ȭ
			$('#all_check02').prop("checked",true);
		}else{
			$('#all_check02').prop("checked",false);
		}
	});
	

	

	$(".subClsY").change(function() { // ������ ��ư ��ġ ���� ���� li ���� ul ���� li .subCls ã�Ƽ� üũ
		$(this).parents("li").children().children("li").find(".subCls").prop("checked",true);
		allbuttonControl()
	});

	$(".subClsN").change(function() { // �������� ���� Ŭ�� �� ��ư ��ġ ���� ���� li ���� ul ���� li .subCls ã�Ƽ� üũ ����
		$(this).parents("li").children().children("li").find(".subCls").prop("checked",false);
		allbuttonControl()
	});

	$(".subClsNY").change(function() { // ������ ��ư ��ġ ���� ���� li ���� ul ���� li .subCls ã�Ƽ� üũ
		$(this).parents("li").children().children("li").find(".subCls").prop("checked",true);
		$(this).parents("li").children().children("li").find(".subClsS").prop("checked",true);
		allbuttonControl()
	});

	$(".subClsNN").change(function() { // �������� ���� Ŭ�� �� ��ư ��ġ ���� ���� li ���� ul ���� li .subCls ã�Ƽ� üũ ����
		$(this).parents("li").children().children("li").find(".subCls").prop("checked",false);
		$(this).parents("li").children().children("li").find(".subClsS").prop("checked",false);
		allbuttonControl()
	});
	
	$(".sct-orderradio-ac").hide();

	$(".sct-orderradio input").change(function() { // �ʼ� ����
		
		var linkdepth = $(this).parents("ul").find('.sct-orderradio-bt');

		if( linkdepth.is(":checked") ) {
			 $(this).parents("ul").find(".sct-orderradio-ac").show();
		}else{
			 $(this).parents("ul").find(".sct-orderradio-ac").hide();
		}
	});

	$("#check10_1").click(function() { // �ݼҹ�
		$(".case001").show();
	});
	$("#check10_2").click(function() { // �ݼҹ�
		$(".case001").hide();
	});

	$("#check11_3").click(function() { // �ݼҹ�
		$(".case002").toggle();
	});
	
	/* ������, ���ڼ��� */
	/*
	$('#doc1000').hide(); // ��������ǰ����
	$('#doc1001').hide(); // ���Űŷ�������
	$('#doc1002').hide(); // �߰�������
	$('#doc2000').hide(); // �ſ뺸��������(���α��������)
	$('#doc2001').hide(); // �޻�� SB���� ���Űŷ�������
	
	
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

	var checkBOX = $(".subClsY").length; // ������
	var checkBOXChekc = $(".subClsY:checked").length; // ������ üũ
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
			var inputVal  = setUncomma($(".transAmt").val());   // �����Է°�	
			resultVal = setComma(parseInt(inputVal) + plusVal); // �����Է°�+������
		}
	} 
	$(".transAmt").val(resultVal);	// ����� ȭ�鼼�� 
	
	// �����ؽ�Ʈ 
	if ( resultVal == 0 ) {
		$(".transAmt").parent("div").addClass("errtxt");
	} else {
		$(".transAmt").parent("div").removeClass("errtxt");
	}
	  
}



/* �������� ���� ��� */
function totalagreeOn(agreeNo) { // ���â ȣ��
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

/* �ʼ� ��� �� ���� �� ��Ŀ�� �̵� S
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
 �ʼ� ��� �� ���� �� ��Ŀ�� �̵� E */