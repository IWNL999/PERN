import React, { useContext } from 'react'
import { Context } from '../index'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import { SHOP_ROUTE } from '../utils/consts';
import { Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

const NavBar = observer(()=> {
    const {user} = useContext(Context)
    return (
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <NavLink style={{color: 'white', textDecoration: 'none'}} to={SHOP_ROUTE}> КупиДевайс</NavLink>
        {user.isAuth ?
           <Nav className="ml-auto" style={{color: 'white'}}>
            <Button variant={'outline-light'} style={{marginRight: 10}}>Админ Панель</Button>
            <Button variant={'outline-light'} >Выйти</Button>
          </Nav>
          :
          <Nav className="ml-auto" style={{color: 'white'}}>
            <Button variant={'outline-light'} onClick={() => user.setIsAuth(true)}>Авторизация</Button>
          </Nav>
        }
        </Container>
      </Navbar>
  )
})

export default NavBar
