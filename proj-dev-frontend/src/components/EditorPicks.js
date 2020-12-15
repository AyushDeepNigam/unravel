import React, { Component, Fragment } from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { Divider } from '@material-ui/core'

import { editorData } from './editorData'
import EditorPicksDetails from './EditorPicksDetails'

const useStyles = theme => ({
  viewDetailsButton: {
    marginLeft: 'auto',
  },
})

const styles = {
  headingCard: {
    backgroundColor: 'white',
    padding: '1em',
    fontSize: 18,
    color: 'dimgray',
    marginBottom: '1em',
    borderRadius: '10px',
  },
  container: {
    backgroundColor: 'white',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '1em',
    borderRadius: '5px',
    boxShadow: '1px 0px 4px 0px dimgray',
    marginBottom: '2em',
  },
  firstInnerContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '1em',
  },
  date: {
    color: 'dimgray',
    marginLeft: 'auto',
  },

  title: {
    color: 'dimgray',
    fontSize: 24,
    fontWeight: '600',
  },
  textContentContainer: {
    padding: '0 10px 0 10px',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '1em',
  },
  tag: {
    fontWeight: 'bold',
    color: 'darkgray',
  },
  description: {
    fontSize: 18,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  solution: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontSize: 18,
  },
  bottomContainer: {
    padding: '0 10px 0 10px',
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '1em',
  },
  viewDetailsButton: {
    marginLeft: 'auto',
  },
}

export class EditorPicks extends Component {
  state = {
    title: '',
    date: '',
    genre: '',
    description: '',
    solution: '',
    viewDetailsButtonClicked: false,
  }

  handleCancelClick = () => {
    this.setState({
      viewDetailsButtonClicked: false,
    })
  }

  render() {
    const { classes } = this.props
    const {
      viewDetailsButtonClicked,
      title,
      date,
      genre,
      description,
      solution,
    } = this.state
    const commonGenreStyle = {
      fontWeight: 'bold',
      fontSize: 18,
    }
    const editorPickItem = editorData.map(item => (
      <Fragment key={item.id}>
        <div style={styles.container}>
          <div style={styles.firstInnerContainer}>
            <div style={styles.title}>{item.title}</div>
            <div style={styles.date}>{item.date}</div>
          </div>
          <Divider />
          <div style={styles.textContentContainer}>
            <div style={styles.tag}>Problem</div>
            <div style={styles.description}>{item.description}</div>
          </div>
          <div style={styles.textContentContainer}>
            <div style={styles.tag}>Solution</div>
            <div style={styles.solution}>{item.solution}</div>
          </div>
          <div style={styles.bottomContainer}>
            <div
              style={
                item.genre === 'Environment'
                  ? { ...commonGenreStyle, color: 'green' }
                  : item.genre === 'Technology'
                  ? { ...commonGenreStyle, color: 'red' }
                  : item.genre === 'Science'
                  ? { ...commonGenreStyle, color: 'goldenrod' }
                  : item.genre === 'Social'
                  ? { ...commonGenreStyle, color: 'purple' }
                  : item.genre === 'Political'
                  ? { ...commonGenreStyle, color: 'orange' }
                  : item.genre === 'Medical'
                  ? { ...commonGenreStyle, color: 'blue' }
                  : { ...commonGenreStyle, color: 'darkkhaki' }
              }
            >
              {item.genre}
            </div>
            <Button
              size="small"
              variant="contained"
              disableElevation
              className={classes.viewDetailsButton}
              color="secondary"
              onClick={() =>
                this.setState({
                  viewDetailsButtonClicked: true,
                  title: item.title,
                  genre: item.genre,
                  description: item.description,
                  date: item.date,
                  solution: item.solution,
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
        </div>
      </Fragment>
    ))

    return (
      <>
        {!viewDetailsButtonClicked ? (
          <>
            <div style={styles.headingCard}>
              <i
                class="fa fa-star"
                aria-hidden="true"
                style={{ marginRight: '0.5em' }}
              ></i>
              Top picks from experts
            </div>
            <>{editorPickItem}</>
          </>
        ) : (
          <EditorPicksDetails
            title={title}
            date={date}
            genre={genre}
            description={description}
            solution={solution}
            handleCancelClick={this.handleCancelClick}
          />
        )}
      </>
    )
  }
}

export default withStyles(useStyles)(EditorPicks)
