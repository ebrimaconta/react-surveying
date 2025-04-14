describe('ReactSurvey', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000'); // Replace with the URL where your component is hosted
  });
  it('renders the survey with options', () => {
    cy.get('.poll').should('exist');
    cy.get('.question').should('exist');
    cy.get('.answers').should('exist');
    cy.get('.votes').should('exist');
  });

  it('allows voting on an option', () => {
    cy.get('.option')
      .first()
      .click();
    cy.get('.vote').should('exist');
    cy.get('.votes').contains('20 votes');
  });

  it('updates the percentage after voting', () => {
    cy.get('.option')
      .first()
      .click();
    cy.get('.percent').each(($element, index) => {
      if (index === 0) {
        cy.wrap($element).should('have.text', '100%');
      } else if (index === 1) {
        cy.wrap($element).should('have.text', '0%');
      }
    });
  });

  it('click on second option after voting', () => {
    cy.get('.option')
      .eq(1)
      .click();
    cy.get('.percent').each(($element, index) => {
      if (index === 0) {
        cy.wrap($element).should('have.text', '95%');
      } else if (index === 1) {
        cy.wrap($element).should('have.text', '5%');
      }
    });
  });

  it('updates the total votes after voting', () => {
    cy.get('.option')
      .first()
      .click();
    cy.get('.votes').contains('20 votes');
  });
});
