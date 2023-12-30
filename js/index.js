import {getSelectedRadioValue} from "./fonctions.js";
import { initializeApp  } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set,push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

document.addEventListener('DOMContentLoaded', function(){
const ajouterunbon = document.getElementById('ajouterunbon');
const afficherexcel= document.getElementById('afficherexcel');
const input = document.getElementById('inputfile');
const displaytext = document.getElementById('displaytext');

afficherexcel.addEventListener('click', function () {
    if (!input.files || input.files.length === 0) {
        console.error("No file selected.");
        return;
    }

    const file = input.files[0];

    readXlsxFile(file).then(function (data) {
        let arrayData = data;
        console.log(arrayData.length);
        let dataMatrix= [];
        for (let i = 0; i < 60; i++) {
            dataMatrix[i] = [];
            for (let j = 0; j < 10; j++) {
                dataMatrix[i][j]=arrayData[i][j];
            }
        }
        const numRows = 60;
        const numCols = 10;

        for (let i = 0; i < numRows; i++) {
            const rowContent = Array.from({ length: numCols }, (_, j) => dataMatrix[i][j]).join(" ");
            displaytext.innerHTML += rowContent + " line: " + i + "\n";
        }
        // displaytext.innerHTML = Array(dataMatrix);
        console.log(Array(dataMatrix));
    }).catch(function (error) {
        console.error("Error reading the file:", error);
    });
});
ajouterunbon.addEventListener('click', function(){
    const nom = document.getElementById('Nom');let nomvalue=nom.value;
    const matricule = document.getElementById('Matricule');let matriculevalue=matricule.value;
    const nomlabel= document.getElementById('nomlabel');
    const matriculelabel= document.getElementById('matriculelabel');

    const appsettings = {
        databaseURL: "https://gestiones-ddc58-default-rtdb.europe-west1.firebasedatabase.app/"
    }

    const app = initializeApp(appsettings);
    const database = getDatabase();
    const dbRef = ref(database, matriculevalue);

    var selectedValue = getSelectedRadioValue('input[name="bonType"]:checked');
    const currentDate = new Date();

    console.log("nom: ",nomvalue,"type: ",selectedValue,"date: ",Date(currentDate.toString()));
    matriculelabel.innerHTML +=  `${matriculevalue}`;
    nomlabel.innerHTML += `${nomvalue}`;
    // push(dbRef,{"nom":nomvalue,"bonType":selectedValue,"date":currentDate.toString()});

});

});