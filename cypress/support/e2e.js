// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
export const filterByTitle = (movieList, string) =>
    movieList.filter((m) => m.title.toLowerCase().search(string) !== -1);

export const filterByGenre = (movieList, genreId) =>
    movieList.filter((m) => m.genre_ids.includes(genreId));

export const filterByCombined = (movieList, string, genreId) =>
    movieList.filter((m) => m.title.toLowerCase().search(string) !== -1 && m.genre_ids.includes(genreId));

export const getSortedAlphabeticallyMovies = (movieList) => {
    return [...movieList].sort((a, b) => {
        return a.title.localeCompare(b.title);
    });
};

export const getSortedByReleaseDateMovies = (movieList) => {
    return [...movieList].sort((a, b) => {
        return new Date(b.release_date) - new Date(a.release_date);
    });
};

export const generateRandomString = length => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from({ length }, () => charset[Math.floor(Math.random() * charset.length)]).join('');
};

export const generateRandomEmail = () => {
    const domains = ["gmail.com", "yahoo.com", "hotmail.com", "example.com"];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    const prefix = generateRandomString(8);
    return `${prefix}@${randomDomain}`;
};
// Alternatively you can use CommonJS syntax:
// require('./commands')