import React, { useState, useEffect } from 'react'
import { Container, Table, Button, Form, Modal } from 'react-bootstrap'
import './ListCategories.css'
import axios from 'axios'
import { API_URL } from '../utils/constant'
import swal from 'sweetalert'
import { dateFormat } from '../utils/dateFormat'
import {BiEdit,BiTrash} from 'react-icons/bi'

const Account = () => {
    const [posts, setPost] = useState([])
    const [show, setShow] = useState(false);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [join_date, setJoin_date] = useState('')
    const [phone_number, setPhone_number] = useState('')
    const [userId, setUserId] = useState(null)

    const handleClose = () => {
        setShow(false)
    }
    const handleOpen = () => {
        setShow(true)
    }

    useEffect(() => {
        updateUser()
    }, [])

    const updateUser = () => {
        
        axios.get(API_URL + 'users').then(response => {
            setPost(response.data)
            setEmail(response.data[0].email)
            setPassword(response.data[0].password)
            setName(response.data[0].name)
            setAddress(response.data[0].address)
            setJoin_date(response.data[0].join_date)
            setPhone_number(response.data[0].phone_number)
            setUserId(response.data[0].id)
            
        })
    }
    const deleteUser = (id) => {
        axios.delete(`http://localhost:3100/users/${id}`).then((res) => {
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

    const selectUser = (id) => {
        handleOpen(true)
        let post = posts[id];
        setEmail(post.email)
        setPassword(post.password)
        setName(post.name)
        setAddress(post.address)
        setJoin_date(post.join_date)
        setPhone_number(post.phone_number)
        setUserId(post.id)
    }

    const updateUsers = () => {
        
        if (handleValidation()) {
            let post = { email, password, name, address, join_date, phone_number, userId }
            axios.put(`http://localhost:3100/users/${userId}`, post).then(() => {
                updateUser()
            })
            swal({
                title: "Success",
                text: "Data Telah Diubah",
                icon: "success",
                button: false
            })
            setTimeout(function () {
                window.location.reload();
            }, 900)

        } else {
            alert('Field tidak boleh kosong')
        }
    }

    return (
        <Container>
            <div className='kategori'>
                <h6 style={{ 'fontSize': '24px' }}>User Data</h6>
                <hr />
                <Table striped bordered hover style={{ 'textAlign': 'center','overflow':'auto','display':'block' }}>

                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Join Date</th>
                            <th>Phone Number</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post => {
                            return (
                                <tr>
                                    <td></td>
                                    <td>{post.email}</td>
                                    <td>{post.password}</td>
                                    <td>{post.name}</td>
                                    <td>{post.address}</td>
                                    <td>{dateFormat(post.join_date)}</td>
                                    <td>{post.phone_number}</td>
                                    <td ><Button onClick={() => selectUser(post.id)} variant={'warning'}><BiEdit/></Button> <Button onClick={() => deleteUser(post.id)} variant={'danger'}><BiTrash/></Button> </td>
                                </tr>)
                        })}

                    </tbody>
                </Table>

            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder="Enter User Email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"  placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} id="password" value={password} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="text"  placeholder="Enter Name" onChange={(e) => setName(e.target.value)} id="name" value={name} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Enter address" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Join Date</Form.Label>
                            <Form.Control type="date" placeholder="Enter Join Date" id="join_date" value={join_date} onChange={(e) => setJoin_date(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="text" placeholder="Enter Phone Number" id="phone_number" value={phone_number} onChange={(e) => setPhone_number(e.target.value)} required />
                        </Form.Group>
                        <Button variant="primary" type='submit' onClick={updateUsers}>
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    )
}

export default Account