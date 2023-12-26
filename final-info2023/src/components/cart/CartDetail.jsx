import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { Row, Col, Card, Button, Modal, Alert } from 'react-bootstrap';
import CartItem from './CartItem.jsx';

function CartDetail() {
  const { cart, handleCleanCart } = useContext(CartContext);
  const [modal, setModal] = useState(false);
  const [totalQuantityFinal, setTotalQuantityFinal] = useState(0);
  const [totalPriceFinal, setTotalPriceFinal] = useState(0);
  const totalQuantity = cart.products.reduce((accumulator, product) => {
    return accumulator + product.quantity;
  }, 0);

  const totalPrice = cart.products.reduce((accumulator, product) => {
    return accumulator + product.quantity * product.price;
  }, 0);

  function handleCheckout() {
    setTotalPriceFinal(totalPrice);
    setTotalQuantityFinal(totalQuantity);
    setModal(true);
    handleCleanCart();
  }

  const handleClose = () => setModal(false);

  return (
    <>
      <Modal show={modal} onHide={handleCheckout}>
        <Modal.Header closeButton>
          <Modal.Title>¡La compra ha sido finalizada correctamente!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Cantidad de productos: {totalQuantityFinal}</p>
          <p>PrecioTotal: ${totalPriceFinal}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" as={Link} to="/products">
            Comprar Productos
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <p className="display-4 fw-bold text-center">Carrito</p>
      {cart.products.length === 0 && (
        <Alert variant="danger">No hay productos en el carrito.</Alert>
      )}
      <div>
        <Row className="gy-3">
          <Col className="col-12 col-lg-4">
            <Card className="p-0 bg-primary-subtle" border="primary">
              <Card.Body>
                <Card.Title className="px-2 pt-2 text-center  display-5 fw-medium">
                  Checkout
                </Card.Title>
                <Card.Text className="px-2 pt-2 text-center fw-medium">
                  Cantidad de productos: {totalQuantity}
                </Card.Text>
                <Card.Text className="px-2 pt-2 text-center fw-medium">
                  PrecioTotal: ${totalPrice}
                </Card.Text>
                <div className="d-grid">
                  <Button
                    disabled={cart.products.length === 0}
                    variant="primary"
                    size="lg"
                    onClick={() => handleCheckout()}
                  >
                    Finalizar Compra
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          {cart.products.length > 0 && (
            <Col className="col-12 col-lg-8">
              {cart.products?.map((product) => (
                <CartItem
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  description={product.description}
                  image={product.image}
                  quantity={product.quantity}
                  priceTotal={product.priceTotal}
                />
              ))}
            </Col>
          )}
        </Row>
      </div>
    </>
  );
}

export default CartDetail;
