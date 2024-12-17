const API_URL = 'https://script.google.com/macros/s/AKfycbwLKYJrIcma-i0uAEKgR0Gj7ricX7y6tObnq7-lqbylAr3Oy-_XeqX3SNk-IN1R09L0rQ/exec'; // Replace with your deployed Apps Script URL.

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  if (form) {
    form.addEventListener('submit', loginUser);
  }
});

//function loginUser(e) {
 // e.preventDefault();
  //const username = document.getElementById('username').value;
 // const password = document.getElementById('password').value;

 // fetch(`${API_URL}?action=login&username=${username}&password=${password}`, { method: 'POST' })
 //   .then(res => res.json())
  //  .then(data => {
 //     if (data.success) {
 //       const page = data.userType === 'Customer' ? 'customer.html' : 'staff.html';
 //       localStorage.setItem('username', username);
  //      window.location.href = page;
 //     } else {
//        document.getElementById('error').innerText = data.error;
//      }
//    });
//}

function loginUser(event) {
  event.preventDefault();
  
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const url = "https://script.google.com/macros/s/AKfycbwLKYJrIcma-i0uAEKgR0Gj7ricX7y6tObnq7-lqbylAr3Oy-_XeqX3SNk-IN1R09L0rQ/exec?action=login&username=" 
              + encodeURIComponent(username) 
              + "&password=" 
              + encodeURIComponent(password);

  fetch(url, {
    method: "GET",
  })
  .then(response => {
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  })
  .then(data => {
    if (data.success) {
      alert("Login Successful! User type: " + data.userType);
      // Redirect based on userType
      window.location.href = data.userType === "Customer" ? "customer.html" : "staff.html";
    } else {
      alert(data.message);
    }
  })
  .catch(error => {
    console.error("Error:", error);
    alert("An error occurred. Please try again later.");
  });
}

function showOffers() {
  fetch(`${API_URL}?action=offers`, { method: 'POST' })
    .then(res => res.json())
    .then(data => document.getElementById('offers').innerText = data.offers);
}

function fetchLedger() {
  const username = localStorage.getItem('username');
  const ledgerType = document.getElementById('ledgerType').value;

  fetch(`${API_URL}?action=ledger&username=${username}&type=${ledgerType}`, { method: 'POST' })
    .then(res => res.json())
    .then(data => updateTable('ledgerTable', data.data));
}

function fetchCompanyStock() {
  const company = document.getElementById('companyDropdown').value;
  fetch(`${API_URL}?action=company&company=${company}`, { method: 'POST' })
    .then(res => res.json())
    .then(data => updateTable('companyTable', data.data));
}

function updateTable(tableId, data) {
  const table = document.getElementById(tableId);
  table.innerHTML = '';
  data.forEach(row => {
    const tr = document.createElement('tr');
    row.forEach(cell => {
      const td = document.createElement('td');
      td.innerText = cell;
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });
}
