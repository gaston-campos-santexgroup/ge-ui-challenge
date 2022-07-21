import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IconButton, InputBase, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { SearchResults } from '.';
import { Book } from '../interfaces';
import data from '../data/books.json'

export const Search = () => {

    const [inputText, setInputText] = useState("");
    const [searchText, setSearchText] = useState("");
    const [bookList, setBookList] = useState<Array<Book>>([]);

    useEffect(() => {
        if (searchText) {
            search(searchText, data.books, setBookList);
        }
    }, [searchText])

    const search = (searchTerm: string, jsonArrayData: Book[], setFilteredData: Dispatch<SetStateAction<Book[]>>) => {
        const filteredData = jsonArrayData.filter((every) => {
            return (
                searchTerm.split(" ").map(searchWord => {
                    return (
                        searchWord ? (
                            every.title.toLowerCase().includes(searchWord) ||
                            every.isbn.toLowerCase().includes(searchWord) ||
                            every.description.toLowerCase().includes(searchWord) ||
                            every.author.toLowerCase().includes(searchWord)
                        ) : false
                    )
                }).findIndex(match => match) !== -1 ? true : false

            );
        });
        setFilteredData(filteredData);
    }

    let inputHandler = (e: { target: { value: string; }; }) => {
        // Remove everything from string except alphanumeric characters and whitespace,
        // then collapses multiple adjacent whitespace to single spaces and later convert to lowercase.
        const lowerCaseIgnorePunctuation = e.target.value.replace(/[^\w\s']|_/g, "")
            .replace(/\s+/g, " ").toLowerCase();
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
