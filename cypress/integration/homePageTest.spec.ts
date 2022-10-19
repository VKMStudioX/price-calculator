
describe('homepage happy path form', () => {
  let formData

  beforeEach(() => {
    cy.fixture('homePageFormData').then((data) => {
      formData = data
    })
    cy.visit(Cypress.env('baseUrl'))
  })

  it('should be able to fill the form', () => {
    cy.url().should('eq', Cypress.env('baseUrl'))

    cy.get('.header__text').should('have.text', formData.headerText)

    cy.get('#description').type(formData.description, { force: true })

    cy.get('#sendConfirmationOption1').first().click({ force: true })
    
    cy.get('.multiselect__select').first().click({ force: true })
    
    cy.get('.multiselect__content-wrapper').first().click({ force: true })

    cy.get('.multiselect__option--highlight.multiselect__option').first().click({ force: true })

    cy.get('#priceNettoEur').type(formData.priceNettoEur, { force: true })

    cy.get('#priceBruttoEur').should('have.value', formData.priceBruttoEur)

    cy.get('.button--primary').should('have.text', 'Submit').click({ force: true })

    cy.get('#congratulationsContent1').should('have.text', formData.congratulationsContent1)

    cy.get('#congratulationsContent2').should('have.text', formData.congratulationsContent2)
    
    cy.get('#congratulationsContent3').should('have.text', formData.congratulationsContent3)

})
})