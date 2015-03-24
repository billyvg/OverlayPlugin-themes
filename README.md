#OverlayPlugin Themes

## Usage
`git clone` or download the ZIP package to a directory (i.e. your ACT directory)

In ACT -> Plugins -> OverlayPlugin.dll settings, for URL, browse to the folder where you extracted the ZIP and then select the HTML file of your choice.

## Screenshots
### rdmty_compact_dps.html
<img src="https://photos-2.dropbox.com/t/2/AABWoG8R_9HLUrCZ1hZSFUCmseeXcAYja2Ge3E5APkB2mg/12/9236753/png/32x32/3/_/1/2/Screenshot%202015-03-24%2008.26.18.png/CJHiswQgASACIAMoASgC/T6uXBwcq9Ogh1kyr0O80PrDzClarCza4-RRIhEGM6_Y?size=1280x960" />

### rdmty_compact_dps_job_colors.html
<img src="https://photos-3.dropbox.com/t/2/AAC4bSRZeOmPedq-79aJrr-0NS4CTQTJroWRKT3vzPbXKw/12/9236753/png/32x32/3/_/1/2/Screenshot%202015-03-24%2008.23.47.png/CJHiswQgASACIAMoASgC/y3LISFl3cfznRyOX8MDPiR_3Er9ZMkl8cG_gy_J_glk?size=1280x960" />

## Contributing Your Own Layouts
In order to make it easier to maintain, as well as customize, let's try to standardize the layouts.
Let's split the HTML file into separate CSS and JS files (use `rdmty_compact_dps.html` as an example for now).  In In the future, `React` will probably be dropped in favor of something a bit more familiar (probably just templates using `handlebars`).

### Directory Structure
* `app` - Your JS application files (not third party libraries)
* `css` - CSS files
* `images` - Any image resources should be put in here
* `lib` - JS library files

### Naming
Give your `HTML` files a descriptive name, i.e. **your tag**_**description**.html
Use a single CSS and JS file for all of your similar themes.
`CSS` - **your tag**.css
`JS` - **your tag**.js

The user currently has only one interface to customize the layout from ACT (without modifying any files): selecting the HTML file.  Make the HTML file as descriptive as possible and try to not modify much code in the HTML file (besides customization variables and CSS/JS file names).  This way, if we were to get support for more customization options in ACT plugin, it would be easier to modify the themes for this.
