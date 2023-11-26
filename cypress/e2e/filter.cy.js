import { filterByCombined, filterByGenre, filterByTitle } from "../support/e2e";


let movies; // List of Discover movies from TMDB

describe("Filtering", () => {
  before(() => {
    // Get movies from TMDB and store them locally.
    cy.request(
      `https://api.themoviedb.org/3/movie/popular?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body")
      .then((response) => {
        movies = response.results;
      });
  });
  beforeEach(() => {
    cy.visit("/movies");
  });

  describe("By movie title", () => {
    it("only display movies with 'x' in the title", () => {
      const searchString = "x";
      const matchingMovies = filterByTitle(movies, searchString);
      cy.get("#filled-search").clear().type(searchString); // Enter m in text box
      cy.get(".MuiCardHeader-content").should(
        "have.length",
        matchingMovies.length
      );
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(matchingMovies[index].title);
      });
    });
    it("handles case when there are no matches", () => {
      const searchString = "xyxxzyyzz";
      cy.get("#filled-search").clear().type(searchString); // Enter m in text box
      cy.get(".MuiCardHeader-content").should("have.length", 0);
    });
  });
  describe("By movie genre", () => {
    it("show movies with the selected genre", () => {
      const selectedGenreId = 18;
      const selectedGenreText = "Drama";
      const matchingMovies = filterByGenre(movies, selectedGenreId);
      cy.get("#genre-select").click();
      cy.get("li").contains(selectedGenreText).click();
      cy.get(".MuiCardHeader-content").should(
        "have.length",
        matchingMovies.length
      );
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(matchingMovies[index].title);
      });
    });
  });
  describe("By movie sort", () => {
    it("displays movies sorted alphabetically", () => {
      cy.get("#sort-select").click();
      cy.get("li").contains("Sort By Name").click();
      
      // 使用 Cypress 命令调用
      cy.getSortedAlphabeticallyMovies(movies).then((sortedAlphabeticallyMovies) => {
        cy.get(".MuiCardHeader-content").each(($card, index) => {
          cy.wrap($card)
            .find("p")
            .invoke("text")
            .then((title) => {
              expect(title.trim()).to.equal(sortedAlphabeticallyMovies[index].title);
            });
        });
      });
    });
  
    it("displays movies sorted by release date", () => {
      cy.get("#sort-select").click();
      cy.get("li").contains("Sort By Time").click();
      
      // 使用 Cypress 命令调用
      cy.getSortedByReleaseDateMovies(movies).then((sortedByReleaseDateMovies) => {
        cy.get(".MuiCardHeader-content").each(($card, index) => {
          cy.wrap($card)
            .find("p")
            .invoke("text")
            .then((title) => {
              expect(title.trim()).to.equal(sortedByReleaseDateMovies[index].title);
            });
        });
      });
    });
  });
  describe("Combined genre and title", () => {
    it("only display movies with 'm' in the title and the selected genre", () => {
      const searchString = "m";
      const selectedGenreId = 18;
      const selectedGenreText = "Drama";
      const matchingMovies = filterByCombined(movies, searchString, selectedGenreId)
      cy.get("#filled-search").clear().type(searchString); // Enter m in text box
      cy.get("#genre-select").click();
      cy.get("li").contains(selectedGenreText).click();
      cy.get(".MuiCardHeader-content").should(
        "have.length",
        matchingMovies.length
      );
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(matchingMovies[index].title);
      });
    });
  });
});