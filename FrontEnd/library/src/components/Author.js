import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
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
                </CardActions>
            </Card>
        )}
    </DataContext.Consumer>
)

export default Author