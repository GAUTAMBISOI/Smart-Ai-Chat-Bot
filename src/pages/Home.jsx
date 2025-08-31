import {
  ArrowUp,
  Image,
  ImageUp,
  MessageSquare,
  Moon,
  Plus,
  Sun,
} from "lucide-react";
import { useContext } from "react";
import { DataContext, prevUser, user } from "../utils/UserContext";
import Chat from "./Chat";
import { generateResponse } from "../gemini.js";
import { toast } from "react-toastify";
import { query } from "../huggingFace.js";

const Home = () => {
  const {
    theme,
    setTheme,
    startRes,
    setStartRes,
    popUp,
    setPopUp,
    input,
    setInput,
    feat,
    setFeat,
    setShowResult,genImgUrl, setGenImgUrl
  } = useContext(DataContext);


  const handlerform = async (e) => {
    e.preventDefault();
    setStartRes(true);
    setFeat(feat)
    setShowResult("Loading....");
    prevUser.data = user.data;
    prevUser.mime_type = user.mime_type;
    prevUser.imgUrl = user.imgUrl;
    prevUser.prompt = input;
    setInput("");
    let result = await generateResponse();
    setShowResult(result);
    setFeat("chat");
    user.data = null;
    user.mime_type = null;
    user.imgUrl = null;
  };

  const handleImage = (e) => {
    setFeat("upImg");
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = (event) => {
      let base64 = event.target.result.split(",")[1];
      user.data = base64;
      user.mime_type = file.type;
      console.log(event);

      user.imgUrl = `data:${user.mime_type}; base64,${user.data}`;
    };
    reader.readAsDataURL(file);
    toast.success("Image uploaded");
  };

 const handleGenerateImg = async () => {
  setStartRes(true);
  setFeat("genImg"); // ✅ force feat to genImg
  setGenImgUrl("");
  prevUser.prompt = input;

  try {
    let blob = await query(); // assuming query() returns blob
    let url = URL.createObjectURL(blob);
    setGenImgUrl(url);
    console.log("Generated Image URL:", url);
  } catch (err) {
    console.error("Image generation failed:", err);
  }

  setInput("");
  // ❌ remove this line (nahi toh turant "chat" pe chala jaega)
  // setFeat("chat")
};
  return (
    <div
      className={`${
        !theme
          ? "w-full h-screen bg-[#212121] text-white "
          : "w-full h-screen bg-white text-black "
      }`}
    >
      <nav className="w-full h-[8vh] p-2 flex items-center justify-between gap-2 overflow-hidden px-2">
        <div className="flex items-center justify-center gap-2">
          <img
            className="h-[5vh] w-[5vh] rounded-full"
            src="/logo.png"
            alt=""
          />
          <span className="tracking-tight font-semibold text-xl md:text-xl lg:text-2xl">
            Smart{" "}
            <span className="text-purple-500 text-2xl md:text-2xl lg:text-3xl">
              AI
            </span>{" "}
            Bot
          </span>
        </div>
        <div className="mr-5">
          {!theme ? (
            <Sun onClick={() => setTheme(!theme)} />
          ) : (
            <Moon onClick={() => setTheme(!theme)} />
          )}
        </div>
      </nav>
      <input
        type="file"
        accept="image/*"
        hidden
        id="inputImg"
        onChange={handleImage}
      />
      {!startRes ? (
        <div className="w-full h-[82vh]  flex flex-col items-center  justify-center flex-wrap gap-5  lg:gap-2">
          <span className="text-3xl font-semibold tracking-tighter">
            What can I help with ?
          </span>
          <div className="flex items-center gap-5 p-3 md:gap-6 lg:gap-8 justify-center flex-wrap transition-all duration-300 cursor-pointer">
            <div
              className="flex items-center justify-center border-2 p-1 rounded-3xl hover:bg-gray-700 transition-all duration-200 "
              onClick={() => {
                document.getElementById("inputImg").click();
              }}
            >
              {" "}
              <ImageUp
                className="px-1"
                color="green"
                size={32}
                strokeWidth={2}
              />{" "}
              <span className="p-2">Upload Image</span>
            </div>
            <div
              className="flex items-center justify-center border-2 p-1 rounded-3xl hover:bg-gray-700 transition-all duration-200"
              onClick={() =>{setFeat("genImg")} }
            >
              {" "}
              <Image
                className="px-1"
                color="#83C8F2"
                size={32}
                strokeWidth={2}
              />{" "}
              <span className="p-2">Generate Image</span>
            </div>
            <div
              className="flex items-center justify-center border-2 p-1 rounded-3xl hover:bg-gray-700 transition-all duration-200"
              onClick={() => setFeat("chat")}
            >
              {" "}
              <MessageSquare
                className="px-1"
                color="orange"
                size={32}
                strokeWidth={2}
              />{" "}
              <span className="p-2">Let's Chat</span>
            </div>
          </div>
        </div>
      ) : (
        <Chat />
      )}

      <form
        className="w-full h-[10vh] flex items-center justify-center fixed gap-5 p-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (input.length > 0) {
            if(feat=="genImg"){
              handleGenerateImg()
            }else{
               handlerform(e);
            }
           
          }
        }}
      >
        {popUp ? (
          <div
            className={`${
              !theme
                ? "absolute md:h-[13vh] md:w-[10vw]  lg:h-[15vh] lg:w-[12vw] bg-[#212121] bottom-22 left-2 md:bottom-23 md:left-43 lg:bottom-25 lg:left-45 p-5 border rounded-2xl cursor-pointer"
                : "absolute md:h-[13vh] md:w-[10vw]  lg:h-[15vh] lg:w-[12vw] bg-white text-black bottom-22 left-2 md:bottom-23 md:left-43 lg:bottom-25 lg:left-45 p-5 border rounded-2xl cursor-pointer"
            }`}
          >
            <div
              className={`${
                !theme
                  ? "flex items-center justify-start  rounded-3xl p-1 hover:bg-gray-700 transition-all duration-200"
                  : "flex items-center justify-start  rounded-3xl p-1 hover:bg-black hover:text-white transition-all duration-200"
              }`}
              onClick={() => {
                document.getElementById("inputImg").click();
                setPopUp(false)
              }}
            >
              <ImageUp
                className="px-1"
                color="green"
                size={28}
                strokeWidth={2}
              />{" "}
              <span className="p-2 ">Upload Image</span>
            </div>
            <div
              className={`${
                !theme
                  ? "flex items-center justify-start  rounded-3xl p-1 hover:bg-gray-700 transition-all duration-200"
                  : "flex items-center justify-start  rounded-3xl p-1 hover:bg-black hover:text-white transition-all duration-200"
              }`}
              onClick={() =>{setFeat("genImg") , setPopUp(false)} }
            >
              <Image
                className="px-1"
                color="#83C8F2"
                size={28}
                strokeWidth={2}
              />{" "}
              <span className="p-2 ">Generate Image</span>
            </div>
          </div>
        ) : null}

        <span
          className="px-2 py-1 border rounded-full cursor-pointer hover:bg-gray-700"
          onClick={() => setPopUp(!popUp)}
        >
          {feat == "chat" ? <Plus /> : <Image color="#83C8F2" />}
        </span>
        <input
          className="w-[70%] p-2 border outline-none "
          type="text"
          placeholder="Ask what you want to know"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <span
          className="px-2 py-1 border rounded-full cursor-pointer hover:bg-gray-700"
          onClick={() => {
            if (input.length > 0) {
              setStartRes(true);
              setInput("");
            }
          }}
        >
          <ArrowUp />
        </span>
      </form>
    </div>
  );
};

export default Home;









