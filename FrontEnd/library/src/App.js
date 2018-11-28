import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import BookList from './components/BookList'
import AuthorList from './components/AuthorList'
import { DataContext, theme } from './context/Data'
import Switch from 'react-router-dom/Switch';
import { PrivateRoute } from './Routing/PrivateRoute'
import CurentAuthor from './components/CurentAuthor'
import Authorization from './components/Authorization'
import AuthorBooks from './components/AuthorBooks'
import NavBar from './components/NavBar'

class App extends Component {
  state = {
      currentAuthor: { 
        fname: window.localStorage.getItem("fname"),
        lname: window.localStorage.getItem("lname")
      },
      books: [],
      authors: [],
      currentTheme: theme.primary,
      currentAuthorBooks: []
  }

  render() {
    return (
      <React.Fragment>
        <NavBar loggedIn={this.state.currentAuthor && window.localStorage.getItem("Authorization") !== "undefined"}/>
        <DataContext.Provider value={
          {...this.state, 
            addBook: (book) => {
              this.setState(state => ({ books: [...state.books, book] }))
            },
            addAuthor: (author) => {
              this.setState(state => ({ authors: [...state.authors, author] }))
            },
            removeBook: (bookId) => {console.log(this)},
            setCurrentAuthor: (author) => {
              console.log(author); this.setState({ currentAuthor: author })
            },
            removeAuthor: (authorId) => {console.log(this)},
            addCurrentBook: (book) => {
              this.setState(state => (
                  { currentAuthorBooks: [...state.currentAuthorBooks, book] }
                ))
            },
            removeAuthorBook: (bookId) => {
              this.setState(state => {
                  const newBooks = [];
                  state.currentAuthorBooks.forEach(book => { if (book.id !== bookId) newBooks.push(book) });
                  return {...state, currentAuthorBooks: newBooks}
                }
              )
            }
          }
        }>
          <Switch>
              <Route exact path='/' component={BookList} />
              <Route path='/authors' component={AuthorList} />
              <PrivateRoute path='/mybooks' component={AuthorBooks} /> */}
              <PrivateRoute path='/mypage' component={CurentAuthor} />
              {/* <PrivateRoute path='/mybook' component={CurentBook} /> */}
              {/* <Route path='authors/:id' component={DetailedAuthor} /> */}
              {/* <Route path='signup' component={SignUp} /> */}
              <Route path='/login' component={Authorization} />
          </Switch>
        </DataContext.Provider>
      </React.Fragment>
    );
  }
}

export default App;
