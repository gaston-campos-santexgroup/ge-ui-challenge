import data from "../data/books.json"
import { Book } from '../interfaces';
interface Search {
    input: string;
}
export const SearchResults: React.FC<Search> = ({ input }) => {
    const bookList: Book[] = data.books;
    return (
        < div className="search-list" id="search-list" role="list">
            {bookList?.map((book) => (
                <div className="search-item" key={book.isbn} role="listitem">
                    <div className="book-img">
                        <img src={book.image} alt={book.title} />
                        <div className="isbn">isbn: {book.isbn}</div>
                    </div>
                    <div className="book-info">
                        <div className="gernes">{book.genres}</div>
                        <div className="title">{book.title}</div>
                        <div className="author">{book.author}</div>
                        <div className="published">{book.published}</div>
                        <div className="description">{book.description}</div>
                    </div>

                </div>
            ))}
        </div>
    )
}

