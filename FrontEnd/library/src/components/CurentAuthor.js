import React from 'react'
import { DataContext } from '../context/Data';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'

class CurentAuthor extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            fname: props.context.currentAuthor.fname,
            lname: props.context.currentAuthor.lname
        }
    }

    handleFnameChange = (e) => {
        this.setState({ fname: e.target.value })
    }

    handleLnameCange = (e) => {
        this.setState({ lname: e.target.value })
    }

    handleSubmit = async() => {
        const headers = new Headers();
        headers.append("Authorization", window.localStorage.getItem("Authorization"));
        const form = new FormData();
        form.append("fname", this.state.fname);
        form.append("lname", this.state.lname);
        const data = {
            method: 'PUT',
            headers,
            body: form
        };
        const response = await fetch("http://localhost:3000/authors", data);
        const json = await response.json();
        this.props.context.setCurrentAuthor({ fname: json.fname, lname: json.lname });
        window.localStorage.setItem("fname", json.fname);
        window.localStorage.setItem("lname", json.lname);
    }

    render() {
        return(
            <React.Fragment>
                <Grid container direction="column" alignItems="center">
                    <TextField
                        id="fname"
                        value={this.state.fname}
                        onChange={this.handleFnameChange}
                        label="First Name"
                        margin="normal"
                    />
                    <TextField
                        id="lname"
                        value={this.state.lname}
                        onChange={this.handleLnameCange}
                        label="Last Name"
                        margin="normal"
                    />
                    <Button onClick={this.handleSubmit} color={this.props.context.currentTheme.colorPrimary}>
                        Update Info!
                    </Button>
                </Grid>
            </React.Fragment>
        )
    }
}

const contextToProps = () => (
    <DataContext.Consumer>
        {context => (
            <CurentAuthor 
                context={context}
            />
        )}
    </DataContext.Consumer>
)

export default contextToProps;