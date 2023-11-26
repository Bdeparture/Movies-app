let movies;
let movie;
let reviews;
describe("Base tests", () => {
    before(() => {
        // Get the discover movies from TMDB and store them locally.
        cy.request(
            `https://api.themoviedb.org/3/movie/top_rated?api_key=${Cypress.env(
                "TMDB_KEY"
            )}&language=en-US&include_adult=false&include_video=false&page=1`
        )
            .its("body") // Take the body of HTTP response from TMDB
            .then((response) => {
                movies = response.results;
            });
    });
    beforeEach(() => {
        cy.visit("/movies/toprate");
    });
    describe("The review feature", () => {
        before(() => {
            cy.request(
                `https://api.themoviedb.org/3/movie/${movies[0].id
                }?api_key=${Cypress.env("TMDB_KEY")}`
            )
                .its("body")
                .then((movieDetails) => {
                    movie = movieDetails;
                });
        });
        beforeEach(() => {
            cy.visit(`/movies/${movies[0].id}`);
        });
        it("displays the movie reviews", () => {
            cy.get("button").contains("Reviews").click();
            cy.get('a[href="/reviews/5346fa840e0a265ffa001e20"]').click();
            cy.url().should("include", `http://localhost:3000/reviews/5346fa840e0a265ffa001e20`)
        });
    });

})