const playerElement = document.getElementById("player");
renderSpinner(playerElement);
const ytId = window.location.search.split("&")[1].split("=")[1];

if (ytId !== "-1") {
  let tag = document.createElement("script");

  tag.src = "https://www.youtube.com/iframe_api";
  let firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  let player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
      height: "550",
      width: "800",
      videoId: ytId,
      playerVars: {
        playsinline: 1,
      },
      events: {
        onReady: onPlayerReady,
      },
    });
  }

  function onPlayerReady(event) {
    event.target.playVideo();
  }
} else {
  playerElement.innerHTML = `<div class="noAnime">There is no trailer to show 😦</div>`;
}

const parentElement = document.querySelector(".animeInfo");
async function getAnimeInfo() {
  try {
    const id = window.location.search.split("&")[0].split("=")[1];

    renderSpinner(parentElement);
    const request = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
    const result = await request.json();
    const data = result.data;
    document.title = `ShinigamiTv | ${data.title}`;

    const anime = {
      themes: data.themes || "-",
      duration: data.duration || "-",
      episodes: data.episodes || "-",
      backgroundImg: data.images.jpg.large_image_url,
      rating: data.rating || "-",
      score: data.score || "-",
      scoredBy: data.scored_by || "-",
      title: data.title || "-",
      year: data.year || "-",
      synopsis: data.synopsis || "-",
    };
    renderAnimeInfo(anime);
  } catch (error) {
    console.error(error);
  }
}

function renderAnimeInfo(anime) {
  parentElement.style.backgroundImage = `url("${anime.backgroundImg}")`;
  clear();

  const themes = anime.themes.map((theme) => theme.name).join(", ");
  const htmlMarkup = `
      <div class="innerContainer overflowHidden">
        <div class="animeTitle"><span class="bold">${anime.title}</span></div>
        <div class="year"><span class="bold">Year:</span> ${anime.year}</div>
          <div class="ep">
            <div class="episodes"><span class="bold">Episodes:</span> ${anime.episodes}</div>
            <div class="duration"><span class="bold">Duration:</span> ${anime.duration}</div>
            <div class="rating"><span class="bold">Rating:</span> ${anime.rating}</div>
            <div class="score"><span class="bold">Score:</span> ${anime.score}</div>
            <div class"scoredBy"><span class="bold">Scored By:</span> ${anime.scoredBy}</div>
          </div>
        <div class="themes"><span class="bold">Themes:</span> ${themes}</div>
        <div class="synopsis">
          <div class="synopsisTitle"><span class="bold">Synopsis:</span></div>
          <div class="synopsisBody">${anime.synopsis}</div>
        </div>
      </div>`;
  parentElement.innerHTML = htmlMarkup;

  const innerContainer = document.querySelector(".innerContainer");

  innerContainer.addEventListener("mouseenter", function () {
    if (this.scrollHeight > this.clientHeight) {
      this.classList.remove("overflowHidden");
      this.classList.add("overflowScrollY");

      const currentPaddingRigt = Number.parseFloat(
        window
          .getComputedStyle(innerContainer, null)
          .getPropertyValue("padding-right")
      );
      this.style.paddingRight = `${currentPaddingRigt - 16}px`;
    }
  });

  innerContainer.addEventListener("mouseleave", function () {
    if (this.scrollHeight > this.clientHeight) {
      this.classList.remove("overflowScrollY");
      this.classList.add("overflowHidden");

      const currentPaddingRigt = Number.parseFloat(
        window
          .getComputedStyle(innerContainer, null)
          .getPropertyValue("padding-right")
      );
      this.style.paddingRight = `${currentPaddingRigt + 16}px`;
    }
  });
}

function renderSpinner(element) {
  const markup = `
        <div class="spinner">
          <img src="./images/Pinwheel.gif" alt="#" />
        </div> `;
  element.insertAdjacentHTML("afterbegin", markup);
}

function clear() {
  parentElement.innerHTML = "";
}

function init() {
  getAnimeInfo();
}
init();
