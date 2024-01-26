<?php
session_start();
header("Content-type: text/html;charset=utf-8");
require_once('Mobile_Detect.php');

// 各ページから遷移したときに全てのPOST項目をSESSIONに保存する
   $params = array('kaisyamei','tantou_sei','tantou_mei','tantou_furi_sei','tantou_furi_mei','tel1','tel2','tel3','email','pref','kento1','kento2','kento3','kento4','kento5');
   // データを取得する ＋ 必須入力のvalidate
   foreach($params as $p) {
       if(isset($_POST[$p])){
        $_SESSION[$p] = (string)@$_POST[$p];
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
  $_SESSION['kento'] = '';
  for($i=1;$i<=5;$i++){
   if($_SESSION['kento'.$i] != ''){
    if($_SESSION['kento'] != ''){
     $_SESSION['kento'] .= ';';
    }
    $_SESSION['kento'] .= $_SESSION['kento'.$i];
   }
  }
  
  web2case_kaisya($_SESSION);
  
  session_write_close();
		header('Location: https://www.mr-spot.jp/done/');
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
'recordType'=>'012RA0000013H3l',
'LastName__c'=>urlencode($items['kaisyamei']),
'Tantousya__c'=>urlencode($items['tantou_sei'].' '.$items['tantou_mei']),
'TantousyaFuri__c'=>urlencode($items['tantou_furi_sei'].' '.$items['tantou_furi_mei']),
'Phone__c'=>urlencode($items['tel1'].'-'.$items['tel2'].'-'.$items['tel3']),
'Email__c'=>urlencode($items['email']),
'Prefectures__c'=>urlencode($items['pref']),
'kento__c'=>urlencode($items['kento']),
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
