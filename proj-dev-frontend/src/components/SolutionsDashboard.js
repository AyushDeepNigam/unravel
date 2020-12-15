import React, { Component } from 'react'
import { ScaleLoader } from 'react-spinners'
import { css } from '@emotion/core'
import UserSolutions from './UserSolutions'

const override = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border-color: #3f51b5;
`

export class SolutionsDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userSolutions: [],
      isLoading: false,
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true })
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
          userSolutions: res,
        })
        this.setState({ isLoading: false })
      })
  }

  render() {
    console.log(this.state.userSolutions)
    const { isLoading, userSolutions } = this.state
    const { user } = this.props
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
            <UserSolutions
              userSolutions={userSolutions}
              user={user}
            />
          </>
        )}
      </>
    )
  }
}

export default SolutionsDashboard
