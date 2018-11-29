import React from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import { DataContext } from '../context/Data';

class CreateAuthor extends React.PureComponent {
    state = {
        email: '',
        password: '',
        passwordConf: '',
        redirect: !!window.localStorage.getItem("Authorization"),
        fname: '',
        lname: ''
    }

    handleMailChange = (e) => {
        this.setState({email: e.target.value})
    }

    handlePassChange = (e) => {
        this.setState({password: e.target.value})
    }

    handlePassConfChange = (e) => {
        this.setState({passwordConf: e.target.value})
    }

    handleFnameChange = (e) => {
        this.setState({fname: e.target.value})
    }

    handleLnameChange = (e) => {
        this.setState({lname: e.target.value})
    }

    async postData(email, password, passwordConf, fname, lname) {
        const form = new FormData();
        form.append("email", email);
        form.append("password", password);
        form.append("password_confirmation", passwordConf)
        form.append("fname", fname);
        form.append("lname", lname)
        const data = {
            method: 'POST',
            body: form
        };
        try {
            const response = await fetch("http://localhost:3000/signup", data);
            const json = await response.json();
            this.props.context.setCurrentAuthor({fname: json.auth_data.author.fname, lname: json.auth_data.author.lname})
            window.localStorage.setItem("Authorization", json.auth_data.author.authentication_token);
            window.localStorage.setItem("fname", json.auth_data.author.fname);
            window.localStorage.setItem("lname", json.auth_data.author.lname);
            this.setState({redirect: true});
        } catch(e) {
            console.error(e);
            alert("An error ocured. Please try again");
        }
    }

    handleSubmit = (e) => {
        const { email, password, passwordConf, fname, lname } = this.state;
        if (email && password && passwordConf && fname && lname) {
            this.postData(email, password, passwordConf, fname, lname);
        } else {
            alert("All fields are mandatory to fill");
        }
    }

    render() {
        return(
            this.state.redirect ? <Redirect to="/mybooks" /> :
            <React.Fragment>
                <Grid container direction="column" alignItems="center">
                    <TextField 
                        required
                        label="first name"
                        value={this.state.fname}
                        onChange={this.handleFnameChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField 
                        required
                        label="last name"
                        value={this.state.lname}
                        onChange={this.handleLnameChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField 
                        required
                        label="email"
                        value={this.state.email}
                        onChange={this.handleMailChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField 
                        required
                        label="password"
                        value={this.state.password}
                        onChange={this.handlePassChange}
                        margin="normal"
                        variant="outlined"
                        type="password"
                    />
                    <TextField 
                        required
                        label="Confirm Password"
                        value={this.state.passwordConf}
                        onChange={this.handlePassConfChange}
                        margin="normal"
                        variant="outlined"
                        type="password"
                    />
                    <Button onClick={this.handleSubmit} color={this.props.context.currentTheme.colorPrimary}>
                        Sign Up!
                    </Button>
                </Grid>
            </React.Fragment>
        )
    }
}

const contextToProps = () => (
    <DataContext.Consumer>
        {context => (
            <CreateAuthor context={context} />
        )}
    </DataContext.Consumer>
)

export default contextToProps;