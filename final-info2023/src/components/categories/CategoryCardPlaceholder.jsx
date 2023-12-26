import { Card, Spinner, Placeholder, Col } from 'react-bootstrap';

function CategoryCardPlaceholder() {
  return (
    <Col>
      <Card xs={6}>
        <div className="text-center m-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando</span>
          </Spinner>
        </div>
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default CategoryCardPlaceholder;
