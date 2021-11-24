import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from "../store/user";

export function Result() {
  const context = useContext(UserContext);
  const [jsonData, setJsonData] = useState({})

  useEffect(() => {
    async function load(){
      let seq = "";
      async function loadResult(){
        try {
          const response = await axios.post(`http://www.career.go.kr/inspct/openapi/test/report?apikey=${context.apikey}&qestrnSeq=6`, context);
          seq = response.data.RESULT['url'].split("seq=")[1];
          console.log('POST 불러오기 성공');
        } catch (e) {
          console.log('POST 요청에서 에러 발생');
        }
      }
      async function loadJsonData(){
        try {
          const response2 = await axios.get(`https://www.career.go.kr/inspct/api/psycho/report?seq=${seq}`);
          setJsonData(response2['data'])
        } catch (error) {
          console.log("JSON Data GET요청에서 에러 발생")
        }
      }
      async function loadJobInfo(){
        try {
          
        } catch (e) {
          console.log("관련 직종 GET 요청에서 에러")
        }
      }
      async function loadMajorInfo(){
        try {
          
        } catch (e) {
          console.log("관련 학과 GET 요청에서 에러")
        }
      }
      await loadResult();
      await loadJsonData();
    }
    load();
  }, [ ])
  

  return (
    <>
      <h1>직업가치관검사 결과표</h1>
      <p>직업가치관이란 직업을 선택할 때 영향을 끼치는 자신만의 믿음과 신념입니다. 따라서 여러분의 직업생활과 관련하여 포기하지 않는 무게중심의 역할을 한다고 볼 수 있습니다. 직업가치관검사는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게 생각하는지를 알려줍니다. 또한 본인이 가장 중요하게 생각하는 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼 기회를 제공합니다.</p>
      { jsonData && Object.keys(jsonData).length > 0 ?
      <>
      <table border="1">
        <th>이름</th>
        <th>성별</th>
        <th>검사일</th>
        <tr>
          <td>{context.name}</td>
          <td>{context.gender === "100323" ? "남" : "여"}</td>
          <td>{jsonData.result['endDtm'].slice(0,10).split("-").join(".")}</td>
        </tr>
      </table>
      <h2>직업가치관 결과</h2>
      <h2>가치관과 관련이 높은 직업</h2>
      </>
      : undefined}
      <Link to='/'><button>다시 검사하기</button></Link>
    </>
  );
}
