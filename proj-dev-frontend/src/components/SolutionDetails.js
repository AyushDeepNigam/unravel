import React, { Component, Fragment } from 'react'
import {
  Paper,
  Typography,
  Button,
  withStyles,
  Divider,
  Avatar,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Snackbar,
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import axios from 'axios'

const useStyles = theme => ({
  paper: {
    margin: '1em 0 1em 0',
    padding: '1em 1.5em 1em 1.5em',
  },
  topContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '1em',
  },
  bottomContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  date: {
    marginLeft: 'auto',
    fontSize: 12,
    color: 'dimgray',
    marginTop: '1em',
  },
  name: {
    marginLeft: '0.5em',
    marginTop: '0.5em',
    color: 'dimgray',
  },
  buttonContainer: {
    display: 'flex',
  },
  backButton: {
    marginLeft: '0.5em',
  },
  solution: {
    marginTop: '0.5em',
  },
  statusContainer: {
    display: 'flex',
    marginBottom: '1em',
    marginTop: '1em',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  statusLabel: {
    fontWeight: 'bold',
    marginTop: '1.4em',
  },
  saveButton: {
    marginLeft: 'auto',
  },
})

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export class SolutionDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      solutionStatus: '',
      snackbarOpen: false,
    }
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this)
  }

  handleChange = name => event => {
    this.setState({
      ...this.state,
      [name]: event.target.value,
    })
  }

  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    this.setState({ snackbarOpen: false })
  }

  handleSubmit = (title, genre, description) => {
    const { solutionStatus } = this.state
    const { solutionId } = this.props
    axios.post(
      'http://localhost:3001/api/' + solutionId + '/updateData',
      {
        status: solutionStatus,
      },
    )

    this.setState({
      snackbarOpen: true,
      solutionStatus: '',
    })
  }

  render() {
    const {
      solutionProviderName,
      solutionProviderThumbnail,
      solutionDate,
      solution,
      handleSolutionDetailsBackButtonClick,
      classes,
    } = this.props
    const { solutionStatus } = this.state
    return (
      <Fragment>
        <Paper elevation={3} className={classes.paper}>
          <div className={classes.topContainer}>
            <Avatar
              className={classes.small}
              alt={solutionProviderName}
              src={solutionProviderThumbnail}
            />
            <Typography className={classes.name}>
              {solutionProviderName}
            </Typography>
            <Typography className={classes.date}>
              {solutionDate}
            </Typography>
          </div>
          <Divider />
          <Typography className={classes.solution}>
            {solution}
          </Typography>
          <div className={classes.statusContainer}>
            <Typography className={classes.statusLabel}>
              What would you like to do?
            </Typography>
            <FormControl
              variant="filled"
              className={classes.formControl}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={solutionStatus}
                onChange={this.handleChange('solutionStatus')}
                className={classes.statusList}
                label="Status"
              >
                <MenuItem value="Approved">Approve</MenuItem>
                <MenuItem value="Rejected">Reject</MenuItem>
                <MenuItem value="On Hold">On Hold</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className={classes.buttonContainer}>
            <Button
              className={classes.saveButton}
              size="small"
              variant="contained"
              color="primary"
              onClick={() => this.handleSubmit(solutionStatus)}
            >
              <i
                class="fa fa-floppy-o"
                aria-hidden="true"
                style={{ marginRight: '0.5em' }}
              ></i>
              Save
            </Button>
            <Button
              size="small"
              className={classes.backButton}
              onClick={handleSolutionDetailsBackButtonClick}
            >
              <i
                class="fa fa-chevron-left"
                aria-hidden="true"
                style={{ marginRight: '0.5em' }}
              ></i>
              Back
            </Button>
          </div>
        </Paper>
        <Snackbar
          open={this.state.snackbarOpen}
          autoHideDuration={5000}
          onClose={this.handleSnackbarClose}
        >
          <Alert
            onClose={this.handleSnackbarClose}
            severity="success"
          >
            {`Saved!`}
          </Alert>
        </Snackbar>
      </Fragment>
    )
  }
}

export default withStyles(useStyles)(SolutionDetails)
