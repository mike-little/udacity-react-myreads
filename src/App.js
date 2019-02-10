import React from 'react'
import { Route } from "react-router-dom";
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './components/ListBooks'
import SearchBooks from './components/SearchBooks'

class BooksApp extends React.Component {

  state = { books: [] }

  componentDidMount() {

    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });

  }

  moveBook = (book, shelf) => {

    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then(books => {
        this.setState({ books: books });
      })
    });

  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => ( <ListBooks books={this.state.books} moveBook={this.moveBook}/> )}/>
        <Route exact path="/search" render={() => ( <SearchBooks books={this.state.books} moveBook={this.moveBook}/> )}/>
      </div>
    );
  }

}

export default BooksApp
