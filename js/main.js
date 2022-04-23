// Product list in JSON format as if it is a database-----------------------------
const listProducts = [
        {
            "id": 1,
            "type": "Hoodies",
            "price": "14.00",
            "stock": 10,
            "image": "featured1.png"
        },
        {
            "id": 2,
            "type": "Shirts",
            "price": "24.00",
            "stock": 15,
            "image": "featured2.png"
        },
        {
            "id": 3,
            "type": "Sweatshirts",
            "price": "24.00",
            "stock": 20,
            "image": "featured3.png"
        }
]


// Variables instance------------------------------------------------------------
const listProductsHtml = document.getElementById("cards-container");
const loader = document.querySelector("#loader");
const bag = document.querySelector(".nav-icons .nav-icon-bag");
const cart = document.querySelector(".cart");
const closeCartButton = document.querySelector("#cart-close");
const cardsContainer = document.querySelector("#cards-container");
const productFilter = document.querySelector("#section-products .product-list");
const emptyCartImage = document.querySelector("#empty-cart-image");
const listCartHtml = document.querySelector("#full-cart");
const checkOutButton = document.querySelector("#checkout-button");

let productList = [];
let cartList = [];
let totalProducts = 0;
let totalAmount = 0.00;

// Web flow ------------------------------------------------------------------
window.addEventListener('DOMContentLoaded', (event) => {
    setAllLocalStorageData();
    
    setTimeout(() => {
        loader.classList.toggle("display-none")
    }, 3000)

    showProducts();
    headerScroll();
    navScroll();
    cartClicked();
    cartClosed();
    product_Filter();
    addProductBtn();
    isCartEmpty();
    showCart();
    deleteProductCart();
    addProductCart();
    substractProductCart();
    checkOut();
})

//Functions-------------------------------------------------------------------
function setAllLocalStorageData () {
    if (!localStorage.getItem("products")){
        localStorage.setItem("products", JSON.stringify(listProducts));
    }
    if (!localStorage.getItem("cartList")){
        localStorage.setItem("cartList", JSON.stringify(cartList));
    }
    if (!localStorage.getItem("totalProducts")){
        localStorage.setItem("totalProducts", JSON.stringify(totalProducts));
    }
    if (!localStorage.getItem("totalAmount")){
        localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
    }
    productList = JSON.parse(localStorage.getItem("products"));
    cartList = JSON.parse(localStorage.getItem("cartList"));
    totalProducts = JSON.parse(localStorage.getItem("totalProducts"));
    totalAmount = JSON.parse(localStorage.getItem("totalAmount"));
}

function cartClicked() {
    bag.addEventListener('click', () => {
        cart.classList.add('show-cart');
    })
}

function cartClosed() {
    closeCartButton.addEventListener('click', () => {
        cart.classList.remove('show-cart');
    })
}

function showProducts(productType = "All") {
    let fragmento = ``;
    productList.forEach(element => {
        if (productType === "All" || element.type === productType) {
            fragmento += `<div class="product-card">
                            `;
        } else {
            fragmento += `<div class="product-card display-none">
                            `;
        }
        fragmento += `<div>
                        <img src="./images/${element.image}" alt="${element.type}">
                    </div>
                    <div>
                        <h3>$${element.price}</h3>
                        <span>| Stock: ${element.stock}</span>
                    </div>
                    <h4>${element.type}</h4>
                    <button class="card-boton" btn-id="${element.id}">+</button>
                </div>
                `;
    })
    listProductsHtml.innerHTML = fragmento;
}

function showCart() {
    let fragmento = ``;
    let index = -1;
    cartList.forEach(element => {
        for (let i = 0; i <= (productList.length - 1); i++) {
            if(element.id === productList[i].id) {
                index = i;
                break;
            }
        }
        fragmento += 
            `<div id="cart-container">
                <img src="./images/${productList[index].image}" alt="${productList[index].type}">
                <div id="cart-container-text">
                    <h3>${productList[index].type}</h3>
                    <h4>Stock: ${productList[index].stock} | <span>$${productList[index].price}</span></h4>
                    <span>Subtotal: $${element.subtotal.toFixed(2)}</span>
                    <div id="cart-container-buttons">
                        <button btn-id="${element.id}" btn-type="1">-</button>
                        <h4>${element.quantity} units</h4>
                        <button btn-id="${element.id}" btn-type="2">+</button>
                        <img btn-id="${element.id}" btn-type="3" src="./images/bin.png" alt="Bin">
                    </div>
                </div>
            </div>`;
    })
    listCartHtml.innerHTML = fragmento;
}

