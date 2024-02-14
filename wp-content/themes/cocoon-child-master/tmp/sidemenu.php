<link rel="stylesheet" href="/wp-content/themes/cocoon-child-master/tmp/sidemenu.css" type="text/css">

<nav id="common_sidemenu">
 
 <div class="sm_outer mrspot">
  
  <div class="sm_header">
   
   <div class="sm_logo">
    <a href="/">
     <div class="sm_logo_button_sp"><img src="/wp-content/uploads/2024/01/logo_spot.png" alt="Mrスポット"></div>
    </a>
   </div>
   
   <div class="sm_spacer">
   </div>
   
   <div class="sm_menuclose">
    <a onclick="menu_slideout();">
     <div class="sm_menuclose_button_pc"><i class="fas fa-times menuclose_icon"></i> <span class="menuclose_text">閉じる</span></div>
     <div class="sm_menuclose_button_sp sp_button"><i class="fas fa-times menuclose_icon sp_icon"></i><span class="menuclose_text sp_text">閉じる</span></div>
    </a>
   </div>
   
  </div>
  
	  <?php /* ?>
  <div class="sm_body">
   <ul class="sm_list">
	   <li><a href="/#voice">お客様の声</a></li>
	   <li><a href="/#point_pc" class="hide_sp">選ばれる３つのポイント</a></li>
	   <li><a href="/#point_sp" class="hide_pc">選ばれる３つのポイント</a></li>
	   <li><a href="/#step_pc" class="hide_sp">スピード申請５ステップ</a></li>
	   <li><a href="/#step_sp" class="hide_pc">スピード申請５ステップ</a></li>
	   <li><a href="/#service_pc" class="hide_sp">主なサービス内容</a></li>
	   <li><a href="/#service_sp" class="hide_pc">主なサービス内容</a></li>
	   <li><a href="/#jimusyo_pc" class="hide_sp">事務所案内</a></li>
	   <li><a href="/#jimusyo_sp" class="hide_pc">事務所案内</a></li>
	   <li><a href="/category/kyoka_magazine/">建設業許可マガジン</a></li>
	   <li><a href="/category/お知らせ/">お知らせ</a></li>
   </ul>
  </div>
<?php */ ?>
  
  <div class="sm_footer">
	  
   <div class="sm_footer_telbutton">
    <div class="sm_tel">
     <a href="tel:0120968631">
      <div class="sm_tel_button_pc"><img src="/wp-content/uploads/2024/01/top_tel.png" alt="0120968631"></div>
     </a>
    </div>
   </div>
   
	  <?php /* ?>
   <div class="sm_footer_buttons">
    <div class="sm_mypage">
     <a href="/mypage/index.php">
      <div class="sm_mypage_button_pc"><i class="fas fa-user-lock mypage_icon"></i> <span class="mypage_text">マイページログイン</span></div>
     </a>
    </div>
	  
   </div>
<?php */ ?>
   
  </div>
  
 </div>
 
</nav>

<script>
 jQuery(function($){
  $('#common_sidemenu').addClass('hide');

  $('.sm_list a').click(function(){ menu_slideout(); });
 });
 function menu_slidein(){
  jQuery('#common_sidemenu').removeClass('hide');
  jQuery('#common_sidemenu').addClass('show');
 }
 function menu_slideout(){
  jQuery('#common_sidemenu').removeClass('show');
  jQuery('#common_sidemenu').addClass('hide');
 }
</script>

