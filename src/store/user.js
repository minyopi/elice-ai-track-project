import React, { createContext } from "react";

// user 정보를 담을 context를 만드는 곳

export const UserContext = createContext();

const UserStore = (props) => {
    const users = {
        "apikey" : "43c8e52955dbc4c8d2b69e98c6d641f2",
        "qestrnSeq" : "6",
        "trgetSe" : "100209",
        "name": "홍길동",
        "gender": "100323",
        "school": "",
        "grade": "",
        "email": "",
        "startDtm": 1550466291034,
        "answers": "B1=2 B2=4 B3=6 B4=8 B5=10 B6=11 B7=14 B8=15 B9=17 B10=19 B11=21 B12=23 B13=26 B14=28 B15=29 B16=31 B17=34 B18=35 B19=38 B20=40 B21=41 B22=43 B23=45 B24=47 B25=50 B27=54 B26=51 B28=56"

}

    return (<UserContext.Provider value={users}>{props.children}</UserContext.Provider>
    );
};

export default UserStore;