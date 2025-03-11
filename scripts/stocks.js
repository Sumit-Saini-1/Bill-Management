const $tbody = $('#tbody');
getStocks();

function getStocks() {
  $.ajax({
    url: '/product/products',
    method: 'GET',
    success: function (products) {
      products?.forEach(function (product) {
        showList(product);
      });
    },
    error: function (err) {
      console.log("Something went wrong", err);
    }
  });
}

function showList(product) {
  const $tr = $('<tr></tr>');

  const $productName = $('<td></td>').text(product?.name).attr('contenteditable', 'false');
  $tr.append($productName);

  const $HSNcode = $('<td></td>').text(product?.HSNcode).attr('contenteditable', 'false');
  $tr.append($HSNcode);

  const $price = $('<td></td>').text(product?.price).attr('contenteditable', 'false');
  $tr.append($price);

  const $gst = $('<td></td>').text(product?.gst).attr('contenteditable', 'false');
  $tr.append($gst);

  const $isActive = $('<td></td>');
  const $activeDropdown = $('<select disabled></select>')
    .append('<option value="true">Active</option>')
    .append('<option value="false">Inactive</option>')
    .val(product?.isActive?.toString());
  $isActive.append($activeDropdown);
  $tr.append($isActive);

  const $stock = $('<td></td>').text(product?.stock).attr('contenteditable', 'false');
  $tr.append($stock);

  const $editButton = $('<td><button>Edit</button></td>');
  $editButton.click(function () {
    toggleEdit($tr, product);
  });
  $tr.append($editButton);

  $tbody.append($tr);
}

function toggleEdit($tr, product) {
  const $cells = $tr.find('td');
  const isEditable = $cells.first().attr('contenteditable') === 'true';

  $cells.each(function (index) {
    $(this).attr('contenteditable', !isEditable);
  });

  const $activeDropdown = $tr.find('td').eq(4).find('select');
  $activeDropdown.prop('disabled', isEditable);

  const $button = $tr.find('button');
  if (isEditable) {
    $button.text('Edit');
    saveChanges($tr, product);
  } else {
    $button.text('Save');
  }
}

function saveChanges($tr, product) {
  const updatedProduct = {
    name: $tr.find('td').eq(0).text(),
    HSNcode: $tr.find('td').eq(1).text(),
    price: parseFloat($tr.find('td').eq(2).text()),
    gst: parseFloat($tr.find('td').eq(3).text()),
    isActive: $tr.find('td').eq(4).find('select').val() === 'true',
    stock: parseInt($tr.find('td').eq(5).text(), 10),
  };

  if (!updatedProduct.name || isNaN(updatedProduct.price) || isNaN(updatedProduct.gst) || isNaN(updatedProduct.stock)) {
    alert('Invalid product details');
    return;
  }

  $.ajax({
    url: `/product/products/${product._id}`,
    method: 'PUT',
    data: updatedProduct,
    success: function (response) {
      console.log('Product updated successfully:', response);
    },
    error: function (err) {
      console.log('Error updating product:', err);
    }
  });
}

// Handle Add New Product
$('#addProductBtn').click(function () {
  $('#newProductRow').toggle();
});

$('#saveProductBtn').click(function () {
  const newProduct = {
    name: $('#newName').text().trim(),
    HSNcode: $('#newHSNcode').text().trim(),
    price: parseFloat($('#newPrice').text()),
    gst: parseFloat($('#newGST').text()),
    isActive: $('#newIsActive').val() === 'true',
    stock: parseInt($('#newStock').text(), 10)
  };
  if (!newProduct.name || !newProduct.HSNcode || isNaN(newProduct.price) || isNaN(newProduct.gst) || isNaN(newProduct.stock)) {
    alert('Please enter valid product details.');
    return;
  }

  $.ajax({
    url: '/product/addProduct',
    method: 'POST',
    data: newProduct,
    success: function (response) {
      console.log('Product added successfully:', response);
      showList(response);
      $('#newProductRow').hide();
      $('#newProductRow input').val('');
    },
    error: function (err) {
      console.log('Error adding product:', err);
    }
  });
});
