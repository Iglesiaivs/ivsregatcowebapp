
/**
 * Autor: jl_
 * ADSI - SENA
 * email: devluisluzardo@gmail.com
 * Fecha creacion : 21 - Sept- 2023
 * 
 * desscripcion:
 * 
**/

//Firebase: Authentication
//Google Firebase : Google Popu up
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

//Firebase: RealTime Database
import {
  getDatabase,
  ref,
  set,
  onValue,
  query, 
  orderByKey,
  get,
  limitToLast,
  equalTo, 
  child,
  update
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

let direccion="", celular="", ciudad="";

//Firebase: Initialize service
const firebaseApp = initializeApp({
  apiKey: "AIzaSyArK2n6_hj6ijMv5v6c7w924zgtK8G8INI",
  authDomain: "iglesiaivsregionalatco.firebaseapp.com",
  projectId: "iglesiaivsregionalatco",
  storageBucket: "iglesiaivsregionalatco.appspot.com",
  messagingSenderId: "228956104410",
  appId: "1:228956104410:web:6ceb3f6bed247d9df3e7e3"
});

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider(firebaseApp);

// Asignamos el objeto a la constante
// Obtenemos el elemento botón
const button = document.getElementById("login");
// Obtenemos el botón de cierre de sesión
const logoutButton = document.getElementById("loginout");
// Obtenemos el botón de cierre de sesión, desde perfil
const logoutButton2 = document.getElementById("loginout2");
// Obtenemos el elemento botón
const login  = document.getElementById("login");
// Obtenemos el elemento botón
const login2 = document.getElementById("login2");

//Desplegamos el boton: oCULTAR
logoutButton.style.display = "none";
login.style.display        = "none";

//Ocultamos el texto del modal perfil
logoutButton2.style.display = "none";
//Desplegamos el texto del modal perfil
login2.style.display    = "none";
// ...          

login.addEventListener("click", (e) => {

  signInWithRedirect(auth, provider);

  getRedirectResult(auth)
  .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;

      //Desplegamos el boton
  ////logoutButton.style.display = "block";
      //Ocultamos el boton
  ////login.style.display   = "none";

      //Ocultamos el texto del modal perfil
  ////logoutButton2.style.display = "block";
      //Desplegamos el texto del modal perfil
  ////login2.style.display    = "none";
      // ...          

    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
});

login2.addEventListener("click", (e) => {

  signInWithRedirect(auth, provider);

  getRedirectResult(auth)
  .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;

      //Desplegamos el boton
      logoutButton.style.display = "block";
      //Ocultamos el boton
      login.style.display   = "none";       
      
      //Ocultamos el texto del modal perfil
      logoutButton2.style.display = "block";
      //Desplegamos el texto del modal perfil
      login2.style.display    = "none";
      // ...          

    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
});



// Escuchamos el evento click en el botón
logoutButton.addEventListener("click", (e) => {
  // Salir sesion
  signOut(auth).then(() => {

    //Ocultamos el boton
    logoutButton.style.display = "none";
    //Desplegamos el boton
    login.style.display   = "block";

    //Ocultamos el texto del modal perfil
    logoutButton2.style.display = "none";
    //Desplegamos el texto del modal perfil
    login2.style.display    = "block";
    // ...   

    //modal perfil: cuenta
    document.getElementById("idcuenta-nombre").innerText = "";
    document.getElementById("idcuenta-email").innerText  = "";

  }).catch((error) => {
    // Mostrar un mensaje de error
    console.log("Error al tratar de salir sesion");
    console.log(error);
  });
});



// Escuchamos el evento click en el botón
logoutButton2.addEventListener("click", (e) => {
  // Salir sesion
  signOut(auth).then(() => {

    //Ocultamos el boton
    logoutButton.style.display = "none";
    //Desplegamos el boton
    login.style.display   = "block";

    //Ocultamos el texto del modal perfil
    logoutButton2.style.display = "none";
    //Desplegamos el texto del modal perfil
    login2.style.display    = "block";
    // ...        

    //modal perfil: cuenta
    document.getElementById("idcuenta-nombre").innerText = "";
    document.getElementById("idcuenta-email").innerText  = "";

  }).catch((error) => {
    // Mostrar un mensaje de error
    console.log("Error al tratar de salir sesion");
    console.log(error);
  });
});
 


// Agrega un evento al botón actuperfil para agregar el subnivel "perfil" a los datos del usuario
actuperfil.addEventListener("click", () => {
  // Obtiene la instancia de autenticación de Firebase
  const auth = getAuth();

  // Accede al usuario actual (currentUser)
  const user = auth.currentUser;

  if (user) {
    // Usuario autenticado, puedes acceder a sus propiedades
    //console.log("Usuario actual:", user.uid);

    /* /registro de perfil de usuarios
    var newDireccion = "Calle 14 # 7a - 100";
    var newCelular   = "3236992344";
    var newCiudad    = "";
    var newCumple    = "";
    var newSexo      = "";
    */

    // Codificar el email en Base64
    const emailEncoded = btoa(user.email);

    // Referencia a la base de datos utilizando el email codificado como parte de la ruta
    const db = getDatabase();
    const dbf = ref(db, 'usuario/idkey:' + emailEncoded);

    // Agrega el subnivel "perfil" a los datos del usuario
    const perfilData = {
      direccion: newDireccion,
      celular: newCelular
    };

    set(child(dbf, 'perfil'), perfilData).then(() => {
      // Subnivel "perfil" agregado con éxito a los datos del usuario
      console.log('Subnivel "perfil" agregado con éxito a los datos del usuario');
    }).catch((error) => {
      // Error al agregar el subnivel "perfil"
      console.log('Error al agregar el subnivel "perfil": ' + error.message);
    });
  } else {
    // El usuario no está autenticado
    console.log("No hay usuario autenticado.");
  }
});




//AL cambiar el estado de autenticacion
onAuthStateChanged(auth, (user) => {
  if (user) {
      const uid    = user.uid;
      const uname  = user.displayName;
      const uemail = user.email;
      let id       = 1;

      //modal perfil: cuenta
  ////document.getElementById("idcuenta-nombre").innerText = "Nombre : " + uname;
  ////document.getElementById("idcuenta-email").innerText  = "Email : "  + uemail;

      //Ocultamos el botón
  ////login.style.display   = "none";
      //Desplegamos el botón
  ////logoutButton.style.display = "block";

      //Ocultamos el texto del modal perfil
  ////logoutButton2.style.display = "block";
      //Desplegamos el texto del modal perfil
  ////login2.style.display    = "none";
      // ...    

      const emailEncoded = btoa(uemail); // Codificar el email en Base64
      const db = getDatabase();

      const dbf = ref(db, 'usuario/idkey:' + emailEncoded);
      onValue(dbf, (snapshot) => {
        let data = snapshot.val();
      
        if (data !== null) {
          // Si data no es nulo, significa que hay un valor en el nodo
          console.log('Hay un valor en el nodo: ......... ');
          //console.log(data);
        }
        else {
          // Si data es nulo, significa que no hay un valor en el nodo
          console.log('No hay un valor en el nodo');
          const path = 'usuario/idkey:' + emailEncoded;
          // Luego, puedes usar 'path' en tu función set
          set(ref(db, path), {
            nombre: uname,
            email: uemail,
            key: uid,
            idrol: 4,
            idnivel: 2
          });
        }
      });
      // ...
  } 
  else {
    // User is signed out

    //Ocultamos el botón
  ////logoutButton.style.display = "none";
    //Desplegamos el botón
  ////login.style.display    = "block";
    // ...

    //Ocultamos el texto del modal perfil
  ////logoutButton2.style.display = "none";
    //Desplegamos el texto del modal perfil
  ////login2.style.display    = "block";
    // ...    


  }
});
