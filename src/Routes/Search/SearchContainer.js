import { moviesApi, tvApi } from "api";
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

  /** form에서 text를 입력하고 제출했을 때 실행
   * handleSubmit은
   * searchTerm이 공백이 아닌 것을 확인하고, search함수를 실행한다
   * => 이 handleSubmit을 searchPresenter에 전달해야함.
   *
   * 1. 사용자가 그 searchPresenter의 form에 입력하고 onSubmit을 발생시킴
   * 2. 그럼 handleSubmit 값이 전달됨
   * 3. 여기에서 handleSubmit를 실행
   * 4. 그럼 searchByTerm이 실행되어서 검색
   */
  // componentDidMount() {
  //   this.handleSubmit();
  // }

  handleSubmit = () => {
    const { searchTerm } = this.state;
    if (searchTerm !== "") {
      this.searchByTerm();
    }
  };

  searchByTerm = async () => {
    const { searchTerm } = this.state;
    this.setState({ loading: true });
    try {
      const {
        data: { results: movieResults },
      } = await moviesApi.search(searchTerm);
      const {
        data: { results: showResults },
      } = await tvApi.search(searchTerm);
      // console.log(movieResults, showResults);
      this.setState({
        movieResults,
        showResults,
      });
    } catch {
      this.setState({
        error: "Can't find results.",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const { movieResults, tvResults, searchTerm, error, loading } = this.state;
    // console.log(this.state);
    return (
      <SearchPresenter
        movieResults={movieResults}
        tvResults={tvResults}
        loading={loading}
        error={error}
        searchTerm={searchTerm}
        handleSubmit={this.handleSubmit}
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

/**
 * handleSubmit
 *
 */
