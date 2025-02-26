import { useState } from "react";
import {
  Container, Row, Col, Card, CardBody, Button,
  Form, FormGroup, Label, Input
} from "reactstrap";
import { API_URL_I } from "../index";
import useAxios from "axios-hooks";

const Login = (props) => {
  const [userAuth, setUserAuth] = useState([])
  const API_URL = API_URL_I + "token/obtain"

  const onChange = (e) => {
    const newState = userAuth
    newState[e.target.name] = e.target.value
    setUserAuth(newState)
  }

  const [{ data: postData, loading: loading, error: error }, executePost] = useAxios(
    {
      url: API_URL,
      method: "POST",
      headers: { 'Content-Type': 'multipart/form-data' }
    },
    { manual: true }
  )

  const loginHandler = async (e) => {
    e.preventDefault();
    const data = {
      username: userAuth['username'],
      password: userAuth['password'],
    }
    // eslint-disable-next-line
    executePost({
      data: data
    }).then((response) => {
      if (response.status != 200) return <p>{response}</p>

      localStorage.setItem('accessToken', response.data.access);

      localStorage.setItem('refreshToken', response.data.refresh);

      window.location.reload()
    })

    if (error) return <p>{error.message}</p>

  }

  return (
    <Container style={{ 'maxWidth': 500, 'padding': 20 }}>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <Form onSubmit={loginHandler}>
                <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                  <Label for="username" className="mr-sm-2"> Пользователь </Label>
                  <Input type="text" name="username" id="username"
                    onChange={onChange}
                  />
                </FormGroup>
                <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                  <Label for="password" className="mr-sm-2"> Пароль </Label>
                  <Input type="password" name="password" id="password"
                    onChange={onChange}
                  />
                </FormGroup>
                <Button type="submit" color="primary">
                  Вход
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;