
import {Dropdown,Image } from "react-bootstrap";

export default function AdminHeader(props) {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem('token');
    return (
        <>
            <nav
                className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
                id="layout-navbar"
            >
                <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                    <a className="nav-item nav-link px-0 me-xl-4">
                        <i className="bx bx-menu bx-sm"></i>
                    </a>
                </div>

                <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                    <h4 className="navbar-nav align-items-center"><span className="text-muted fw-light">Management</span></h4>
                    
                    <ul className="navbar-nav flex-row align-items-center ms-auto">
                        <li className="nav-item navbar-dropdown dropdown-user dropdown">
                        <Dropdown>
      <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
        <Image height="30" width="30" style={{marginRight:"2%"}} src="http://icons.iconarchive.com/icons/papirus-team/papirus-status/256/avatar-default-icon.png" roundedCircle />
        <span>{user.email}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="/">Profile</Dropdown.Item>
        <Dropdown.Item >Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
                        </li>
                    </ul>
                </div>
            </nav>

        </>
    )
}