var gulp = require('gulp'),
    config = require('../gulp-config.json'),//use the config file to define paths
    fs = require('fs'),
    lazypipe = require('lazypipe'),
    inky = require('inky'),//inky will rewrite foundation tags like <container> to <table> 
    plugins = require('gulp-load-plugins'),//use packages without having to endlessly requiring them
    siphon = require('siphon-media-query'),//extract media query specific css from stylesheet
    runsequence = require('run-sequence'),
    yargs = require('yargs'),//parse arguments and options
    path = require('path');

//what a nag to have to keep writing plugins.
var $ = plugins();

// use --production flag when building for production
var PRODUCTION = !!(yargs.argv.production);

gulp.task('email', function (callback) { runsequence('email-styles', 'email-inline'), callback });

//SASS to CSS
gulp.task('email-styles', function () {
    //bootstrap file for mail styles
    return gulp.src(config.emaiFiles.stylesSrc)
        .pipe($.if(!PRODUCTION, $.sourcemaps.init())) //when not in production, give me maps
        .pipe($.sass({
            errLogToConsole: true,
            //include foundation for email styles for responsive and bulletproof emails
            includePaths: ['node_modules/foundation-emails/scss']
        }).on('error', $.sass.logError))
        .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
        .pipe(gulp.dest(config.emailFiles.buildRoot + config.emailFiles.stylesDest));
});

// Inline CSS and minify HTML
gulp.task('email-inline', function () {
    //here are the files we want inlined
    return gulp.src(config.emailFiles.buildRoot + config.emailFiles.viewFiles)
        .pipe($.rename(function (path) {
            path.basename = path.basename.replace('.inky', '');
        }))
        .pipe(inky())
        .pipe($.if(PRODUCTION, inliner(config.emailFiles.buildroot + config.emailFiles.stylesDest + config.emailFiles.stylesName)))
        //files should be done once written to dest.
        .pipe(gulp.dest( config.emailFiles.buildRoot + config.emailFiles.viewDest));
});


// Inlines CSS into HTML, adds media query CSS into the <style> tag of the email, and compresses the HTML
function inliner(css) {
    var css = fs.readFileSync(css).toString(),
        mqCss = siphon(css),
        newCss = mqCss.replace(/@/g, '@@'),// to prevent conflicts with @ of .net
        pipe = lazypipe()
                .pipe($.inlineCss, {
                    extraCss: css,
                    lowerCaseTags: false,
                    xmlMode: false
                    })
                .pipe($.replace, '<!-- <style> -->', '<style>' + newCss + '</style>');

    return pipe();
}
