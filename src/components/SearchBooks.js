import React from 'react';
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from '../BooksAPI'

class SearchBooks extends React.Component {

    state = { searchString: '', searchResults: [], error: null}

     performSearch = searchString => {
        try {
            this.setState({searchString: searchString, error: null})
            if (!searchString) {
                this.setState({searchResults: [], resultMsg: ''})
            } else {
                BooksAPI.search(searchString).then(foundBooks => {
                    if (searchString === this.state.searchString) {
                        if (foundBooks && !foundBooks.error) {
                            let cleanResults = foundBooks.filter(function (book) {
                                return book.imageLinks;
                            })
                            /* Maintain proper shelf between search page and main page */
                            cleanResults.forEach(result => {
                                result.shelf = 'none';
                                this.props.books.forEach(existingBook => {
                                    if (existingBook.id === result.id) {
                                        result.shelf = existingBook.shelf;
                                    }
                                })
                            })
                            this.setState({searchResults: cleanResults})
                        } else {
                            this.setState({searchResults: []})
                        }
                    }
                })
            }
        } catch (error) {
            this.setState({error: error})
        }
    }

    render() {
        if (this.state.error) {
            return <h2>Error occurred during search</h2>
        }
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/">
                        <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                               placeholder="Search by title or author"
                               value={this.state.searchString}
                               onChange={evt => this.performSearch(evt.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.searchResults.map(foundBook =>
                            <li key={foundBook.id}>
                                <Book book={foundBook} moveBook={this.props.moveBook}/>
                            </li>
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks
