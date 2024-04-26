const tbody=document.getElementById("tbody");
const billDiv=document.getElementById("billDiv");

fetch("/allBills").then(function(response){
    if(response.status==200){
        return response.json();
    }
}).then(function(bills){
    // console.log(bills);
    bills.reverse().forEach(element => {
        showList(element);
    });
}).catch(function(err){
    console.log(err);
});

function showList(bill){
    const tr=document.createElement("tr");

    const invoiceNo=document.createElement("td");
    invoiceNo.innerText=bill.invoiceNo;
    tr.appendChild(invoiceNo);

    const customer=document.createElement("td");
    customer.innerText=bill.billdetails[0].customerName;
    tr.appendChild(customer);

    const grandTotal=document.createElement("td");
    grandTotal.innerText=bill.grandTotal.toFixed(2);
    tr.appendChild(grandTotal);

    const date=document.createElement("td");
    date.innerText=bill.date;
    tr.appendChild(date);

    const action=document.createElement("td");
    const button=document.createElement("button");
    button.innerText="Print";
    button.className="printbtn";
    button.addEventListener("click",function(ev){
        showBill(bill);
        billDiv.style.display="block";
        print();
        billDiv.style.display="none";
    })
    action.appendChild(button);

    tr.appendChild(action);

    tbody.appendChild(tr);
}

function showBill(bill){
    customerNameBill.innerText=bill.billdetails[0].customerName;
    customerNameShipped.innerText=bill.billdetails[0].customerName;
    customerAddressBill.innerText=bill.billdetails[0].customerAddress;
    customerAddressShipped.innerText=bill.billdetails[0].customerAddress;
    customerDistrictBill.innerText=bill.billdetails[0].customerDistrict;
    customerDistrictShipped.innerText=bill.billdetails[0].customerDistrict;
    customerStateBill.innerText=bill.billdetails[0].customerState;
    customerStateShipped.innerText=bill.billdetails[0].customerState;
    customerGSTINBill.innerText=bill.billdetails[0].customerGSTIN;
    customerGSTINShipped.innerText=bill.billdetails[0].customerGSTIN;
    transportBill.innerText=bill.billdetails[0].transportBill;
    vehicleNoBill.innerText=bill.billdetails[0].vehicleNoBill;

    invoiceNo.innerText=bill.invoiceNo;
    date.innerText=bill.date;
    
    bill.billItems.forEach(value=>{
        $("#billTable tbody").append(
            `<tr>
                <td>${value.srNo}</td>
                <td>${value.name}</td>
                <td>${value.HSNcode}</td>
                <td>${value.quantity}</td>
                <td></td>
                <td>${value.price}</td>
                <td></td>
                <td>${value.gst}</td>
                <td>${value.gstAmt}</td>
                <td>${value.amount}</td>
            </tr>`
        );
    });
    $('#grandTotal').text((bill.grandTotal).toFixed(2));
}

