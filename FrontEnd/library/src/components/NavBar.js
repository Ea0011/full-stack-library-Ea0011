import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

export default
class NavBar extends React.PureComponent {
    render() {
        console.log(this.props.loggedIn);
        return(
            <React.Fragment>
                <AppBar position="static" color="secondary">
                    <ToolBar>
                        {
                            this.props.loggedIn ? "Logged in" :
                            <> 
                                <Button color="inherit">Login</Button>
                                <Button color="inherit">Sign Up</Button>
                            </>
                        }
                    </ToolBar>
                </AppBar>
            </React.Fragment>
        )
    }
}