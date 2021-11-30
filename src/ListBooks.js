import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

// Component to render main page 
class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }
  
  state={
    shelves:[{id:'currentlyReading', value:'Currently Reading'},{id:'wantToRead',value:'Want To Read'},{id:'read',value:'Read'}]
  }

  render() {
    const {books, updateSelected} = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">

            {this.state.shelves.map((shelf)=> (

          <div className="bookshelf" key={shelf.id}>
            <h2 className="bookshelf-title">{shelf.value}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {books.filter((book) => book.shelf === shelf.id).map(book =>(<BookShelf book={book} key={book.id}  updateSelected={updateSelected}/>))}
                   
              </ol>
            </div>
          </div>
           ))}
              
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>

        </div>
      </div>
    )
  }

}

export default ListBooks
