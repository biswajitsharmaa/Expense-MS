var count = 1;

//when user click add  item button
function addItem(event) {
  var name = document.getElementById("item-name").value.toUpperCase();
  var quantity = document.getElementById("item-quantity").value;
  var price = document.getElementById("item-price").value;
  var total = quantity * price;
  var tableContainer = document.getElementById("table-container");

  //checking if the name is empty or not
  if (name == "") {
    alert("Please enter item-name");
    return false;
  }

  //checking if the quantity field is empty or not min value
  if (quantity == "" || quantity < 1) {
    alert("Please enter quantity(minimum value permitted is 1)");
    return false;
  }

  //checking if the price field is empty of not
  if (price === "" || price < 0) {
    alert("Please enter price-per-item");
    return false;
  }

  //calculating the total value
  var total = quantity * price;

  //when item entered then only the table will be visible
  tableContainer.style.visibility = "visible";

  total = total.toFixed(2);

  //appending a new table with the passed data
  $("#data-table").append(`<tr>
  <th class="count" scope="row">${count++}</th>
  <td>${name}</td>
  <td>${price}</td>
  <td>${quantity}</td>
  <td>${total}</td>
  <td>
    <button type="button" class="btn btn-outline-danger btn-sm del-button">
      Delete
    </button>
  </td>
</tr>`);
  displaySerialAfterDelete();
  //updating the grand total
  displayGrandTotal();

  //clearing the input fields
  fieldClear();
}

//using jQuery to delete the table row
$(document).on("click", ".del-button", function () {
  //removing the row when delete button is clicked
  $(this).closest("tr").remove();

  //if not data is there than make the table invisible
  checkRow();

  //calculating the grand total after delete
  displayGrandTotal();

  //making the grand total visible
  grandTotalVisible();

  //fixing serial number after  the deletion of the row
  displaySerialAfterDelete();
  return false;
});

//for displaying the grand total of the items
function displayGrandTotal() {
  var sum = 0.0;
  const table = document.getElementById("data-table");
  const tableRow = table.rows.length;
  for (let i = 1; i < tableRow; i++) {
    var data = table.rows[i].cells[4].innerHTML;
    var integerForm = parseFloat(data);
    sum = sum + integerForm;
  }
  sum = sum.toFixed(2);
  removeGrandTotal();
  $("#grand-total-div")
    .append(`<table class="table" id="total"><thead class="thead-light">
  <tr>
    
    <th colspan='5' style='text-align:left;'scope="col">Grand Total</th>
    <th scope="col">Rs.    ${sum}</th></table>
  </tr>
</thead>`);
  grandTotalVisible();
}

//first the previous grand-total is deleted before the updated grand total
function removeGrandTotal() {
  let element = document.getElementById("grand-total-div");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
//correct the order of serial number of items
function displaySerialAfterDelete() {
  const table = document.getElementById("data-table");
  const tableRow = table.rows.length;
  for (let i = 1; i < tableRow; i++) {
    table.rows[i].cells[0].innerHTML = "" + i;
  }
  //making to serialize the row properly
}

//if after deletion only the thead remains then the table will not be visible
function checkRow() {
  var table = document.getElementById("data-table");
  var nrow = table.rows.length;
  if (nrow >= 2) {
    table.style.visibility = "visible";
    return true;
  } else {
    table.style.visibility = "hidden";
    return false;
  }
}

//clear fields after
function fieldClear() {
  const inputField = document.querySelectorAll("input");
  inputField.forEach((input) => (input.value = ""));
}

//making the grand-total visible when atleast one item is there in the table
function grandTotalVisible() {
  const grandTotalDiv = document.getElementById("grand-total-div");
  if (checkRow()) {
    grandTotalDiv.style.visibility = "visible";
  } else grandTotalDiv.style.visibility = "hidden";
}
