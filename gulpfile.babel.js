'use strict';

const 	config 			 = require('./gulp-config.json'),
		gulp             = require('gulp'),
		//temp solution until gulp 4 providing series and parallels
		runSequence      = require('run-sequence');

require('./gulp-tasks/views')(config, gulp);
require('./gulp-tasks/emails');

gulp.task('build', (callback) => {
  	runSequence('copy-views',
                'email'
              callback);
});


gulp.task('default',  () => {
	gulp.start('build');
});

gulp.task('watch', () => {
	gulp.watch([config.path.source + 'styles/**/*'], ['scsslint', 'styles']);
	gulp.watch(['../Views/**/*'], ['copy-views']);
});
