import React, { Component, Fragment } from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import VpnKeySharpIcon from '@material-ui/icons/VpnKeySharp'
import { Avatar } from '@material-ui/core'

const drawerWidth = 240

const useStyles = theme => ({
  root: {
    display: 'flex',
    color: 'white',
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
    // width: `calc(100% - ${drawerWidth}px)`,
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
  iconButtonItems: {
    margin: '0 5px',
  },
})

export class NavBar extends Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
  }

  handleLoginClick = () => {
    window.open('http://localhost:3001/auth/google', '_self')
  }

  handleLogoutClick = () => {
    window.open('http://localhost:3001/api/logout', '_self')
    this.props.handleNotAuthenticated()
  }

  render() {
    const { classes, authenticated, user } = this.props
    let TEXT_TO_DISPLAY = ''
    // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
    if (!authenticated) {
      TEXT_TO_DISPLAY = `Unravel`
    } else if (authenticated) {
      const USER_NAME = user.name
      const USER_NAME_ARRAY = USER_NAME.split(' ')
      TEXT_TO_DISPLAY = USER_NAME_ARRAY[0]
    }

    return (
      <div>
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawer}
              className={clsx(
                classes.menuButton,
                classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
            {!authenticated ? (
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                {TEXT_TO_DISPLAY}
              </Typography>
            ) : (
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                {`Welcome ${TEXT_TO_DISPLAY}`}
              </Typography>
            )}

            {!authenticated ? (
              <IconButton
                color="inherit"
                onClick={this.handleLoginClick}
              >
                <Typography>Login</Typography>

                <VpnKeySharpIcon />
              </IconButton>
            ) : (
              <Fragment>
                <Avatar alt={user.name} src={user.thumbnail} />
                <IconButton
                  className={classes.iconButton}
                  color="inherit"
                  onClick={this.handleLogoutClick}
                >
                  <Typography>Logout</Typography>
                  <i
                    class="fa fa-sign-out"
                    aria-hidden="true"
                    style={{
                      marginLeft: '0.2em',
                    }}
                  ></i>
                </IconButton>
              </Fragment>
            )}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(useStyles)(NavBar)
