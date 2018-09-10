const Chance = require('chance');

const chance = new Chance();

describe('posts test', function() {

  const title = chance.string();
  const description = chance.string();

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

  it('user should be redirected to login screen if he is not logged in', function () {
    cy.visit('http://localhost:3000/');
    cy.contains('Posts').click();
    cy.url().should('include', '/login');
    cy.contains('You need to be logged in to view this page').should('be.visible')
  });

  it('user successfully navigates to posts screen', function () {
    cy.get('#login-email').type(email);
    cy.get('#login-pass').type('hello123');
    cy.get('#login-form').click();
    cy.url().should('include', '/profile');
    cy.contains('Posts').click();
    cy.url().should('include', '/posts');
  });

  it('user should be able create post and then delete his post', function () {
    cy.visit('http://localhost:3000/');
    cy.contains('Login').click();
    cy.url().should('include', '/login');
    cy.get('#login-email').type(email);
    cy.get('#login-pass').type('hello123');
    cy.get('#login-form').click();
    cy.url().should('include', '/profile');
    cy.contains('Posts').click();
    cy.url().should('include', '/posts');
    cy.get('.post-btn').click();
    cy.get('#title').type(title);
    cy.get('#description').type(description);
    cy.get('#submit-post').click();
    cy.url().should('include', '/posts');
    cy.contains(title);
    cy.contains(description);
    cy.get('.delete').first().click();
  });

});