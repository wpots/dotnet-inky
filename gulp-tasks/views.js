module.exports = (config, gulp, browserSync) => {
	/* just a basic copy action for now */
	gulp.task('copy-views', () => {
	  return gulp.src(config.path.views)
	    .pipe(gulp.dest(config.path.dist + 'views/'))
	    .pipe(browserSync.stream());
	});
}