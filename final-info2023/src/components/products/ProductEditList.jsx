import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Table, Row, Col, Form, InputGroup, Button, Alert } from 'react-bootstrap';
import { PencilSquare, XSquareFill } from 'react-bootstrap-icons';

const getProducts = async () => {
  const res = await fetch('https://api.escuelajs.co/api/v1/products/');
  const json = await res.json();

  if (json.error) {
    throw new Error(json.error);
  }

  return json;
};

const deleteProductMutation = async (id) => {
  const response = await fetch('https://api.escuelajs.co/api/v1/products/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

function ProductStatus({status}) {
  console.log(status);

  if (status === true) {
    return (
      <Alert variant="success">
        Producto eliminado!{' '}
      </Alert>
    );
  }

  return <Alert variant="danger">{status.message}.</Alert>;
}

function ProductEditList() {
  const [status, setStatus] = useState(false);
  const [search, setSearch] = useState('');
  const mutationDelete = useMutation({
    mutationFn: deleteProductMutation,
    onSuccess: (data) => {
      setStatus(data)
      products.refetch();
      console.log('delete successful', data);
    },
    onError: (data) => {
      console.log('delete fail', data);
      setStatus(data);
    },
  });
  const products = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  if (products.status === 'pending') {
    return  <p className="fs-1 text-center"> 
    Cargando ...
    </p>;
  }

  if (mutationDelete.status === 'pending'){
    return <p className="fs-1 text-center"> 
    Cargando ...
    </p>;
}

  function handleDelete(id) {
    mutationDelete.mutate(id);
  }

  return (
    <Row className="justify-content-center">
      <p className="fs-1 text-center">
        Lista de productos a modificar o eliminar
      </p>
      <Row className="justify-content-center">
      <Col className="col-lg-4">
      <Form>
          <InputGroup className="my-3" size="lg">
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar productos"
            />
          </InputGroup>
        </Form>
        </Col>
      </Row>
      {status && <ProductStatus status={status} />}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Titulo</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Descripción</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {products.data?.filter((product) => {
                return search.toLowerCase() === ''
                  ? product
                  : product.title.toLowerCase().includes(search);
              }).map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <img src={product.images[0]} height="75" width="75"></img>
              </td>
              <td>{product.title}</td>
              <td>{product.category.name}</td>
              <td>${product.price}</td>
              <td>{product.description}</td>
              <td className="text-center">
                <Button size="sm" className="pt-0"  as={Link} to={`/products/edit/${product.id}`}>
                  <PencilSquare color="white" size={16} />
                </Button>
              </td>
              <td className="text-center">
                <Button
                  size="sm"
                  variant="danger"
                  className="pt-0"
                  onClick={() => {
                    handleDelete(product.id);
                  }}
                >
                  <XSquareFill color="white" size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Row>
  );
}

export default ProductEditList;
