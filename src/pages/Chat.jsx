import { useContext } from "react";
import { DataContext, prevUser } from "../utils/UserContext";

const Chat = () => {
  const { showResult, feat ,genImgUrl, setGenImgUrl} = useContext(DataContext);
  return (
    <div>
      <div
        className={`w-full h-[82vh] p-10 flex flex-col gap-8 overflow-y-auto`}
      >
        <div className="w-[100%] p-5 border-2 rounded-2xl flex flex-col gap-5 justify-center ">
          {feat == "upImg" ? (
            <>
              <img
                className="md:w-[28vw] md:h-[23vh] lg:w-[30vw] lg:h-[25vh] border-2 border-white rounded-2xl"
                src={prevUser.imgUrl}
                alt=""
              />
              <span className="text-2xl px-2">{prevUser.prompt}</span>
            </>
          ) : (
            <span className="text-2xl px-2">{prevUser.prompt}</span>
          )}
        </div>
        <div className="w-[100%] p-5 border-2 rounded-2xl">
          {feat=="genImg"? <>{!genImgUrl? <span>Generating Image...</span>:<img src={genImgUrl} alt=""/>}</>:<><span>{showResult}</span></>}
          
        </div>
      </div>
    </div>
  );
};

export default Chat;










