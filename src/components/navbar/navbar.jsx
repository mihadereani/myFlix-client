import { Container, Nav, Navbar } from 'react-bootstrap';

export function NavBar() {
  const currentUser = localStorage.getItem('user');
  console.log(currentUser);

  return (
    <Navbar bg='primary' variant='dark' expand='sm' fixed='top'>
      <Container>
        <Navbar.Brand href='/'>myFlix</Navbar.Brand>
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='/'>Movies</Nav.Link>
            <Nav.Link href={`/users/${currentUser}`}>Profile</Nav.Link>
            <Nav.Link href='/'>Log out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
