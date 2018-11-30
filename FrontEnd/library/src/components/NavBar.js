import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import { Link } from 'react-router-dom'
import { DataContext } from '../context/Data';
import { Typography } from '@material-ui/core';

const styles = {
    links: {
        textDecoration: "none", color: "inherit"
    },
    buttons: {
        color: "white",
         marginLeft: 8
    }
}

export default
({ loggedIn, author, changeTheme }) => (
    <DataContext.Consumer>
        {context => (
            <React.Fragment>
            <AppBar position="static" color={context.currentTheme.colorPrimary}>
                <ToolBar>
                        <Typography style={{flexGrow: 1}} variant="h6" color="inherit">
                            <Link to='/' style={{textDecoration: "none", color: "inherit"}}>
                                <Button color="inherit" size="medium">Home</Button>
                            </Link>
                        </Typography>
                        <Typography style={{flexGrow: 30}} variant="h6" color="inherit">
                            <Button color="inherit" size="medium" onClick={changeTheme}>Change Theme :))</Button>
                        </Typography>
                    {
                        loggedIn ?
                        <>
                            <Link to='/mypage' style={styles.links}>
                                <Avatar>{author.fname[0]}{author.lname[0]}</Avatar>
                            </Link>
                            <Link to='/addbook' style={styles.links}>
                                <Button style={styles.buttons}>Add Book</Button>
                            </Link>
                            <Link to='/mybooks' style={styles.links}>
                                <Button style={styles.buttons}>My Books</Button>
                            </Link>
                            <Link to='/authors' style={styles.links}>
                                <Button style={styles.buttons}>Authors</Button>
                            </Link>
                            <Button onClick={context.removeCurrentAuthor} style={styles.buttons}>Log Out</Button>
                        </> :
                        <> 
                            <Link to='/authors' style={styles.links}>
                                <Button style={styles.buttons}>Authors</Button>
                            </Link>
                            <Link to='/login' style={styles.links}>
                                <Button style={styles.buttons}>Log In</Button>
                            </Link>
                            <Link to='/signup' style={styles.links}>
                                <Button style={styles.buttons}>Sign Up</Button>
                            </Link>
                        </>
                    }
                </ToolBar>
            </AppBar>
        </React.Fragment>
        )}
    </DataContext.Consumer>
)