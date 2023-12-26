import { Outlet } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import { Container } from 'react-bootstrap';

function Layout() {
  return (
    <>
      <div className="flex-shrink-0">
        <NavigationBar />
        <Container fluid className="px-4 pt-4 col-lg-11">
          <Outlet />
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Layout;
