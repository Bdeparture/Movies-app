import React from "react";
import AddToWatchIcon from '../components/cardIcons/addToWatch'
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';

const UpcomingMoviesPage = (props) => {

    const { data, error, isLoading, isError } = useQuery('discover', getUpcomingMovies)

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const movies = data.results;

    return (
        <PageTemplate
            title="Discover Movies"
            movies={movies}
            action={(movie) => {
                return <AddToWatchIcon movie={movie} />
            }}
        />
    );
};
export default UpcomingMoviesPage;