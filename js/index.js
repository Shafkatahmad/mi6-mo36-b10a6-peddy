const removeActiveClass = () => {
  const buttons = document.getElementsByClassName('category-btn');
  for(let btn of buttons) {
    btn.classList.remove('active');
  }
}
let allPets = [];
document.getElementById('sort').addEventListener('click', () => {
   const sortedPets = [...allPets].sort((a,b) => (b.price || 0) - (a.price || 0));
   displayAllPets(sortedPets);
})

const laodCatetories = async () => {
  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
  const data = await res.json()
  // console.log(data.categories)
  displayCategories(data.categories);
}

const displayCategories = (categories) => {
  const petCategories = document.getElementById('pet-categories');

  for(let category of categories) {
 
    
    const div = document.createElement("div");
    div.innerHTML = `
    <button id=${category.category} onclick="loadCategory('${category.category}')" class="category-btn btn bg-white rounded-xl border border-gray-300 p-6"><img class="max-w-[42px] max-h-[42px] object-cover" src=${category.category_icon}/> ${category.category}</button>
    `

    petCategories.appendChild(div);
  }
}

const loadCategory = async (category) => {

  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
  const data = await res.json();

  removeActiveClass();
  const activeBtn = document.getElementById(`${category}`);
  activeBtn.classList.add('active');

  document.getElementById('spinner').classList.remove('hidden');
  setTimeout( function() {
    allPets = data.data;
    displayAllPets(allPets);
  },2000)
  // displayAllPets(data.data);
}


// load all pets
const loadAllPets = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
  const data = await res.json();
  allPets = data.pets
  displayAllPets(allPets)
}

const displayAllPets = (pets) => {
  document.getElementById('spinner').classList.add('hidden');
  const petsContainer = document.getElementById('petsContainer');
  petsContainer.innerHTML = "";

  if(pets.length == 0) {
    petsContainer.classList.remove("grid");
    petsContainer.innerHTML = `
    <div class="bg-slate-100 min-h-[480px] flex flex-col justify-center items-center text-center">
    <img src="./images/error.webp"/>
    <h2 class="text-3xl font-bold">No Information Available</h2>
    <p class="text-sm text-gray-500">It is a long established fact that a reader will be distracted by the readable content of a page when looking at <br> its layout. The point of using Lorem Ipsum is that it has a.</p>
    </div>
    `
  }

  for(let pet of pets) {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card bg-base-100  shadow-sm p-5">
  <figure>
    <img
      class=" object-cover rounded-lg"
      src=${pet.image}
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title text-xl font-bold">${pet.pet_name}</h2>
    <p class="text-gray-500">${pet.breed?pet.breed : "Not available"}</p>
    <p class="text-gray-500">${pet.date_of_birth?pet.date_of_birth : "Not available"}</p>
    <p class="text-gray-500">${pet.gender?pet.gender : "Not available"}</p>
    <p class="text-gray-500">price: ${pet.price?pet.price : "Not available"} $</p>
    <hr class="text-gray-500">
    <div class="card-actions justify-between">
      <button id=${pet.petId} onclick="loadLikedPet(${pet.petId})" class="btn "><i class="fa-regular fa-thumbs-up"></i></button>
      <button class="btn text-[#0E7A81]">Adopt</button>
      <button onclick="petDetails(${pet.petId})" class="btn text-[#0E7A81]">Details</button>
    </div>
  </div>
</div>
    `
    petsContainer.appendChild(div);
  }
}

const loadLikedPet = async (id) => {

  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
  const data = await res.json();
  displayLikedPet(data.petData);
}

const displayLikedPet = (petData) => {
  const likedPets = document.getElementById('liked-pets');
  const div = document.createElement("div");
  div.classList.add("border");
  div.classList.add("border-blue-500");
  div.classList.add("h-fit");
  div.innerHTML = `
  <div class="border border-yellow-500"><img class="rounded-lg border border-red-500" src='${petData.image}'/></div>
  `

  likedPets.appendChild(div);
}

const petDetails = async (petId) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
  const data = await res.json();
  console.log(data)

  const modalContainer = document.getElementById('modal-container');
  modalContainer.innerHTML = `
  <dialog id="my_modal_4" class="modal">
  <div class="modal-box w-11/12 max-w-5xl mb-4">
    <img class="w-full rounded-xl mb-6" src=${data.petData.image}/>
    <h2 class="text-2xl font-bold">${data.petData.pet_name? data.petData.pet_name : "Not Available"}</h2>
    <div class="grid grid-cols-2 gap-1 mb-4">
    <p>${data.petData.breed? data.petData.breed : "Not Available"}</p>
    <p>${data.petData.date_of_birth? data.petData.date_of_birth : "Not Available"}</p>
    <p>${data.petData.gender? data.petData.gender : "Not Available"}</p>
    <p>${data.petData.price? data.petData.price : "Not Available"}</p>
    <p>${data.petData.vaccinated_status? data.petData.vaccinated_status : "Not Available"}</p>
    </div>
    <hr>
    <div class="mt-4 mb-4">
        <h3 class="mb-3">Details Information</h3>
        <p>${data.petData.pet_details? data.petData.pet_details : "Not Available"}</p>
    </div>
    <div class="w-full">
      <form method="dialog">
        <!-- if there is a button, it will close the modal -->
        <button class="btn w-full bg-green-200 rounded-xl">Calcel</button>
      </form>
    </div>
  </div>
</dialog>
  `
  my_modal_4.showModal();
}

loadAllPets();
laodCatetories();