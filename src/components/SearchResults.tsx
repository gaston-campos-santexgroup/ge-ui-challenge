import { SearchResult } from '../interfaces/searchResults';
interface Search {
    bookList: SearchResult[];
}
export const SearchResults: React.FC<Search> = ({ bookList }) => {
    return (
        < div className="search-list" id="search-list" role="list">
            {bookList?.map((bookFound) => (

                <div className="search-item" key={bookFound.item.isbn} role="listitem">
                    <div className="book-img">
                        <img src={bookFound.item.image} aria-label="image" alt={bookFound.item.title} />
                        <div className="isbn" aria-label="isbn">isbn: {bookFound.item.isbn}</div>
                    </div>
                    <div className="book-info">
                        <div className="gernes" aria-label="gernes">{bookFound.item.genres}</div>
                        <div className="title" aria-label="title">{bookFound.item.title}</div>
                        <div className="author" aria-label="author">{bookFound.item.author}</div>
                        <div className="published" aria-label="published">{bookFound.item.published}</div>
                        <div className="description" aria-label="description">{bookFound.item.description}</div>
                    </div>

                </div>
            ))}
        </div>
    )
}

