let movies; // List of movies from TMDB
let movie; //
let popularmovies;
let topratemovies;
let upcomingmovies;

describe("Base tests", () => {
    before(() => {
        // Get the discover movies from TMDB and store them locally.
        cy.request(
            `https://api.themoviedb.org/3/movie/popular?api_key=${Cypress.env(
                "TMDB_KEY"
            )}&language=en-US&include_adult=false&include_video=false&page=1`
        )
            .its("body") // Take the body of HTTP response from TMDB
            .then((response) => {
                popularmovies = response.results;
            });
        cy.request(
            `https://api.themoviedb.org/3/movie/top_rated?api_key=${Cypress.env(
                "TMDB_KEY"
            )}&language=en-US&include_adult=false&include_video=false&page=1`
        )
            .its("body") // Take the body of HTTP response from TMDB
            .then((response) => {
                topratemovies = response.results;
            });
        cy.request(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${Cypress.env(
                "TMDB_KEY"
            )}&language=en-US&include_adult=false&include_video=false&page=1`
        )
            .its("body") // Take the body of HTTP response from TMDB
            .then((response) => {
                upcomingmovies = response.results;
            });
    });
    describe('HomePage', () => {
        beforeEach(() => {
            cy.visit('/');
        });

        it('should display the correct title', () => {
            cy.contains('Discover').should('be.visible');
        });

        it('should navigate to the movies page when "MORE" button is clicked', () => {
            cy.get("h2").contains("Popular Movies").contains('MORE').click();
            cy.url().should('include', '/movies');
        });
        it('should navigate to the toprate page when "MORE" button is clicked', () => {
            cy.get("h2").contains("Top Rated Movies").contains('MORE').click();
            cy.url().should('include', '/movies/toprate');
        });
        it('should navigate to the movies page when "MORE" button is clicked', () => {
            cy.get("h2").contains("Upcoming Movies").contains('MORE').click();
            cy.url().should('include', '/movies/upcoming');
        });
    });
    beforeEach(() => {
        cy.visit('/');
    });
    describe('HomePage Item', () => {
        it("displays the correct popular movie titles", () => {
            cy.get('div.section1').within(() => {
                cy.get(".MuiCardHeader-content").each(($card, index) => {
                    cy.wrap($card).find("p").contains(popularmovies[index].title);
                });
                cy.log('Tested movie titles functionality');
            });
        });
        it("displays the correct toprate movie titles", () => {
            cy.get('div.section2').within(() => {
                cy.get(".MuiCardHeader-content").each(($card, index) => {
                    cy.wrap($card).find("p").contains(topratemovies[index].title);
                });
                cy.log('Tested movie titles functionality');
            });
        });
        it("displays the correct upcoming movie titles", () => {
            cy.get('div.section3').within(() => {
                cy.get(".MuiCardHeader-content").each(($card, index) => {
                    cy.wrap($card).find("p").contains(upcomingmovies[index].title);
                });
                cy.log('Tested movie titles functionality');
            });
        });
    });
});