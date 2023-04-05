
let user = {};

const nameElement = document.getElementById("name"),
  imageElement = document.getElementById("img"),
  phone = document.getElementById("phone"),
  age = document.getElementById("age"),
  email = document.getElementById("email"),
  ageButtons = document.querySelector("[data-id='age']"),
  phoneButtons = document.querySelector("[data-id='phone']"),
  emailButtons = document.querySelector("[data-id='email']"),
  fetchButton = document.getElementById("getUser"),
  tabs = [
    {
        name: 'age',
        element: age
    },
    {
        name: 'email',
        element: email
    },{
        name: 'phone',
        element: phone
    }
  ],
  additionalButtons = {
    'age' : {
        element: age,
        path: 'age'
    },
    'phone' : {
        element: phone,
        data:'phone'
    },
    'email' : {
        element: email,
        data:'email'
    }
  };

const fetchUser = async () => {
    try {
        const response = await fetch("https://randomuser.me/api"),
            data = await response.json();
        user = data.results[0];

        nameElement.textContent = user.name.first + " " + user.name.last;
        imageElement.src = user.picture.large;

    }catch(error) {
        console.error("Error in Fetching User",error);
    }
}

const handleAdditionInfoButtonClick = (btnName) => {
    console.log("Names",additionalButtons[btnName]);
    let infoElement = document.getElementById('info'),
        data = user[additionalButtons[btnName].data];
    
    if(infoElement) {
        infoElement.textContent = data;
    }
    else {
        infoElement = document.createElement("span");
        infoElement.textContent = data;
        infoElement.id = 'info';
    }
     
    additionalButtons[btnName].element.style.display = 'flex';
    additionalButtons[btnName].element.appendChild(infoElement);
    handleAdditionButtonProps('none');
    fetchButton.textContent = 'Back';
    setActiveTab(btnName);

}

const handleAdditionButtonProps = (val) => {
    ageButtons.style.display = val;
    phoneButtons.style.display = val;
    emailButtons.style.display = val;
}

const handleGetUserBtnClick = () => {
    if(fetchButton.textContent === 'Back') {
        handleAdditionButtonProps('flex');
        fetchButton.textContent = 'Fetch User'
        setActiveTab('');
    }
    else {
        fetchUser();
    }
}
// user?.dob?.age -> user.dob =  undefined -> Throw error
const setActiveTab = (tabName) => {
    const hideTabs = tabs.filter(tab => tab.name !== tabName);
    hideTabs.map((tab)=> tab.element.style.display = 'none')
}

document.addEventListener('DOMContentLoaded',fetchUser);
ageButtons.addEventListener("click", () => handleAdditionInfoButtonClick('age'));
phoneButtons.addEventListener("click", () => handleAdditionInfoButtonClick('phone'));
emailButtons.addEventListener("click", () => handleAdditionInfoButtonClick('email'));
fetchButton.addEventListener('click',handleGetUserBtnClick);
</script>     

// 