const API_URL = 'https://script.google.com/macros/s/AKfycbyo8de87noHTvVg5e4Pp-y4MNe-fDLVFGW_mQS5FD375fRUZgpDD5wRRbR5kMyswV7l2A/exec'; // Replace with your deployed Apps Script URL.

//document.addEventListener('DOMContentLoaded', () => {
//  const form = document.getElementById('loginForm');
//  if (form) {
//    form.addEventListener('submit', loginUser);
//  }
//});
document.getElementById("loginForm").addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent form submission

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const url = `https://script.google.com/macros/s/AKfycbyo8de87noHTvVg5e4Pp-y4MNe-fDLVFGW_mQS5FD375fRUZgpDD5wRRbR5kMyswV7l2A/exec?action=login&username=${username}&password=${password}`;

  try {
    const response = await fetch(url, {
      method: "GET",
    });

    const data = await response.json();

    if (data.success) {
      if (data.userType === "Customer") {
        window.location.href = "customer.html";
      } else if (data.userType === "Staff") {
        window.location.href = "staff.html";
      } else {
        alert("Unknown user type. Please contact support.");
      }
    } else {
      alert(data.message); // Show error message (e.g., "Enter correct password")
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again.");
  }
});


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
