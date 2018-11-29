import React from 'react';
import Grid from '@material-ui/core/Grid'
import { DataContext } from '../context/Data';
import Author from './Author';
import LinearProgress from '@material-ui/core/LinearProgress';

class AuthorList extends React.PureComponent {

    state = {
        fetching: true
    }  

    async componentDidMount() {
        const authorResponse = await fetch("http://localhost:3000/authors");
        const authors = await authorResponse.json();

        this.props.context.setAuthors(authors);
        this.setState({ fetching: false })
    }

    render() {
        return(
            <DataContext.Consumer>
                {context => (
                    this.state.fetching ? <LinearProgress color={context.currentTheme.colorSecondary} /> :
                    <Grid container spacing={16} style={{padding: 8, marginTop: 4}}>
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