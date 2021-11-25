import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from "../store/user";
const BasicLink = styled(Link)`
  text-decoration: none;
`;
const ChartBar = styled.div`
  width: 100%;
  height: ${props => props.num*15}%;
  background-color: #B2ACFA;
  // border: 2px solid blue;
  position: absolute;
  bottom: 0;
  left: 0;
`;

export function Result() {
  const context = useContext(UserContext);
  const [jsonData, setJsonData] = useState({})
  const [jobInfo, setJobInfo] = useState([])
  const [majorInfo, setMajorInfo] = useState([])

  // POST, GET 통신으로 정보 받아오기
  useEffect(() => {
    async function load(){
      let seq = "";
      let maxNum1 = "";
      let maxNum2 = "";
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
          const wonScore = response2['data'].result['wonScore'];
          const getMaxNum = [];
          for (let i of wonScore.split(" ")){
              let wonScoreValue = i.split("=")
              getMaxNum.push([parseInt(wonScoreValue[1]),wonScoreValue[0]])
          }
          let maxNums = []
          for (let i = 0; i < getMaxNum.length; i++){
              if (maxNums.length < 2){
                  maxNums.push(getMaxNum[i])
                  maxNums.sort()
              } else {
                  for (let j = 0; j < maxNums.length; j++){
                      if (maxNums[j][0] < getMaxNum[i][0]){
                          maxNums.shift()
                          maxNums.push(getMaxNum[i])
                          maxNums.sort()
                      }
                  }
              }
          }
          maxNum1 = maxNums[1][1];
          maxNum2 = maxNums[0][1];
        } catch (error) {
          console.log("JSON Data GET요청에서 에러 발생")
        }
      }
      async function loadJobInfo(){
        try {
          const response3 = await axios.get(`https://inspct.career.go.kr/inspct/api/psycho/value/jobs?no1=${maxNum1}&no2=${maxNum2}`);
          setJobInfo(response3['data'])
        } catch (e) {
          console.log("관련 직종 GET 요청에서 에러")
        }
      }
      async function loadMajorInfo(){
        try {
          const response4 = await axios.get(`https://inspct.career.go.kr/inspct/api/psycho/value/majors?no1=${maxNum1}&no2=${maxNum2}`);
          setMajorInfo(response4['data'])
        } catch (e) {
          console.log("관련 학과 GET 요청에서 에러")
        }
      }
      await loadResult();
      await loadJsonData();
      await loadJobInfo();
      await loadMajorInfo();
    }
    load();
  }, [ ])

  function ShowJobInfo(){
    const graduateHigh = jobInfo
    .filter((item) => {
      return item[2] === 1 || item[2] === 2
    })
    .map((item) => {
      return item[1]
    })
    .join(", ");

    const graduateCollege = jobInfo
    .filter((item) => {
      return item[2] === 3
    })
    .map((item) => {
      return item[1]
    })
    .join(", ");

    const graduateUniv = jobInfo
    .filter((item) => {
      return item[2] === 4
    })
    .map((item) => {
      return item[1]
    })
    .join(", ");

    const graduateGrad = jobInfo
    .filter((item) => {
      return item[2] === 5
    })
    .map((item) => {
      return item[1]
    })
    .join(", ");
    


    return (
    <>
      <h3>종사자 평균 학력별</h3>
      <table>
        <th className="job-th-1">분야</th>
        <th className="job-th-1">직업</th>
        <tr>
          <td>고졸</td>
          <td>{graduateHigh}</td>
        </tr>
        <tr>
          <td>전문대졸</td>
          <td>{graduateCollege}</td>
        </tr>
        <tr>
          <td>대졸</td>
          <td>{graduateUniv}</td>
        </tr>
        <tr>
          <td>대학원졸</td>
          <td>{graduateGrad}</td>
        </tr>
      </table>
    </>
    )
  }

  function ShowMajorInfo(){
    return (
    <>
      <h3>종사자 평균 전공별</h3>
      <table>
        <th className="major-th-1">분야</th>
        <th className="major-th-2">직업</th>
        <tr>
          <td>계열무관</td>
          <td>
            {majorInfo
              .filter((item) => {
                return item[2] === 0
              })
              .map((item) => {
                return item[1]
              })
              .join(", ")}
          </td>
        </tr>
        <tr>
          <td>인문</td>
          <td>
            {majorInfo
              .filter((item) => {
                return item[2] === 1
              })
              .map((item) => {
                return item[1]
              })
              .join(", ")}
          </td>
        </tr>
        <tr>
          <td>사회</td>
          <td>
            {majorInfo
              .filter((item) => {
                return item[2] === 2
              })
              .map((item) => {
                return item[1]
              })
              .join(", ")}
          </td>
        </tr>
        <tr>
          <td>교육</td>
          <td>
            {majorInfo
              .filter((item) => {
                return item[2] === 3
              })
              .map((item) => {
                return item[1]
              })
              .join(", ")}
          </td>
        </tr>
        <tr>
          <td>공학</td>
          <td>
            {majorInfo
              .filter((item) => {
                return item[2] === 4
              })
              .map((item) => {
                return item[1]
              })
              .join(", ")}
          </td>
        </tr>
        <tr>
          <td>자연</td>
          <td>
            {majorInfo
              .filter((item) => {
                return item[2] === 5
              })
              .map((item) => {
                return item[1]
              })
              .join(", ")}
          </td>
        </tr>
        <tr>
          <td>의학</td>
          <td>
            {majorInfo
              .filter((item) => {
                return item[2] === 6
              })
              .map((item) => {
                return item[1]
              })
              .join(", ")}
          </td>
        </tr>
        <tr>
          <td>예체능</td>
          <td>
            {majorInfo
              .filter((item) => {
                return item[2] === 7
              })
              .map((item) => {
                return item[1]
              })
              .join(", ")}
          </td>
        </tr>
      </table>
    </>
    )
  }
  
  function ShowChart(){
    const wonScore = jsonData.result['wonScore'];
    const wonScoreList = [];
    const wonScoreData = wonScore
      .split(" ")
      .map((item)=>{return item.split("=")[1]})
      .forEach((item)=>{wonScoreList.push(item)})
    return (
      <div className="chartBarContainer">
        { wonScoreList.map((item) => { 
          if (item !== undefined) {
            return(
            <div className="barContainer">
              <ChartBar num={parseInt(item)}>
                <p>{item}</p>
              </ChartBar>
            </div>
          )}
          }) }
      </div>
      );
  }

  return (
    <>
      <section className="result">
        <div className="inner">
          <div className="title">
            <h1>직업가치관검사 결과표</h1>
            <div className="h1Border"></div>
            <p>직업가치관이란 직업을 선택할 때 영향을 끼치는 자신만의 믿음과 신념입니다. 따라서 여러분의 직업생활과 관련하여 포기하지 않는 무게중심의 역할을 한다고 볼 수 있습니다. 직업가치관검사는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게 생각하는지를 알려줍니다. 또한 본인이 가장 중요하게 생각하는 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼 기회를 제공합니다.</p>
          </div>
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
          <div className="jobValue">
            <h2>직업가치관 결과</h2>
            <ShowChart />
          </div>
          </>
          : undefined}
          <div className="relativeJob">
            <h2>가치관과 관련이 높은 직업</h2>
            <div className="jobInfo">
              { jobInfo && jobInfo.length > 0 ? <ShowJobInfo /> : undefined }
            </div>
            <div className="majorInfo">
              { majorInfo && majorInfo.length > 0 ? <ShowMajorInfo /> : undefined }
            </div>
          </div>
          <div className="btnBox">
            <BasicLink to='/'><button className="btn">다시 검사하기</button></BasicLink>
          </div>
        </div>
      </section>
    </>
  );
}
