import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Divider, Paper } from '@material-ui/core'
import { Avatar } from '@material-ui/core'
import UserSolutionDetails from './UserSolutionDetails'

const useStyles = themes => ({
  card: {
    minWidth: '80%',
    marginBottom: 26,
  },
  date: {
    fontSize: 14,
    marginTop: '0.5em',
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
  totalSolutions: {
    padding: '1em 1em 1em 1em',
    marginBottom: 24,
  },
  totalSolutionCountText: {
    color: 'dimgray',
    fontSize: 'large',
  },
  solution: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontSize: 18,
    marginRight: '1em',
  },
  viewSolutionDetailsButton: {
    marginLeft: 'auto',
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
  },
})

export class UserSolutions extends Component {
  state = {
    viewSolutionDetailsButtonClicked: false,
    solutionDate: '',
    solution: '',
    solutionStatus: '',
    solutionId: '',
  }

  handleCancelClick = () => {
    this.setState({
      viewSolutionDetailsButtonClicked: false,
    })
  }

  render() {
    const { userSolutions, classes } = this.props
    const {
      viewSolutionDetailsButtonClicked,
      solutionDate,
      solution,
      solutionStatus,
      solutionId,
    } = this.state
    const SOLUTIONS_DATA_LENGTH = userSolutions.length
    const solutions = userSolutions.map(solution => (
      <Fragment key={solution._id}>
        <Card className={classes.card}>
          <CardContent>
            <div className={classes.firstContainer}>
              <Typography
                className={classes.date}
                color="textSecondary"
              >
                {`Posted on ${solution.date}`}
              </Typography>
              <div
                className={classes.statusContainer}
                style={
                  solution.status === 'Approved'
                    ? { backgroundColor: 'green' }
                    : solution.status === 'Rejected'
                    ? { backgroundColor: 'red' }
                    : solution.status === 'On Hold'
                    ? { backgroundColor: 'goldenrod' }
                    : { backgroundColor: 'gray' }
                }
              >
                <Typography className={classes.statusText}>
                  {solution.status}
                </Typography>
              </div>
            </div>
            <div className={classes.secondContainer}>
              <Typography className={classes.solution}>
                {solution.solution}
              </Typography>
              <Button
                size="small"
                variant="contained"
                disableElevation
                className={classes.viewSolutionDetailsButton}
                color="secondary"
                onClick={() =>
                  this.setState({
                    viewSolutionDetailsButtonClicked: true,
                    solutionDate: solution.date,
                    solution: solution.solution,
                    solutionStatus: solution.status,
                    solutionId: solution._id,
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
      <>
        {viewSolutionDetailsButtonClicked ? (
          <UserSolutionDetails
            solutionDate={solutionDate}
            solution={solution}
            solutionStatus={solutionStatus}
            handleCancelClick={this.handleCancelClick}
            solutionId={solutionId}
          />
        ) : (
          <>
            <Paper className={classes.totalSolutions}>
              <Typography
                className={classes.totalSolutionCountText}
              >{`Posted ${SOLUTIONS_DATA_LENGTH} solutions`}</Typography>
            </Paper>
            {solutions}
          </>
        )}
      </>
    )
  }
}

export default withStyles(useStyles)(UserSolutions)
