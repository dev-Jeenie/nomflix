import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "api";

export default class extends React.Component {
  constructor(props) {
    super(props); // 생성자 클래스
    const {
      location: { pathname },
    } = props;
    // 이때의 props는 pathname이 아님.
    this.state = {
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/"),
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      }, //props안의 match.params.id와 동일
      history: { push },
    } = this.props;
    const { isMovie } = this.state;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
      // id에 숫자가 입력된게 아니라면 초기화면으로 돌아가게함. isNaN라면 push하고 함수를 종료한다
    }
    let result = null;
    try {
      if (isMovie) {
        const request = await moviesApi.movieDetail(parsedId);
        result = request.data;
        // ({data:result} = await moviesApi.movieDetail(parsedId);) 이렇게 한번에 파고들어갈 수 있  음
        // Destructuring assignment
      } else {
        const request = await tvApi.showDetail(parsedId);
        // ({data:result} = await tvApi.showDetail(parsedId);) 이렇게 한번에 파고들어갈 수 있음
        result = request.data;
      }
      console.log(result);
    } catch {
      this.setState({ error: "Can't find anything." });
    } finally {
      this.setState({ loading: false, result: result });
      // 로딩을 끝내고, result가 tv든 movie든 덮어쓴다
      // isMovie라면 = 주소에 movie가 있다면 movieApi를 호출해서 받아온 것을 request에 넣고,
      // 그 request 안의 data를 result에 할당하고
      // 받아온 result를 state의 result로 대체한다
    }
  }

  render() {
    console.log(this.state);
    const { result, error, loading } = this.state;
    return <DetailPresenter result={result} error={error} loading={loading} />;
  }
}

/**
 * Detail에서는 다른 state는 가지지않고, result만 가진다.
 * 왜?
 * : show를 찾을 때, 기본적으로 ID를 가지고 간다.(api에서 프로그래밍한 것처럼)
 *   그 ID를 가져와서, 그걸로 검색을 하고, 결과값(result)를 보여준다.
 *   show든, movie든 똑같이 같은 result, 같은 라우터 Detail을 사용한다
 *
 * => ID를 가지고 얻게되는 (tv든 movie든)모든 것들은, result를 가진다
 * loading은 기본적으로 true, error는 null
 *
 */

/**
 * detail페이지로 이동시키기 위해 할 일
 *  1. /movie에 있는지, /show에 있는지 알아내야함 (movie와 show 둘 다 detail페이지로 오기때문에)
 *  2. id가 있을 자리에 어떤 숫자가 있는지 알아내야함
 *
 * React Router는 기본적으로 Route들에게 props를 준다.
 * 파라미터를 각각 다른장소들에게 준다
 * <img src="./router_detail_props.png"/>
 *
 *
 * */
