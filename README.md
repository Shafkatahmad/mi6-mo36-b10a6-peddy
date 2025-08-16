# Peddy - Pet Adoption Platform

This is a pet adoption platform where users can browse and adopt pets. Haven't added the features to login for the users and for the pet owner. Will update if added.

## Key Features:

1. **Dynamic Pet Listings** – Pets are fetched from an API and displayed with details (name, breed, price, etc.).

1. **Like & Adopt System** – Users can “like” pets (adds them to a favorites grid) or “adopt” pets with a modal and countdown.

1. **Sort by Price** - Pets can be sorted by their price in descending order by the "Sort" button.

1. **Category Filtering** – Pets can be filtered by categories (like dogs, cats, etc.) for better navigation.

1. **Details Modal** – Clicking a pet shows full details (like vaccination status, breed, etc.) in a pop-up modal.

1. **Responsive Grid Layout** – Liked pets and pet listings adapt across screen sizes using Tailwind’s grid system.

## ES6 Features Used

1. `const` & `let`

   - I used const for values that don’t change (like countdownEl) and let for re-assignable values (like in loops or counters).

1. Arrow Functions () => {}

   - Functions like pets.forEach(pet => {...}) or async functions const loadCategories = async () => {}.

1. Template Literals `${variable} text`

   - You used backticks with ${} inside HTML strings to inject values dynamically.

1. Default + Destructured Parameters

   - In functions like displayPets(pets = []) where you provide a fallback empty array.

1. Optional Chaining ?.

   - Example: video.others.posted_date?.length to safely check nested properties.

## Live Link of This Project:

https://peddy-the-petshopp.netlify.app/
