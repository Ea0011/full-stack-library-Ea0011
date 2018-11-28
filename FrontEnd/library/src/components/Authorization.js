import React from 'react'
import { DataContext } from '../context/Data';
import { Redirect } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

class Authorization extends React.PureComponent {
    state = {
        redirect: window.localStorage.getItem("Authorization") !== "undefined",
        email: "",
        password: ""
    }

    handleMailChange = (e) => {
        this.setState({email: e.target.value})
    }

    handlePassChange = (e) => {
        this.setState({password: e.target.value})
    }

    async postData(email, password) {
        const form = new FormData();
        form.append("email", email);
        form.append("password", password);
        const data = {
            method: 'POST',
            body: form
        };
        const response = await fetch("http://localhost:3000/auth/login", data);
        const json = await response.json();
        console.log(json);
        this.props.context.setCurrentAuthor({fname: json.author.fname, lname: json.author.lname})
        window.localStorage.setItem("Authorization", json.author.authentication_token);
        window.localStorage.setItem("fname", json.author.fname);
        window.localStorage.setItem("lname", json.author.lname);
        this.setState({redirect: true});
    }

    handleSubmit = (e) => {
        const { email, password } = this.state;

        if (email && password) {
            this.postData(email, password);
        }
    }

    render() {
        return(
            this.state.redirect ? <Redirect to="/mypage" /> :
            <React.Fragment>
                <Grid container direction="column" alignItems="center">
                    <TextField 
                        required
                        label="email"
                        value={this.state.email}
                        onChange={this.handleMailChange}
                        margin="normal"
                    />
                    <TextField 
                        required
                        label="password"
                        value={this.state.password}
                        onChange={this.handlePassChange}
                        margin="normal"
                    />
                    <Button onClick={this.handleSubmit} color={this.props.context.currentTheme.colorPrimary}>
                        log in!
                    </Button>
                </Grid>
            </React.Fragment>
        )
    }
}

const contextToProps = () => (
    <DataContext.Consumer>
        {context => (
            <Authorization context={context} />
        )}
    </DataContext.Consumer>
)

export default contextToProps;