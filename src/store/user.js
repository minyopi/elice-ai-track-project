import React, { createContext } from "react";
import{ apikey }from './key'

// user 정보를 담을 context를 만드는 곳

export const UserContext = createContext();

const UserStore = (props) => {
    const users = {
        "apikey" : apikey,
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