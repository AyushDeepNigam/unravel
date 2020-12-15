import React, { Component } from 'react'

import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { Divider } from '@material-ui/core'

const useStyles = theme => ({
  container: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '1em',
    boxShadow: '1px 0px 4px 0px dimgray',
  },
  backButton: {
    marginLeft: 'auto',
  },
  firstContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '1em',
  },
  title: {
    fontSize: 36,
    color: '#3F51B5',
  },
  date: {
    marginLeft: 'auto',
    color: 'dimgray',
  },
  genre: {
    marginTop: '1em',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: '1em 0 1em 0',
  },
  problemTag: {
    fontWeight: 'bold',
    color: 'darkgray',
  },
  description: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  solution: {
    fontSize: 18,
  },
  buttonContainer: {
    display: 'flex',
  },
})

export class EditorPicksDetails extends Component {
  render() {
    const {
      title,
      date,
      genre,
      description,
      solution,
      handleCancelClick,
      classes,
    } = this.props
    return (
      <>
        <div className={classes.container}>
          <div className={classes.firstContainer}>
            <div className={classes.title}>{title}</div>
            <div className={classes.date}>{date}</div>
          </div>
          <Divider />
          <div
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
          </div>
          <div className={classes.textContentContainer}>
            <div className={classes.problemTag}>Problem</div>
            <div className={classes.description}>{description}</div>
          </div>
          <Divider />
          <div className={classes.textContentContainer}>
            <div className={classes.solutionTag}>Solution</div>
            <div className={classes.solution}>{solution}</div>
          </div>
          <div className={classes.buttonContainer}>
            <Button
              className={classes.backButton}
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
        </div>
      </>
    )
  }
}

export default withStyles(useStyles)(EditorPicksDetails)
