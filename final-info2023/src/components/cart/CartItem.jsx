import { useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Card, Button, Col, Row } from 'react-bootstrap';
import { XSquareFill } from 'react-bootstrap-icons';

function CartItem(props) {
  const { handleNewQuantity, handleDeleteCartProduct } =
    useContext(CartContext);
  const [quantityState, setQuantityState] = useState(props.quantity);

  function handleChange(event, id) {
    if (
      parseInt(event.target.value) === 0 ||
      isNaN(parseInt(event.target.value))
    ) {
      setQuantityState(1);
      handleNewQuantity(id, 1);
    } else {
      setQuantityState(parseInt(event.target.value));
      handleNewQuantity(id, parseInt(event.target.value));
    }
  }

  function handleAdd(id) {
    setQuantityState(quantityState + 1);
    handleNewQuantity(id, quantityState + 1);
  }

  function handleSubtract(id) {
    setQuantityState(quantityState - 1);
    handleNewQuantity(id, quantityState - 1);
  }

  return (
    <Card className="p-0 bg-secondary-subtle mb-2">
      <Card.Body className="px-2 py-1">
        <Row className="justify-content-end">
          <Col className="col-1 align-self-end">
            <Button
              size="sm"
              variant="danger"
              className="pt-0 m-0"
              onClick={() => handleDeleteCartProduct(props.id)}
            >
              <XSquareFill color="white" size={16} />
            </Button>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col className="col-md-2 col-4 mt-2">
            <Card.Img
              variant="top"
              src={props.image}
              className="img-thumbnail "
            />
          </Col>
          <Col className="col-md-4 col-8">
            <Card.Title className="text-center">{props.title}</Card.Title>
          </Col>
          <Col className="col-md-3 col-5 ">
            <div className="input-group ms-sm-2">
              <Button
                className="btn btn-secondary text-white"
                type="button"
                disabled={quantityState === 1}
                onClick={() => handleSubtract(props.id)}
              >
                -
              </Button>
              <input
                value={quantityState}
                type="number"
                min="1"
                step="1"
                className="col-4 col-sm-6 col-md-5"
                onChange={(event) => {
                  handleChange(event, props.id);
                }}
              />
              <Button
                className="btn btn-secondary text-white"
                type="button"
                onClick={() => handleAdd(props.id)}
              >
                +
              </Button>
            </div>
          </Col>
          <Col className="col-md-3 col-7 text-center mb-2 pe-5">
            <Card.Text className="fw-medium">Precio: ${props.price}</Card.Text>
            <Card.Text className="fw-medium">
              Total: ${props.price * quantityState}
            </Card.Text>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col className="col-10 col-sm-8 col-md-3 col-lg-2"></Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default CartItem;
