const Sidebar = () => {
  const url = window.location.href;
  const isActiveProjects = url.includes("/") ? "active" : "";
  const isActiveReports = url.includes("/analysis") ? "active" : "";

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark vh-100 border-end border-secondary border-opacity-25"
      style={{ width: "280px" }}
    >
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <span className="fs-4 fw-bold ms-5">PMO ASSIST</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li>
          <a
            href="/projects"
            className={`nav-link text-white ${isActiveProjects}`}
          >
            <svg className="bi me-2" width="16" height="16">
              <use xlink:href="#speedometer2"></use>
            </svg>
            Projects
          </a>
        </li>
        <li>
          <a
            href="/reports"
            className={`nav-link text-white ${isActiveReports}`}
          >
            <svg className="bi me-2" width="16" height="16">
              <use xlink:href="#table"></use>
            </svg>
            Reports
          </a>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <a
          href="#"
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>User</strong>
        </a>
        <ul
          className="dropdown-menu dropdown-menu-dark text-small shadow"
          aria-labelledby="dropdownUser1"
        >
          <li>
            <a className="dropdown-item" href="#">
              New project...
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Settings
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Profile
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
