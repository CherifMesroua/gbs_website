export function getSelectedRadioValue(query_text) {
    var selectedRadio = document.querySelector(query_text);
    
    if (selectedRadio) {
        var selectedValue = selectedRadio.value;
        console.log("Selected value: " + selectedValue);
        return selectedValue;
    } else {
        console.log("No radio button selected");
        return "pas de type"; // or handle the case when no radio button is selected
    }
}
