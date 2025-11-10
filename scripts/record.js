document.addEventListener("DOMContentLoaded", () => {
  const recordsList = document.getElementById("recordsList");
  const searchInput = document.getElementById("searchInput");
  const tempRecords = JSON.parse(localStorage.getItem("tempRecords")) || [];

  console.log(" Загружены временные рекорды:", tempRecords);
  tempRecords.forEach((r) => {
    const div = document.createElement("div");
    div.classList.add("record-item");
    div.innerHTML = `
      <span class="record-name">${r.name}</span>
      <span class="record-score">${r.score}</span>
    `;
    recordsList.appendChild(div);
  });

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const items = recordsList.querySelectorAll(".record-item");

    items.forEach((item) => {
      const name = item
        .querySelector(".record-name")
        .textContent.toLowerCase();
      item.style.display = name.includes(query) ? "flex" : "none";
    });
  });
});
