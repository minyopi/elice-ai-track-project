import React, { useState, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from "../store/user";

const IsActivateLink = styled(Link)`
  opacity: ${(props) => (props.isActive ? "1" : "0.6")};
  cursor: ${(props) => (props.isActive ? "pointer" : "not-allowed")};
  text-decoration: none;
`;
const BasicLink = styled(Link)`
  text-decoration: none;
`;

export function Test(props) {
  // context 사용하기 위해 가져오기
  const context = useContext(UserContext);
  // 문항 불러와서 saveData에 저장하기
  const [saveData, setSaveData] = useState([]);
  // 값을 선택하지 않으면 비활성화
  const [isActive, setIsActive] = useState(false);

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
  
  const questions = saveData.filter((item) => {
    question_count += 1;
    if ( question_count === 1) page_count = 1;
    else if (question_count % 5 === 1) {
      page_count += 1;
    }
    return page === page_count;
  });
  
  // 문항 만드는 템플릿 컴포넌트
  const ShowQuestions = () => {
    const show = questions.map((item)=>{
      return (
        <>
          <div className="question">
            <div className="text">
              <h3 className="q">{item.qitemNo}. {item.question}</h3>
              <form className="testInput">
                <label><input type="radio" name={'B'+String(item.qitemNo)} onChange={handleChange} value={item.answerScore01} checked={inputs['B'+String(item.qitemNo)] === item.answerScore01 ? true : false } />{item.answer01}</label>
                <label><input type="radio" name={'B'+String(item.qitemNo)} onChange={handleChange} value={item.answerScore02} checked={inputs['B'+String(item.qitemNo)] === item.answerScore02 ? true : false } />{item.answer02}</label>
              </form>
            </div>
          </div>
        </>)
      })
      return show;
    }
    
    
    // isActive 관리를 어떻게 해줄건지
    useEffect(() => {
      let checkInput = questions.map((item) => {
        return `B${item['qitemNo']}`
      });
      let checkPage = checkInput.map((item) => {
        if (inputs[item] === "" || inputs[item] === undefined) return false
        else return true
      });
      console.log(checkPage)
      if ( checkPage.indexOf(false) > -1 || checkPage.length === 0) setIsActive(false)
      else if (checkPage.indexOf(false) === -1) setIsActive(true)
    }, [ inputs ])
    
    
    // 이전, 다음 버튼 설정해주는 컴포넌트
  function SetButton(){
    let page_num = Number(page)
    if ( page_num === 1 ){
      return(
        <>
        <BasicLink to={'/testExample'}><button className="btn" onClick={() => {setIsActive(true)}}>이전</button></BasicLink>
        { !isActive ?
        <IsActivateLink to={'/test/'+ (page_num+1)} isActive={isActive} onClick={(e) => {e.preventDefault(); }}>
          <button className={"btn right " + ( isActive ? "activeBtn" : "disabledBtn" )}>다음</button>
        </IsActivateLink> :
        <IsActivateLink to={'/test/'+ (page_num+1)} isActive={isActive} onClick={() => {setIsActive(false)}} >
        <button className={"btn right " + ( isActive ? "activeBtn" : "disabledBtn" )}>다음</button>
        </IsActivateLink> }   
        </>
        )
      } else if (page_num === 6){
        return(
          <>
          <BasicLink to={'/test/'+ (page_num-1)}><button className="btn" onClick={() => {setIsActive(true)}}>이전</button></BasicLink>
          { !isActive ?
          <IsActivateLink to={'/finishTest'} isActive={isActive} onClick={(e) => {e.preventDefault(); }}>
            <button className={"btn right " + ( isActive ? "activeBtn" : "disabledBtn" )}>완료</button>
          </IsActivateLink> :
          <IsActivateLink to={'/finishTest'} isActive={isActive}>
          <button className={"btn right " + ( isActive ? "activeBtn" : "disabledBtn" )}>완료</button>
          </IsActivateLink> }
          </>
        )
      }
    return(
      <>
        <BasicLink to={'/test/'+ (page_num-1)}><button className="btn" onClick={() => {setIsActive(true)}}>이전</button></BasicLink>
        { !isActive ?
        <IsActivateLink to={'/test/'+ (page_num+1)} isActive={isActive} onClick={(e) => {e.preventDefault(); }}>
          <button className={"btn right " + ( isActive ? "activeBtn" : "disabledBtn" )}>다음</button>
        </IsActivateLink> :
        <IsActivateLink to={'/test/'+ (page_num+1)} isActive={isActive} onClick={() => {setIsActive(false)}}>
        <button className={"btn right " + ( isActive ? "activeBtn" : "disabledBtn" )}>다음</button>
        </IsActivateLink> }
      </>
    )
  }


  return (
    <>
      <section className="test">
        <div className="inner">
          <div className="content">
            <div className="title">
              <h2>검사 진행</h2>
              <h3 className="countPer">{countPer}%</h3>
            </div>
            <div className="countBar"></div>
            {saveData && saveData.length > 0 ? 
            <ShowQuestions />
             : undefined}
            <br />
            <div className="btnBox">
              <SetButton></SetButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
