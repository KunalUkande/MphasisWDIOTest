class RetirementCalculatorPage {

    get currentAge() {
        return $("#current-age")
    }
    get retirementAge() {
        return $("#retirement-age")
    }
    get currentIncome() {
        return $("#current-income")
    }
    get currentTotalSavings() {
        return $("#current-total-savings")
    }
    get spouseIncome() {
        return $("#spouse-income")
    }
    get currentAnnualSavings() {
        return $("#current-annual-savings")
    }
    get savingsIncreaeRate() {
        return $("#savings-increase-rate")
    }
    get socialSecYESradioBtn() {
        return $("//label[@for='yes-social-benefits']")
    }
    get socialSecNOradioBtn() {
        return $("//label[@for='no-social-benefits']")
    }
    get socialSecMarriedRadioBtn() {
        return $("//label[@for='married']")
    }
    get SocialSecOverrideAmnt() {
        return $("#social-security-override")
    }
    get calculateResultsBtn() {
        return $("//button[contains(@onclick,'calculateResults')]")
    }
    get errorMessage() {
        return $('#calculator-input-alert-desc')
    }
    

    async launchSite() {
        await browser.url("/insights-tools/retirement-calculator.html");
        await browser.maximizeWindow();
        const siteTitle = await browser.getTitle();

        return siteTitle;
    }
    async fillFormWithIncompleteData(personalData) {
        //Fill In Data required for Age
        await this.currentAge.setValue(personalData["Current Age"]);
        await this.retirementAge.setValue(personalData["Retirement Age"]);
    }


    async fillFormWithData(personalData) {
        //Fill In Data required for Age
        await this.currentAge.setValue(personalData["Current Age"]);
        await this.retirementAge.setValue(personalData["Retirement Age"]);
        //Fill in Required Income/Savings
        await this.currentIncome.click();
        await this.currentIncome.setValue(personalData["Current annual income"]);
        await this.spouseIncome.click();
        await this.spouseIncome.setValue(personalData["Spouse annual income"]);
        await this.currentTotalSavings.click();
        await this.currentTotalSavings.setValue(personalData["Current retirement savings"]);
        await this.currentAnnualSavings.setValue(personalData["Current retirement contribution"]);
        await this.savingsIncreaeRate.setValue(personalData["Annual retirement contribution increase"]);
    }

    async toggleONSocialSecurityBenefits() {
        await this.currentAge.scrollIntoView();
        await this.socialSecYESradioBtn.click();
    }

    async selectMarriedRadioBtn() {
        await this.socialSecMarriedRadioBtn.waitForClickable();
        await this.socialSecMarriedRadioBtn.click();
    }
    
    async fillSocialSecurityOverride(socialSecurityData) {
        await this.SocialSecOverrideAmnt.waitForClickable();
        await this.SocialSecOverrideAmnt.click();
        await this.SocialSecOverrideAmnt.setValue(socialSecurityData["Social Security Override"]);
    }
    async toggleOFFSocialSecurityBenefits() {
        await this.currentAge.scrollIntoView();
        await this.socialSecNOradioBtn.click();
        await this.SocialSecOverrideAmnt.waitForDisplayed({reverse:true})
    }
    async getCalculatedResult() {
        await this.calculateResultsBtn.click();
    }


}

module.exports = new RetirementCalculatorPage()