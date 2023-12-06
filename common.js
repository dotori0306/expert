/*
	'=======================================================================
	'업 무 명 : 메가로이어스-common
	'모듈기능 : 메가로이어스 공통 js 파일
	'파 일 명 : common.js
	'작성일자 : 2015/04/06
	'작 성 자 : 박용수
	'-----------------------------------------------------------------------
	'변경일자   변경자  변동내역
	'=======================================================================

	'=======================================================================
*/

//=================================================================================
// 모바일 기기
//=================================================================================
var m_userAgent_Full = navigator.userAgent.toLowerCase();
var m_userAgent = '';
var m_mobilePhones = new Array('iphone', 'ipod', 'ipad', 'android', 'blackberry', 'windows ce','nokia', 'webos', 'opera mini', 'sonyericsson', 'opera mobi', 'iemobile', 'mot');

var m_mobileCheck = 0;
var m_userFlag = false;

for(var m_cnt=0; m_cnt<m_mobilePhones.length; m_cnt++) {
	if(m_userAgent_Full.indexOf(m_mobilePhones[m_cnt]) != -1) {
		m_mobileCheck++;
		m_userAgent = m_mobilePhones[m_cnt];
	}
}

var m_platform = navigator.platform.toLowerCase();
var m_platform_filter = new Array('win16', 'win32', 'win64', 'mac', 'macintel');


for(var m_cnt=0; m_cnt<m_platform_filter.length; m_cnt++) {
	if(m_platform.indexOf(m_platform_filter[m_cnt]) != -1) {
		m_mobileCheck = 0;
	}
}
//=================================================================================

//사용자 해상도, 브라우저 버전확인
var UseWidth = window.screen.availWidth;
var UseHeight = window.screen.availHeight;
var appPosition = navigator.appVersion.lastIndexOf('MSIE');
var appVersion = navigator.appVersion.substr(appPosition + 5, 1);
var osVersion = navigator.appVersion.substr(appPosition + 10, 14);

// 함수이름 : player_free()
// 함수설명 : 플레이어 - FREE
// 입 력 값 : 구분자, 속성
// 반 환 값 :
function player_free(kbn, para) {
	if (m_mobileCheck > 0) {
		var view = 1;
		var mode = 'S';
		var mappno = 0;
		var mchrcd = para;
		var mleccd = 0;
		var relay = 'N';
		var frtkbn = '0';
		var evtFlg = "N";

		//영상 화질 설정
		if (kbn == "20") {
			view = 2;
		} else if( kbn == "50" || kbn == "61" || kbn == "63" || kbn == "71") {
			mode = 'M';
		} else if ( kbn == "80") {	// 이벤트영상
			evtFlg = 'Y';
		} else if ( kbn == "40") {	// 이벤트영상
			view = 2;
			evtFlg = 'Y';
		}

		player_mega_mobile2(view, mode, mappno, mchrcd, mleccd, frtkbn, kbn, evtFlg);
	} else {
	   var vPlayerUrl;
	   var vPlayerParam, vPlayerNm, vPlayerOption;
	   vPlayerParam = "?dng_kbn=" + kbn + "&CHR_CD=" + para;
	   vPlayerParam = vPlayerParam + "&UseWidth=" + UseWidth + "&UseHeight=" + UseHeight;
	   vPlayerNm = "DNGPlayer";
	   vPlayerOption = "resizable=yes, width=1024, height=645, top=0, left=0";

	   var dns, arrDns, str , https_kbn;
	   dns = document.location.href; //<-- 현재 URL 얻어온다
	   arrDns = dns.split("//"); //<-- // 구분자로 짤라와서
	   str = arrDns[1].substring(0, arrDns[1].indexOf("/")); //<-- 뒤에부터 다음 / 까지 가져온다
	   if (str=="www.megaexpert.co.kr") {
		   https_kbn = "https://";      // 로그인 정보 입력 후 암호화 URL로 넘어 간다.
	   }else{
		   https_kbn = "//";
	   }

		/*===============================
			일반화질 맛보기 플레이어
		================================*/
		if (kbn == "10")
		{
			vPlayerUrl = https_kbn + str +"/Player/KollusN/nPlayerFree/Player_Load.asp";
			vPlayerOption = "resizable=1, scrollbars=no,width=698,height=408,top=0,left=0";
			window.open(vPlayerUrl + vPlayerParam, vPlayerNm, vPlayerOption);
		}

		if ( kbn == "60" ) {
			vPlayerUrl = https_kbn + str +"/Player/KollusN/nPlayerFree/Player_Load.asp";
			vPlayerOption = "resizable=1, scrollbars=no,width=698,height=408,top=0,left=0";
			window.open(vPlayerUrl + "?dng_kbn="+kbn+"&REPATH="+para, vPlayerNm, vPlayerOption);
		}

		/*===============================
			고화질 맛보기 플레이어
		================================*/
		if ( kbn == "20"  || kbn == "40" ) {
			vPlayerUrl = https_kbn + str +"/Player/KollusN/sPlayerFree/Player_Load.asp";
			vPlayerOption = "width=1200,height=510,top=0,left=0,resizable=1";
			window.open(vPlayerUrl + vPlayerParam, vPlayerNm, vPlayerOption);
		}


		/*===============================
			고화질 이벤트 플레이어
		================================*/
		if ( kbn == "50" || kbn == "61" || kbn == "63") {
			vPlayerUrl = https_kbn + str +"/Player/KollusN/sPlayerEvent/Player_Load.asp";
			vPlayerOption = "width=1200,height=510,top=0,left=0,resizable=1";
			window.open(vPlayerUrl + vPlayerParam, vPlayerNm, vPlayerOption);
		}

//---------------- 이벤트 플레이어 추가부분 S ---------------------//
		//이벤트 동영상 고화질 sPlayerEvent 71 (오른쪽탭 없애기 Version)		추가 CHOIJH 20130123
		if ( kbn == "71") {
			vPlayerUrl = https_kbn + str +"/Player/KollusN/sPlayerEvent/Player_Load.asp";

			if (vPlayerParam.indexOf('WIDE_KBN=Y') > 0) {
				vPlayerOption = "width=1200,height=510,top=0,left=0,resizable=1";				
			} else {
				vPlayerOption = "width=810,height=485,top=0,left=0,resizable=1";
			}


			//window.open(vPlayerUrl + vPlayerParam + "&player=noad", vPlayerNm, vPlayerOption);
			window.open(vPlayerUrl + vPlayerParam, vPlayerNm, vPlayerOption);
		}
//---------------- 이벤트 플레이어 추가부분 E ---------------------//


		// 카테노이드 이벤트 동영상 고화질 sPlayerEvent 80 
		if ( kbn == "80") {
			vPlayerUrl = "/Player/KollusN/sPlayerEvent/Player_Load.asp";
			vPlayerOption = "width=1200,height=510,top=0,left=0,resizable=1";
			//window.open(vPlayerUrl + vPlayerParam + vPlayerNm, vPlayerNm, vPlayerOption);
			window.open(vPlayerUrl + "?Ckey="+para, vPlayerNm, vPlayerOption);
		}

		// 카테노이드 이벤트 동영상 고화질 sPlayerFree 81 
		if ( kbn == "81") {
			vPlayerUrl = "/Player/KollusN/sPlayerFree/Player_Load.asp";
			vPlayerOption = "width=1200,height=510,top=0,left=0,resizable=1";
			window.open(vPlayerUrl + vPlayerParam, vPlayerNm, vPlayerOption);
		}


		return;
	}
}

