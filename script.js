let vaisiai = [    //// sukuriau masyva, t.y sandeli
  { id: "1", name: "Obuolys", quantity: "10" },
  { id: "2", name: "Bananas", quantity: "6" },
  { id: "3", name: "Kriause", quantity: "8" }
];

let maistoProduktai = [
  { id: "10", name: "Duona", quantity: "4" },
  { id: "11", name: "suris", quantity: "2" },
  { id: "12", name: "Pienas", quantity: "5" }
];

localStorage.setItem("vaisiai", JSON.stringify(vaisiai));  //// issaugom i local stoarge
localStorage.setItem("maistoProduktai", JSON.stringify(maistoProduktai));

console.log("Vaisiai:", JSON.parse(localStorage.getItem("vaisiai")));   // isvedam duomenis i konsole
console.log("Maisto produktai:", JSON.parse(localStorage.getItem("maistoProduktai")));

document.getElementById("addBtn").addEventListener("click", addItem);   /// iskvieciam kad kai paspaus vartototjas pvz add, bus iskvieciama funkcija
document.getElementById("editBtn").addEventListener("click", updateItem);
document.getElementById("clearBtn").addEventListener("click", clearInputs);

document.getElementById("loadBtn").addEventListener("click", loadForEdit);
document.getElementById("findBtn").addEventListener("click", findById);
document.getElementById("deleteBtn").addEventListener("click", deleteById);

let cartList = JSON.parse(localStorage.getItem("cartList")) || [];  /// sukuriam kintamuosius
let tableBody = document.getElementById("tableBody");
let foundBody = document.getElementById("foundBody");
let message = document.getElementById("message");

function saveData(){ localStorage.setItem("cartList", JSON.stringify(cartList)); }  //// issaugom cart list masyva kad duomenys isliktu po perkrovimo

/////// inner HTML isvalom lentele, pereinam per visus elementus cartList masyve, sukuriam eilute <TR> su produkto duomenimis, tada pridedam du mygtukus select ID ir Delete ir ideda eilute i lentele, ir su saveData issaugom duomenis
function showTables(){    
  tableBody.innerHTML = "";
  for(let i=0;i<cartList.length;i++){
    let it = cartList[i];
    let tr = document.createElement("tr");
    tr.innerHTML =
      "<td>"+it.id+"</td>" +
      "<td>"+it.name+"</td>" +
      "<td>"+it.quantity+"</td>" +
      "<td class='row-actions'>" +
        "<button onclick='selectId(\""+it.id+"\")'> Select ID </button>" +
        "<button class='danger' onclick='removeIndex("+i+")'> Delete </button>" +
      "</td>";
    tableBody.appendChild(tr);
  }
  saveData();
}

function setMsg(t){ message.textContent = t || ""; }  //// parodo pranesima arba isvalo ji jeigu nk nera
function clearInputs(){   /// isvalo visus ivesties laukus formoje
  document.getElementById("id").value = "";
  document.getElementById("name").value = "";
  document.getElementById("quantity").value = "";
}
function selectId(id){ document.getElementById("actionId").value = id; setMsg("pasirinktas id: "+id); }  //// i actionID irasom pasirinkto produkto ID ir parodom pranesima su tuo ID

function addItem(){  /////paimami duomenys is ivesties lauku
  let id  = document.getElementById("id").value;
  let nm  = document.getElementById("name").value;
  let qty = document.getElementById("quantity").value;

  if(id==="" || nm==="" || qty===""){ setMsg("uzpildyti visus laukelius"); return; }  /// tikrinam ar visi laukai uzpildyti
  for(let i=0;i<cartList.length;i++){ if(cartList[i].id===id){ setMsg("sis id jau egzistuoja"); return; } }  /// patikrinam ar toks ID jau yra sarase

  cartList.push({ id:id, name:name1, quantity:qty });  /// prideda nauja produkta i sarasa, atnaujina lentele, isvalo laukus ir rodo pranesima "item added"
  showTables();
  clearInputs();
  setMsg("Item added.");
}

function updateItem(){   /// paimami ivesti duomenys is lauku kaip iD,name,quantity
  let id  = document.getElementById("id").value;
  let name = document.getElementById("name").value;
  let qty = document.getElementById("quantity").value;
 return; }
  if(id==="" || nm==="" || qty==="") {setMsg("uzpildyti visus laukelius");  //// tikrina ar visi laukai uzpildyti, jei ne stabdo funkcija ir rodo pranesima

  let found = false;  /// einam oer cartList sarasa ir jei randa produkta su tokiu id, atnaujina jo pavadinima ir kieki
  for(let i = 0; i < cartList.length; i++){
    if(cartList[i].id===id){
      cartList[i].name = nm;
      cartList[i].quantity = qty;
      found = true;
      break;
    }
  }
}

function loadForEdit(){   ////  pasiimam ID is actionid laukelio, ieskom produkto cartListe, jei neranda rodo nerasta, jei randa ikelia duomenis i ivesties laukus
  let id = document.getElementById("actionId").value;
  let item = null;
  for(let i=0;i<cartList.length;i++){ if(cartList[i].id===id){ item = cartList[i]; break; } }
  if(!item){ setMsg("nerasta"); return; }
  document.getElementById("id").value = item.id;
  document.getElementById("name").value = item.name;
  document.getElementById("quantity").value = item.quantity;
  setMsg("kraunama");
}

function findById(){   ///// paimam ID is actionID
  let id = document.getElementById("actionId").value;
  foundBody.innerHTML = "";   /// isvalomas rezultato laukelis
  let item = null;
  for(let i=0;i<cartList.length;i++){ if(cartList[i].id===id){ item = cartList[i]; break;} }
  if(!item){ setMsg("nerasta"); return; }   //// jei neranda rodo nerasta
  let tr = document.createElement("tr");   /// jei randa sukuria lenteles eilute su jo duomenimis
  tr.innerHTML = "<td>"+item.id+"</td><td>"+item.name+"</td><td>"+item.quantity+"</td>";
  foundBody.appendChild(tr);
  setMsg("parodyti krepselyje");   
}

function deleteById(){   /// sukuriam funkcija kuri istrins elementa pagal jo ID
  let id = document.getElementById("actionId").value;
  let idx = -1;   /// -1 nes nezinoma ar toks elementas bus rastas
  for(let i=0;i<cartList.length;i++){ if(cartList[i].id===id) {idx = i; break; } }  /// ieskom prekes su tuo ID cartListe
  if(idx===-1){ setMsg("nerasta"); return; } 
  cartList.splice(idx,1);   //// jei randa istrina preke is masyvo ir isvalom resultatu sriti ir rodo "istrinta"
  foundBody.innerHTML = ""; 
  showTables();
  setMsg("istrinta");  
}

function removeIndex(index){    /// istrinam elementa pagal indx, isvalom lentele ir atnaujinam lenetele ir rodom "istrinta"
  cartList.splice(index,1);
  foundBody.innerHTML = "";
  showTables();
  setMsg("istrinta");
}

showTables();  //// funkcija kvieciama is naujo , kad puslapis parodytu atnaujinta sarasa po istrynimo
