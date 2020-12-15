import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const useStyles = theme => ({
  root: {
    maxWidth: '29%',
    marginTop: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  grid: {
    flexgrow: 1,
  },
})

class WelcomeScreen extends Component {
  render() {
    const { classes } = this.props
    return (
      <Fragment>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Problems"
              height="140"
              image="https://ccmit.mit.edu/wp-content/uploads/2014/09/problem-questions1.png"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Problems
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
              >
                Lizards are a widespread group of squamate reptiles,
                with over 6,000 species, ranging across all continents
                except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Solutions"
              height="140"
              image="https://cdn.businessnews.com.au/styles/medium_906x604/public/articles-2017-10/KT20OCT_shutterstock_96606898.jpg?itok=vi_GdZfA"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Solutions
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
              >
                Lizards are a widespread group of squamate reptiles,
                with over 6,000 species, ranging across all continents
                except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Ideas"
              height="140"
              image="https://www.ethos3.com/wp-content/uploads/2015/12/slideshare-presentation-ideas.jpg"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Ideas
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
              >
                Lizards are a widespread group of squamate reptiles,
                with over 6,000 species, ranging across all continents
                except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Fragment>
    )
  }
}

export default withStyles(useStyles)(WelcomeScreen)
