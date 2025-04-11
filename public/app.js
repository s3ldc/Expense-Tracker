const form = document.getElementById("expense-form");
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const expenseList = document.getElementById("expense-list");
const totalAmount = document.getElementById("total-amount");
const transactionCount = document.getElementById("transaction-count");

let expenses = [];

const categoryColors = {
  Food: "bg-success-subtle text-success",
  Transport: "bg-info-subtle text-info",
  Housing: "bg-primary-subtle text-primary",
  Entertainment: "bg-warning-subtle text-warning",
  Utilities: "bg-secondary-subtle text-secondary",
  Miscellaneous: "bg-light text-dark border"
};

// Ensure user is logged in
const loggedInUser = localStorage.getItem("loggedInUser");
if (!loggedInUser) {
  window.location.href = "auth.html";
}

const user = JSON.parse(loggedInUser);

// Fetch expenses from the backend
function loadExpenses() {
  fetch(`/api/expenses/${encodeURIComponent(user.email)}`)
    .then((res) => res.json())
    .then((data) => {
      expenses = data;
      renderExpenses();
    })
    .catch((err) => {
      console.error("Failed to load expenses:", err);
    });
}

// Initial load
loadExpenses();

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const category = categoryInput.value;

  if (!name || !amount || !category) return;

  const expense = {
    userEmail: user.email,
    name,
    amount,
    category,
  };

  // Send to server
  fetch("/api/expenses/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Expense added:", data);
      loadExpenses(); // This will fetch and re-render

      // Clear input fields
      nameInput.value = "";
      amountInput.value = "";
      categoryInput.value = "";
    })
    .catch((err) => {
      console.error("Failed to add expense:", err);
    });
});


function renderExpenses() {
  expenseList.innerHTML = "";
  let total = 0;
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  let monthlyTransactionCount = 0;

  expenses.forEach((exp) => {
    const expDateParts = exp.date.split(" "); // e.g., ["11", "Apr"]
    const expDate = new Date(`${expDateParts[1]} ${expDateParts[0]}, ${new Date().getFullYear()}`);    
    const isThisMonth =
      expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear;

    if (isThisMonth) {
      monthlyTransactionCount++;
    }

    total += parseFloat(exp.amount);

    // Fallback for missing or invalid date
    const formattedDate = !exp.date || isNaN(expDate)
      ? new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric" })
      : expDate.toLocaleDateString("en-IN", { month: "short", day: "numeric" });

    const item = document.createElement("div");
    item.className = "list-group-item list-group-item-action d-flex justify-content-between align-items-center";

    const left = document.createElement("div");
    const title = document.createElement("div");
    title.className = "fw-medium";
    title.textContent = exp.name;

    const sub = document.createElement("small");
    sub.className = "text-muted";
    sub.textContent = `${formattedDate} • ${exp.category}`;

    left.appendChild(title);
    left.appendChild(sub);

    const right = document.createElement("div");
    right.className = "d-flex align-items-center gap-3";

    const amt = document.createElement("div");
    amt.className = "fw-bold text-dark";
    amt.textContent = `₹${parseFloat(exp.amount).toFixed(2)}`;

    const badge = document.createElement("span");
    badge.className = `badge badge-category rounded-pill ${categoryColors[exp.category] || "bg-light"}`;
    badge.textContent = exp.category[0];

    const delBtn = document.createElement("button");
    delBtn.className = "btn btn-sm btn-outline-danger";
    delBtn.innerHTML = "🗑️";
    delBtn.onclick = () => {
      fetch(`/api/expenses/${exp.id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Deleted from DB:", data);
          expenses = expenses.filter((e) => e.id !== exp.id);
          renderExpenses();
        })
        .catch((err) => {
          console.error("Failed to delete:", err);
        });
    };

    right.appendChild(badge);
    right.appendChild(amt);
    right.appendChild(delBtn);

    item.appendChild(left);
    item.appendChild(right);

    expenseList.appendChild(item);
  });

  totalAmount.textContent = `₹${parseFloat(total || 0).toFixed(2)}`;
  transactionCount.textContent = `${monthlyTransactionCount} transaction${monthlyTransactionCount !== 1 ? "s" : ""} this month`;
}




function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "auth.html";
}
