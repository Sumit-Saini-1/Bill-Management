const customerName = document.getElementById("customerName");
const customerAddress = document.getElementById("customerAddress");
const customerCity = document.getElementById("customerCity");
const customerDistrict = document.getElementById("customerDistrict");
const customerState = document.getElementById("customerState");
const customerPincode = document.getElementById("customerPincode");
const customerGSTIN = document.getElementById("customerGSTIN");
const transport = document.getElementById("transport");
const VehicleNo = document.getElementById("VehicleNo");

const item = document.getElementById("item");
const price = document.getElementById("price");

customerName.addEventListener("change", function (ev) {
    customerNameBill.innerText = customerName.value.trim();
    customerNameShipped.innerText = customerName.value.trim();
});

customerAddress.addEventListener("change", function (ev) {
    customerAddressBill.innerText = customerAddress.value.trim();
    customerAddressShipped.innerText = customerAddress.value.trim();
});

customerCity.addEventListener("change", function (ev) {
    // customerAddressBill.innerText=customerCity.value.trim();
    // customerCityShipped.innerText=customerCity.value.trim();
});

customerDistrict.addEventListener("change", function (ev) {
    customerDistrictBill.innerText = customerDistrict.value.trim();
    customerDistrictShipped.innerText = customerDistrict.value.trim();
});

customerState.addEventListener("change", function (ev) {
    customerStateBill.innerText = customerState.value.trim();
    customerStateShipped.innerText = customerState.value.trim();
});

customerPincode.addEventListener("change", function (ev) {
    // customerStateBill.innerText=customerPincode.value.trim();
    // customerStateShipped.innerText=customerPincode.value.trim();
});

customerGSTIN.addEventListener("change", function (ev) {
    customerGSTINBill.innerText = customerGSTIN.value.trim();
    customerGSTINShipped.innerText = customerGSTIN.value.trim();
});

transport.addEventListener("change", function (ev) {
    transportBill.innerText = transport.value.trim();
});
VehicleNo.addEventListener("change", function (ev) {
    vehicleNoBill.innerText = VehicleNo.value.trim();
});

item.addEventListener("input", (ev) => {
    const selected = productsList.filter(t => t.name == $('#item').val());
    if (selected[0]) {
        price.value = selected[0].price;
    }
})


let productsList = [];
let i = 0;

const bill = {
    invoiceNo: "String",
    billdetails: [],
    billItems: [],
    grandTotal: 0,
    date: new Date().toLocaleDateString(),
}

function getInvoiceNo() {
    fetch("/invoiceNo").then(function (response) {
        if (response.status == 200) {
            return response.json();
        }
    }).then(function (invoiceNo) {
        bill.invoiceNo = invoiceNo.invoiceNo;
        $('#invoiceNo').text(invoiceNo.invoiceNo);
    }).catch(function (err) {
        console.log("something went wrong");
    });
}

fetch("/products").then(function (response) {
    if (response.status == 200) {
        return response.json();
    }
    else {
        console.log("something went wrong");
    }
}).then(function (products) {
    productsList = products;
    createDatalist(productsList)
}).catch(function (err) {
    console.log(err);
})

const addBtn = $('#addItem')
addBtn.click((e) => {
    if ($('#item').val() == "") {
        alert("plese enter product name");
        return;
    }
    if (!$('#quantity').val()) {
        alert("plese enter quantity");
        return;
    }
    if (!$('#price').val()) {
        alert("please enter price");
        return;
    }
    const item = productsList.filter(t => t.name == $('#item').val());
    if (item[0]) {
        item[0].srNo = ++i;
        item[0].quantity = $('#quantity').val();
        item[0].price = $('#price').val();
        insertRow(item[0]);
    }

    $('#item').val("");
    $('#quantity').val("");
    $('#price').val(0);
});

function insertRow(data) {
    const gstAmt = data.price * data.quantity * data.gst / 100;
    const amount = data.price * data.quantity + gstAmt;
    data.gstAmt = gstAmt.toFixed(2);
    data.amount = amount.toFixed(2);
    bill.grandTotal = bill.grandTotal + amount;
    $("#billTable tbody").append(
        `<tr>
            <td>${data.srNo}</td>
            <td>${data.name}</td>
            <td>${data.HSNcode}</td>
            <td>${data.quantity}</td>
            <td></td>
            <td>${data.price}</td>
            <td></td>
            <td>${data.gst}</td>
            <td>${gstAmt.toFixed(2)}</td>
            <td>${amount.toFixed(2)}</td>
        </tr>`
    )
    $('#grandTotal').text(bill.grandTotal.toFixed(2));
    bill.billItems.push(data);
}

function createDatalist(array) {
    const arr = array.map((val, index) => {
        return $op = $("<option>", { id: index, "class": "option", "value": val.name });
    })
    $("#itemsuggestions").append(arr)
}

getInvoiceNo();

const savebtn = $('#saveBill');
savebtn.click((ev) => {
    let filename;
    const billdetails = {
        customerName: customerName.value.trim(),
        customerAddress: customerAddress.value.trim(),
        customerDistrict: customerDistrict.value.trim(),
        customerState: customerState.value.trim(),
        customerGSTIN: customerGSTIN.value.trim(),
        transportBill: transport.value.trim(),
        vehicleNoBill: VehicleNo.value.trim()
    }
    if (!billdetails.customerName) {
        alert("enter customer detail");
        return;
    }
    if (!billdetails.customerAddress) {
        alert("Enter customer address");
        return;
    }
    if (!billdetails.customerDistrict) {
        alert("Enter customer district");
        return;
    }
    if (!billdetails.customerState) {
        alert("Enter customer state");
        return;
    }
    bill.billdetails.push(billdetails);
    if (!bill.billItems[0]) {
        alert("Enter atleast one item");
        return;
    }
    fetch("/newBill", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bill)
    }).then(function (response) {
        if (response.status == 200) {
            console.log("saved");
            const contentDisposition = response.headers.get('Content-Disposition');
            filename = getFilenameFromContentDisposition(contentDisposition);
            return response.blob();
        }
    }).then(pdf => {
        // console.log(pdf);
        const pdfURL = URL.createObjectURL(pdf);
        const anchor = document.createElement('a');
        anchor.style.display = 'none';
        anchor.href = pdfURL;
        anchor.download = filename || 'bill.pdf';

        document.body.appendChild(anchor);
        anchor.click();

        setTimeout(() => {
            window.URL.revokeObjectURL(pdfURL);
            document.body.removeChild(anchor);
            print();
            window.location.reload();
        }, 0);
    });
})

$("#newBill").click(ev => {
    window.location.reload();
})

function getFilenameFromContentDisposition(contentDisposition) {
    const match = contentDisposition.match(/filename="(.+?)"/);
    if (match && match[1]) {
        return match[1];
    }
    return null;
}