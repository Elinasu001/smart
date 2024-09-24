$(function() {
	
	$("#actionForm").validate();
	
	$.extend( $.validator.messages, {
		 required: '<spring:message code="Validation.required"/>'
		,remote:  '<spring:message code="Validation.remote"/>'
		,email:  '<spring:message code="Validation.email"/>'
		,url:  '<spring:message code="Validation.url"/>'
		,date:  '<spring:message code="Validation.date"/>'
		,dateISO:  '<spring:message code="Validation.dateISO"/>'
		,number:  '<spring:message code="Validation.number"/>'
		,digits:  '<spring:message code="Validation.digits"/>'
		,creditcard:  '<spring:message code="Validation.creditcard"/>'
		,equalTo:  '<spring:message code="Validation.equalTo"/>'
		,extension:  '<spring:message code="Validation.extension"/>'
		,maxlength:  '<spring:message code="Validation.maxlength"/>'
		,minlength:  '<spring:message code="Validation.minlength"/>'
		,rangelength:  '<spring:message code="Validation.rangelength"/>'
		,range: '<spring:message code="Validation.range"/>'
		,max: '<spring:message code="Validation.max"/>'
		,min: '<spring:message code="Validation.min"/>'
		,kor: '<spring:message code="Validation.kor"/>'
	});

	$.validator.setDefaults({
		 onkeyup:false
		,onclick:false
		,onfocusout:false
		,showErrors:function(errorMap, errorList){
			if (this.numberOfInvalids()) {
				alert(errorList[0].message);
			}
		}
	}); 
});

// 정규식을 적용
$.validator.addMethod("regx", function(value, element, regexpr) {    
    return regexpr.test(value);
});

$.validator.addMethod("kor", function(value, element) {
	var regexpr = /^[ㄱ-ㅎ|가-힣]+$/;
    return regexpr.test(value);
});


// 한글, 영어를 체크하여 계산된 바이트 길이를 최소 길이와 비교
$.validator.addMethod('minbytelength', function (value, element, param) {
    var nMin = param;
    var nBytes = $.type(value) !== "string" ? 0 : value.getByteLength(); // 문자열의 Byte 길이를 반환(한글은 2byte이며 영숫자는 1byte)
    return this.optional(element) || (nBytes === 0 || nBytes >= nMin);
});

// 한글, 영어를 체크하여 계산된 바이트 길이를 최대 길이와 비교
$.validator.addMethod('maxbytelength', function (value, element, param) {
    var nMax = param;
    var nBytes = $.type(value) !== "string" ? 0 : value.getByteLength(); // 문자열의 Byte 길이를 반환(한글은 2byte이며 영숫자는 1byte)
    return this.optional(element) || (nBytes === 0 || nBytes <= nMax);
});

// 한글, 영어를 체크하여 계산된 바이트 길이를 최소 길이와 최대 길이 비교
$.validator.addMethod('bytelength', function (value, element, params) {
    var nMin = params.min;
    var nMax = params.max;
    var nBytes = $.type(value) !== "string" ? 0 : value.getByteLength(); // 문자열의 Byte 길이를 반환(한글은 2byte이며 영숫자는 1byte)
    return this.optional(element) || (nBytes === 0 || (nBytes >= nMin && nBytes <= nMax));
});



/*
	// Form값 유효성 체크
    //  - UserId : 9~50자 이메일 형식(regx:/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)
    //  - NickName : 한글 2~10자, 영숫자 4~20자 조합(4바이트 이상 20바이트 이하)
    //  - Password : 8~16자 영문, 숫자, 특수문자 조합
    //  - ConfirmPassword : 8~16자 영문, 숫자, 특수문자 조합(비밀번호 확인)

    $("#JoinForm").validate({
        onfocusout : function (element) {
            $(element).valid();
        },
        rules : {
            UserId : {required:true, minlength:9, maxlength:50, email:true},
            NickName : {required:true, minbytelength:4, maxbytelength:20, regx:/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\*]+$/},
            Password : {required:true, minlength:8, maxlength:16, regx:/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@@#$%^&+=]).*$/},
            ConfirmPassword : {required:true, equalTo:"#Password"}
        },
        messages : {
            UserId : {required:"아이디 필드가 필요합니다.", minlength:jQuery.validator.format("최소 {0}자 이상"), maxlength:jQuery.validator.format("최대 {0}자 이하"), email:"아이디 형식이 잘못되었습니다."},
            NickName : {required:"닉네임 필드가 필요합니다.", minbytelength:jQuery.validator.format("최소 {0}바이트 이상(한글 2자, 영숫자 4자)"), maxbytelength:jQuery.validator.format("최대 {0}바이트 이하(한글 10자, 영숫자 20자)"), regx:"닉네임 형식이 잘못되었습니다."},
            Password : {required:"비밀번호 필드가 필요합니다.", minlength:jQuery.validator.format("최소 {0}자 이상"), maxlength:jQuery.validator.format("최대 {0}자 이하"), regx:"비밀번호 형식이 잘못되었습니다."},
            ConfirmPassword : {required:"비밀번호 확인 필드가 필요합니다.", equalTo:"입력한 비밀번호가 서로 일치하지 않습니다."}
        }, 
        /*errorPlacement: function(error, element) {},*/
/*
        invalidHandler : function(form, validator) {
            var errors = validator.numberOfInvalids();
            if( errors ) 
            {
                $("h3 span.ok").html("(유효성 검사 실패)"); 
                alert(validator.errorList[0].message);
                validator.errorList[0].element.focus();
            }
        }, 
        submitHandler: function(form) {
            $("h3 span.ok").html("(유효성 검사 성공)"); 
        }
    });
});




*/


/*
remote 이용하여 id 중복 점검

rules: {
	 nickName: {	required: true	}
	,id: {
		required: true,
		remote: {
			url: "/ajaxValidId",
			type: "GET",
			data: {
				id: function() {
					return $("#id").val();
				}
			}
		}
	}
}

*/

/**
 * 
 */


/*
email
/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

url
/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i

date
!/Invalid|NaN/

dateISO 
/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/

number
/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/

digits
/^\d+$/

*/