// 20100311 INS W.H.JANG #001
function player_time3(kbn, para,lec_cd, stm, etm) {
	if (m_mobileCheck > 0) {
		var view = 1;
		var mode = 'S';
		var mappno = 0;
		var mchrcd = para;
		var mleccd = lec_cd;
		var relay = 'N';
		var frtkbn = '0';
		var evtFlg = "N";

		//영상 화질 설정
		if (kbn == 55) {
			view = 2;
		}
		player_mega_mobile2(view, mode, mappno, mchrcd, mleccd, frtkbn, kbn, evtFlg);
	} else {
	   var vPlayerUrl;
	   var vPlayerParam, vPlayerNm, vPlayerOption;
	   vPlayerParam = "?dng_kbn=" + kbn + "&CHR_CD=" + para + "&LEC_CD=" + lec_cd + "&SPL_STM=" + stm + "&SPL_ETM=" + etm;
	   vPlayerParam = vPlayerParam + "&UseWidth=" + UseWidth + "&UseHeight=" + UseHeight;
	   vPlayerNm = "DNGPlayer";
	   vPlayerOption = "resizable=no, width=1024, height=645, top=0, left=0";

	   var dns, arrDns, str , https_kbn;
	   dns = document.location.href; //<-- 현재 URL 얻어온다
	   arrDns = dns.split("//"); //<-- // 구분자로 짤라와서
	   str = arrDns[1].substring(0, arrDns[1].indexOf("/")); //<-- 뒤에부터 다음 / 까지 가져온다
	   if (str=="www.megaexpert.co.kr") {
		   https_kbn = "https://";      // 로그인 정보 입력 후 암호화 URL로 넘어 간다.
	   }else{
		   https_kbn = "//";
	   }

		// 단원 강의일 경우
		if ( kbn == "45" ) {        //일반 동영상 맛보기(free)
			vPlayerUrl = https_kbn + str +"/Player/KollusN/nPlayerFree/Player_Load.asp";
			vPlayerOption = "resizable=1, scrollbars=no,width=698,height=408,top=0,left=0";
			window.open(vPlayerUrl + vPlayerParam, vPlayerNm, vPlayerOption);
		}

		if ( kbn == "55" ) {        //쌩쌩 플러스 동영상 맛보기 (free) // HD 동영상 맛보기(free)
			vPlayerUrl = https_kbn + str +"/Player/KollusN/sPlayerFree/Player_Load.asp";
			vPlayerOption = "width=1200,height=510,top=0,left=0,resizable=1";
			window.open(vPlayerUrl + vPlayerParam, vPlayerNm, vPlayerOption);
		}

		/*
		if ( kbn == "85" ) {        //카테노이드 플레이어 맛보기 강좌 ADD 20141017 CHOIJH
			vPlayerUrl = "/Player/KollusN/nPlayerFree/Player_Load.asp";
			vPlayerOption = "width=720,height=480,top=0,left=0,scrollbars=1";
			window.open(vPlayerUrl + vPlayerParam, vPlayerNm, vPlayerOption);
		}

		if ( kbn == "95" ) {        //카테노이드 플레이어 맛보기 강좌 고화질
			vPlayerUrl = "/Player/KollusN/sPlayerFree/Player_Load.asp";
			vPlayerOption = "width=1024,height=768,top=0,left=0,scrollbars=1";
			window.open(vPlayerUrl + vPlayerParam, vPlayerNm, vPlayerOption);
		}
		*/
		return;
	}
}


