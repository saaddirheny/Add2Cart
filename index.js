import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://add2cart-practice-default-rtdb.firebaseio.com"
}

const app = initializeApp(appSettings)
const databse = getDatabase(app)
const ItemsInDB = ref(databse,"Items")


onValue(ItemsInDB, function(snapshot){
  if(snapshot.exists()){
    let snapedValue = snapshot.val()
    let snapedArray = Object.entries(snapedValue) //.values, .keys and .entries
    clearItemsField();
    for(let i=0 ; i<snapedArray.length; i++){
    let getItem = snapedArray[i];
    appendItemsToList(getItem)
  }}
  else{
    addedItems.innerHTML = "No Items Here, Yet..."
  }
})







const inputFieldEl = document.getElementById("inputField")
const buttonEl = document.getElementById("btn")
const addedItems = document.getElementById("items")

buttonEl.addEventListener("click", function(){
  let data = inputFieldEl.value;
  push(ItemsInDB,data)
  clearTextInputField();
  onValue();
})


function clearTextInputField(){
  inputFieldEl.value = '';
}

function clearItemsField(){
  addedItems.innerHTML = '';
}

function appendItemsToList(item){
  // addedItems.innerHTML += `<li>${item}</li>`;
  let getItem = item;
  let itemID = getItem[0];
  let itemValue = getItem[1];
  let newEl = document.createElement("li")
  newEl.textContent = itemValue;

  newEl.addEventListener("dblclick", function(){
    let exactLocationofItem = ref(databse, `Items/${itemID}`)
    remove(exactLocationofItem)
  })

  addedItems.append(newEl);
}