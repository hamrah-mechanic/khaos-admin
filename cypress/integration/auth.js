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
  });
  it('Should has data in table', () => {
    cy.request('https://jsonplaceholder.typicode.com/users').as('users');
    cy.get('@users').should(response => {
      expect(response).property('status').to.eq(200);
      expect(response).property('body').to.not.be.null;
    });
    cy.get('tr').should('have.class', 'ant-table-row');
  });
});
