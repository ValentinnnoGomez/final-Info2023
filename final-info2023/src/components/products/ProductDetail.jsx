import { useState, useContext } from 'react';
import { API_URL } from '../../constants/api';
import useFetchData from '../../hooks/useFetchData';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { Button, Row, Col } from 'react-bootstrap';
import { CartPlus } from 'react-bootstrap-icons';

function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const { handleAddCartProduct } = useContext(CartContext);
  const { id } = useParams();
  const {
    data: product,
    error,
    isLoading,
  } = useFetchData(API_URL + '/products/' + id);

  function handleChange(event) {
    if (
      parseInt(event.target.value) === 0 ||
      isNaN(parseInt(event.target.value))
    ) {
      setQuantity(1);
    } else {
      setQuantity(parseInt(event.target.value));
    }
  }

  function handleAdd() {
    setQuantity(quantity + 1);
  }

  function handleSubtract() {
    setQuantity(quantity - 1);
  }

  if (isLoading) {
    return (
      <>
        <p className="fs-1 text-center">Cargando...</p>
      </>
    );
  }

  if (error) {
    return (
      <>
        <p className="fs-1 text-center">Error: {error}</p>
      </>
    );
  }

  return (
    <>
      <p className="fs-1 text-center">Detalle de Producto</p>
      <Row>
      <Col>
              <div className="container mx-auto px-4">
                {product.images ? (
                  product.images.map((img) => (
                    <img
                      key={self.crypto.randomUUID()}
                      src={img}
                      height="250"
                    ></img>
                  ))
                ) : (
                  <p>cargando</p>
                )}
              </div>   
              </Col>
              <Col>
              <div className="col-md-7">
                <h1 className="h5 d-inline me-2">{product.title}</h1>
                <div className="mb-1">
                  <span className="fw-bold h5 me-2">${product.price}</span>
                </div>
              </div>
          <div>
            <p className="fw-bold mb-2 small">Descripción</p>
            <p>{product.description}</p>
          </div>
          <div className="mb-3">
            <div className="d-inline float-start me-2">
              <div className="input-group input-group-sm ">
                <Button
                  className="btn btn-secondary text-white"
                  type="button"
                  disabled={quantity === 1}
                  onClick={() => handleSubtract()}
                >
                  -
                </Button>
                <input
                  value={quantity}
                  type="number"
                  min="1"
                  step="1"
                  className="form-control"
                  onChange={(event) => {
                    handleChange(event);
                  }}
                />
                <Button
                  className="btn btn-secondary text-white"
                  type="button"
                  onClick={() => handleAdd()}
                >
                  +
                </Button>
                <Button
                  variant="dark"
                  size="sm"
                  onClick={() => {
                    handleAddCartProduct(product, quantity, product.images[0]);
                  }}
                >
                  <CartPlus className="mb-1" color="white" size={20} /> Agregar
                  al Carrito
                </Button>
              </div>
            </div>
          </div>
          </Col>
        </Row>
    </>
  );
}

export default ProductDetail;
