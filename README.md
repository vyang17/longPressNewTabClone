# longPressNewTabClone
clone of Long-Press-New-Tab extension originally by Kunihiro Ando, based on the [firefox extension](https://addons.mozilla.org/en-US/firefox/addon/long_press_new_tab/).

Some time in April 2021, the Long-Press-New-Tab extension in Chrome disappeared, citing a violation in the Chrome Web Store policy. While taking a look at the original chrome-extension code, the ownership of the redirection URLs embedded in JS files have changed, posing a possible privacy/security concern.

This extension is purely based off of the firefox extension (linked above) and contains no redirection services.


## Installation Instructions
1. Download the code. Extract the zipped files to a new folder.
2. In Chrome, or a chromium-based browser, go to the Extensions page.
3. Toggle 'Developer Mode'. Three new buttons should appear.
4. Select 'Load unpacked'.
5. Browse to the new folder created earlier and confirm by clicking 'Select Folder'.


## Changelog

### 2022-05-29 (v5.0)
- Update to Manifest Version 3
    - Chrome may display some errors (attributed to my lack of knowledge on async methods, but core functionality should be same as v4.1
- Options UI
    - Dark background
    - Change font
    - Increase font size
    - Change font color of headers to blue
    - Make long-press duration slider update its value in realtime
    - Reduce Long-press duration wait time to 200ms
    - Reduce max duration from 3000ms to 1000ms

### 2021-08-23 (v4.1)
- Add new feature: Open Tab Next To Current
  - Multiple new tabs from the same opener tab will be appended
- Reduce Long-press duration wait time to 250ms
- Remove unnecessary options
