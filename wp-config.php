<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'WordPress' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

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
define( 'AUTH_KEY',         '>MB`EtE[sFxv)2$_:3x5YyZzBtS8`9fop+4C~ fpV{%tjuJ-9Zi`//}5<bL86!Kg' );
define( 'SECURE_AUTH_KEY',  'u3>grR9O+AauMh+PKkh%[_*%BJ%{^%DIqK{zcDgDuWl.P#`#nnVBH+YzNIzy? `s' );
define( 'LOGGED_IN_KEY',    'AKW^BgAa5^@S)pJMx0&nIQI}B+|C#fM#tgC-,>9hk!aG#&t^2-w($CSN0{){tm,w' );
define( 'NONCE_KEY',        ':6jmC~%/^MG-DF-Q0OAA|2Fwh:c0*-jn0JXH6{4{_/_Xcy;q$M/L]*-#Zq?{#$y9' );
define( 'AUTH_SALT',        '$f[U? ktp:Jpj%tovnn-:6DwWAhLfA6@lb]-a1d35`bfM~9tTWlBP/02gUcmft<=' );
define( 'SECURE_AUTH_SALT', '21Hzi+)Gu<IDC4-X!Azz^^+z)bx;Nb23Pf_`vS^or]@zM7Ypw$fZb lE5wrQ,}Y!' );
define( 'LOGGED_IN_SALT',   'SP[P+<j1Ji|4xO=_Eu^PJ[1Te^v2&Bo1@nOK-)@`lZBB[Yb!!=la0_gPg:dUrpv/' );
define( 'NONCE_SALT',       'E}G!16fx[#dx1>WrQR`eY4=,#wDa%!]pmViF+KwR^ZNi(,SvqUwSgTzq?)Hd,doD' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
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
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
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
