const retirementFormPage = require('../pageobjects/retirementForm_PO')
const defaultCalValuesPage = require('../pageobjects/defCalValues_PO')
const calculatedResultPage = require('../pageobjects/resultsPage_po')
const expectchai = require('chai').expect
const formData = require('../testData/securianFin.json');
const personalData = formData.ageAndIncomeData;
const socialSecurityData = formData.socialSecurityData;
const defaultCalValuesData = formData.DefaultCalValuesData;


describe('Retirement Calculator Positive Test Scenarios', () => {

    it('should submit form with all required fields filled in', async () => {
        try {
            //Launch Retirement Calculator
            await retirementFormPage.launchSite()
            expectchai(await retirementFormPage.launchSite()).to.include('Securian Financial')

            //Fill in all required fields with valid data

            //Fill in Age and Required Income/Savings
            await retirementFormPage.fillFormWithData(personalData);

            if (socialSecurityData["Social Security Income"] === "Yes") {
                //Select Social Security Benefits
                await retirementFormPage.toggleONSocialSecurityBenefits();
                if (socialSecurityData["Relationship status"] === "Married") {
                    await retirementFormPage.selectMarriedRadioBtn();
                }
                await retirementFormPage.fillSocialSecurityOverride(socialSecurityData);
            }
            //Update Default Calculator Values
            await defaultCalValuesPage.goToDefaultCalValuesPage();
            await defaultCalValuesPage.updateDefCalValues(defaultCalValuesData);
            if (defaultCalValuesData["Post-retirement income increase with inflation"] === "Yes") {
                await defaultCalValuesPage.toggleONInflationRadioBtn();
                await defaultCalValuesPage.updateInflationRate(defaultCalValuesData);
            }
            await defaultCalValuesPage.saveUpdatedDefCalValues();


            //Verify Calculate Result button is clickable and Click on Calculate Results/Submit
            await retirementFormPage.calculateResultsBtn.waitForClickable();
            expectchai(await retirementFormPage.calculateResultsBtn.isClickable(), 'Calculate Result button is not clickable').to.be.true;
            await retirementFormPage.getCalculatedResult();
            expectchai(await retirementFormPage.errorMessage.isDisplayed(),'Invalid/Missing Required Field : '+await retirementFormPage.errorMessage.getText()).to.be.false;
            //Verify that the Retirement amount is calculated and displayed to the user
            await calculatedResultPage.waitForResultsToProcess();
            await calculatedResultPage.verifyReqRetirementAmntIsDisplayed();
            expectchai(await calculatedResultPage.verifyReqRetirementAmntIsDisplayed(), 'Required Retirement Amount is not displayed').to.be.true;
            await calculatedResultPage.verifyCurrentSavingsAmntIsDisplayed();
            expectchai(await calculatedResultPage.verifyCurrentSavingsAmntIsDisplayed(), 'Current Savings Amount is not Displayed').to.be.true;
            await calculatedResultPage.getreqRetirementAmntValue();
            await calculatedResultPage.getcurrentSavingsAmntValue();
            
        } catch (error) {
            console.log(error + ' : Test Case Name : should submit form with all required fields filled in');
            throw error;
        }

    });

    it('should toggle Social Security benefits and verify additional fields', async () => {
        try {
            //Launch Retirement Calculator
            await retirementFormPage.launchSite()
            expectchai(await retirementFormPage.launchSite()).to.include('Securian Financial')

            //Verify Social Security Radio Button and Toggle Social Security benefits switch to 'Yes'
            expectchai(await retirementFormPage.socialSecYESradioBtn.isClickable(), 'Social Security benefits YES button is not clickable').to.be.true;
            await retirementFormPage.toggleONSocialSecurityBenefits();

            //Verify Married Radio Button under Social Security and Select 'Married'
            await retirementFormPage.socialSecMarriedRadioBtn.waitForClickable();
            expectchai(await retirementFormPage.socialSecMarriedRadioBtn.isClickable(), 'Married Radio button is not clickable').to.be.true;
            await retirementFormPage.selectMarriedRadioBtn();

            //Verify the additional Social Security fields are displayed
            expectchai(await retirementFormPage.SocialSecOverrideAmnt.isDisplayed(), 'Social Security Amount Field is not displayed').to.be.true;

            // Toggle Social Security benefits switch to 'No' and Verify that the additional Social Security fields are hidden
            await retirementFormPage.toggleOFFSocialSecurityBenefits();
            expectchai(await retirementFormPage.SocialSecOverrideAmnt.isDisplayed(), 'Social Security Amount Field is displayed').to.be.false;
        } catch (error) {
            console.log(error + ' : Test Case Name : should toggle Social Security benefits and verify additional fields');
            throw error;
        }
    });

    it('should display default calculator values', async () => {
        try {
            //Launch Site
            await retirementFormPage.launchSite()
            expectchai(await retirementFormPage.launchSite()).to.include('Securian Financial')

            //Update Default Calculator Values
            expectchai(await defaultCalValuesPage.defCalValuesLink.isClickable(), 'Adjust Default Values link is not clickable').to.be.true;
            await defaultCalValuesPage.goToDefaultCalValuesPage();
            //Verify Default Calculator Values pop-up is displayed
            expectchai(await defaultCalValuesPage.additionalIncome.isDisplayed(), 'Default Calculator Values pop up is Not Dispalyed').to.be.true;
            expectchai(await defaultCalValuesPage.saveDefCalValuesBtn.isClickable(), 'Save/Submit button for Default Calculator Values is not clickable').to.be.true;
        } catch (error) {
            console.log(error + ' : Test Case Name : should display default calculator values');
            throw error;
        }
    });

    it('should check for post-retirement income increase with inflation', async () => {
        try {
            //Launch SIte
            await retirementFormPage.launchSite()
            expectchai(await retirementFormPage.launchSite()).to.include('Securian Financial')

            //Go To Default Calculator Values
            await defaultCalValuesPage.goToDefaultCalValuesPage();

            // Toggle Income Increase with Inflation switch to 'Yes' and verify expected inflation rate is displayed
            expectchai(await defaultCalValuesPage.includeInflationRadioBtn.isClickable(), 'Include Inflation rate radio button is not clickable').to.be.true;
            await defaultCalValuesPage.toggleONInflationRadioBtn();
            expectchai(await defaultCalValuesPage.expectedInflationRate.isDisplayed(), 'Expected Inflation rate field is not displayed').to.be.true;

            // Toggle Income Increase with Inflation switch to 'No' and verify expected inflation rate is not displayed
            await defaultCalValuesPage.toggleOFFInflationRadioBtn();
            expectchai(await defaultCalValuesPage.expectedInflationRate.isDisplayed(), 'Expected Inflation rate field is displayed').to.be.false;
        } catch (error) {
            console.log(error + ' : Test Case Name : should check for post-retirement income increase with inflation');
            throw error;
        }
    });
    it('should display error for submitting form with missing fields', async () => {
        try {
            //Launch Site
            await retirementFormPage.launchSite()
            expectchai(await retirementFormPage.launchSite()).to.include('Securian Financial')

            //Fill incomplete data
            await retirementFormPage.fillFormWithIncompleteData(personalData)

            //Click on Calculate Results/Submit
            await retirementFormPage.calculateResultsBtn.waitForClickable();
            await retirementFormPage.getCalculatedResult();

            //Verify that appropriate error messages are displayed
            expectchai(await retirementFormPage.errorMessage.isDisplayed(), 'Error message not displayed for blank required field').to.be.true;
        } catch (error) {
            console.log(error + ' : Test Case Name : should display error for submitting form with missing fields');
            throw error;
        }
    });
});
