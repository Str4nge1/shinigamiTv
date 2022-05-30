import { TIMEOUT_SEC } from "./constants.js";

function timeOut(s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} seconds`));
    }, s * 1000);
  });
}

export async function AJAX(url) {
  try {
    const response = await Promise.race([fetch(url), timeOut(TIMEOUT_SEC)]);
    if (!response.ok) throw new Error(`${data.message} ${response.status}`);

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
