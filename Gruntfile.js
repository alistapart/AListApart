/*global module:false,require:false*/
module.exports = function(grunt) {

	var os = require('os'),
		isWindows = os.platform().indexOf('win') === 0; // watch out for `darwin`

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		banner: '/*! A List Apart - ' +
				'v<%= grunt.template.today("yyyymmdd") %>\n' +
				'Copyright © <%= grunt.template.today("yyyy") %> A List Apart */',
		criticalcss: {
			home: {
				options: {
					outputfile : '_dist/critical-home.css',
					filename : 'all.css',
					url : 'http://local.ala/?static=true'
				}
			}
		},
		cssmin: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			css_main: {
				src: [
					'<%= concat.css_main.dest %>'
				],
				dest: '<%= concat.css_main.dest %>'
			}
		},
		concat: {
			options: {
				banner: '<%= banner %>'
			},
			css_main: {
				src: [
					'site_assets/css/reset.css',
					'site_assets/css/style.css',
					'site_assets/css/sponsors.css',
					'site_assets/css/960-below.css',
					'site_assets/css/600-below.css'
				],
				dest: 'site_assets/css/all.dist.css'
			},
			js_main: {
				src: [
					'site_assets/js/libs/matchmedia.js',
					'site_assets/js/libs/picturefill.js',
					'site_assets/js/libs/breakpoints.js',
					'site_assets/js/libs/jquery-1.8.2.min.js',
					'site_assets/js/script.js'
				],
				dest: 'site_assets/js/all.dist.js'
			}
		}
	});

	grunt.registerTask( "default", [ "concat", "cssmin" ] )

	// grunt.registerTask( "default", [ "concat", "cssmin", "svgmin", "uglify", "grunticon", "shell:jekyllDev" ] );
	// grunt.registerTask( "css", [ "concat", "cssmin", "shell:jekyllDev" ] );
	// grunt.registerTask( "jekyll", [ "shell:jekyllDev" ] );

	// grunt.registerTask( "prod", [ "concat", "cssmin", "svgmin", "uglify", "grunticon", "shell:jekyllProd" ] );

};