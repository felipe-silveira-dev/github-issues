
const Nav = () => {
  return (
    <nav className="nav">
      <div className="logo">
        <a href="#">
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="logo"
            className="avatar"
          />
        </a>
      </div>
      <div className="nav-links">
        <a href={`\\`}>Issues</a>
      </div>
    </nav>
  )
}

export default Nav