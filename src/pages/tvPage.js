import React , { useState } from "react";
import { getTvPage } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import Pagination from '@mui/material/Pagination';

const TvPage = (props) => {

    let [page, setPage] = useState(1);
    const handleChange = (event, value) => {
      setPage(value);
    };
  
    const { data, error, isLoading, isError } = useQuery(
      [`popularTV${page}`, { page: page }],
      getTvPage
    );
  
    if (isLoading) {
      return <Spinner />;
    }
    if (isError) {
      return <h1>{error.message}</h1>;
    }
    const movies = data.results;
  
    return (
      <>
        <PageTemplate title="Popular TV" movies={movies} type="tv" />
        <Pagination
          count={10}
          page={page}
          variant="outlined"
          size="large"
          onChange={handleChange}
          sx={{ display: 'flex', justifyContent: 'center', margin: '20px' }}
        />
      </>
    );
  };
export default TvPage;