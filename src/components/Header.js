import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { Link, NavLink, useHistory } from "react-router-dom";

function Header() {

    const history = useHistory();

    function redirectToLogin() {
        history.push("/login");
    }

    function redirectToSignUp() {
        history.push("/signup");
    }

    function logout() {
        history.push("/login");
        localStorage.clear();
        window.location.reload();
    }

return (
<Navbar variant="dark" style={{backgroundColor:"#232a8c",height:"60px"}}>
        <Container fluid>
            <Row>
                <Col>
                <Link to="" style={{color:"white",textDecoration:"none"}}>RMS</Link>                
                </Col>
                <Col>
                </Col>
            </Row>
            <Nav className="me-auto">
                {
                    localStorage.getItem('loggedInUsername')===null ? (
                        <Nav.Link onClick={redirectToLogin}>Login</Nav.Link>
                    ):(
                        <Nav.Link onClick={logout}>Logout</Nav.Link>
                    )
                }
            </Nav>
        </Container>
</Navbar>
    )
}

export default Header;