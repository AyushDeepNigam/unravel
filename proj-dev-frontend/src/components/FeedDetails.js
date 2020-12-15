import React, { Component, Fragment } from 'react'
import {
  Paper,
  Typography,
  Button,
  withStyles,
  Divider,
} from '@material-ui/core'
import SolutionForm from './SolutionForm'
import SolutionCard from './SolutionCard'
import FeedsForm from './FeedsForm'
import axios from 'axios'

const useStyles = theme => ({
  card: {
    minWidth: 275,
    marginBottom: 26,
  },
  paper: {
    padding: '2% 2% 2% 2%',
    marginBottom: '1em',
  },
  title: {
    fontSize: 32,
    color: 'darkslategrey',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3F51B5',
    marginBottom: '0.5em',
  },
  genre: {
    fontWeight: 'bold',
    marginBottom: '0.5em',
  },
  date: {
    color: 'dimgray',
    marginLeft: 'auto',
  },
  description: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontSize: 16,
  },
  pos: {
    marginBottom: 12,
  },
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  backButtonContainer: {
    display: 'flex',
  },
  backButton: {
    marginLeft: 'auto',
  },
  solutionsbuttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1em 0 1em 0',
  },
  viewSolutionsButton: {
    padding: '1em 1em 1em 1em',
  },
  firstContainer: {
    display: 'flex',
  },
  editButton: {
    marginBottom: '0.8em',
    marginLeft: 'auto',
  },
  deleteButton: {
    marginBottom: '0.8em',
    marginLeft: '10px',
  },
  editButtonContainer: {
    display: 'flex',
  },
})

export class FeedDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewSolutions: false,
      editProblemButtonClicked: false,
    }
    this.handleEditProblemClick = this.handleEditProblemClick.bind(
      this,
    )
  }

  handleEditProblemClick = () => {
    this.setState({
      editProblemButtonClicked: true,
    })
  }

  handleEditFormCancel = () => {
    this.setState({
      editProblemButtonClicked: false,
    })
  }

  handlePostDelete = currentFeedId => {
    axios.delete(
      'http://localhost:3001/api/' + currentFeedId + '/deleteData',
      {
        id: currentFeedId,
      },
    )
    this.props.handleCancelClick()
  }

  render() {
    const {
      name,
      title,
      genre,
      description,
      date,
      handleCancelClick,
      classes,
      currentUser,
      currentFeedId,
      problemUserEmail,
    } = this.props
    const { viewSolutions, editProblemButtonClicked } = this.state
    const PARENT = 'FEED_DETAILS'

    return (
      <Fragment>
        {editProblemButtonClicked ? (
          <FeedsForm
            user={currentUser}
            parent={PARENT}
            genre={genre}
            title={title}
            description={description}
            handleEditFormCancel={this.handleEditFormCancel}
            currentFeedId={currentFeedId}
          />
        ) : (
          <Fragment>
            <Paper className={classes.paper}>
              <div className={classes.firstContainer}>
                <Typography>Posted by</Typography>
                <Typography className={classes.date}>
                  {date}
                </Typography>
              </div>
              <Typography className={classes.name}>{name}</Typography>
              {currentUser.email === problemUserEmail && (
                <div className={classes.editButtonContainer}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.editButton}
                    onClick={this.handleEditProblemClick}
                  >
                    <i
                      class="fa fa-pencil"
                      aria-hidden="true"
                      style={{ marginRight: '0.5em' }}
                    ></i>
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    className={classes.deleteButton}
                    onClick={() =>
                      this.handlePostDelete(currentFeedId)
                    }
                  >
                    <i
                      class="fa fa-trash"
                      aria-hidden="true"
                      style={{ marginRight: '0.5em' }}
                    ></i>
                    Delete
                  </Button>
                </div>
              )}
              <Divider />
              <Typography className={classes.title}>
                {title}
              </Typography>
              <Typography
                className={classes.genre}
                style={
                  genre === 'Environment'
                    ? { color: 'green' }
                    : genre === 'Technology'
                    ? { color: 'red' }
                    : genre === 'Science'
                    ? { color: 'goldenrod' }
                    : genre === 'Social'
                    ? { color: 'purple' }
                    : genre === 'Political'
                    ? { color: 'orange' }
                    : genre === 'Medical'
                    ? { color: 'blue' }
                    : { color: 'darkkhaki' }
                }
              >
                {genre}
              </Typography>
              <Typography className={classes.description}>
                {description}
              </Typography>
              {name === currentUser.name ? (
                <div className={classes.backButtonContainer}>
                  <Button
                    variant="outlined"
                    onClick={handleCancelClick}
                    className={classes.backButton}
                  >
                    <i
                      class="fa fa-chevron-left"
                      aria-hidden="true"
                      style={{ marginRight: '0.5em' }}
                    ></i>
                    Back
                  </Button>
                </div>
              ) : (
                <SolutionForm
                  handleCancelClick={handleCancelClick}
                  currentFeedId={currentFeedId}
                  currentUser={currentUser}
                />
              )}
            </Paper>
            {currentUser.email === problemUserEmail && (
              <div className={classes.solutionsbuttonContainer}>
                {!viewSolutions ? (
                  <Button
                    fullWidth
                    className={classes.viewSolutionsButton}
                    variant="contained"
                    disableElevation
                    onClick={() =>
                      this.setState({ viewSolutions: true })
                    }
                  >
                    View Solutions
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
                    </svg>
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    className={classes.viewSolutionsButton}
                    variant="contained"
                    disableElevation
                    onClick={() =>
                      this.setState({ viewSolutions: false })
                    }
                  >
                    Hide Solutions
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
                    </svg>
                  </Button>
                )}
              </div>
            )}
            {viewSolutions && (
              <SolutionCard currentFeedId={currentFeedId} />
            )}
          </Fragment>
        )}
      </Fragment>
    )
  }
}

export default withStyles(useStyles)(FeedDetails)
