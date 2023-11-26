import { filterPeople } from "../support/e2e";
let people;


describe("Base tests", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/person/popular?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&page=1`
    )
      .its("body")
      .then((response) => {
        people = response.results;
      });
  });
  beforeEach(() => {
    cy.visit("/people");
  });

  describe("The Popular people page", () => {
    it("displays the page header and 20 people", () => {
      cy.get('h3.MuiTypography-root').contains("Popular People");
      cy.get('div.MuiTypography-root').should("have.length", 20);
    });

    it("displays the correct people names", () => {
      cy.get('div.MuiCardContent-root').each(($card, index) => {
        cy.wrap($card).find("div.MuiTypography-root").should('have.text', people[index].name);
      });
    });
  });


  describe("Test Pagination", () => {
    it("should go to next page", () => {
      cy.get('button.MuiPaginationItem-previousNext[aria-label="Go to next page"]').click({ force: true });
      cy.get('button.MuiPaginationItem-root[aria-label="page 2"]').should('have.attr', 'aria-current', 'true');
    });
    it("should go to previous page", () => {
      cy.get('button.MuiPaginationItem-previousNext[aria-label="Go to previous page"]').click({ force: true });
      cy.get('button.MuiPaginationItem-root[aria-label="page 1"]').should('have.attr', 'aria-current', 'true');
    });
  });

});