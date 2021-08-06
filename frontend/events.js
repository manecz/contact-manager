import Contact from './model/Contact.js'
import {_delete, getAll, getOne, save, update} from './api_coms.js'
import {initizializeTable} from './main.js'


//Helpers
const drawList = (contact)=>{
    return `<tr>
    <td>${contact.name}</td>
    <td>${contact.phone_number}</td>
    <td class="btn_op"><a href="#update" class="btn btn-primary btn-sm" id=${contact._id}>Update</a> 
    <a href="#delete" data-btnTipo="delete" class="btn btn-danger btn-sm" id=${contact._id}>Delete</a></td>
    </tr>`;
}

export const createContactsTable = (game)=>{
    let temp = '';
    game.forEach(el=>{
        temp += drawList(el);
    })
    return temp;
}

const criarFormulario = (t) =>{
    let type = (t === 'create')? 'Create' : 'Update';
    const modal = $.sweetModal({
        title: `${type} Contact`,
        content: `<div class="container"><form id=form_${type}>
        <input id="name" class="form-control" type="text" name="name" placeholder="Name"  required>
        <input id="phone_number" class="form-control" type="text" name="phone_number" placeholder="Phone Number" required>
        <p></p>
        <br>
        <button id=${type} class="btn btn-primary">${type}</button>
        </form'></div>`,
    });
    
    return modal;
}


//Eventos

export const ev_refresh = (el,table) => {
    el.addEventListener('click', async ()=>{
        let res = await getAll();
        table.innerHTML = createContactsTable(res);
    })
}

export const ev_inserirRegisto = (el) =>{
    el.addEventListener('click', ()=>{
        const formulario = criarFormulario('create');
        let formDOM = document.querySelector('#form_Create');
        formDOM.addEventListener('submit', async (e)=>{
            e.preventDefault();
            const contact = new Contact (formDOM.name.value, formDOM.phone_number.value)
        //Enviar objeto
        console.log(contact)
        const result = await save(contact);
        initizializeTable();
        $.sweetModal({
            content: `${result.message}`,
            icon: (result.status == 1)?$.sweetModal.ICON_SUCCESS:$.sweetModal.ICON_ERROR,
            buttons: {
                someAction: {
                    label: 'Close',
                    classes: '',
                    action: function() {
                        formulario.close();
                    }
                },
            }
        });
        })
    })
}

export const ev_update = () =>{
    document.addEventListener('click', async(event)=>{
        let option = event.target.hash;
        let id = event.target.id;
        if(id != "" && option == "#update"){
            const formulario = criarFormulario('update');
            let formDOM = document.querySelector('#form_Update');
            let btnUpdate = document.getElementById('Update');
            //console.log(event.target.id);
            let contact = await getOne(id);
            //console.log(game);

            //Preenche dados no formulario devolvidos pelo getOneGame
            Object.keys(contact).forEach(el=>{
                if(el == 'name' || el == 'phone_number'){
                    //console.log(el + '-' + game[el]);
                    formDOM[el].value = contact[el];
                }
            })

            //Submeter Formulario
            btnUpdate.addEventListener('click', async (e)=>{
                e.preventDefault();
                const temp = new Contact (formDOM.name.value,formDOM.phone_number.value)
                const result = await update(temp,id);
                console.log(result);
                initizializeTable();
                $.sweetModal({
                    content: `${result.message}`,
                    icon: (result.status == 1)?$.sweetModal.ICON_SUCCESS:$.sweetModal.ICON_ERROR,
                    buttons: {
                        someAction: {
                            label: 'Close',
                            classes: '',
                            action: function() {
                                formulario.close();
                            }
                        },
                    }
                });
            })
            

        }
    })
}

export const ev_delete = () => {
    document.addEventListener('click', (event)=>{
        let option = event.target.hash;
        let id = event.target.id;
        let result;
        if(id != "" && option == "#delete"){
            //console.log(id);
            //deleteGame(el.id);
            $.sweetModal.confirm('Are you sure you want to delete?','Please confirm', async function() {
                result = await _delete(id);
                initizializeTable();
                $.sweetModal('Contact Deleted');
            }, function() {
                $.sweetModal('Aborted!');
            });
        }
    })
}