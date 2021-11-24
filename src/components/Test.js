import React, { useState, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from "../store/user";

const StyledLink = styled(Link)`
    opacity: ${(props) => (props.isActive ? "1" : "0.6")};
    cursor: ${(props) => (props.isActive ? "pointer" : "not-allowed")};
    text-decoration: none;
  `;

export function Test(props) {
  // context 사용하기 위해 가져오기
  const context = useContext(UserContext);

  // 문항 불러와서 saveData에 저장하기
  const [saveData, setSaveData] = useState([]);
  
  useEffect(() => {
    async function loadQuestion() {
      try {
        var config = {
          headers: { 'Access-Control-Allow-Origin': '*' }
        };
        const response = await axios.get(`http://www.career.go.kr/inspct/openapi/test/questions?apikey=${context.apikey}&q=6`, config);
        setSaveData(response.data['RESULT']);
      } catch (e) {
        console.log('에러 발생');
      }
    }
    loadQuestion();
  }, []);


  // 선택한 input 값 받아오기
  const inputsInitial = {}
  for (let i = 1; i < saveData.length+1; i++){
    inputsInitial[`B${i}`] = "";
  }
  const [ inputs, setInputs ] = useState(inputsInitial);
  const [ countPer, setCountPer ] = useState(0)
  function handleChange(e){
    const { value, name } = e.target;
    setInputs((cur) => {
      let newSetInputs = {...cur};
      newSetInputs[name]= value;
      return newSetInputs;
    });
    setAnswers((cur) => {
      let newAnswers = [...cur];
      newAnswers.push(value);
      return newAnswers
    })
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
  
  
  // useParams 사용해서 한 페이지당 5문항씩 페이지 나눠주기
  const params = useParams();
  let page = Number(params.page);
  let page_count = 1;
  let question_count = 0;
  
  const questions = saveData.filter(() => {
    question_count += 1;
    if ( question_count === 1) page_count = 1;
    else if (question_count % 5 === 1) page_count += 1;
    return page === page_count;
  });
  
  // 문항 만드는 템플릿 컴포넌트
  const [answers, setAnswers] = useState([])
  const memoAnswer = useMemo(() => { return answers.length }, [ answers ])

  const ShowQuestions = () => {
    const show = questions.map((item, idx)=>{
    return (
        <>
          <h3>{item.qitemNo}. {item.question}</h3>
          <form>
              <label><input type="radio" name={'B'+String(idx + 1)} onChange={handleChange} value={item.answerScore01} checked={inputs['B'+String(idx + 1)] === item.answerScore01 ? true : false } />{item.answer01}</label>
              <label><input type="radio" name={'B'+String(idx + 1)} onChange={handleChange} value={item.answerScore02} checked={inputs['B'+String(idx + 1)] === item.answerScore02 ? true : false } />{item.answer02}</label>
          </form>
        </>)
      })
    return show;
  }

 
  // 값을 선택하지 않으면 비활성화
  const [isActive, setIsActive] = useState(false);
  
  // isActive 관리를 어떻게 해줄건지.?????? 하
  useEffect(() => {
    if (memoAnswer === 0) setIsActive(false)
    else if (memoAnswer > 1) setIsActive(true);
  }, [ memoAnswer ])


  // 이전, 다음 버튼 설정해주는 컴포넌트
  function SetButton(){
    let page_num = Number(page)
    if ( page_num === 1 ){
      return(
        <>
        <Link to={'/testExample'}><button className="btn">이전</button></Link>
        { !isActive ?
        <StyledLink to={'/test/'+ (page_num+1)} isActive={isActive} onClick={(e) => {e.preventDefault(); }}>
          <button className={"btn " + ( isActive ? "activeBtn" : "disabledBtn" )}>다음</button>
        </StyledLink> :
        <StyledLink to={'/test/'+ (page_num+1)} isActive={isActive}>
        <button className={"btn " + ( isActive ? "activeBtn" : "disabledBtn" )}>다음</button>
        </StyledLink> }   
        </>
        )
      } else if (page_num === 6){
        return(
          <>
          <Link to={'/test/'+ (page_num-1)}><button className="btn">이전</button></Link>
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
        <Link to={'/test/'+ (page_num-1)}><button className="btn">이전</button></Link>
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
      {saveData && saveData.length > 0 ? 
      <ShowQuestions />
       : undefined}
      <br />
      <SetButton></SetButton>
    </>
  );
}
