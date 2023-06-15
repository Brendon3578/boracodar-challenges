/**
 * @typedef {{
 *  id: number,
 *  name: string,
 *  price: number,
 *  image_url: string
 * }} productType
 */

const productsListEl = document.getElementById("products-list");

/**
 * @type {productType[]}
 */
let products = [];

let total = 0;

/**
 * @param {productType} product
 */
function createProductItemEl(product) {
  const formattedPrice = product.price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return `
    <li class="cart__item">
      <img
        class="cart__item__image"
        src="${product.image_url}"
        alt="Imagem de um ${product.name}"
      />
      <div class="cart__item__body">
        <p class="cart__item__text">
          ${product.name}
        </p>
        <div class="cart__item__footer">
          <span class="cart__item__price">${formattedPrice}</span>
          <div class="cart__item__stepper">
            <button
              class="cart__item__button cart__item__button--subtract"
              onclick="updateQuantity('${product.id}', 'subtract')"
            >
              <i class="ph ph-minus ph-bold"></i>
            </button>
            <span class="cart__item__quantity" id="product-quantity-${product.id}">
              1
            </span>
            <button
              class="cart__item__button cart__item__button--add"
              onclick="updateQuantity('${product.id}', 'add')"
            >
              <i class="ph ph-plus ph-bold"></i>
            </button>
          </div>
        </div>
      </div>
    </li>`;
}

/**
 *
 * @param {productType} product
 * @param {"add" | "subtract"} action
 */
function updateQuantity(productId, action) {
  const productQuantityId = `product-quantity-${productId}`;

  let product = products.find((product) => product.id == parseInt(productId));

  const productQuantityEl = document.getElementById(productQuantityId);

  let quantityNumber = parseInt(productQuantityEl.innerHTML);

  if (action == "add") {
    if (quantityNumber < 20) {
      quantityNumber += 1;
      total += product.price;
    }
  } else if (action == "subtract") {
    if (quantityNumber > 0) {
      quantityNumber -= 1;
      total -= product.price;
    }
  }

  productQuantityEl.innerText = quantityNumber;
  setProductsTotalPriceText(total);
}

/**
 * @returns {Promise<productType[]>}
 */
async function getProducts() {
  const response = await fetch("./products.json").then((res) => res.json());

  return response;
}

getProducts().then((productsArray) => {
  productsArray.forEach((product) => {
    productsListEl.innerHTML += createProductItemEl(product);
    total += parseFloat(product.price);
    products.push(product);
  });

  setProductsTotalPriceText(total);
});

const productsTotalPriceEl = document.getElementById("total-price");
const confirmPurchaseBtnEl = document.getElementById("confirm-purchase-btn");

function setProductsTotalPriceText(total) {
  totalValue = 0;

  if (total < 0) {
    // não tire o comentário da linha de baixo
    //console.log(total);
    confirmPurchaseBtnEl.setAttribute("disabled", true);
  } else {
    confirmPurchaseBtnEl.removeAttribute("disabled");
    totalValue = total;
  }

  productsTotalPriceEl.innerText = totalValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

const confirmPurchaseTextEl = document.getElementById("confirm-text");
const loadingPurchaseIconEl = document.getElementById("loading-icon");

confirmPurchaseBtnEl.addEventListener("click", () => {
  confirmPurchaseBtnEl.setAttribute("disabled", true);
  confirmPurchaseTextEl.classList.toggle("hidden");
  loadingPurchaseIconEl.classList.toggle("hidden");

  setTimeout(() => {
    let userResponse = confirm(
      "Compra finalizada, obrigado por comprar, volte sempre!"
    );

    if (userResponse != undefined) {
      confirmPurchaseBtnEl.removeAttribute("disabled");
      confirmPurchaseTextEl.classList.toggle("hidden");
      loadingPurchaseIconEl.classList.toggle("hidden");
    }
  }, 1000);
});
