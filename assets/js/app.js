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
                    <option id="selectCus" value="" >--Select Customer--</option>
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
     setTimeout(() => {
        const customers = JSON.parse(localStorage.getItem('customerData')) || [];
        const selectElement = document.getElementById('selectCustomer');
        
        customers.forEach(customer => {
            const option = document.createElement('option');
            option.value = customer.cusName;
            option.textContent = customer.cusName;
            selectElement.appendChild(option);
        });
        displayProducts();
    }, 0);
}

function displayProducts() {

    const products = JSON.parse(localStorage.getItem('productData')) || [];
    const productsContainer = document.getElementById('products');
    
    if (products.length === 0) {
        productsContainer.innerHTML = `
            <div class="text-center py-10">
                <div class="text-gray-400 text-5xl mb-4">📦</div>
                <h3 class="text-xl font-semibold text-gray-600">No Products Yet</h3>
                <p class="text-gray-500 mt-2">Add your first product to get started</p>
            </div>
        `;
        return;
    }
    
    // Create product grid
    productsContainer.innerHTML = `
        <div class="mb-4 flex justify-between items-center">
            <h3 class="text-lg font-semibold">Available Products (${products.length})</h3>
            <div class="text-sm text-gray-500">
                Showing all products
            </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            ${products.map(product => createProductCard(product)).join('')}
        </div>
    `;
}

