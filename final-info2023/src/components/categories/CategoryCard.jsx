import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CategoryCard({ id, name, image }) {
  return (
    <Col>
      <Card className="h-100">
        <Card.Img variant="top" src={image} />
        <Card.Body className="d-flex flex-column">
          <Card.Title
            className="link-success link-offset-2 link-underline-opacity-75 link-underline-opacity-100-hover fw-bold"
            as={Link}
            to={`/categories/${id}/products`}
          >
            {name}
          </Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default CategoryCard;
