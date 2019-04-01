'use strict';
/**
 * Gulp File Config
 *
 * @package @@pkg.name
 * @version @@pkg.version
 * @author  @@pkg.author
 */
/**
 * Load node dependencies
 */
var gulp         = require( 'gulp' );
var sass         = require( 'gulp-sass' );
var uglify       = require( 'gulp-uglify' );
var include      = require( "gulp-include" );
var livereload   = require( 'gulp-livereload' );
var plumber      = require( 'gulp-plumber' );
var autoprefixer = require( 'gulp-autoprefixer' );
var environments = require( 'gulp-environments' );

/**
 * Environments Types
 *
 * @since   1.0.0
 * @version 1.0.0
 */
var development = environments.development;
var production  = environments.production;

environments.current( development );

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Core Css
 *
 * @since   1.0.0
 * @version 1.0.0
 */
gulp.task( 'frontend', function() {
	return gulp.src( ['./style.scss'] )
		.pipe( plumber() )
		.pipe( development( sass().on( 'error', sass.logError ) ) )
		.pipe( production( sass( { outputStyle: 'compressed' } ).on( 'error', sass.logError ) ) )
		.pipe( autoprefixer() )
		.pipe( gulp.dest( './' ) )
		.pipe(livereload());
} );

/**
 * Static Server + watching
 *
 * @since   1.0.0
 * @version 1.0.0
 */
gulp.task( 'style',
	[ 'frontend'],
	function() {
		livereload.listen();

		gulp.watch( ['./**/*.scss'], ['frontend']);

	}
);