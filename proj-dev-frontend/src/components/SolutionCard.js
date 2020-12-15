import React, { Component, Fragment } from 'react'
import { ScaleLoader } from 'react-spinners'
import { css } from '@emotion/core'
import {
  Paper,
  Typography,
  Button,
  withStyles,
  Avatar,
  Divider,
} from '@material-ui/core'
import SolutionDetails from './SolutionDetails'

const override = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border-color: #3f51b5;
`
const useStyles = theme => ({
  paper: {
    margin: '1em 0 1em 0',
    padding: '1em 1em 1em 1em',
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  topContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  bottomContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  date: {
    marginLeft: 'auto',
    fontSize: 12,
    color: 'dimgray',
  },
  name: {
    marginLeft: '0.5em',
    color: 'dimgray',
  },
  solution: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    marginTop: '1em',
    marginLeft: '2em',
  },
  viewMoreButton: {
    marginLeft: 'auto',
    marginTop: '0.5em',
  },
  totalSolutions: {
    padding: '1em 1em 1em 1em',
    margin: '1em 0 1em 0',
  },
  noSolutionsBar: {
    color: 'dimgray',
    fontSize: 'large',
    fontWeight: '600',
  },
})

export class SolutionCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      solutionData: [],
      viewSolutionDetails: false,
      isLoading: false,
      solutionId: '',
      solutionProviderName: '',
      solutionProviderThumbnail: '',
      solutionDate: '',
      solution: '',
    }
  }
  componentDidMount() {
    this.setState({ isLoading: true })
    fetch(
      'http://localhost:3001/api/' +
        this.props.currentFeedId +
        '/solutions',
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
          solutionData: res,
        })
        this.setState({ isLoading: false })
      })
  }

  handleSolutionDetailsBackButtonClick = () => {
    this.setState({ viewSolutionDetails: false })
  }

  sortSolutionsByDate = createdAt => {
    return function(x, y) {
      return x[createdAt] === y[createdAt]
        ? 0
        : x[createdAt] < y[createdAt]
        ? 1
        : -1
    }
  }

  render() {
    const { classes } = this.props
    const {
      solutionData,
      isLoading,
      viewSolutionDetails,
      solutionId,
      solutionProviderName,
      solutionProviderThumbnail,
      solutionDate,
      solution,
    } = this.state
    const solutionsDataLength = solutionData.length
    const newSortedSolutions = solutionData.sort(
      this.sortSolutionsByDate('createdAt'),
    )
    const solutions = newSortedSolutions.map(solution => (
      <Fragment key={solution._id}>
        <Paper className={classes.paper} elevation={1}>
          <div className={classes.topContainer}>
            <Avatar
              className={classes.small}
              alt={solution.name}
              src={solution.thumbnail}
            />
            <Typography className={classes.name}>
              {solution.name}
            </Typography>
            <Typography className={classes.date}>
              {solution.date}
            </Typography>
          </div>
          <div className={classes.bottomContainer}>
            <Typography className={classes.solution}>
              {solution.solution}
            </Typography>
            <Button
              variant="contained"
              size="small"
              color="primary"
              className={classes.viewMoreButton}
              onClick={() =>
                this.setState({
                  solutionId: solution._id,
                  solutionProviderName: solution.name,
                  solutionProviderThumbnail: solution.thumbnail,
                  solutionDate: solution.date,
                  solution: solution.solution,
                  viewSolutionDetails: true,
                })
              }
            >
              <i
                class="fa fa-bars"
                aria-hidden="true"
                style={{ marginRight: '0.5em' }}
              ></i>
              View
            </Button>
            <Divider />
          </div>
        </Paper>
      </Fragment>
    ))
    return (
      <Fragment>
        {viewSolutionDetails ? (
          <SolutionDetails
            solutionId={solutionId}
            solutionProviderName={solutionProviderName}
            solutionProviderThumbnail={solutionProviderThumbnail}
            solutionDate={solutionDate}
            solution={solution}
            handleSolutionDetailsBackButtonClick={
              this.handleSolutionDetailsBackButtonClick
            }
          />
        ) : (
          <Fragment>
            {isLoading ? (
              <ScaleLoader
                css={override}
                size={300}
                color={'#123abc'}
                loading={true}
              />
            ) : (
              <Fragment>
                <Paper className={classes.totalSolutions}>
                  <Typography
                    className={classes.noSolutionsBar}
                  >{`Found ${solutionsDataLength} solutions`}</Typography>
                </Paper>
                <Paper elevation={3}>{solutions}</Paper>
              </Fragment>
            )}
          </Fragment>
        )}
      </Fragment>
    )
  }
}

export default withStyles(useStyles)(SolutionCard)
