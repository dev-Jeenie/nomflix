/** HomeContainer는 state를 가진 모든 컴포넌트가 될 것이다 */

import React from "react";
import HomePresenter from "./HomePresenter";
import { moviesApi } from "api";

export default class extends React.Component {
  state = {
    nowPlaying: null,
    upcoming: null,
    popular: null,
    error: null,
    loading: true,
  };

  async componentDidMount() {
    try {
      /**
       * const nowPlaying = await moviesApi.nowPlaying();
       * console.log(nowPlaying);
       * 이렇게 통째로 가져오면 객체 안에 담겨서 오니까, 객체 비구조화 할당한다
       * 통째로 가져올 경우 <img src="./nowPlaying.png"/>
       * 통째로 가져온 데이터에서 필요한 부분은 data안에서 result이기 때문에 이렇게 구조분해함.
       * 객체 비구조화 할당으로 가져올 경우 <img src="./nowPlaying_Deconstruction.png"/>
       */
      const {
        data: { results: nowPlaying },
      } = await moviesApi.nowPlaying();
      const {
        data: { results: upcoming },
      } = await moviesApi.upcoming();
      const {
        data: { results: popular },
      } = await moviesApi.popular();
      // throw Error();
      //   data: { results: _nowPlaying }, 이것과 같지만
      // 다른것들도 result가 필요하기 때문에, 변수명을 이렇게 바꿈 (내 이해를 위해 _를 붙임)
      // 어려워보이지만 알고보면 전혀 어렵지 않음! 그냥 객체구조분해해서 그 안의 객체를 가져오고, 변수명만 바꾼거야

      this.setState({
        nowPlaying,
        upcoming,
        popular,
      });
      // 이제, 위의 state값을 setState로 넣을 수 있다.
      // 이름을 통일시켜서 nowPlaying,이라고만 해도 JS는 이해한다
    } catch {
      this.setState({
        error: "Can't find movie information.",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { nowPlaying, upcoming, popular, error, loading } = this.state;
    return (
      <HomePresenter
        nowPlaying={nowPlaying}
        upcoming={upcoming}
        popular={popular}
        error={error}
        loading={loading}
      />
    );
  }
}

/* HomeContainer가 가져야하는 state(상태값)는 nowPlaying, upComing, popular */
/* HomeContainer에는 presenter(보여주는것)은 없다. 그냥 presenter 컴포넌트만 있다*/

/**
 * tv 페이지에서 topRated,popular,airing,showDetail를 보여줘야하고
 * 검색시엔 search를 보여줘야함
 * movie 페이지에서 nowPlaying,upComing,popular,movieDetail를 보여줘야하고
 * 검색시엔 search를 보여줘야함
 * 
 * - 작은 어플리케이션에서 가능한 리엑트 컴포넌트 코딩패턴
 * 1. 컴포넌트를 만들고
 * 2. 마운트 되었을 때
 * 3. api에서 데이터를 불러오고
 * 4. 그 요소들을 랜더링한다
 * 
 * - 큰 어플리케이션에서 다루는 리엑트 컴포넌트 코딩패턴
 * : 컨테이너 프레젠터 패턴
 * 컨테이너 : data를 가지고, state(상태값)가지고, api를 불러와서 모든 로직을 처리함 (데이터 담당)
 * 프리젠터 : 컨테이너가 처리한 데이터들을 보여주는 역할을 하는 함수형 컴포넌트. state(상태값), api, 클래스를 다루지않음 (스타일 담당)
 * 
 * 1. 컨테이너가 data를 가지고, state를 가지고, api를 불러온다 
 *    : 컨테이너가 모든 로직을 처리한다
 * 2. 프레젠터가 그 데이터들을 보여준다
      : 이 프레젠터는 state도,api도,class도 없는 그냥 함수형 컴포넌트  
 */

/**
 *
 * 옵션 1. componentDidMount안에 전체 API 요청하기 => 많지 않아서 지금은 이렇게(옵션2로 변경해도 됨)
 * 옵션 2.
 *        - 각각의 요청을 분리된 함수로 만들어서 따로 호출하기(getNowPlaying(),getPopular(),...)
 *        - componentDidMount에서는 this.getNowPlaying 등으로 불러오기
 *
 * componentDidMount에서 try를 실행하고,
 * 뭔가 작동하지 않으면 error를 catch하고,
 * 성공했거나(try), 실패했거나(catch),
 * 상관없이 마지막엔 finally를 실행할 것이다
 * (일단 로딩을 끝내고 컨텐츠를 보여주거나 에러를 보여준다)
 */

/**
 * async와 await는
 * JS에게 내가 뭘 좀 끝낼 때까지 기다려!
 * fetch를 쓰거나, axios를 쓰고 api를 import해서 데이터를 불러올 텐데
 * JS는 데이터가 로드될 때까지 기다려주지 않는다.
 * 그래서 성공하든 실패하든 일단 다음 것을 실행하지 말고 기다리라고 쓰는게 async와 await
 *
 * 이걸 하지 않으면?
 * : Promise {<pending>}
 * JS는 Promise는 대기이다. 하고 계속 진행해버림
 * 우리가 원하는건 promise가 finished될 때까지 기다리는 것.
 * async와 await를 추가하면 끝나기를 기다린다
 *
 */