// 함수이름 : player_mega()
// 함수설명 : 플레이어 - FREE
// 입 력 값 : 구분자, 속성
// 반 환 값 :
function player_mega(kbn,APP_NO,CHR_CD,LEC_CD,TEC_NM,relay) {
	//이어보기 설정
	if(relay == undefined && relay == null && relay == '') {
		relay = 'N';
	}
	if (m_mobileCheck > 0) {
		if (kbn==88||kbn==89)
		{
			var view = 1;
			var mode = 'F';
			var mappno = APP_NO;
			var mchrcd = CHR_CD;
			var mleccd = LEC_CD;
			var frtkbn = '0';
			var evtFlg = "N";

			//영상 화질 설정
			if (kbn == 89) {
				view = 2;
			}
			player_mega_mobile2(view, mode, mappno, mchrcd, mleccd, frtkbn, kbn, evtFlg);
		} else {
			var view = 1;
			var mode = 'L';
			var mappno = APP_NO;
			var mchrcd = CHR_CD;
			var mleccd = LEC_CD;
			var frtkbn = '0';
			var evtFlg = "N";

			//영상 화질 설정
			if (kbn == 20) {
				view = 2;
			}

			// 칼루스 플레이어 모바일로 PC버전 접속시
			if ( kbn == "98" || kbn == "99" ){	// 무료강의 플레이어일 경우
				var frtkbn = '1';
			}
			player_mega_mobile2(view, mode, mappno, mchrcd, mleccd, frtkbn, kbn, evtFlg);
		}
	} else {

		var vPlayerUrl;
		var vPlayerParam, vPlayerNm, vPlayerOption;
		vPlayerParam = "?APP_NO=" + APP_NO + "&CHR_CD=" + CHR_CD + "&LEC_CD=" + LEC_CD + "&TEC_NM=" + TEC_NM + "&kbn=" + kbn + "&Relay_yn="+relay;
	    vPlayerParam = vPlayerParam + "&UseWidth=" + UseWidth + "&UseHeight=" + UseHeight;
		vPlayerNm = "DNGPlayer";
		vPlayerOption = "resizable=no, width=1024, height=645, top=0, left=0";

		var dns, arrDns, str , https_kbn;
		dns = document.location.href; //<-- 현재 URL 얻어온다
		arrDns = dns.split("//"); //<-- // 구분자로 짤라와서
		str = arrDns[1].substring(0, arrDns[1].indexOf("/")); //<-- 뒤에부터 다음 / 까지 가져온다
		if (str=="www.megaexpert.co.kr") {
			https_kbn = "https://";      // 로그인 정보 입력 후 암호화 URL로 넘어 간다.
		}else{
			https_kbn = "//";
		}

		if(kbn=="10")   //일반 동영상 강의
		{
			vPlayerUrl = https_kbn + str +"/Player/KollusN/nPlayer/Player_Load.asp";
			vPlayerOption = "resizable=1, scrollbars=no,width=698,height=408,top=0,left=0";
			window.open(vPlayerUrl + vPlayerParam, vPlayerNm, vPlayerOption);

		}

		if(kbn=="20")   //쌩쌩플러스 동영상 강의
		{
			//vPlayerUrl = "/Player/Mega/sPlayer/Player_Load.asp";
			vPlayerUrl = https_kbn + str +"/Player/KollusN/sPlayer/Player_Load.asp";
			vPlayerOption = "width=1200,height=510,top=0,left=0,resizable=1";
			window.open(vPlayerUrl + vPlayerParam, vPlayerNm, vPlayerOption);
		}


		if(kbn=="75")   //카테노이드 플레이어 ADD 20141007 CHOIJH
		{
			vPlayerUrl = https_kbn + str +"/Player/KollusN/nPlayer/Player_Load.asp";
			vPlayerOption = "resizable=1, scrollbars=no,width=698,height=408,top=0,left=0";
			window.open(vPlayerUrl + vPlayerParam, vPlayerNm, vPlayerOption);
		}

		if(kbn=="80")   //카테노이드 플레이어 오브젝트형 ADD 20141029 CHOIJH
		{
			vPlayerUrl = https_kbn + str +"/Player/KollusN/sPlayer/Player_Load.asp";
			vPlayerOption = "width=1200,height=510,top=0,left=0,resizable=1";	
// 			vPlayerUrl = https_kbn + str +"/PlayerN/Kollus/sPlayer/Player_Load.asp";
// 			vPlayerOption = "width=1440 , height=839 , top=0 , left=0 , scrollbars=no, toolbar=no, menubar=no, resizable=no, copyhistory=no";
			window.open(vPlayerUrl + vPlayerParam, vPlayerNm, vPlayerOption);

			vPlayerParam = "APP_NO=" + APP_NO + "&CHR_CD=" + CHR_CD + "&LEC_CD=" + LEC_CD + "&TEC_NM=" + TEC_NM + "&kbn=" + kbn

		}
		if(kbn=="80N")   //카테노이드 플레이어 오브젝트형 ADD 20141029 CHOIJH
		{
			vPlayerUrl = https_kbn + str +"/PlayerN/Kollus/sPlayer/Player_Load.asp";
			vPlayerOption = "width=1440 , height=839 , top=0 , left=0 , scrollbars=no, toolbar=no, menubar=no, resizable=no, copyhistory=no";
			window.open(vPlayerUrl + vPlayerParam, vPlayerNm, vPlayerOption);

			vPlayerParam = "APP_NO=" + APP_NO + "&CHR_CD=" + CHR_CD + "&LEC_CD=" + LEC_CD + "&TEC_NM=" + TEC_NM + "&kbn=" + kbn

		}


		if(kbn=="88")	//무료보강 강의(일반화질)
		{
			vPlayerUrl = https_kbn + str +"/Player/KollusN/nPlayerFrrft/Player_Load.asp";
			vPlayerOption = "resizable=1, scrollbars=no,width=698,height=408,top=0,left=0";
			window.open(vPlayerUrl + vPlayerParam, vPlayerNm, vPlayerOption);

		}


		if ( kbn == "89" ) {		//무료보강 강의(고화질)
			vPlayerUrl = https_kbn + str +"/Player/KollusN/sPlayerFrrft/Player_Load.asp";
			vPlayerOption = "width=1200,height=510,top=0,left=0,resizable=1";
			window.open(vPlayerUrl + vPlayerParam, vPlayerNm, vPlayerOption);

		}

		if(kbn=="98") {	// 카테노이드 플레이어 무료보강 강의(일반화질)
			vPlayerUrl = https_kbn + str +"/Player/KollusN/nPlayerFrrft/Player_Load.asp";
			vPlayerOption = "resizable=1, scrollbars=no,width=698,height=408,top=0,left=0";
			window.open(vPlayerUrl + vPlayerParam, vPlayerNm, vPlayerOption);

		}

		if ( kbn == "99" ) { // 카테노이드 플레이어무료보강 강의(고화질)
			vPlayerUrl = https_kbn + str +"/Player/KollusN/sPlayerFrrft/Player_Load.asp";
			vPlayerOption = "width=1200,height=510,top=0,left=0,resizable=1";
			window.open(vPlayerUrl + vPlayerParam, vPlayerNm, vPlayerOption);

		}
	}
}


// 모바일 기기 판단 Ver 2.0
var isIPHONE = (navigator.userAgent.match('iPhone') != null || navigator.userAgent.match('iPod') != null);
var isIPAD = (navigator.userAgent.match('iPad') != null);
var isANDROID = (navigator.userAgent.match('Android') != null);

// 모바일 앱 설치 주소 및 메시지 Ver 2.0
var _APP_INSTALL_URL_IOS = "http://itunes.apple.com/kr/app/aqua-player/id439621612?mt=8";
var _APP_INSTALL_URL_ANDROID = "market://details?id=com.cdn.webplayer";
var _APP_DOWN_INSTALL_URL_IOS = "http://itunes.apple.com/kr/app/edu-manager/id552868665?mt=8";
var _APP_DOWN_INSTALL_URL_ANDROID = "market://details?id=com.cdn.edumanager";
var _APP_INSTALL_CONFIRM = "에듀 매니저가 설치 되어있지 않습니다.\n확인버튼을 클릭하시면\n플레이어 설치가 시작됩니다."

/******************************************************************
* 이름  : player_mega_mobile

* INPUT : view - 화질구분(일반 : 1, 고 : 2),
		  mode - 플레이어 모드,
		  chrcd - 강좌코드,
		  appno - 주문번호,
		  leccd - 강의코드,
		  replay - 이어보기유무

* 설명  : BlockMsg 팝업 닫기 처리
******************************************************************/
function player_mega_mobile(view, mode, appno, chrcd, leccd, replay) {
	var para;

	para = '?';
	if (getCookie('userid') == ""){
		para += 'userID='+getCookie('USERID');
	}else{
		para += 'userID='+getCookie('userid');
	}

	if (view != 2) {
		view = 1;
	}

	para += '&view='+view;

	if(mode != undefined && mode != null && mode != '' && mode.length > 0) {
		para += '&mode='+mode;
	}

	if(appno != undefined && appno != null && appno != '') {
		para += '&app_no='+appno;
	}

	para += '&chr_cd='+chrcd;
	para += '&lec_cd='+leccd;

	if (replay == 'Y'){
		para += '&pos_type=bookmark';
	} else {
		para += '&pos_type=progress';
	}

	if (isIPHONE || isIPAD) {
		para += '&m_type=iOS';
	} else {
		para += '&m_type=Android';

		if (navigator.appVersion.lastIndexOf('Chrome') > 0) {
			para += '&b_type=Chrome';
		}
	}

	para += '&rurl='+escape(top.document.URL);

	if (navigator.appVersion.lastIndexOf('Chrome') > 0) {
		window.location.href = '/Player/Mega/mPlayer/player_httpvod.asp'+para;
	} else {
		var iMobilePlayifrm = document.getElementById("iMobilePlayifrm");
		if (iMobilePlayifrm != null) {
			iMobilePlayifrm.parentNode.removeChild(iMobilePlayifrm);
		}

		var AquaiFrm = document.createElement("iframe");
		AquaiFrm.setAttribute("id", "iMobilePlayifrm");
		AquaiFrm.setAttribute("src", "/Player/Mega/mPlayer/player_httpvod.asp" + para);
		AquaiFrm.setAttribute("width", "0px");
		AquaiFrm.setAttribute("height", "0px");
		AquaiFrm.setAttribute("scrolling", "no");
		AquaiFrm.style.border = "0px";
		document.body.appendChild(AquaiFrm);
	}
}


