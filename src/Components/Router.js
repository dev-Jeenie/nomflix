import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Home from "Routes/Home";
import TV from "Routes/TV";
import Header from "Components/Header";
import Search from "Routes/Search";

export default () => (
  <Router>
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/tv" exact component={TV} />
        {/* <Route path="/tv/popular" render={() => <h1>Popular</h1>} /> */}
        <Route path="/search" component={Search} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </Router>
);

/* path : 어느 url에서 해당 route를 render할지 알려주고
  exact : 정확히 이 주소여야한다는 것을 알려준다
  conpenent : 누군가가 이 route에 왔을 때 어떤 컴포넌트가 보여질건지 결정
  route는 router안에서만 할 수 있다
  */

/** Composition이란?
 * 두개 이상의 Route를 랜더링하는 방식
 * TV페이지 안에 탭이 있다면, path="/tv/popular" 경로가 이렇게 되니까
 * 두 Route 모두 path에 일치하기 때문에 둘다 render된다.
 * Composition을 가지고 많은 일을 해야할 때 이걸 이용할 수 있다
 */

/** Redirect
 * 웹사이트에서 어느 페이지를 가든 Route의 path를 살펴볼 거고,
 * 해당 path에 일치하는 Route가 true가 되어서 render하고
 * 일치하지 않는 것들은 false로 render되지 않는다.
 * <Redirect from="*" to="/" /> 는 만약 일치하는 Route가 하나도 없다면 to의 경로로 보내라는 뜻
 * 하지만 이 상태로는 <Route path="/" exact component={Home} />와 겹쳐서 Home으로만 갈 수 있다
 * => 이럴때 쓰는 것이 <Switch> Switch는 한번에 오직 하나의 Route만 render하게 해준다
 *
 */
