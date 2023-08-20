class defaultCalValuesUpdatePage {

    get defCalValuesLink() {
        return $("//a[@data-target='#default-values-modal']")
    }
    get additionalIncome() {
        return $('#additional-income')
    }
    get retirementDuration() {
        return $('#retirement-duration')
    }
    get retirementAnnualIncome() {
        return $('#retirement-annual-income')
    }
    get preRetirementROI() {
        return $('#pre-retirement-roi')
    }
    get postRetirementROI() {
        return $('#post-retirement-roi')
    }
    get saveDefCalValuesBtn() {
        return $("//button[contains(@onclick,'savePersonalizedValues')]")
    }
    get includeInflationRadioBtn() {
        return $("//label[@for='include-inflation']")
    }
    get excludeInflationRadioBtn() {
        return $("//label[@for='exclude-inflation']")
    }
    
    get expectedInflationRate() {
        return $('#expected-inflation-rate')
    }

    async goToDefaultCalValuesPage() {
        await this.defCalValuesLink.waitForClickable();
        await this.defCalValuesLink.click();
        await this.additionalIncome.waitForDisplayed();

    }
    async goToDefaultCalValuesPage() {
        await this.defCalValuesLink.waitForClickable();
        await this.defCalValuesLink.click();
        await this.additionalIncome.waitForDisplayed();

    }
    async updateDefCalValues(defaultCalValuesData) {
        await browser.pause(1000);
        await this.additionalIncome.click();
        await this.additionalIncome.setValue(defaultCalValuesData["Additional/other income"]);
        await this.retirementDuration.setValue(defaultCalValuesData["Number of years retirement needs to last"]);
        await this.retirementAnnualIncome.setValue(defaultCalValuesData["Percent of final annual income desired"]);
        await this.preRetirementROI.setValue(defaultCalValuesData["Pre-retirement investment return"]);
        await this.postRetirementROI.setValue(defaultCalValuesData["Post-retirement investment return"]);
    }

    async toggleONInflationRadioBtn() {
        await this.includeInflationRadioBtn.waitForClickable();
        await this.includeInflationRadioBtn.click();
    }
    async updateInflationRate(defaultCalValuesData) {
        await this.expectedInflationRate.waitForClickable();
        await this.expectedInflationRate.setValue(defaultCalValuesData["Expected Inflation Rate"]);
    }
    async toggleOFFInflationRadioBtn() {
        await this.excludeInflationRadioBtn.waitForClickable();
        await this.excludeInflationRadioBtn.click();
        await this.expectedInflationRate.waitForDisplayed({reverse:true})
    }
    async saveUpdatedDefCalValues() {
        // await this.saveDefCalValuesBtn.scrollIntoView();
        await this.saveDefCalValuesBtn.waitForClickable();
        await this.saveDefCalValuesBtn.click();
    }

    
}
module.exports = new defaultCalValuesUpdatePage()