import express from 'express'
import { findContactById } from '../middlewares/contact.js'
import { getAllContacts, getContact, updateContact, deleteContact, createContact } from '../controllers/contact.js'

const router = express.Router()

//Get all
router.get('/', getAllContacts)

//Get one
router.get('/:id', findContactById, getContact)

//Create one
router.post('/',createContact)

//Update one
router.put('/:id',findContactById, updateContact )

//Delete one
router.delete('/:id', findContactById, deleteContact)


export {router}