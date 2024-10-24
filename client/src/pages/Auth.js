import React from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";

const Auth = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    console.log(location)

    return (
        <div>
            <Container 
                className="d-flex justify-content-center align-items-center"
                style={{height: window.innerHeight - 54}}
            >
                <Card style={{width: 600}} className="p-5">
                    <h2 className="m-auto"> {isLogin ? 'Авторизация' : 'Регистрация'} </h2>
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
                            {isLogin ? 
                                <Col className="col-auto">
                                    Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                                </Col>
                                :
                                <Col className="col-auto">
                                    Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                                </Col>
                            }
                            <Col className="col-auto">
                                <Button variant="outline-success" size="sm">
                                    {isLogin ?  "Войти" : "Зарегистрироваться"}
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
