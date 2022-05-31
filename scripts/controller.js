import * as model from "./model.js";
import animeView from "./view/animeView.js";
import navigationView from "./view/navigationView.js";

function categoryHandler() {
  const navigation = document.querySelector(".navigation");
  navigation.addEventListener("click", async function (e) {
    try {
      if (!e.target.classList.contains("category")) return;

      animeView.renderSpinner();
      await model.getAnime("", +e.target.dataset.category);
      animeView.render(model.state);
    } catch (error) {
      console.error(error);
    }
  });
}

function loadHandler() {
  window.addEventListener("load", async function () {
    try {
      animeView.renderSpinner();
      await model.getAnime();
      animeView.render(model.state);
    } catch (error) {
      console.error(error);
    }
  });
}

function formSubmitHandler() {
  const form = document.getElementById("form");
  form.addEventListener("submit", async function (e) {
    try {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get("anime");
      if (!name) return;

      animeView.renderSpinner();
      await model.getAnime(name);
      animeView.render(model.state);

      const input = e.target.querySelector("input");
      input.value = "";
      input.blur();
    } catch (error) {
      console.error(error);
    }
  });
}

function animeClickHandler(e) {
  const btn = e.target.closest(".animeBtn");
  if (!btn) return;
  const card = e.target.closest(".animeCard");
  const ytId = card.dataset.ytid;
  const id = card.dataset.id;

  if (ytId === "null") {
    window.open(`./anime.html?id=${id}&ytid=-1`);
    // window.location = `./anime.html?id=${id}&ytid=-1`;
  } else {
    window.open(`./anime.html?id=${id}&ytid=${ytId}`);
    // window.location = `./anime.html?id=${id}&ytid=${ytId}`;
  }
}

function navMouseEnterHandler(e) {
  e.target.classList.add("Active");
}

function navMouseLeaveHandler(e) {
  e.target.classList.remove("Active");
}

function logoClickHandler(e) {
  const logo = e.target.closest(".shinigamiLogo");
  if (!logo) return;

  window.location.reload();
}

function navMouseClickHandler(e) {
  const category = e.target.closest(".category");

  if (!category) return;
  this._categories.forEach((category) => category.classList.remove("clicked"));
  category.classList.add("clicked");
}

function init() {
  loadHandler();
  formSubmitHandler();
  categoryHandler();
  animeView.onClickHandler(animeClickHandler);
  navigationView.addMouseEnterHandler(navMouseEnterHandler);
  navigationView.addMouseleaveHandler(navMouseLeaveHandler);
  navigationView.addLogoClickHandler(logoClickHandler);
  navigationView.addNavigationClickHandler(navMouseClickHandler);
}

init();
