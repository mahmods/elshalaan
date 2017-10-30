let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/app.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css')
   .styles([
   		'resources/assets/css/tornado-rtl.css',
   		'resources/assets/css/animations.css',
   		'resources/assets/css/theme.css'
   	], 'public/css/style.css')
   .scripts([
   		'resources/assets/js/style/jquery.min.js',
   		'resources/assets/js/style/tornado.js',
   		'resources/assets/js/style/script.js'
   	], 'public/js/style.js')
   .copyDirectory('resources/assets/img', 'public/img')
   .copyDirectory('resources/assets/css/fonts', 'public/css/fonts');
