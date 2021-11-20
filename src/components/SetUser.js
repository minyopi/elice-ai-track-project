import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from "../store/user";

const StyledLink = styled(Link)`
    opacity: ${(props) => (props.isActive ? "1" : "0.6")};
    cursor: ${(props) => (props.isActive ? "pointer" : "not-allowed")};
  `;

export function SetUser() {
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [isActive, setIsActive] = useState(false);

  //  context를 사용하기
  const context = useContext(UserContext);

  const getUsername = (e) => {
    setUsername(e.target.value);
  };

  const getGender = (e) => {
    setGender(e.target.value);
  };

  useEffect(() => {
    if ( username !== "" && username !== undefined && gender !== undefined) setIsActive(true)
    else setIsActive(false)
    context['name'] = username;
    context['gender'] = gender;
  }, [username, gender])
  console.log(context)

  function ActiveBtn(props){
    function IsActiveBtn(props){
      return <button className={"btn " + ( isActive ? "activeBtn" : "disabledBtn" )}>{props.name}</button>
    }
     return (
       !isActive ?
      <StyledLink to={props.to} isActive={props.isActive} onClick={(e) => {e.preventDefault();}}><IsActiveBtn name="검사 시작" /></StyledLink>
      : <StyledLink to={props.to} isActive={props.isActive}><IsActiveBtn name="검사 시작" /></StyledLink>
      )
  }

  return (
    <>
      <section className="setUser">
        <div className="inner">
          <div className="content">
            <h1>직업가치관검사</h1>
            <form>
              <div className="name">
                <p>이름</p>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={getUsername} />
              </div>
              <br />
              <div className="gender">
                <p>성별</p>
                <label><input type="radio" name="gender" value="male" onClick={getGender} checked={ gender === "male" ? true : false } />남자</label>
                <br />
                <label><input type="radio" name="gender" value="female" onClick={getGender} checked={ gender === "female" ? true : false } />여자</label>
              </div>  
              <br />
              <div className="startBtn">
                <ActiveBtn name="검사 시작" to='./TestExample' isActive={isActive}></ActiveBtn>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