function createProductCard(product) {
    const isInStock = product.proStock > 0;
    
    return `
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden">
            <!-- Stock indicator -->
            <div class="h-1 ${isInStock ? 'bg-green-500' : 'bg-red-500'}"></div>
            
            <div class="p-5">
                
                <!-- Product Name -->
                <h3 class="text-lg font-bold text-gray-800 truncate mb-2" title="${product.proName}">
                    ${product.proName}
                </h3>
                
                <!-- Price -->
                <div class="mb-4">
                    <span class="text-3xl font-bold text-blue-700">Rs ${parseFloat(product.proPrice).toFixed(2)}</span>
                </div>
                
                <!-- Category & Stock -->
                <div class="flex justify-between items-center mb-5">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        ${product.proCategory}
                    </span>
                    <div class="text-right">
                        <div class="text-sm font-semibold ${isInStock ? 'text-green-600' : 'text-red-600'}">
                            ${isInStock ? 'In Stock' : 'Out of Stock'}
                        </div>
                        <div class="text-xs text-gray-500">
                            ${product.proStock} units
                        </div>
                    </div>
                </div>
                
                <!-- Add to Cart Button -->
                <button onclick="addToCart('${product.proId}')" 
                    class="w-full ${isInStock ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800' : 'bg-gray-300 cursor-not-allowed'} text-white font-medium py-3 rounded-lg transition-all duration-300"
                    ${!isInStock ? 'disabled' : ''}>
                    ${isInStock ? '➕ Add to Cart' : 'Out of Stock'}
                </button>
            </div>
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
                        <tbody id="customerBody" class="bg-white devide-y devide-gray-200ju4">
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
                    <input type="text" id="customerName" required class="w-full px-3 py-2 border border-gray-300 rounded-lg hover:outline-1 focus:ring-2 focus:ring-[$36BBA7]"
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
     setTimeout(() => {
        loadCustomers();
    }, 0);
}

function orderInterface(){
    clearBtn();
    order.classList.remove('bg-white','text-black');
    order.classList.add('bg-[#36BBA7]','text-white');
     mainContainer.innerHTML = `
        <!-- Order History -->
        <div class="mt-7 bg-white p-8 rounded-xl">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold">Order History</h2>
                <div class="flex items-center space-x-4">
                    <div class="text-right">
                        <div class="text-sm text-gray-500">Total Orders</div>
                        <div id="totalOrdersCount" class="text-2xl font-bold">0</div>
                    </div>
                    <div class="text-right">
                        <div class="text-sm text-gray-500">Total Revenue</div>
                        <div id="totalRevenue" class="text-2xl font-bold text-green-600">$0.00</div>
                    </div>
                    <button onclick="exportOrders()" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        Export
                    </button>
                </div>
            </div>
            
            <!-- Filter Controls -->
            <div class="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                     <select id="dateFilter" onchange="filterOrders()" class="border rounded-lg px-3 py-2">
                        <option value="all">All Dates</option>
                        <option value="today">Today</option>
                        <option value="week">Last 7 Days</option>
                        <option value="month">Last 30 Days</option>
                        <option value="year">Last Year</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Customer</label>
                    <select id="customerFilter" onchange="filterOrders()" class="w-full p-2 border border-gray-300 rounded">
                        <option value="all">All Customers</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select id="statusFilter" onchange="filterOrders()" class="w-full p-2 border border-gray-300 rounded">
                        <option value="all">All Status</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
                    <input type="text" id="orderSearch" onkeyup="searchOrders()" 
                           placeholder="Search orders..." 
                           class="w-full p-2 border border-gray-300 rounded">
                </div>
            </div>
            
            <!-- Orders Table -->
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Order ID
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Customer
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Items
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody id="orderTableBody" class="bg-white divide-y divide-gray-200">
                        <!-- Orders will be loaded here -->
                    </tbody>
                </table>
            </div>
            
            <!-- No Orders Message -->
            <div id="noOrdersMessage" class="text-center py-10 hidden">
                <div class="text-gray-400 text-6xl mb-4">📋</div>
                <h3 class="text-xl font-semibold text-gray-600">No Orders Yet</h3>
                <p class="text-gray-500 mt-2">Complete your first sale to see orders here</p>
            </div>
            
            <!-- Pagination -->
            <div id="orderPagination" class="mt-6 flex justify-between items-center hidden">
                <div class="text-sm text-gray-700">
                    Showing <span id="startRange">0</span> to <span id="endRange">0</span> of 
                    <span id="totalOrders">0</span> orders
                </div>
                <div class="flex space-x-2">
                    <button onclick="prevPage()" class="px-4 py-2 border rounded hover:bg-gray-100">Previous</button>
                    <button onclick="nextPage()" class="px-4 py-2 border rounded hover:bg-gray-100">Next</button>
                </div>
            </div>
        </div>
    `;
    
    // Load order history
    loadOrderHistory();
    loadCustomerFilter();
}
function loadOrderHistory() {
    const orders = JSON.parse(localStorage.getItem('orderHistory')) || [];
    const orderTableBody = document.getElementById('');
    const noOrdersMessage = document.getElementById('noOrdersMessage');
    const totalOrdersCount = document.getElementById('totalOrdersCount');
    const totalRevenue = document.getElementById('totalRevenue');
    
    // Update stats
    if (totalOrdersCount) {
        totalOrdersCount.textContent = orders.length;
    }
    
    // Calculate total revenue
    const revenue = orders.reduce((sum, order) => sum + order.total, 0);
    if (totalRevenue) {
        totalRevenue.textContent = `Rs. ${revenue.toFixed(2)}`;
    }
    
    if (orders.length === 0) {
        if (orderTableBody) orderTableBody.innerHTML = '';
        if (noOrdersMessage) noOrdersMessage.classList.remove('hidden');
        return;
    }
    
    if (noOrdersMessage) noOrdersMessage.classList.add('hidden');
    
    // Display orders (most recent first)
    if (orderTableBody) {
        orderTableBody.innerHTML = orders.map(order => `
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">${order.orderId}</div>
                    <div class="text-sm text-gray-500">${order.orderNumber || ''}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${order.customer || 'Walk-in Customer'}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${order.items.reduce((sum, item) => sum + item.quantity, 0)} items</div>
                    <div class="text-xs text-gray-500">
                        ${order.items.slice(0, 2).map(item => item.proName).join(', ')}
                        ${order.items.length > 2 ? ` +${order.items.length - 2} more` : ''}
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-bold text-green-600">Rs. ${order.total.toFixed(2)}</div>
                    <div class="text-xs text-gray-500">
                        Subtotal: $${order.subtotal.toFixed(2)} | Tax: $${order.tax.toFixed(2)}
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${order.date}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'}">
                        ${order.status}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onclick="viewOrderDetails('${order.orderId}')" 
                            class="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button onclick="printOrder('${order.orderId}')" 
                            class="text-gray-600 hover:text-gray-900 mr-3">Print</button>
                    <button onclick="deleteOrder('${order.orderId}')" 
                            class="text-red-600 hover:text-red-900">Delete</button>
                </td>
            </tr>
        `).join('');
    }
    loadCustomerFilter();
    displayFilteredOrders(orders);
}

// View order details
function viewOrderDetails(orderId) {
    const orders = JSON.parse(localStorage.getItem('orderHistory')) || [];
    const order = orders.find(o => o.orderId === orderId);
    
    if (!order) {
        alert('Order not found!');
        return;
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold">Order Details</h2>
                <button onclick="this.closest('.fixed').remove()" 
                        class="text-gray-400 hover:text-gray-600 text-2xl">×</button>
            </div>
            
            <!-- Order Header -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="bg-gray-50 p-4 rounded-lg">
                    <div class="text-sm text-gray-500">Order ID</div>
                    <div class="font-bold">${order.orderId}</div>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg">
                    <div class="text-sm text-gray-500">Customer</div>
                    <div class="font-bold">${order.customer || 'Walk-in Customer'}</div>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg">
                    <div class="text-sm text-gray-500">Date & Time</div>
                    <div class="font-bold">${order.date}</div>
                </div>
            </div>
            
            <!-- Order Items -->
            <div class="mb-6">
                <h3 class="text-lg font-semibold mb-4">Order Items</h3>
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">Product</th>
                                <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">Price</th>
                                <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">Qty</th>
                                <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">Total</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            ${order.items.map(item => `
                                <tr>
                                    <td class="px-4 py-3">
                                        <div class="font-medium">${item.proName}</div>
                                        <div class="text-sm text-gray-500">ID: ${item.proId}</div>
                                    </td>
                                    <td class="px-4 py-3">Rs.  ${item.proPrice.toFixed(2)}</td>
                                    <td class="px-4 py-3">${item.quantity}</td>
                                    <td class="px-4 py-3 font-semibold">Rs. ${(item.proPrice * item.quantity).toFixed(2)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <!-- Order Summary -->
            <div class="border-t border-gray-200 pt-6">
                <div class="flex justify-between mb-2">
                    <span class="text-gray-600">Subtotal:</span>
                    <span class="font-medium">Rs.  ${order.subtotal.toFixed(2)}</span>
                </div>
                <div class="flex justify-between mb-2">
                    <span class="text-gray-600">Tax (8%):</span>
                    <span class="font-medium">Rs. ${order.tax.toFixed(2)}</span>
                </div>
                <div class="flex justify-between text-xl font-bold mt-4 pt-4 border-t border-gray-200">
                    <span>Total:</span>
                    <span class="text-green-600">Rs. ${order.total.toFixed(2)}</span>
                </div>
            </div>
            
            <div class="mt-8 flex justify-end space-x-4">
                <button onclick="printOrder('${order.orderId}')" 
                        class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Print Receipt
                </button>
                <button onclick="this.closest('.fixed').remove()" 
                        class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Close
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}
function printOrder(orderId) {
    const orders = JSON.parse(localStorage.getItem('orderHistory')) || [];
    const order = orders.find(o => o.orderId === orderId);
    
    if (!order) {
        alert('Order not found!');
        return;
    }
    
    const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Receipt - ${order.orderId}</title>
            <style>
                body { font-family: 'Courier New', monospace; margin: 0; padding: 20px; }
                .receipt { max-width: 300px; margin: 0 auto; }
                .header { text-align: center; margin-bottom: 20px; }
                .item { margin-bottom: 10px; }
                .total { font-weight: bold; font-size: 18px; margin-top: 20px; }
                @media print {
                    body { padding: 0; }
                }
            </style>
        </head>
        <body>
            <div class="receipt">
                <div class="header">
                    <h2>DSN Supermarket</h2>
                    <p>Order: ${order.orderId}</p>
                    <p>Date: ${order.date}</p>
                    <p>Customer: ${order.customer}</p>
                </div>
                <hr>
                ${order.items.map(item => `
                    <div class="item">
                        <div>${item.proName} x${item.quantity}</div>
                        <div>RS. ${item.proPrice.toFixed(2)} each = Rs. ${(item.proPrice * item.quantity).toFixed(2)}</div>
                    </div>
                `).join('')}
                <hr>
                <div class="total">
                    <div>Subtotal: Rs. ${order.subtotal.toFixed(2)}</div>
                    <div>Tax: Rs. ${order.tax.toFixed(2)}</div>
                    <div>Total: Rs. ${order.total.toFixed(2)}</div>
                </div>
            </div>
            <script>
                window.onload = function() {
                    window.print();
                    setTimeout(() => window.close(), 1000);
                };
            </script>
        </body>
        </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
}

// Delete order
function deleteOrder(orderId) {
    if (!confirm('Are you sure you want to delete this order?')) {
        return;
    }
    
    let orders = JSON.parse(localStorage.getItem('orderHistory')) || [];
    orders = orders.filter(order => order.orderId !== orderId);
    localStorage.setItem('orderHistory', JSON.stringify(orders));
    
    loadOrderHistory();
    showToast('Order deleted successfully');
}

// Load customer filter options
function loadCustomerFilter() {
    const orders = JSON.parse(localStorage.getItem('orderHistory')) || [];
    const customerFilter = document.getElementById('customerFilter');
    
    if (!customerFilter) return;
    
    // Get unique customers
    const customers = [...new Set(orders.map(order => order.customer).filter(Boolean))];
    
    // Clear existing options (keeping "All Customers")
    customerFilter.innerHTML = '<option value="all">All Customers</option>';
    
    // Add customer options
    customers.forEach(customer => {
        const option = document.createElement('option');
        option.value = customer;
        option.textContent = customer;
        customerFilter.appendChild(option);
    });
}

// Filter orders
function filterOrders() {
    const orders = JSON.parse(localStorage.getItem('orderHistory')) || [];
    const dateFilter = document.getElementById('dateFilter').value;
    const customerFilter = document.getElementById('customerFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    
    let filteredOrders = orders;
    
    // Date filter
    if (dateFilter && dateFilter !== 'all') {
        const now = new Date();
        filteredOrders = filteredOrders.filter(order => {
            // Parse the order date - assuming order.date is in a format like "2024-01-15 14:30:00"
            let orderDate;
            
            // Try to parse timestamp first, then date string
            if (order.timestamp) {
                orderDate = new Date(order.timestamp);
            } else if (order.date) {
                // Handle different date formats
                orderDate = new Date(order.date);
            } else {
                return false; // No date found
            }
            
            // If date parsing failed, skip this order
            if (isNaN(orderDate.getTime())) {
                console.warn('Invalid date for order:', order.orderId, order.date);
                return false;
            }
            
            // Reset hours for date comparison
            const orderDateStart = new Date(orderDate);
            orderDateStart.setHours(0, 0, 0, 0);
            const nowStart = new Date(now);
            nowStart.setHours(0, 0, 0, 0);
            
            switch(dateFilter) {
                case 'today':
                    return orderDateStart.getTime() === nowStart.getTime();
                case 'week':
                    const weekAgo = new Date(nowStart.getTime() - 7 * 24 * 60 * 60 * 1000);
                    return orderDateStart >= weekAgo;
                case 'month':
                    const monthAgo = new Date(nowStart);
                    monthAgo.setMonth(monthAgo.getMonth() - 1);
                    return orderDateStart >= monthAgo;
                case 'year':
                    const yearAgo = new Date(nowStart);
                    yearAgo.setFullYear(yearAgo.getFullYear() - 1);
                    return orderDateStart >= yearAgo;
                default:
                    return true;
            }
        });
    }
    
    // Customer filter
    if (customerFilter && customerFilter !== 'all') {
        filteredOrders = filteredOrders.filter(order => {
            const orderCustomer = order.customer || 'Walk-in Customer';
            return orderCustomer === customerFilter;
        });
    }
    
    // Status filter
    if (statusFilter && statusFilter !== 'all') {
        filteredOrders = filteredOrders.filter(order => order.status === statusFilter);
    }
    
    // Update stats for filtered orders
    updateStats(filteredOrders);
    displayFilteredOrders(filteredOrders);
}

function updateStats(filteredOrders) {
    const totalOrdersCount = document.getElementById('totalOrdersCount');
    const totalRevenue = document.getElementById('totalRevenue');
    
    if (totalOrdersCount) {
        totalOrdersCount.textContent = filteredOrders.length;
    }
    
    if (totalRevenue) {
        const revenue = filteredOrders.reduce((sum, order) => sum + order.total, 0);
        totalRevenue.textContent = `Rs. ${revenue.toFixed(2)}`;
    }
}


// Display filtered orders
function displayFilteredOrders(filteredOrders) {
    const orderTableBody = document.getElementById('orderTableBody');
    const noOrdersMessage = document.getElementById('noOrdersMessage');
    
    if (filteredOrders.length === 0) {
        if (orderTableBody) orderTableBody.innerHTML = '';
        if (noOrdersMessage) noOrdersMessage.classList.remove('hidden');
        return;
    }
    
    if (noOrdersMessage) noOrdersMessage.classList.add('hidden');
    
    // Display orders (most recent first)
    if (orderTableBody) {
        orderTableBody.innerHTML = filteredOrders
            .sort((a, b) => {
                // Sort by date descending (most recent first)
                const dateA = a.timestamp ? new Date(a.timestamp) : new Date(a.date);
                const dateB = b.timestamp ? new Date(b.timestamp) : new Date(b.date);
                return dateB - dateA;
            })
            .map(order => `
                <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-gray-900">${order.orderId}</div>
                        <div class="text-sm text-gray-500">${order.orderNumber || ''}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">${order.customer || 'Walk-in Customer'}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">${order.items.reduce((sum, item) => sum + item.quantity, 0)} items</div>
                        <div class="text-xs text-gray-500">
                            ${order.items.slice(0, 2).map(item => item.proName).join(', ')}
                            ${order.items.length > 2 ? ` +${order.items.length - 2} more` : ''}
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-bold text-green-600">Rs. ${order.total.toFixed(2)}</div>
                        <div class="text-xs text-gray-500">
                            Subtotal: Rs. ${order.subtotal.toFixed(2)} | Tax: Rs. ${order.tax.toFixed(2)}
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">${order.date}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                              order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'}">
                            ${order.status}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button onclick="viewOrderDetails('${order.orderId}')" 
                                class="text-blue-600 hover:text-blue-900 mr-3">View</button>
                        <button onclick="printOrder('${order.orderId}')" 
                                class="text-gray-600 hover:text-gray-900 mr-3">Print</button>
                        <button onclick="deleteOrder('${order.orderId}')" 
                                class="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                </tr>
            `).join('');
    }
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

//////////////////////////////////////////////////////////////////////////////////////////////////////
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
    document.getElementById('proModal').classList.add('hidden');
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
                Rs ${product.proPrice || product.price || '0.00'}
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

///////////////////////////////////////////customer Data/////////////////////////////////////////////////////
function getNextCustomerId() {
    let nextCusId = localStorage.getItem('nextCustomerId');
    
    if (!nextCusId) {
        const customers = JSON.parse(localStorage.getItem('customerData')) || [];
        if (customers.length === 0) {
            nextCusId = 1;
        } else {
            const maxCusId = Math.max(...customers.map(p => p.cusId || 0));
            nextCusId = maxCusId + 1;
        }
        localStorage.setItem('nextCustomerId', nextCusId.toString());
    }
    
    return parseInt(nextCusId);
}

function incrementCustomerId() {
    const currentCusId = getNextCustomerId();
    const nextCusId = currentCusId + 1;
    localStorage.setItem('nextCustomerId', nextCusId.toString());
    return currentCusId; 
}

document.addEventListener('submit', e => {
     if (e.target && e.target.id === 'customerForm') {
   e.preventDefault();

   
    const customerId = incrementCustomerId();
    const customerName = document.getElementById('customerName').value.trim();
    const customerEmail = document.getElementById('email').value.trim();
    const customerPhone = document.getElementById('phone').value.trim();


      let customers = localStorage.getItem('customerData');
      let customersArray = customers ? JSON.parse(customers) : [];

    const customer = {
        cusId : customerId,
        cusName : customerName,
        cusEmail : customerEmail,
        cusPhone : customerPhone

    };
    customersArray.push(customer);
    localStorage.setItem('customerData', JSON.stringify(customersArray));
    document.getElementById('cusModal').classList.add('hidden');
    loadCustomers();
    }
});

function loadCustomers(){
     const customers = JSON.parse(localStorage.getItem('customerData')) || [];
     const tbody = document.getElementById('customerBody');

     tbody.innerHTML = '';

       if (customers.length === 0) {
        // Show message when no customers
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="px-6 py-4 text-center text-gray-500">
                    No customers found. Add first customer!
                </td>
            </tr>
        `;
        return;
    }
     // Add each product as a table row
    customers.forEach(customer => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50';
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                ${customer.cusId || customer.id || '-'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${customer.cusName || customer.name || '-'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${customer.cusEmail || customer.Email || '0.00'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${customer.cusPhone || customer.phone || '-'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onclick="editCustomer(${customer.cusId || customer.id})" 
                    class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2 text-xs">
                    Edit
                </button>
                <button onclick="deleteCustomer(${customer.cusId || customer.id})" 
                    class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs">
                    Delete
                </button>
            </td>
        `;

        tbody.appendChild(row);
        

    });
    
    console.log(`Displayed ${customers.length} products in table`);


}
function editCustomer(id) {
    const customers = JSON.parse(localStorage.getItem('customerData')) || [];
    const customer = customers.find(p => p.cusId === id);
    
    if (product) {
        document.getElementById('customerId').value = customer.cusId;
        document.getElementById('customerName').value = customer.cusName;
        document.getElementById('email').value = customer.cusEmail;
        document.getElementById('phone').value = customer. cusPhone;
       
        
        document.getElementById('modalTitle').textContent = 'Edit Customer';
        document.getElementById('cusModal').classList.remove('hidden');
    }
}

function deleteCustomer(id) {
    if (confirm(`Are you sure you want to delete customer ID ${id}?`)) {
        let customers = JSON.parse(localStorage.getItem('customerData')) || [];
        
        const customerIndex = customers.findIndex(p => p.cusId === id);
        
        if (customerIndex !== -1) {
            customers.splice(customerIndex, 1);
            
            localStorage.setItem('customerData', JSON.stringify(customers));
            
            loadCustomers();
            alert(`Customer ID ${id} deleted successfully!`);
        }
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////
function shoppingCartInterface() {
    clearBtn();
    const shoppingCart = document.getElementById('shoppingCart');

    shoppingCart.innerHTML = `
        <!-- Shopping Cart Container -->

            <!-- Cart Items -->
            <div id="cartItemsContainer" class="space-y-4">
                <!-- Items will be loaded here -->
            </div>
            
            <!-- Empty Cart Message -->
            <div id="emptyCartMessage" class="hidden text-center py-10">
                <div class="text-gray-400 text-6xl mb-4">🛒</div>
                <h3 class="text-xl font-semibold text-gray-600">Your Cart is Empty</h3>
                <p class="text-gray-500 mt-2">Add products</p>
            </div>
            
            <!-- Divider -->
            <div class="my-6 border-t border-gray-300"></div>
            
            <!-- Summary Section -->
            <div id="cartSummary" class="hidden">
                <!-- Subtotal -->
                <div class="flex justify-between mb-2">
                    <span class="text-gray-700">Subtotal:</span>
                    <span id="subtotalAmount" class="font-semibold">$0.00</span>
                </div>
                
                <!-- Tax -->
                <div class="flex justify-between mb-4">
                    <span class="text-gray-700">Tax (8%):</span>
                    <span id="taxAmount" class="font-semibold">$0.00</span>
                </div>
                
                <!-- Divider -->
                <div class="my-4 border-t border-gray-300"></div>
                
                <!-- Total -->
                <div class="flex justify-between mb-6">
                    <span class="text-lg font-bold">Total:</span>
                    <span id="totalAmount" class="text-lg font-bold text-green-600">$0.00</span>
                </div>
                
                <!-- Action Buttons -->
                <div class="flex space-x-4">
                    <button onclick="clearCart()" 
                            class="flex-1 py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600">
                        Clear Cart
                    </button>
                    <button onclick="processCheckout()" 
                            class="flex-1 py-3 bg-[#36BBA7] text-white font-medium rounded-lg hover:bg-[#2da895]">
                        Complete Order
                    </button>
                </div>
            </div>
       
    `;
    
    // Load cart items
    
      setTimeout(() => {
        loadCartItems();
    }, 0);
}

// Load and display cart items
function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('posCart')) || [];
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    const cartSummary = document.getElementById('cartSummary');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        emptyCartMessage.classList.remove('hidden');
        cartSummary.classList.add('hidden');
        return;
    }
    
    emptyCartMessage.classList.add('hidden');
    cartSummary.classList.remove('hidden');
    
    let subtotal = 0;
    
    cartItemsContainer.innerHTML = cart.map(item => {
        const itemTotal = item.proPrice * item.quantity;
        subtotal += itemTotal;
        
        return `
            <!-- Cart Item -->
            <div class="cart-item">
                <!-- Product Name -->
                <h3 class="text-lg font-bold mb-1">${item.proName}</h3>
                
                <!-- Price and Quantity -->
                <div class="flex justify-between items-center">
                    <span class="text-gray-700">Rs. ${item.proPrice.toFixed(2)}</span>
                    <div class="flex items-center space-x-3">
                        <div class="flex items-center border border-gray-300 rounded">
                            <button onclick="updateCartQuantity('${item.proId}', -1)" 
                                    class="px-3 py-1 hover:bg-gray-100">-</button>
                            <span class="px-3 py-1">${item.quantity}</span>
                            <button onclick="updateCartQuantity('${item.proId}', 1)" 
                                    class="px-3 py-1 hover:bg-gray-100">+</button>
                        </div>
                        <button onclick="removeCartItem('${item.proId}')" 
                                class="text-red-500 hover:text-red-700 text-sm">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        `;
        
    }).join('');
    
    // Add divider after items
    cartItemsContainer.innerHTML += `<div class="my-4 border-t border-gray-300"></div>`;
    
    // Calculate tax and total
    const taxRate = 0.08; // 8%
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    
    // Update summary
    document.getElementById('subtotalAmount').textContent = `Rs. ${subtotal.toFixed(2)}`;
    document.getElementById('taxAmount').textContent = `Rs. ${tax.toFixed(2)}`;
    document.getElementById('totalAmount').textContent = `Rs. ${total.toFixed(2)}`;

    
}

// Update cart quantity
function updateCartQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('posCart')) || [];
    const itemIndex = cart.findIndex(item => item.proId == productId);
    
    if (itemIndex > -1) {
        const newQuantity = cart[itemIndex].quantity + change;
        
        if (newQuantity <= 0) {
            // Remove item if quantity becomes 0
            cart.splice(itemIndex, 1);
        } else {
            // Update quantity
            cart[itemIndex].quantity = newQuantity;
        }
        
        localStorage.setItem('posCart', JSON.stringify(cart));
        loadCartItems();
        showToast(`Quantity updated`);
    }
}

