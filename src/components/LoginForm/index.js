import {Redirect} from 'react-router-dom'

import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {userInput: '', userPin: '', showErrorMsg: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMessage => {
    this.setState({showErrorMsg: true, errorMsg: errorMessage})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userInput, userPin} = this.state
    const userDetails = {user_id: userInput, pin: userPin}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      this.onSubmitSuccess(data.jwt_token)
    } else {
      const data = await response.json()
      console.log(data)
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUserId = event => {
    this.setState({userInput: event.target.value})
  }

  onChangePin = event => {
    this.setState({userPin: event.target.value})
  }

  render() {
    const {userInput, userPin, showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main-container">
        <form className="Form-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="Website-login-image"
          />
          <div className="login-container">
            <h1 className="login-heading">Welcome Back!</h1>
            <label htmlFor="Username" className="label-style">
              User ID
            </label>
            <input
              type="text"
              id="Username"
              className="input-style"
              placeholder="Enter User ID"
              onChange={this.onChangeUserId}
              value={userInput}
            />
            <label htmlFor="password" className="label-style">
              PIN
            </label>
            <input
              type="password"
              id="password"
              className="input-style"
              placeholder="Enter PIN"
              onChange={this.onChangePin}
              value={userPin}
            />
            <button type="submit" className="login-button">
              Login
            </button>
            {showErrorMsg && <p className="Error-msg">{errorMsg}</p>}
          </div>
        </form>
      </div>
    )
  }
}

export default LoginForm
