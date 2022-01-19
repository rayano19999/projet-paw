function createCategoryItem(params, onClick, isSelected = false) {
  const { icon, text } = params;

  const button = $(`
        <button class="group group-hover:bg-amber-200 block bg-white transition-all ease-out w-20 p-2 rounded-full">
            <div
                class="w-full aspect-square bg-amber-100 rounded-full overflow-hidden group-hover:p-1 p-5"
            >
                <img class="group-hover:rotate-12 transition-all ease-in-out" src="${icon}" />
            </div>
            <p
                class="pb-4 text-amber-700 mt-5 text-center text-sm font-bold"
            >
                ${text}
            </p>
        </button>
    `);

  const item = $('<li class="block"></li>');
  item.append(button);

  if (isSelected) {
    button.addClass("selectedCategory");
  } else {
    button.removeClass("selectedCategory");
  }

  // Events
  button.click(() => onClick());

  const hoverIn = () => {};

  const hoverOut = () => {};

  button.hover(hoverIn, hoverOut);
  return item;
}

function createFoodItem(params, onClick) {
  const { image, price,name } = params;
  const item = $(`
  <button class="bg-white group hover:outline-2 hover:outline-amber-600 hover:outline-offset-1 hover:outline  rounded-md aspect  shadow-xl p-2 space-y-2">
    <div class="bg-yellow-100 p-2">
      <img src="${image}" class="w-full bg-cover">
    </div>

    <div class="flex items-center text-lg px-1">
      <p id="title" class="block " >${name}</p>
      <div class="w-full flex items-center flex-row-reverse">
          <p id="price"
            class="rounded-full px-4 bg-yellow-200 block font-bold"
          >
          <span id="hiddenTitle" class="hidden text-base text-amber-900">${name} ・ </span>
          <span class="text-yellow-600">
            ${price}DZD
          <span>
          </p>
      </div>
    </div>
    
  </button>
    `);

  item.click(() => onClick());
  const priceElm = item.find("#price");
  const titleElm = item.find("#title");
  const hiddenTitleElm = item.find("#hiddenTitle");

  item.hover(()=>{
    titleElm.animate({
      width:"0%",
    },350,()=>titleElm.hide());

    priceElm.animate({
      width:"99%",
    },350);

    hiddenTitleElm.delay(250).fadeIn(100);
  },()=>{
    titleElm.removeAttr('style');

    priceElm.removeAttr('style');

    hiddenTitleElm.hide();
  });

  return item;
}
