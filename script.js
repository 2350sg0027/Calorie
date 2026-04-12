let itemsData = [];
let counts = {};

fetch("data.json")
    .then(res => res.json())
    .then(data => {
        const saved = localStorage.getItem("itemsData");
        if(saved){
            itemsData = JSON.parse(saved);
        }else{
            itemsData = data;
        }
        init();
    });

function init(){
    const countainer = document.getElementById("items");

    itemsData.forEach((item,index)=>{
        counts[index] = 0;
        const div = document.createElement("div");
        div.className= "item";

        div.innerHTML = `
            <div class = "item-info">
                <p>${item.name}</p>
                <p>${item.price}円 / ${item.calorie}kcal</p>
            </div>

            <div class = "controls">
                <button onclick="changeCount(${index}, -1)">-</button>
                <span class="count" id="count-${index}">0</span>
                <button onclick="changeCount(${index}, 1)">+</button>
                <button class="delete-btn" onclick="deleteItem(${index})">×</button>
            </div>
        `;
        countainer.appendChild(div);
    })
}

function changeCount(index,delta){
    counts[index] = Math.max(0,counts[index]+delta);
    document.getElementById(`count-${index}`).textContent = counts[index];
    updateTotal();
}

function updateTotal(){
    let totalPrice = 0;
    let totalCalorie = 0;
    let totalSalt = 0;

    itemsData.forEach((item,index)=>{
        totalPrice += item.price * counts[index];
        totalCalorie += item.calorie * counts[index];
        totalSalt += item.salt * counts[index];
    });
    
    document.getElementById("totalPrice").textContent = totalPrice;
    document.getElementById("totalCalorie").textContent = totalCalorie;
    document.getElementById("totalSalt").textContent = totalSalt.toFixed(1);
}

function saveData(){
    localStorage.setItem("itemsData",JSON.stringify(itemsData));
}

function addItem(){
    const name = prompt("商品名");
    const price = Number(prompt("値段"));
    const calorie = Number(prompt("カロリー"));
    const salt = Number(prompt("塩分量"));

    const newItem = {name,price,calorie,salt};
    itemsData.push(newItem);
    saveData();
    location.reload();
}

function deleteItem(index){
    itemsData.splice(index,1);
    saveData();
    location.reload();
}
