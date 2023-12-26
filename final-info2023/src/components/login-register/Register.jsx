import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import {
  Form,
  Button,
  FloatingLabel,
  Alert,
  Col,
  Row,
  Spinner,
} from 'react-bootstrap';

const loginMutation = async ({ name, email, password, avatar }) => {
  const response = await fetch('https://api.escuelajs.co/api/v1/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password, avatar }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

function RegisterStatus(status) {
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
    return (
      <Alert variant="success">
        ¡Usuario registrado correctamente!{' '}
        <Link to="/login">Login</Link>
      </Alert>
    );
  }

  return <Alert variant="danger">Datos Incorrectos.</Alert>;
}

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState(false);

  const mutation = useMutation({
    mutationFn: loginMutation,
    onSuccess: (data) => {
      setStatus(true);
      setEmail('');
      setName('');
      setPassword('');
      setImage('');
      console.log('registro exitoso', data);
    },
    onError: (data) => {
      console.log('registro fallido', data);
      setStatus(true);
    },
  });

  function handleSubmit(event) {
    event.preventDefault();
    mutation.mutate({
      name: name,
      email: email,
      password: password,
      avatar: image,
    });
  }
  return (
    <Row className="justify-content-center">
      <Col className="col-lg-5">
        <p className="fs-1 text-center">Registrarse</p>
        {status && <RegisterStatus status={mutation.status} />}
        <Form onSubmit={handleSubmit} className="">
          <Form.Group required className="mb-3 " controlId="formBasicEmail">
            <FloatingLabel
              controlId="floatingInput"
              label="Email"
              className="mb-3"
            >
              <Form.Control
                required
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingInput"
              label="Nombre"
              className="mb-3"
            >
              <Form.Control
                required
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingPassword"
              label="Contraseña"
              className="mb-3"
            >
              <Form.Control
                required
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Link de imagen">
              <Form.Control
                type="text"
                placeholder="Link de imagen"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>
          <div className="text-center d-grid">
            <Button variant="dark" type="submit" className="px-5">
              Registrarse
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
}

export default Register;
