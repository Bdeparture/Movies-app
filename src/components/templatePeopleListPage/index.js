import React, { useState } from "react";
import Header from "../headerMovieList";
//import FilterCard from "../filterMoviesCard";
import PeopleList from "../peopleList";
import Grid from "@mui/material/Grid";

function PeopleListPageTemplate({ people,title, action }) {
    const [nameFilter, setNameFilter] = useState("");
    const [genreFilter, setGenreFilter] = useState("0");
    const genreId = Number(genreFilter);

    let displayedPeople = people
        .filter((p) => {
            return p.name.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
        })
        .filter((p) => {
            return genreId > 0 ? p.genre_ids.includes(genreId) : true;
        });

    const handleChange = (type, value) => {
        if (type === "name") setNameFilter(value);
        else setGenreFilter(value);
    };

    return (
        <Grid container sx={{ padding: '20px' }}>
            <Grid item xs={12}>
            <Header title={title} />
            </Grid>
            <Grid item container spacing={5}>
                {/* <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FilterCard
            onUserInput={handleChange}  
            titleFilter={nameFilter}
            genreFilter={genreFilter}
          />
        </Grid> */}
                <PeopleList action={action} people={displayedPeople}></PeopleList>
            </Grid>
        </Grid>
    );
}
export default PeopleListPageTemplate;