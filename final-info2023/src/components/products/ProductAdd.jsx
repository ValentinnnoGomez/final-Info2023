import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Alert, Col, Row, Spinner, Form } from 'react-bootstrap';
import ProductForm from './ProductForm';
import validator from 'validator';

const ProductAddMutation = async ({
  title,
  price,
  description,
  categoryId,
  image1,
  image2,
  image3,
}) => {
  let images = [];
  if (image1.trim()) images.push(image1.trim());
  if (image2.trim()) images.push(image2.trim());
  if (image3.trim()) images.push(image3.trim());

  console.log(images)

  const response = await fetch('https://api.escuelajs.co/api/v1/products/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, price, description, categoryId, images }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

function ProductStatus({status, img1, img2, img3}) {
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
  if (status.status === 'success') {
    return <Alert variant="success">¡Producto agregado correctamente!</Alert>;
  }

  if (img1 === '' ) img1 = 'www.google.com'
  if (img2 === '' ) img2 = 'www.google.com'
  if (img3 === '' ) img3 = 'www.google.com'

  if (!validator.isURL(img1) || !validator.isURL(img2) || !validator.isURL(img3) ){
    return <Alert variant="danger">Las imágenes tiene que tener URLs validas. 
    Si no desea agregar una nueva imagen deje la Url en blanco.</Alert>;
  }

  return (
    <Alert className="text-capitalize" variant="danger">
      {status.error?.message ? status.error.message : status } .
    </Alert>
  );
}
function ProductAdd() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(1);
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(1);
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [status, setStatus] = useState(false);

  const mutation = useMutation({
    mutationFn: ProductAddMutation,
    onSuccess: (data) => {
      setStatus(true);
      setTitle('');
      setPrice(1);
      setDescription('');
      setCategoryId(1);
      setImage1('');
      setImage2('');
      setImage3('');
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
      title: title,
      price: price,
      description: description,
      categoryId: categoryId,
      image1: image1.trim(),
      image2: image2.trim(),
      image3: image3.trim(),
    });
  }
  return (
    <>
      <Row className="justify-content-center">
        <Col className="col-lg-5">
          <p className="fs-1 text-center">Agregar Producto</p>
          {status && <ProductStatus status={mutation} img1={image1} img2={image2} img3={image3} />}
          <Form onSubmit={handleSubmit} className="">
            <ProductForm
              submitButton="Agregar"
              title={title}
              setTitle={setTitle}
              price={price}
              setPrice={setPrice}
              description={description}
              setDescription={setDescription}
              categoryId={categoryId}
              setCategoryId={setCategoryId}
              image1={image1}
              setImage1={setImage1}
              image2={image2}
              setImage2={setImage2}
              image3={image3}
              setImage3={setImage3}
            />
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default ProductAdd;
