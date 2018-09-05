const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// json parsing capabilities
app.use(bodyParser.json())

const users = {
    "12": {
        name: "rajat"
    }
}

app.get('/users/:id?', (req, res) => {
    const id = req.params.id
    console.log('users: ', id)
    
    if (!id) {
        return res.send(JSON.stringify({error: "ID missing"}))
    }
    
    const result = users[id] || {error: "No user found"}
    return res.send(JSON.stringify(result))
})

app.post('/users', (req, res) => {
    const data = req.body
    console.log(data)
    
    if (!data) {
        return res.send(JSON.stringify({error: "No data"}))
    }
    
    // validate data
    if (!data.id) {
        return res.send(JSON.stringify({error: "ID missing"}))
    }
    
    // if id is there in users then update else create
    if (!users[data.id]) {
        users[data.id] = {}        
    }
    for (let i of Object.keys(data)) {
        if (i !== 'id') {
            // add this property to object
            users[data.id][i] = data[i]
        }
    }
    
    return res.send(JSON.stringify(users[data.id]))
})

app.delete('/users/:id?', (req, res) => {
    const id = req.params.id
    console.log('users: ', id)
    
    if (!id) {
        return res.send(JSON.stringify({error: "ID missing"}))
    }
    
    delete users[id]
    return res.send(JSON.stringify({message: "OK"}))
})

if (!process.env.PORT) {
    console.error('No port specified')
    process.exit(1)
}
app.listen(process.env.PORT)