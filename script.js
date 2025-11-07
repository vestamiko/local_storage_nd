let vaisiai = [
  { id: "1", name: "Obuolys", quantity: "10" },
  { id: "2", name: "Bananas", quantity: "6" },
  { id: "3", name: "Kriause", quantity: "8" }
];

let maistoProduktai = [
  { id: "10", name: "Duona", quantity: "4" },
  { id: "11", name: "suris", quantity: "2" },
  { id: "12", name: "Pienas", quantity: "5" }
];

localStorage.setItem("vaisiai", JSON.stringify(vaisiai));
localStorage.setItem("maistoProduktai", JSON.stringify(maistoProduktai));

console.log("Vaisiai:", JSON.parse(localStorage.getItem("vaisiai")));
console.log("Maisto produktai:", JSON.parse(localStorage.getItem("maistoProduktai")));

document.getElementById("addBtn").addEventListener("click", addItem);
document.getElementById("editBtn").addEventListener("click", updateItem);
document.getElementById("clearBtn").addEventListener("click", clearInputs);

document.getElementById("loadBtn").addEventListener("click", loadForEdit);
document.getElementById("findBtn").addEventListener("click", findById);
document.getElementById("deleteBtn").addEventListener("click", deleteById);

let cartList = JSON.parse(localStorage.getItem("cartList")) || [];
let tableBody = document.getElementById("tableBody");
let foundBody = document.getElementById("foundBody");
let message = document.getElementById("message");

function saveData(){ localStorage.setItem("cartList", JSON.stringify(cartList)); }

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
        "<button onclick='selectId(\""+it.id+"\")'>Select ID</button>" +
        "<button class='danger' onclick='removeIndex("+i+")'>Delete</button>" +
      "</td>";
    tableBody.appendChild(tr);
  }
  saveData();
}

function setMsg(t){ message.textContent = t || ""; }
function clearInputs(){
  document.getElementById("id").value = "";
  document.getElementById("name").value = "";
  document.getElementById("quantity").value = "";
}
function selectId(id){ document.getElementById("actionId").value = id; setMsg("pasirinktas id: "+id); }

function addItem(){
  let id  = document.getElementById("id").value;
  let nm  = document.getElementById("name").value;
  let qty = document.getElementById("quantity").value;

  if(id==="" || nm==="" || qty===""){ setMsg("uzpildyti visus laukelius"); return; }
  for(let i=0;i<cartList.length;i++){ if(cartList[i].id===id){ setMsg("sis id jau egzistuoja"); return; } }

  cartList.push({ id:id, name:name1, quantity:qty });
  showTables();
  clearInputs();
  setMsg("Item added.");
}

function updateItem(){ 
  let id  = document.getElementById("id").value;
  let name = document.getElementById("name").value;
  let qty = document.getElementById("quantity").value;
 return; }
  if(id==="" || nm==="" || qty==="") {setMsg("uzpildyti visus laukelius");

  let found = false;
  for(let i = 0; i < cartList.length; i++){
    if(cartList[i].id===id){
      cartList[i].name = nm;
      cartList[i].quantity = qty;
      found = true;
      break;
    }
  }
}

function loadForEdit(){
  let id = document.getElementById("actionId").value;
  let item = null;
  for(let i=0;i<cartList.length;i++){ if(cartList[i].id===id){ item = cartList[i]; break; } }
  if(!item){ setMsg("nerasta"); return; }
  document.getElementById("id").value = item.id;
  document.getElementById("name").value = item.name;
  document.getElementById("quantity").value = item.quantity;
  setMsg("kraunama");
}

function findById(){
  let id = document.getElementById("actionId").value;
  foundBody.innerHTML = "";
  let item = null;
  for(let i=0;i<cartList.length;i++){ if(cartList[i].id===id){ item = cartList[i]; break;} }
  if(!item){ setMsg("nerasta"); return; }
  let tr = document.createElement("tr");
  tr.innerHTML = "<td>"+item.id+"</td><td>"+item.name+"</td><td>"+item.quantity+"</td>";
  foundBody.appendChild(tr);
  setMsg("parodyti krepselyje");  
}

function deleteById(){
  let id = document.getElementById("actionId").value;
  let idx = -1;
  for(let i=0;i<cartList.length;i++){ if(cartList[i].id===id) {idx = i; break; } }
  if(idx===-1){ setMsg("nerasta"); return; }
  cartList.splice(idx,1);
  foundBody.innerHTML = "";
  showTables();
  setMsg("istrinta");  
}

function removeIndex(index){
  cartList.splice(index,1);
  foundBody.innerHTML = "";
  showTables();
  setMsg("istrinta");
}

showTables();
