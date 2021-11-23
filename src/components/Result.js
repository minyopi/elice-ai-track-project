import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from "../store/user";

export function Result() {
  const context = useContext(UserContext);
  const [data, setData] = useState({})

  useEffect(() => {
    async function loadResult(){
      try {
        const response = await axios.post(`http://www.career.go.kr/inspct/openapi/test/report?apikey=${context.apikey}&qestrnSeq=6`, context);
        setData(response.data.RESULT)
        console.log(data)
      } catch (e) {
        console.log('에러 발생');
      }
    }
    loadResult();
  }, [])
  console.log(context.answers)

  return (
    <>
      <h1>결과 페이지 입니다.</h1>
      {data &&
      <>
        <p>{data.inspctSeq}</p>
        <p>{data.url}</p> 
      </>
      }
      <Link to='/finishTest'><button>이전</button></Link>
      <Link to='/'><button>처음으로</button></Link>
    </>
  );
}
