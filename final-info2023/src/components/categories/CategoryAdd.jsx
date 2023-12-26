import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Alert, Col, Row, Spinner, Form } from 'react-bootstrap';
import CategoryForm from './CategoryForm';
import validator from 'validator';

const CategoryAddMutation = async ({
  name,
  image,
}) => {

  const response = await fetch('https://api.escuelajs.co/api/v1/categories/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, image }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return response.json();
};

function CategoryStatus({status, img}) {
  console.log(status);
  if (status.status === 'pending') {
    return (
      <Alert variant="primary">
        Cargando
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Alert>
    );
  }

  if (img === '') img = 'www.google.com'

  if (!validator.isURL(img) ){
    return <Alert variant="danger">Las imágenes tiene que tener URLs validas. </Alert>;
  }

  if (status.status === 'success') {
    return <Alert variant="success">La categoria ha sido agregada correctamente!</Alert>;
  }

  return (
    <Alert className="text-capitalize" variant="danger">
      Error:{status.error?.message ? status.error.message : status } .
    </Alert>
  );
}

function CategoryAdd() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState(false);

  const mutation = useMutation({
    mutationFn: CategoryAddMutation,
    onSuccess: (data) => {
      setStatus(true);
      setName('');
      setImage('');
      console.log('producto agregado exitosamente', data);
    },
    onError: (data) => {
      console.log('error al agregar el producto', data);
      setStatus(true);
    },
  });

  function handleSubmit(event) {
    event.preventDefault();
    mutation.mutate({
      name: name,
      image: image.trim(),
    });
  }
  return (
    <>
      <Row className="justify-content-center">
        <Col className="col-lg-5">
          <p className="fs-1 text-center">Agregar Categoría</p>
          {status && <CategoryStatus status={mutation} img={image.trim()} />}
          <Form onSubmit={handleSubmit} className="">
            <CategoryForm
              submitButton="Agregar"
              name={name}
              setName={setName}
              image={image}
              setImage={setImage}
            />
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default CategoryAdd;
