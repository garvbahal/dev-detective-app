const idName = document.querySelector("[data-name]");
const joinDate = document.querySelector("[data-joinDate]");
const gitLink = document.querySelector("[data-gitLink]");
const aboutContainer = document.querySelector("[data-about]");
const reposNumber = document.querySelector("[data-repos]");
const followers = document.querySelector("[data-followers]");
const following = document.querySelector("[data-following]");
const locationUser = document.querySelector("[data-location]");
const websiteUser = document.querySelector("[data-website]");
const twitterUser = document.querySelector("[data-userTwitter]");
const companyUser = document.querySelector("[data-company]");
const userImage = document.querySelector("[data-userImage]");
const errorShow = document.querySelector(".error-handling-form");
const root = document.documentElement.style;
const formContainer = document.querySelector(".search-container");
const formInput = document.querySelector("[data-formInput]");

const darkModeBtn = document.querySelector(".dark-mode-btn");
const darkModePara = document.querySelector("[data-darkModePara]");
const darkModeImg = document.querySelector("[data-darkModeImg]");

const wrapper = document.querySelector(".wrapper");
const contentContainer = document.querySelector(".content-container");
const followingContainer = document.querySelector(".following-container");
const labelInfoFollowing = document.querySelector(".label-info-following");
const iconImages = document.querySelectorAll(".icon-images");

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let currentUser = "garvbahal";
let darkMode = true;
darkModePara.innerText = "LIGHT";
darkModeImg.src = "./assets/images/sun-icon.svg";

darkModeBtn.addEventListener("click", () => {
  handleDarkMode();
});

function handleDarkMode() {
  if (darkMode === true) {
    darkMode = false;
    darkModePara.innerText = "DARK";
    wrapper.classList.add("lightMode");
    formContainer.classList.add("lightMode");
    contentContainer.classList.add("lightMode");
    idName.classList.add("lightMode");
    followingContainer.classList.add("lightMode");
    labelInfoFollowing.classList.add("lightMode");
    iconImages.forEach((img) => {
      img.classList.add("lightMode");
    });
    locationUser.classList.add("lightMode");
    companyUser.classList.add("lightMode");
    websiteUser.classList.add("lightMode");
    twitterUser.classList.add("lightMode");
    root.setProperty("--input-place", "#4b6a9b");
    darkModeImg.src = "./assets/images/moon-icon.svg";
  } else {
    darkMode = true;
    darkModePara.innerText = "LIGHT";
    darkModeImg.src = "./assets/images/sun-icon.svg";
    wrapper.classList.remove("lightMode");
    formContainer.classList.remove("lightMode");
    contentContainer.classList.remove("lightMode");
    idName.classList.remove("lightMode");
    followingContainer.classList.remove("lightMode");
    labelInfoFollowing.classList.remove("lightMode");
    iconImages.forEach((img) => {
      img.classList.remove("lightMode");
    });
    locationUser.classList.remove("lightMode");
    companyUser.classList.remove("lightMode");
    websiteUser.classList.remove("lightMode");
    twitterUser.classList.remove("lightMode");
    root.setProperty("--input-place", "#fff");
  }
}

fetchUserData();

async function fetchUserData() {
  try {
    const response = await fetch(`https://api.github.com/users/${currentUser}`);
    if (!response.ok) {
      throw new Error("Error comes here");
    }
    const data = await response.json();

    renderData(data);
  } catch (err) {
    errorShow.classList.add("active");
  }
}

function renderData(data) {
  userImage.src = data?.avatar_url;
  idName.innerText = data?.name !== null ? data?.name : `${data?.login}`;

  let dateElements = data?.created_at.split("T").shift().split("-");

  joinDate.innerText = `Joined ${dateElements[2]} ${months[dateElements[1]-1]} ${dateElements[0]}`;
  gitLink.href = data?.html_url;
  gitLink.innerText = `@${currentUser}`;
  aboutContainer.innerText =
    data?.bio !== null ? data?.bio : "This profile has no bio";

  reposNumber.innerText = data?.public_repos;
  followers.innerText = data?.followers;
  following.innerText = data?.following;
  locationUser.innerText =
    data?.location !== null ? data?.location : "Not Available";
  websiteUser.innerText = data?.blog !== "" ? data?.blog : "Not Available";

  if (data?.blog !== "") {
    websiteUser.href = `https://${data?.blog}`;
  }
  twitterUser.innerText =
    data?.twitter_username !== null ? data?.twitter_username : "Not Available";

  if (data?.twitter_username !== "") {
    twitterUser.href = `https://twitter.com/${data?.twitter_username}`;
  }

  companyUser.innerText =
    data?.company !== null ? data?.company : "Not Available";
}

formInput.addEventListener("input", () => {
  errorShow.classList.remove("active");
});

formContainer.addEventListener("submit", (event) => {
  event.preventDefault();
  getFormData();
});

function getFormData() {
  if (formInput.value !== "") {
    currentUser = "";
    currentUser = formInput.value;
    fetchUserData();
  }
}
