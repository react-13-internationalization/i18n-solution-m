describe('Multilingual Support', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('/en'); // Start with the English version
  });

  it('should display the correct initial content in English', () => {
    // Check HomePage content
    cy.contains('Welcome to Your App').should('be.visible');
    cy.contains('Your one-stop solution for all your needs.').should(
      'be.visible'
    );
    cy.contains('Welcome!').should('be.visible');
    cy.contains(
      'Explore our platform and discover all the exciting features we offer to enhance your experience.'
    ).should('be.visible');

    // Check navigation links
    cy.contains('Home').should('be.visible');
    cy.contains('About us').should('be.visible');

    // Check initial language selection
    cy.get('select').select('English').should('have.value', 'en');
  });

 
});