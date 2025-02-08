const tbody = document.getElementById("tbody");

fetch("/product/products").then(response => {
    if (response.status == 200) {
        return response.json();
    }
    else {
        console.log("something wrong");
    }
}).then(products => {
    products.map(v => {
        addProductToTable(v);
    })
})

function addProductToTable(product) {
    const tr = document.createElement("tr");

    const productID = document.createElement("td");
    productID.innerText = product._id;
    tr.appendChild(productID);

    const productName = document.createElement("td");
    productName.innerText = product.name;
    productName.contentEditable = true;
    productName.addEventListener('blur', (ev) => {
        if (product.name != ev.target.innerText) {
            product.name = ev.target.innerText;
            updateProduct(product);
        }
    });
    tr.appendChild(productName);

    const HSNcode = document.createElement("td");
    HSNcode.innerText = product.HSNcode;
    HSNcode.contentEditable = true;
    HSNcode.addEventListener('blur', (ev) => {
        if (product.HSNcode != ev.target.innerText) {
            product.HSNcode = ev.target.innerText;
            updateProduct(product);
        }
    });
    tr.appendChild(HSNcode);

    const price = document.createElement("td");
    price.innerText = product.price;
    price.contentEditable = true;
    price.addEventListener('blur', (ev) => {
        if (product.price != ev.target.innerText) {
            product.price = ev.target.innerText;
            updateProduct(product);
        }
    });
    tr.appendChild(price);

    const gst = document.createElement("td");
    gst.innerText = product.gst;
    gst.contentEditable = true;
    gst.addEventListener('blur', (ev) => {
        if (product.gst != ev.target.innerText) {
            product.gst = ev.target.innerText;
            updateProduct(product);
        }
    });
    tr.appendChild(gst);

    tbody.appendChild(tr);
}

function updateProduct(product) {
    fetch('/product/update', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ product })
    }).then(response => {
        if (response.status == 200) {
            alert('updated');
        }
        else {
            console.log('something wrong');
        }
    }).catch(err => {
        console.log(err);
    })
}