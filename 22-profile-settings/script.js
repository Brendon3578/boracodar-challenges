const userPhotoInputEl = document.getElementById("user-photo-input");
const settingsUserImageEl = document.getElementById("settings-user-image");

userPhotoInputEl.addEventListener("change", () => {
  if (userPhotoInputEl.files && userPhotoInputEl.files[0]) {
    settingsUserImageEl.src = URL.createObjectURL(userPhotoInputEl.files[0]);
    settingsUserImageEl.onload = () => {
      URL.revokeObjectURL(settingsUserImageEl.src);
    };
  }
});
