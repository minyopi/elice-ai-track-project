import React from 'react';
import { Link } from 'react-router-dom';

export function Result() {
  return (
    <>
      <h1>결과 페이지 입니다.</h1>
      <Link to='/finishTest'><button>이전</button></Link>
      <Link to='/'><button>처음으로</button></Link>
    </>
  );
}
