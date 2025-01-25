function Header(){
    return(
        <header className="header">
      <nav className="header__nav">
        <div className="header__left">
          <span className="header__logo">Uber</span>
          <ul className="header__menu">
            <li>Ride</li>
            <li>Drive</li>
            <li>Business</li>
            <li>About</li>
          </ul>
        </div>
        <div className="header__right">
          <ul className="header__options">
            <li>EN</li>
            <li>Help</li>
            <li>Log in</li>
          </ul>
          <button className="header__signup">Sign up</button>
        </div>
      </nav>
    </header>

    )
}

export default Header