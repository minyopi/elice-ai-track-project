import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { key } from '../key';
import { useParams, Link } from 'react-router-dom';


export function Test(props) {
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
        console.log("saveData =",saveData);
      } catch (e) {
        console.log('에러 발생');
      }
    }
    loadQuestion();
  }, []);


  // 선택한 input 값 받아오기
  // const inputsInitial = {}
  // for (let i = 1; i < saveData.length+1; i++){
  //   inputsInitial[`${i}`] = "";
  // }
  const [inputs, setInputs] = useState({});
  function handleChange(e){
    const { value, name } = e.target;
    setInputs((cur) => {
      let newSetInputs = {...cur};
      newSetInputs[name]= value;
      return newSetInputs;
    });
  }
  console.log("inputs=",inputs)

  // 문항 만드는 템플릿 컴포넌트
  function Question(props){
    return(
      <>
        <div>
          <h3>{props.item.qitemNo}. {props.item.question}</h3>
          <label><input type="radio" name={String(props.idx + 1)} onChange={handleChange} value="1" />{props.item.answer01}</label>
          <label><input type="radio" name={String(props.idx + 1)} onChange={handleChange} value="2" />{props.item.answer02}</label>
          <label><input type="radio" name={String(props.idx + 1)} onChange={handleChange} value="3" />{props.item.answer03}</label>
          <label><input type="radio" name={String(props.idx + 1)} onChange={handleChange} value="4" />{props.item.answer04}</label>
          <label><input type="radio" name={String(props.idx + 1)} onChange={handleChange} value="5" />{props.item.answer05}</label>
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
    if(question_count % 5 === 0) page_count += 1;
    if (page === page_count){
      return <Question item={item} idx={idx} key={idx+1} ></Question>;
    }
  });

  

  // 이전, 다음 버튼 설정해주는 컴포넌트
  function SetButton(){
    let page_num = Number(page)
    if ( page_num === 1 ){
      return(
        <>
        <Link to={'/testExample'}><button>이전</button></Link>
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
