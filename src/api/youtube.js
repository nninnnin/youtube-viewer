import { YOUTUBE_API_KEY } from "../config/youtube";

function mapObjectToQueryStrings(obj) {
  let result = "";

  console.log(obj);

  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      result += `&${prop}=${obj[prop]}`;
    }
  }

  return result;
}

export const searchYoutube = async (options) => {
  // const YOUTUBE_URL = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&part=snippet${mapObjectToQueryStrings(
  //   options
  // )}`;
  const YOUTUBE_URL = `/public/mockAPI.json`;

  console.log(YOUTUBE_URL);

  try {
    const res = await fetch(YOUTUBE_URL);
    console.log(res);
    const data = await res.json();
    console.log(data);

    return data;
  } catch (err) {
    console.error(err);
  }
};
