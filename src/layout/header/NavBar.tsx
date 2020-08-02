import React from "react";
import { Link } from "react-router-dom";
import {Container, Navbar, Nav, NavDropdown, Dropdown, DropdownButton} from "react-bootstrap";



//화면 상단에 고정되는 메뉴바
const NavBar = () => (

    <Container>
        <Navbar bg="primary">
            <Navbar.Brand href="/">
                <img
                    alt=""
                    src="https://cdn4.iconfinder.com/data/icons/medical-outline-13/32/Page_9-512.png"
                    width="50"
                    height="50"
                    className="d-inline-block align-top"
                />{' '}

            </Navbar.Brand>
            <Nav className="mr-auto">
            <Link className="nav-link" to="/SearchHospital">
            병원찾기
            </Link>
            <Link className="nav-link" to="/Ambulance">
            응급차 호출
            </Link>
            <Link className="nav-link" to="/TeleMedicine">
            화상진료
            </Link>
            <Link className="nav-link" to="/Community">
                <DropdownButton   id="dropdown-basic-button" title="커뮤니티">
                    <Dropdown.Item href="#/action-1"><Link to="/Review">게시판</Link></Dropdown.Item>
                    <Dropdown.Item href="#/action-2"><Link to="/Edit">불편문의</Link></Dropdown.Item>
                    <Dropdown.Item href="#/action-3"><Link to="/Edit">Q&A</Link></Dropdown.Item>
                </DropdownButton>

            </Link>
            </Nav>
           
            <NavDropdown
                title={
                    <img
                        alt=""
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/600px-User_font_awesome.svg.png"
                        width="50"
                        height="50"
                    />

                }
                id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/Login">Login</NavDropdown.Item>
                <NavDropdown.Item href="/MyPage">Mypage</NavDropdown.Item>
                <NavDropdown.Item href="/Logout">Logout</NavDropdown.Item>
            </NavDropdown>
        </Navbar>
    </Container>
);
export default NavBar