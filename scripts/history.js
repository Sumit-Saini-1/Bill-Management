const tbody = document.getElementById("tbody");

fetch("/bill/allBills").then(function (response) {
    if (response.status == 200) {
        return response.json();
    }
}).then(function (bills) {
    // console.log(bills);
    bills.reverse().forEach(element => {
        showList(element);
    });
}).catch(function (err) {
    console.log(err);
});

function showList(bill) {
    const tr = document.createElement("tr");

    const invoiceNo = document.createElement("td");
    invoiceNo.innerText = bill.invoiceNo;
    tr.appendChild(invoiceNo);

    const customer = document.createElement("td");
    customer.innerText = bill.billdetails[0].customerName;
    tr.appendChild(customer);

    const grandTotal = document.createElement("td");
    grandTotal.innerText = bill.grandTotal.toFixed(2);
    tr.appendChild(grandTotal);

    const date = document.createElement("td");
    date.innerText = bill.date;
    tr.appendChild(date);

    const action = document.createElement("td");
    const button = document.createElement("a");
    button.innerText = "Download";
    button.className = "printbtn";
    button.href = "/bill/bill?invoiceNo=" + bill.invoiceNo;
    action.appendChild(button);

    tr.appendChild(action);

    tbody.appendChild(tr);
}