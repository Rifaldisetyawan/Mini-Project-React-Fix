import {React, useState} from 'react'
import { Button, Form } from 'react-bootstrap'

const AddProduct = ({handleAddProduct}) => {
    const [productName, setProductName] = useState('')
    const [productQuantity, setProductQuantity] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productImage, setProductImage] = useState('https://picsum.photos/200')

    const handleName = (e) => {
        const val = e.target.value;
        setProductName(val)
    }

    const handleQuantity = (e) => {
        const val = e.target.value;
        setProductQuantity(val)
    }

    const handlePrice = (e) => {
        const val = e.target.value
        setProductPrice(val)
    }

    const handleImage = (e) => {
        const val = e.target.value
        setProductImage(val)
    }

    const handleValidation = () => {
        if (productName === '') {
            return false
        } else {
            return true
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (handleValidation()) {
            const newProduct = {
                name: productName,
                quantity: productQuantity,
                price: productPrice,
                image: productImage
            }
            handleAddProduct(newProduct)
            setProductName('')
            setProductQuantity('')
            setProductPrice('')
            setProductImage('https://picsum.photos/200')
            // window.location.reload(); 
        } else {
            alert('name is required')
        }
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Product's Name" onChange={handleName} id="name" value={productName}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Product Quantity</Form.Label>
                <Form.Control type="Number" min="0" placeholder="Enter Product's Quantity" onChange={handleQuantity} id="quantity" value={productQuantity}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Product Price</Form.Label>
                <Form.Control type="Number" min="0" placeholder="Enter Product's Price" onChange={handlePrice} id="price" value={productPrice}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Product Image</Form.Label>
                <Form.Control type="text" onChange={handleImage} id="image" value={productImage} disabled />
            </Form.Group>
            <Button variant="primary" type='submit'>
                Submit
            </Button>
        </Form>

    )
}
export default AddProduct