const socket = io();
const form = document.getElementById('sendMsg')
const output = document.getElementById('output')
const actions = document.getElementById('actions')

window.addEventListener('DOMContentLoaded', () =>{
    checkSession()
})

const checkSession = () => { 
    if (!sessionStorage.getItem('chatName')) {
        login()
    }else{
        formLogin.style.display = 'none'
        document.getElementById('containerChat').style.display = 'block'
    }
}

const login = () => { 

    const btnLogin = document.getElementById('btnLogin')
    btnLogin.addEventListener('click', e =>{
        e.preventDefault()
        const formLogin = document.getElementById('formLogin')
        if ( formLogin["name"].value) {
            sessionStorage.setItem('chatName', formLogin["name"].value )
            formLogin.style.display = 'none'
            document.getElementById('containerChat').style.display = 'block'
        } 
    
    })
}

form.addEventListener('submit', e =>{
    e.preventDefault()
    if (form['message'].value != '') {
        socket.emit('msg',{
            username: sessionStorage.getItem('chatName'),
            message: form['message'].value
        })
        form['message'].value = ''
    }
})

form['message'].addEventListener('keypress', () =>{
    socket.emit('typing',sessionStorage.getItem('chatName'))
})

socket.on('msg', data => {
    const { username, message } = data
    actions.innerHTML = ''
    output.innerHTML += `<p><strong>${username}</strong> - ${message} </p>`
})

socket.on('typing', data => {
    actions.innerHTML += `<p><i>${data}</i> is typing </p>`
})