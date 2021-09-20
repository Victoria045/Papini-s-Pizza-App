/* Iniializing the available sizes of pizza */
const pizzaSizes = ["small", "Medium", "Large"];

function Categorey(name, image) {
  this.name = name;
  this.image = image;
  this.prices = {
    3: 800,
    2: 1200,
    1: 1500,
  };
}

Categorey.prototype.price = 0;
Categorey.prototype.crust = null;
Categorey.prototype.topping = [];

function Crusts(name, price) {
  this.crustName = name;
  this.crustPrice = price;
}

function Toppings(name, price) {
  this.toppingName = name;
  this.toppingPrice = price;
}

function Cart() {
  const cart = this;
  this.cartItems = [];
  this.delivery = null;
  this.addToCart = function (item) {
    cart.cartItems.push(item);
    $("#cartItems").html(cart.cartItems.length);
  };
}
let cart = new Cart();

function Checkout() {
  const checkout = this;
  this.checkoutItems = [];
  this.delivery = null;
  this.checkout = function (item) {
    checkout.checkoutItems.push(item);
    $("#checkoutItems").html(cartItems.length);
  };
}

function Region(region, price) {
  this.regionName = region;
  this.price = price;
}

const pizzaItems = [
  new Categorey("Hawaian", "img1.jpg"),
  new Categorey("Pepperoni", "img1.jpg"),
  new Categorey("Mushroom", "img1.jpg"),
  new Categorey("BBQ-Chicken", "img1.jpg"),
  new Categorey("Sausages", "img1.jpg"),
  new Categorey("Extra Bacon", "img1.jpg"),
];

const crustItems = [
  new Crusts("Crispy", 150),
  new Crusts("Stuffed", 200),
  new Crusts("Gluten-free", 300),
];

const toppingItems = [
  new Toppings("extraCheese", 200),
  new Toppings("bacon", 250),
  new Toppings("pepperoni", 220),
  new Toppings("mushrooms", 150),
  new Toppings("sausages", 120),
];

const selectedRegion = [
  new Region("Ongata-Rongai", 300),
  new Region("Karen", 500),
  new Region("Utawala", 300),
  new Region("Lang'ata", 200),
  new Region("Westlands", 300),
];

const checkout = new Checkout();
let selectedPizza;
let cartItemElement;

function modifiedUI() {
  $("#cartItems").html(checkout.checkoutItems.length);
  if (selectedPizza) {
    let pizzaPrice = 0;
    pizzaPrice += selectedPizza.price;
    console.log(selectedPizza.topping);
    if (selectedPizza.crust) pizzaPrice += selectedPizza.crust.crustPrice;
    if (selectedPizza.topping)
      pizzaPrice += selectedPizza.topping.reduce(
        (a, b) => a + b.toppingPrice,
        0
      );
    $("#pizzaPrices").html(pizzaPrice);
  }
}

$(document).ready(function () {
  $("button.orderBtn").click(function () {
    let pizzaItem = $(this).data("item");
    selectedPizza = pizzaItems[pizzaItem];

  });

  /* Selected pizza sizes */

  $("select#pizzaSize").change(function () {
    const selectedPizzaSize = $(this).val();
    console.log(selectedPizzaSize);
    if (selectedPizza) {
      selectedPizza.price = selectedPizza.prices[selectedPizzaSize];
    }

    modifiedUI();
  });

  /* end of selected Pizza sizes*/

  /* Selected Toppings*/

  $("#toppings .form-check-input").change(function () {
    const isChecked = this.checked;
    const selectedToppingType = $(this).val();

    let topping = toppingItems.find(
      (top) => top.toppingName === selectedToppingType
    );

    const positionOfSelectedTopping = selectedPizza.topping.findIndex(function (
      toppingItem
    ) {
      return toppingItem.toppingName == topping.toppingName;
    });

    if (positionOfSelectedTopping == -1 && isChecked)
      selectedPizza.topping.push(topping);
    else if (positionOfSelectedTopping > -1 && !isChecked) {
      selectedPizza.topping.splice(positionOfSelectedTopping, 1);
    }

    modifiedUI();
  });

  /* Selected crust*/
  $("#crustType button").click(function () {
    const selectedCrustType = $(this).val();
    selectedPizza.crust = crustItems.find(
      (cr) => cr.crustName === selectedCrustType
    );

    modifiedUI();
  });

  /* Deliverey options  */

  $("select#delivered").change(function () {
    if ($(this).val() == 1 && !cart.delivery) {
      alert("Please select the location you would want your pizza delivered!");
    } else {
      cart.toDeliver = true;
    }
    modifiedUI();
  });

  /* End of delivery options */

  $("select#region").change(function () {
    cart.delivery = selectedRegion[$(this).val() - 1];

    if (cart.delivery) {
      alert(`Deliverey cost to ${cart.delivery.regionName} is ${cart.delivery.price}!`);
    }
    modifiedUI();
  });

  /* Add to cart event*/

  $("#addToCart").click(function () {
    cart.addToCart(selectedPizza);

    alert(`Your ${selectedPizza.name} pizza order has been added to cart`);
    modifiedUI();
  });

  $('#shoppingList').click(function(){
    $('#orderItems').toggle();

    modifiedUI();
});

  $(".checkOut").click(function () {
    alert("We have received your order");

    $(".orderItems").hide();
    cart = new Cart();
    modifiedUI();
  });
});