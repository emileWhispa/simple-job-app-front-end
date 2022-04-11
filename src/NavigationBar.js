import {Component} from "react";
import {Container, Nav, Navbar, NavLink} from "react-bootstrap";
import CustomLink from "./CustomLink";
import {Link, withRouter} from "react-router-dom";

class NavigationBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: localStorage.getItem("user")
        }
    }


    render() {
        return <Navbar bg="light" expand="lg" className={'shadow-sm'}>
            <Container>
                <Navbar.Brand href="#home">Simple Job Application
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <CustomLink to={'/'} className={'nav-link'} href="#home">Home</CustomLink>
                        {this.state.loggedIn ? <NavLink onClick={(e)=>{
                                e.preventDefault();
                                this.props.history.push('/applications');
                            }} to='/login' className={'nav-link'}>Applications</NavLink> :
                            <span/>}
                        {this.state.loggedIn ? <NavLink onClick={(e)=>{
                                e.preventDefault();
                                localStorage.removeItem("user");
                                this.props.history.push('/login');
                            }} to='/login' className={'nav-link'}>Logout</NavLink> :
                            <Link to='/login' className={'nav-link'}>Staff Login</Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>;
    }
}


export default withRouter(NavigationBar);