import React, {useState, useEffect} from 'react'
import { Link, Route, useParams } from 'react-router-dom';
// import './css/reset.css';
import axios from 'axios';
const key = '43c8e52955dbc4c8d2b69e98c6d641f2';

function SetUser(){
  const [username, setUsername] = useState()
  const [gender, setGender] = useState()
  
  return(
    <>
    <h1>직업가치관검사</h1>
    <form>
      이름: <input type="text" id="username" value={username}/>
      <br/>
      성별<br/>
      <input type="radio" id="male" name="gender" value={gender}></input>
      <label for="male">남자</label>
      <br/>
      <input type="radio" id="female" name="gender" value={gender}></input>
      <label for="female">여자</label>
      <br/>
      <button type="button">검사 시작</button>
    </form>
    </>
  )
}



function TestExample(){
  return(
    <>
    </>
  )
}



function Test(){
  const [saveData, setSaveData] = useState()
  const [countPer, setCountPer] = useState(0)

  useEffect(() => {
    async function loadQuestion(){
      try{
        const response = await axios.get(`http://www.career.go.kr/inspct/openapi/test/questions?apikey=${key}&q=25`)
        setSaveData(response.data.RESULT)
        console.log(saveData)
      } catch(e){
        console.log('에러 발생')
      }
    }
    loadQuestion();
  }, []);

  
  
  return (
  <>
    <h2>검사 진행</h2>
    <h3>{countPer}%</h3>
    { saveData && saveData.length > 0 ?
    (<>
    <h3>{saveData[0].qitemNo}. {saveData[0].question}</h3>
    <input type="radio" name="answer" value="answer"></input>
    <label for="answer">{saveData[0].answer01}</label>
    </>) : undefined }
    <br/>
  </>
)}

function App() {
  
  
  return (
    <div className="App">
      <Route exact path='/'>
       <SetUser></SetUser>
      </Route>
      <Route path='/testExample'>
        <TestExample></TestExample>
      </Route>
      <Route path='/test'>
        <Test></Test>
      </Route>
      <Route path='/finishTest'></Route>
      <Route path='/result'></Route>
    </div>
  );
}

export default App;
