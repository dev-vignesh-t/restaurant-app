import {useState} from 'react'
import Cookies from 'js-cookie'
import {withRouter, Redirect} from 'react-router-dom'

import './index.css'

const Login = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [showError, setShowError] = useState(false)

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = props
    history.replace('/')
  }

  const onSubmitFailure = msg => {
    setErrorMsg(msg)
    setShowError(true)
  }

  const submitForm = async event => {
    event.preventDefault()

    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={submitForm}>
        <h1 className="login-title">Login</h1>

        {/* USERNAME */}
        <div className="input-container">
          <label htmlFor="username" className="input-label">
            USERNAME
          </label>
          <input
            id="username"
            type="text"
            className="input-field"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>

        {/* PASSWORD */}
        <div className="input-container">
          <label htmlFor="password" className="input-label">
            PASSWORD
          </label>
          <input
            id="password"
            type="password"
            className="input-field"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        <button type="submit" className="login-button">
          Login
        </button>

        {showError && <p className="error-msg">*{errorMsg}</p>}
      </form>
    </div>
  )
}

export default withRouter(Login)
