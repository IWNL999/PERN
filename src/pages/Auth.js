import React from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { REGISTRATION_ROUTE } from "../utils/consts";

const Auth = () => {
    return (
        <div>
            <Container 
                className="d-flex justify-content-center align-items-center"
                style={{height: window.innerHeight - 54}}
            >
                <Card style={{width: 600}} className="p-5">
                    <h2 className="m-auto">Авторизация</h2>
                    <Form className='d-flex flex-column'>
                        <Form.Control 
                            className='mt-3'
                            placeholder='Введите ваш email...'
                        />
                        <Form.Control 
                            className='mt-3'
                            placeholder='Введите ваш пароль...'
                        />
                        <Row className="d-flex justify-content-between mt-3 pl-3 pr-3 align-items-center">
                            <Col className="col-auto">
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink>
                            </Col>
                            <Col className="col-auto">
                                <Button variant="outline-success" size="sm">
                                    Войти
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </Container>  
        </div>
    );
};

export default Auth;
