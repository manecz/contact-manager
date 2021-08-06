import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

//Import Routes
import {router as contactsRouter} from './routes/contacts.js'

//Setup environment variables
dotenv.config()

//Setup Mongo BD
mongoose.connect(process.env.DB_ADDRESS, {useNewUrlParser: true,useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', (error => console.error(error)))
db.once('open', ()=>console.log('Connection to Database Sucessfull'))

//Express server config
const app = express()

//Express middlewares
app.use(express.json())
app.use(cors({
  origin: '*'
}))

//Register resource routes
app.use('/contacts', contactsRouter)


//Start server
app.listen(process.env.PORT || 5000, ()=>console.log('Server up and listennig...'))
