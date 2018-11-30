import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import BookList from './components/BookList'
import AuthorList from './components/AuthorList'
import { DataContext, theme } from './context/Data'
import Switch from 'react-router-dom/Switch'
import { PrivateRoute } from './Routing/PrivateRoute'
import CurentAuthor from './components/CurentAuthor'
import Authorization from './components/Authorization'
import AuthorBooks from './components/AuthorBooks'
import NavBar from './components/NavBar'
import CreateAuthor from './components/CreateAuthor'
import AddBook from './components/AddBook'
import EditBook from './components/EditBook'

class App extends Component {
  constructor() {
    super();
    const currentAuthor = window.localStorage.getItem("Authorization") ? {
      fname: window.localStorage.getItem("fname"),
      lname: window.localStorage.getItem("lname")
    } : null;
    this.state = {
      currentAuthor,
      books: [],
      authors: [],
      currentTheme: theme.primary,
      currentAuthorBooks: []
    }
  }

  changeTheme = () => {
    if (this.state.currentTheme.colorPrimary === "primary") {
      this.setState({ currentTheme: theme.secondary });
    } else {
      this.setState({ currentTheme: theme.primary });
    }
  }

  render() {
    return (
      <React.Fragment>
        <DataContext.Provider value={
          {...this.state, 
            addBook: (book) => {
              this.setState(state => ({ books: [...state.books, book] }))
            },
            setBooks: (books) => { this.setState({ books: books }) },
            setAuthors: (authors) => { this.setState({ authors: authors }) },
            addAuthor: (author) => {
              this.setState(state => ({ authors: [...state.authors, author] }))
            },
            setCurrentAuthor: (author) => {
              this.setState({ currentAuthor: author })
            },
            removeCurrentAuthor: () => {
              window.localStorage.removeItem("Authorization");
              window.localStorage.removeItem("fname");
              window.localStorage.removeItem("lname");
              this.setState({ currentAuthor: null });
            },
            addCurrentBook: (book) => {
              this.setState(state => (
                  { currentAuthorBooks: [...state.currentAuthorBooks, book] }
                ))
            },
            setCurrentAuthorBooks: (books) => { this.setState({ currentAuthorBooks: books }) },
            removeAuthorBook: (bookId) => {
              this.setState(state => {
                  const newBooks = [];
                  state.currentAuthorBooks.forEach(book => { if (book.id !== bookId) newBooks.push(book) });
                  return {...state, currentAuthorBooks: newBooks}
                }
              )
            },
          }
        }>
          <NavBar 
            loggedIn={this.state.currentAuthor && window.localStorage.getItem("Authorization")}
            author={this.state.currentAuthor}
            changeTheme={this.changeTheme}
          />
          <Switch>
              <Route exact path='/' component={BookList} />
              <Route path='/authors' component={AuthorList} />
              <PrivateRoute path='/mybooks' component={AuthorBooks} />
              <PrivateRoute path='/mypage' component={CurentAuthor} />
              <PrivateRoute path='/addbook' component={AddBook} />
              <PrivateRoute path='/updatebook/:id' component={EditBook} />
              <Route path='/signup' component={CreateAuthor} />
              <Route path='/login' component={Authorization} />
          </Switch>
        </DataContext.Provider>
      </React.Fragment>
    );
  }
}

export default App;
