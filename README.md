# Recipe: Foundation for Email vamped for .NET infrastructure
- put emails.js in your gulp tasks.
- install packages: 
npm i --save-dev fs lazypipe inky gulp-load-plugins siphon-media-query yargs foundation-emails gulp-if gulp-replace gulp-rename run-sequence gulp-sourcemaps gulp-sass gulp-inline-css gulp-htmlmin
- add paths to gulp config file, chck if they are correct
- add require to gulp file, if needed:
require('./gulp-tasks/emails');
- add styles to styles folder: mail.scss
- add folder structure to your styles and be sure to include the files defines in mail.scss:
	9_email
		emails.settings
		foundation-emails
		emails.global
		...
- for reference how to write inky code: http://foundation.zurb.com/emails/docs/sass-guide.html#boilerplate
