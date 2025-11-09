const backButton = document.querySelector(".back-button");
if (backButton) backButton.onclick = () => (window.location.href = "index.html");
(() => {
  const form = document.querySelector(".needs-validation");
  if (!form) return;

  const email = document.getElementById("email");
  const password = document.getElementById("password");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const stored = JSON.parse(localStorage.getItem("user"));
    if (!stored) {
      alert("No account found. Please sign up first.");
      return;
    }

    if (
      email.value.trim().toLowerCase() === stored.email &&
      password.value === stored.password
    ) {
      localStorage.setItem("loggedIn", "true");
      window.location.href = "profile.html";
    } else {
      const msg = document.createElement("div");
      msg.className = "text-danger mt-2";
      msg.textContent = "Incorrect email or password";
      if (!form.querySelector(".text-danger")) form.appendChild(msg);
    }
  });
})();
