# 직업 심리 검사 프로젝트
## 2021.11.16 ~ 2021.11.27 (약 2주간 진행)
### < 프로젝트 계획 이유 >
웹 프론트엔드 개발자를 지망하기 때문에, 웹 프론트엔드 프로젝트를 진행하며 리액트를 활용하여 웹개발을 하는 연습을 하기 위해 선택했다.

------

### < 프로젝트 설명 >
[직업심리검사 API](https://www.career.go.kr/cnet/front/openapi/openApiTestCenter.do)를 사용하여 사용자의 직업 적합도를 확인할 수 있는 웹 서비스입니다.<br>
직업 심리 검사 서비스는 사용자의 이름, 나이, 성별을 입력한 후, 직업 심리 검사를 진행하면 나와 성향이 맞는 직업을 추천해주고, 사용자의 직업 가치관과 가장 적합도가 높은 직업을 탐색할 수 있도록 도움을 주는 검사 결과를 보여주는 웹 서비스입니다.

------

### < 기술 스택 >
- Javascript
- Functional Components + Hooks
- React 
- react-router-dom 
- axios
- CSS
- Styled Components 

------

### < 직업 심리 검사 프로젝트 기능 설명 >
#### [유저 설정 페이지]
= 유저의 정보를 받아오는 페이지 이다.<br/> 이름과 성별을 입력하면, 검사시작 버튼이 활성화 된다.
- 이름 설정
- 성별 선택 

#### [검사 예시 페이지]
= 검사 예시 문항이 1개 나오며 검사 진행을 설명하는 페이지이다.<br>
예시 문항을 선택하면 검사 시작 버튼이 활성화 된다.
- 예시 문항 선택

#### [검사 진행 페이지]
= 검사를 진행하는 페이지이다.<br>
한 페이지에 5문항씩 보여지며, 모든 문항을 선택해야 다음 페이지로 넘어갈수 있다.<br>
이전 페이지로 넘어가 문항을 수정 할수 있으며, 이전 페이지로 넘어가도 선택한 값이 저장되어 있다.
- 문항의 답 선택 진행

#### [검사 완료 페이지]
= 검사를 완료했다는걸 알려주는 페이지 이다.
- 검사 보러가기 선택

#### [결과 페이지]
= 선택한 항목의 따른 검사결과를 보여주는 페이지이다.
- 유저 정보
- 유저가 선택한 값에 따른 직업 가치관과 관련 직업 결과
- 다시 시작하기 버튼으로 정보 초기화와 다시 검사시작 페이지로 돌아가기

------

### < 프로젝트 미리보기 >
#### [유저 설정 페이지]
<img width="1204" alt="스크린샷 2021-11-29 오후 10 26 38" src="https://user-images.githubusercontent.com/76836967/143882585-4229d66f-0d8a-4a2d-9348-18920e86d868.png">


------

#### [검사 예시 페이지]

<img width="1205" alt="스크린샷 2021-11-29 오후 10 26 59" src="https://user-images.githubusercontent.com/76836967/143882647-83eedd93-da7f-4dfd-a521-04c0070a9e7a.png">


------

#### [검사 진행 페이지]
<img width="1180" alt="스크린샷 2021-11-29 오후 10 27 12" src="https://user-images.githubusercontent.com/76836967/143882688-cd2403cb-a854-4509-a6e6-f54d117c0a44.png">


------

#### [검사 완료 페이지]
<img width="1201" alt="스크린샷 2021-11-29 오후 10 27 52" src="https://user-images.githubusercontent.com/76836967/143882437-5c08aa2d-753b-4b92-aa45-6fa08ca7bd7d.png">

------

#### [결과 페이지]
<img width="1200" alt="스크린샷 2021-11-29 오후 10 28 04" src="https://user-images.githubusercontent.com/76836967/143882741-775893fe-a940-4ffe-b1ab-4c669d065a46.png">