function headerScroll() {
    const header = document.querySelector('#header');

    window.addEventListener('scroll', function() {
        if (window.scrollY >= 50) {
            header.classList.add('header-scroll');
        } 
        else {
            header.classList.remove('header-scroll');
        }
    })
}

function navScroll() {
    const a1 = document.getElementById('nav-a1');
    const a2 = document.getElementById('nav-a2');
  
    window.addEventListener('scroll', function() {
        if (window.scrollY >= 600) {
            a1.classList.remove('nav-a-select');
            a2.classList.add('nav-a-select');
        } 
        else {
            a1.classList.add('nav-a-select');
            a2.classList.remove('nav-a-select');
        }
    })
}

function product_Filter() {
    productFilter.addEventListener('click', event => {
        let element = event.target;
        
        if(element.matches("li") || element.matches("h3") || element.matches("span")) {
            showProducts(element.getAttribute("product-type"));
        }
    })
}

function addProductBtn() {
    cardsContainer.addEventListener('click', event => {
        let element = event.target;

        if(element.matches("button")) {
            productList.forEach(product => {
                if(product.id === parseInt(element.getAttribute("btn-id"))){
                    addProduct(product);
                }
            })
        }
    })
}

function deleteProductCart() {
    listCartHtml.addEventListener('click', event => {
        let element = event.target;
        if(element.matches("button") || element.matches("img")) {
            if(element.getAttribute("btn-type") === "3"){
                cartList.forEach((product, index) => {
                    if(element.getAttribute("btn-id") == product.id) {
                        cartList.splice(index, 1);
                        localStorage.removeItem("cartList");
                        localStorage.setItem("cartList", JSON.stringify(cartList));
                        showCart();
                        isCartEmpty();
                    }
                })
            }
        }
    })
}

function addProductCart() {
    listCartHtml.addEventListener('click', event => {
        let element = event.target;

        if(element.matches("button")) {
            if(element.getAttribute("btn-type") === "2"){
                productList.forEach(product => {
                    if(product.id === parseInt(element.getAttribute("btn-id"))){
                        addProduct(product);
                    }
                })
            }
        }
    })
}

function substractProductCart(){
    listCartHtml.addEventListener('click', event => {
        let element = event.target;

        if(element.matches("button")) {
            if(element.getAttribute("btn-type") === "1"){
                productList.forEach(product => {
                    if(product.id === parseInt(element.getAttribute("btn-id"))){
                        substractProduct(product);
                    }
                })
            }
        }
    })
}

function addProduct (product) {
    let index = -1;
    if (product.stock > 0){
        for (let i = 0; i <= (cartList.length - 1); i++) {
            if(product.id === cartList[i].id){
                index = i;
                break;
            }
        }
        if (index === -1){
            cartList.push({
                id: product.id,
                quantity: 1,
                subtotal: parseInt(product.price)
            });
        } else {
            if (product.stock > cartList[index].quantity){
                cartList[index].quantity += 1;
                cartList[index].subtotal += parseInt(product.price);
            } else {
                alert("Out of stock");
            }
        }
        localStorage.setItem("cartList", JSON.stringify(cartList));
    } else {
        alert("Out of stock");
    }
    isCartEmpty();
    showCart();
}

function substractProduct (product) {
    let index = -1;
    for (let i = 0; i <= (cartList.length - 1); i++) {
        if(product.id === cartList[i].id){
            index = i;
            break;
        }
    }
    if (index >= 0){
        if (cartList[index].quantity === 1){
            cartList.splice(index, 1);
        } else {
            cartList[index].quantity -= 1;
            cartList[index].subtotal -= parseInt(product.price);
        }
    }
    localStorage.setItem("cartList", JSON.stringify(cartList));
    isCartEmpty();
    showCart();
}

function checkOut () {
    checkOutButton.addEventListener("click", () => {
        cartList.forEach(element => {
            for (let i = 0; i <= (productList.length - 1); i++) {
                if(element.id === productList[i].id){
                    productList[i].stock -= element.quantity;
                }
            }
        })
        cartList = [];
        localStorage.setItem("cartList", JSON.stringify(cartList));
        localStorage.setItem("products", JSON.stringify(productList));
        showCart();
        showProducts();
        isCartEmpty();
    })
}

function isCartEmpty() {
    if(cartList.length === 0){
        emptyCartImage.classList.remove("display-none");
        checkOutButton.classList.add("display-none");
    } else {
        emptyCartImage.classList.add("display-none");
        checkOutButton.classList.remove("display-none");
    }
}