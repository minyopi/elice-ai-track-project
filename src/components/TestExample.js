import React from 'react';
import { Link } from 'react-router-dom';

export function TestExample() {
  return (
    <>
      <h2>검사예시</h2>
      <h3>0%</h3>
      <p>
        직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에 표시하세요.<br />
      가치의 뜻을 잘모르겠다면 문항 아래에 있는 가치의 설명을 확인해보세요.
    </p>
      <h3>두개 가치 중에 자신에게 더 중요한 가치를 선택하세요.</h3>
      <input type="radio" name="answer" value="answer"></input>
      <label htmlFor="answer">능력발휘</label>
      <input type="radio" name="answer" value="answer"></input>
      <label htmlFor="answer">자율성</label>
      <br />
      <button type="button"><Link to='/test/1'>검사시작</Link></button>
    </>
  );
}
