import React, { createContext } from "react";

// user 정보를 담을 context를 만드는 곳

export const UserContext = createContext();

const UserStore = (props) => {
    const users = {
        apikey : "43c8e52955dbc4c8d2b69e98c6d641f2",
        qestrnSeq : "25",
        trgetSe : "100207",
        name : "",
        gender : "",
        school : "",
        grade : "",
        email : "",
        startDtm : 1550466291034,
        answers: "1=3 2=7 3=3 4=7 5=1 6=2 7=1 8=5 9=5 10=1 11=4 12=4 13=5 14=4 15=4 16=4 17=4 18=5 19=1 20=1 21=1 22=5 23=3 24=6 25=3 26=2 27=2 28=6 29=3 30=2 31=4 32=3 33=5 34=2 35=3 36=2 37=7 38=2 39=5 40=5 41=5 42=1 43=7 44=6 45=5 46=4 47=2 48=5 49=4"
      }

    return (<UserContext.Provider value={users}>{props.children}</UserContext.Provider>
    );
};

export default UserStore;