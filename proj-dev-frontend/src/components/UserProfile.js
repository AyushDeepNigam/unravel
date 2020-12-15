import React, { Component } from 'react'
import { ScaleLoader } from 'react-spinners'
import { css } from '@emotion/core'

const override = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border-color: '#3f51b5';
`

const styles = {
  outerBox: {
    height: '100%',
    width: '100%',
  },
  mainContainer: {
    marginLeft: '10em',
    marginTop: '5em',
    display: 'flex',
    flexWrap: 'wrap',
  },
  profileImage: {
    borderRadius: '5px',
    height: '256px',
    width: '256px',
  },
  infoContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '0.6em',
    marginBottom: '0.6em',
    width: '50%',
    backgroundColor: 'white',
    boxShadow: '4px 4px 4px 4px whitesmoke',
  },
  userName: {
    color: 'dimgray',
    fontSize: '2.5em',
    padding: '0.5em',
  },
  userEmail: {
    color: 'dimgray',
    overflow: 'ellipsis',
  },
  statsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: '2em',
  },
  problemCountContainer: {
    marginRight: '2em',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  solutionCountContainer: {
    marginLeft: '2em',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelText: {
    color: 'dimgray',
  },
  countText: {
    color: 'dimgray',
    fontSize: '2.5em',
  },
}

export class UserProfile extends Component {
  state = {
    problemsData: [],
    solutionsData: [],
    hasFinishedLoading: true,
  }

  componentDidMount() {
    this.setState({ hasFinishedLoading: false })
    fetch('http://localhost:3001/api/current_user/solutions', {
      method: 'GET',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Request-Headers': 'true',
      },
      credentials: 'include',
    })
      .then(data => data.json())
      .then(res => {
        this.setState({
          solutionsData: res,
        })
      })
    fetch('http://localhost:3001/api/current_user/problems', {
      method: 'GET',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Request-Headers': 'true',
      },
      credentials: 'include',
    })
      .then(data => data.json())
      .then(res => {
        this.setState({
          problemsData: res,
        })
        this.setState({ hasFinishedLoading: true })
      })
  }

  render() {
    const { user } = this.props
    const {
      hasFinishedLoading,
      problemsData,
      solutionsData,
    } = this.state
    const totalProblems = problemsData.length
    const totalSolutions = solutionsData.length
    return (
      <>
        {!hasFinishedLoading ? (
          <ScaleLoader
            css={override}
            size={300}
            color={'#123abc'}
            loading={true}
          />
        ) : (
          <>
            <main style={styles.outerBox}>
              <div style={styles.mainContainer}>
                <img
                  src={user.thumbnail}
                  alt="profile_img"
                  style={styles.profileImage}
                ></img>
                <div style={styles.infoContainer}>
                  <span style={styles.userName}>{user.name}</span>
                  <span style={styles.userEmail}>{user.email}</span>
                  <div style={styles.statsContainer}>
                    <div style={styles.problemCountContainer}>
                      <span style={styles.labelText}>
                        Problems Posted
                      </span>
                      <span style={styles.countText}>
                        {totalProblems}
                      </span>
                    </div>
                    <div style={styles.solutionCountContainer}>
                      <span style={styles.labelText}>
                        Solutions Provided
                      </span>
                      <span style={styles.countText}>
                        {totalSolutions}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </>
        )}
      </>
    )
  }
}

export default UserProfile
