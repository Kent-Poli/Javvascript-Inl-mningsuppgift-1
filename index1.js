const regForm = document.querySelector("#reg-form");

const ulList = regForm.nextElementSibling;
let users = [];
let usersRef = {};
let inputFirstName = regForm[0];
let inputLastName = regForm[1];
let inputEmail = regForm[2];

const validateText = () => {
  if (regForm[0].value.length < 2) {
    regForm.children[1].style.display = "block";
    regForm[0].style.borderColor = "red";
    regForm.children[0].children[1].style.display = "none";
    return false;
  } else {
    regForm.children[1].style.display = "none";
    regForm.children[0].children[0].style.borderColor = "green";
    regForm.children[0].children[1].style.display = "block";
  }

  if (regForm[1].value.length < 2) {
    regForm.children[3].style.display = "block";
    regForm.children[2].children[0].style.borderColor = "red";
    regForm.children[2].children[1].style.display = "none";
    return false;
  } else {
    regForm.children[3].style.display = "none";
    regForm.children[2].children[0].style.borderColor = "green";
    regForm.children[2].children[1].style.display = "block";
  }
};

const validateEmail = () => {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (regForm[2].value.match(regex)) {
    regForm.children[5].style.display = "none";
    regForm.children[4].children[0].style.borderColor = "green";
    regForm.children[4].children[1].style.display = "block";
  } else {
    regForm.children[4].children[1].style.display = "none";
    regForm.children[4].children[0].style.borderColor = "red";
    regForm.children[5].style.display = "block";
    return false;
  }
};

const validateCheckBox = () => {
  const checkBox = document.querySelector("#check");
  if (checkBox.checked === false) {
    checkBox.form[3].nextElementSibling.style.color = "red";
    return false;
  } else {
    checkBox.form[3].nextElementSibling.style.color = "green";
    return true;
  }
};
// Function printList
const printList = () => {
  const user = {
    id: Date.now().toString(),
    firstName: inputFirstName.value,
    lastName: inputLastName.value,
    email: inputEmail.value,
  };
  const newUser = user;

  const emailExists = users.some((user) => user.email === newUser.email);
  if (emailExists) {
    return (inputEmail.value = "User exists");
  }

  users.push(newUser);
  // users.push(user);

  ulList.innerHTML = "";
  for (let i = 0; users.length > i; i++) {
    ulList.innerHTML += `
      <div id='${users[i].id}' class="list-container">
      <li>${users[i].firstName} ${users[i].lastName}</li>
      <a href="mailto: ${users[i].email}">${users[i].email}</a>
      
      <button id='btn-delete' type='button'>Delete</button>
      <button id='btn-save' type='button'>Save</button>
      <button id='btn-change' type='button'>Change<br>User</button>
      </div>
      `;
  }
};
// Function changeUser
const changeUser = (e) => {
  if (e.target.id === "btn-change") {
    usersRef = users.find((user) => {
      return user.id === e.target.parentNode.id;
    });
    inputFirstName.value = usersRef.firstName;
    inputLastName.value = usersRef.lastName;
    inputEmail.value = usersRef.email;
    e.target.style.display = "none";
  }
};
ulList.addEventListener("click", changeUser);

// Function saveUser
const saveUser = (e) => {
  if (e.target.id === "btn-save") {
    usersRef = users.find((user) => {
      return user.id === e.target.parentNode.id;
    });
    for (let i = 0; users.length > i; i++) {
      if (e.target.parentNode.id === users[i].id) {
        users[i].firstName = inputFirstName.value;
        users[i].lastName = inputLastName.value;
        users[i].email = inputEmail.value;
        inputFirstName.value = "";
        inputLastName.value = "";
        inputEmail.value = "";
        e.target.parentElement.firstElementChild.innerHTML = `<li>${users[i].firstName} ${users[i].lastName}</li>
        `;
      }
    }
    e.target.style.display = "none";
  }
};
ulList.addEventListener("click", saveUser);

const deleteUser = (e) => {
  if (e.target.id === "btn-delete") {
    // usersRef = users.find((user) => {
    //   return user.id === e.target.parentNode.id;
    // });
    for (let i = 0; users.length > i; i++) {
      if (e.target.parentNode.id === users[i].id) {
        users.splice(i, 1);
      }
    }
    e.target.parentElement.remove();
  }
};
ulList.addEventListener("click", deleteUser);
const start = () => {
  if (
    validateText() === false ||
    validateEmail() === false ||
    validateCheckBox() === false
  ) {
    console.log("sorry");
  } else {
    validateText();
    validateEmail();
    validateCheckBox();

    printList();
  }
};
regForm.addEventListener("submit", (e) => {
  e.preventDefault();

  start();
});
