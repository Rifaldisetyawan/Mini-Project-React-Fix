const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()
const router = jsonServer.router('./product_db.json')
const userdb = JSON.parse(fs.readFileSync('./product_db.json', 'UTF-8'))

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(jsonServer.defaults());

const SECRET_KEY = '123456789'
const expiresIn = '1h'

// Create a token from a payload 
function createToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn })
}

// Verify the token 
function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err)
}

// Check if the user exists in database
function isLoginAuthenticated({ email, password }) {
    return userdb.users.findIndex(user => user.email === email && user.password === password) !== -1
}
function isRegisterAuthenticated({ email }) {
    return userdb.users.findIndex(user => user.email === email) !== -1
}
// Login to one of the users from ./users.json
server.post('/auth/register', (req, res) => {
    const { email, password, name, address, join_date, phone_number } = req.body;
    if (isRegisterAuthenticated({ email })) {
        const status = 401
        const message = 'Email & Password Already'
        res.status(status).json({ status, message })
        return
    }
    fs.readFile("./product_db.json", (err, data) => {
        if (err) {
            const status = 401
            const message = err;
            res.status(status).json({ status, message })
            return
        }
        data = JSON.parse(data.toString());
        let last_item_id = data.users[data.users.length - 1].id;
        data.users.push({ id: last_item_id +1, email: email, password: password, name: name, address: address, join_date: join_date, phone_number: phone_number })
        let writeData = fs.writeFile("./product_db.json",
            JSON.stringify(data),
            (err, result) => {
                if (err) {
                    const status = 401
                    const message = err;
                    res.status(status).json({ status, message })
                    return
                }
            })
    })
    const access_token = createToken({ email, password })
    console.log("Access Token:" + access_token);
    res.status(200).json({ access_token })
})

// Login to one of the users from ./users.json
server.post('/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (isLoginAuthenticated({ email, password }) === false) {
        const status = 401
        const message = 'Incorrect email or password'
        res.status(status).json({ status, message })
        return
    }
    const access_token = createToken({ email, password })
    console.log("Access Token:" + access_token);
    res.status(200).json({ access_token })
})


server.use(router)

server.listen(3100, () => {
    console.log('Server run at port 3100')
})