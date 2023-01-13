//! Mostrar el menu
const navMenu = document.querySelector("#nav-menu"),
    navToggle = document.querySelector("#nav-toggle"),
    navClose = document.querySelector("#nav-close");

if(navToggle) {
    navToggle.addEventListener("click", () => { 
        navMenu.classList.add("show-menu"); }); 
}

if(navClose) {
    navClose.addEventListener("click", () => {
        navMenu.classList.remove("show-menu");
    });
}

//! Ocultar el menu
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
    const navMenu = document.querySelector("#nav-menu");
    navMenu.classList.remove("show-menu");
}

navLink.forEach(item => item.addEventListener("click", linkAction));

//! Cambio de fondo del header
const scrollHeader = () => {
    const header = document.querySelector("#header");
    this.scrollY >= 50 ? header.classList.add("scroll-header") : header.classList.remove("scroll-header");
};

window.addEventListener("scroll", scrollHeader);

//! Swipper
let swiper = new Swiper(".testimonial-swiper", {
    spaceBetween: 30,
    loop: "true",
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

//! new swipper
let newSwipper = new Swiper(".new-swiper", {
    spaceBetween: 24,
    loop: "true",
    breakpoints: {
        576: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
    }
});

//! Links activos
const section = document.querySelectorAll("section[id]");
const scrollActive = () => {
    const scrollY = window.pageYOffset;

    section.forEach(item => {
        const activeHeigth = item.offsetHeight,
            activeTop = item.offsetTop - 58,
            activeId = item.getAttribute("id"),
            activeClass = document.querySelector(`.nav__menu a[href*=${activeId}]`);

            if(scrollY > activeTop && scrollY <= activeTop + activeHeigth) {
                activeClass.classList.add("active-link");
            } else {
                activeClass.classList.remove("active-link");
            }
    });
};

window.addEventListener("scroll", scrollActive);


//! Scroleo con la flecha hacia arriba
const scrollUp = () => {
    const roll = document.querySelector("#scroll-up");
    this.scrollY >= 350 ? roll.classList.add("show-scroll") : roll.classList.remove("show-scroll");
};

window.addEventListener("scroll", scrollUp);

//! show cart
const cart = document.querySelector("#cart"),
    cartShop = document.querySelector("#cart-shop"),
    cartClose = document.querySelector("#cart-close");

cartShop ? cartShop.addEventListener("click", () => cart.classList.add("show-cart")) : 0;
cartClose ? cartClose.addEventListener("click", () => cart.classList.remove("show-cart")) : 0;

//! cambio de tema
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'bx-sun';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');


const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun';


if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme);
}

//! Cambio de Tema manual (Oscuro/claro)
themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);

    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});

//------------------------------------------------------------------------------------------------------------------------------------

//! Logica del carrito de compras

let carrito = [];
let totalCard = 0;
let counterTotal = 0;

const divCarrito = document.querySelector("#featured");
const cartItems = document.querySelector(".cart__container");
let totalPago = document.querySelector(".cart__prices-total");
let totalItem = document.querySelector(".cart__prices-item");
let counter = document.querySelector(".nav__shop-counter");

const divNew = document.querySelector("#new");
const divProducts = document.querySelector("#products");

function crearStorage() {
    localStorage.setItem("carritoStorage", JSON.stringify(carrito));
    localStorage.setItem("contador", counterTotal);
    localStorage.setItem("pago", totalCard);
}

//! Se crea el localStorage
localStorage.getItem("contador") ? 0 : crearStorage();

const mensaje = () => {
    let smsHTML = `
    <div class="cart__mensaje">
        <h2>Empty Cart! 😓</h2>
        <img src="src/img/comprarC.png" alt="">
    </div>
    `;

    return smsHTML;
}

const mensaje2 = () => {
    let smsHTML = `
    <div class="cart__mensaje">
        <img class="cart__mensaje-compra" src="src/img/comp.png" alt="">
        <h2>For Your Purchase! ❤️🛒 </h2>
    </div>
    `;

    return smsHTML;
}

function visible(opcion) {
    let aux = document.querySelector(".cart__container");
    return opcion ? aux.style.overflowY = "scroll" : aux.style.overflowY = "hidden";
}

const vacio = (mensaje) => {
    if(localStorage.getItem("contador") == 0) {
        cartItems.innerHTML = mensaje();
        totalCard = 0;
    }

    localStorage.getItem("contador") >= 3 ? visible(true) : visible(false);

    counterTotal = localStorage.getItem("contador");
    totalCard = localStorage.getItem("pago");
    crearStorage();

    totalItem.innerHTML = `${counterTotal} products`;
    totalPago.innerHTML = `$ ${totalCard}`;
    counter.innerHTML = counterTotal;
};

