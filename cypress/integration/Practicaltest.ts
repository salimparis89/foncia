import GooglePage from "../pageObjects/googlepage";
import Mainpage from "../pageObjects/Mainpage";
import ResultPage from "../pageObjects/ResultPage";

const feature = 'Search for a rent'


before(function () {
  cy.fixture('data.json').then(function (data) {
      this.data = data
  })
})

describe(feature,

  function () {

    it(feature , function () {

      //Delivery rules

    cy.mockCookie(this.data.cookiename, this.data.cookievalue)

            // visit manage
            cy.visit(GooglePage.googleUrl)

            //Search for website
            cy.get(GooglePage.searchTxt).type(this.data.keyword) 

            //launch search
            cy.get(GooglePage.searchBtn).first().click()

            //Check that the first result is "https://fr.foncia.com"

           cy.get(GooglePage.searchResultList).first().find(GooglePage.searchResultLink).invoke('text').then((link)=> {

           expect(link).to.eq(this.data.url)

           })


    //Navigate to the first website of the list
    cy.get(GooglePage.searchResultList).first().find(GooglePage.searchResultLink).click()

    //Accept cookies of the page
    cy.get(Mainpage.acceptCookiesBtn).click()

    //Open the project Dropdownlist
    cy.get(Mainpage.projectTypeDdlist).click()

    //Select the result of the radio btn
    cy.get(Mainpage.projectTypeResultRadioBtn).click()

    //Open the property type Dropdownlist
    cy.get(Mainpage.propertyTypeDdlist).click()

    //Select the result from the dropdown list
    cy.get(Mainpage.propertyTypeResultCbox).click()

    //Type the price 
    cy.get(Mainpage.priceTxt).type('1500')

    //Type the location
    cy.get(Mainpage.locationTxt).type('Paris')

    //Select the first location
    cy.get(Mainpage.firslocationResultArea).first().click()

    //Submit the search
    cy.get(Mainpage.submitBtn).click()
  
    //Check the title of the search result 
    cy.get(ResultPage.priceFilterArea).contains(this.data.price)

    //Check the city of the filter 
    cy.get(ResultPage.cityFilterArea).contains(this.data.location)

    //Check the price of the filter
    cy.get(ResultPage.searchTitleArea).contains(this.data.title)

    })

  })
