import { baseUrl } from "./constants.js";
import { AJAX } from "./utils.js";

export const state = {
  all: [],
  search: {
    TV: [],
    OVA: [],
    Movie: [],
    Special: [],
  },
  searchName: "",
  category: 0,
  pages: 0,
  currentPage: 0,
};

export async function getAnime(name = "", category = 0, page = 1) {
  try {
    let url;
    if (category) {
      url = `${baseUrl}anime?q=&genres=${category}&page=${page}`;
    } else if (name) {
      url = `${baseUrl}anime?q=${name}&page=${page}`;
    } else if (!name) {
      url = `${baseUrl}top/anime?q=&page=${page}`;
    }

    const data = await AJAX(url);
    createState(data, name, category);
  } catch (err) {
    console.error(err);
  }
}

function createState(dataArg, name, category) {
  state.searchName = name;
  state.pages = dataArg.pagination.last_visible_page;
  state.currentPage = dataArg.pagination.current_page;
  state.category = category;

  const data = dataArg.data;
  const animes = [];

  data.forEach((anime) => {
    animes.push({
      id: anime.mal_id,
      title: anime.title,
      type: anime.type,
      url: anime.url,
      scoredBy: anime.scored_by,
      score: anime.score,
      rating: anime.rating,
      themes: anime.themes,
      images: anime.images,
      episodes: anime.episodes,
      duration: anime.duration,
      youtubeId: anime.trailer.youtube_id,
    });
  });
  state.all = animes;
  state.search.TV = animes.filter((anime) => anime.type === "TV");
  state.search.OVA = animes.filter((anime) => anime.type === "OVA");
  state.search.Movie = animes.filter((anime) => anime.type === "Movie");
  state.search.Special = animes.filter((anime) => anime.type === "Special");
}
