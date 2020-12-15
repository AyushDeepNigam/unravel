import React, { Component, Fragment } from 'react'
import UserProblems from './UserProblems'
import { ScaleLoader } from 'react-spinners'
import { css } from '@emotion/core'

const override = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border-color: #3f51b5;
`

class ProblemsDashboard extends Component {
  state = {
    problemsData: [],
    isLoading: false,
  }

  componentDidMount() {
    this.setState({ isLoading: true })
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
        this.setState({ isLoading: false })
      })
  }

  render() {
    const { user } = this.props
    const { problemsData, isLoading } = this.state
    return (
      <Fragment>
        {isLoading ? (
          <ScaleLoader
            css={override}
            size={300}
            color={'#123abc'}
            loading={true}
          />
        ) : (
          <UserProblems problemsData={problemsData} user={user} />
        )}
      </Fragment>
    )
  }
}

export default ProblemsDashboard
