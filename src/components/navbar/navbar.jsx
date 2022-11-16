import { Container, Nav, Navbar, CloseButton } from 'react-bootstrap';

export function NavBar() {
  const currentUser = localStorage.getItem('user');
  console.log(currentUser);

  return (
    <Navbar bg='primary' variant='dark' expand='sm' fixed='top'>
      <Container>
        <Navbar.Brand href='/'>myFlix</Navbar.Brand>
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav>
            <Nav.Link href='/'>Movies</Nav.Link>
            <Nav.Link href={`/users/${currentUser}`}>Profile</Nav.Link>
            <Nav.Link href='/login'>Log out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
