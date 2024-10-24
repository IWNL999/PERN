import React, { useContext } from 'react'
import { Context } from '../index'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import {useNavigate} from "react-router-dom";

const NavBar = observer(()=> {
    const {user} = useContext(Context)
    const history = useNavigate()

    return (
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <NavLink style={{color: 'white', textDecoration: 'none'}} to={SHOP_ROUTE}> КупиДевайс</NavLink>
        {user.isAuth ?
           <Nav className="ml-auto" style={{color: 'white'}}>
            <Button 
              variant={'outline-light'} 
              style={{marginRight: 10}}
              onClick={() => history(ADMIN_ROUTE)}
            >
              Админ Панель</Button>
            <Button 
              variant={'outline-light'} 
              onClick={() => history(LOGIN_ROUTE)}
            >
              Выйти
            </Button>
          </Nav>
          :
          <Nav className="ml-auto" style={{color: 'white'}}>
            
            <NavLink to={LOGIN_ROUTE} style={{color: 'white', textDecoration: 'none'}}>
              <Button variant={'outline-light'}>
                Авторизация
              </Button>
            </NavLink>
              
          </Nav>
        }
        </Container>
      </Navbar>
  )
})

export default NavBar
