const lstProduct = document.querySelectorAll(".product__item");
let indexImg = 1;
const incre = document.querySelector('.btn__incre');
const decre = document.querySelector('.btn__decre');
const quantily = document.querySelector('.count');
const cartdes = document.querySelector('.cart__des');
const cart = document.querySelector('.cart');
const btnAddCart = document.querySelector('.btn__add');
const box = document.querySelector('.cart__box');
const delCart = document.querySelector('.cart__del');
const checkOut = document.querySelector('.cart__checkout');
const lstGallery = document.querySelectorAll('.product__top img');
let count = parseInt(quantily.value);
let countProduct = 0;
const galleryImg = document.querySelector('.gallery__img');
const closeGallery = document.querySelector('.gallery__close');
const previewImg = document.querySelector('.img__active');
const lstProductGallery = document.querySelectorAll('.product__item--gallery');
const btnToggleMenu = document.querySelector('.btn__toggle');
const overlay = document.querySelector('.overlay__mobile');
const mobile = document.querySelector('.mobile');
const closeMobile = document.querySelector('.btn__close--mobile');
const nextBtnMobile = document.querySelector('.next--mobile');
const prevBtnMobile = document.querySelector('.prev--mobile');

/* === Gallery Image ===== */
lstGallery.forEach((item, index) => {
  item.addEventListener('click', (e) => {
    let newIndex = index;
    let selectedImg = lstGallery[newIndex].src;

    /*===== Show Gallery =====*/
    function preview() {
      previewImg.src = selectedImg;

      /*===== Product__item--gallery Remove Active =====*/
      lstProductGallery.forEach((item) => item.classList.remove('active'));

      /*===== Product__item--gallery Add Active =====*/
      lstProductGallery[newIndex].classList.add('active');
    }
    preview();
    /* === Prev and Next ===== */
    const prevBtn = document.querySelector('.box__prev');
    const nextBtn = document.querySelector('.box__next');

    prevBtn.addEventListener('click', () => {
      newIndex-- <= 0 ? newIndex = 0 : selectedImg = lstGallery[newIndex].src;
      preview();
    })

    nextBtn.addEventListener('click', () => {
      newIndex++ >= lstGallery.length - 1 ? newIndex = lstGallery.length - 1 : selectedImg = lstGallery[newIndex].src;
      preview();
    })

    /*===== Click Product__item--gallery =====*/
    lstProductGallery.forEach((item) => {
      item.addEventListener('click', () => {
        const indexImg = item.dataset.image;
        /*==== Set newIndex ====*/
        newIndex = indexImg - 1;
        selectedImg = lstGallery[newIndex].src;
        preview();
      })
    })

    galleryImg.classList.add('active');

    closeGallery.addEventListener('click', () => {
      galleryImg.classList.remove('active');
    })

  })
})

/* === Slide Image ===== */
lstProduct.forEach((item) => {
  item.addEventListener('click', (e) => {

    /* === Remove Active ===== */
    lstProduct.forEach((item) => item.classList.remove('active'));

    /* === Add Active ===== */
    item.classList.add('active');
        indexImg = item.dataset.image;
        slideImg();
    })
});

let indexMobile = 1;

nextBtnMobile.addEventListener('click', () => {
  ++indexMobile;
  if (indexMobile > lstGallery.length) {
    indexMobile = lstProductGallery.length
  }
  const displayWidth2 = document.querySelector('.product__top .list img:first-child').clientWidth;

  document.querySelector('.list').style.transform = `translateX(${- (indexMobile - 1) * displayWidth2}px)`;
})

prevBtnMobile.addEventListener('click', () => {
  --indexMobile;
  if (indexMobile <= 1) {
    indexMobile = 1
  }
  const displayWidth2 = document.querySelector('.product__top .list img:first-child').clientWidth;

  document.querySelector('.list').style.transform = `translateX(${- (indexMobile - 1) * displayWidth2}px)`;

})

function slideImg() {
    const displayWidth = document.querySelector('.product__top img:first-child').clientWidth;

    document.querySelector('.list').style.transform = `translateX(${- (indexImg - 1) * displayWidth}px)`;
}

/* === Count Product ===== */
incre.addEventListener('click', (e) => {
    count += 1;
    quantily.value = count;
})

decre.addEventListener('click', (e) => {
    if (count === 0) {
        quantily.value = 0
    } else {
        count -= 1;
        quantily.value = count;  
    }
        
})


/* === Set Cart ===== */
btnAddCart.addEventListener('click', () => {
    countProduct += count;

  if (countProduct !== 0) {
      document.querySelector('.cart a svg path').style.fill = "#1d2026";
      cartdes.classList.add('show');
      
  }
    cartdes.querySelector('p').innerText = countProduct;

    // reset value UI
    quantily.value = 0; 

    // reset value js
    count = 0; 
    checkCart();
    
})

/* === Render Cart ===== */
function checkCart() {
    const price = countProduct * 125;
    const list = `
    <p class="box__name">Cart</p>
    <ul class="list__cart">
              <li class="cart__item">
                <div class="cart__img">
                  <img src="./images/image-product-1-thumbnail.jpg" alt="cart__item">
                </div>
                <div class="cart__info">
                  <p class="cart__item--name">Fall Limited Edition Sneakers</p>
                  <span class="cart__nums">
                    $125.000 x ${countProduct}
                  </span>
                  <span class="cart__price">
                    $${price}.00
                  </span>
                </div>
                <div class="cart__del" onclick=
                "deleteCart()">
                  <img src="./images/icon-delete.svg" alt="delete">
                </div>
              </li>
            </ul>
            <div class="cart__checkout" onclick=
                "deleteCart()">
              <a href="#">
                Checkout
              </a>
            </div>`
    const emptyList = `
    <p class="box__name">Cart</p>
    <div class="cart__empty">
              <span>Your cart is empty</span>
            </div>`;
    if (countProduct > 0) {
        box.innerHTML = list;
    } else {
        box.innerHTML = emptyList;
    }
}

/* === Open && Close Cart ===== */
cart.addEventListener('click', (e) => {
  box.classList.toggle('show');
  checkCart();
})

/* === Delete Cart ===== */
function deleteCart() {
  count = 0;
  countProduct = 0
  checkCart();
  cartdes.classList.remove('show');
  document.querySelector('.cart a svg path').style.fill = "#69707D";
}

/* === Toggle Mobile Menu ===== */
function toggleMenu() {
  overlay.classList.toggle('active');
  mobile.classList.toggle('active');
}
btnToggleMenu.addEventListener('click', () => {
  toggleMenu();
})

closeMobile.addEventListener('click', () => {
  toggleMenu();
})

overlay.addEventListener('click', () => {
  toggleMenu();
})



