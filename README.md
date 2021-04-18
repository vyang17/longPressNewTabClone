# longPressNewTabClone
clone of Long-Press-New-Tab extension originally by Kunihiro Ando, based on the [firefox extension](https://addons.mozilla.org/en-US/firefox/addon/long_press_new_tab/).

Some time in April 2021, the Long-Press-New-Tab extension in Chrome disappeared, citing a violation in the Chrome Web Store policy. While taking a look at the original chrome-extension code, the ownership of the redirection URLs embedded in JS files have changed, posing a possible privacy/security concern.

This extension is purely based off of the firefox extension (linked above) and contains no redirection services. The only modifications made were to its manifest file to provide support for Chromium based browsers.


## Installation Instructions
1. Download the code. Extract the zipped files to a new folder.
2. In Chrome, or a chromium-based browser, go to the Extensions page.
3. Toggle 'Developer Mode'. Three new buttons should appear.
4. Select 'Load unpacked'.
5. Browse to the new folder created earlier and confirm by clicking 'Select Folder'.
