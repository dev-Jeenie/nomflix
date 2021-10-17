import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: rgba(20, 20, 20, 0.8);
  z-index: 10;
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;
const List = styled.ul`
  display: flex;
`;

const Item = styled.li`
  width: 80px;
  height: 50px;
  text-align: center;
  border-bottom: 3px solid
    ${(props) => (props.current ? "#3498db" : "transparent")};
  transition: border-bottom 0.5s ease-in-out;
`;
const SLink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default withRouter(({ location: { pathname } }) => (
  <Header>
    {/* {console.log(props.location)} */}
    <List>
      <Item current={pathname === "/"}>
        <SLink to="/">Movies</SLink>
      </Item>
      <Item current={pathname === "/tv"}>
        <SLink to="/tv">TV</SLink>
      </Item>
      <Item current={pathname === "/search"}>
        <SLink to="/search">Search</SLink>
      </Item>
    </List>
  </Header>
));
/**
 * 위와 완전히 동일.
 * Header가 withRouter라는 컴포넌트를 감싼 형태이기 때문에 props를 가질 수 있다
 */
// const HeaderC = (props) => (
//   <Header>
//     {console.log(props)}
//     <List>
//       <Item current={true}>
//         <SLink to="/">Movies</SLink>
//       </Item>
//       <Item current={false}>
//         <SLink to="/tv">TV</SLink>
//       </Item>
//       <Item current={false}>
//         <SLink to="/search">Search</SLink>
//       </Item>
//     </List>
//   </Header>
// );
// export default withRouter(HeaderC);

/** withRouter란
 * withRouter는 다른 컴포넌트를 감싸는 컴포넌트.
 * Router에 어떠한 정보를 준다
 * 이 파일에서 export 하는 건 다른 컴포넌트가 안에 있는 withRouter
 * 그래서 props에 접근할 수 있다. withRouter를 지우면 props가져올 수 없음
 * => withRouter로 어떤 컴포넌트와도 연결할 수 있다!
 */