//------------------------------------------------------------------------------
// 로그인 팝업창
//------------------------------------------------------------------------------
function gfPopLogin()
{
	var dns, arrDns, str , https_kbn;
	dns = document.location.href; //<-- 현재 URL 얻어온다
	arrDns = dns.split("//"); //<-- // 구분자로 짤라와서
	str = arrDns[1].substring(0, arrDns[1].indexOf("/")); //<-- 뒤에부터 다음 / 까지 가져온다
	if (str=="www.megaexpert.co.kr") {
		https_kbn = "https://";      // 로그인 정보 입력 후 암호화 URL로 넘어 간다.
	}else{
		https_kbn = "http://";
	}
	
    alert("로그인하여 주십시요");
    var win = window.open(https_kbn + str + '/member/pop/memb_login.asp','login','scrollbars=no,toolbar=no,menubar=no,location=no,top=0, left=0, height=392px, width=797px, scrollbars=0');
    win.focus();
}

//------------------------------------------------------------------------------
// 로그인 팝업창2
//------------------------------------------------------------------------------
function loginCheck()
{
	var dns, arrDns, str , https_kbn;
	dns = document.location.href; //<-- 현재 URL 얻어온다
	arrDns = dns.split("//"); //<-- // 구분자로 짤라와서
	str = arrDns[1].substring(0, arrDns[1].indexOf("/")); //<-- 뒤에부터 다음 / 까지 가져온다
	if (str=="www.megaexpert.co.kr") {
		https_kbn = "https://";      // 로그인 정보 입력 후 암호화 URL로 넘어 간다.
	}else{
		https_kbn = "http://";
	}
	
	alert('로그인을 하셔야 서비스 이용이 가능합니다.');
	window.open(https_kbn + str + '/member/pop/memb_login.asp','login','scrollbars=no,toolbar=no,menubar=no,location=no,top=0, left=0, height=392px, width=797px, scrollbars=0');

}


//------------------------------------------------------------------------------
// 로그인 팝업창3
//------------------------------------------------------------------------------
function loginCheck3(rtn_url)
{
	var dns, arrDns, str , https_kbn;
	dns = document.location.href; //<-- 현재 URL 얻어온다
	arrDns = dns.split("//"); //<-- // 구분자로 짤라와서
	str = arrDns[1].substring(0, arrDns[1].indexOf("/")); //<-- 뒤에부터 다음 / 까지 가져온다
	if (str=="www.megaexpert.co.kr") {
		https_kbn = "https://";      // 로그인 정보 입력 후 암호화 URL로 넘어 간다.
	}else{
		https_kbn = "http://";
	}
	alert('로그인을 하셔야 서비스 이용이 가능합니다.');
	window.open(https_kbn + str + '/member/pop/memb_login.asp?rtn_url='+rtn_url,'login','scrollbars=no,toolbar=no,menubar=no,location=no,top=0, left=0, height=392px, width=797px, scrollbars=0');

}

// 함수이름 : getCookie()
// 함수설명 : 쿠키가져오기
// 입 력 값 : 쿠키명
// 반 환 값 : 없음/쿠키값
function getCookie(name) {
    var nameOfCookie = name + "=";
    var x = 0;
    while ( x <= document.cookie.length )
    {
        var y = (x+nameOfCookie.length);
        if ( document.cookie.substring( x, y ) == nameOfCookie )
        {
            if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
                endOfCookie = document.cookie.length;
            return unescape( document.cookie.substring( y, endOfCookie ) );
        }
        x = document.cookie.indexOf( " ", x ) + 1;
        if ( x == 0 )
            break;
    }
    return "";
}

