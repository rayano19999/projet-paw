const randomElm = $("#randomicons");
const catElm = $("#category");
const formuleElm = $("#customiseOrder");

const itemsElm = $("#items");
const carouselElm = $("#carousel");

let selecetedItem;
let chosenFood;

let shoppingList = [];

function renderCategories() {
  catElm.empty();

  categories.forEach((cat) => {
    const isSelected = cat.text == selecetedItem;
    const onSelect = () => {
      selecetedItem = cat.text;
      selectedItemChanged();
    };

    const item = createCategoryItem(cat, onSelect, isSelected);
    catElm.append(item);
  });
}

chargerLesCommentaires();

renderCategories();
function selectedItemChanged() {
  renderCategories();
  carouselElm.hide();
  renderFoodItems();
}

function renderFoodItems() {
  itemsElm.hide();
  if (!selecetedItem) return;
  itemsElm.removeClass("hidden");
  itemsElm.slideDown();

  console.log(selecetedItem);
  const { items } = categories.find((c) => c.text == selecetedItem);

  itemsElm.empty();

  items.forEach((item) => {
    const elm = createFoodItem(item, () => {
      chosenFood = item;
      renderFormule();
    });
    itemsElm.append(elm);
  });
}

let registred = false;

function renderFormule() {
  if (!chosenFood) return;
  formuleElm.hide();
  formuleElm.removeClass("hidden");
  formuleElm.slideDown();


  const shoppingCard = formuleElm.find("#shopping");
  const shoppingPrice = formuleElm.find("#price");
  const shoppingTitle = formuleElm.find("#title");
  const shoppingImage = formuleElm.find("#img");
  const shoppingCommentaires = formuleElm.find("#commentaires");
  const newCommentaire = formuleElm.find("input");
  const submit = formuleElm.find("#submit");
  const addMore = formuleElm.find("#addMore");
  const command = formuleElm.find("#command");

  if (shoppingList.length) {
    shoppingCard.find("span").html(shoppingList.length);
    shoppingCard.fadeIn();
  } else {
    shoppingCard.hide();
  }

  shoppingTitle.html(chosenFood.name);
  shoppingPrice.html(chosenFood.price+"DZD");
  shoppingImage.attr("src", chosenFood.image);

  if(registred)return;
  registred = true;
  command.click(() => {
    closeChosenFood();
    setTimeout(()=>{
      alert("commande effectué");
    },3000);
  });

  addMore.click(() => {
    shoppingList.push(chosenFood);
    closeFormule();
  });

  submit.click(() => {
    const value = newCommentaire.val();
    if (value.trim().length > 10) {
    }
  });
}

function closeChosenFood() {
  closeFormule();
  shoppingList = [];
}

function closeFormule() {
  chosenFood = undefined;
  formuleElm.slideUp();
}

function chargerLesCommentaires() {
  setTimeout(function () {
    // on lance une requête AJAX
    $.ajax({
      url: "charger.php",
      type: GET,
      success: function (html) {
        $("#messages").prepend(html); // on veut ajouter les nouveaux messages au début du bloc #messages
      },
    });

    chargerLesCommentaires(); // on relance la fonction
  }, 5000); // on exécute le chargement toutes les 5 secondes
}

 $(document).ready(function(){
  $(".imgchange").delay(1500).fadeOut(2500, function(){
    $(this).attr("src", "images/hamburger.png").fadeIn(2500, function(){
      $(this).delay(1500).fadeOut(2500, function(){
        $(this).attr("src", "images/pizza.png").fadeIn(2500);
      });
    });
  });
  });

 $(document).ready(function(){
$("#img").hover(function(){
  $(this).fadeOut(300).fadeIn(300);
});
 });


 
