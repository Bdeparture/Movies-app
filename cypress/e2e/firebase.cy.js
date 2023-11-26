import { generateRandomString, generateRandomEmail } from '../support/e2e'

describe('Firebase Authentication', () => {
  let randomEmail;
  let randomPassword;
  it('Sign up a new account and Login', () => {
    cy.visit("/signup");
    randomEmail = generateRandomEmail();
    cy.get('#Email1').type(randomEmail);
    randomPassword = generateRandomString(8);
    cy.get('#Password').type(randomPassword);
    cy.get('#PasswordConfirm').type(randomPassword);
    cy.get('button.MuiButton-containedPrimary[type="submit"]').contains('Sign up').click();
    cy.url().should("include", `/`);
  });
  it('should log in and turn to home page', () => {
    cy.visit("/login");
    cy.get('#Email1').type(randomEmail);
    cy.get('#Password').type(randomPassword);
    cy.get('button.MuiButton-containedPrimary[type="submit"]').contains('Log in').click();
    cy.url().should("include", `/`);
  });
  it('from signup to login page, vice versa', () => {
    cy.visit("/signup");
    cy.get('a[href="/login"]').click();
    cy.url().should("include", `/login`);
    cy.get('a[href="/signup"]').click();
    cy.url().should("include", `/signup`);
  })
  it('Log out the account', () =>{
    cy.visit("/");
    cy.get('[aria-label="Account settings"]').click();
    cy.get('a[href="/login"]').click();
    cy.url().should("include", `/login`);
  })
})