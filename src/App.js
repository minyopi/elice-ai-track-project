import React, {useState, useEffect} from 'react'
import { Link, Route, useParams } from 'react-router-dom';
// import './css/reset.css';
import './css/app.css';
import axios from 'axios';

const key = '43c8e52955dbc4c8d2b69e98c6d641f2';

function SetUser(){
  const [username, setUsername] = useState()
  const [gender, setGender] = useState()
  const handleUsername = (e) => {
    setUsername(e.target.value);
  }
  const getGender = (e) => {
    setGender(e.target.value);
    console.log(gender)
  }

  //버튼은 className={isActive ? "activebtn" : "unactivebtn"} 으로 활성화

  return(
    <>
    <h1>직업가치관검사</h1>
    <form type="submit">
      이름: <input
        type="text"
        id="username"
        value={username}
        onChange={handleUsername}
        />
      <br/>
      성별<br/>
      <input type="radio" id="male" name="gender" value="male" onClick={getGender}/>
      <label for="male">남자</label>
      <br/>
      <input type="radio" id="female" name="gender" value="female" onClick={getGender}></input>
      <label for="female">여자</label>
      <br/>
      <button type="button"><Link to='/testExample'>검사 시작</Link></button>
    </form>
    </>
  )
}



function TestExample(){
  return(
    <>
    <h2>검사예시</h2>
    <h3>0%</h3>
    <p>
      직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에 표시하세요.<br/>
      가치의 뜻을 잘모르겠다면 문항 아래에 있는 가치의 설명을 확인해보세요.
    </p>
    <h3>두개 가치 중에 자신에게 더 중요한 가치를 선택하세요.</h3>
    <input type="radio" name="answer" value="answer"></input>
    <label for="answer">능력발휘</label>
    <input type="radio" name="answer" value="answer"></input>
    <label for="answer">자율성</label>
    <br/>
    <button type="button"><Link to='/test'>검사시작</Link></button>
    </>
  )
}



function Test(){
  const [saveData, setSaveData] = useState([])
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

  const questions = saveData.map((item) => {
    return(<>
      <h3>{item.qitemNo}. {item.question}</h3>
      <input type="radio" name="answer" value="answer"></input>
      <label for="answer">{item.answer01}</label>
      <input type="radio" name="answer" value="answer"></input>
      <label for="answer">{item.answer02}</label>
      <input type="radio" name="answer" value="answer"></input>
      <label for="answer">{item.answer03}</label>
      <input type="radio" name="answer" value="answer"></input>
      <label for="answer">{item.answer04}</label>
      <input type="radio" name="answer" value="answer"></input>
      <label for="answer">{item.answer05}</label>
      </>)
  });
  
  return (
  <>
    <h2>검사 진행</h2>
    <h3>{countPer}%</h3>
    { saveData && saveData.length > 0 ? questions : undefined }
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
