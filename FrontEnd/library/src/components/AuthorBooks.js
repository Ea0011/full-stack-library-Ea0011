import React from 'react';
import Book from './Book';
import Grid from '@material-ui/core/Grid';
import { DataContext } from '../context/Data';

class AuthorBooks extends React.PureComponent {
    async componentDidMount() {
        if (!this.props.context.currentAuthorBooks.length) {
            const headers = new Headers();
            headers.append("Authorization", window.localStorage.getItem("Authorization")); 
            const data = {
                headers,
                method: 'GET'
            }
            const myBooksResponse = await fetch("http://localhost:3000/mybooks", data);
            console.log(myBooksResponse);
            const myBooks = await myBooksResponse.json();
            console.log(myBooks);
            myBooks.forEach(book => {
                this.props.context.addCurrentBook(book);
            });
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
                    <Grid container spacing={16} style={{padding: 8}}>
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

const contextToProps = () => (
    <DataContext.Consumer>
        {context => (
            <AuthorBooks context={context} />
        )}
    </DataContext.Consumer>
)

export default contextToProps;
