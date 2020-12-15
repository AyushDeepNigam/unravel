import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Paper } from '@material-ui/core'
import { Avatar } from '@material-ui/core'
import { ScaleLoader } from 'react-spinners'
import { css } from '@emotion/core'

const override = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border-color: #3f51b5;
`

const useStyles = theme => ({
  paper: {
    padding: '2% 2% 2% 2%',
    marginBottom: '1em',
  },
  firstContainer: {
    display: 'flex',
  },
  problemTitle: {
    fontSize: 22,
    color: 'darkslategrey',
  },
  problemDate: {
    fontSize: 14,
    color: 'dimgray',
    marginLeft: 'auto',
  },
  secondContainer: {
    display: 'flex',
    marginTop: '0.5em',
  },
  problemUser: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3F51B5',
    marginBottom: '0.5em',
    marginLeft: '0.5em',
  },
  problemGenre: {
    marginLeft: 'auto',
    fontWeight: 'bold',
  },
  problemDescription: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: '0.5em',
  },
  solutionCard: {
    marginTop: '1em',
  },
  thirdContainer: {
    display: 'flex',
  },
  solutionDate: {
    fontSize: 14,
    color: 'dimgray',
  },
  statusContainer: {
    marginLeft: 'auto',
    width: 'fit-content',
    padding: '0.30em',
    borderRadius: '0.33em',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  statusText: {
    fontSize: 14,
  },
  solution: {
    marginTop: '0.5em',
  },
  buttonContainer: {
    display: 'flex',
  },
  cancelButton: {
    marginTop: '1em',
    marginLeft: 'auto',
  },
})

export class UserSolutionDetails extends Component {
  state = {
    problemOfSolution: [],
    isLoading: false,
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    fetch(
      'http://localhost:3001/api/' +
        this.props.solutionId +
        '/problem',
      {
        method: 'GET',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Request-Headers': 'true',
        },
        credentials: 'include',
      },
    )
      .then(data => data.json())
      .then(res => {
        this.setState({
          problemOfSolution: res,
        })
        this.setState({ isLoading: false })
      })
  }

  render() {
    const { isLoading, problemOfSolution } = this.state
    const {
      solutionDate,
      solution,
      solutionStatus,
      handleCancelClick,
      classes,
    } = this.props
    return (
      <>
        {isLoading ? (
          <ScaleLoader
            css={override}
            size={300}
            color={'#123abc'}
            loading={true}
          />
        ) : (
          <>
            <Paper className={classes.paper}>
              <div className={classes.firstContainer}>
                <Typography className={classes.problemTitle}>
                  {problemOfSolution.title}
                </Typography>
                <Typography className={classes.problemDate}>
                  {problemOfSolution.date}
                </Typography>
              </div>
              <div className={classes.secondContainer}>
                <Avatar
                  alt={problemOfSolution.name}
                  src={problemOfSolution.thumbnail}
                />
                <Typography className={classes.problemUser}>
                  {problemOfSolution.name}
                </Typography>
                <Typography
                  className={classes.problemGenre}
                  style={
                    problemOfSolution.genre === 'Environment'
                      ? { color: 'green' }
                      : problemOfSolution.genre === 'Technology'
                      ? { color: 'red' }
                      : problemOfSolution.genre === 'Science'
                      ? { color: 'goldenrod' }
                      : problemOfSolution.genre === 'Social'
                      ? { color: 'purple' }
                      : problemOfSolution.genre === 'Political'
                      ? { color: 'orange' }
                      : problemOfSolution.genre === 'Medical'
                      ? { color: 'blue' }
                      : { color: 'darkkhaki' }
                  }
                >
                  {problemOfSolution.genre}
                </Typography>
              </div>
              <Typography className={classes.problemDescription}>
                {problemOfSolution.description}
              </Typography>
            </Paper>

            <Card className={classes.solutionCard}>
              <CardContent>
                <div className={classes.thirdContainer}>
                  <Typography
                    className={classes.solutionDate}
                  >{`Solution posted on ${solutionDate}`}</Typography>
                  <div
                    className={classes.statusContainer}
                    style={
                      solutionStatus === 'Approved'
                        ? { backgroundColor: 'green' }
                        : solutionStatus === 'Rejected'
                        ? { backgroundColor: 'red' }
                        : solutionStatus === 'On Hold'
                        ? { backgroundColor: 'goldenrod' }
                        : { backgroundColor: 'gray' }
                    }
                  >
                    <Typography className={classes.statusText}>
                      {solutionStatus}
                    </Typography>
                  </div>
                </div>
                <Typography className={classes.solution}>
                  {solution}
                </Typography>
              </CardContent>
            </Card>
            <div className={classes.buttonContainer}>
              <Button
                className={classes.cancelButton}
                onClick={handleCancelClick}
              >
                <i
                  class="fa fa-chevron-left"
                  aria-hidden="true"
                  style={{ marginRight: '0.5em' }}
                ></i>
                Back
              </Button>
            </div>
          </>
        )}
      </>
    )
  }
}

export default withStyles(useStyles)(UserSolutionDetails)
