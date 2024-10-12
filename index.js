let allPets = []
let categoryPet=[]


// Categories
const loadCategoriesData = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/${id}`)
    const data = await res.json()
    console.log(data.data);
    displayAllPets(data.data);

}
// All Categories

const loadCategories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories')
    const data = await res.json()
    console.log(data.categories);

    

    displayCategories(data.categories)
};
loadCategories();

const spinner =()=>{
    document.getElementById("spinner").style.display = "block";
}

const displayCategories = (categories) => {

    const categoryContainer = document.getElementById('categoryContainer');
    categories.forEach((item) => {
        const div = document.createElement("div");
        categoryContainer.classList.add('activeButtonStyling')
        categoryContainer.classList.remove('activeButtonStyling')
        const { category, category_icon } = item
        div.innerHTML =
            `
        <div id="${category}" class="border border-black flex cursor-pointer w-full items-center justify-center px-10 py-3 gap-4 font-bold  text-lg inactiveButtonBorder" 
        onclick="loadCategoryPets('${category}')">
            <div class="lg:w-[40%] "><img class="w-full" src="${category_icon}"></div>
            <h3>${category}s</h3>
        </div>
        `
        categoryContainer.appendChild(div)
    })
};

// ------------Button Toggle------------------

function removeAllButtonColor(){
    document.getElementById('Dog').classList.remove('activeButtonStyling' ,'inactiveButtonBorder')
    document.getElementById('Cat').classList.remove('activeButtonStyling' ,'inactiveButtonBorder')
    document.getElementById('Rabbit').classList.remove('activeButtonStyling' ,'inactiveButtonBorder')
    document.getElementById('Bird').classList.remove('activeButtonStyling' ,'inactiveButtonBorder')
  }
  
  function addAllBorder() {
    document.getElementById('Dog').classList.add('inactiveButtonBorder')
    document.getElementById('Cat').classList.add('inactiveButtonBorder')
    document.getElementById('Rabbit').classList.add('inactiveButtonBorder')
    document.getElementById('Bird').classList.add('inactiveButtonBorder')
  }

  const loadAllPets = async () => {    
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
    const data = await res.json()
    allPets = data.pets
    
    document.getElementById("spinner").style.display = "block";
    setTimeout(() => {
        displayAllPets(data.pets);
        document.getElementById("spinner").style.display = "none";

    }, 2000);
}
loadAllPets()

async function loadCategoryPets(category) {
    removeAllButtonColor();
    addAllBorder();
    document.getElementById(category).classList.add('activeButtonStyling');
    document.getElementById(category).classList.remove('inactiveButtonBorder');
    // console.log(category);
    document.getElementById("card-container").innerHTML = ''; 
    let res = await fetch(
        `https://openapi.programming-hero.com/api/peddy/category/${category}`
    );
    const data = await res.json();

    document.getElementById("spinner").style.display = "block";
        setTimeout(() => {
            displayAllPets(data.data);
            document.getElementById("spinner").style.display = "none";
    
        }, 2000);
};






// Display All Pet Details

