const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

// LOGIN
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Save the full user object, not just email
      localStorage.setItem("loggedInUser", JSON.stringify(data.user));
      window.location.href = "expense.html";
    } else {
      alert(data.message || "Invalid login credentials");
    }
  });
}

// SIGNUP
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();

    const response = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Signup successful! You can now log in.");
      window.location.href = "auth.html";
    } else {
      alert(data.message || "Signup failed");
    }
  });
}
