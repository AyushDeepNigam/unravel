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
  totalProblems: {
    padding: '1em 1em 1em 1em',
    marginBottom: 24,
  },
  totalProblemCountText: {
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

export class UserProblems extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      name: '',
      genre: '',
      description: '',
      email: '',
      date: '',
      thumbnail: '',
      viewFeedDetails: false,
      currentFeedId: '',
      userEmail: '',
    }
  }

  handleCancelClick = () => {
    this.setState({
      viewFeedDetails: false,
    })
  }

  render() {
    const { classes, user, problemsData } = this.props
    const {
      title,
      genre,
      description,
      date,
      name,
      currentFeedId,
      userEmail,
      viewFeedDetails,
    } = this.state
    const totalProblemsCount = problemsData.length
    const problems = problemsData.map(problem => (
      <Fragment key={problem._id}>
        <Card className={classes.card}>
          <CardContent>
            <div className={classes.firstContainer}>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {problem.title}
              </Typography>
              <Typography
                className={classes.date}
                color="textSecondary"
              >
                {problem.date}
              </Typography>
            </div>
            <Divider />
            <div className={classes.secondContainer}>
              <Avatar alt={problem.name} src={problem.thumbnail} />
              <Typography
                variant="h6"
                component="h2"
                className={classes.name}
              >
                {problem.name}
              </Typography>
            </div>
            <div className={classes.thirdContainer}>
              <Typography
                className={classes.genre}
                variant="body2"
                component="p"
                style={
                  problem.genre === 'Environment'
                    ? { color: 'green' }
                    : problem.genre === 'Technology'
                    ? { color: 'red' }
                    : problem.genre === 'Science'
                    ? { color: 'goldenrod' }
                    : problem.genre === 'Social'
                    ? { color: 'purple' }
                    : problem.genre === 'Political'
                    ? { color: 'orange' }
                    : problem.genre === 'Medical'
                    ? { color: 'blue' }
                    : { color: 'darkkhaki' }
                }
              >
                {problem.genre}
                <br />
              </Typography>
            </div>
            <div className={classes.fourthContainer}>
              <Typography className={classes.description}>
                {problem.description}
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
                    name: problem.name,
                    title: problem.title,
                    genre: problem.genre,
                    description: problem.description,
                    date: problem.date,
                    currentFeedId: problem._id,
                    userEmail: problem.email,
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
          <Paper className={classes.totalProblems}>
            <Typography
              className={classes.totalProblemCountText}
            >{`Posted ${totalProblemsCount} problems`}</Typography>
          </Paper>
        )}
        {this.state.viewFeedDetails ? (
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
          problems
        )}
      </Fragment>
    )
  }
}

export default withStyles(useStyles)(UserProblems)
