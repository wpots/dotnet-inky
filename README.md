# .Net-Inky 
Through the use of self introduced .inky.cshtml files you can use the automated Foundation for Emails workflow in a .Net environment. 
https://talkabout.pettico.de/email-is-easy/

## Usage

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

## Features

### Ignore Tags

There might be snippets of code where you want inky to back off. Inky loves to close tags, but c# **<TagsThatShouldNotBeClosed>** need to be left as is. Wrap this piece of code in **<ignore> ingnore tags</ignore>**
and it will be skipped in the inky processing.


## Todo

### Framework independent
 - add framework options (e.g. MJML ).

### Watch Files
- there is no view files implemented at this point, assuming you already have this in your main gulp tasks. A seperate watch for emails would be useful to kick in the email task to make it more modular.
