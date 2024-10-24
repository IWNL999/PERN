import React from 'react';
import { Card, Col, Container, Image, Row, Button } from 'react-bootstrap';
import bigStar from '../assets/bigStar.png'

const DevicePage = () => {
    const device = {id: 1, name: "Iphone 12 pro", price: 39000, rating: 5, img: 'https://res.cloudinary.com/grover/image/upload/e_trim/b_white,c_pad,dpr_2.0,h_500,w_520/f_auto,q_auto/v1602626907/ugdtf2ryxdojo2kiqjzg.png'}
    const description = [
        {id: 1, title: "Оперативная память", description: "6 ГБ"},
        {id: 2, title: "Камера", description: "12 Мп"},
        {id: 3, title: "Аккумулятор", description: "4000 мАч"}
    ];
    return (
        <Container className='mt-3'>
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={device.img} />
                </Col>
                <Col md={4}>
                    <Row className='d-flex flex-column align-items-center'>
                        <h2>{device.name}</h2>
                        <div 
                            className='d-flex align-items-center justify-content-center'
                            style={{background: `url(${bigStar}) no-repeat center center`, width: 240, height: 240, backgroundSize: 'cover', fontSize: 64 }}
                        >
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className='d-flex flex-column align-items-center justify-content-around'
                        style={{width: 300, height: 300, fontSize:32, border: '5px solid lightgray'}}
                    >
                        <h3>От: {device.price} руб.</h3>
                        <Button variant={"outline-dark"} >Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>
            <Row>
                <h1>Характеристики:</h1>
                {description.map((info, index) => 
                    <Row key={info.id} style={{background: index%2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;