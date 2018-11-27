import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import BookList from './components/BookList'
import AuthorList from './components/AuthorList'
import { DataContext, theme } from './context/Data'
import Switch from 'react-router-dom/Switch';

class App extends Component {
  state = {
      currentAuthor: null,
      books: [],
      authors: [],
      currentTheme: theme.primary
  }

  render() {
    console.log(BookList);
    return (
      <React.Fragment>
        <DataContext.Provider value={
          {...this.state, 
            addBook: (book) => {this.setState(state => ({ books: [...state.books, book] })) },
            addAuthor: (author) => {this.setState(state => ({ authors: [...state.authors, author] }))},
            removeBook: (bookId) => {console.log(this)},
            removeAuthor: (authorId) => {console.log(this)}
          }
        }>
          <Switch>
              <Route exact path='/' component={BookList} />
              <Route path='/authors' component={AuthorList} />
          </Switch>
        </DataContext.Provider>
      </React.Fragment>
    );
  }
}

export default App;
