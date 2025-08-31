import { createContext, useState } from "react";

export const DataContext = createContext();

export let user = {
  data: null,
  mime_type: null,
  imgUrl: null,
};

export let prevUser = {
  data: null,
  mime_type: null,
  prompt: null,
  imgUrl: null,
};
const UserContext = ({ children }) => {
  const [startRes, setStartRes] = useState(false);
  const [theme, setTheme] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [input, setInput] = useState("");
  const [showResult, setShowResult] = useState("");
  const [feat, setFeat] = useState("chat");
  const [genImgUrl, setGenImgUrl] = useState("")


  const data = {
    startRes,
    setStartRes,
    theme,
    setTheme,
    popUp,
    setPopUp,
    input,
    setInput,
    feat,
    setFeat,

    showResult,
    setShowResult,
    genImgUrl, setGenImgUrl
   
  };
  return (
    <div>
      <DataContext.Provider value={data}>{children}</DataContext.Provider>
    </div>
  );
};

export default UserContext;
