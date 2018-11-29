import React from 'react';
import { DataContext } from '../context/Data';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

class EditBook extends React.PureComponent {

    state = {
        name: '',
        pages: '',
        description: '',
        genre: '',
        redirect: false
    }

    postData = async(name, pages, description, genre) => {
        const headers = new Headers();
        headers.append("Authorization", window.localStorage.getItem("Authorization"));
        const formData = new FormData();
        formData.append("name", name);
        formData.append("pages", pages);
        formData.append("genre", genre);
        formData.append("description", description);
        const data = {
            method: 'PUT',
            headers,
            body: formData
        }
        try {
            const response = await fetch(`http://localhost:3000/books/${this.props.match.params.id}`, data);
            console.log(response);

            this.setState({redirect: true});
        } catch(e) {
            console.error(e);
            alert("An error ocured. Please try again");
        }
    }

    handleDescChange = (e) => {
        this.setState({description: e.target.value});
    }

    handleGenreChange = (e) => {
        this.setState({genre: e.target.value});
    }

    handleNameChange = (e) => {
        this.setState({name: e.target.value});
    }

    handlePagesChange = (e) => {
        this.setState({pages: e.target.value});
    }

    handleSubmit = (e) => {
        const { name, pages, description, genre } = this.state;
        if (name && pages && description && genre) {
            this.postData(name, pages, description, genre);
        } else {
            alert("All fields are mandatory to fill");
        }
    }

    render() {
        return(
            <React.Fragment>
                {this.state.redirect ? <Redirect to='/mybooks' /> : null}
                <Grid container direction="column" alignItems="center">
                    <TextField 
                        required
                        label="title"
                        value={this.state.name}
                        onChange={this.handleNameChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField 
                        required
                        label="genre"
                        value={this.state.genre}
                        onChange={this.handleGenreChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField 
                        required
                        label="pages"
                        value={this.state.pages}
                        onChange={this.handlePagesChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField 
                        required
                        label="description"
                        multiline
                        rowsMax="5"
                        rows="5"
                        value={this.state.description}
                        onChange={this.handleDescChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <Button onClick={this.handleSubmit} color={this.props.context.currentTheme.colorPrimary}>
                        Update Book
                    </Button>
                </Grid>
            </React.Fragment>
        )
    }
}

const contextToProps = (props) => (
    <DataContext.Consumer>
        {context => (
            <EditBook context={context} match={props.match}/>
        )}
    </DataContext.Consumer>
)

export default contextToProps;