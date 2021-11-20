import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from "../store/user";

const StyledLink = styled(Link)`
    opacity: ${(props) => (props.isActive ? "1" : "0.6")};
    cursor: ${(props) => (props.isActive ? "pointer" : "not-allowed")};
  `;

export function Test(props) {
  const context = useContext(UserContext);
  // 문항 불러와서 saveData에 저장하기
  const [saveData, setSaveData] = useState([]);
  
  useEffect(() => {
    async function loadQuestion() {
      try {
        var config = {
          headers: { 'Access-Control-Allow-Origin': '*' }
        };
        const response = await axios.get(`http://www.career.go.kr/inspct/openapi/test/questions?apikey=${context.apikey}&q=25`, config);
        setSaveData(response.data['RESULT']);
        console.log("saveData =",saveData);
      } catch (e) {
        console.log('에러 발생');
      }
    }
    loadQuestion();
  }, []);


  // 선택한 input 값 받아오기
  const [ inputs, setInputs ] = useState({});
  const [ countPer, setCountPer ] = useState(0)
  function handleChange(e){
    const { value, name } = e.target;
    setInputs((cur) => {
      let newSetInputs = {...cur};
      newSetInputs[name]= value;
      return newSetInputs;
    });
  }
  const inputsForPost = []
  useEffect(() => {
    setCountPer(parseInt( (100 * Object.keys(inputs).length) / saveData.length ));
    if (Object.keys(inputs).length === saveData.length){
      for (let input of Object.entries(inputs)){
        inputsForPost.push(input.join("="));
        context.answers = inputsForPost.join(" ");
      }
    }
  }, [inputs, saveData]);
  console.log(context)
  

  // 문항 만드는 템플릿 컴포넌트
  function Question(props){
    return(
      <>
        <div>
          <h3>{props.item.qitemNo}. {props.item.question}</h3>
          <label><input type="radio" name={String(props.idx + 1)} onChange={handleChange} value="1" checked={inputs[String(props.idx + 1)] === "1" ? true : false } />{props.item.answer01}</label>
          <label><input type="radio" name={String(props.idx + 1)} onChange={handleChange} value="2" checked={inputs[String(props.idx + 1)] === "2" ? true : false } />{props.item.answer02}</label>
          <label><input type="radio" name={String(props.idx + 1)} onChange={handleChange} value="3" checked={inputs[String(props.idx + 1)] === "3" ? true : false } />{props.item.answer03}</label>
          <label><input type="radio" name={String(props.idx + 1)} onChange={handleChange} value="4" checked={inputs[String(props.idx + 1)] === "4" ? true : false } />{props.item.answer04}</label>
          <label><input type="radio" name={String(props.idx + 1)} onChange={handleChange} value="5" checked={inputs[String(props.idx + 1)] === "5" ? true : false } />{props.item.answer05}</label>
        </div>
    </>
    )
  }


  // useParams 사용해서 5문항씩 페이지 나눠주기
  const params = useParams();
  let page = Number(params.page);
  let page_count = 1;
  let question_count = 0;

  const questions = saveData.map((item, idx) => {
    question_count += 1;

    if (question_count === 1) page_count += 0;
    else if(question_count % 5 === 1) page_count += 1;

    if (page === page_count){
      return <Question item={item} idx={idx} key={idx+1} ></Question>;
    }
  });

 
  // 값을 선택하지 않으면 비활성화
  const [isActive, setIsActive] = useState(false);
  
  // isActive 관리를 어떻게 해줄건지.?????? 하
   useEffect(() => {
    if (Object.keys(inputs).length === 0){
      setIsActive(false)
    } else {
      setIsActive(true)
    }
  }, [ inputs ])


  // 이전, 다음 버튼 설정해주는 컴포넌트
  function SetButton(){
    let page_num = Number(page)
    if ( page_num === 1 ){
      return(
        <>
        <Link to={'/testExample'}><button>이전</button></Link>
        { !isActive ?
        <StyledLink to={'/test/'+ (page_num+1)} isActive={isActive} onClick={(e) => {e.preventDefault(); }}>
          <button className={"btn " + ( isActive ? "activeBtn" : "disabledBtn" )}>다음</button>
        </StyledLink> :
        <StyledLink to={'/test/'+ (page_num+1)} isActive={isActive}>
        <button className={"btn " + ( isActive ? "activeBtn" : "disabledBtn" )}>다음</button>
        </StyledLink> }   
        </>
        )
      } else if (page_num === 10){
        return(
          <>
          <Link to={'/test/'+ (page_num-1)}><button>이전</button></Link>
          { !isActive ?
          <StyledLink to={'/finishTest'} isActive={isActive} onClick={(e) => {e.preventDefault(); }}>
            <button className={"btn " + ( isActive ? "activeBtn" : "disabledBtn" )}>완료</button>
          </StyledLink> :
          <StyledLink to={'/finishTest'} isActive={isActive}>
          <button className={"btn " + ( isActive ? "activeBtn" : "disabledBtn" )}>완료</button>
          </StyledLink> }
          </>
        )
      }
    return(
      <>
        <Link to={'/test/'+ (page_num-1)}><button>이전</button></Link>
        { !isActive ?
        <StyledLink to={'/test/'+ (page_num+1)} isActive={isActive} onClick={(e) => {e.preventDefault(); }}>
          <button className={"btn " + ( isActive ? "activeBtn" : "disabledBtn" )}>다음</button>
        </StyledLink> :
        <StyledLink to={'/test/'+ (page_num+1)} isActive={isActive}>
        <button className={"btn " + ( isActive ? "activeBtn" : "disabledBtn" )}>다음</button>
        </StyledLink> }
      </>
    )
  }

  return (
    <>
      <h2>검사 진행</h2>
      <h3>{countPer}%</h3>
      {saveData && saveData.length > 0 ? questions : undefined}
      <br />
      <SetButton></SetButton>
    </>
  );
}
