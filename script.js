const recipes = {
  Burger: {
    image: "src/burger.jpg",
    ingredients: ["Bun", "Beef patty", "Cheese", "Lettuce", "Tomato", "Sauce"],
    steps: [
      "Grill patty – cook until juicy",
      "Add cheese – let it melt",
      "Place in bun – add veggies & sauce",
      "Serve – enjoy hot"
    ]
  },
  Pizza: {
    image: "src/pizza.jpg",
    ingredients: ["Dough", "Tomato sauce", "Cheese", "Toppings"],
    steps: [
      "Spread sauce – cover dough evenly",
      "Add toppings – cheese & extras",
      "Bake 220°C – 12–15 min",
      "Slice & serve – hot & cheesy"
    ]
  },
  Taco: {
    image: "src/taco.jpg",
    ingredients: ["Tortilla", "Meat/Beans", "Lettuce", "Cheese", "Salsa"],
    steps: [
      "Warm tortilla – soft & flexible",
      "Add filling – meat or beans",
      "Top with veggies – lettuce, salsa, cheese",
      "Fold & eat – tasty in every bite"
    ]
  },
  Salad: {
    image: "src/eggplant-salad.jpg",
    ingredients: ["Lettuce", "Tomato", "Cucumber", "Onion", "Dressing"],
    steps: [
      "Chop veggies – small bite-size pieces",
      "Mix – combine all together",
      "Add dressing – your choice",
      "Toss & serve – fresh & crunchy"
    ]
  },
  "Meat Ball": {
    image: "src/meat-ball.jpg",
    ingredients: ["Ground meat", "Breadcrumbs", "Egg", "Garlic", "Sauce"],
    steps: [
      "Mix – meat with egg & crumbs",
      "Roll balls – even sized",
      "Cook – simmer in sauce",
      "Serve – with pasta or rice"
    ]
  },
  "French Toast": {
    image: "src/french-toast.jpg",
    ingredients: ["Bread", "Eggs", "Milk", "Sugar", "Cinnamon", "Syrup"],
    steps: [
      "Whisk mix – eggs, milk, sugar",
      "Dip bread – coat well",
      "Fry – golden brown",
      "Add syrup – sweet & tasty"
    ]
  },
  "Roasted Turkey": {
    image: "src/roasted_turkey.jpg",
    ingredients: ["Turkey", "Butter", "Garlic", "Herbs", "Salt", "Pepper"],
    steps: [
      "Season – butter & herbs all over",
      "Roast 180°C – slow & juicy",
      "Baste – keep moist",
      "Carve & serve – perfect feast"
    ]
  },
  Salmon: {
    image: "src/salmon-curry.jpg",
    ingredients: ["Salmon", "Lemon", "Olive oil", "Garlic", "Herbs"],
    steps: [
      "Season – with lemon & herbs",
      "Cook – pan fry or oven bake",
      "Garnish – fresh herbs",
      "Serve – light & healthy"
    ]
  }
};




function openRecipe(recipekey){
     const recipe=recipes[recipekey]
     const Title=document.getElementById("recipeTitle");
     const content=document.getElementById('recipeContent');
     const image=document.getElementById('recipeImage');
     const ingredient_title =document.getElementById('ingredient-title')
     const stepscontent=document.getElementById("steps-content");
     if(recipe){
          Title.textContent=recipekey;
          ingredient_title.textContent=recipekey +" "+"Ingredients:";

          let ingredientList='<ul>';
          recipe.ingredients.forEach(item=>{
            ingredientList+=`<li>${item}</li>`;
          });

          ingredientList+="</ul>";

          let stepsList="<ol>";
          recipe.steps.forEach(step=>{
            stepsList+=`<li>${step}</li>`
          });
          stepsList +="</ol>";


          content.innerHTML=ingredientList;
          stepscontent.innerHTML=stepsList;

          image.src=recipe.image;
          image.style.display="block";
     }
     else {
        title.textContent = "Recipe not found!";
        content.textContent = "";
        image.style.display = "none";   
    }

     const overlay=document.getElementById('overlay');
     overlay.style.display='flex'

     document.body.classList.add("noscroll");
}
function closeRecipe(){
     const overlay=document.getElementById("overlay");
     overlay.style.display='none';

     document.body.classList.remove("noscroll");
}
function filterRecipes(){
  const query=document.getElementById("searchBar").value.toLowerCase();
  const recipeCards=document.querySelectorAll(".recipe");

  recipeCards.forEach(recipe=>{
    const title =recipe.querySelector("h2").textContent.toLowerCase();
    recipe.style.display=title.includes(query)?"block":"none";
  });
}
function toggleMenu(){
     const nav =document.getElementById('navlinks');
     nav.classList.toggle('show');
}
let slideIndex = 0;   
let slideTimer;

