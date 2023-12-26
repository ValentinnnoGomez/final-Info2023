import { Form, Button, FloatingLabel } from 'react-bootstrap';

function CategoryForm({
    submitButton,
    name,
    setName,
    image,
    setImage,
  }) {
  return (
    <>
      <Form.Group required className="mb-3 " controlId="formBasicProduct">
        <FloatingLabel
          controlId="floatingInput"
          label="Titulo"
          className="mb-3"
        >
          <Form.Control
            required
            type="text"
            placeholder="Titulo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingImage"
          label="Link de imagen"
          className="mb-3"
        >
          <Form.Control
            required
            type="text"
            placeholder="Link de imagen"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </FloatingLabel>
      </Form.Group>
      <div className="text-center d-grid">
        <Button variant="dark" type="submit" className="px-5">
          {submitButton} Categoría
        </Button>
      </div>
    </>
  );
}

export default CategoryForm;