// Remove item from cart
function removeCartItem(productId) {
    let cart = JSON.parse(localStorage.getItem('posCart')) || [];
    cart = cart.filter(item => item.proId != productId);
    localStorage.setItem('posCart', JSON.stringify(cart));
    loadCartItems();
    showToast(`Item removed from cart`);
}

// Clear entire cart
function clearCart() {
    if (confirm('Are you sure you want to clear the cart?')) {
        localStorage.removeItem('posCart');
        loadCartItems();
        showToast('Cart cleared');
    }
}

// Process checkout
function processCheckout() {
    const cart = JSON.parse(localStorage.getItem('posCart')) || [];
    
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Calculate totals
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.proPrice * item.quantity;
    });
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

      // Get selected customer
    let customerSelect = document.getElementById('selectCustomer');
    let customerName = customerSelect ? customerSelect.value : 'Walk-in Customer';

     // Get current products to update stock
    const products = JSON.parse(localStorage.getItem('productData')) || [];
    
    // Check stock availability before proceeding
    let hasStockIssues = false;
    const stockIssues = [];
    
    cart.forEach(cartItem => {
        const product = products.find(p => p.proId == cartItem.proId);
        if (product) {
            if (product.proStock < cartItem.quantity) {
                hasStockIssues = true;
                stockIssues.push(`${product.proName}: Requested ${cartItem.quantity}, Available ${product.proStock}`);
            }
        } else {
            hasStockIssues = true;
            stockIssues.push(`Product ID ${cartItem.proId} not found`);
        }
    });
    
    if (hasStockIssues) {
        alert(`Stock issues:\n${stockIssues.join('\n')}`);
        return;
    }
    
    // Update product stock - DECREASE STOCK HERE
    const updatedProducts = products.map(product => {
        const cartItem = cart.find(item => item.proId == product.proId);
        if (cartItem) {
            // Decrease stock by purchased quantity
            const newStock = product.proStock - cartItem.quantity;
            return {
                ...product,
                proStock: Math.max(0, newStock) // Ensure stock doesn't go negative
            };
        }
        return product;
    });
    
    // Save updated products back to localStorage
    localStorage.setItem('productData', JSON.stringify(updatedProducts));
  
    // Create order object
    const order = {
        orderId: 'ORD' + Date.now(),
        orderNumber: 23,
        items: [...cart], // Clone cart items
        subtotal: subtotal,
        tax: tax,
        total: total,
        date: new Date().toLocaleString(),
        timestamp: new Date().getTime(),
        customer: customerName,
        status: 'completed',
        paymentMethod: 'Cash' 
    };
   
    // Save order to localStorage
    saveOrder(order);
     
    // Clear cart
    localStorage.removeItem('posCart');
  
    // Show success message
    showToast(`Order completed successfully!\nOrder ID: ${order.orderId}\nTotal: $${total.toFixed(2)}`);
    
    // Reload cart (will show empty)
    loadCartItems();
    
    // Show toast
    showToast('Order completed!');
    loadProducts();
    loadOrderHistory();
    
}