const displayAllPets = (pets, isSortClicked) => {

    const cardContainer = document.getElementById('card-container');    

    if (pets.length === 0) {
        cardContainer.classList.remove('grid');
        cardContainer.classList.add('bg-[#1313130c]', 'w-full', 'rounded-2xl')
        cardContainer.innerHTML = `
        <div class="flex flex-col justify-center items-center py-20">
        <div class="lg:w-[13%] w-[45%]"><img class="w-full" src="./images/error.webp" alt=""></div>
        <h1 class="font-extrabold text-2xl text-center">No Information Available</h1>
        <p class="text-xs text-center mt-2 font-medium leading-[1.5]">Unfortunately, there are currently no birds available for adoption.
        <br> Please check back later as we frequently update our listings.</p>
        </div>        
        `;
        return;
    }
    else{
        cardContainer.innerHTML ="";
        cardContainer.classList.add('grid');
        cardContainer.classList.remove('bg-[#1313130c]', 'w-full', 'rounded-2xl')
    }

    if (isSortClicked) {
        pets.sort(function (a, b) { return b.price - a.price });
    }
    
    pets.forEach((pet) => {
        const { image, pet_name, breed, date_of_birth, gender, price, petId } = pet;
        const div = document.createElement('div');
        div.innerHTML = `
        <div class=" bg-base-100  shadow-xl rounded-xl">
                            <figure class="px-4 pt-5">
                                <img src=${image}
                                    alt="Shoes" class="rounded-xl" />
                            </figure>
                            <div class="px-4 py-2
                             items-start ">
                                <h2 class="card-title font-bold text-lg pb-2">${pet_name != null ? pet_name : "Not Available"}</h2>
                                <p class="text-sm font-medium text-lowText pb-1"><i class="fa-solid fa-box-open"></i>
                                    Breed : ${
                                        breed != null ? breed : "Not Available"
                                      }
                                </p>
                                <p class="text-sm font-medium text-lowText pb-1"><i
                                        class="fa-solid fa-cake-candles"></i>
                                    Birth : ${
                                        date_of_birth != null
                                          ? date_of_birth.split("-")[0]
                                          : "Not Available"
                                      }</p>
                                <p class="text-sm font-medium text-lowText pb-1"><i class="fa-solid fa-venus"></i>
                                    Gender : ${
                                        gender != null ? gender : "Not Available"
                                      }</p>
                                <p class="text-sm font-medium text-lowText pb-3"><i
                                        class="fa-solid fa-dollar-sign"></i> 
                                    Price: ${
                                        price != null ? `${price}$` : "Not Available"
                                      }
                                </p>
                                <hr>
                                <div class=" px-4 pt-4 flex gap-3 items-center justify-center pb-4">
                                    <button
                                    onclick="handleLikeButton('${image}')"
                                     class="hover:bg-[#0E7A81] hover:text-white  border border-[#0E7A81]/15 md:px-3 md:py-1.5 px-2.5 py-1 rounded-lg"><i
                                            class="fa-regular fa-thumbs-up"></i></button>
                                    <button
                                        onclick="handleAdoptButton()"
                                        class="hover:bg-[#0E7A81] hover:text-white text-xs text-[#0E7A81] font-bold border border-[#0E7A81]/15 md:px-4 md:py-1.5 px-2.5 py-1 rounded-lg">Adopt</button>
                                    <button
                                        onclick="showPetDetail('${petId}')"
                                        class="hover:bg-[#0E7A81] hover:text-white text-xs text-[#0E7A81] font-bold border border-[#0E7A81]/15 md:px-4 md:py-1.5 px-2.5 py-1 rounded-lg"">Details</button>
                                </div>
                            </div>
                        </div>
        `
        cardContainer.appendChild(div)
    });

}


// Like Button

const handleLikeButton = (image) => {
    const newImageDiv = document.createElement('div')
    newImageDiv.innerHTML =
        `
  <img class="rounded-lg" src="${image}">
  `
    document.getElementById('petImageContainer').appendChild(newImageDiv)

}


// Adopt Button

const handleAdoptButton = () => {
    // const adoptButton = document.getElementById('adoptButton');
    const openModal = document.getElementById('my_modal_1')
    openModal.showModal();
    setTimeout(() => {
        openModal.close()
    }, 3000);

    //loading the counter
    let countInnerText = document.getElementById("counter-text");
    let count = 3;
    const countNumber = () => {
        count = 3;
        countInnerText.innerHTML = count;

        let interval = setInterval(() => {
            count--; // Decrement the count

            if (count >= 0) {
                countInnerText.innerHTML = count; // Update the displayed count
            }

            if (count <= 0) {
                clearInterval(interval); // Stop the interval when it reaches 0
            }
        }, 1000)
    }
    countNumber()
}




// Show Modal For Details Button

const showPetDetail = async (petId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
    const data = await res.json();

    const { image, pet_name, breed, date_of_birth, gender, price, vaccinated_status, pet_details } = data.petData;

    // Modal Update---
    document.getElementById('modalImage').src = image;
    document.getElementById('modalName').innerText = pet_name;
    document.getElementById('modalBreed').innerText = breed;
    document.getElementById('modalDate').innerText = date_of_birth;
    document.getElementById('modalGender').innerText = gender;
    document.getElementById('modalPrice').innerText = price;
    document.getElementById('modalVaccine').innerText = vaccinated_status;
    document.getElementById('modalDetail').innerText = pet_details;

    my_modal.showModal()
}

//----------Handle Sort--------------

document.getElementById('sortButton').addEventListener('click', (e)=>{
    document.getElementById('spinner').style.display = 'block'
    document.getElementById('card-container').classList.add('hidden')
    setTimeout(()=>{
        categoryPet.length == 0 ? displayAllPets(allPets ,true) : displayAllPets(categoryPet ,true)
        document.getElementById('spinner').style.display = 'none'
        document.getElementById('card-container').classList.remove('hidden')
  
      } ,2000)
  })
