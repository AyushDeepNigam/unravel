import React, { Component, Fragment } from 'react'
import {
  Button,
  TextField,
  Snackbar,
  withStyles,
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import axios from 'axios'

const useStyles = theme => ({
  buttonContainer: {
    display: 'flex',
  },
  postButton: {
    marginLeft: 'auto',
  },
  backButton: {
    marginLeft: '0.5em',
  },
})

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export class SolutionForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      solution: '',
      snackbarOpen: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this)
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    this.setState({ snackbarOpen: false })
  }

  handleSubmit = solution => {
    const moment = require('moment')
    const date = moment().format('LLL')
    const { currentFeedId } = this.props
    const { email, thumbnail, name } = this.props.currentUser
    axios.post(
      'http://localhost:3001/api/' + currentFeedId + '/postSolution',
      {
        solution: solution,
        problemId: currentFeedId,
        date: date,
        email: email,
        thumbnail: thumbnail,
        name: name,
      },
    )
    this.setState({
      snackbarOpen: true,
      solution: '',
    })
  }

  render() {
    const { solution } = this.state
    const { classes, handleCancelClick } = this.props
    const isEnabled = solution.length > 0
    return (
      <Fragment>
        <TextField
          id="solution"
          label="Post a solution"
          multiline
          rowsMax="10"
          rows="10"
          fullWidth
          value={solution}
          onChange={this.handleChange('solution')}
          margin="normal"
          variant="outlined"
        />
        <div className={classes.buttonContainer}>
          <Button
            color="primary"
            variant="contained"
            disabled={!isEnabled}
            className={classes.postButton}
            onClick={() => this.handleSubmit(solution)}
          >
            <i
              class="fa fa-paper-plane"
              aria-hidden="true"
              style={{ marginRight: '0.5em' }}
            ></i>
            Post
          </Button>
          <Button
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
        <Snackbar
          open={this.state.snackbarOpen}
          autoHideDuration={5000}
          onClose={this.handleSnackbarClose}
        >
          <Alert
            onClose={this.handleSnackbarClose}
            severity="success"
          >
            {`Successfully Posted!`}
          </Alert>
        </Snackbar>
      </Fragment>
    )
  }
}

export default withStyles(useStyles)(SolutionForm)
