import {getSelectedRadioValue} from "./fonctions.js";
import { initializeApp  } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set,push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

document.addEventListener('DOMContentLoaded', function(){

ajouterunbon.addEventListener('click', function(){
    const nom = document.getElementById('Nom');
    const matricule = document.getElementById('Matricule');

    const ajouterunbon = document.getElementById('ajouterunbon');
    const appsettings = {
        databaseURL: "https://gestiones-ddc58-default-rtdb.europe-west1.firebasedatabase.app/"
    }

    const app = initializeApp(appsettings);
    const database = getDatabase();
    const dbRef = ref(database, matricule.value);

    // const dbRef = firebase.database().ref(database, matricule.value);

    var selectedValue = getSelectedRadioValue('input[name="bonType"]:checked');
    console.log("nom: ",nom.value,"type: ",selectedValue);
    push(dbRef,{"nom":nom.value,"bonType":selectedValue});
    // const bonData = {
    //     "nom": nom.value,
    //     "id": matricule.value,
    //     "bonType": bonType
    // };
    //push(dbRef,{"nom":nom.value,"id":matricule.value,"bonType":typedebon.value})
    // console.log("bon ajouter");
    // console.log({"nom":nom.value,"id":matricule.value});

    // // / Create a new Date object
    // const currentDate = new Date();

    // // Get the current date
    // const year = currentDate.getFullYear();
    // const month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
    // const day = currentDate.getDate();

    // // Get the current time
    // const hours = currentDate.getHours();
    // const minutes = currentDate.getMinutes();
    // const seconds = currentDate.getSeconds();
    // console.log("Current Date:", year + "-" + month + "-" + day);
    // console.log("Current Time:", hours + ":" + minutes + ":" + seconds);
});

});