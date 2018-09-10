const Chance = require('chance');

const chance = new Chance();

describe('registration test', function () {

  const email = chance.email();

  it('user successfully navigates to login screen', function () {
    cy.visit('http://localhost:3000/');
    cy.contains('Register').click();
    cy.url().should('include', '/register');
  });

  it('user should be redirected back to registration page if credentials are not passed', function () {
    cy.url().should('include', '/register');
    cy.get('#registration-form').click();
    cy.contains('All fields are mandatory').should('be.visible');
  });

  it('user should be redirected back to registration page if password and confirm password are not same', function () {
    cy.visit('http://localhost:3000/');
    cy.contains('Register').click();
    cy.url().should('include', '/register');
    cy.get('#registration-username').type('tester');
    cy.get('#registration-email').type(chance.email());
    cy.get('#registration-pass').type('hello123');
    cy.get('#registration-confpass').type('hello');
    cy.get('#registration-form').click();
    cy.url().should('include', '/register');
  });

  it('user should be redirected to login page if registration is successful', function () {
    cy.visit('http://localhost:3000/');
    cy.contains('Register').click();
    cy.url().should('include', '/register');
    cy.get('#registration-username').type('testing');
    cy.get('#registration-email').type(email);
    cy.get('#registration-pass').type('hello123');
    cy.get('#registration-confpass').type('hello123');
    cy.get('#registration-form').click();
    cy.url().should('include', '/login');
  });

  it('user should be able to delete profile', function () {
    cy.get('#login-email').type(email);
    cy.get('#login-pass').type('hello123');
    cy.get('#login-form').click();
    cy.url().should('include', '/profile');
    cy.get('#delete-form').click();
    cy.get('#delete-confirm').click();
    cy.get('.display-2').should('be.visible');
  });

});