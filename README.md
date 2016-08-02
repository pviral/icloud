# Send e-mail from iCloud Mail App

## Scenario
1. Go to icloud.com
2. login using username/password
2. Click mail App
3. Compose an email and send it
4. Verify if email was sent successfully by looking into sent folder


## Setup Instruction
1. Unzip icloud.zip folder
2. update the username and password in config.json file under icloud/test/data
3. run `npm install --only=dev`
4. `npm test`

##Notes

1. I have assume you have Selenium standalone server install and running. If not then run following commands:

 `npm install -g selenium-standalone`

 `selenium-standalone install`

 `selenium-standalone start`
 
2. I have verify subject and email address
3. Setup Instruction assume you have webdriverio, mocha and spec-reporter install on your machines
