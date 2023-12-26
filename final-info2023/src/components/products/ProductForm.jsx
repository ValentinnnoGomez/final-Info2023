import { Form, Button, FloatingLabel } from 'react-bootstrap';

function ProductForm({
  submitButton,
  title,
  setTitle,
  price,
  setPrice,
  categoryId,
  setCategoryId,
  description,
  setDescription,
  image1,
  setImage1,
  image2,
  setImage2,
  image3,
  setImage3,
}) {
  function handlePriceChange(event) {
    if (
      parseInt(event.target.value) === 0 ||
      isNaN(parseInt(event.target.value))
    ) {
      setPrice(1);
    } else {
      setPrice(parseInt(event.target.value));
    }
  }

  function handleCategoryIdChange(event) {
    if (
      parseInt(event.target.value) === 0 ||
      isNaN(parseInt(event.target.value))
    ) {
      setCategoryId(1);
    } else {
      setCategoryId(parseInt(event.target.value));
    }
  }

  return (
    <>
      <Form.Group className="mb-3 " controlId="formBasicProduct">
        <FloatingLabel
          controlId="floatingInput"
          label="Titulo"
          className="mb-3"
        >
          <Form.Control
            required
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="Precio"
          className="mb-3"
        >
          <Form.Control
            required
            type="number"
            placeholder="Precio"
            value={price}
            onChange={(e) => {
              handlePriceChange(e);
            }}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="Id de categoría"
          className="mb-3"
        >
          <Form.Control
            required
            type="number"
            placeholder="Id de categoría"
            value={categoryId}
            onChange={(e) => {
                handleCategoryIdChange(e);
            }}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="Descripción"
          className="mb-3"
        >
          <Form.Control
            required
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: '100px' }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingPassword"
          label="Link de imagen 1"
          className="mb-3"
        >
          <Form.Control
            required
            type="text"
            placeholder="Link de imagen 1"
            value={image1}
            onChange={(e) => setImage1(e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingPassword"
          label="Link de imagen 2"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Link de imagen 2"
            value={image2}
            onChange={(e) => setImage2(e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingPassword"
          label="Link de imagen 3"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Link de imagen 3"
            value={image3}
            onChange={(e) => setImage3(e.target.value)}
          />
        </FloatingLabel>
      </Form.Group>
      <div className="text-center d-grid">
        <Button variant="dark" type="submit" className="px-5">
          {submitButton} Producto
        </Button>
      </div>
    </>
  );
}

export default ProductForm;
