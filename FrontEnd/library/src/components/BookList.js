import React from 'react';
import Grid from '@material-ui/core/Grid'
import { DataContext } from '../context/Data';
import Book from './Book';
import LinearProgress from '@material-ui/core/LinearProgress';

class BookList extends React.PureComponent {
    state = {
        fetching: true
    }

    async componentDidMount() {
        const booksResponse = await fetch("http://localhost:3000/books");
        const books = await booksResponse.json();

        this.props.context.setBooks(books);
        this.setState({ fetching: false });
    }

    render() {
        return (
            <DataContext.Consumer>
                {context => (
                    this.state.fetching ? <LinearProgress color={context.currentTheme.colorSecondary} /> :
                    <Grid container spacing={16} style={{padding: 8, marginTop: 4}}>
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