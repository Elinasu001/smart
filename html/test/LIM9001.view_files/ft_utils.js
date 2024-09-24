/**
 * ft_utils.js
 */
/*
 * 유틸클래스 모음
 */
var Utils = function(){
	
	var _format = function(val, format) {
		if (typeof(val) == "undefiend") val = "";
		val = val + "";
		var retVal = "";
		var length = val.length;
		
		switch (format) {
		case "date":
			if(length == 8) {
				retVal = val.replace(/[^\d]/g, '').replace(/(\d{4})(\d{2})/,"$1-$2-");
			} else {
				retVal = val.replace(/[^\d]/g, '').replace(/(\d{4})(\d{2})/,"$1-$2");
			}
			break;
			
		case "date2":
			if(length == 8) {
				retVal = val.replace(/[^\d]/g, '').replace(/(\d{4})(\d{2})/,"$1.$2.");
			} else {
				retVal = val.replace(/[^\d]/g, '').replace(/(\d{4})(\d{2})/,"$1.$2");
			}
			break;			
			
		case "amt":
			val = val.replace(/,/gi,"");
			if (val == "") val = "0";
			retVal = Number(val)+"";
			retVal = retVal.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			break;
			
		case "cpno":
			if(length == 10) {
				retVal = val.replace(/[^\d]/g, '').replace(/(\d{3})(\d{3})/,"$1-$2-");
			} else {
				retVal = val.replace(/[^\d]/g, '').replace(/(\d{3})(\d{4})/,"$1-$2-");
			}
			break;
		
		case "acno":
			retVal = val.replace(/[^\d]/g, '').replace(/(\d{3})(\d{2})(\d{2})/,"$1-$2-$3-");
			break;
			
		case "time":
			retVal = val.replace(/[^\d]/g, '').replace(/(\d{2})(\d{2})(\d{2})/,"$1:$2:$3");
			break;
			
		case "manwon":
			var chkVal = Math.floor(val.replace(/,/g, '')/10000);
			retVal = chkVal+"".replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			break;		
		default:
			break;
		}
		return retVal;
	};
	
	var _codeValue = function(codeXd, codeGroup) {
		var retVal = "";
		$.each(MOBILE_BANING_CODE, function(k, v){
			if (k == codeGroup) {
				$.each(v, function(key, val){
					if (key == codeXd) {
						retVal = val;
					}
				});
			}
		});
		return retVal;
	};
	
	return {
		 format : _format
		,codeValue : _codeValue
	};
}();

var MOBILE_BANING_CODE = {
	"BKCD":{
		"050":"상호저축은행"
       ,"020":"우리은행"
       ,"004":"국민은행"
       ,"003":"기업은행"
       ,"011":"농협은행"
       ,"088":"신한은행"
       ,"081":"KEB하나은행"
       ,"027":"한국씨티은행"
       ,"023":"SC은행"
       ,"039":"경남은행"
       ,"034":"광주은행"
       ,"031":"대구은행"
       ,"055":"도이치"
       ,"032":"부산은행"
       ,"061":"BNPP"
       ,"067":"중국건설은행"    
       ,"064":"산림조합중앙회"
       ,"002":"산업은행"
       ,"045":"새마을금고"
       ,"089":"케이뱅크"
       ,"008":"수출입"
       ,"007":"수협"
       ,"048":"신협"
       ,"037":"전북은행"
       ,"071":"우체국"
       ,"035":"제주은행"
       ,"062":"중국공상은행"
       ,"090":"카카오뱅크"
       ,"060":"BOA"
       ,"054":"HSBC"
       ,"057":"JP모간"	
    	   
       ,"247":"NH투자증권"
	   ,"261":"교보증권"
	   ,"267":"대신증권"
	   ,"287":"메리츠증권"
	   ,"238":"미래에셋대우"
	   ,"240":"삼성증권"
	   ,"291":"신영증권"
	   ,"278":"신한금융투자"
	   ,"209":"유안타증권"
	   ,"280":"유진투자증권"
	   ,"265":"이베스트증권"
	   ,"292":"케이프투자증권"
	   ,"264":"키움증권"
	   ,"270":"하나금융투자"
	   ,"262":"하이투자증권"
	   ,"243":"한국투자증권"    
	   ,"269":"한화증권"
	   ,"263":"현대차증권"
	   ,"279":"DB증권"
	   ,"218":"KB증권"
	   ,"227":"KTB투자증권"
	   ,"266":"SK증권"
	   ,"224":"BNK투자증권"}
};


//****************************************************************************************************
//1. Description : 값 체크
//2. Parameters : Object
//3. Return Type : boolean
//****************************************************************************************************
function isEmpty(obj){
	try {
		if (typeof(obj) == 'undefined' || obj == "") {
			return true;
		} else {
			return false;
		}	
	} catch (e) {
		return true;
	}
}
function isNotEmpty(obj) {
	return isEmpty(obj) ? false : true;
}

function isEmptyObj(obj){
	try {
		if (typeof(obj) == 'object' && Object.keys(obj).length == 0) {
			return true;
		} else {
			return false;
		}	
	} catch (e) {
		return true;
	}
}

//금액 콤마(,) 처리
function inputNumberFormat(obj){
	if(uncomma(obj.value) == 0){
		obj.value = "";
		return ;
	}
	obj.value=comma(uncomma(obj.value));
}

//콤마찍기
function comma(str){
	
	return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
//콤마지우기
function uncomma(str){
	
	return str.replace(/[^\d]+/g,'');
}

//숫자 길이 체크
function maxLengthCheck(object){
	if(object.value.length>object.maxLength){
		object.value=object.value.slice(0,object.maxLength);
	}
}

// 숫자입력금액 한글금액으로 변환
function transNumAmtToKr(str) {
	
		
	var num = String(str);		
	var krNum = '';	
	var val = 0;
	var rem = 0;
	var krUnitArry = ["공", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
	var krUnitAmtArry = ["일", "십", "백", "천", "만", "십", "백", "천", "억"];
	
	for(var i=0; i<num.length; i ++) {
		var tmpKrNum = "";
		var unit = Math.pow(10, (num.length-1-i));
		
		rem = 0 == i ? Number(num) : rem;
		val = Math.floor(Number(rem) / Number(unit));
		rem = Number(rem) % Number(unit);
		
		if(val != 0) {				
			if("일" != krUnitAmtArry[num.length-1-i] ) {
				tmpKrNum = krUnitArry[val] + krUnitAmtArry[num.length-1-i];
			} else {
				tmpKrNum = krUnitArry[val];
			}
		} else {
			tmpKrNum = krUnitArry[val];
		}
		if(Number(unit) == 10000 && (!tmpKrNum.includes("만"))) {
			tmpKrNum += "만";
		}
		
		krNum += tmpKrNum;
	}
	krNum = krNum.replaceAll("공", "");
	
	return krNum;
	
}