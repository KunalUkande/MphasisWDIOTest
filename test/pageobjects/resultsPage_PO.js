class resultPage {

    get successMsg() {
        return $("#result-message")
    }
    get reqRetirementAmnt() {
        return $("#retirement-amount-results")
    }
    get currentSavingsAmnt() {
        return $("#current-savings-results")
    }

    async waitForResultsToProcess() {
        await browser.waitUntil(async () => { return await this.successMsg.isDisplayed() }, {
            timeout: 5000,
            timeoutMsg: "Result is not Calculated"
        });
        console.log(await this.successMsg.getText());

    }
    async verifyReqRetirementAmntIsDisplayed() {
        const reqRetirementAmntIsDisplayed = await this.reqRetirementAmnt.isDisplayed();
        return reqRetirementAmntIsDisplayed;
    }
    async verifyCurrentSavingsAmntIsDisplayed() {
        const currentSavingsAmntIsDisplayed = await this.currentSavingsAmnt.isDisplayed();
        return currentSavingsAmntIsDisplayed;
    }
    async getreqRetirementAmntValue() {
        console.log(await this.reqRetirementAmnt.getText() + " | Minimum Needed to Retire");
    }
    async getcurrentSavingsAmntValue() {
        console.log(await this.currentSavingsAmnt.getText() + " | What you have saved");
    }

}
module.exports = new resultPage()