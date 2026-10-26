function tippcheck() {
  let inputValue = document.getElementById("tipp-input").value;
  let result = document.getElementById("result");
  console.log(inputValue);

  if (inputValue > 93) {
    result.innerHTML = "Nem, ennél kisebb.";
    result.style.color = "red";
  } else if (inputValue < 93) {
    result.innerHTML = "Nem, ennél nagyobb.";
    result.style.color = "red";
  } else {
    result.innerHTML = "Gratulálok, eltaláltad!";
    result.style.color = "green";
  }
}
