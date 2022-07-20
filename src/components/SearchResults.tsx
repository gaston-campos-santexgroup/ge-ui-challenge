import { Book } from '../interfaces';
interface Search {
    bookList: Array<Book>;
}
export const SearchResults: React.FC<Search> = ({ bookList }) => {
    return (
        < div className="search-list" id="search-list" role="list">
            {bookList?.map((book) => (
                <div className="search-item" key={book.isbn} role="listitem">
                    <div className="book-img">
                        <img src={book.image} aria-label="image" alt={book.title} />
                        <div className="isbn" aria-label="isbn">isbn: {book.isbn}</div>
                    </div>
                    <div className="book-info">
                        <div className="gernes" aria-label="gernes">{book.genres}</div>
                        <div className="title" aria-label="title">{book.title}</div>
                        <div className="author" aria-label="author">{book.author}</div>
                        <div className="published" aria-label="published">{book.published}</div>
                        <div className="description" aria-label="description">{book.description}</div>
                    </div>

                </div>
            ))}
        </div>
    )
}

