let socket = io();
let xhr = new XMLHttpRequest();
let form = document.querySelector('.form');

submitForm = (e) => {
    e.preventDefault();
    socket.emit('connection', () => {
        let password = document.querySelector('.password').value;
        let email = document.querySelector('.email').value;
        xhr.open('POST', 'http://localhost:4000/api/users/login', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            email,
            password
        }));
    })
}

// form.addEventListener('onsubmit', (e) => {
//     console.log("Hello");
// })

// socket.emit('connection', () => {
//     //
// });