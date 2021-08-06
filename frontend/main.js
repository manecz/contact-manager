import { getAll } from './api_coms.js'
import {createContactsTable, ev_refresh, ev_inserirRegisto, ev_update, ev_delete} from './events.js'

const bt_get_games = document.getElementById('get_games_btn');
const game_table = document.getElementById('populate_table');

const createGame = document.getElementById('create_btn');

const message = document.getElementById('message');

//Evento de Rrefresh através de botão
ev_refresh(bt_get_games, game_table);

//Evento Inserir Jogo
ev_inserirRegisto(createGame);

//Evento Atualizar Registo
ev_update();

//evento apagar
ev_delete();

export const initizializeTable = async ()=>{
    let res = await getAll();
    //console.log(Object.keys(res).length);
    if (Object.keys(res).length === 0){
        game_table.innerHTML = "";
        message.innerHTML = "No records";
    } else {
        message.innerHTML = "";
        game_table.innerHTML = createContactsTable(res);
    }
}

initizializeTable();