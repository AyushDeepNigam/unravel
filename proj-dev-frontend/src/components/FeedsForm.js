import React, { Component, Fragment } from 'react'
import {
  Button,
  TextField,
  Snackbar,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  Avatar,
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'

const useStyles = theme => ({
  margin: {
    margin: theme.spacing(1),
    left: '81%',
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    padding: '2% 2% 2% 2%',
  },
  formHeading: {
    fontSize: 28,
  },
  userIcon: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginTop: '1em',
    marginRight: '0.3em',
  },
  genre: {
    marginTop: '1.1em',
  },
  buttonContainer: {
    display: 'flex',
  },
  postButton: {
    marginLeft: 'auto',
  },
  cancelButton: {
    marginLeft: '0.5em',
  },
})

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export class FeedsForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.user.name,
      email: this.props.user.email,
      title:
        this.props.parent === 'FEED_DETAILS' ? this.props.title : '',
      genre:
        this.props.parent === 'FEED_DETAILS' ? this.props.genre : '',
      description:
        this.props.parent === 'FEED_DETAILS'
          ? this.props.description
          : '',
      snackbarOpen: false,
    }
    this.handleChange = this.handleChange.bind(this)
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
    const moment = require('moment')
    const date = moment().format('LLL')
    const { name, email, thumbnail } = this.props.user

    axios.post('http://localhost:3001/api/putData', {
      name: name,
      title: title,
      genre: genre,
      description: description,
      email: email,
      date: date,
      thumbnail: thumbnail,
    })

    this.setState({
      snackbarOpen: true,
      title: '',
      genre: '',
      description: '',
    })
  }

  handleFormUpdate = (title, description) => {
    const { currentFeedId } = this.props

    axios.post(
      'http://localhost:3001/api/current_user/problems/' +
        currentFeedId +
        '/UpdateData',
      {
        title: title,
        description: description,
      },
    )

    this.setState({
      snackbarOpen: true,
    })
  }

  render() {
    const {
      classes,
      handleFormCancel,
      parent,
      handleEditFormCancel,
    } = this.props
    const { name, title, genre, description, email } = this.state
    const isEnabled =
      name.length > 0 &&
      title.length > 0 &&
      genre.length > 0 &&
      description.length > 100
    const parentIsFeedDetails = parent === 'FEED_DETAILS'
    return (
      <Fragment>
        <Paper className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {parentIsFeedDetails ? (
                <Typography className={classes.formHeading}>
                  {`Please make the necessary changes`}
                </Typography>
              ) : (
                <Typography className={classes.formHeading}>
                  {`Please complete all the fields`}
                </Typography>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="name"
                label="Posting as"
                value={name}
                margin="normal"
                variant="filled"
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="">
                      <Avatar
                        alt={this.props.user.name}
                        src={this.props.user.thumbnail}
                        className={classes.userIcon}
                      />{' '}
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="email"
                label="Email"
                value={email}
                margin="normal"
                variant="filled"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="title"
                label="Title"
                multiline
                required
                rowsMax="4"
                value={title}
                onChange={this.handleChange('title')}
                margin="normal"
              />
            </Grid>
            {parentIsFeedDetails ? (
              <Grid item xs={6}>
                <FormControl fullWidth className={classes.genre}>
                  <InputLabel
                    id="demo-customized-select-label"
                    margin="normal"
                    required
                  >
                    Genre
                  </InputLabel>
                  <Select
                    label="Genre"
                    labelId="demo-customized-select-label"
                    id="genre"
                    margin="normal"
                    value={genre}
                    disabled
                    onChange={this.handleChange('genre')}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Environment">
                      Environment
                    </MenuItem>
                    <MenuItem value="Medical">Medical</MenuItem>
                    <MenuItem value="Political">Political</MenuItem>
                    <MenuItem value="Science">Science</MenuItem>
                    <MenuItem value="Social">Social</MenuItem>
                    <MenuItem value="Technology">Technology</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            ) : (
              <Grid item xs={6}>
                <FormControl fullWidth className={classes.genre}>
                  <InputLabel
                    id="demo-customized-select-label"
                    margin="normal"
                    required
                  >
                    Genre
                  </InputLabel>
                  <Select
                    label="Genre"
                    labelId="demo-customized-select-label"
                    id="genre"
                    margin="normal"
                    value={genre}
                    onChange={this.handleChange('genre')}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Environment">
                      Environment
                    </MenuItem>
                    <MenuItem value="Medical">Medical</MenuItem>
                    <MenuItem value="Political">Political</MenuItem>
                    <MenuItem value="Science">Science</MenuItem>
                    <MenuItem value="Social">Social</MenuItem>
                    <MenuItem value="Technology">Technology</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                style={{ width: '100%' }}
                id="description"
                label="Description"
                placeholder="Write a description of the problem or proposal in at least 100 characters"
                required
                multiline
                rowsMax="16"
                rows="16"
                fullWidth
                value={description}
                onChange={this.handleChange('description')}
                margin="normal"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <div className={classes.buttonContainer}>
            {parentIsFeedDetails ? (
              <Fragment>
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.postButton}
                  disabled={!isEnabled}
                  onClick={() =>
                    this.handleFormUpdate(title, description)
                  }
                >
                  Update
                </Button>
                <Button
                  className={classes.cancelButton}
                  onClick={handleEditFormCancel}
                >
                  Cancel
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.postButton}
                  disabled={!isEnabled}
                  onClick={() =>
                    this.handleSubmit(title, genre, description)
                  }
                >
                  <i
                    class="fa fa-paper-plane"
                    aria-hidden="true"
                    style={{ marginRight: '0.5em' }}
                  ></i>
                  Post
                </Button>
                <Button
                  component={Link}
                  to="/"
                  size="medium"
                  className={classes.cancelButton}
                  onClick={handleFormCancel}
                >
                  Cancel
                </Button>
              </Fragment>
            )}
          </div>
        </Paper>
        {parentIsFeedDetails ? (
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
        ) : (
          <Snackbar
            open={this.state.snackbarOpen}
            autoHideDuration={5000}
            onClose={this.handleSnackbarClose}
          >
            <Alert
              onClose={this.handleSnackbarClose}
              severity="success"
            >
              {`Successfully Updated!`}
            </Alert>
          </Snackbar>
        )}
      </Fragment>
    )
  }
}

export default withStyles(useStyles)(FeedsForm)
