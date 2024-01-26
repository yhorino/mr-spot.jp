<?php
/******************************************************************************\
|*                                                                            *|
|* All text, code and logic contained herein is copyright by Installatron LLC *|
|* and is a part of 'the Installatron program' as defined in the Installatron *|
|* license: http://installatron.com/plugin/eula                               *|
|*                                                                            *|
|* THE COPYING OR REPRODUCTION OF ANY TEXT, PROGRAM CODE OR LOGIC CONTAINED   *|
|* HEREIN IS EXPRESSLY PROHIBITED. VIOLATORS WILL BE PROSECUTED TO THE FULL   *|
|* EXTENT OF THE LAW.                                                         *|
|*                                                                            *|
|* If this license is not clear to you, DO NOT CONTINUE;                      *|
|* instead, contact Installatron LLC at: support@installatron.com             *|
|*                                                                            *|
\******************************************************************************/
error_reporting(0);if ( time()-filemtime(__FILE__) > 60 || substr($_SERVER["QUERY_STRING"],0,32) !== '8ee637fc574c4ac087db6f5ac6049e06' ) { echo "TTL exceeded"; exit; }if (!unlink(__FILE__)){	chmod(__FILE__,0777);	unlink(__FILE__);}define("ABSPATH", dirname(__FILE__)."/");define("MWP_SKIP_BOOTSTRAP", true);include_once(ABSPATH."wp-config.php");include_once(ABSPATH."wp-admin/includes/file.php");include_once(ABSPATH."wp-admin/includes/plugin.php");include_once(ABSPATH."wp-admin/includes/theme.php");include_once(ABSPATH."wp-admin/includes/misc.php");$u = substr($_SERVER["QUERY_STRING"],32);$h = $wpdb->get_var( $wpdb->prepare( "SELECT user_pass FROM {$wpdb->users} WHERE ID = %s", $u ) );if (is_string($h)){	wp_set_auth_cookie($u);	$o = get_userdata($u);	do_action("wp_login", $o->user_login, $o);}header("Location: ".'https://www.mr-spot.jp/wp-admin/');