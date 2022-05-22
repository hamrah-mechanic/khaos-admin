describe('Test login flow', () => {
  it('Should check validation', () => {
    cy.visit('/login');
    cy.contains('Welcome').click();
    cy.contains('نام کاربری را لطفا وارد نمایید!');
    cy.contains('رمز عبور را لطفا وارد نمایید!');
  });
  it('Should login user', () => {
    cy.visit('/login');
    cy.login(Cypress.env('username'), Cypress.env('password'));
  });
});

export default {};
