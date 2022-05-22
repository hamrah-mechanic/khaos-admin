describe('CRUD User', () => {
  it('Should has data in table', () => {
    cy.visit('/users/list');
    cy.login(Cypress.env('username'), Cypress.env('password'));
    cy.request('https://jsonplaceholder.typicode.com/users').as('users');
    cy.get('@users').should(response => {
      expect(response).property('status').to.eq(200);
      expect(response).property('body').to.not.be.null;
    });
    cy.get('tr').should('have.class', 'ant-table-row');
  });
  it('Edit a user', () => {
    cy.contains('ویرایش').click();
    cy.get('tbody>tr').eq(0).find('label').click();
    cy.contains('ویرایش').click();
    cy.get('input').then(els => {
      [...els].forEach((el, index) => cy.wrap(el).type(`fake-${index}`));
    });
    cy.contains('ذخیره').click();
  });
  it('Create a new user', () => {
    cy.contains('ایجاد').click();
    cy.get('input').then(els => {
      [...els].forEach((el, index) => cy.wrap(el).type(`fake-${index}`));
    });
    cy.contains('ثبت').click();
  });
  it('Deleting a user', () => {
    cy.get('tbody>tr').eq(1).find('label').click();
    cy.contains('پاک کردن').click();
    cy.request('https://jsonplaceholder.typicode.com/users/1').as('users');
    cy.get('@users').should(response => {
      expect(response).property('status').to.eq(200);
    });
  });
});

export default {};
