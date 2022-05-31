class AnimeView {
  _parentElement = document.querySelector(".main");

  onClickHandler(handler) {
    this._parentElement.addEventListener("click", handler);
  }

  render(data) {
    this._clear();
    let HTML = `
      <div class="scrollUpContainer">
        <div class="scrollUpInner"> 
          <div class="scrollUp"> &#10595; </div>
        </div>
      </div>
      <div class="container">
    `;
    for (const [key, values] of Object.entries(data.search)) {
      HTML += ` 
      <div class="innerContainer" id="${key}">
        <div class="type">${key}</div>
        ${
          values.length !== 0
            ? this._generate(values)
            : '<div class="row"><div class="empty"> There are no search results of this type 🙄 </div></div>'
        }
      </div>
      `;
    }
    HTML += `
      </div>
    `;
    this._parentElement.innerHTML = HTML;

    this._addIntersectionObserver();
    this._addScrollUpBtnHandler();
  }

  _generate(values) {
    const htmlMarkUpArray = values.map((value) => {
      return `
      <div class="animeCard" data-ytid="${value.youtubeId}" data-id="${value.id}"> 
      <img src="${value.images.jpg.large_image_url}" alt="image" />
      <div class="anime">
        <div class="animeInfo">
          <div class="animeCardTitle">${value.title}</div>
        </div>
        <button class="animeBtn">Watch Trailer</button>
      </div></div>`;
    });

    let htmlMarkUp = '<div class="row">';
    htmlMarkUpArray.forEach((markup, index) => {
      if (index % 5 === 0 && index !== 0) {
        htmlMarkUp += '</div> <div class="row">';
      }
      htmlMarkUp += `${markup}`;
    });
    htmlMarkUp += "</div>";
    return htmlMarkUp;
  }

  _addIntersectionObserver() {
    const rowElement = document.querySelectorAll(".row");
    const observer = new IntersectionObserver(
      function (entry, observer) {
        if (!entry[0].isIntersecting) return;

        entry[0].target.classList.remove("animation");
        observer.unobserve(entry[0].target);
      },
      {
        root: null,
        threshold: 0.15,
      }
    );

    rowElement.forEach((element) => {
      observer.observe(element);
      element.classList.add("animation");
    });
  }

  _addScrollUpBtnHandler() {
    const btn = document.querySelector(".scrollUp");
    const scrollElement = document.querySelector(".header");
    btn.addEventListener("click", function () {
      scrollElement.scrollIntoView({ behavior: "smooth" });
    });
  }

  // _addSmoothScroll() {
  //   const scrollBtnContainer = document.querySelector(".scrollTypes");
  //   scrollBtnContainer.addEventListener("click", function (e) {
  //     const scrollBtn = e.target.closest(".scrollType");
  //     if (!scrollBtn) return;

  //     const scrollToElement = document.getElementById(
  //       `${scrollBtn.dataset.scrollto}`
  //     );
  //     scrollToElement.scrollIntoView({ behavior: "smooth" });
  //   });
  // }

  renderSpinner() {
    const markup = `
        <div class="spinner">
          <img src="./images/Pinwheel.gif" alt="#" />
        </div> `;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
}

export default new AnimeView();
