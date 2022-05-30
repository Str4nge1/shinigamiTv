class NavigationView {
  _parentElement = document.querySelector(".header");
  _categories = this._parentElement.querySelectorAll(".category");

  addMouseEnterHandler(handler) {
    this._categories.forEach((category) =>
      category.addEventListener("mouseenter", handler)
    );
  }

  addMouseleaveHandler(handler) {
    this._categories.forEach((category) =>
      category.addEventListener("mouseleave", handler)
    );
  }

  addLogoClickHandler(handler) {
    this._parentElement.addEventListener("click", handler);
  }

  addNavigationClickHandler(handler) {
    this._parentElement.addEventListener("click", handler.bind(this));
  }
}

export default new NavigationView();
