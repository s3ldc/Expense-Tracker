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

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const category = categoryInput.value;

  if (!name || !amount || !category) return;

  const expense = {
    id: Date.now().toString(),
    name,
    amount,
    category,
    date: new Date().toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric"
    })
  };

  expenses.push(expense);
  renderExpenses();

  nameInput.value = "";
  amountInput.value = "";
  categoryInput.value = "";
});

function renderExpenses() {
  expenseList.innerHTML = "";
  let total = 0;

  expenses.forEach((exp) => {
    total += exp.amount;

    const item = document.createElement("div");
    item.className = "list-group-item list-group-item-action d-flex justify-content-between align-items-center";

    const left = document.createElement("div");
    const title = document.createElement("div");
    title.className = "fw-medium";
    title.textContent = exp.name;

    const sub = document.createElement("small");
    sub.className = "text-muted";
    sub.textContent = `${exp.date} • ${exp.category}`;

    left.appendChild(title);
    left.appendChild(sub);

    const right = document.createElement("div");
    right.className = "d-flex align-items-center gap-3";

    const amt = document.createElement("div");
    amt.className = "fw-bold text-dark";
    amt.textContent = `₹${exp.amount.toFixed(2)}`;

    const badge = document.createElement("span");
    badge.className = `badge badge-category rounded-pill ${categoryColors[exp.category] || "bg-light"}`;
    badge.textContent = exp.category[0];

    const delBtn = document.createElement("button");
    delBtn.className = "btn btn-sm btn-outline-danger";
    delBtn.innerHTML = "🗑️";
    delBtn.onclick = () => {
      expenses = expenses.filter((e) => e.id !== exp.id);
      renderExpenses();
    };

    right.appendChild(badge);
    right.appendChild(amt);
    right.appendChild(delBtn);

    item.appendChild(left);
    item.appendChild(right);

    expenseList.appendChild(item);
  });

  totalAmount.textContent = `₹${total.toFixed(2)}`;
  transactionCount.textContent = `${expenses.length} transaction${expenses.length !== 1 ? "s" : ""} this month`;
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "auth.html";
}
