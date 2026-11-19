
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js';

import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyDHHi3h2G5VY4bCg92QWZOjM6Bl6pco2ro",
    authDomain: "aba2025-8df97.firebaseapp.com",
    projectId: "aba2025-8df97",
    storageBucket: "aba2025-8df97.firebasestorage.app",
    messagingSenderId: "819645801939",
    appId: "1:819645801939:web:2c4f13c8029003c434bb26"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const usuario = document.getElementById('usuario');
const boton = document.getElementById('cerrar-sesion');
const contenido = document.getElementById('contenido');

onAuthStateChanged(auth, function(user) {

    if (user) {

        if (user.displayName) {
            usuario.textContent = "¡Hola, " + user.displayName + "!";
        } else {
            usuario.textContent = "¡Bienvenido a De Yaya Pa' Ti!";
        }

        contenido.hidden = false;

    } else {

        window.location.href = "login.html";

    }

});

boton.addEventListener('click', function() {

    signOut(auth)

        .then(function() {
            window.location.href = "login.html";
        })

        .catch(function(error) {
            console.log(error.message);
            alert("No se pudo cerrar la sesión.");
        });

});
