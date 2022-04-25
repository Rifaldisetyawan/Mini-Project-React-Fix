import axios from 'axios'
import React, { useState } from 'react'
import { Form, Alert } from 'react-bootstrap'
import './Login.css'
import { useNavigate, Link } from 'react-router-dom'

const Login = ({setLogout}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3100/auth/login', {
            email,
            password
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
            setLogout(false);
            history('/')
        }).catch(()=>{setError('Email or Password uncorrect')})
    }


    return (
        <div className='kontainer'>
            <div className="form">
                <Form onSubmit={handleLogin} >
                
                <div></div>
                    <div className="title">Welcome, Login</div>
                    <div><img src='./assets/images/logo.png' alt=''></img></div>
                   {error &&<Alert variant="danger">{error}</Alert>}
                    <div className="input-container ic2">
                        <input id="email" className="input" type="email" placeholder="Email" value={email} onChange={handleEmail} />
                    </div>
                    <div className="input-container ic1">
                        <input id="password" className="input" type="password" placeholder="Password" value={password} onChange={handlePassword} />
                    </div>
                    <button type="text" className="submit">Login</button>
                    <p style={{ 'padding': '10px', 'color': 'white' }}>Don't Have Account??<Link to="/register">Register</Link></p>
                </Form>

            </div>
        </div>

    )
}

export default Login