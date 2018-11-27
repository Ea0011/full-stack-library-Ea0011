import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import { DataContext } from '../context/Data';

const Book = ({ book }) => (
    <DataContext.Consumer>
        {context => (
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                        {book.name}
                    </Typography>
                    <Typography component="p">
                    <strong>Number of pages: </strong>{book.pages}
                    </Typography>
                    <Typography component="p">
                        <strong>Genre: </strong>{book.genre}
                    </Typography>
                    <Typography component="p" style={{marginTop: 25}}>
                        {book.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link to="/author" style={{ textDecoration: 'none' }}>
                        <Button size="small" color={context.currentTheme.colorPrimary}>
                            About the Author
                        </Button>
                    </Link>
                </CardActions>
            </Card>
        )}
    </DataContext.Consumer>
)

export default Book