console.log("script runned");
let userData = [];
let editId = '';
imageData = '';
window.addEventListener("load", () => {
    let tdata = JSON.parse(localStorage.getItem("userdata"));
    if (tdata?.length) {
        userData = [...tdata];
        localStorageData();
        table();

    }
})
const handleSubmit = () => {
    console.log("clicked");
    let hobbyData = [];
    if (validation()) {
        let fname = document.querySelector("#inputname").value;
        let email = document.querySelector("#inputEmail").value;
        let password = document.querySelector("#inputPassword").value;
        let address = document.querySelector("#inputAddress").value;
        let city = document.querySelector("#inputCity").value;
        let state = document.querySelector("#inputState").value;
        let gender = document.querySelector("input[type=radio]:checked").value;
        let hobby = document.querySelectorAll("input[type=checkbox]:checked");
        hobby.forEach((x) => hobbyData.push(x.value));

        let id = editId ? editId : Math.floor(Math.random() * 10000000000);

        let data = { id, fname, email, password, address, city, state, gender, hobby: hobbyData, image: imageData };
        console.log(data);
        if (editId) {
            const index = userData.findIndex(x => x.id === editId);
            userData.splice(index, 1, data);

        }
        else {
            userData.push(data);
        }
        localStorageData();
        table();
        // var modal = document.getElementById("exampleModal");
        // modal.classList.remove();
        // modal.style.display = "none";
        // var modalback = document.getElementsByClassName("modal-backdrop")[0];
        // if (modalback) {
        //     modalback.parentNode.removeChild(modalback);
        // }
        var modal = document.getElementById("exampleModal");
        modal.classList.remove();
        modal.style.display = "none";
        var backdrop = document.getElementsByClassName("modal-backdrop")[0];
        if (backdrop) {
            backdrop.parentNode.removeChild(backdrop);
        }
    }

}
const localStorageData = () => {
    localStorage.setItem("userdata", JSON.stringify(userData));
}
const formRestData = () => {
    imageData = ''
    editId = '';
    document.getElementById("form").reset();
    document.getElementById("image").src = '';
    document.getElementById("efname").innerHTML = "";
    document.getElementById("eemail").innerHTML = "";
    document.getElementById("epassword").innerHTML = "";
    document.getElementById("eaddress").innerHTML = "";
    document.getElementById("ecity").innerHTML = "";
    document.getElementById("estate").innerHTML = "";
    document.getElementById("egender").innerHTML = "";
    document.getElementById("ehobby").innerHTML = ""
    document.getElementById("eimg").innerHTML = "";
}
const table = () => {
    document.getElementById("tbody").innerHTML = userData.map((data, index) => {
        return `<tr>
        <td>${data.id}</td>
        <td> <img src="${data.image}" alt="" height="100px" width="100px"></img></td>
        <td>${data.fname}</td>
        <td>${data.email}</td>
        <td>${data.address}</td>
        <td>${data.password}</td>
        <td>${data.gender}</td>
        <td>${data.hobby}</td>
        <td>${data.state}</td>
        <td>${data.city}</td>
        <td>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="updateData(${index})">update</button>
        <button type="button" class="btn btn-danger" onclick="deleteData(${index})">delete</button></td>
        </tr>`;
    })
}
const deleteData = (index) => {
    if (confirm("are you sure data deleted")) {
        userData.splice(index, 1);
        localStorageData();
        table();
    }
}
const updateData = (index) => {

    document.getElementById("inputname").value = userData[index].fname;
    document.querySelector("#inputEmail").value = userData[index].email;
    document.querySelector("#inputPassword").value = userData[index].password;
    document.querySelector("#inputAddress").value = userData[index].address;
    document.querySelector("#inputCity").value = userData[index].city;
    document.querySelector("#inputState").value = userData[index].state;
    document.querySelector(`input[type=radio][value=${userData[index].gender}`).checked = true;
    document.querySelectorAll("input[type=checkbox]").forEach((x) => { x.checked = userData[index].hobby.includes(x.value) })
    document.getElementById("image").src = userData[index].image;
    imageData = userData[index].image;
    editId = userData[index].id;
}
function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        console.log('RESULT', reader.result)
        imageData = reader.result;
        document.getElementById("image").setAttribute('src', reader.result);
    }
    reader.readAsDataURL(file);
}
const validation = () => {
    isvalid = true;
    let fname = document.querySelector("#inputname").value;
    let email = document.querySelector("#inputEmail").value;
    let password = document.querySelector("#inputPassword").value;
    let address = document.querySelector("#inputAddress").value;
    let city = document.querySelector("#inputCity").value;
    let state = document.querySelector("#inputState").value;
    let gender = document.getElementsByName("gender");
    let hobby = document.querySelectorAll("input[type=checkbox]:checked")


    let efname = document.getElementById("efname");
    let eemail = document.getElementById("eemail");
    let epassword = document.getElementById("epassword");
    let eaddress = document.getElementById("eaddress");
    let ecity = document.getElementById("ecity");
    let estate = document.getElementById("estate");
    let egender = document.getElementById("egender");
    let ehobby = document.getElementById("ehobby")
    let eimg = document.getElementById("eimg");

    if (fname === "") {
        efname.innerHTML = "please enter a name";
        isvalid = false
    } else {
        efname.innerHTML = ""
    }
    if (email === "") {
        eemail.innerHTML = "please enter a name";
        isvalid = false
    } else {
        eemail.innerHTML = ""
    }
    if (password === "") {
        epassword.innerHTML = "please enter a name";
        isvalid = false
    } else {
        epassword.innerHTML = ""
    }
    if (address === "") {
        eaddress.innerHTML = "please enter a name";
        isvalid = false
    } else {
        eaddress.innerHTML = ""
    }
    if (city === "") {
        ecity.innerHTML = "please enter a name";
        isvalid = false
    } else {
        ecity.innerHTML = ""
    }
    if (state === "") {
        estate.innerHTML = "please enter a name";
        isvalid = false
    } else {
        estate.innerHTML = ""
    }
    if (!(gender[0].checked || gender[1].checked || gender[2].checked)) {
        egender.innerHTML = "please enter a name";
        isvalid = false
    } else {
        egender.innerHTML = ""
    }
    if (hobby.length == 0) {
        ehobby.innerHTML = "please enter a name";
        isvalid = false
    } else {
        ehobby.innerHTML = ""
    }
    if (imageData.length == 0) {
        eimg.innerHTML = "please enter a name";
        isvalid = false
    } else {
        eimg.innerHTML = ""
    }
    return isvalid;
}