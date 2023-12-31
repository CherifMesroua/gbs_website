import {getSelectedRadioValue} from "./fonctions.js";
import { initializeApp  } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set,push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appsettings = {
    databaseURL: "https://gestiones-ddc58-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appsettings);
const database = getDatabase();
const numRows = 60;
const numCols = 10;

document.addEventListener('DOMContentLoaded', function(){
const ajouterunbon = document.getElementById('ajouterunbon');
const afficherexcel= document.getElementById('afficherexcel');
const input = document.getElementById('inputfile');
const displaytext = document.getElementById('displaytext');
const envoiyerversleserveur = document.getElementById('envoiyerversleserveur');
let dbconstracter=[];


afficherexcel.addEventListener('click', function () {
    if (!input.files || input.files.length === 0) {
        console.error("No file selected.");
        return;
    }

    const file = input.files[0];

    readXlsxFile(file).then(function (data) {
        let arrayData = data;

        let dataMatrix= [];
        for (let i = 0; i < 60; i++) {
            dataMatrix[i] = [];
            for (let j = 0; j < 10; j++) {
                dataMatrix[i][j]=arrayData[i][j];
            }
        }

        // ===========================this code show the result in tetxarea =============================
        // const numRows = 60;
        // const numCols = 10;

        // for (let i = 0; i < numRows; i++) {
        //     const rowContent = Array.from({ length: numCols }, (_, j) => dataMatrix[i][j]).join(" ");
        //     displaytext.innerHTML += rowContent +"\n";
        // }

        const jsonData = [];
        const keys = dataMatrix[0];

        // Starting from 1 as the first sub-array is already used for keys
        for (let i = 1; i < dataMatrix.length; i++) {
        const obj = {};
        for (let j = 0; j < keys.length; j++) {
            obj[keys[j]] = dataMatrix[i][j];
        }
        jsonData.push(obj);
        }

        displaytext.innerHTML = JSON.stringify(jsonData, null, 2);
        dbconstracter = JSON.stringify(jsonData, null, 2);
        dbconstracter = JSON.parse(dbconstracter);
        console.log(Array.isArray(dbconstracter));


    }).catch(function (error) {
        console.error("Error reading the file:", error);
    });
});
ajouterunbon.addEventListener('click', function(){
    const nom = document.getElementById('Nom');let nomvalue=nom.value;
    const matricule = document.getElementById('Matricule');let matriculevalue=matricule.value;
    const nomlabel= document.getElementById('nomlabel');
    const matriculelabel= document.getElementById('matriculelabel');
    const dbRef = ref(database, matriculevalue);
    
    var selectedValue = getSelectedRadioValue('input[name="bonType"]:checked');
    const currentDate = new Date();

    console.log("nom: ",nomvalue,"type: ",selectedValue,"date: ",Date(currentDate.toString()));
    matriculelabel.innerHTML +=  `${matriculevalue}`;
    nomlabel.innerHTML += `${nomvalue}`;
    push(dbRef,{"nom":nomvalue,"bonType":selectedValue,"date":currentDate.toString()});

});

envoiyerversleserveur.addEventListener('click', function(){
    
    for (const item of dbconstracter) {
        // const dbRef = ref(database, item.Matricule);
    
        // set(dbRef, {
        //     "Nom": item.Nom,
        //     "Catégorie": item.Catégorie,
        //     "Regime": item.Regime,
        //     "Temps1": item.Temps1,
        //     "Temps2": item.Temps2,
        //     "Sexe": item.Sexe,
        //     "Prenom": item.Prenom,
        //     "Fonction": item.Fonction,
        //     "Structure": item.Structure
        // });
        console.log(
            "Nom: " + item.Nom,
            "Catégorie: " + item.Catégorie,
            "Regime: " + item.Regime,
            "Temps1: " + item.Temps1,
            "Temps2: " + item.Temps2,
            "Sexe: " + item.Sexe,
            "Prenom: " + item.Prenom,
            "Fonction: " + item.Fonction,
            "Structure: " + item.Structure+"\n"
        );
      }
});

});