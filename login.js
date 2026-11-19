
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js';

import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js';

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

const formulario = document.getElementById('formulario-sesion');
const mensaje = document.getElementById('mensaje');
const boton = document.getElementById('btn-login');

async function loginUser(event) {

    event.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    mensaje.textContent = "";
    boton.disabled = true;
    boton.textContent = "Iniciando sesión...";

    try {

        await signInWithEmailAndPassword(auth, email, password);

        window.location.href = "homepage.html";

    } catch (error) {

        console.log(error.code);
        console.log(error.message);

        if (error.code === "auth/invalid-credential") {
            mensaje.textContent = "Correo o contraseña incorrectos.";
        } else if (error.code === "auth/network-request-failed") {
            mensaje.textContent = "Revisa tu conexión a internet.";
        } else if (error.code === "auth/too-many-requests") {
            mensaje.textContent = "Demasiados intentos. Intenta más tarde.";
        } else {
            mensaje.textContent = "No se pudo iniciar sesión.";
        }

        boton.disabled = false;
        boton.textContent = "Iniciar sesión";
    }
}

formulario.addEventListener('submit', loginUser);
