<?php
session_start();
header("Content-type: text/html;charset=utf-8");
require_once('Mobile_Detect.php');

// 各ページから遷移したときに全てのPOST項目をSESSIONに保存する
   $params = array('kaisyamei','tantou_sei','tantou_mei','tantou_furi_sei','tantou_furi_mei','tel1','email','pref','shime','shiharai','houjinbango');
   // データを取得する ＋ 必須入力のvalidate
   foreach($params as $p) {
       if(isset($_POST[$p])){
        $_SESSION[$p] = (string)@$_POST[$p];
       } else {
        $_SESSION[$p] = '';
       }
   }

$detect = new Mobile_Detect;
 
		$device = 'PC';
		if($detect->isMobile()){
			$device = 'スマホ';
		}

switch($_POST['pagename']){

 case 'top':
 {

  $_SESSION['Device__c'] = $device;
  
  web2case_kaisya($_SESSION);
  
  session_write_close();
		header('Location: https://www.mr-spot.jp/36done/');
  exit;
		break;
	}
	default:
	{
		echo '不明なページからのアクセスです';
		break;
	}
}

// https://www.synergy-marketing.co.jp/cloud/synergylead/support/faq-salesforce-web-to-case-on-php/
function web2case_kaisya($items) {
 
/* 本番 */
$url = 'https://webto.salesforce.com/servlet/servlet.WebToCase?encoding=UTF-8';
// Salesforceの組織ID
$oid = '00D7F0000001NoF';
 
$fields = array(
// Salesforceへのパラメーター
'orgid' => $oid,
'retURL' => '',
'Device__c'=>urlencode($items['Device__c']),
'recordType'=>'012RA000001AuBd',
'LastName__c'=>urlencode($items['kaisyamei']),
'Tantousya__c'=>urlencode($items['tantou_sei']),
'TantousyaFuri__c'=>urlencode($items['tantou_furi_sei']),
'Phone__c'=>urlencode($items['tel1']),
'Email__c'=>urlencode($items['email']),
'Prefectures__c'=>urlencode($items['pref']),
'shimebi__c'=>urlencode($items['shime']),
'shiharaibi__c'=>urlencode($items['shiharai']),
'houjinbango__c'=>urlencode($items['houjinbango']),
'Bumon__c'=>urlencode('TM'),

//'debug' => '1',
//'debugEmail' => urlencode("xxx@xxxx"),
);
foreach($fields as $key=>$value) { $fields_string .= $key.'='.$value.'&'; }
rtrim($fields_string,'&');
 
$ch = curl_init();
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST,count($fields));
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
curl_setopt($ch, CURLOPT_POSTFIELDS,$fields_string);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
 
$result = curl_exec($ch);
curl_close($ch);
return $result;
}

?>