function showSlidesAuto() {
  let i;
  let slides = document.getElementsByClassName("mySlides");

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }

  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }    

  slides[slideIndex-1].style.display = "block";  
  

  slideTimer = setTimeout(showSlidesAuto, 3000); // Auto-change every 3 sec
}

function plusSlides(n) {
  clearTimeout(slideTimer);
  slideIndex += n - 1;
  showSlidesAuto();
}

function currentSlide(n) {
  clearTimeout(slideTimer);
  slideIndex = n - 1;
  showSlidesAuto();
}

// slideshow 
document.addEventListener("DOMContentLoaded", showSlidesAuto);

const STORAGE_KEY="favourites";

function getFavourite(){
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveFavourites(arr){
  localStorage.setItem(STORAGE_KEY,JSON.stringify(arr));
}
//

function isFavourite(title){
  return getFavourite().some(r=>r.title===title);
}

function addFavourite(title,image){
  const favs=getFavourite();
  if (!favs.some(r=>r.title===title)){
    favs.push({title,image});
    saveFavourites(favs);
    return true;
  }
  return false;
}

function removeFavourite(title){
  const favs=getFavourite();
  const updated=favs.filter(r=>r.title!==title);
  saveFavourites(updated);
}




function renderFavourites() {
  const container = document.getElementById("favouritesContainer");
  if (!container) return;

  container.innerHTML = ""; 
  const favs = getFavourite(); 

  if (favs.length === 0) {
    container.innerHTML = "<p>No favourites yet! ❤️ Add some from Home.</p>";
    return;
  }

  favs.forEach(fav => {
    const card = document.createElement("div");
    card.className = "recipe";

    card.innerHTML = `
  <h2 id="recipetitle" >${fav.title}</h2>
  <img src="${fav.image}" alt="${fav.title}" class="size">
  <div class="button-row">
    <button type="button" class="button" onclick="openRecipe('${fav.title}')">
      Recipe & Steps
    </button>
    <button type="button" class="button remove-btn" onclick="removeFavouriteAndRender('${fav.title}')">
      <i class="fa-solid fa-trash"></i> Remove
    </button>
  </div>
`;


    container.appendChild(card);
  });
}


// Helper: remove and refresh list
function removeFavouriteAndRender(title) {
  removeFavourite(title);
  renderFavourites();
}

// Load favourites when page is ready
document.addEventListener("DOMContentLoaded", renderFavourites);


function toggleFavourite(button,title,image){
  let favs=getFavourite();
  const index=favs.findIndex(item=>item.title===title);
  const icon=button.querySelector("i");
  const text=button.querySelector(".btn-text");

  if(index===-1){
    favs.push({title,image});
    saveFavourites(favs);
    icon.classList.remove("fa-regular");
    icon.classList.add("fa-solid");
    icon.style.color="red";
    text.textContent="Add to Favourites";
  }
  else{
    favs.splice(index,1);
    saveFavourites(favs);
    icon.classList.remove("fa-solid");
    icon.classList.add("fa-regular");
    icon.style.color="";
    text.textContent="Add to Favourites";

  }

  
}