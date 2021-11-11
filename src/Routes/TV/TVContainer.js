import { tvApi } from "api";
import React from "react";
import TVPresenter from "./TVPresenter";

export default class extends React.Component {
  state = {
    topRated: null,
    popular: null,
    airing: null,
    error: null,
    loading: true,
  };

  // componentDidMount = async() => { 이것과 같은 것.
  async componentDidMount() {
    try {
      const {
        data: { results: _topRated },
      } = await tvApi.topRated();
      const {
        data: { results: _popular },
      } = await tvApi.popular();
      const {
        data: { results: _airing },
      } = await tvApi.airing();
      // console.log(_topRated, _popular, _airing);
      this.setState({
        topRated: _topRated,
        popular: _popular,
        airing: _airing,
      });
    } catch {
      this.setState({
        error: "Can't find show information.",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { topRated, popular, airing, error, loading } = this.state;
    console.log(this.state);
    return (
      <TVPresenter
        topRated={topRated}
        popular={popular}
        airing={airing}
        error={error}
        loading={loading}
      />
    );
  }
}
