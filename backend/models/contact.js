import mongoose from 'mongoose'

const contactSchema = mongoose.Schema({
  name : {
    type: String,
    required: true
  },
  phone_number : {
    type: String,
    required: true
  }
})

export const Contact = mongoose.model('Contact', contactSchema)
