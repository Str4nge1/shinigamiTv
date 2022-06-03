import * as model from "./model.js";
import animeView from "./view/animeView.js";
import navigationView from "./view/navigationView.js";

function categoryHandler() {
  const navigation = document.querySelector(".navigation");
  navigation.addEventListener("click", async function (e) {
    try {
      if (!e.target.classList.contains("category")) return;

      animeView.renderSpinner();
      const category = +e.target.dataset.category;
      const url = `./index.html?c=${category}`;
      history.replaceState({}, "", url);

      await model.getAnime("", category);
      animeView.render(model.state);
    } catch (error) {
      console.error(error);
    }
  });
}

function loadHandler() {
  window.addEventListener("load", async function () {
    try {
      const paramString = new URLSearchParams(
        window.location.href.split("?")[1]
      );

      const category = paramString.get("c") ? paramString.get("c") : "";
      const page = paramString.get("p") ? paramString.get("p") : 1;
      const searchName = paramString.get("n") ? paramString.get("n") : "";

      animeView.renderSpinner();
      if (category) {
        navigationView.findCategory(category);
        await model.getAnime("", category, page);
      } else if (searchName) {
        await model.getAnime(searchName, category, page);
      } else {
        await model.getAnime("", 0, page);
      }
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
      const url = `./index.html?n=${name}&p=1`;
      history.replaceState({}, "", url);
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

async function logoClickHandler(e) {
  try {
    const logo = e.target.closest(".shinigamiLogo");
    if (!logo) return;

    history.replaceState({}, "", "./index.html");
    navigationView.initCategories();

    animeView.renderSpinner();
    await model.getAnime();
    animeView.render(model.state);
  } catch (error) {
    console.log(error);
  }
}

function navMouseClickHandler(e) {
  const category = e.target.closest(".category");

  if (!category) return;
  this._categories.forEach((category) => category.classList.remove("clicked"));
  category.classList.add("clicked");
}

async function pagination(e) {
  try {
    const btn = e.target.closest(".paginationBtn");
    if (!btn) return;

    animeView.renderSpinner();
    const page = +btn.dataset.goto;

    const paramString = new URLSearchParams(window.location.href.split("?")[1]);
    const urlPage = paramString.get("p");
    let url;
    if (urlPage) {
      url = `${window.location.href.split("p=")[0]}p=${page}`;
    } else {
      if (model.state.category == 0 && model.state.searchName == "") {
        url = `${window.location.href}?p=${page}`;
      } else {
        url = `${window.location.href}&p=${page}`;
      }
    }

    history.replaceState({}, "", url);
    await model.getAnime(model.state.searchName, model.state.category, page);
    animeView.render(model.state);
  } catch (error) {
    console.error(error);
  }
}

function init() {
  loadHandler();
  formSubmitHandler();
  categoryHandler();
  animeView.onClickHandler(animeClickHandler);
  animeView.paginationHandler(pagination);
  navigationView.addMouseEnterHandler(navMouseEnterHandler);
  navigationView.addMouseleaveHandler(navMouseLeaveHandler);
  navigationView.addLogoClickHandler(logoClickHandler);
  navigationView.addNavigationClickHandler(navMouseClickHandler);
}
init();
