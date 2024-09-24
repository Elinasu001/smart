/************************************** // 모바일앱고도화 2차 ************************/



        $(document).ready(function(){

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

			//보이스피싱 예방 사전 문진
			$('.voice-modal ul li button').click(function(){
				if($(this).parents().parents().children().eq(0).hasClass('active')){
					$(this).parents().parents().children().eq(0).removeClass('active');
					$(this).parents().parents().children().eq(1).addClass('active');
				}else{
					$(this).parents().parents().children().eq(0).addClass('active');
					$(this).parents().parents().children().eq(1).removeClass('active');
				}
			});
		});