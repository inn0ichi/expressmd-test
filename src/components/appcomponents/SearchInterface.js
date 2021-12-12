import algoliasearch from 'algoliasearch/lite';
import { connectSearchBox, connectHits } from 'react-instantsearch-dom';
import { TextField, Paper, Typography } from '@mui/material';


import { InstantSearch, PoweredBy } from 'react-instantsearch-dom';
const searchClient = algoliasearch('06RC56CRHD', '61bc497931637581637d8f096434e15c');


const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
    <form noValidate action="" role="search">
        <TextField id="outlined-basic"
            label="Search"
            variant="outlined"
            value={currentRefinement}
            onChange={event => refine(event.currentTarget.value)}
        />
        <PoweredBy />
        {isSearchStalled ? 'My search is stalled' : ''}
    </form>
);

const Hits = ({ hits }) => (
    <ol>
        {hits.map(hit => (
            <Paper key={hit.objectID}>
                <Typography variant="h5">{hit.lastname + " " + hit.firstname}</Typography>
                <Typography>{hit.type}</Typography>
                <Typography>{hit.phoneNum}</Typography>
            </Paper>
        ))}
    </ol>
);

const CustomSearchBox = connectSearchBox(SearchBox);
const CustomHits = connectHits(Hits);

const SearchInterface = () => (
    <InstantSearch searchClient={searchClient} indexName="doctors">
        <CustomSearchBox />
        <CustomHits />
    </InstantSearch>
);

export default SearchInterface;