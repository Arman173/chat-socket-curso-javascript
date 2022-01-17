/* GLOBAL VARIABLES */
let socket = io();
const signDiv   = document.querySelector('#signContainer');
const chatDiv   = document.querySelector('#chatContainer');
const nickInput = document.querySelector('#nickname-input');
const nickname  = document.querySelector('#nickname-text');
const messages  = document.querySelector('#messages');
const text      = document.querySelector('#text');
let nickValue;


/* EVENTOS SOCKETS */
socket.on('messages', messages => {
    console.log(messages);
    renderMessages( messages );
});


/* FUNCIONES DE RENDER Y LOGICA */
const signIn = () => {
    
    nickValue = nickInput.value;
    if ( nickValue.trim().length === 0 ) return false;

    nickname.innerHTML = nickValue;
    signDiv.classList.add('d-none');
    chatDiv.classList.remove('d-none');

    return false;
}

const addMessage = () => {
    const payload = {
        nickname: nickValue,
        text: text.value
    }

    socket.emit('add-message', payload);
    text.value = '';
    
    return false;
}

const renderMessages = msgs => {

    const messageClassMe = 'ms-auto text-white bg-dark';
    const html = msgs.map( message => {
        return (`
            <div class="msg message shadow p-3 m-3 ${ ( nickValue === message.nickname ) ? messageClassMe:'' }">
                <strong>${ message.nickname }</strong> dice:
                <p>${ message.text }</p>
            </div>
        `);
    }).join(' ');

    messages.innerHTML = html;
    messages.scrollTop = messages.scrollHeight;
}

