import { IconButton, InputBase, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { SearchResults } from '.';
import { Book } from '../interfaces';
import data from '../data/books.json'

export const Search = () => {

    const [inputText, setInputText] = useState("");
    const [searchText, setSearchText] = useState("");
    const [bookList, setBookList] = useState<Array<Book>>(data.books);

    useEffect(() => {
        if (searchText) {
            setBookList(data.books.filter(item => item.title.toLowerCase() === searchText));
        }
    }, [searchText])

    let inputHandler = (e: { target: { value: string; }; }) => {
        //convert input text to lower case
        let lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
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
