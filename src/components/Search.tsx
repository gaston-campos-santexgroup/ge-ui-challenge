import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IconButton, InputBase, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import Fuse from 'fuse.js'
import { SearchResults } from '.';
import data from '../data/books.json'
import { SearchResult } from '../interfaces/searchResults';

export const Search = () => {

    const [inputText, setInputText] = useState("");
    const [searchText, setSearchText] = useState("");
    const [bookList, setBookList] = useState<Array<SearchResult>>([]);

    useEffect(() => {
        if (searchText) {
            search(searchText, setBookList);
        }
    }, [searchText])


    const search = (searchTerm: string, setFilteredData: Dispatch<SetStateAction<SearchResult[]>>) => {

        const searchOptions = {
            includeScore: true,
            ignoreLocation: true,
            threshold: 0.3,
            useExtendedSearch: true,

            // Search in `title`, `isbn`,`description`, `author` array
            keys: ['title', 'isbn', 'description', 'author']
        }
        const fuse = new Fuse(data.books, searchOptions)
        const result = fuse.search(searchTerm) as SearchResult[];
        setFilteredData(result);
    }


    let inputHandler = (e: { target: { value: string; }; }) => {
        // Remove everything from string except alphanumeric characters and whitespace,
        // then collapses multiple adjacent whitespace to single spaces and later convert to lowercase.
        const lowerCaseIgnorePunctuation = e.target.value.replace(/[^\w\s']|_/g, "")
            .replace(/\s+/g, " ");
        setInputText(lowerCaseIgnorePunctuation);
    };

    let keyDownHandler = (e: any) => {
        if (e.key === 'Enter') {
            setSearchText(inputText);
        }
    }

    let searchHandler = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setSearchText(inputText);
    };

    return (
        <div className="main">
            <div className="search">
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search Books"
                        inputProps={{ 'aria-label': 'search book' }}
                        onChange={inputHandler}
                        onKeyDown={keyDownHandler}
                    />
                    <IconButton type="submit" onClick={searchHandler} sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <SearchResults bookList={bookList} />
            </div>
        </div>
    )
}
