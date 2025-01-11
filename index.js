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

let currentUser = "garvbahal";
fetchUserData();

async function fetchUserData() {
  try {
    const response = await fetch(`https://api.github.com/users/${currentUser}`);
    const data = await response.json();

    renderData(data);
  } catch (err) {}
}

function renderData(data) {
  userImage.src = data?.avatar_url;
  idName.innerText = data?.name;
  joinDate.innerText = data?.created_at;
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

