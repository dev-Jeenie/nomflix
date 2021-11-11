import React from "react";
import DetailPresenter from "./DetailPresenter";

export default class extends React.Component {
  state = {
    result: null,
    error: null,
    loading: true,
  };

  async componentDidMount() {
    const {
      match: {
        params: { id },
      }, //props안의 match.params.id와 동일
      history: { push },
      location: { pathname },
    } = this.props;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      push("/");
      return;
      // id에 숫자가 입력된게 아니라면 초기화면으로 돌아가게함. isNaN라면 push하고 함수를 종료한다
    }
  }

  render() {
    console.log(this.props);
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
