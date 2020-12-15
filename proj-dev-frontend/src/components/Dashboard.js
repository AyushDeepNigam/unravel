import React, { Component, Fragment } from 'react'
import Feeds from './Feeds'
import { ScaleLoader } from 'react-spinners'
import { css } from '@emotion/core'

const override = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border-color: #3f51b5;
`

export default class Dashboard extends Component {
  state = {
    feedData: [],
    isLoading: false,
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    fetch('http://localhost:3001/api/getData')
      .then(data => data.json())
      .then(res => {
        this.setState({
          feedData: res,
        })
        this.setState({ isLoading: false })
      })
  }

  render() {
    const { user } = this.props
    const { feedData, isLoading } = this.state
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
          <Feeds feedDataDatabase={feedData} user={user} />
        )}
      </Fragment>
    )
  }
}
