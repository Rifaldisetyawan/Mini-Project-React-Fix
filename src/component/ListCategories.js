import React, { useState, useEffect } from 'react'
import { Container, Table, Button, Form, Modal } from 'react-bootstrap'
import {BiEdit,BiTrash} from 'react-icons/bi'
import './ListCategories.css'
import axios from 'axios'
import { API_URL } from '../utils/constant'
import swal from 'sweetalert'


const ListCategories = () => {
    const [posts, setPost] = useState([])
    const [show, setShow] = useState(false);

    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('https://picsum.photos/200')
    const [productId, setProductId] = useState(null)

    const handleClose = () => {
        setShow(false)
    }
    const handleOpen = () => {
        setShow(true)
    }

    useEffect(() => {
        updateProduct()
    }, [])

    const updateProduct = () => {
        
        axios.get(API_URL + 'product').then(response => {
            setPost(response.data)
            setName(response.data[0].name)
            setQuantity(response.data[0].quantity)
            setPrice(response.data[0].price)
            setImage(response.data[0].image)
            setProductId(response.data[0].id)
            
        })
    }
    const deleteProduct = (id) => {
        axios.delete(`http://localhost:3100/product/${id}`).then((res) => {
            swal({
                title: "Success",
                text: "Data Telah Dihapus",
                icon: "success",
                button: false
            })
            setTimeout(function () {
                window.location.reload();
            }, 900)
        })
    }
    const handleValidation = () => {
        if (name === '') {
            return false
        } else {
            return true
        }
    }

    const selectProduct = (id) => {
        handleOpen(true)
        let post = posts[id - 1];
        setName(post.name)
        setQuantity(post.quantity)
        setPrice(post.price)
        setImage(post.image)
        setProductId(post.id)
    }

    const updateProducts = () => {
        
        if (handleValidation()) {
            let post = { name, quantity, price, image, productId }
            axios.put(`http://localhost:3100/product/${productId}`, post).then(() => {
                updateProduct()
            })
            swal({
                title: "Success",
                text: "Data Telah Diubah",
                icon: "success",
                button: false
            })

        } else {
            alert('Field tidak boleh kosong')
        }
    }

    return (
        <Container>
            <div className='kategori'>
                <h6 style={{ 'fontSize': '24px' }}>Product Data</h6>
                <hr />
                <Table striped bordered hover style={{ 'textAlign': 'center','overflow':'auto','display':'block' }}>

                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post => {
                            return (
                                <tr>
                                    <td></td>
                                    <td>{post.name}</td>
                                    <td>{post.quantity}</td>
                                    <td>{post.price}</td>
                                    <td>{post.image.length > 20 ?
                                    `${post.image.substring(0, 15)}...` : post.image
                                }</td>
                                    <td><Button onClick={() => selectProduct(post.id)} variant={'warning'}><BiEdit/></Button>  <Button onClick={() => deleteProduct(post.id)} variant={'danger'}><BiTrash/></Button> </td>
                                </tr>)
                        })}

                    </tbody>
                </Table>

            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Product's Name" id="name" onChange={(e) => setName(e.target.value)} value={name} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Quantity</Form.Label>
                            <Form.Control type="Number" min="0" placeholder="Enter Product's Quantity" onChange={(e) => setQuantity(e.target.value)} id="quantity" value={quantity} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control type="Number" min="0" placeholder="Enter Product's Price" onChange={(e) => setPrice(e.target.value)} id="price" value={price} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Image</Form.Label>
                            <Form.Control type="text" id="image" value={image} onChange={(e) => setImage(e.target.value)} disabled />
                        </Form.Group>
                        <Button variant="primary" type='submit' onClick={updateProducts}>
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    )
}

export default ListCategories

