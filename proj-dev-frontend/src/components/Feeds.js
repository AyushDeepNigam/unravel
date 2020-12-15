import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Divider, Paper } from '@material-ui/core'
import FeedDetails from './FeedDetails'
import { Avatar } from '@material-ui/core'

const useStyles = theme => ({
  card: {
    minWidth: '80%',
    marginBottom: 26,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3F51B5',
    paddingTop: '0.5em',
    marginLeft: '1em',
  },
  genre: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  description: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontSize: 18,
    marginRight: '1em',
  },
  date: {
    fontSize: 14,
    marginLeft: 'auto',
    marginTop: '0.5em',
  },
  viewFeedDetailsButton: {
    marginLeft: 'auto',
  },
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  totalFeeds: {
    padding: '1em 1em 1em 1em',
    marginBottom: 24,
  },
  totalFeedCountText: {
    color: 'dimgray',
    fontSize: 'large',
  },
  firstContainer: {
    display: 'flex',
    marginTop: '-0.5em',
    marginBottom: '0em',
    flexWrap: 'wrap',
  },
  secondContainer: {
    display: 'flex',
    marginTop: '1em',
    flexWrap: 'wrap',
  },
  thirdContainer: {
    marginTop: '0.7em',
    flexWrap: 'wrap',
  },
  fourthContainer: {
    display: 'flex',
    marginTop: '0.5em',
  },
})

class Feeds extends Component {
  state = {
    viewFeedDetails: false,
    name: '',
    title: '',
    genre: '',
    description: '',
    date: '',
    currentFeedId: '',
    userEmail: '',
  }

  handleCancelClick = () => {
    this.setState({
      viewFeedDetails: false,
    })
  }

  render() {
    const { classes, feedDataDatabase, user } = this.props
    const {
      name,
      title,
      genre,
      description,
      date,
      currentFeedId,
      viewFeedDetails,
      userEmail,
    } = this.state
    const totalFeedsCount = feedDataDatabase.length
    const feeds = feedDataDatabase.map(feed => (
      <Fragment key={feed._id}>
        <Card className={classes.card}>
          <CardContent>
            <div className={classes.firstContainer}>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {feed.title}
              </Typography>
              <Typography
                className={classes.date}
                color="textSecondary"
              >
                {feed.date}
              </Typography>
            </div>
            <Divider />
            <div className={classes.secondContainer}>
              <Avatar alt={feed.name} src={feed.thumbnail} />
              <Typography
                variant="h6"
                component="h2"
                className={classes.name}
              >
                {feed.name}
              </Typography>
            </div>
            <div className={classes.thirdContainer}>
              {' '}
              <Typography
                className={classes.genre}
                variant="body2"
                component="p"
                style={
                  feed.genre === 'Environment'
                    ? { color: 'green' }
                    : feed.genre === 'Technology'
                    ? { color: 'red' }
                    : feed.genre === 'Science'
                    ? { color: 'goldenrod' }
                    : feed.genre === 'Social'
                    ? { color: 'purple' }
                    : feed.genre === 'Political'
                    ? { color: 'orange' }
                    : feed.genre === 'Medical'
                    ? { color: 'blue' }
                    : { color: 'darkkhaki' }
                }
              >
                {feed.genre}
                <br />
              </Typography>
            </div>
            <div className={classes.fourthContainer}>
              <Typography className={classes.description}>
                {feed.description}
              </Typography>
              <Button
                size="small"
                variant="contained"
                disableElevation
                className={classes.viewFeedDetailsButton}
                color="secondary"
                onClick={() =>
                  this.setState({
                    viewFeedDetails: true,
                    name: feed.name,
                    title: feed.title,
                    genre: feed.genre,
                    description: feed.description,
                    date: feed.date,
                    currentFeedId: feed._id,
                    userEmail: feed.email,
                  })
                }
              >
                <i
                  class="fa fa-bars"
                  aria-hidden="true"
                  style={{ marginRight: '0.5em' }}
                ></i>
                {`View`}
              </Button>
            </div>
          </CardContent>
        </Card>
      </Fragment>
    ))
    return (
      <Fragment>
        {!viewFeedDetails && (
          <Paper className={classes.totalFeeds}>
            <Typography
              className={classes.totalFeedCountText}
            >{`Found ${totalFeedsCount} problems`}</Typography>
          </Paper>
        )}
        {viewFeedDetails ? (
          <FeedDetails
            name={name}
            title={title}
            genre={genre}
            description={description}
            date={date}
            handleCancelClick={this.handleCancelClick}
            currentUser={user}
            currentFeedId={currentFeedId}
            problemUserEmail={userEmail}
          />
        ) : (
          feeds
        )}
      </Fragment>
    )
  }
}

export default withStyles(useStyles)(Feeds)
