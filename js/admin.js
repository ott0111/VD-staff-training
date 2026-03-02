const table = document.getElementById("applicationsTable")

async function loadApplications(){

const { data, error } = await supabaseClient
.from("quiz_results")
.select("*")
.order("created_at",{ascending:false})

if(error){
console.error(error)
return
}

table.innerHTML = ""

data.forEach(app => {

let status = app.score >= 20 ? "PASS" : "FAIL"

let row = document.createElement("tr")

row.innerHTML = `

<td>${app.username}</td>

<td>${app.score} / ${app.total}</td>

<td class="${app.score >= 20 ? "pass" : "fail"}">${status}</td>

<td>

<button class="accept-btn" onclick="acceptUser('${app.id}')">Accept</button>

<button class="deny-btn" onclick="denyUser('${app.id}')">Deny</button>

</td>

`

table.appendChild(row)

})

}

async function acceptUser(id){

await supabaseClient
.from("quiz_results")
.update({status:"accepted"})
.eq("id",id)

loadApplications()

}

async function denyUser(id){

await supabaseClient
.from("quiz_results")
.update({status:"denied"})
.eq("id",id)

loadApplications()

}

loadApplications()
