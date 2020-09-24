import { YOUTUBE_API_KEY } from "../config/youtube";
import mockAPI from '../assets/mockAPI.json'; // 웹팩에서 파싱되어 날아온다!!

function mapObjectToQueryStrings(obj) {
  let result = "";

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
  // console.log(YOUTUBE_URL);

  try {
    // const res = await fetch(YOUTUBE_URL, {
    //     headers: new Headers({'content-type': 'application/json'})
    // });
    // console.log(res);
    // const data = await res.json();
    // console.log(data);

    // return data;

    let result;
    if (options.maxResults) {
      const temp = mockAPI;
      temp.items = temp.items.slice(0, options.maxResults);
      result = temp;
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(result);
      }, 1000);
    });
  } catch (err) {
    console.error(err);
  }
};
