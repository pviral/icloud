var assert = require('assert');
var config = require('./data/config.json');

describe('iCloud Mail App', () => {
    it('should verify email is sent successfully', (done) => {
        browser
            .url('/') // default url is icloud.com
            .pause(4000); // wait for page to load

            // get login iframe
            var loginFrameValue = browser.element('iframe[id="auth-frame"]').value;
            var loginFrame = browser.frame(loginFrameValue);

            // enter username n password
            loginFrame.element('body #appleId').setValue(config.username);
            loginFrame.element('body #pwd').setValue(config.password);
            loginFrame.click('body #sign-in');

            //wait for home page to load
            browser.pause(4000);
            var mailIconElem = browser.element("a[href*='#mail']");
            mailIconElem.waitForExist(6000);
            mailIconElem.click();

            //wait for mail app to load
            browser.pause(4000);
            var composeFrameValue = browser.element('iframe[name="mail"]').value;
            var mailIframe = browser.frame(composeFrameValue);

            //click on compose icon and wait for new popoup
            mailIframe.click('body #toolbar-compose');
            browser.pause(5000);

            // switch to compose popup window
            var composeWindow = browser.windowHandles().value;
            browser.switchTab(composeWindow[1]);

            // add to, subject text and click send button
            browser.element('#to-field > span.compose-token-item').keys(config.sendTo);
            browser.element('input[name="subject-field"]').setValue(config.subject);
            browser.click('#toolbar-send');

            // switch back to original window
            browser.pause(3000);
            composeWindow = browser.windowHandles().value;
            browser.switchTab(composeWindow[0]);

            composeFrameValue = browser.element('iframe[name="mail"]').value;
            mailIframe = browser.frame(composeFrameValue);

            //click Sent item from left navigation
            mailIframe.click('body #sc2564-3');
            //wait for sent list to load
            browser.pause(4000);
            var senderEmail = mailIframe.element('body div[aria-label*=Messages] .sc-list-view div:first-child .sender').getText();
            var subjectText = mailIframe.element('body div[aria-label*=Messages] .sc-list-view div:first-child .subject').getText();

            //ASSERT
            assert.equal(senderEmail, config.sendTo);
            assert.equal(subjectText, config.subject);
    });
});
