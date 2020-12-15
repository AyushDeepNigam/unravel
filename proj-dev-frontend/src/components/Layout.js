import React, { Fragment, Component } from 'react'
import clsx from 'clsx'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { mainListItems } from './listItems'
import Dashboard from './Dashboard'
import EditorPicks from './EditorPicks'
import FeedsForm from './FeedsForm'
import WelcomeScreen from './WelcomeScreen'
import NavBar from './NavBar'
import PropTypes from 'prop-types'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import ProblemsDashboard from './ProblemsDashboard'
import SolutionsDashboard from './SolutionsDashboard'
import UserProfile from './UserProfile'

const drawerWidth = 240

const useStyles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  feedButton: {
    width: '70%',
    margin: 'auto',
    // marginRight: 'auto',
    marginTop: 25,
  },
})

class Layout extends Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      profileImageUrl: PropTypes.string,
      googleId: PropTypes.string,
      screenName: PropTypes.string,
      _id: PropTypes.string,
    }),
  }

  constructor(props) {
    super(props)
    this.state = {
      open: true,
      title: 'Dashboard',
      user: {},
      error: null,
      authenticated: false,
      addNewProblemClicked: false,
    }
    this.handleNotAuthenticated = this.handleNotAuthenticated.bind(
      this,
    )
    this.handleClick = this.handleClick.bind(this)
    this.handleFormCancel = this.handleFormCancel.bind(this)
  }

  componentDidMount() {
    fetch('http://localhost:3001/current_user', {
      method: 'GET',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Request-Headers': 'true',
      },
      credentials: 'include',
    })
      .then(response => {
        console.log(response, 'response')
        if (response.status === 200) {
          return response.json()
        } else {
          this.setState({
            authenticated: false,
            error: 'Failed to authenticate user',
          })
        }
        throw new Error('failed to authenticate user')
      })
      .then(responseJson => {
        this.setState({
          authenticated: true,
          user: responseJson.user,
        })
      })
      .catch(error => {
        this.setState({
          authenticated: false,
          error: 'Failed to authenticate user',
        })
      })
  }

  handleNotAuthenticated = () => {
    this.setState({
      authenticated: false,
    })
  }

  handleClick() {
    this.setState({
      addNewProblemClicked: true,
    })
  }

  handleFormCancel() {
    this.setState({
      addNewProblemClicked: false,
    })
  }

  render() {
    const { classes } = this.props
    // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
    const { authenticated, addNewProblemClicked, user } = this.state
    return (
      <BrowserRouter>
        <div className={classes.root}>
          <CssBaseline />
          <NavBar
            handleNotAuthenticated={this.handleNotAuthenticated}
            authenticated={this.state.authenticated}
            user={user}
          />
          <Fragment>
            {!authenticated ? (
              <WelcomeScreen />
            ) : (
              <Fragment>
                <Drawer
                  variant="permanent"
                  classes={{
                    paper: clsx(
                      classes.drawerPaper,
                      !this.state.open && classes.drawerPaperClose,
                    ),
                  }}
                >
                  <div className={classes.toolbarIcon}>
                    <IconButton onClick={this.handleDrawer}>
                      <ChevronLeftIcon />
                    </IconButton>
                  </div>
                  <Divider />
                  <List>{mainListItems}</List>
                  <Divider />
                  <Button
                    component={Link}
                    to="/post-a-problem"
                    variant="contained"
                    color="secondary"
                    className={classes.feedButton}
                    onClick={this.handleClick}
                  >
                    <i
                      class="fa fa-paper-plane"
                      aria-hidden="true"
                      style={{ marginRight: '0.5em' }}
                    ></i>
                    Post a problem
                  </Button>
                </Drawer>
                <Fragment>
                  <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container
                      maxWidth="lg"
                      className={classes.container}
                    >
                      <Switch>
                        <Route
                          exact
                          path="/"
                          render={props => (
                            <Dashboard
                              addNewProblemClicked={
                                addNewProblemClicked
                              }
                              {...props}
                              handleClick={this.handleClick}
                              handleFormCancel={this.handleFormCancel}
                              user={user}
                            />
                          )}
                        />
                        <Route
                          exact
                          path="/solutions"
                          render={props => (
                            <SolutionsDashboard {...props} />
                          )}
                        />
                        <Route
                          exact
                          path="/problems"
                          render={props => (
                            <ProblemsDashboard
                              {...props}
                              user={user}
                            />
                          )}
                        />
                        <Route
                          exact
                          path="/editors-pick"
                          render={props => <EditorPicks {...props} />}
                        />
                        <Route
                          path="/profile"
                          render={props => (
                            <UserProfile user={user} {...props} />
                          )}
                        />
                        {addNewProblemClicked ? (
                          <Route
                            exact
                            path="/post-a-problem"
                            render={props => (
                              <FeedsForm
                                {...props}
                                handleFormCancel={
                                  this.handleFormCancel
                                }
                                handleClick={this.handleClick}
                                user={user}
                              />
                            )}
                          />
                        ) : (
                          <Route
                            exact
                            path="/post-a-problem"
                            render={props => (
                              <FeedsForm
                                {...props}
                                handleFormCancel={
                                  this.handleFormCancel
                                }
                                handleClick={this.handleClick}
                                user={user}
                              />
                            )}
                          />
                        )}
                      </Switch>
                    </Container>
                  </main>
                </Fragment>
              </Fragment>
            )}
          </Fragment>
        </div>
      </BrowserRouter>
    )
  }
}

export default withStyles(useStyles)(Layout)
