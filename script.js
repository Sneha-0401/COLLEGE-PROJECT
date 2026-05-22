let vendors = JSON.parse(localStorage.getItem("vendors")) || [];
let purchases = JSON.parse(localStorage.getItem("purchases")) || [];

function saveData() {
    localStorage.setItem("vendors", JSON.stringify(vendors));
    localStorage.setItem("purchases", JSON.stringify(purchases));
}

function addVendor() {
    vendors.push({
        id: Date.now(),
        name: vname.value,
        email: vemail.value
    });
    saveData();
    loadVendors();
}

function loadVendors() {
    if (!vendorTable) return;
    vendorTable.innerHTML = "";
    vendors.forEach(v => {
        vendorTable.innerHTML += `
        <tr>
            <td>${v.id}</td>
            <td>${v.name}</td>
            <td>${v.email}</td>
            <td><button onclick="deleteVendor(${v.id})">Delete</button></td>
        </tr>`;
    });
}

function deleteVendor(id) {
    vendors = vendors.filter(v => v.id !== id);
    purchases = purchases.filter(p => p.vendorId !== id);
    saveData();
    loadVendors();
}

function loadVendorDropdown() {
    vendorSelect.innerHTML = "";
    vendors.forEach(v => {
        vendorSelect.innerHTML += `<option value="${v.id}">${v.name}</option>`;
    });
}

function addPurchase() {
    purchases.push({
        id: Date.now(),
        vendorId: vendorSelect.value,
        product: product.value,
        amount: amount.value
    });
    saveData();
    loadPurchases();
}

function loadPurchases() {
    if (!purchaseTable) return;
    purchaseTable.innerHTML = "";
    purchases.forEach(p => {
        let v = vendors.find(x => x.id == p.vendorId);
        purchaseTable.innerHTML += `
        <tr>
            <td>${p.id}</td>
            <td>${v ? v.name : "Deleted"}</td>
            <td>${p.product}</td>
            <td>${p.amount}</td>
            <td><button onclick="deletePurchase(${p.id})">Delete</button></td>
        </tr>`;
    });
}

function deletePurchase(id) {
    purchases = purchases.filter(p => p.id !== id);
    saveData();
    loadPurchases();
}

function loadReports() {
    reportTable.innerHTML = "";
    vendors.forEach(v => {
        let total = purchases
            .filter(p => p.vendorId == v.id)
            .reduce((sum, p) => sum + Number(p.amount), 0);

        reportTable.innerHTML += `
        <tr>
            <td>${v.name}</td>
            <td>${total}</td>
        </tr>`;
    });
}