// 함수이름 : setCookie(name, value, expiredays)
// 함수설명 : 쿠키설정
// 입 력 값 : 쿠키명
// 반 환 값 : 없음/쿠키값
function setCookie( name, value, expiredays ) {
	var todayDate = new Date();
	todayDate.setDate( todayDate.getDate() + expiredays );
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

// 함수이름 : setCookie_multi(name, value, expiredays)
// 함수설명 : 쿠키가져오기
// 입 력 값 : 쿠키명
// 반 환 값 : 없음/쿠키값
function setCookie_multi(name, sval, value, expiredays) {
    var todayDate = new Date();
    todayDate.setDate( todayDate.getDate() + expiredays );

    var multiCookie, arr_Cookies, arr_sval;
    var val_1=""; val_2="";
    multiCookie = getCookie(name);
    if(multiCookie == "") multiCookie="Chr_Poll"
    arr_Cookies = multiCookie.split("&");
    for( var i=0; i<arr_Cookies.length; ++i ) {
        if(arr_Cookies[i].indexOf(sval) >= 0) {
            arr_sval = arr_Cookies[i].split("=");
            val_1 = arr_sval[0];
            val_2 = arr_sval[1];
            break;
        }
    }
    if( val_1 == "" )
        multiCookie = multiCookie + "&" + sval + "=" + value;
    else
        multiCookie = multiCookie.replace(val_1+"="+val_2, val_1+"="+value);

    document.cookie = name + "=" + escape( multiCookie ) + ";domain=megaexpert.co.kr;path=/;expires=" + todayDate.toGMTString() + ";"
}

// 함수이름 : getCookie_multi()
// 함수설명 : 쿠키가져오기
// 입 력 값 : 쿠키명
// 반 환 값 : 없음/쿠키값
function getCookie_multi(name,sval) {
    var multiCookie, arr_Cookies, arr_sval;
    var nameOfCookie = name + "=";
    var x = 0;
    var y;
    while ( x <= document.cookie.length )
    {
        y = (x+nameOfCookie.length);
        if ( document.cookie.substring( x, y ) == nameOfCookie )
        {
            if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
                endOfCookie = document.cookie.length;
            multiCookie = unescape( document.cookie.substring( y, endOfCookie ) );
            arr_Cookies = multiCookie.split("&");
            for( var i=0; i<arr_Cookies.length; ++i ) {
                if(arr_Cookies[i].indexOf(sval) >= 0) {
                    arr_sval = arr_Cookies[i].split("=");
                    return arr_sval[1];
                }
            }
        }
        x = document.cookie.indexOf( " ", x ) + 1;
        if ( x == 0 )
            break;
    }
    return "";
}


//------------------------------------------------------------------------------
// 장바구니 담기
//------------------------------------------------------------------------------
function fAddCart()
{

	
	if(getCookie('userid') == "" && getCookie('USERID') == ""){
	
		alert('로그인을 하셔야 서비스 이용이 가능합니다.');
		popMemberInput(1);
        return;
    }

	
    var checked_chr_count = $("input:checkbox:checked[name=chk_chr_cd]").length;
    var checked_book_count = $("input:checkbox:checked[name=chk_book_cd]").length;
    var checked_ebook_count = $("input:checkbox:checked[name=chk_ebook_cd]").length;
    if(checked_chr_count+checked_book_count+checked_ebook_count <= 0)
    {
        alert("장바구니에 담을 항목을 선택하여 주십시요");
        return;
    }

    document.frm_lecture.job_flag.value = "ADD_CART";
    document.frm_lecture.action = "/mypage/payment/my_cart_proc.asp";
    document.frm_lecture.submit();
}


//------------------------------------------------------------------------------
// 바로결제
//------------------------------------------------------------------------------
function fGoOrder()
{

    
	if(getCookie('userid') == "" && getCookie('USERID') == ""){
	
		alert('로그인을 하셔야 서비스 이용이 가능합니다.');
		popMemberInput(1);
        return;
    }
	
    var checked_chr_count = $("input:checkbox:checked[name=chk_chr_cd]").length;
    var checked_book_count = $("input:checkbox:checked[name=chk_book_cd]").length;
    var checked_ebook_count = $("input:checkbox:checked[name=chk_ebook_cd]").length;
    if(checked_chr_count+checked_book_count+checked_ebook_count <= 0)
    {
        alert("결제하실 항목을 선택하여 주십시요");
        return;
    }

    document.frm_lecture.job_flag.value = "ADD_PAYMENT";
    document.frm_lecture.action = "/mypage/payment/my_cart_proc.asp";
    document.frm_lecture.submit();
}

//------------------------------------------------------------------------------
// 패키지 장바구니 담기
//------------------------------------------------------------------------------
function fPkgAddCart(pkg_cd)
{
    if("<%=cook_id%>" == "")
    {
        gfPopLogin();
        return;
    }

    var chk_book_cd = "";

    $("input:checkbox[id*=chr_book_"+pkg_cd+"_]").each
    (
        function()
        {
            chk_book_cd += $(this).attr("book_cd")+","
        }
    );

    //window.location.replace("/mypage/payment/my_cart_proc.asp?job_flag=ADD_CART&chk_pkg_cd="+pkg_cd+"&chk_book_cd="+chk_book_cd);
    document.frm_lecture.job_flag.value = "ADD_CART";
	document.frm_lecture.chk_pkg_cd.value = pkg_cd;
	document.frm_lecture.chk_book_cd.value = chk_book_cd;
    document.frm_lecture.action = "/mypage/payment/my_cart_proc.asp";
    document.frm_lecture.submit();
}


//------------------------------------------------------------------------------
// 바로결제
//------------------------------------------------------------------------------
function fFreeGoOrder(chr_cd)
{
	if(getCookie('userid') == "" && getCookie('USERID') == "")
    {
        gfPopLogin();
        return;
    }

	window.location.href = "/mypage/payment/my_cart_proc.asp?job_flag=ADD_PAYMENT&chk_chr_cd=" + chr_cd;
}

//------------------------------------------------------------------------------
// 패키지 바로결제
//------------------------------------------------------------------------------
function fPkgGoOrder(pkg_cd)
{
    if("<%=cook_id%>" == "")
    {
        gfPopLogin();
        return;
    }

    var chk_book_cd = "";

    $("input:checkbox[id*=chr_book_"+pkg_cd+"_]").each
    (
        function()
        {
            chk_book_cd += $(this).attr("book_cd")+","
        }
    );

    //window.location.replace("/mypage/payment/my_cart_proc.asp?job_flag=ADD_PAYMENT&chk_pkg_cd="+pkg_cd+"&chk_book_cd="+chk_book_cd);
    document.frm_lecture.job_flag.value = "ADD_PAYMENT";
	document.frm_lecture.chk_pkg_cd.value = pkg_cd;
	document.frm_lecture.chk_book_cd.value = chk_book_cd;
    document.frm_lecture.action = "/mypage/payment/my_cart_proc.asp";
    document.frm_lecture.submit();
}


//------------------------------------------------------------------------------
// 천자리 콤마
//------------------------------------------------------------------------------
function gfGetCommaValue(n)
{
    var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
    n += '';                          // 숫자를 문자열로 변환
    while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');
    return n;
}
/*********************************************************
* 이름 : isValidNumber
* INPUT :
* 설명 : 숫자체크
* 사용법 :
		if (!isValidNumber(val)) {
			alert("숫자만 입력하세요");
			f.value="";
			f.focus();
		}
**********************************************************/
function isValidNumber(txt) {
 // var val = parseInt(txt);
  if (isNaN(txt) || txt < 0) { return false; }
  return true;
}
/*********************************************************
* 이름 : isNull
* INPUT : f - 입력폼이름, msg - 경고창문구
* 설명 : 폼 필수입력값 체크시 사용
* 사용법 : if (isNull(form.textbox,'텍스트를'))
**********************************************************/
function isNull (f,msg) {
	if (f.value == "")
	{
		alert(msg+" 입력하세요");
		f.focus();
		return true;
	}
	return false;
}
//------------------------------------------------------------------------------
// 회원 가입 / 로그인 / 탈퇴 관련 팝업
//------------------------------------------------------------------------------
function popMemberInput(zflg) {
	var dns, arrDns, str , https_kbn;
	dns = document.location.href; //<-- 현재 URL 얻어온다
	arrDns = dns.split("//"); //<-- // 구분자로 짤라와서
	str = arrDns[1].substring(0, arrDns[1].indexOf("/")); //<-- 뒤에부터 다음 / 까지 가져온다

	/*
	if (str=="www.megaexpert.co.kr") {
		https_kbn = "https://";      // 로그인 정보 입력 후 암호화 URL로 넘어 간다.
	}else{
		https_kbn = "http://";
	}
	*/

	https_kbn = "https://";

	if (zflg == 1)	{
		var callUrl = https_kbn + str + "/member/pop/memb_login.asp";
		var ckWinUp = window.open(callUrl, 'popMemLogin', 'width=500,height=420,scrollbars=0');
	}else if (zflg == 2) {
		var callUrl = https_kbn + str + "/member/pop/memb_join_gate.asp";
		var ckWinUp = window.open(callUrl, 'popMemInput', 'width=790,height=806,scrollbars=0');
	}else if (zflg == 3)	{
		var callUrl = https_kbn + str + "/member/pop/memb_findid.asp";
		var ckWinUp = window.open(callUrl, 'popFindId', 'width=790,height=806,scrollbars=0');
	}else if (zflg == 4) {
		var callUrl = https_kbn + str + "/member/pop/memb_pwd_reset.asp";
		var ckWinUp = window.open(callUrl, 'popFindPwd', 'width=790,height=806,scrollbars=0');
	}else if (zflg == 5) {
		//회원정보 수정
		var callUrl = https_kbn + str + "/mypage/private/account_chk.asp";
		var ckWinUp = window.open(callUrl, 'popMemCheck', 'width=790,height=806,scrollbars=0');
	}else if (zflg == 6) {
		//회원탈퇴
		var callUrl = https_kbn + str + "/mypage/private/memb_out.asp";
		var ckWinUp = window.open(callUrl, 'popMemOut', 'width=795,height=780,scrollbars=0');
	}
	if (ckWinUp == null) {
	alert("차단된 팝업을 허용해 주십시요");
	return;
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 함수설명 : 메가스터디 사용하는 범용 Ajax 호출
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function msAjax(o) {
    o = { type: o.type || "POST", url: o.url || "", info: o.info || null, timeout: o.timeout || 10000, onLoading: o.onLoading || function () { }, onComplete: o.onComplete || function () { }, onError: o.onError || function () { }, onSuccess: o.onSuccess || function () { }, onTimeOut: o.onTimeOut || function () { }, data: o.data || "" };
    o.onLoading();
    if (typeof XMLHttpRequest == "undefined") { XMLHttpRequest = function () { return new ActiveXObject(navigator.userAgent.indexOf("MSIE 5") >= 0 ? "Microsoft.XMLHTTP" : "Msxml2.XMLHTTP"); } }
    var xml = new XMLHttpRequest();
    xml.open(o.type, o.url, true);
    if (o.type == "POST") xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    var tOut = o.timeout; var reqDone = false;
    setTimeout(function () { reqDone = true; }, tOut);
    xml.onreadystatechange = function () { if (xml.readyState == 4 && !reqDone) { if (hSuc(xml)) { o.onSuccess(hData(xml, o.type)); } else { o.onError(); } o.onComplete(); xml = null; } else { o.onTimeOut(); } };
    xml.send(o.info);
    function hSuc(r) { try { return !r.status && location.protocol == "file:" || (r.status >= 200 && r.status < 300) || r.status == 304 || navigator.userAgent.indexOf("Safari") >= 0 && typeof r.status == "undefined"; } catch (e) { } return false; }
    function hData(r, type) { var ct = r.getResponseHeader("content-type"); var data = !type && ct && ct.indexOf("xml") >= 0; data = type == "xml" || data ? r.responseXML : r.responseText; if (type == "script") eval.call(window, data); return data; }
}
function msLoading(e) { document.getElementById(e).innerHTML = "<table border='0' align='left' width='100%' height='100%'><tr><td align='center' valign='middle'><img src='http://img.megastudy.net/common/indicator_white.gif' border='0'></td></tr></table>"; }
function msAxList(u, d) {
    msAjax({ url: u, type: "GET", onSuccess: function (rss) { document.getElementById(d).innerHTML = rss; } });
}


function fnc_MegaDown(sUrl) {
	return "<OBJECT ID='downctrl' CLASSID='CLSID:2753B32A-7A6A-4971-B33E-DCB2ABF339E2' CODEBASE='http://file.megamd.co.kr/MegaDownCtrl/MegaDownCtrl_1.0.0.8.Cab#version=1,0,0,8#version=1,0,0,8' width=0 height=0><param name='BaseUrl' value='" + sUrl + "'></OBJECT>";
}



// 학원강좌 장바구니
function goOffCart()
{
    var frm = document.mainfrm;
    var bPass = false;

    var veri = frm.chrChk;
    if(veri)
    {
        veri = frm.chrChk[0];
        if(veri)
        {
            for(i=0; i<frm.chrChk.length; i++)
            {
                if(frm.chrChk[i].checked)
                    bPass = true;

            }
        }
        else
        {
            if(frm.chrChk.checked)
                bPass = true;

        }
    }

    if(!bPass)
    {
        alert("결제하실 강좌 또는 교재를 선택하여 주십시요.");
        return;
    }

    frm.action = '/mypage/payment/my_cart_pre_off.asp';

    //alertMsg();
    frm.submit();
}

// 학원강좌 바로결제
function goOffDirectPay()
{
    var frm = document.mainfrm;
    var bPass = false;

    var veri = frm.chrChk;
    if(veri)
    {
        veri = frm.chrChk[0];
        if(veri)
        {
            for(i=0; i<frm.chrChk.length; i++)
            {
                if(frm.chrChk[i].checked)
                    bPass = true;
            }
        }
        else
        {
            if(frm.chrChk.checked)
                bPass = true;
        }
    }

    veri = frm.bookChk;
    if(veri)
    {
        veri = frm.bookChk[0];
        if(veri)
        {
            for(i=0; i<frm.bookChk.length; i++)
            {
                if(frm.bookChk[i].checked)
                    bPass = true;
            }
        }
        else
        {
            if(frm.bookChk.checked)
                bPass = true;
        }
    }

    veri = frm.pkgChk;
    if(veri)
    {
        veri = frm.pkgChk[0];
        if(veri)
        {
            for(i=0; i<frm.pkgChk.length; i++)
            {
                if(frm.pkgChk[i].checked)
                    bPass = true;
            }
        }
        else
        {
            if(frm.pkgChk.checked)
                bPass = true;
        }
    }

    if(!bPass)
    {
        alert("결제하실 강좌 또는 교재를 선택하여 주십시요.");
        return;
    }

    frm.action = '/mypage/payment/my_direct_pay_pre_off.asp';

    //alertMsg();
    frm.submit();
}

//고시반(종합반)
function goOffDirectPayCamp()
{
	var frm = document.mainfrm;
	var bPass = false;

	var veri = frm.chrChk;
	if(veri)
	{
		veri = frm.chrChk[0];
		if(veri)
		{
			for(i=0; i<frm.chrChk.length; i++)
			{
				if(frm.chrChk[i].checked)
					bPass = true;
			}
		}
		else
		{
			if(frm.chrChk.checked)
				bPass = true;
		}
	}

	veri = frm.bookChk;
	if(veri)
	{
		veri = frm.bookChk[0];
		if(veri)
		{
			for(i=0; i<frm.bookChk.length; i++)
			{
				if(frm.bookChk[i].checked)
					bPass = true;
			}
		}
		else
		{
			if(frm.bookChk.checked)
				bPass = true;
		}
	}

	veri = frm.pkgChk;
	if(veri)
	{
		veri = frm.pkgChk[0];
		if(veri)
		{
			for(i=0; i<frm.pkgChk.length; i++)
			{
				if(frm.pkgChk[i].checked)
					bPass = true;
			}
		}
		else
		{
			if(frm.pkgChk.checked)
				bPass = true;
		}
	}

	if(!bPass)
	{
		alert("결제하실 강좌 또는 교재를 선택하여 주십시요");
		return;
	}


	frm.action = '/mypage/payment/my_campus_direct_pay.asp';
	frm.submit();
}


function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}

/*********************************************************
* 이름 : MM_openBrWindow_Center
* INPUT : theURL - 팝업 URL, winName - 팝업 타이틀, features - 팝업 속성
* 설명 : 가운데 새창 열기
**********************************************************/
function MM_openBrWindow_Center(theURL,winName,features) { //v2.0
	var strTemp = features.split(", ");
	var strTemp2 = "";
	var strTempCount = strTemp.length;
	var chekStr = "";
	var findStr1 = "width";
	var findStr2 = "height";
	var features2 = "";
	var x = "";
	var u = "";

	for (i=0;i<strTempCount;i++) {
		chekStr = strTemp[i].replace(/\s/g, "");

		strTemp2 = chekStr.split("=")

		if (chekStr.indexOf(findStr1) != -1) {
			x = (screen.availWidth - strTemp2[1]) / 2;
			features2 = features2 + ", left="+ x;
		}

		if (chekStr.indexOf(findStr2) != -1) {
			y = (screen.availHeight - strTemp2[1]) / 2;
			features2 = features2 + ", top="+ y;
		}
	}
	window.open(theURL,winName,features+features2);
}


//------------------------------------------------------------------------------
// 수강후기 팝업창
//------------------------------------------------------------------------------
function gfPopPSList(sub_cd, dom_cd, tec_cd, chr_cd, idx)
{
    var url = "/pop/pop_post_list.asp?page=1&sub_cd="+sub_cd+"&dom_cd="+dom_cd+"&tec_cd="+tec_cd+"&best_flg=&chr_cd="+chr_cd;
    var win = window.open(url, "수강후기", "scrollbars=yes,toolbar=no,menubar=no,location=no,resizable=yes,width=625,height=658");
    win.focus();
}

//------------------------------------------------------------------------------
// 이북 열기
//------------------------------------------------------------------------------
function fOpenEbook(book_cd, tec_cd) {
	var url = 'http://img.megamd.co.kr/ls/ebook/book_preview/'+book_cd+'/ls_'+tec_cd+'_'+book_cd+'/view.htm';
	var win = window.open(url, 'ebook', 'scrollbars=yes,toolbar=yes,resizable=yes,width=1050,height=750,left=0,top=0');
	win.focus();
}

function launchCenter(url, name, height, width, scroll) {
    var str = "resizable=1,height=" + height + ",innerHeight=" + height;
    str += ",width=" + width + ",innerWidth=" + width;

    if (window.screen) {
        var ah = screen.availHeight - 30;
        var aw = screen.availWidth - 10;

        var xc = (aw - width) / 2;
        var yc = (ah - height) / 2;

        str += ",left=" + xc + ",screenX=" + xc;
        str += ",top=" + yc + ",screenY=" + yc;
    }
    str += ",scrollbars="+scroll;
    return window.open(url, name, str);
}

/******************************************************************
/* 모바일에서 PC버전 접속시
******************************************************************/
function player_mega_mobile2(view, mode, appno, chrcd, leccd, frtkbn, dngKbn, evtFlg){
//	alert('5');

	var vPlayerUrl;
	var vPlayerParam, vPlayerNm, vPlayerOption;

	vPlayerParam = "?APP_NO=" + appno + "&CHR_CD=" + chrcd + "&LEC_CD=" + leccd + "&view=" + view + "&FRT_KBN=" + frtkbn + "&mode="+ mode+"&kbn="+dngKbn;


	if (isIPHONE || isIPAD) {
		vPlayerParam += '&m_type=iOS';
	} else {
		vPlayerParam += '&m_type=Android';

		if (navigator.appVersion.lastIndexOf('Chrome') > 0) {
			vPlayerParam += '&b_type=Chrome';
		}
	}

	vPlayerNm = "DNGPlayer";
	vPlayerOption = "resizable=no, width=720, height=480, top=0, left=0";


	if (evtFlg == "Y") {
		vPlayerParam = vPlayerParam + "&ckey="+chrcd;
		vPlayerUrl = "/Player/kollusN/mPlayer/Player_Event_Normal.asp";
	} else {
		if (frtkbn == "0")
		{
			vPlayerUrl = "/Player/kollusN/mPlayer/Player_Normal.asp";
		}else {
			vPlayerUrl = "/Player/kollusN/mPlayer/Player_Frrt_Normal.asp";	
		}
	}

	if (mode == "M") {
		vPlayerParam = vPlayerParam + "&ckey="+chrcd;
		vPlayerUrl = "/Player/kollusN/mPlayer/Player_Event_Normal.asp";
	}




//	vPlayerOption = "resizable=yes, scrollbars=no,width=720,height=480,top=0,left=0";
//	window.open(vPlayerUrl + vPlayerParam, vPlayerNm, vPlayerOption);

	if (parseFloat(navigator.userAgent.substr(navigator.userAgent.lastIndexOf('Safari/') + 7, 7)) >= 601.1) {
		vPlayerParam += '&b_ver='+parseFloat(navigator.userAgent.substr(navigator.userAgent.lastIndexOf('Safari/') + 7, 7));
	}

	if (navigator.appVersion.lastIndexOf('Chrome') > 0 || parseFloat(navigator.userAgent.substr(navigator.userAgent.lastIndexOf('Safari/') + 7, 7)) >= 601.1) {
		window.location.href = vPlayerUrl + vPlayerParam;
	} else {

			var iMobilePlayifrm = document.getElementById("iMobilePlayifrm");
			if (iMobilePlayifrm != null) {
				iMobilePlayifrm.parentNode.removeChild(iMobilePlayifrm);
			}

			var AquaiFrm = document.createElement("iframe");
			AquaiFrm.setAttribute("id", "iMobilePlayifrm");
			AquaiFrm.setAttribute("src", vPlayerUrl + vPlayerParam);
			AquaiFrm.setAttribute("width", "0px");
			AquaiFrm.setAttribute("height", "0px");
			AquaiFrm.setAttribute("scrolling", "no");
			AquaiFrm.style.border = "0px";
			document.body.appendChild(AquaiFrm);
//				alert(vPlayerUrl + vPlayerParam);

		}

}


//Focus 함수
function fnGoFocus(type, type_nm, add_top) {
	if (type.toUpperCase() != 'ID') {
		var focus_id = '.'+ type_nm;
	} else {
		var focus_id = '#'+ type_nm;
	}

	//Target 고정 처리 S
	var intOffset = $(focus_id).offset();
	var intOffsetTop = intOffset.top - add_top;
	var intOffsetLeft = intOffset.left;

	$('body, html').stop();
	$('body, html').animate({ scrollTop: intOffsetTop }, "fast");
	//Target 고정 처리 E
}

//Focus 함수
function fnSetFocus(type, type_nm, add_top) {
    if (type.toUpperCase() != 'ID') {
        var focus_id = '.'+ type_nm;
    } else {
        var focus_id = '#'+ type_nm;
    }

    //Target 고정 처리 S
    var intOffset = $(focus_id).offset();
    var intOffsetTop = intOffset.top - add_top;
    var intOffsetLeft = intOffset.left;

    $('body, html').stop();
    $('body, html').animate({ scrollTop: intOffsetTop }, "slow");
    //Target 고정 처리 E
}


//플레이호출처리
function fncPlayerPageAx(areacd, strParam) {
	$('#' + areacd).load('/player/kollusN/ePlayer/ePlayer.asp?' + unescape(strParam));
}


/**
* kollus Player 모바일 전용플레이어 호출
*
* kollus Player 모바일 전용플레이어 연동 시 스트리밍, 다운로드 호출을 위한 method 입니다.
*
* @access	public
* @param	string		method		    스트리밍, 다운로드 구분 (path : 스트리밍, download : 다운로드
* @param	string		jwt     jwt 함수로 암호화된 스트링
* @param	string		custom_key     CMS의 설정페에지에 있는 사용자 키
* @return	void
*/
function call_player(method, jwt, mParam) {
	if (method == 'download'){
		var scheme_param = method + jwt + mParam;		
	} else {
		var scheme_param = method + '?url=https://v.kr.kollus.com/si?jwt=' + jwt + mParam;		
	}
	kollus_custom_scheme_call(scheme_param);
}

function kollus_custom_scheme_call(scheme_param) {
	var AppLoader = tui.AppLoader;
	var loader = new AppLoader();
	var osName = new UAParser().getResult().os.name;
		loader.exec({
			ios: {
				scheme: 'kollus://' + scheme_param,
				url: "https://itunes.apple.com/app/id760006888"
			},
			android: {
				intentURI: 'kollus://' + scheme_param
			},
			timerSet: {
				ios: 4000,
				android: 4000
			},
			etcCallback: function() {
				if (osName !== 'iOS' && osName !== 'Android') {
						alert('모바일 단말에서 실행하셔야 합니다.');
					}
				},
			notFoundCallback: function() {
				if (osName === 'iOS') {
					window.location.href = 'https://itunes.apple.com/app/id760006888';
				}
				else if(osName =='Android'){
					window.location.href = 'market://details?id=com.kollus.media';
				}
				//console.log('Not Found Application');
			}
		});
}

var cTitle = "메가변리사"
function fnCallPlayer(method, jwt, custom_key, mParam) {
	var scheme_param = method + '?url='+encodeURIComponent('http://v.kr.kollus.com/si?jwt=' + jwt+'&custom_key='+custom_key+mParam+'&title='+cTitle);
	window.location.href = 'kollus://' + scheme_param;
}


function goMoveLogin(url)
{
    
        alert('로그인을 하셔야 서비스 이용이 가능합니다.');
        popMemberInput('1');
        return;
    
}


	
		//]]>
	

//23.11.23 추가
$(function(){
	$('.js_tab_type li a').on('click', function (e) {
		var targetId = $(this).attr("href");
		e.preventDefault();
		$(this).parent('li').siblings().removeClass('on');
		$(this).parent('li').addClass('on');
		$(targetId).addClass('on').siblings().removeClass('on');
	});
	
	var paran = $("#footer").find(".family");
		var slide_cam = $(".family_list");
		$(".family").click(function(){
			
			paran.toggleClass("open");
			slide_cam.toggleClass("open");
		}, function(){
			paran.toggleClass("open");
			slide_cam.toggleClass("open");
		});
	
	$("body").click(function(e) {
		if (!$(e.target).closest(".family").length){
			paran.removeClass("open");
			slide_cam.removeClass("open");
		}
	});

	$('#head .btn_gnb').click(function(){
        if( $(this).hasClass('active')){
            $(this).removeClass('active');
            $('#head .sub4').removeClass('active').stop().slideUp(200);
        }else{
            $(this).addClass('active');
            $('#head .sub4').addClass('active').stop().slideDown(300);
        }
    });
    $('#head .btn_gnb_close').click(function(){
        $('#head .sub4').removeClass('active').stop().slideUp(200);
        $('#head .btn_gnb').removeClass('active');
    });

	var depth = $('.btn_nav_mock')
    $('#head .btn_myinfo').click(function(){
		$(this).toggleClass('on');
		$(this).siblings('.myinfo').toggleClass('on');

		if ($(this).hasClass("on")) {
            depth.removeClass('on')
        }
		
    });

    // 2022.06.15 gnb 수정
    $('#head .btn_exp').on('mouseenter', function(){
        $('#head .menu_exp').addClass('on');
        
        $('#head .btn_exp').on('mouseleave', function(){
            $('#head .menu_exp').removeClass('on');
        });
    });
	$('.menu_btn').hover(function(){ 
		$(this).addClass('on'); }, function(){ 
		$(this).removeClass('on');
	});

	var berger = $(".gnb").find(".gnb_item.mock");
	var depth = $(".btn_nav_mock");
	var contSub = $('#head .sub4')

		$(".btn_nav_mock").click(function(){
			berger.toggleClass("close");
			depth.toggleClass("on");
		}, function(){
			berger.toggleClass("close");
			depth.toggleClass("on");

			
			if ($(this).hasClass("on")) {
				$('#head .btn_gnb').removeClass('active')
				$('#head .sub4').removeClass('active').stop().slideUp(200);
			}
		});
		$("html").click(function(e) {
			if (!$(e.target).closest(".btn_nav_mock").length){
				berger.removeClass("close");
				depth.removeClass("on");
			}
		});
///	

})

//핫클립 레이어팝업 : 영상
function fnPlayMovie(vod_code){
    var position_top = $(this).scrollTop()+150;   //레이어 top 위치
    $('#layerPop').css({ top : position_top });
    url_text = encodeURI('https://www.youtube.com/embed/'+vod_code+'?autoplay=1&vq=hd1080&rel=0&start=0');

    if (vod_code == 99){
        $('#layerPop').fadeOut();
        $('#player_youtube').attr('src', '');
    } else {
        $('#layerPop').fadeIn();
        $('#player_youtube').attr('src', url_text);
    }
}
