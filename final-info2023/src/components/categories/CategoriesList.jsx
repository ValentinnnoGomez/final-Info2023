import { useState } from 'react';
import { API_URL } from '../../constants/api';
import useFetchData from '../../hooks/useFetchData';
import { Row, Col, Form, InputGroup } from 'react-bootstrap';
import CategoryCard from './CategoryCard';
import CategoryCardPlaceholder from './CategoryCardPlaceholder';
import styles from '../../styles/Card.module.css';

function CategoriesList() {
  const {
    data: categories,
    error,
    isLoading,
  } = useFetchData(API_URL + '/categories');

  const [search, setSearch] = useState('');

  if (isLoading) {
    return (
      <>
        <p className="fs-1 text-center">Cargando...</p>
        <div className={styles.wrapper}>
          <Row xs={1} sm={2} md={3} lg={4} xl={5} className="gy-3">
            {Array.from({ length: 10 }).map(() => (
              <CategoryCardPlaceholder key={self.crypto.randomUUID()} />
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
      {categories.length > 0 ? (
        <p className="fs-1 text-center"> Categorías </p>
      ) : (
        <p className="fs-1 text-center"> No hay categorías. </p>
      )}
      <Row className="justify-content-center">
      <Col className="col-lg-4">
      <Form>
          <InputGroup className="my-3" size="lg">
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar categorias"
            />
          </InputGroup>
        </Form>
        </Col>
      </Row>
      <div>
        <Row xs={1} sm={2} md={3} lg={4} xl={5} className="gy-3">
          {categories.filter((category) => {
                return search.toLowerCase() === ''
                  ? category
                  : category.name.toLowerCase().includes(search);
              }).map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              image={category.image}
            />
          ))}
        </Row>
      </div>
    </>
  );
}

export default CategoriesList;
