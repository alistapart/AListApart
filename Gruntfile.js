/*global module:false,require:false*/
module.exports = function(grunt) {

	var os = require('os'),
		isWindows = os.platform().indexOf('win') === 0; // watch out for `darwin`

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		domain: 'local.ala',
		banner: '/*! A List Apart - ' +
				'v<%= grunt.template.today("yyyymmdd") %>\n' +
				'Copyright © <%= grunt.template.today("yyyy") %> A List Apart */',
		criticalcss: {
			article: {
				options: {
					outputfile : 'site_assets/css/dist/critical-article.css',
					filename : 'all.dist.css',
					url : 'http://<%= domain %>/article/responsive-web-design?page_static=true'
				}
			},
			home: {
				options: {
					outputfile : 'site_assets/css/dist/critical-home.css',
					filename : 'all.dist.css',
					url : 'http://<%= domain %>/?page_static=true'
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
			js_initial: {
				src: [
					'site_assets/js/libs/modernizr-custom.js',
					'site_assets/js/initial.js'
				],
				dest: 'site_assets/js/dist/initial.js'
			},
			js_main: {
				src: [
					'site_assets/js/libs/jquery-1.8.2.min.js',
					'site_assets/js/libs/matchmedia.js',
					'site_assets/js/libs/picturefill.js',
					'site_assets/js/libs/breakpoints.js',
					'site_assets/js/script.js'
				],
				dest: 'site_assets/js/dist/main.js'
			},
			js_full: {
				src: [
					'<%= concat.js_initial.dest %>',
					'<%= concat.js_main.dest %>'
				],
				dest: 'site_assets/js/dist/full.js'
			}
		},
		watch: {
			all: {
				files: [
					'!site_assets/css/dist/**/*',
					'!site_assets/js/dist/**/*',
					'!<%= concat.css_main.dest %>',
					'!<%= concat.js_main.dest %>',
					'site_assets/css/**/*',
					'site_assets/js/**/*'
					],
				tasks: 'default'
			},
			grunt: {
				files: ['Gruntfile.js'],
				tasks: []
			}
		}
	});

	grunt.registerTask( "default", [ "concat", "cssmin", "criticalcss" ] )

	// grunt.registerTask( "default", [ "concat", "cssmin", "svgmin", "uglify", "grunticon", "shell:jekyllDev" ] );
	// grunt.registerTask( "css", [ "concat", "cssmin", "shell:jekyllDev" ] );
	// grunt.registerTask( "jekyll", [ "shell:jekyllDev" ] );

	// grunt.registerTask( "prod", [ "concat", "cssmin", "svgmin", "uglify", "grunticon", "shell:jekyllProd" ] );

};