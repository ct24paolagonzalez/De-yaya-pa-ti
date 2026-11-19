
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js';

import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js';

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

const formulario = document.getElementById('register-form');
const mensaje = document.getElementById('mensaje');
const boton = document.getElementById('register-btn');

async function registrarUsuario(event) {

    event.preventDefault();

    const nombre = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    const confirmar = document.getElementById('confirm-password').value;

    mensaje.textContent = "";

    if (nombre === "") {
        mensaje.textContent = "Ingresa tu nombre.";
        return;
    }

    if (password !== confirmar) {
        mensaje.textContent = "Las contraseñas no coinciden.";
        return;
    }

    boton.disabled = true;
    boton.textContent = "Creando cuenta...";

    try {

        const resultado = await createUserWithEmailAndPassword(auth, email, password);

        try {
            await updateProfile(resultado.user, {
                displayName: nombre
            });
        } catch (error) {
            console.log(error.code);
            alert("Cuenta creada, pero no se pudo guardar el nombre.");
        }

        alert("Cuenta creada correctamente.");

        window.location.href = "homepage.html";

    } catch (error) {

        console.log(error.code);
        console.log(error.message);

        if (error.code === "auth/email-already-in-use") {
            mensaje.textContent = "Este correo ya está registrado.";
        } else if (error.code === "auth/weak-password") {
            mensaje.textContent = "La contraseña no es suficientemente segura.";
        } else if (error.code === "auth/network-request-failed") {
            mensaje.textContent = "Revisa tu conexión a internet.";
        } else {
            mensaje.textContent = "No se pudo crear la cuenta.";
        }

        boton.disabled = false;
        boton.textContent = "Crear cuenta";
    }
}

formulario.addEventListener('submit', registrarUsuario);
