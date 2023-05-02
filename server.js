import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import Cards from './dbCards.js'
//App Config
const app = express()
const port = process.env.PORT || 8001
const connection_url = 'mongodb+srv://matnaden:matnaden@finalprojectcluster.4xkh1h9.mongodb.net/?retryWrites=true&w=majority'

//Middleware 
//USING cors: npm i cors, otherwise, you get cross - origin errors later when you
//deploy the app.CORS(Cross - Origin Resource Sharing) is the mechanism that restricts access from
//one domain to another.
app.use(express.json())
app.use(cors())

//DB Config

mongoose
    .connect(connection_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

//API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello TheWebDev"))
/*
app.post('/dating/cards', (req, res) => {
    const dbCard = req.body
    Cards.create(dbCard).then((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})
*/

app.post('/dating/cards', (req, res) => {
    const dbCard = req.body
    Cards.create(dbCard).then((data) => {
        console.log(JSON.stringify(data))
        res.status(200).send(data)
    })
})
app.get('/dating/cards', (req, res) => {
    Cards.find().then((data) => {
        res.status(200).send(data)
    })
})


//Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`))