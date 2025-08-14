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
    <button id=${category.id} onclick="loadCategory('${category.category}')" class="btn bg-white rounded-xl border border-gray-300 p-6"><img class="max-w-[42px] max-h-[42px] object-cover" src=${category.category_icon}/> ${category.category}</button>
    `

    petCategories.appendChild(div);
  }
}

const loadCategory = async (category) => {

  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
  const data = await res.json();
  console.log(data);
}


// load all pets
const loadAllPets = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
  const data = await res.json();
  displayAllPets(data.pets)
}

const displayAllPets = (pets) => {
  const petsContainer = document.getElementById('petsContainer');

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
    <p class="text-gray-500">${pet.price?pet.price : "Not available"}</p>
    <hr class="text-gray-500">
    <div class="card-actions justify-between">
      <button class="btn "><i class="fa-regular fa-thumbs-up"></i></button>
      <button class="btn text-[#0E7A81]">Adopt</button>
      <button class="btn text-[#0E7A81]">Details</button>
    </div>
  </div>
</div>
    `
    petsContainer.appendChild(div);
  }
}

loadAllPets();
laodCatetories();