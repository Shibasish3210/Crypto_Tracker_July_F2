let resp_nav = `<li class="t-btn">
    <button class="d-flex bg-transparent border-0">
        <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked>
            <label class="form-check-label" for="flexSwitchCheckChecked"></label>
        </div>
        <div class="text-white">Light Mode</div>
    </button>
</li>
<li class="resp-nav-menu-items">Home</li>
<li class="resp-nav-menu-items">Compare</li>
<li class="resp-nav-menu-items">WatchList</li>
<li class="resp-nav-menu-items active-menu">DashBoard</li>`
let active = false;
const nav = document.querySelector("#my-nav");
function showMenu(){
    const list = document.createElement("ul");
    list.id = "resp-nav-menu";
    list.className = "resp-nav-menu";
    list.innerHTML = resp_nav;
    if(!active){
        nav.appendChild(list);
        active = true;
    }else if(active){
        nav.removeChild(nav.lastElementChild);
        active = false;
    }

}

// const checkbox = document.getElementsByClassName("form-check-input");
// console.log(checkbox);
// for (let i = 0; i < checkbox.length; i++) {
//     const elem = checkbox[i];
//     elem.addEventListener("click", ()=>{
//         document.querySelector("body").style.backgroundColor = "#f3f3f3";
//         document.querySelector("body").className = "text-black"

//     });
    
// }
let p = fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en");
p.then((response) => {
    return response.json();
}).then((data) =>{
    if(data && retriveData(data));
})
p.catch((err) => {
    console.log(err);
});

let arr;
function retriveData(data){
    arr = data;
    console.log(data);
}

const panels = document.querySelectorAll(".panels > .panel");

// console.log(buttons);
// const list_table = document.querySelector("#list-view > table");

const grid_btn = document.getElementById("grid");
const list_btn = document.getElementById("list");
const grid = document.getElementById("grid-view");
const list = document.getElementById("list-view");
grid.style.display = "none";
list.style.display = "none";

function showPanel(idx){
    pushGridContent();
    if(idx == 1){
        list_btn.style.borderBottom = "none";
        grid_btn.style.borderBottom = "2px solid rgb(60, 120, 205)";
        grid.style.display = "block";
        list.style.display = "none";
        if(arr)pushGridContent();
        list.innerHTML = '';
    }else{
        grid_btn.style.borderBottom = "none";
        list_btn.style.borderBottom = "2px solid rgb(60, 120, 205)";
        list.style.display = "block";
        grid.style.display = "none";
        if(arr)pushListContent();
        grid.innerHTML = '';
    }
}
showPanel(1);

function pushGridContent(){
    arr.forEach(element => {
        const container = document.createElement("div");
        let my_str = `<div class="cards">
        <div class="card-header">
        <div>
        <img class="card-img" src="${element.image}" alt="${element.name}">
        </div>
        <div card-tile>
        <div>${element.symbol}</div>
        <div>${element.name}</div>
        </div>
        </div>
        
        <div id="${element.name}" class="price_change">
        <div >${element.price_change_percentage_24h}<span style="margin-left: 5px;">%</span></div>
        </div>
        
        <div id="${element.id}" class="curret-price">
        ₹  ${element.current_price}
        </div>
        
        <div style="padding: 10px;">
        <div style="margin-bottom: 2px; font-size:13px; color:#f3f3f3b9; padding:0 1em;">Total Volume: ${element.total_volume.toLocaleString()}</div>
        <div style="margin-bottom: 2px; font-size:13px; color:#f3f3f3b9; padding:0 1em;">Market Cap: ${element.market_cap.toLocaleString()}</div>
        </div>
        </div>`
        container.innerHTML = my_str;
        grid.style.display = "flex";
        grid.appendChild(container);
        
        const price = document.getElementById(`${element.id}`);
        const change = document.getElementById(`${element.name}`);
        if(element.price_change_percentage_24h < 0){
            change.style.border = "2px solid red";
            price.style.color = "red";
        }
    });
}
function pushListContent(){
    const table = document.createElement("table");
    list.appendChild(table);
    arr.forEach((element) => {
        const row = document.createElement("tr");
        let str = `<td> 
        <img class="card-img" src="${element.image}" alt="${element.name}">
        </td>
        <td>
        <div card-tile>
        <div>${element.symbol}</div>
        <div>${element.name}</div>
        </div>
        </td>
        <td>
        <div id="${element.market_cap_rank}" class="price_change">
        <div >${element.price_change_percentage_24h}<span style="margin-left: 5px;">%</span></div>
        </div>
        </td>
        <td>
        <div id="${element.symbol}" class="curret-price">
        ₹  ${element.current_price}
        </div>
        </td>
        <td>
        <div style="margin-bottom: 2px; font-size:13px; color:#f3f3f3b9; padding:0 1em;">${element.total_volume.toLocaleString()}</div>
        </td>
        <td>
        <div>
        <div style="margin-bottom: 2px; font-size:13px; color:#f3f3f3b9; padding:0 1em;">${element.market_cap.toLocaleString()}</div>
        </td>`
        
        row.innerHTML = str;
        table.appendChild(row);
        
        const list_price = document.getElementById(`${element.symbol}`);
        const list_change = document.getElementById(`${element.market_cap_rank}`);
        if(element.price_change_percentage_24h < 0){
            list_change.style.border = "2px solid red";
            list_price.style.color = "red";
        }

    });
}