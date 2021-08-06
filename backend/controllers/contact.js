import { Contact } from '../models/contact.js'
import { validateContactInfo } from '../validator/contact.js'

//Get all
export async function getAllContacts(req, res){
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts)
  } catch (error) {
    res.status(500).json({message : error.message})
  }
}

//Get one
export async function getContact(req, res){
  const contact = await Contact.findOne({_id: req.params.id}).exec();
  res.status(200).json(contact)
}

//Create
export async function createContact(req, res){
  try {
    //Object destructuring (descontruir um objecto em JS)
    const {name, phone_number} = req.body

    //Validate data (Validar os dados enviados pelo formulário)
    validateContactInfo(name, phone_number)

  
    const new_contact = new Contact(req.body)
        await new_contact.save()
    res.status(201).json({'message':'Contact created', 'status':'1'})
  } catch (error) {
    res.status(400).json({message : error.message, 'status':'0'})
  }
}


//Update
export async function updateContact(req, res){
    //Object destructuring (descontruir um objecto em JS)
    const {name, phone_number} = req.body
    //Validate data (Validar os dados enviados pelo formulário)
    validateContactInfo(name, phone_number)
    Contact.findByIdAndUpdate(req.params.id,req.body,(err,result)=>{
      if(err){
        res.status(400).json({message: err.message, status: '0'});
      } else{
        res.status(200).json({message: 'Contact updated with success', status: '1'});
      }
    })
}

//Delete
export async function deleteContact(req, res){
  try {
    res.contact.remove()
    res.status(200).json(res.contact)
  } catch (error) {
    res.status(500).json({message: 'Not found'})
  }
}