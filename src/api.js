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
예시 주소 : https://api.themoviedb.org/3/tv/popular?api_key=e30fc4781e246167a366fcf160f7961d&language=en-US&page=1
기본적인 주소를 baseURL로 담고 필요한 파라미터를 전달한다
*/

// api.get("tv/popular");

api.get("tv/popular", {
  params: {
    api_key: "e30fc4781e246167a366fcf160f7961d",
  },
  // params가 누락되는 버그 때문에, get 할때에도 추가함
});

/*
api.get("/tv/popular");
만약 이렇게 앞에 /를 넣는다면 절대경로로 이걸 가져오라는 뜻이 되어서,
baseURL을 덮어쓰기를 해버린다./로 시작하는건 절대경로. 상대경로를 써야한다
*/

export default api;
