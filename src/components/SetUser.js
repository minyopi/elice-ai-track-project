import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from "../store/user";

const StyledLink = styled(Link)`
    opacity: ${(props) => (props.isActive ? "1" : "0.6")};
    cursor: ${(props) => (props.isActive ? "pointer" : "not-allowed")};
  `;

export function SetUser() {
  const [username, setUsername] = useState();
  const [gender, setGender] = useState();
  const [isActive, setIsActive] = useState(false);

  //  context를 사용하고 싶을때는 이렇게
  // const context = useContext(UserContext);
  // console.log(context.name);
  // console.log(context.gender);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const getGender = (e) => {
    setGender(e.target.value);
  };

  useEffect(() => {
    if ( username !== "" && username !== undefined && gender !== undefined) setIsActive(true)
    else setIsActive(false)
  }, [username, gender])

  function IsActiveBtn(props){
    return <button className={"btn " + ( isActive ? "activeBtn" : "disabledBtn" )}>{props.name}</button>
  }

  return (
    <>
      <section className="setUser">
        <div className="inner">
          <div className="content">
            <h1>직업가치관검사</h1>
            <form type="submit">
              <div class="name">
                <p>이름</p>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={handleUsername} />
              </div>
              <br />
              <div class="gender">
                <p>성별</p>
                <input type="radio" id="male" name="gender" value="male" onClick={getGender} />
                <label htmlFor="male">남자</label>
                <br />
                <input type="radio" id="female" name="gender" value="female" onClick={getGender}></input>
                <label htmlFor="female">여자</label>
              </div>  
              <br />
              <div class="startBtn">
                {!isActive ?
                <StyledLink to='/testExample' isActive={isActive} onClick={(e) => { e.preventDefault(); }}><IsActiveBtn name="검사 시작" /></StyledLink>
                : <StyledLink to='/testExample' isActive={isActive}><IsActiveBtn name="검사 시작" /></StyledLink>}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
