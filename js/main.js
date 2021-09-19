 /* Iniializing the available sizes of pizza */
const pizzaSizes = ['small', 'Medium', 'Large'];

function Categorey(name, image) {
   this.name = name;
   this.image = image;
   this.prices = {
     3: 800,
     2: 1200,
     1: 1500 
   }
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


function Cart(){
  const cart = this;
  this.cartItems = [];
  this.delivery = null;
  this.addToCart = function(item){
      cart.cartItems.push(item);
      $("#cartItems").html(cart.cartItems.length);
  }
}
let cart = new Cart();

 function Checkout() {
    const checkout = this;
    this.checkoutItems = [];
    this.delivery = null;
     this.checkout = function(item){
         checkout.checkoutItems.push(item);
         $("#checkoutItems").html(cartItems.length);
     }
 }

 function Region(region, price){
    this.regionName = region;
    this.price = price;
}

 const pizzaItems = [
   new Categorey('Hawaian', 'img1.jpg'),
   new Categorey('Pepperoni', 'img1.jpg'),
   new Categorey('Mushroom', 'img1.jpg'),
   new Categorey('BBQ-Chicken', 'img1.jpg'),
   new Categorey('Sausages', 'img1.jpg'),
   new Categorey('Extra Bacon', 'img1.jpg')
 ]

 const crustItems = [
   new Crusts('Crispy', 150),
   new Crusts('Stuffed', 200),
   new Crusts('Gluten-free', 300),
 ]

 const toppingItems = [
   new Toppings('extraCheese', 200),
   new Toppings('bacon', 250),
   new Toppings('pepperoni', 220),
   new Toppings('mushrooms', 150),
   new Toppings('sausages', 120),
 ]

 const selectedRegion = [
   new Region("Ongata-Rongai", 300),
   new Region("Karen", 500),
   new Region("Utawala", 300),
   new Region("Lang'ata", 200),
   new Region("Westlands", 300)
 ]

 const checkout = new Checkout();
 let selectedPizza;
 let cartItemElement;

 function modifiedUI() {
    $('#cartItems').html(checkout.checkoutItems.length);
    if(selectedPizza){
        let pizzaPrice = 0;
        pizzaPrice += selectedPizza.price;
        console.log(selectedPizza.topping)
        if(selectedPizza.crust) pizzaPrice += selectedPizza.crust.crustPrice;
        if(selectedPizza.topping) pizzaPrice += selectedPizza.topping.reduce((a, b) => a+b.toppingPrice, 0);
          // console.log(pizzaPrice)         
        $('#pizzaPrices').html(pizzaPrice); 
    }

    let subTotalPrice = 0;

    $('.subTotal').html(subTotalPrice);
    $('#totalPrice').html(subTotalPrice + (checkout.delivery ? checkout.delivery.price : 0));

}
    
    // $('#shoppingCart ul.list-group').html('');
    // for(let i=0; i<cart.cartItems.length; i++){
    //     const item = cart.cartItems[i];
    //     const crustPrice = item.crust ? item.crust.price : 0;
    //     let toppingPrice = 0;
    //     if(item.topping.length > 0){
    //         toppingPrice = item.topping.reduce((a, b)=>a+b.price, 0);
    //     }
    //     // const toppingPrice = item.topping ? item.topping.price : 0;
    //     subTotalPrice += item.price + crustPrice + toppingPrice;

    //     $('#shoppingCart ul.list-group').append(cartItemHtml);        
    //     $('#shoppingCart ul.list-group li:last img').attr('src', './assets/images/'+item.image);
    //     $('#shoppingCart ul.list-group li:last span.name').html(item.name);
    //     $('#shoppingCart ul.list-group li:last span.price').html(item.price);
    //     if(item.crust) 
    //         $('#shoppingCart ul.list-group li:last div.details')
    //         .append("Crust:"+item.crust.name)

    //     if(item.topping) $('#shoppingCart ul.list-group li:last div.details')
    //         .append(" Topping:"+item.topping.map(topping => topping.name).join(','));
        
    // }

    
    // $('.checkOut').each(function(){
    //     if(checkout.checkoutItems.length > 0)
    //         $(this).removeAttr('disabled');
    //     else $(this).attr('disabled', true);
    // });

 
//    $('#cartItems').html(cart.cartItems.length);
//      if(selectedPizza){
//        $('#pizzaPrices').html(pizzaPrices);
//          let pizzaPrices = 0;
//           if(selectedPizza.price){
//               pizzaPrices += selectedPizza.price;
//              $('#addToCart').removeAttr('disabled');
//          }
//          else{
//             $('#addToCart').attr('disabled', true);
//         }
//         if(selectedPizza.crust) pizzaPrices += selectedPizza.crust.price;
//         if(selectedPizza.topping) pizzaPrices += selectedPizza.topping.reduce((a, b) => a+b.price, 0);

//         $('#pizzaPrices').html(pizzaPrices);
      //}

     

$(document).ready(function() {

  $('button.orderBtn').click(function() {

    let pizzaItem = $(this).data('item');
    selectedPizza = pizzaItems[pizzaItem];

    $('#offcanvasRight img').attr('src', '../assets/'+selectedPizza.image);
    
  });


  /* Selected pizza sizes */

    $('select#pizzaSize').change(function() {

    const selectedPizzaSize = $(this).val();
    console.log(selectedPizzaSize);
    if(selectedPizza) {
      selectedPizza.price = selectedPizza.prices[selectedPizzaSize]; 
    }

    modifiedUI();
  });

  /* end of selected Pizza sizes*/


  /* Selected Toppings*/

  $('#toppings .form-check-input').change(function() {

    const isChecked = this.checked;
    const selectedToppingType = $(this).val();
    
    let topping = toppingItems.find(top => top.toppingName === selectedToppingType)
   
    const positionOfSelectedTopping = selectedPizza.topping.findIndex(function(toppingItem) {
        return toppingItem.toppingName == topping.toppingName;
    });

    if(positionOfSelectedTopping == -1 && isChecked) selectedPizza.topping.push(topping);
    else if(positionOfSelectedTopping > -1 && !isChecked) {
        selectedPizza.topping.splice(positionOfSelectedTopping, 1);
    }

    modifiedUI();
  });
 

   /* Selected crust*/
   $('#crustType button').click(function() {

    const selectedCrustType = $(this).val();
    // console.log(selectedCrustType);

    selectedPizza.crust = crustItems.find(cr => cr.crustName === selectedCrustType);
    // console.log(selectedPizza.crust, 'crust')

    modifiedUI();
  });

  /* Retrieve delivery regions */
  
  $('select#delivery').change(function(){
      cart.delivery = regions.find(r => r.regionName == $(this).val());
      alert('Please select the location you would want it delivered to!');
      // console.log(cart.delivery);
      modifiedUI();
  });
  /* End of populate delivery zones */


   /* Add to cart event*/

     $('#addToCart').click(function() {
     cart.addToCart(selectedPizza);
     
    alert(`Your ${selectedPizza.name} pizza order has been added to cart`);

    modifiedUI();
  });

      $('#shoppingCartBtn').click(function() {
        $('#shoppingCart').toggle();
      });

      $('.checkOut').click(function() {
        alert('We have received your order');
        cart = new Cart();
        updateUI();
 });
});