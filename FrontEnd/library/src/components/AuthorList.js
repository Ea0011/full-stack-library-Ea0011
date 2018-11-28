import React from 'react';
import Grid from '@material-ui/core/Grid'
import { DataContext } from '../context/Data';
import Author from './Author';

class AuthorList extends React.PureComponent {
    async componentDidMount() {
        if (!this.props.context.authors.length) {
            const authorResponse = await fetch("http://localhost:3000/authors");
            const authors = await authorResponse.json();

            authors.forEach(author => {this.props.context.addAuthor(author)});
        }
    }

    render() {
        return(
            <DataContext.Consumer>
                {context => (
                    <Grid container spacing={16} style={{padding: 8, marginTop: 35}}>
                        {context.authors.length ?
                            context.authors.map(author => (
                                <Grid item xs={12} sm={6} lg={4} xl={2} key={author.id}>
                                    <Author author={author}/>
                                </Grid>
                            )) : "No Authors Yet :("
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
            <AuthorList context={context} />
        )}
    </DataContext.Consumer>
)

export default contextToProps