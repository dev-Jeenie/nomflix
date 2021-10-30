import React from "react";
import SearchPresenter from "./SearchPresenter";

export default class extends React.Component {
  state = {
    movieResults: null,
    tvResults: null,
    searchTerm: "",
    error: null,
    loading: false,
  };
  render() {
    const { movieResults, tvResults, searchTerm, error, loading } = this.state;
    return (
      <SearchPresenter
        movieResults={movieResults}
        tvResults={tvResults}
        searchTerm={searchTerm}
        error={error}
        loading={loading}
      />
    );
  }
}

/* search는 기본적으로 아무것도 로딩하지 않고, 사용자가 단어로 검색하기를 기다린다
  * component가 마운트 되었을 때
  - "hey, what's up" form을 보여주고
  - loading은 false, error 없고, searchTerm은 null이고

  * 유저가 검색을 하고 엔터를 누르면
  -loading이 true, 그 결과값을 movieResults, tvResults에 넣는다
*/
