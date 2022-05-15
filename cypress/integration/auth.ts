describe('Test login flow', () => {
  it('Should check validation', () => {
    cy.visit('/login');
    cy.contains('Welcome').click();
    cy.contains('نام کاربری را لطفا وارد نمایید!');
    cy.contains('رمز عبور را لطفا وارد نمایید!');
  });
  it('Should login user', () => {
    cy.visit('/login');
    cy.get('#basic_username').type(Cypress.env('username'));
    cy.get('#basic_password').type(Cypress.env('password'));
    cy.contains('Welcome').click();
    cy.url().should('eq', Cypress.env('root'));
  });
});
