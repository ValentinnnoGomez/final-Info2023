import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { Card, Col, Button } from 'react-bootstrap';
import { CartPlus } from 'react-bootstrap-icons';

function ProductCard(props) {
  const { handleAddCartProduct } = useContext(CartContext);
  return (
    <Col>
      <Card className="h-100">
        <Card.Img variant="top" src={props.image} className="img-fluid" />
        <Card.Body className="d-flex flex-column">
          <Card.Title
            className="link-primary link-offset-2 link-underline-opacity-75 link-underline-opacity-100-hover fw-bold"
            as={Link}
            to={`/products/${props.id}`}
          >
            {props.title}
          </Card.Title>
          <span className="fw-bold text-dark">${props.price}</span>
          <Card.Text className="fw-bold text-success">
            {props.category}
          </Card.Text>
          <Card.Text>{props.description}</Card.Text>
          <Button
            variant="dark"
            className="mt-auto"
            onClick={() => {
              handleAddCartProduct(props, 1, props.image);
            }}
          >
            <CartPlus color="white" size={30} />
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ProductCard;
