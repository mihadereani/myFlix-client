import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function NavBar() {
  const currentUser = localStorage.getItem('user');
  console.log(currentUser);

  return (
    <Navbar bg='primary' variant='dark' expand='md'>
      <Container>
        <Navbar.Brand href='/'>myFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='/'>Movies</Nav.Link>
            <Nav.Link href={`/users/${currentUser}`}>Profile</Nav.Link>
            <Nav.Link href='#link'>Log out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
