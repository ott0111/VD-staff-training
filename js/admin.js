const table = document.getElementById("applicationsTable")

let user = localStorage.getItem("voidUser")
let score = localStorage.getItem("voidScore")

if(user){

let status = score >= 20 ? "PASS" : "FAIL"

let row = document.createElement("tr")

row.innerHTML = `

<td>${user}</td>

<td>${score} / 30</td>

<td class="${score >= 20 ? "pass" : "fail"}">${status}</td>

<td>

<button class="accept-btn">Accept</button>

<button class="deny-btn">Deny</button>

</td>

`

table.appendChild(row)

}
