let calculation = localStorage.getItem("calculation") || "";

updateResult("");

function updateResult(operation) {
    calculation += operation;
    document.querySelector('.shownumber').innerHTML = calculation;
    localStorage.setItem("calculation", calculation);
}
