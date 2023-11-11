describe('ReactSurvey', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001'); // Replace with the URL where your component is hosted
  });

  it('displays the survey question and options', () => {
    cy.contains('What is your favorite color?').should('exist');
    cy.contains('Red').should('exist');
    cy.contains('Blue').should('exist');
  });

  it('allows the user to select an option and triggers the vote function', () => {
    cy.contains('Red').click();
    // Add assertions here to verify the behavior after the vote function is triggered
  });
});
