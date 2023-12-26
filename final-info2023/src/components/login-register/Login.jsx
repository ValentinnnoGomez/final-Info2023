import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  Form,
  Button,
  FloatingLabel,
  Alert,
  Col,
  Row,
  Spinner,
} from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';

const loginMutation = async ({ email, password }) => {
  const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

function LoginStatus(status) {
  console.log(status);
  if (status.status === 'pending') {
    return (
      <Alert variant="primary">
        Cargando...
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando</span>
        </Spinner>
      </Alert>
    );
  }
  if (status.status === 'success') {
    return (
      <Alert variant="success">
        Login correcto.
      </Alert>
    );
  }

  return <Alert variant="danger">Datos Incorrectos.</Alert>;
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(false);
  const [token, setToken] = useState(false);
  const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const getUser = async (token) => {
    console.log(token)
    const res = await fetch('https://api.escuelajs.co/api/v1/auth/profile',  {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    const json = await res.json();
  
    if (json.error) {
      throw new Error(json.error);
    }

    handleLogin(json, token);
    navigate("/products");
    return json;
  };

  useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(token),
    // la query no de ejecuta hasta que el token exista
    enabled: !!token,
  });

  const mutation = useMutation({
    mutationFn: loginMutation,
    onSuccess: (data) => {
      setStatus(true);
      setToken(data.access_token)
      console.log('Login exitoso', data);
    },
    onError: (data) => {
      setStatus(true);
      console.log('Algo salio mal', data);
    },
  });

  function handleSubmit(event) {
    event.preventDefault();
    mutation.mutate({
      email: email,
      password: password,
    });
  }
  console.log(token)
  return (
    <Row className="justify-content-center">
      <Col className="col-lg-5 ">
        <p className="fs-1 text-center">Login</p>
        {status && <LoginStatus status={mutation.status} />}
        <Form onSubmit={handleSubmit}>
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
            <FloatingLabel controlId="floatingPassword" label="Contraseña">
              <Form.Control
                required
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>
          <div className="text-center d-grid">
            <Button variant="dark" type="submit" className="px-5">
              Login
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
}

export default Login;
