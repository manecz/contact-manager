const base_url = "http://localhost:3000/contacts/"
const headersConfig = { "Content-Type": "application/json" }


export async function getAll(){

    try {
        const response = await fetch(base_url)
        const data = await response.json()

        return data;
    }   catch (error) {
        console.error(error)
    }
}

export async function save(contact){
   try{
       const res = await fetch(base_url, {
           //Tipo de pedido
            method: 'POST',
           //Cabeçalhos
           headers: headersConfig,
           //Dados
           body: JSON.stringify(contact)
       })

       const data = await res.json()
       console.log(data);
       return data;
   } catch (error)
   {
       console.log(error)
   }
}

export async function _delete(id){
    const res = await fetch(base_url + id,{
           //Tipo de pedido
            method: 'DELETE'
       })
       return await res.json();
}

export async function getOne(id){
    try {
        const response = await fetch(base_url + id, {
            method: 'GET',
            headers: headersConfig
        })
        const data = await response.json()
        return data
    }   catch (error) {
        console.error(error)
    }
}

export async function update(contact,id){
    //console.log(id);
    try{
        const res = await fetch(base_url + id, {
            //Tipo de pedido
             method: 'PUT',
            //Cabeçalhos
            headers: headersConfig,
            //Dados
            body: JSON.stringify(contact)
        })
 
        const data = await res.json()
        return data;
    } catch (error)
    {
        console.log(error)
    }
 }