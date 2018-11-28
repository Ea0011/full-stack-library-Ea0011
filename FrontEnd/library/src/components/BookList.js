import React from 'react';
import Grid from '@material-ui/core/Grid'
import { DataContext } from '../context/Data';
import Book from './Book';

class BookList extends React.PureComponent {
    async componentDidMount() {
        if (!this.props.context.books.length) {
            const booksResponse = await fetch("http://localhost:3000/books");
            const books = await booksResponse.json();

            books.forEach(book => {
                this.props.context.addBook(book)
            });
    }
}

    render() {
        return (
            <DataContext.Consumer>
                {context => (
                    <Grid container spacing={16} style={{padding: 8}}>
                        {context.books.length ? 
                            context.books.map(book => (
                                <Grid item xs={12} sm={6} lg={4} xl={2} key={book.id}>
                                    <Book book={book} loggedIn={false} />
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
            <BookList context={context}/>
        )}
    </DataContext.Consumer>
)

export default contextToProps;