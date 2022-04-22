const listProducts = {
    "list": [
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
}

const listProductsHtml = document.getElementById("cards-container");
const loader = document.querySelector("#loader");

function showProducts() {
    let fragmento = ``;
    listProducts.list.forEach(element => {
        fragmento += `
            <div class="product-card">
                <div>
                    <img src="./images/${element.image}" alt="${element.type}">
                </div>
                <div>
                    <h3>$${element.price}</h3>
                    <span>| Stock: ${element.stock}</span>
                </div>
                <h4>${element.type}</h4>
                <button class="card-boton ${element.id}">+</button>
            </div>
        `;
    })
    listProductsHtml.innerHTML = fragmento;
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

window.addEventListener('DOMContentLoaded', (event) => {
    setTimeout(() => {
        loader.classList.toggle("display-none")
    }, 3000)
    showProducts();
    headerScroll();
    navScroll();
})