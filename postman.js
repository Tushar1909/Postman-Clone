// Intatilizing parameter counter
var paramsCount = 1;

// Function to get DOM element from string
function getDomFromString(string) {
    let div = document.createElement("div");
    div.innerHTML = string;
    return div.firstElementChild
}

let paramBox = document.getElementById("paramsBox");
let jsonBox = document.getElementById("jsonBox");
paramBox.style.display = "none";

let params = document.getElementById("params");
let json = document.getElementById("json");

// Hidding parmater and json box depending upon content type
json.addEventListener("click", () => {
    paramBox.style.display = "none";
    param.style.display = "none";
    jsonBox.style.display = "flex";
})

params.addEventListener("click", () => {
    paramBox.style.display = "flex";
    param.style.display = "block";
    jsonBox.style.display = "none";
})

// Function to add and remove parameters
let addParamas = document.getElementById("addParamas");
addParamas.addEventListener("click", () => {
    let str = `<div class="row g-3 my-1">
              <label for="inputEmail3" class="col-sm-2 col-form-label">Parameter ${paramsCount + 1}</label>
                <div class="col-4">
                    <input type="text" class="form-control" id="paramsKey${paramsCount + 1}" placeholder="Enter Parameter ${paramsCount + 1} Key" aria-label="First name">
                </div>
                <div class="col-4">
                      <input type="text" class="form-control" id="paramsValue${paramsCount + 1}" placeholder="Enter Parameter ${paramsCount + 1} Value" aria-label="Last name">
                </div>
                <div class="col-1">
                     <button  class="btn btn-primary form-control deleteBtn">-</button>
                </div>
            </div>
            `
    let paramsBoxChild = getDomFromString(str);
    document.getElementById("param").appendChild(paramsBoxChild);
    let deleteBtn = document.getElementsByClassName("deleteBtn");
    for (item of deleteBtn) {
        item.addEventListener("click", (e) => {
            e.target.parentElement.parentElement.remove();
        })
    }
    paramsCount++;
})

// Function invoke after sumbit
let sumbit = document.getElementById("submit");
sumbit.addEventListener("click", () => {

    // Requesting user to wait while fetching data
    document.getElementById("requestBox").innerHTML = "Please wait......Fetching data....";

    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;
    let data = {}

    // Collecting data based on content Type
    if (contentType === 'Parameters') {
        for (i = 0; i < paramsCount; i++) {
            if (document.getElementById("paramsKey" + (i + 1)) != undefined) {
                let key = document.getElementById("paramsKey" + (i + 1)).value;
                let value = document.getElementById("paramsValue" + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById("requestJson").value;
    }
    console.log(data);
    // Fetching data based on Request type
    if (requestType === 'GET') {
        fetch(url).then(Response => {
            return Response.text();
        }).then(data => {
            document.getElementById("requestBox").innerHTML = data;
        })
    }
    else {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: data
        }).then(Response => {
            return Response.text();
        }).then(text => {
            document.getElementById("requestBox").innerHTML = text;
        })
    }

})