loadEvents();
cargarHTML();

function loadEvents() {
    divCarrito.addEventListener("click", agregarProducto);
    divNew.addEventListener("click", agregarProducto);
    divProducts.addEventListener("click", agregarProducto);

    cartItems.addEventListener("click", borrarProducto);
}

function vaciarCarrito() {
    carrito = [];
    totalCard = 0;
    counterTotal = 0;
    counter.innerHTML = 0;
    totalPago.innerHTML = 0;
    crearStorage();
    vacio(mensaje2);
    visible(false);
};

function borrarProducto(e) {
    let cant = 0;
    let elemento = e.target;
    //console.log("entra a borrar con: ", counterTotal);

    if(elemento.classList.contains("cart__amount-trash")) {
        const deleteProduct = e.target.getAttribute("id");
        carrito = JSON.parse(localStorage.getItem("carritoStorage"));
        carrito.forEach(item => {
            if(item.id == deleteProduct) {
                //console.log("eliminado: ", item);
                let precioParse = item.precio.slice(1);

                let precioReducido = parseFloat(precioParse) * parseFloat(item.cantidad);
                totalCard = totalCard - precioReducido;
                totalCard = parseFloat(totalCard);
                totalCard = totalCard.toFixed(2);
                cant = item.cantidad;
                crearStorage();
            }
        });
        carrito = carrito.filter(product => product.id !== deleteProduct);
        
        crearStorage();
    }
    counterTotal = counterTotal - cant;
    //console.log("sale con", counterTotal);
    crearStorage();

    localStorage.getItem("contador") >= 3 ? visible(true) : visible(false);
    cargarHTML();
    totalItem.innerHTML = `${counterTotal} products`;
};


function agregarProducto(e) {
    let elemento = e.target;

    if(elemento.classList.contains("featured__button")) {
        let productoSelecionado = e.target.parentElement;
        leerContenido(productoSelecionado);
    } else if(elemento.classList.contains("new__button")) {
        let productoSelecionado = e.target.parentElement;
        leerContenidoNew(productoSelecionado);
    } else if(elemento.classList.contains("products__button")) {
        let productoSelecionado = e.target.parentElement;
        leerContenidoProduct(productoSelecionado);
    }

    localStorage.getItem("contador") >= 3 ? visible(true) : visible(false);
};


function leerContenidoProduct(producto) {
    const dataProducto = {
        titulo: producto.querySelector(".products__title").textContent,
        imagen: producto.querySelector(".products__img").src,
        precio: producto.querySelector(".products__price").textContent,
        id: producto.querySelector(".products__button").getAttribute("id"),
        cantidad: 1
    };

    let precioDespejado= dataProducto.precio.slice(1);
    totalCard = parseFloat(totalCard) + parseFloat(precioDespejado);
    totalCard = totalCard.toFixed(2);

    carrito = JSON.parse(localStorage.getItem("carritoStorage"));
    const existencia = carrito.some(product => product.id === dataProducto.id);
    if(existencia) {
        const p = carrito.map(producto => {
            if(producto.id === dataProducto.id) {
                producto.cantidad++;
                return producto;
            } else {
                return producto;
            }
        });
        carrito = [...p];
        crearStorage();
    } else {
        carrito = [...carrito, dataProducto];
        counterTotal++;
        localStorage.setItem("contador", counterTotal);
        crearStorage();
    }

    localStorage.getItem("contador") >= 3 ? visible(true) : visible(false);
    cargarHTML();
    crearStorage();
};


function leerContenidoNew(producto) {
    const dataProducto = {
        titulo: producto.querySelector(".new__title").textContent,
        imagen: producto.querySelector(".new__img").src,
        precio: producto.querySelector(".new__price").textContent,
        id: producto.querySelector("button").getAttribute("id"),
        cantidad: 1
    };

    let precioDespejado= dataProducto.precio.slice(1);
    totalCard = parseFloat(totalCard) + parseFloat(precioDespejado);
    totalCard = totalCard.toFixed(2);

    carrito = JSON.parse(localStorage.getItem("carritoStorage"));
    const existencia = carrito.some(product => product.id === dataProducto.id);
    if(existencia) {
        const p = carrito.map(producto => {
            if(producto.id === dataProducto.id) {
                producto.cantidad++;
                return producto;
            } else {
                return producto;
            }
        });
        carrito = [...p];
        crearStorage();
    } else {
        carrito = [...carrito, dataProducto];
        counterTotal++;
        localStorage.setItem("contador", counterTotal);
        crearStorage();
    }

    localStorage.getItem("contador") >= 3 ? visible(true) : visible(false);
    cargarHTML();
    crearStorage();
};


