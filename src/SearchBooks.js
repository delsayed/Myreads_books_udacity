import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'

// Component to render Search page
class SearchBooks extends Component {

  constructor(props) {
    super(props)

    this.searchBooks=this.searchBooks.bind(this)
    this.state={
      showingBooks:[]
    }
  }

  static propTypes = {
    updateSearchResults: PropTypes.func.isRequired
  }

// Search boooks func 
  searchBooks = (query) => {
   const updateSearchResults=this.props.updateSearchResults
    if (query) {
      BooksAPI
        .search(query)
        .then((result) => {
           if ( !result || !result.error) {
            this.setState({showingBooks: updateSearchResults(result)})
          } else {
            this.setState({showingBooks: []})
          }
        })
    } else {
      this.setState({showingBooks: []})
    }
  }

  render() {
    const {updateSelected} = this.props
    
    return (
      <div>

        <div className="search-books-bar">
          <Link to='/' className='close-search'>Close</Link>
          <div className='search-books-input-wrapper'>
            <input
              className='search-books-results'
              type='text'
              placeholder='Search books..'
              onChange={(event) => this.searchBooks(event.target.value)}/>
          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.showingBooks.map(book => (<BookShelf book={book} key={book.id} updateSelected={updateSelected}/>))}
          </ol>
        </div>

      </div>
    )
  }
}

export default SearchBooks
