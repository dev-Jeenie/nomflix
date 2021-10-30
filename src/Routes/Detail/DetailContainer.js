import React from "react";
import DetailPresenter from "./DetailPrese nter";

export default class extends React.Component {
  state = {
    result,
    error: null,
    loading: true,
  };
  render() {
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
 *
 */
