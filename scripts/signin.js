const backButton = document.querySelector(".back-button");
if (backButton) {
  backButton.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

(() => {
  const form = document.querySelector(".needs-validation");
  if (!form) return;

  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // только email-проверка

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    if (!emailRegex.test(email.value)) {
      email.setCustomValidity("Invalid email format");
      valid = false;
    } else {
      email.setCustomValidity("");
    }

    if (password.value.length < 6) {
      password.setCustomValidity("Password must be at least 6 characters");
      valid = false;
    } else {
      password.setCustomValidity("");
    }

    if (password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity("Passwords do not match");
      valid = false;
    } else {
      confirmPassword.setCustomValidity("");
    }

    form.classList.add("was-validated");

    if (!valid || !form.checkValidity()) return;

    const user = {
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      email: email.value.trim().toLowerCase(),
      password: password.value,
    };

    localStorage.setItem("user", JSON.stringify(user));
    alert("Registration successful! You can now log in.");
    window.location.href = "login.html";
  });
})();
