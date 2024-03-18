import laughingFischl from './img/logo/laughingfischl.webp';
import sleepingQiqi from './img/logo/sleepingqiqi.webp';

import genshinLogo from './img/logo/genshinimpactlogo.png';
import './App.css';

let amntOfLogos = 2;
var URI = 'http://192.168.203.52'

function GetTodayCharacterListButton() {
//print data from API
//I can definitely make this one method
  function GetTodaysTalentList() {
    //this is the network ip of the API. This changes either when the host picks a new lease, and by extension
    //when the host connects to a different network domain
    //default domain - http://localhost:8080/character/farmable-today
    fetch(URI + ':8080/talents/farmable-today')
    .then(input => input.json())
    .then(inputData => {
      createOrUpdate(inputData);
      })
    .catch(error => console.error(error));
  };
  return (
    <button className = "character-list-button"
    onClick={GetTodaysTalentList}>Today</button>
  );
}

function GetYesterdayCharacterListButton() {
  //print data from API
  function GetYesterdaysTalentList() {
      //this is the network ip of the API. This changes either when the host picks a new lease, and by extension
      //when the host connects to a different network domain
      //default domain - http://localhost:8080/character/farmable-yesterday
      fetch(URI + ':8080/talents/farmable-yesterday')
      .then(input => input.json())
      .then(inputData => {
      createOrUpdate(inputData);
      })
      .catch(error => console.error(error));
  };
  return (
    <button className = "character-list-button"
    onClick={GetYesterdaysTalentList}>Yesterday</button>
  );
}

var tableCreated = 0;
function createOrUpdate(inputData){
  if(tableCreated === 1){
    deleteTable();
  }
  createTable(inputData);
  tableCreated = 1;
}

var currentCharTable;
//test function
function createTable(inputTalents) {
  currentCharTable = document.createElement('table'); //makes a table element for the page
  var headers = ["Talent", "Characters"];
  //iterate over talents
  for(var i = 0; i < inputTalents.length; i++) {
    var row = currentCharTable.insertRow(i);
    row.insertCell(0).innerHTML = inputTalents[i].name + ", " + inputTalents[i].region;
    let charactersInTalent = [];
    //iterate over character list in talent.characters
    for(let j = 0; j < inputTalents[i].characters.length; j++){
      charactersInTalent.push(" " + inputTalents[i].characters[j].name);
    }
    row.insertCell(1).innerHTML = charactersInTalent;
    //successful test: row.cells[0].innerHTML = '<img src = https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg height = "75" width = "75"/>';
  }
  var header = currentCharTable.createTHead();
  var headerRow = header.insertRow(0);
  for(i = 0; i < headers.length; i++) {
    headerRow.insertCell(i).innerHTML = headers[i];
  }
  document.body.append(currentCharTable);
  currentCharTable.scrollIntoView({behavior: "smooth"});
}

function deleteTable(){
  for(let i = currentCharTable.rows.length; i > 0; i--){
    currentCharTable.deleteRow(0);
  }
}

function updateTable(inputTalents){
  //iterate over talents
  for(var i = 0; i < inputTalents.length; i++) {
    currentCharTable.rows[i + 1].cells[0].innerHTML = inputTalents[i].name + ", " + inputTalents[i].region;
    let charactersInTalent = [];
    //iterate over character list in talent.characters
    for(let j = 0; j < inputTalents[i].characters.length; j++){
      charactersInTalent.push(" " + inputTalents[i].characters[j].name);
    }
    currentCharTable.rows[i + 1].cells[1].innerHTML = charactersInTalent;
  }
  currentCharTable.scrollIntoView({behavior: "smooth"});
}

function logoPicker(min, max){
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  var logoNum = Math.random() * (maxFloored - minCeiled) + minCeiled;
  if(logoNum < ((min + max) / 2)){
    return sleepingQiqi;
  }
  return laughingFischl;
}

function App() {
  return (
    <div className="App">
      {/**head of app */}
      <header className="App-header">
        <img src={logoPicker(1, amntOfLogos)} className="Spinner" width="100" height="100" alt = 'App-logo'/>
        <img src={genshinLogo} className="App-logo" alt="logo"/>
        <h1>
          Talent Tracker
        </h1>
          <p className = "farmable-characters-subtitle">List of farmable characters:</p>
          <div>
          {GetYesterdayCharacterListButton()} {GetTodayCharacterListButton()}
          </div>
      </header>

      {/**Body of app*/}
      <div className = "App-body">
      </div>
  </div>
  );
}

export default App;
