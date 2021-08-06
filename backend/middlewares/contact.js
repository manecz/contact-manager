import {Contact} from '../models/contact.js'

export async function findContactById(req, res, next){
  let contact

  try {
    contact = await Contact.findById(req.params.id)
    if(!contact)
      return res.status(404).json({message: 'Contact not found!'})

  } catch (error) {
    return res.status(500).json({message: error.message})
  }
  res.contact = new Contact(contact)
  next()

}