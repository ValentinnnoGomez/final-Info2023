import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Alert, Col, Row, Spinner, Form } from 'react-bootstrap';
import CategoryForm from './CategoryForm';
import validator from 'validator';

const CategoryEditMutation = async ({
  id,
  name,
  image,
}) => {

  const response = await fetch('https://api.escuelajs.co/api/v1/categories/' + id, {
    method: 'PUT',
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
    return <Alert variant="success">Categoría editada correctamente!</Alert>;
  }

  return (
    <Alert className="text-capitalize" variant="danger">
      Error:{status.error?.message ? status.error.message : status } .
    </Alert>
  );
}

function CategoryEdit() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState(false);

  const getCategory = async (id) => {
    const response = await fetch(
      'https://api.escuelajs.co/api/v1/categories/' + id);
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    const json = await response.json();
    setName(json.name);
    setImage(json.image);
    return [json];
  };
  const category = useQuery({
    queryKey: ['category'],
    queryFn: () => getCategory(id),
  });

  const mutation = useMutation({
    mutationFn: CategoryEditMutation,
    onSuccess: (data) => {
        setStatus(true);
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
      id: id,
      name: name,
      image: image.trim(),
    });
  }

  if (category.status === 'pending') {
    return <p className="fs-1 text-center">Cargando ...</p>;
  }

  return (
    <Row className="justify-content-center">
    <Col className="col-lg-5">
      <p className="fs-1 text-center">Editar Categoría</p>
      {status && <CategoryStatus status={mutation} img={image.trim()}/>}
      <Form onSubmit={handleSubmit} className="">
          <CategoryForm
            submitButton="Editar"
            name={name}
            setName={setName}
            image={image}
            setImage={setImage}
          />
      </Form>
    </Col>
  </Row>
  );
}

export default CategoryEdit;
