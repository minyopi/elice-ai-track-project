import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from "../store/user";

export function Result() {
  const context = useContext(UserContext);
  const [data, setData] = useState({})
  const [seq, setSeq] = useState("")
  const [jsonData, setJsonData] = useState([])

  useEffect(() => {
    async function loadResult(){
      try {
        const response = await axios.post(`http://www.career.go.kr/inspct/openapi/test/report?apikey=${context.apikey}&qestrnSeq=6`, context);
        setData(response.data['RESULT']);
        setSeq(data.url.split("seq=")[1]);
        console.log(seq)
      } catch (e) {
        console.log('POST 요청에서 에러 발생');
      }
    }
    loadResult();
  }, [])
  
  useEffect(()=>{
    async function loadJsonData(){
      try {
        var config = {
          headers: { 'Access-Control-Allow-Origin': '*' }
        };
        const response2 = await axios.get(`https://www.career.go.kr/inspct/api/psycho/report?seq=${seq}`, config);
        setJsonData(response2['data'])
      } catch (error) {
        console.log("JSON Data GET요청에서 에러 발생")
      }
    }
    loadJsonData();
  }, [seq])

  return (
    <>
      <h1>직업가치관검사 결과표</h1>
      <p>직업가치관이란 직업을 선택할 때 영향을 끼치는 자신만의 믿음과 신념입니다. 따라서 여러분의 직업생활과 관련하여 포기하지 않는 무게중심의 역할을 한다고 볼 수 있습니다. 직업가치관검사는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게 생각하는지를 알려줍니다. 또한 본인이 가장 중요하게 생각하는 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼 기회를 제공합니다.</p>
      { jsonData ?
      <>
      <table border="1">
        <th>이름</th>
        <th>성별</th>
        <th>검사일</th>
        <tr>
          <td>{context.name}</td>
          <td>{context.gender === "100323" ? "남" : "여"}</td>
          <td>{jsonData.result.endDtm.slice(0,10).split("-").join(".")}</td>
        </tr>
      </table>
      </>
      : undefined}
      <h2>직업가치관 결과</h2>
      <h2>가치관과 관련이 높은 직업</h2>
      <Link to='/'><button>다시 검사하기</button></Link>
    </>
  );
}
