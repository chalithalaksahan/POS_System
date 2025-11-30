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
    mainContainer.innerHTML = `
     <div id="mainContainer">
            <!-- product details -->
            <div class="mt-7 bg-white p-8 rounded-xl">
                <div class="flex justify-between">
                    <h2 class="text-2xl font-bold">Product Management</h2>
                    <button type="button" onclick="openModal()"  class="flex items-center gap-1 content-center font-semibold p-3 rounded-lg bg-[#36BBA7] text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-plus" viewBox="0 0 16 16">
                            <path
                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                        </svg>Add Product</button>
                </div>
                <div class="overflow-x-auto mt-5">
                    <table class="w-full">
                        <!-- thead -->
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">ID</th>
                                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
                                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Price</th>
                                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Category</th>
                                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Stock</th>
                                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Action</th>
                            </tr>
                        </thead>
                        <tbody id="productBody" class="bg-white devide-y devide-gray-200ju4">
                            <!-- tbody -->
                        </tbody>
                    </table>
                </div>   
        </div>
    </div>
     <!-- modal -->
     <div id="modal" class="hidden fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md md mx-4 ">
            <!-- modal header -->
            <div class="flex justify-between items-center border-b px-6 py-4">
                <h2 id="modalTitle" class="text-xl font-bold text-gray-800">
                Add Product
                </h2>
                <button onclick="closeModal()" class="text-gray-400 hover:text-gray-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <!-- modal body -->
             <form id="productForm" class="p-6">
                <input type="hidden" id="productId">
                <div class="mb-4">
                    <label for="productName" class="block text-gray-700 text-sm font-bold mb-2">
                        Product Name
                    </label>
                    <input type="text" id="productName" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[$36BBA7]"
                    placeholder="Enter product name">
                </div>
                <div class="mb-4">
                    <label for="productPrice" class="block text-gray-700 text-sm font-bold mb-2">
                        Price
                    </label>
                    <input type="text" id="productPrice" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[$36BBA7]"
                    placeholder="Enter price">
                </div>
                <div class="mb-4">
                    <label for="productCategory" class="block text-gray-700 text-sm font-bold mb-2">
                        Category
                    </label>
                    <input type="text" id="productCategory" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[$36BBA7]"
                    placeholder="Enter category">
                </div>
                <div class="mb-6">
                    <label for="productStock" class="block text-gray-700 text-sm font-bold mb-2">
                        Stock
                    </label>
                    <input type="text" id="productStock" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[$36BBA7]"
                    placeholder="Enter stock">
                </div>
                <!-- Modal Footer -->
                 <div class="flex justify-center gap-3">
                    <button type="button" onclick="closeModal()" 
                        class="px-4 py-2 w-35 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                    Cancel
                    </button>
                    <button type="submit" 
                        class="px-4 py-2 w-35 bg-[#36BBA7] text-white rounded-lg hover:bg-[#2da089] transition-colors" >
                        Save
                    </button>

                 </div>
             </form>
        </div>
     </div>
    `;
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

