import React, { createContext } from "react";

// user 정보를 담을 context를 만드는 곳

export const UserContext = createContext();

const UserStore = (props) => {
    const users = {
        "apikey" : "43c8e52955dbc4c8d2b69e98c6d641f2",
        "qestrnSeq" : "6",
        "trgetSe" : "100209",
        "name": "",
        "gender": "",
        "school": "",
        "grade": "",
        "email": "",
        "startDtm": 1550466291034,
        "answers": ""
}

    return (<UserContext.Provider value={users}>{props.children}</UserContext.Provider>
    );
};

export default UserStore;