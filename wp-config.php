<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'rjc_wp9' );

/** Database username */
define( 'DB_USER', 'rjc_wp9' );

/** Database password */
define( 'DB_PASSWORD', 'I]NUt^Aqd^QuCsluh).12[(0' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'HZmaQCB4pUoDjKwC9LZzaVSawxuQsGh1unPPOUVP4oPn6Q0Vi4XuTF7Anep00kcX');
define('SECURE_AUTH_KEY',  '04JcYAhEAMRwTSJHf9YMPNyW0Tx061W34aFTMGC3BaIX7EHDkAv2C0mmP5ufRnw6');
define('LOGGED_IN_KEY',    'gvZgyytEUGoyFk6nseCV887NFlB4QHL6h7Mw4GM2MxPRIDQIPYQZUIANGPnXyGly');
define('NONCE_KEY',        '2HskkcMF17eAuG6TbgXHDi8t83NzVuNLwu9aE1o9XLLVfOm4bZix4ieHSAfNe5cN');
define('AUTH_SALT',        'oLngRmfi8ObKoKB1Y2eIlAQUy4DISkN3Y0SOdkEWNpRD8KCipaWY62QOaU91AGNo');
define('SECURE_AUTH_SALT', '5N3oaXRCj2f9pGFj1ZGrO4tJUZQnc7YdQfhR7nv82HaP0mEDO76y14tHhSbbz3Hl');
define('LOGGED_IN_SALT',   'EGYi5LLgjwdYHtyilo8mbZC9jeTqbqtCsXLARmTZqyeLsa7LbhI7tSkwdppPzUBM');
define('NONCE_SALT',       'pl9eXC8PDRcBFyTveGG5fygM60yXeKLtUqAacODDzfnoVqC87Oi2uiOzVnvslgQi');

/**
 * Other customizations.
 */
define('WP_TEMP_DIR',dirname(__FILE__).'/wp-content/uploads');


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
