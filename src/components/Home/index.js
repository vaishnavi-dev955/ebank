import Cookies from 'js-cookie'

import './index.css'

const Home = props => {
  const onClickLogOutButton = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/ebank/login')
  }

  return (
    <div className="Home-container">
      <div className="sub-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
        />
        <button
          type="button"
          className="Logout-button"
          onClick={onClickLogOutButton}
        >
          Logout
        </button>
      </div>
      <div className="sub-container-2">
        <h1 className="Home-heading">Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
        />
      </div>
    </div>
  )
}
export default Home
