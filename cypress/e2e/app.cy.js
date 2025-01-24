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

  it('should successfully switch to Ukrainian and update content dynamically', () => {
    // Change language to Ukrainian
    cy.get('select').select('Українська');

    // Verify the content is updated
    cy.contains('Ласкаво просимо до Вашого додатку').should('be.visible');
    cy.contains(`Ваш універсальний інструмент для всіх потреб.`).should(
      'be.visible'
    );
    cy.contains('Ласкаво просимо!').should('be.visible');
    cy.contains(
      'Досліджуйте нашу платформу та відкривайте цікаві можливості, які допоможуть покращити ваш досвід.'
    ).should('be.visible');

    cy.url().should('include', '/uk');
  });

  it('should navigate to About page and verify localized content', () => {
    // Navigate to About Page
    cy.contains('About us').click();

    // Check if on About page
    cy.url().should('include', '/about');

    // Check English content
    cy.contains('About Us').should('exist');
    cy.contains('Our mission').should('exist');
    cy.contains('Our Story').should('exist');
    cy.contains('Founded in 2020').should('exist');
    cy.contains('Our Values').should('exist');
    cy.contains('Integrity, Innovation').should('exist');
    cy.contains('Contact Us').should('exist');
    cy.contains('For inquiries').should('exist');

    // Switch to Ukrainian
    cy.get('select').select('Українська');

    // Verify Ukrainian content updates
    cy.contains('Про нас').should('exist');
    cy.contains('Наша місія').should('exist');
    cy.contains('Наша історія').should('exist');
    cy.contains('Заснована в 2020').should('exist');
    cy.contains('Наші цінності').should('exist');
    cy.contains('Цінності, такі як').should('exist');
    cy.contains(`Зв'яжіться з нами`).should('exist');
    cy.contains('Для запитів').should('exist');
  });
});