// Save order to history
function saveOrder(order) {
   
    // Get existing orders
    let orders = JSON.parse(localStorage.getItem('orderHistory')) || [];
    
    // Add order to beginning of array (most recent first)
    orders.unshift(order);
     
    // Keep only last 50 orders to prevent localStorage overflow
    if (orders.length > 50) {
        orders = orders.slice(0, 50);
    }
    
    // Save back to localStorage
    localStorage.setItem('orderHistory', JSON.stringify(orders));
 
    // Update order stats
   // updateOrderStats();
    
    return order;
}

// Show toast notification
function showToast(message) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create new toast
    const toast = document.createElement('div');
    toast.className = 'toast-notification fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Remove after 2 seconds
    setTimeout(() => {
        toast.remove();
    }, 2000);
}

// Update cart from input field
function updateCartInput(productId, newQuantity) {
    newQuantity = parseInt(newQuantity);
    if (isNaN(newQuantity) || newQuantity < 1) return;
    
    let cart = JSON.parse(localStorage.getItem('posCart')) || [];
    const itemIndex = cart.findIndex(item => item.proId == productId);
    
    if (itemIndex > -1) {
        cart[itemIndex].quantity = newQuantity;
        localStorage.setItem('posCart', JSON.stringify(cart));
        loadCartItems();
    }
}


    function addToCart(productId) {
    const quantity = 1;
    const products = JSON.parse(localStorage.getItem('productData')) || [];
    const product = products.find(p => p.proId == productId);
    
    if (!product) {
        alert('Product not found!');
        return false;
    }
    
    if (product.proStock < quantity) {
        alert(`Only ${product.proStock} items available in stock!`);
        return false;
    }
    
    let cart = JSON.parse(localStorage.getItem('posCart')) || [];
    const existingItemIndex = cart.findIndex(item => item.proId == productId);
    
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
        cart[existingItemIndex].total = cart[existingItemIndex].quantity * cart[existingItemIndex].proPrice;
    } else {
        cart.push({
            proId: product.proId,
            proName: product.proName,
            proPrice: parseFloat(product.proPrice),
            proCategory: product.proCategory,
            quantity: quantity,
            total: parseFloat(product.proPrice) * quantity
        });
    }
    
    localStorage.setItem('posCart', JSON.stringify(cart));

    
    showToast(`Added ${quantity} × ${product.proName} to cart!`);

    shoppingCartInterface();
   
}