function leerContenido(producto) {
    const dataProducto = {
        titulo: producto.querySelector(".featured__title").textContent,
        imagen: producto.querySelector(".featured__img").src,
        precio: producto.querySelector(".featured__price").textContent,
        id: producto.querySelector("button").getAttribute("id"),
        cantidad: 1
    };

    let precioDespejado= dataProducto.precio.slice(1);
    totalCard = parseFloat(totalCard) + parseFloat(precioDespejado);
    totalCard = totalCard.toFixed(2);


    carrito = JSON.parse(localStorage.getItem("carritoStorage"));
    const existencia = carrito.some(product => product.id === dataProducto.id);
    if(existencia) {
        const p = carrito.map(producto => {
            if(producto.id === dataProducto.id) {
                producto.cantidad++;
                return producto;
            } else {
                return producto;
            }
        });
        carrito = [...p];
        localStorage.setItem("contador", counterTotal);
    } else {
        carrito = [...carrito, dataProducto];
        counterTotal++;
        localStorage.setItem("contador", counterTotal);
    }

    localStorage.setItem("contador", counterTotal);
    localStorage.getItem("contador") >= 3 ? visible(true) : visible(false);
    crearStorage();
    cargarHTML();
};


function cargarHTML() {
    limpiarHTML();

    carrito = JSON.parse(localStorage.getItem("carritoStorage"));
    carrito.forEach(product => {
        const {titulo, imagen, precio, cantidad, id} = product;
        const row = document.createElement("article");
        row.classList.add("cart__card");
        row.innerHTML = `
            <div class="cart__box">
                <img src="${imagen}" alt="" class="cart__img">
            </div>

            <div class="cart__details">
                <h3 class="cart__title">${titulo}</h3>
                <span class="cart__price">${precio}</span>

                <div class="cart__amount">
                    <div class="cart__amout-content">
                        <span class="cart__amount-box" onclick="reduce(${precio.slice(1)}, ${id})">
                            <i class='bx bx-minus' ></i>
                        </span>

                        <span class="cart__amoutn-number">${cantidad}</span>

                        <button class="cart__amount-box plus" onclick="plus(${precio.slice(1)}, ${id})">
                            <i class='bx bx-plus' ></i>
                        </button>
                    </div>

                    <i class='bx bx-trash-alt cart__amount-trash' id="${id}"></i>
                </div>
            </div>
        `;

        cartItems.appendChild(row);
        totalPago.innerHTML = `$ ${parseFloat(totalCard)}`;
        counterTotal = localStorage.getItem("contador");
        counter.innerHTML = counterTotal;
        totalItem.innerHTML = `${counterTotal} productos`;
    });

    localStorage.getItem("contador") >= 3 ? visible(true) : visible(false);
    vacio(mensaje);
    crearStorage();
};

function limpiarHTML() {
    cartItems.innerHTML = "";
    visible(false);
};

function plus(precio, id) {
    totalCard = parseFloat(precio) + parseFloat(totalCard);
    totalCard = parseFloat(totalCard);
    totalCard = totalCard.toFixed(2);
    counterTotal++;

    const p = carrito.map(producto => {
        if(Number(producto.id) === Number(id)) {
            producto.cantidad++;
            return producto;
        } else {
            return producto;
        }
    });

    carrito = [...p];
    crearStorage();
    localStorage.getItem("contador") >= 3 ? visible(true) : visible(false);
}

function reduce(precio, id) {
    let precioReducido = parseFloat(precio) * 1;
    //console.log(precioReducido);
    totalCard = parseFloat(totalCard) - precioReducido;
    //console.log("\nentra a reduce con: ", counterTotal);
    counterTotal--;

    let aux = -1;
    let cant = 0;

    const p = carrito.map(producto => {
        if(Number(producto.id) === Number(id)) {
            producto.cantidad--;
            cant = producto.cantidad;

            if(producto.cantidad > 0) {
                return producto;
            } else {
                aux = Number(producto.id);
                return producto;
            }
        } else {
            return producto;
        }
    });

    //console.log("Sale con: ", counterTotal);
    
    carrito = [...p];
    carrito = carrito.filter(product => product.id != aux);
    aux = -1;
    crearStorage();
    localStorage.getItem("contador") >= 3 ? visible(true) : visible(false);
}