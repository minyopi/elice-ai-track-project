import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { key } from '../key';

export function Test() {
  const [saveData, setSaveData] = useState([]);

  useEffect(() => {
    async function loadQuestion() {
      try {
        var config = {
          headers: { 'Access-Control-Allow-Origin': '*' }
        };
        const response = await axios.get(`http://www.career.go.kr/inspct/openapi/test/questions?apikey=${key}&q=25`, config);
        setSaveData(response.data.RESULT);
        console.log(saveData);
      } catch (e) {
        console.log('에러 발생');
      }
    }
    loadQuestion();
  }, []);


  const questions = saveData.map((item, idx) => {
    return (<>
      <h3>{item.qitemNo}. {item.question}</h3>
      <form>
        <input type="radio" id={"answer" + String(idx + 1) + "-1"} name={"answer" + String(idx + 1)} value="1"></input>
        <label for={"answer" + String(idx + 1) + "-1"}>{item.answer01}</label>
        <input type="radio" id={"answer" + String(idx + 1) + "-2"} name={"answer" + String(idx + 1)} value="2"></input>
        <label for={"answer" + String(idx + 1) + "-2"}>{item.answer02}</label>
        <input type="radio" id={"answer" + String(idx + 1) + "-3"} name={"answer" + String(idx + 1)} value="3"></input>
        <label for={"answer" + String(idx + 1) + "-3"}>{item.answer03}</label>
        <input type="radio" id={"answer" + String(idx + 1) + "-4"} name={"answer" + String(idx + 1)} value="4"></input>
        <label for={"answer" + String(idx + 1) + "-4"}>{item.answer04}</label>
        <input type="radio" id={"answer" + String(idx + 1) + "-5"} name={"answer" + String(idx + 1)} value="5"></input>
        <label for={"answer" + String(idx + 1) + "-5"}>{item.answer05}</label>
      </form>
    </>);
  });

  return (
    <>
      <h2>검사 진행</h2>
      <h3>0%</h3>
      {saveData && saveData.length > 0 ? questions : undefined}
      <br />
    </>
  );
}
