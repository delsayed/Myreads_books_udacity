import React, {Component} from 'react'

class BookShelf extends Component {

  render() {
    const {book, updateSelected} = this.props
    
    return (
      <li>
        <div className="book">
          <div className="book-top">
            {book.imageLinks && (
              <div
                className="book-cover"
                style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks.thumbnail})`
              }}></div>
            )}
            <div className="book-shelf-changer">
              <select
                value={book.shelf}
                onChange={(event) => updateSelected(book, event.target.value)}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          {book.author && book
            .authors
            .map((author, index) => (
              <div key={index} className="book-authors">{author}</div>
            ))}
        </div>
      </li>
    )
  }
}

export default BookShelf
