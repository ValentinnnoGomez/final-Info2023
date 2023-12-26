import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Home() {
  return (
    <>
      <section className="jumbotron text-center my-5 px-5">
        <h1>Info 2023</h1>
        <p className="lead">
          Pagina e-commerce para Informatorio 2023. Proyecto React.js utilizando
          Vite. Se utilizaron las librerías react-router-dom, react-bootstrap y
          @tanstack/react-query. Usamos la API de Platzi Fake Store que se puede utilizar
          con cualquier tipo de proyecto que necesite productos, usuarios,
          categorías, autenticación y usuarios en formato JSON. Puede utilizar
          esta API para crear prototipos de comercio electrónico y aprender cómo
          conectarse a una API con las mejores prácticas.
        </p>
        <p className="lead">
        <Button variant="dark" as={Link} to="/products">Comprar Productos</Button>
          
          
        </p>
      </section>
    </>
  );
}

export default Home;
