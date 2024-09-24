// ****************************************************************************************************
// Filename     :   StringUtil.js
// Description  :   문자열 처리를 위한 함수들을 정의해 놓은 파일
// ****************************************************************************************************

// ****************************************************************************************************
//  1. Description : 문자열에서 공백을 없앤다.
//      - trim() : this.replace(/(^\s*)|(\s*$)/g, ""); 
//      - trimLeft() : this.replace(/(^\s*)/, "");
//      - trimRight() : this.replace(/(\s*$)/, "");
//  2. Parameters
//  3. Return Type : String
// ****************************************************************************************************
String.prototype.trimAll = function() 
{
    return this.replace(/\s+/g, "");
}

// ****************************************************************************************************
//  1. Description : 문자열에서 선행 공백과 후미 공백을 제거하고, 숫자가 아닌 문자를 제거한다.
//  2. Parameters
//  3. Return Type : String
// ****************************************************************************************************
String.prototype.getNumber = function() 
{
    return (this.trim().replace(/[^0-9]/g, ""));
}

// ****************************************************************************************************
//  1. Description : <문자열>에 <원하는 결과물의 전체 길이>가 될 때 까지 <채울문자>를 반복해서 <문자열> 왼쪽에 덧붙여 결과를 리턴한다.
//  2. Parameters
//      - nTotalLength : 원하는 결과물의 전체 길이 
//      - strPadString : 채울 문자열
//  3. Return Type : String
// ****************************************************************************************************
if( !String.prototype.padStart ) 
{
    String.prototype.padStart = function() 
    {
        var strSource;
        var nTotalLength;
        var strPadString;
        var nLen;
        var nMasked;
        var strFillerSlice;
        strSource = this;
        nTotalLength = parseInt((arguments[0]) ? arguments[0] : 0);
        strPadString = arguments[1] ? arguments[1] : "";
        nLen = strSource.length;

        if( nTotalLength <= nLen ) return strSource;
        nMasked = nTotalLength - nLen;

        while( strPadString.length < nMasked ) 
        {
            var nPadLen = strPadString.length;
            var nRemainingCodeUnits = nMasked - nPadLen;
            if( nPadLen > nRemainingCodeUnits ) 
            {
                strPadString += strPadString.slice(0, nRemainingCodeUnits);
            } 
            else 
            {
                strPadString += strPadString;
            }
        }
        strFillerSlice = strPadString.slice(0, nMasked);
        return strFillerSlice + strSource;
    }
}

// ****************************************************************************************************
//  1. Description : <문자열>에 <원하는 결과물의 전체 길이>가 될 때 까지 <채울문자>를 반복해서 <문자열> 오른쪽에 덧붙여 결과를 리턴한다.
//  2. Parameters
//      - nTotalLength : 원하는 결과물의 전체 길이 
//      - strPadString : 채울 문자열
//  3. Return Type : String
// ****************************************************************************************************
if( !String.prototype.padEnd ) 
{
    String.prototype.padEnd = function()
    {
        var strSource;
        var nTotalLength;
        var strPadString;
        var nLen;
        var nMasked;
        var strFillerSlice;
        strSource = this;

        nTotalLength = parseInt((arguments[0]) ? arguments[0] : 0);
        strPadString = arguments[1] ? arguments[1] : "";
        nLen = strSource.length;

        if( nTotalLength <= nLen ) return strSource;

        nMasked = nTotalLength - nLen;

        while( strPadString.length < nMasked ) 
        {
            var nPadLen = strPadString.length;
            var nRemainingCodeUnits = nMasked - nPadLen;
            if( nPadLen > nRemainingCodeUnits ) 
            {
                strPadString += strPadString.slice(0, nRemainingCodeUnits);
            } 
            else 
            {
                strPadString += strPadString;
            }
        }
        strFillerSlice = strPadString.slice(0, nMasked);
        return strSource + strFillerSlice;
    }
}

// ****************************************************************************************************
//  1. Description : <문자열>에 <채울문자>를 <원하는 위치>에 반복해서 붙인다.(Ex. '12345'.padCharAt(3, ',') : 숫자에 3자리마다 ,를 찍어서 반환 12345 -> 12,345)
//  2. Parameters : str.padCharAt(nStep, cChar)
//      - nStep : 원하는 위치
//      - cChar : 채울문자
//  3. Return Type : String
// ****************************************************************************************************
String.prototype.padCharAt = function() 
{
    var strSource;
    var nStep;
    var cChar;
    var strDest;

    strSource = this;
    nStep = parseInt((arguments[0]) ? arguments[0] : 3);
    cChar = arguments[1] ? arguments[1] : ",";
    strDest = eval("/(-?[0-9]+)([0-9]{" + nStep + "})/");

    while( (strDest).test(strSource) ) 
        strSource = strSource.replace((strDest), "$1" + cChar + "$2");

    return strSource;
}

