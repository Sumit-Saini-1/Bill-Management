const tbody = $("#tbody");

$.get("/bill/allBills").done(function (bills) {
    // console.log(bills);
    bills.reverse().forEach(function (bill) {
        showList(bill);
    });
}).fail(function (err) {
    console.log(err);
});

function showList(bill) {
    const tr = $("<tr></tr>");

    const invoiceNo = $("<td></td>").text(bill.invoiceNo);
    tr.append(invoiceNo);

    const customer = $("<td></td>").text(bill.billdetails[0].customerName);
    tr.append(customer);

    const grandTotal = $("<td></td>").text(bill.grandTotal.toFixed(2));
    tr.append(grandTotal);

    const date = $("<td></td>").text(bill.date);
    tr.append(date);

    const action = $("<td></td>");
    const button = $("<a></a>").text("Download")
        .addClass("printbtn")
        .attr("href", "/bill/bill?invoiceNo=" + bill.invoiceNo);
    action.append(button);

    tr.append(action);

    tbody.append(tr);
}
