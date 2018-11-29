import React from 'react';
import Grid from '@material-ui/core/Grid'
import { DataContext } from '../context/Data';
import Book from './Book';
import LinearProgress from '@material-ui/core/LinearProgress';
import { TextField, Button } from '@material-ui/core';

class BookList extends React.PureComponent {

    state = {
        fetching: true,
        query: ''
    }

    async componentDidMount() {
        const booksResponse = await fetch("http://localhost:3000/books");
        const books = await booksResponse.json();

        this.props.context.setBooks(books);
        this.setState({ fetching: false });
    }

    handleSearch = async() => {
        const { query } = this.state;
        this.setState({ fetching: true });
        if (query.length) {
            const searchResponse = await fetch(`http://localhost:3000/books/search/${query}`);
            const searchedBooks = await searchResponse.json();

            console.log(searchedBooks);
            this.props.context.setBooks(searchedBooks);
            this.setState({ fetching: false });
        } else {
            const booksResponse = await fetch("http://localhost:3000/books");
            const books = await booksResponse.json();

            this.props.context.setBooks(books);
            this.setState({ fetching: false });
        }
    }

    handleQueryChange = (e) => {
        this.setState({ query: e.target.value });
    }

    render() {
        return (
            <DataContext.Consumer>
                {context => (
                    this.state.fetching ? <LinearProgress color={context.currentTheme.colorSecondary} /> :
                    <React.Fragment>
                        <TextField variant="outlined" type="search" label="Search Books" margin="normal" style={{marginLeft: "40%", width: "20%"}} value={this.state.query} onChange={this.handleQueryChange} />
                        <Button onClick={this.handleSearch} style={{marginTop: 24, marginLeft: 4}} color={this.props.context.currentTheme.colorPrimary}>Search</Button>
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
                    </React.Fragment>
                    
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