console.log("Js loaded");

let mainContainer = document.getElementById("mainContainer");
const pos = document.getElementById("pos");
const product = document.getElementById("product");
const customer = document.getElementById("customer");
const order = document.getElementById("order");


function clearBtn(){
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('bg-[#36BBA7]','text-white');
    btn.classList.add('bg-white','text-black');
});

}

function posInterface(){
    clearBtn();
    pos.classList.remove('bg-white','text-black');
    pos.classList.add('bg-[#36BBA7]','text-white');
    mainContainer.innerHTML = `
        <!-- Customer Select -->
            <div class="mt-7 bg-white p-8 rounded-xl">
                <h2 id="cus" class="text-2xl font-bold">Select Customer</h2>
                <div>
                <select class="border-1 rounded-2xl p-5 w-full mt-5" name="selectCustomer" id="selectCustomer">
                    <option value="" >--Select Customer--</option>
                    <option value="" >chalitha laksahan</option>
                </select>
                </div>
            </div>
            <!-- product Area -->
            <div class="bg-white p-8 w-full h-100 mt-7 rounded-xl">
                <h2 class="text-2xl font-bold">Products</h2>
                <div id="products"></div>
            </div>
            <div class="bg-white p-8 w-full h-100 mt-7 rounded-xl">
                <div class="flex items-center">
                    <img src="assets/img/shopping-cart-sm.svg" class="h-10" alt="">
                    <h2 class="text-2xl font-bold ml-3">Shopping Cart</h2>
                </div>
                
                <div id="shoppingCart" ></div>
            </div>
    `;
}

function productInterface(){ 
    clearBtn();
    product.classList.remove('bg-white','text-black');
    product.classList.add('bg-[#36BBA7]','text-white'); 
}

function customerInterface(){ 
    clearBtn();
    customer.classList.remove('bg-white','text-black');
    customer.classList.add('bg-[#36BBA7]','text-white'); 
}

function orderInterface(){
    clearBtn();
    order.classList.remove('bg-white','text-black');
    order.classList.add('bg-[#36BBA7]','text-white');
}

pos.addEventListener('click',posInterface);
product.addEventListener('click',productInterface);
customer.addEventListener('click',customerInterface);
order.addEventListener('click',orderInterface);

// open model
function openModal(){
    console.log("Hello World");
    // currentEditId = null;
    // document.getElementById('modelTitle').textContent = 'Add Product';
    // document,getElementById('productForm').reset();
    // document.getElementById('productId').value='';
    document.getElementById('modal').classList.remove('hidden');
    
}
//close model
function closeModal(){
    document.getElementById('modal').classList.add('hidden');
    document.getElementById('productForm').reset();
    currentEditId = null;
}

