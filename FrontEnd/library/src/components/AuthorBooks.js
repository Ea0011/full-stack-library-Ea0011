import React from 'react';
import Book from './Book';
import Grid from '@material-ui/core/Grid';
import { DataContext } from '../context/Data';
import { Redirect } from 'react-router-dom';
import withRouter from 'react-router-dom/withRouter';
import { LinearProgress } from '@material-ui/core';

class AuthorBooks extends React.PureComponent {
    state = {
        redirect: false,
        fetching: true
    }

    async componentDidMount() {
        const headers = new Headers();
        headers.append("Authorization", window.localStorage.getItem("Authorization")); 
        const data = {
            headers,
            method: 'GET'
        }
        try {
            const myBooksResponse = await fetch("http://localhost:3000/mybooks", data);
            const myBooks = await myBooksResponse.json();
            if (myBooks.message === "Unathorized") {
                this.props.context.removeCurrentAuthor();
                this.props.history.push('/login');
            } else {
                this.props.context.setCurrentAuthorBooks(myBooks);
                this.setState({ fetching: false });
            }
        } catch(e) {
            alert("Something went wrong");
            this.setState({ fetching: false });
        }
    }

    handleDelete = async(bookId) => {
        const headers = new Headers();
        headers.append("Authorization", window.localStorage.getItem("Authorization"));

        const form = new FormData();

        form.append("id", bookId);

        const data = {
            method: 'DELETE',
            headers
        }

        await fetch(`http://localhost:3000/books/${bookId}`, data);
        this.props.context.removeAuthorBook(bookId);
    }

    render() {
        return(
            <DataContext.Consumer>
                {context => (
                    this.state.redirect ? <Redirect to='/login'/> :
                    this.state.fetching ? <LinearProgress color={this.props.context.currentTheme.colorSecondary}/> :
                    <Grid container spacing={16} style={{padding: 8, marginTop: 4}}>
                        {context.currentAuthorBooks.length ? 
                            context.currentAuthorBooks.map(book => (
                                <Grid item xs={12} sm={6} lg={4} xl={2} key={book.id}>
                                    <Book book={book} loggedIn={true} handleDelete={this.handleDelete} />
                                </Grid>
                            )) : 
                            "No Books Yet :("
                        }
                    </Grid>
                )}
            </DataContext.Consumer>
        )
    }
}

const contextToProps = (props) => (
    <DataContext.Consumer>
        {context => (
            <AuthorBooks context={context} history={props.history} />
        )}
    </DataContext.Consumer>
)

export default withRouter(contextToProps);
