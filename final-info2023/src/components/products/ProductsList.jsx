import { useState } from 'react';
import { API_URL } from '../../constants/api';
import useFetchData from '../../hooks/useFetchData';
import { useParams } from 'react-router-dom';
import { Row, Col, Form, InputGroup } from 'react-bootstrap';
import ProductCard from './ProductCard';
import ProductCardPlaceholder from './ProductCardPlaceholder';
import styles from '../../styles/Card.module.css';

function ProductsList({ url = '' }) {
  let { id } = useParams();
  if (!id) {
    id = '';
  }
  const [search, setSearch] = useState('');
  const {
    data: products,
    error,
    isLoading,
  } = useFetchData(API_URL + url + id + '/products');

  let pageTitle = products[0]?.category.name;
  let pageMessage = 'No hay productos en esta categoría.';

  if (!id) {
    pageTitle = 'Productos';
    pageMessage = 'No hay productos cargados.';
  }

  if (isLoading) {
    return (
      <>
        <p className="fs-1 text-center">Cargando...</p>
        <div className={styles.wrapper}>
          <Row xs={1} sm={2} md={3} lg={4} xl={5} className="gy-3">
            {Array.from({ length: 10 }).map(() => (
              <ProductCardPlaceholder key={self.crypto.randomUUID()} />
            ))}
          </Row>
        </div>
      </>
    );
  }

  if (error) {
    return <p className="fs-1 text-center">Error: {error}</p>;
  }

  return (
    <>
      {products[0] ? (
        <p className="fs-1 text-center"> {pageTitle} </p>
      ) : (
        <p className="fs-1 text-center">{pageMessage} </p>
      )}
      <Row className="justify-content-center">
      <Col className="col-lg-4">
      <Form>
          <InputGroup className="my-3" size="lg">
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar productos"
            />
          </InputGroup>
        </Form>
        </Col>
      </Row>
      <div className={styles.wrapper}>
        <Row xs={1} sm={2} md={3} lg={4} xl={5} className="gy-3">
          {products.filter((product) => {
                return search.toLowerCase() === ''
                  ? product
                  : product.title.toLowerCase().includes(search);
              }).map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              category={product.category.name}
              description={product.description}
              image={product.images[0]}
            />
          ))}
        </Row>
      </div>
    </>
  );
}

export default ProductsList;
