const Chance = require('chance');
const chance = new Chance();
describe('login test', function () {

  const email = chance.email();
  
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

  it('user successfully navigates to login screen', function () {
    cy.visit('http://localhost:3000/');
    cy.contains('Login').click();
    cy.url().should('include', '/login');
  });

  it('user should be redirected back to login page if credentials are not passed', function () {
    cy.url().should('include', '/login');
    cy.get('#login-form').click();
    cy.url().should('include', '/login');
    cy.contains('Credentials Missing').should('be.visible')
  });


  it('user should be redirected back to login page if incorrect credentials are passed', function () {
    cy.url().should('include', '/login');
    cy.get('#login-email').type(email);
    cy.get('#login-pass').type('tesdfdddting');
    cy.get('#login-form').click();
    cy.url().should('include', '/login');
    cy.contains('Username or Password Invalid').should('be.visible');
  });


  it('user successfully logs into the application and navigates to profile page', function () {
    cy.url().should('include', '/login');
    cy.get('#login-email').type(email);
    cy.get('#login-pass').type('hello123');
    cy.get('#login-form').click();
    cy.url().should('include', '/profile');
  });

});