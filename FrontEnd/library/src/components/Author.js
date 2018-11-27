import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import { DataContext } from '../context/Data';

const Author = ({ author }) => (
    <DataContext.Consumer>
        {context => (
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                        {author.fname} {author.lname}
                    </Typography>
                    <Typography component="p">
                        <strong>Books Written: </strong>{author.books.length}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link to="/books" style={{ textDecoration: 'none' }}>
                        <Button size="small" color={context.currentTheme.colorPrimary}>
                            Books
                        </Button>
                    </Link>
                </CardActions>
            </Card>
        )}
    </DataContext.Consumer>
)

export default Author