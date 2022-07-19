import { IconButton, InputBase, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { SearchResults } from '.';


export const Search = () => {

    const [inputText, setInputText] = useState("");
    let inputHandler = (e: { target: { value: string; }; }) => {
        //convert input text to lower case
        let lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
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
                        inputProps={{ 'aria-label': 'search google maps' }}
                        onChange={inputHandler}
                    />
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <SearchResults input={inputText} />
            </div>
        </div>
    )
}
