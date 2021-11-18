import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { key } from '../key';
import { useParams, Link } from 'react-router-dom';

// 문항 만드는 템플릿 컴포넌트
function Question(props){
  return(
    <>
      <h3>{props.item.qitemNo}. {props.item.question}</h3>
      <form>
        <input type="radio" id={"answer" + String(props.idx + 1) + "-1"} name={"answer" + String(props.idx + 1)} value="1"></input>
        <label htmlFor={"answer" + String(props.idx + 1) + "-1"}>{props.item.answer01}</label>
        <input type="radio" id={"answer" + String(props.idx + 1) + "-2"} name={"answer" + String(props.idx + 1)} value="2"></input>
        <label htmlFor={"answer" + String(props.idx + 1) + "-2"}>{props.item.answer02}</label>
        <input type="radio" id={"answer" + String(props.idx + 1) + "-3"} name={"answer" + String(props.idx + 1)} value="3"></input>
        <label htmlFor={"answer" + String(props.idx + 1) + "-3"}>{props.item.answer03}</label>
        <input type="radio" id={"answer" + String(props.idx + 1) + "-4"} name={"answer" + String(props.idx + 1)} value="4"></input>
        <label htmlFor={"answer" + String(props.idx + 1) + "-4"}>{props.item.answer04}</label>
        <input type="radio" id={"answer" + String(props.idx + 1) + "-5"} name={"answer" + String(props.idx + 1)} value="5"></input>
        <label htmlFor={"answer" + String(props.idx + 1) + "-5"}>{props.item.answer05}</label>
      </form>
    </>
  )
}

export function Test() {
  // 문항 불러와서 saveData에 저장하기
  const [saveData, setSaveData] = useState([]);

  useEffect(() => {
    async function loadQuestion() {
      try {
        var config = {
          headers: { 'Access-Control-Allow-Origin': '*' }
        };
        const response = await axios.get(`http://www.career.go.kr/inspct/openapi/test/questions?apikey=${key}&q=25`, config);
        setSaveData(response.data['RESULT']);
        console.log(saveData);
      } catch (e) {
        console.log('에러 발생');
      }
    }
    loadQuestion();
  }, []);
  

  // useParams 사용해서 5문항씩 페이지 나눠주기
  const params = useParams();
  let page = Number(params.page);
  let page_count = 1;
  let question_count = 0;

  const questions = saveData.map((item, idx) => {
    question_count += 1;
    if(question_count % 5 === 0) page_count += 1;
    if (page === page_count){
      return <Question item={item} idx={idx+1} key={idx+1} ></Question>;
    }
  });

    // 이전, 다음 버튼 설정해주는 컴포넌트
    function SetButton(){
      let page_num = Number(page)
      if ( page_num === 1 ){
        return(
          <>
          <Link to={'/test/'+ (page_num+1)}><button>다음</button></Link>      
          </>
          )
        } else if (page_num === 10){
          return(
            <>
            <Link to={'/test/'+ (page_num-1)}><button>이전</button></Link>
            <Link to={'/finishTest'}><button>완료</button></Link>
            </>
          )
        }
      return(
        <>
          <Link to={'/test/'+ (page_num-1)}><button>이전</button></Link>
          <Link to={'/test/'+ (page_num+1)}><button>다음</button></Link>
        </>
      )
    }

  return (
    <>
      <h2>검사 진행</h2>
      <h3>0%</h3>
      {saveData && saveData.length > 0 ? questions : undefined}
      <br />
      <SetButton></SetButton>
    </>
  );
}