// ****************************************************************************************************
//  1. Description : 문자열의 Byte 길이를 반환한다.
//  2. Parameters
//  3. Return Type : Numeric
// ****************************************************************************************************
String.prototype.getByteLength = function() 
{
    var nCnt = 0;
    for( var i = 0; i < this.length; i++ ) 
    {
        if( this.charCodeAt(i) > 255 ) 
            nCnt += 2;
        else 
            nCnt++;
    }
    return nCnt;
}

// ****************************************************************************************************
//  1. Description : 전체 파일 경로에서 <폴더>를 얻어온다.
//  2. Parameters
//  3. Return Type : String
// ****************************************************************************************************
String.prototype.getFolder = function() 
{
    return (this.indexOf("/") < 0) ? "" : this.substring(0, this.lastIndexOf("/"));
}

// ****************************************************************************************************
//  1. Description : 전체 파일 경로에서 <파일 명 + 파일 확장자>을 얻어온다.
//  2. Parameters
//  3. Return Type : String
// ****************************************************************************************************
String.prototype.getFileNameExt = function() 
{
    return (this.indexOf("/") < 0) ? "" : this.substring(this.lastIndexOf("/") + 1, this.length);
}

// ****************************************************************************************************
//  1. Description : 전체 파일 경로에서 <파일 명>을 얻어온다.
//  2. Parameters
//  3. Return Type : String
// ****************************************************************************************************
String.prototype.getFileName = function() 
{
    var strSource;
    var nDirIndex;
    var nExtIndex;
    strSource = this.trim();

    nDirIndex = strSource.lastIndexOf("/");
    nExtIndex = strSource.lastIndexOf(".");

    if( nDirIndex < 0 ) nDirIndex = 0;
    if( nExtIndex < 0 ) return "";
    return this.substring(nDirIndex + 1, nExtIndex);
}

// ****************************************************************************************************
//  1. Description : 전체 파일 경로에서 <파일 확장자>을 얻어온다.
//  2. Parameters
//  3. Return Type : String
// ****************************************************************************************************
String.prototype.getFileExt = function() 
{
    return (this.indexOf(".") < 0) ? "" : this.substring(this.lastIndexOf(".") + 1, this.length);
}

// ****************************************************************************************************
//  1. Description : 전체 URL 경로에서 호스트명을 얻어온다.
//  2. Parameters
//  3. Return Type : String
// ****************************************************************************************************
String.prototype.getHostname = function() 
{
    var oReg = new RegExp('^(?:f|ht)tp(?:s)?\://([^/]+)', 'im');
    return this.match(oReg)[1].toString();
}

// ****************************************************************************************************
//  1. Description : 전체 URL 경로에서 쿼리스트링을 제외한 <URL>을 얻어온다.
//  2. Parameters
//  3. Return Type : String
// ****************************************************************************************************
String.prototype.getURI = function() 
{
    var arrUrl;
    arrUrl = this.split("?");
    arrUrl = arrUrl[0].split("#");
    return arrUrl[0];
}
// ****************************************************************************************************
//  1. Description : 전체 URL 경로에서 <쿼리스트링>을 얻어온다.
//  2. Parameters
//  3. Return Type : String
// ****************************************************************************************************
String.prototype.getQueryString = function() 
{
    return (this.indexOf("?") < 0) ? "" : this.substring(this.lastIndexOf("?") + 1, this.length);
}

// ****************************************************************************************************
//  1. Description : 최소 최대 길이인지 검증한다.
//  2. Parameters : str.IsLength(min [,max])
//      - nMin : 최소 길이
//      - nMax : 최대 길이
//  3. Return Type : Boolean
// ****************************************************************************************************
String.prototype.isLength = function() 
{
    var nMin;
    var nMax;
    var bSuccess;
    nMin = arguments[0];
    nMax = arguments[1] ? arguments[1] : null;
    bSuccess = true;
 
    if( this.length < nMin ) 
        bSuccess = false;

    if( nMax && this.length > nMax ) 
        bSuccess = false;

    return bSuccess;
}

// ****************************************************************************************************
//  1. Description : 최소 최대 바이트인지 검증한다.
//  2. Parameters : str.IsByteLength(min [,max])
//      - nMin : 최소 바이트
//      - nMax : 최대 바이트
//  3. Return Type : Boolean
// ****************************************************************************************************
String.prototype.isByteLength = function() 
{
    var nMin;
    var nMax;
    var bSuccess;
    nMin = arguments[0];
    nMax = arguments[1] ? arguments[1] : null;
    bSuccess = true;

    if( this.getByteLength() < nMin ) 
        bSuccess = false;
    if( nMax && this.getByteLength() > nMax ) 
        bSuccess = false;
    return bSuccess;
}

// ****************************************************************************************************
//  1. Description : 공백이나 NULL인지 확인한다.
//  2. Parameters 
//  3. Return Type : Boolean
// ****************************************************************************************************
String.prototype.isEmpty = function ()
{
    var strSource;
    strSource = this.trimAll();
    if( strSource != "" )
        return false;
    else
        return true;
}



