
const retornaItem = async (ItemID) => {
    let itemObject;
    if (ItemID !== undefined) {
        const response = await fetch(`https://petstore-8ad6d224eb11.herokuapp.com/produtos/${ItemID}`);
        //exportsFetchItem.responseItem = `https://petstore-8ad6d224eb11.herokuapp.com/produtos/${ItemID}`;
        itemObject = await response.json();
    } else {
        Error('You must provide an url');
        itemObject = {};
    }
    return itemObject;
};

const retornaProdutos = async (query) => {
    let object;
    const url = `https://petstore-8ad6d224eb11.herokuapp.com/produtos/`;
    if (query !== undefined) {
        const response = await fetch(url);
        //exportsFetchProducts.responseProducts = url;
        object = await response.json();
    } else {
        Error('You must provide an url');
        object = {};
    }
    return object;
};


const adicionaItemsCarrinho = (arrayCartsItemsLi) => {
    const cartItems = document.querySelector('.cart__items');
    arrayCartsItemsLi.forEach((element) => {
        cartItems.innerHTML += element;
    });
};

let getLocalStorage;
let arrayCartsItemsLi;
let stringItemLi;
const retornaItemsCarrinhoCondicional = () => {
    for (let index = 0; index < getLocalStorage.length; index += 1) {
        if (getLocalStorage[index] === '✄') {
            arrayCartsItemsLi.push(stringItemLi);
            stringItemLi = '';
            index += 1;
        } else {
            stringItemLi += getLocalStorage[index];
        }
    }
};

const retornaItemsCarrinho = () => {
    if (localStorage.getItem('cartItems') !== null) {
        getLocalStorage = localStorage.getItem('cartItems');
        if (getLocalStorage === undefined) {
            getLocalStorage = '<li>$0</li>✄';
        }
        arrayCartsItemsLi = [];
        stringItemLi = '';
        retornaItemsCarrinhoCondicional();
        adicionaItemsCarrinho(arrayCartsItemsLi);
    }
};


const salvaItemsCarrinho = (paramTest) => {
    let cartsItemsLi = document.querySelectorAll('.cart__item');
    const arrayCartsItemsLi = [];
    if (paramTest) {
        cartsItemsLi = [paramTest];
    }
    cartsItemsLi.forEach((element) => {
        arrayCartsItemsLi.push(`${paramTest ? element : `${element.outerHTML}✄`}`);
    });
    localStorage.setItem('cartItems', arrayCartsItemsLi);
};


function criaImagemProduto(imageSource) {
    const img = document.createElement('img');
    img.className = 'item__image';
    img.src = imageSource;
    return img;
}


function criaElemento(sku, element, className, innerText) {
    const e = document.createElement(element);
    if (element === 'button') {
        e.className = className;
        e.classList.add(sku);
    } else {
        e.className = className;
    }
    e.innerText = innerText;
    return e;
}

function criaItemProduto({ id: sku, nome: name, url_imagem: image }) {
    const section = document.createElement('section');
    section.className = 'item';
    section.appendChild(criaElemento(sku, 'span', 'item__sku', sku));
    section.appendChild(criaElemento(sku, 'span', 'item__title', name));
    section.appendChild(criaImagemProduto(image));
    section.appendChild(criaElemento(sku, 'button', 'item__add', 'Adicionar ao carrinho!'));
    return section;
}


let valor = false;
let string = '';
let elementString;
let breakFor = false;
let index1 = 0;
const somaSubtotalCondicional = () => {
    if (elementString[index1] === '$' || valor === true) {
        if (elementString[index1] === '<') {
            breakFor = true;
        }
        valor = true;
        string += elementString[index1];
    }
};

const somaSubtotalLista = () => {
    for (index1 = 0; index1 < elementString.length; index1 += 1) {
        somaSubtotalCondicional();
        if (breakFor === true) {
            breakFor = false;
            break;
        }
    }
    index1 = 0;
};

const somaSubtotal = () => {
    const cartItemSumSubTotal = document.querySelectorAll('.cart__item');
    const totalPrice = document.querySelector('.total-price');
    let subTotal = 0;
    cartItemSumSubTotal.forEach((element) => {
        elementString = element.outerHTML;
        somaSubtotalLista();
        string = string.replace('$', '');
        string = string.replace('<', '');
        subTotal += parseFloat(string);
        string = '';
        valor = false;
    });
    subTotal = Math.round(subTotal * 100) / 100;
    totalPrice.innerText = `${subTotal}`;
};

function cartItemClickListener(event) {
    event.target.remove();
    localStorage.clear();
    salvaItemsCarrinho();
    somaSubtotal();
}

function criarItemCarrinho({ id: sku, nome: name, preco: salePrice }) {
    const li = document.createElement('li');
    li.className = 'cart__item';
    li.classList.add(sku);
    li.innerText = `ID: ${sku} | NOME: ${name} | PREÇO: R$${salePrice}`;
    li.addEventListener('click', cartItemClickListener);
    return li;
}

const removeProdutoCarrinho = () => {
    const cartsItemsLi = document.querySelectorAll('.cart__item');
    cartsItemsLi.forEach((element) => {
        element.addEventListener('click', cartItemClickListener);
    });
};

const funcItemsCarrinho = async () => {
    const cartItems = document.querySelector('.cart__items');
    const itemButton = document.querySelectorAll('.item__add');
    itemButton.forEach((element) => {
        element.addEventListener('click', async (event) => {
            const cartSubtotal = document.querySelector('.cart-subtotal');
            cartSubtotal.innerHTML += '<span class="loading">carregando...</span>';
            const itemObject = await retornaItem(event.target.classList[1]);
            const loading = document.querySelector('.loading');
            cartSubtotal.removeChild(loading);
            cartItems.appendChild(criarItemCarrinho(itemObject));
            localStorage.clear();
            salvaItemsCarrinho();
            somaSubtotal();
        });
    });
    retornaItemsCarrinho();
    somaSubtotal();
    removeProdutoCarrinho();
};

const limpaCarrinho = () => {
    const emptyCart = document.querySelector('.empty-cart');
    const cartItems = document.querySelector('.cart__items');
    emptyCart.addEventListener('click', () => {
        cartItems.innerText = '';
        localStorage.clear();
        salvaItemsCarrinho();
        somaSubtotal();
    });
};

window.onload = () => {
    const addChildrenSectionItems = async () => {
        const items = document.querySelector('.items');
        items.innerHTML += '<span class="loading">carregando...</span>';
        const requisitionObject = await retornaProdutos('pets');
        const loading = document.querySelector('.loading');
        items.removeChild(loading);
        requisitionObject.produtos.forEach((element) => {
            items.appendChild(criaItemProduto(element));
        });
        funcItemsCarrinho();
        limpaCarrinho();
    };
    addChildrenSectionItems();
};
