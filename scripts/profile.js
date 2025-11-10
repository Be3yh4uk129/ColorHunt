(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = localStorage.getItem("loggedIn");

  if (!user || !isLoggedIn) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("fname").textContent = user.firstName;
  document.getElementById("lname").textContent = user.lastName;
  document.getElementById("email").textContent = user.email;

  document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("user");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("tempRecords");
    window.location.href = "login.html";
  });
})();
