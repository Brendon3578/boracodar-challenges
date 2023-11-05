const configurationsPanel = document.getElementById("configurations");
const toggleCheckbox = document.getElementById("toggle-configurations");

function toggleConfigurationsPanel(checked) {
  if (checked) {
    configurationsPanel.classList.remove("hidden");
    configurationsPanel.style.maxWidth = configurationsPanel.scrollWidth + "px";
  } else {
    configurationsPanel.classList.add("hidden");
    configurationsPanel.style.maxWidth = null;
  }
}

toggleConfigurationsPanel(toggleCheckbox.checked);

toggleCheckbox.addEventListener("change", () => {
  toggleConfigurationsPanel(toggleCheckbox.checked);
});
