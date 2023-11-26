// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("getSortedAlphabeticallyMovies", (movieList) => {
    return cy.wrap([...movieList].sort((a, b) => a.title.localeCompare(b.title)));
});

Cypress.Commands.add("getSortedByReleaseDateMovies", (movieList) => {
    return cy.wrap([...movieList].sort((a, b) => new Date(b.release_date) - new Date(a.release_date)));
});

