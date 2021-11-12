import axios from "axios";

// Axios는, 우리가 Axios의 인스턴스를 configue해줄 수 있다는 것.

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_Key: "e30fc4781e246167a366fcf160f7961d",
    language: "en-US",
  },
});

/*
예시
주소 : https://api.themoviedb.org/3/tv/popular?api_key=e30fc4781e246167a366fcf160f7961d&language=en-US&page=1
기본적인 주소를 baseURL로 담고 필요한 파라미터를 전달한다

// api.get("tv/popular");

api.get("tv/popular", {
  params: {
    api_key: "e30fc4781e246167a366fcf160f7961d",
  },
  // params가 누락되는 버그 때문에, get 할때에도 추가함
});

api.get("/tv/popular");
만약 이렇게 앞에 /를 넣는다면 절대경로로 이걸 가져오라는 뜻이 되어서,
baseURL을 덮어쓰기를 해버린다./로 시작하는건 절대경로. 상대경로를 써야한다

export default api;

*/

export const moviesApi = {
  nowPlaying: () =>
    api.get("movie/now_playing", {
      params: {
        api_key: "e30fc4781e246167a366fcf160f7961d",
      },
    }),
  upComing: () =>
    api.get("movie/upcoming", {
      params: {
        api_key: "e30fc4781e246167a366fcf160f7961d",
      },
    }),
  popular: () =>
    api.get("movie/popular", {
      params: {
        api_key: "e30fc4781e246167a366fcf160f7961d",
      },
    }),
  movieDetail: (id) =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos",
        api_key: "e30fc4781e246167a366fcf160f7961d",
      },
    }),
  search: (term) =>
    api.get(`search/movie`, {
      params: {
        // query: term,
        query: encodeURIComponent(term),
        api_key: "e30fc4781e246167a366fcf160f7961d",
      },
    }),
};

export const tvApi = {
  topRated: () =>
    api.get("tv/top_rated", {
      params: {
        api_key: "e30fc4781e246167a366fcf160f7961d",
      },
    }),
  popular: () =>
    api.get("tv/popular", {
      params: {
        api_key: "e30fc4781e246167a366fcf160f7961d",
      },
    }),
  airing: () =>
    api.get("tv/airing_today", {
      params: {
        api_key: "e30fc4781e246167a366fcf160f7961d",
      },
    }),
  showDetail: (id) =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: "videos",
        api_key: "e30fc4781e246167a366fcf160f7961d",
      },
    }),
  search: (term) =>
    api.get("search/tv", {
      params: {
        query: encodeURIComponent(term),
        api_key: "e30fc4781e246167a366fcf160f7961d",
      },
    }),
};

/* append_to_response
각 컨텐츠는 parameter로 append_to_response를 가질 수 있음.
video와 image등을 append(덧붙이기)하면 가져올 수 있음.
params로 path id를 요청하면서,
또 다른 params로 append_to_response: video 등을 요청하면, 해당 값을 가져올 수 있음

showDetail로 api.get()을 하면,
api key, language, append_to_re sponse:video를 전송하고
그 결과를 얻을 수 있다

=> 이게 라우터 파라미터를 개별적으로 설정하는 방법. (api전체를 위한 것은 아니다)
*/

/* 검색은 string "term"으로 할거고, api.get의 params로 path를 보내고
또다른 params로 query:term을 보내면
그 결과를 얻을 수 있다

만약 유저가 빈칸을 입력했을 경우를 대비해야함.
URL은 string이여야 하기 때문에 encodeURLComponent로 인코딩을 해줘야한다.
encodeURLComponent를 하면, 값을 인코딩하고, 그 문자열로 검색을 한다. 
*/
