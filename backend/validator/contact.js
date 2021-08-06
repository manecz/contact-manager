function validateName(name){
  //Name is empty?
  if(name == null || name === '')
    throw new Error('Invalid name')
}

//Phone number validation
const MAX_LENGTH = 9

function validatePhoneNumber(phone_number){
  //Name is empty?
  if(phone_number == null || phone_number === '')
    throw new Error('Invalid phone number')

  if(phone_number.length > MAX_LENGTH)
    throw new Error(`Invalid character length, (${phone_number} sent, length ${phone_number.length}), the maximum length is ${MAX_LENGTH}`)
}



export function validateContactInfo(name, phone_number){
  validateName(name)
  validatePhoneNumber(phone_number)
}