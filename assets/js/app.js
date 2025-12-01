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
                    <button type="button" onclick="openProductModal()"  class="flex items-center justify-center gap-1  font-semibold p-3 rounded-lg bg-[#36BBA7] text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12 6v12m6-6H6"/></svg>    
                    Add Product</button>
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
     <div id="proModal" class="hidden fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md md mx-4 ">
            <!-- modal header -->
            <div class="flex justify-between items-center border-b px-6 py-4">
                <h2 id="modalTitle" class="text-xl font-bold text-gray-800">
                Add Product
                </h2>
                <button onclick="closeProductModal()" class="text-gray-400 hover:text-gray-600">
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
                    <input type="text" id="productName" required class="w-full px-3 py-2 border border-gray-300 rounded-lg hover:outline-1 focus:ring-2 focus:ring-[$36BBA7]"
                    placeholder="Enter product name">
                </div>
                <div class="mb-4">
                    <label for="productPrice" class="block text-gray-700 text-sm font-bold mb-2">
                        Price
                    </label>
                    <input type="text" id="productPrice" required class="w-full px-3 py-2 border border-gray-300 rounded-lg hover:outline-1  focus:ring-2 focus:ring-[$36BBA7]"
                    placeholder="Enter price">
                </div>
                <div class="mb-4">
                    <label for="productCategory" class="block text-gray-700 text-sm font-bold mb-2">
                        Category
                    </label>
                    <input type="text" id="productCategory" required class="w-full px-3 py-2 border border-gray-300 rounded-lg hover:outline-1  focus:ring-2 focus:ring-[$36BBA7]"
                    placeholder="Enter category">
                </div>
                <div class="mb-6">
                    <label for="productStock" class="block text-gray-700 text-sm font-bold mb-2">
                        Stock
                    </label>
                    <input type="text" id="productStock" required class="w-full px-3 py-2 border border-gray-300 rounded-lg hover:outline-1  focus:ring-2 focus:ring-[$36BBA7]"
                    placeholder="Enter stock">
                </div>
                <!-- Modal Footer -->
                 <div class="flex justify-center gap-3">
                    <button type="button" onclick="closeProductModal()" 
                        class="px-4 py-2 w-35 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"/></svg>
                    Cancel
                    </button>
                    <button type="submit" 
                        class="px-4 py-2 w-35 bg-[#36BBA7] text-white rounded-lg hover:bg-[#2da089] transition-colors flex items-center justify-center gap-2" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h11.175q.4 0 .763.15t.637.425l2.85 2.85q.275.275.425.638t.15.762V19q0 .825-.587 1.413T19 21zM19 7.85L16.15 5H5v14h14zM12 18q1.25 0 2.125-.875T15 15t-.875-2.125T12 12t-2.125.875T9 15t.875 2.125T12 18m-5-8h7q.425 0 .713-.288T15 9V7q0-.425-.288-.712T14 6H7q-.425 0-.712.288T6 7v2q0 .425.288.713T7 10M5 7.85V19V5z"/></svg>
                        Save
                    </button>

                 </div>
             </form>
        </div>
     </div>
    `;
     setTimeout(() => {
        loadProducts();
    }, 0);
}

function customerInterface(){ 
    clearBtn();
    customer.classList.remove('bg-white','text-black');
    customer.classList.add('bg-[#36BBA7]','text-white'); 
    mainContainer.innerHTML = `
     <div id="mainContainer">
            <!-- product details -->
            <div class="mt-7 bg-white p-8 rounded-xl">
                <div class="flex justify-between">
                    <h2 class="text-2xl font-bold">Customer Management</h2>
                    <button type="button" onclick="openCustomerModal()"  class="flex items-center justify-center gap-1  font-semibold p-3 rounded-lg bg-[#36BBA7] text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12 6v12m6-6H6"/></svg>    
                    Add Customer</button>
                </div>
                <div class="overflow-x-auto mt-5">
                    <table class="w-full">
                        <!-- thead -->
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">ID</th>
                                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
                                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Email</th>
                                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Phone</th>
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
     <div id="cusModal" class="hidden fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md md mx-4 ">
            <!-- modal header -->
            <div class="flex justify-between items-center border-b px-6 py-4">
                <h2 id="modalTitle" class="text-xl font-bold text-gray-800">
                Add Customer
                </h2>
                <button onclick="closeCustomerModal()" class="text-gray-400 hover:text-gray-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <!-- modal body -->
             <form id="customerForm" class="p-6">
                <input type="hidden" id="customerId">
                <div class="mb-4">
                    <label for="customerName" class="block text-gray-700 text-sm font-bold mb-2">
                        Name
                    </label>
                    <input type="text" id="productName" required class="w-full px-3 py-2 border border-gray-300 rounded-lg hover:outline-1 focus:ring-2 focus:ring-[$36BBA7]"
                    placeholder="Enter name">
                </div>
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 text-sm font-bold mb-2">
                        E-mail
                    </label>
                    <input type="text" id="email" required class="w-full px-3 py-2 border border-gray-300 rounded-lg hover:outline-1  focus:ring-2 focus:ring-[$36BBA7]"
                    placeholder="Enter E-mail">
                </div>
                <div class="mb-4">
                    <label for="phone" class="block text-gray-700 text-sm font-bold mb-2">
                        Phone
                    </label>
                    <input type="text" id="phone" required class="w-full px-3 py-2 border border-gray-300 rounded-lg hover:outline-1  focus:ring-2 focus:ring-[$36BBA7]"
                    placeholder="Enter phone number">
                </div>
                <!-- Modal Footer -->
                 <div class="flex justify-center gap-3">
                    <button type="button" onclick="closeCustomerModal()" 
                        class="px-4 py-2 w-35 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"/></svg>
                    Cancel
                    </button>
                    <button type="submit" 
                        class="px-4 py-2 w-35 bg-[#36BBA7] text-white rounded-lg hover:bg-[#2da089] transition-colors flex items-center justify-center gap-2" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h11.175q.4 0 .763.15t.637.425l2.85 2.85q.275.275.425.638t.15.762V19q0 .825-.587 1.413T19 21zM19 7.85L16.15 5H5v14h14zM12 18q1.25 0 2.125-.875T15 15t-.875-2.125T12 12t-2.125.875T9 15t.875 2.125T12 18m-5-8h7q.425 0 .713-.288T15 9V7q0-.425-.288-.712T14 6H7q-.425 0-.712.288T6 7v2q0 .425.288.713T7 10M5 7.85V19V5z"/></svg>
                        Save
                    </button>

                 </div>
             </form>
        </div>
     </div>
    `;
}

function orderInterface(){
    clearBtn();
    order.classList.remove('bg-white','text-black');
    order.classList.add('bg-[#36BBA7]','text-white');
    mainContainer.innerHTML = `
     <div id="mainContainer">
            <!-- product details -->
            <div class="mt-7 bg-white p-8 rounded-xl">
                <div class="flex justify-between">
                    <h2 class="text-2xl font-bold">Order History</h2> 
                    
                </div>
                <div class="flex justify-center mt-5">
                <p class="text-gray-500 text-lg">No orders yet</p>
                </div>
            </div>
        </div>
        `;
}

pos.addEventListener('click',posInterface);
product.addEventListener('click',productInterface);
customer.addEventListener('click',customerInterface);
order.addEventListener('click',orderInterface);



// open model
function openProductModal(){
    currentEditId = null;
    document.getElementById('modalTitle').textContent = 'Add Product';
    document.getElementById('productId').value='';
    document.getElementById('proModal').classList.remove('hidden');
    
}
//close model
function closeProductModal(){
    document.getElementById('proModal').classList.add('hidden');
    document.getElementById('productForm').reset();
    currentEditId = null;
}

function openCustomerModal(){
    document.getElementById('cusModal').classList.remove('hidden');
}

function closeCustomerModal(){
    document.getElementById('cusModal').classList.add('hidden');
}

function getNextProductId() {
    let nextId = localStorage.getItem('nextProductId');
    
    if (!nextId) {
        const products = JSON.parse(localStorage.getItem('productData')) || [];
        if (products.length === 0) {
            nextId = 1;
        } else {
            const maxId = Math.max(...products.map(p => p.proId || 0));
            nextId = maxId + 1;
        }
        localStorage.setItem('nextProductId', nextId.toString());
    }
    
    return parseInt(nextId);
}

function incrementProductId() {
    const currentId = getNextProductId();
    const nextId = currentId + 1;
    localStorage.setItem('nextProductId', nextId.toString());
    return currentId; 
}
//form Submit

document.addEventListener('submit', e => {
     if (e.target && e.target.id === 'productForm') {
   e.preventDefault();

   
    const productId = incrementProductId();
    const productName = document.getElementById('productName').value.trim();
    const productPrice = document.getElementById('productPrice').value.trim();
    const productCategory = document.getElementById('productCategory').value.trim();
    const productStock = document.getElementById('productStock').value.trim();

      let products = localStorage.getItem('productData');
      let productsArray = products ? JSON.parse(products) : [];

    const product = {
        proId : productId,
        proName : productName,
        proPrice : productPrice,
        proCategory : productCategory,
        proStock : productStock 

    };
    productsArray.push(product);
    localStorage.setItem('productData', JSON.stringify(productsArray));
    document.getElementById('proModal').classList.remove('hidden');
    loadProducts();
    }
});
   
function loadProducts(){
     const products = JSON.parse(localStorage.getItem('productData')) || [];
     const tbody = document.getElementById('productBody');

     tbody.innerHTML = '';

       if (products.length === 0) {
        // Show message when no products
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="px-6 py-4 text-center text-gray-500">
                    No products found. Add your first product!
                </td>
            </tr>
        `;
        return;
    }
    // Add each product as a table row
    products.forEach(product => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50';
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                ${product.proId || product.id || '-'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${product.proName || product.name || '-'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                $${product.proPrice || product.price || '0.00'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${product.proCategory || product.category || '-'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${product.proStock || product.stock || '0'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onclick="editProduct(${product.proId || product.id})" 
                    class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2 text-xs">
                    Edit
                </button>
                <button onclick="deleteProduct(${product.proId || product.id})" 
                    class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs">
                    Delete
                </button>
            </td>
        `;

        tbody.appendChild(row);
        

    });
    
    console.log(`Displayed ${products.length} products in table`);


}

function editProduct(id) {
    const products = JSON.parse(localStorage.getItem('productData')) || [];
    const product = products.find(p => p.proId === id);
    
    if (product) {
        document.getElementById('productId').value = product.proId;
        document.getElementById('productName').value = product.proName;
        document.getElementById('productPrice').value = product.proPrice;
        document.getElementById('productCategory').value = product.proCategory;
        document.getElementById('productStock').value = product.proStock;
        
        document.getElementById('modalTitle').textContent = 'Edit Product';
        document.getElementById('proModal').classList.remove('hidden');
    }
}

function deleteProduct(id) {
    if (confirm(`Are you sure you want to delete product ID ${id}?`)) {
        let products = JSON.parse(localStorage.getItem('productData')) || [];
        
        const productIndex = products.findIndex(p => p.proId === id);
        
        if (productIndex !== -1) {
            products.splice(productIndex, 1);
            
            localStorage.setItem('productData', JSON.stringify(products));
            
            loadProducts();
            alert(`Product ID ${id} deleted successfully!`);
        }
    }
}