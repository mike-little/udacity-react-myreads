import React, {Component} from 'react'
import BookShelf from './BookShelf'
import { Link } from "react-router-dom";

import '../App.css'

class ListBook extends Component {

  render() {

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf books={this.props.books.filter((book) => (book.shelf === "currentlyReading"))}
               moveBook={this.props.moveBook} title="Currently Reading"/>
            <BookShelf books={this.props.books.filter((book) => (book.shelf === "read"))}
              moveBook={this.props.moveBook} title="Read"/>
            <BookShelf books={this.props.books.filter((book) => (book.shelf === "wantToRead"))}
              moveBook={this.props.moveBook} title="Want to Read"/>
          </div>
        </div>
        <Link to="/search">
            <div className="open-search">
                <button>Add a book</button>
            </div>
        </Link>
      </div>
    )
  }
}

export default ListBook;