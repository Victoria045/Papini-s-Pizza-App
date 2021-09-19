
/* *
    Name Haawain Pizza
    Size: Large or medium or small
    Crust: crispy, stuffed, Glutten free
    Topings: bacon checken cheese
*/

const pizzaSizes = ['small', 'Medium', 'Large'];

function Categorey(name, image) {
   this.name = name;
   this.image = image;
   this.prices = {
     'small': 800,
     'medium': 1200,
    'large': 1500 
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

 function Cart() {
    const cart = this;
    this.cartItems = [];
    this.delivery = null;
     this.addToCart = function(item){
         cart.cartItems.push(item);
         $("#cartItems").html(cartItems.length);
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
   new Categorey('Sausages', 'img1.jpg')
 ]

 const crustItems = [
   new Crusts('Crispy', 150),
   new Crusts('Stuffed', 200),
   new Crusts('Gluten-free', 300),
 ]

 const toppingItems = [
   new Toppings('Exra cheese', 200),
   new Toppings('Bacon', 250),
   new Toppings('Pepperoni', 220),
   new Toppings('Mushrooms', 150),
   new Toppings('Sausage', 120),
 ]

 const selectedRegion = [
   new Region("Ongata-Rongai", 300),
   new Region("Karen", 500),
   new Region("Utawala", 300),
   new Region("Lang'ata", 200),
   new Region("Westlands", 300)
 ]

 const cart = new Cart();
 let selectedPizza;
 let cartItemElement;

function populateDropdowns(sizeElement, items, valueFiled, textField, extraField){
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let extras = extraField ? '('+item[extraField]+')' : '';
        let value = valueFiled ? item[valueFiled] : item;
        let text = textField ? item[textField] : item;
        sizeElement.append(`<option value="` + value + `">` + text + extras+`</option>`);
    }
}

function updateUI(){
    $('#cartItems').html(cart.cartItems.length);
    if(selectedPizza){
        let pizzaPrice = 0;
        if(selectedPizza.price){
            pizzaPrice += selectedPizza.price;
            $('#addToCart').removeAttr('disabled');
        }
        else{
            $('#addToCart').attr('disabled', true);
        }
        if(selectedPizza.crust) pizzaPrice += selectedPizza.crust.price;
        if(selectedPizza.topping) pizzaPrice += selectedPizza.topping.reduce((a, b) => a+b.price, 0);
                
        $('#pizzaPrice').html(pizzaPrice);

    }

    let subTotalPrice = 0;
    
    $('#shoppingCart ul.list-group').html('');
    for(let i=0; i<cart.cartItems.length; i++){
        const item = cart.cartItems[i];
        const crustPrice = item.crust ? item.crust.price : 0;
        let toppingPrice = 0;
        if(item.topping.length > 0){
            toppingPrice = item.topping.reduce((a, b)=>a+b.price, 0);
        }
        // const toppingPrice = item.topping ? item.topping.price : 0;
        subTotalPrice += item.price + crustPrice + toppingPrice;

        $('#shoppingCart ul.list-group').append(cartItemHtml);        
        $('#shoppingCart ul.list-group li:last img').attr('src', './assets/'+item.image);
        $('#shoppingCart ul.list-group li:last span.name').html(item.name);
        $('#shoppingCart ul.list-group li:last span.price').html(item.price);
        if(item.crust) 
            $('#shoppingCart ul.list-group li:last div.details')
            .append("Crust:"+item.crust.name)

        if(item.topping) $('#shoppingCart ul.list-group li:last div.details')
            .append(" Topping:"+item.topping.map(topping=>topping.name).join(','));
        
    }

    $('.checkoutBtn').each(function(){
        if(cart.cartItems.length > 0)
            $(this).removeAttr('disabled');
        else $(this).attr('disabled', true);
    });

    $('.subTotal').html(subTotalPrice);
    $('#totalPrice').html(subTotalPrice + (cart.delivery ? cart.delivery.price : 0));

}

$(document).ready(function () {

    cartItemHtml = $('#shoppingCart .cartItem').prop('outerHTML');
    $('#shoppingCart .cartItem').remove();

    
    // pizzaListDiv.html(pizzaItems);
    $('button.orderBtn').click(function() {

      let pizzaItem = $(this).data('item');
      let selectedPizza = pizzaItems[pizzaItem];
  
      $('#offcanvasRight img').attr('src', '../assets/'+selectedPizza.image);
      console.log(selectedPizza);

      $('select#size').val('');
      $('select#toppings').val('');
      $('select#crust').val('');
      $('#pizzaPrice').html('');
      
    });
    /* end of Populating pizza list */

    /* Populate sizes */
    $(('select#size'), pizzaSizes);
    $('select#size').change(function(){
        const size =$(this).val();
        if(selectedPizza){
            selectedPizza.price = selectedPizza.prices[size];
        }
        console.log(size);
        updateUI()
    });
    /* end of Populate sizes */

    /* Populate Toppings */
    // populateDropdowns($('select#toppings'), topingsList, 'name', 'name', 'price');
    for(let i=0; i<topingsList.length; i++){
        let topping = topingsList[i];
        $('#toppings').append(`<div class="form-check">
        <input class="form-check-input" type="checkbox" value="`+topping.name+`" id="flexCheckDefault`+i+`">
        <label class="form-check-label" for="flexCheckDefault`+i+`">
          `+topping.name+`
        </label>
      </div>`);
        
    }

    $('#toppings .form-check-input').on('change', function(){
        const isCheck = this.checked;
        
        const selectedToppingValue = $(this).val();
        let topping = topingsList.find(function(topping){
            if(topping.name == selectedToppingValue) return true;
            else return false;
        });
        const indexOfSelectedTopping = selectedPizza.topping.findIndex(function(toppingItem){ 
            return toppingItem.name == topping.name;
         });

        if(indexOfSelectedTopping == -1 && isCheck) selectedPizza.topping.push(topping);
        else if(indexOfSelectedTopping > -1 && !isCheck){
            selectedPizza.topping.splice(indexOfSelectedTopping, 1);
        }
        updateUI()
    });
    /* end of Populate sizes */

    /* Populate crust */
    populateDropdowns($('select#crust'), crustList, 'name', 'name', 'price');
    $('select#crust').on('change', function(){
        const selectedCrustValue = $(this).val();
        let crust = crustList.find(function(crust){
            if(crust.name == selectedCrustValue) return true;
            else return false;
        });
        selectedPizza.crust = crust;
        updateUI();
    });
    /* end of Populate sizes */

    /* Populate delivery zones */
    populateDropdowns($('select#deliveryZones'), zones, 'zoneName', 'zoneName', 'price');
    $('select#deliveryZones').on("change", function(){
        cart.delivery = zones.find(z=>z.zoneName == $(this).val());
        // console.log(cart.delivery);
        updateUI();
    });
    /* End of populate delivery zones */

    /* add to cart action */
    const addToCartBtn = $('#addToCartBtn');
    addToCartBtn.click(function(){        
        cart.addToCart(selectedPizza);
        alert(selectedPizza.name +' has been added to cart');
        updateUI();
    });

    $('#shoppingCartBtn').on('click', function(){
        $('#shoppingCart').toggle();
    });

    $('.checkoutBtn').click(function(){
        alert('We have received your order');
        cart = new Cart();
        updateUI();
    });

});