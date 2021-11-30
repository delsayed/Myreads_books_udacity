import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends Component {
  state = {
    books: [],
    resultSet:[]
      }

  // gets all the books
  componentDidMount() {
    BooksAPI
      .getAll()
      .then((books) => {
        this.setState({books})
      })
  }
 
  //move book to selected shelf
  updateSelected = (book, shelf) => {
    BooksAPI
      .update(book, shelf)
      .then(res => (BooksAPI.getAll().then((res) => {
        this.setState({books:res})
      })))
  }
 
  //update search results with shelf info
  updateSearchResults=(results)=>{
    if(results){
      this.setState({resultSet :results})
     return this.state.resultSet.map((res) => {
      const found = this.state.books.find((b) => b.id === res.id)
      res.shelf = found && found.shelf ? found.shelf : 'none'
        return res
    })
  }}

  render() {
    return (
      <div className="app">

        <Switch>
          <Route
            exact
            path="/"
            render={() => (<ListBooks
            books={this.state.books}
            updateSelected={(book, shelf) => this.updateSelected(book, shelf)}/>)}/>

            <Route
            path="/search"
            render={() => (
            <div >
              <SearchBooks
              updateSearchResults={this.updateSearchResults}
              updateSelected={(book, shelf) => this.updateSelected(book, shelf)}/>
            </div>
          )}/>
         
        </Switch>
      </div>
    )
  }
}

export default BooksApp
