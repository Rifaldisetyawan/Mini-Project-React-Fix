import axios from 'axios'
import React, { useState } from 'react'
import { Form, Alert } from 'react-bootstrap'
import './Login.css'
import { useNavigate, Link } from 'react-router-dom'
import { getCurrentDate } from '../utils/getCurrentDate'
import swal from 'sweetalert'

const Register = ({ setLogout }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [join_date, setJoin_date] = useState(getCurrentDate())
    const [phone_number, setPhone_number] = useState('')
    const [error, setError] = useState('')
    let history = useNavigate('')

    const handleEmail = (e) => {
        const val = e.target.value
        setEmail(val)
    }

    const handlePassword = (e) => {
        const val = e.target.value
        setPassword(val)
    }

    const handleName = (e) => {
        const val = e.target.value
        setName(val)
    }

    const handleAddress = (e) => {
        const val = e.target.value
        setAddress(val)
    }

    const handleJoin_date = (e) => {
        const val = e.target.value
        setJoin_date(val)
    }

    const handlePhone_number = (e) => {
        const val = e.target.value
        setPhone_number(val)
    }

    const handleRegister = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3100/users', {
            email,
            password,
            name,
            address,
            join_date,
            phone_number
        }).then((res) => {
            console.log("res", res);
            localStorage.setItem("login", JSON.stringify({
                userLogin: true,
                token: res.data.access_token
            })
            );
            setError(" ")
            setEmail("")
            setPassword('')
            setName('')
            setAddress('')
            setJoin_date('')
            setPhone_number('')
            setLogout(false);
            swal({
                title: "Success",
                text: "Data sudah ditambahkan",
                icon: "success",
                button:false,
                timer:600
              });
              setTimeout(function(){
             history('/login')
             }, 700);
        }).catch(()=>{setError("Email Already Exist")})
    }


    return (
        <div className='kontainer-reg'>
            <div className="form">
                <Form onSubmit={handleRegister} >
                    <div className="title">Welcome, Regsiter Account</div>
                    <div><img src='./assets/images/logo.png' alt=''></img></div>
                    {error &&<Alert variant="danger">{error}</Alert>}
                    <div className="input-container ic2">
                        <input id="email" className="input" type="email" placeholder="Email" value={email} onChange={handleEmail} />
                    </div>
                    <div className="input-container ic1">
                        <input id="password" className="input" type="password" placeholder="Password" value={password} onChange={handlePassword} />
                    </div>
                    <div className="input-container ic2">
                        <input id="name" className="input" type="text" placeholder="name" value={name} onChange={handleName} />
                    </div>
                    <div className="input-container ic1">
                        <input id="address" className="input" type="text" placeholder="address" value={address} onChange={handleAddress} />
                    </div>
                    <div className="input-container ic2">
                        <input id="join_date" className="input" type="text" placeholder="join date" value={join_date} onChange={handleJoin_date} disabled/>
                    </div>
                    <div className="input-container ic1">
                        <input id="phone_number" className="input" type="text" placeholder="phone number" value={phone_number} onChange={handlePhone_number} />
                    </div>
                    <button type="text" className="submit">Register</button>
                    <p style={{ 'padding': '10px', 'color': 'white' }}> Have Account??<Link to="/login">Login</Link></p>
                </Form>
            </div>
        </div>

    )
}

export default Register