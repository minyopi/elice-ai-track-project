import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
    opacity: ${(props) => (props.isActive ? "1" : "0.6")};
    cursor: ${(props) => (props.isActive ? "pointer" : "not-allowed")};
    text-decoration: none;
  `;

export function TestExample() {

  const [answer, setAnswer] = useState("")
  const [isActive, setIsActive] = useState(false)

  function handleAnswer(e){
    setAnswer(e.target.value);
  }

  useEffect(() => {
    answer === "" ? setIsActive(false) : setIsActive(true)
  }, [ answer ])


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
      <h2>검사예시</h2>
      <h3>0%</h3>
      <p>
        직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에 표시하세요.<br />
      가치의 뜻을 잘모르겠다면 문항 아래에 있는 가치의 설명을 확인해보세요.
    </p>
      <h3>두개 가치 중에 자신에게 더 중요한 가치를 선택하세요.</h3>
      <label><input type="radio" name="answer" onChange={handleAnswer} value="answer1" checked={answer === "answer1" ? true : false } />능력발휘</label>
      <label><input type="radio" name="answer" onChange={handleAnswer} value="answer2" checked={answer === "answer2" ? true : false } />자율성</label>
      <br />
      <ActiveBtn name="검사 시작" to="/test/1" isActive={isActive}></ActiveBtn>
    </>
  );
}
