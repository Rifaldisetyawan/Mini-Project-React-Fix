import { React, useEffect, useState } from 'react'
import { Nav, Navbar, Container, Button, Modal } from 'react-bootstrap'
import './NavbarComponent.css'
import { BsFillBagPlusFill } from 'react-icons/bs'
import { IoLogOut, IoLogIn } from 'react-icons/io5'
import AddProduct from './AddProduct'
import axios from 'axios';
import { API_URL } from '../utils/constant'
import swal from 'sweetalert'
import { Link } from 'react-router-dom'

const NavbarComponent = ({ logoutUser, setLogout }) => {
    const [login, setLogin] = useState('')
    useEffect(() => {
        hydrateStateWithLocalStorage()
    }, [logoutUser])

    const logout = () => {
        swal({
            title: "Are you sure to Logout?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((logout) => {
                if (logout) {
                    swal({
                        icon: "success",
                        text: "Logout Success",
                        buttons: false,
                        timer: 700
                    });
                    setTimeout(function () {
                        localStorage.removeItem('login')
                        setLogout(true)
                        setLogin(true)
                    }, 800)
                } else {
                }
            });
    }
    const hydrateStateWithLocalStorage = () => {
        if (localStorage.hasOwnProperty('login')) {
            let value = localStorage.getItem('login')
            try {
                value = JSON.parse(value)
                setLogin(value)
            } catch (e) {
                setLogin("")
            }
        }
    }

    const isLoginTrue = JSON.parse(localStorage.getItem("login"))
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleAddProduct = (newProduct) => {
        axios.post('http://localhost:3100/product', newProduct).then(() => {
            updateProduct()
        })
    }

    const updateProduct = () => {
        axios.get(API_URL + 'product').then(response => {
            swal({
                title: "Success",
                text: "Data sudah ditambahkan",
                icon: "success",
                button: false
            });
            setTimeout(function () {
                window.location.reload(1);
            }, 600);
        }).catch((error) => {
            //error handle here
            alert("Error:", error)
        })
    }


    return (
        <>
            <Container fluid className='navbar-main'>
                <Container>
                    <div className='navbar'>
                        <Navbar className='navbar-1'>
                            <Nav>
                                <Nav style={{ color: 'white' }}>Home Page</Nav>
                            </Nav>
                        </Navbar>
                        <Navbar className='navbar-space'></Navbar>
                        <Navbar className='navbar-2'>
                            <Nav>
                                {login && login.userLogin ?
                                    <Button variant='outline-light' style={{ 'border': 'none' }} onClick={logout}><IoLogOut style={{ 'font-size': '20px' }} />Logout</Button>
                                    :

                                    <Link to='/login'><Button variant='outline-light' style={{ 'border': 'none' }}><IoLogIn style={{ 'font-size': '20px' }} />Login</Button></Link>

                                }

                            </Nav>
                        </Navbar>
                    </div>

                    <div className='navbar-second'>
                        <Navbar className='navbar-3'>
                            <Navbar.Brand>
                                <img src='./assets/images/logo.png' alt=''></img>
                            </Navbar.Brand>
                        </Navbar>
                        <Navbar className='navbar-search'>

                        </Navbar>
                        <Navbar className='narbar-4'>
                            {isLoginTrue && isLoginTrue.userLogin ?
                                <>
                                    <Button onClick={handleShow} variant="outline-light">
                                        <BsFillBagPlusFill style={{ 'font-size': '20px' }} />
                                    </Button>
                                </>
                                :
                                null
                            }
                        </Navbar>
                    </div>
                </Container>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddProduct handleAddProduct={handleAddProduct} />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default NavbarComponent