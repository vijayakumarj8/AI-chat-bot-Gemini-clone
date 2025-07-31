// import { createContext, useState, useEffect } from "react";
// import runChat from "../config/Gemini";

// export const Context = createContext();

// const ContextProvider = (props) => {
//   const [input, setInput] = useState("");
//   const [response, setResponse] = useState("");

//   const onSent = async (prompt) => {
//     try {
//       const reply = await runChat(prompt);
//       console.log("Reply from Gemini:", reply); // ✅ Console output
//       setResponse(reply);
//     } catch (error) {
//       console.error("Error from Gemini API:", error); // ✅ Error logging
//     }
//   };

//   // ✅ Send default question once when component mounts
//   useEffect(() => {
//     onSent("What is html?");
//   }, []);

//   const contextValue = {
//     input,
//     setInput,
//     response,
//     setResponse,
//     onSent,
//   };

//   return (
//     <Context.Provider value={contextValue}>
//       {props.children}

//       {/* ✅ Button for testing in browser */}
//       <div style={{ padding: "10px" }}>
//         <button onClick={() => onSent("What is useState in React?")}>
//           Ask Gemini Again
//         </button>
//       </div>
//     </Context.Provider>
//   );
// };

// export default ContextProvider;










import { createContext, useState } from "react";
import runChat from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {

  const[input,setInput]=useState('')
  const[recentPrompts,setRecentPrompts]=useState('')
  const[prevPrompts,setPrevPrompts]=useState([])
  const[showResult,setShowResult]=useState(false)
  const[loading,setLoading]=useState(false)
  const[resultData,setResultdata]=useState('')

  const delayPara=(index,nextWord)=>{
    setTimeout(function(){
      setResultdata(prev=>prev+nextWord);

    },75*index)

  }
  const newChat=()=>{
    setLoading(false)
    setShowResult(false)

  }






  const onSent = async (prompt) => {
    setResultdata('')
    setLoading(true)
    setShowResult(true)
    let response;
    if(prompt!==undefined){
      response=await runChat(prompt)

    }
    else{
      setPrevPrompts(prev=>[...prev,input])
      setRecentPrompts(input)
      response=await runChat(input)
    }
    // setRecentPrompts(input)
    // setPrevPrompts(prev=>[...prev,input])
    // const response=await runChat(input)
    let responseArray=response.split("**");
    let newResponse=''
    for (let i=0;i<responseArray.length;i++)
    {
      if (i===0 || i%2 !==1){
        newResponse += responseArray[i];
      }
      else{
        newResponse+="<b>"+responseArray[i]+"</b>";
      }
    }
    let newResponse2=newResponse.split("*").join("</br>")
    // setResultdata(newResponse2)
    let newResponseArray=newResponse2.split(" ");
    for (let i=0;i<newResponseArray.length;i++){
      const nextWord=newResponseArray[i];
      delayPara(i,nextWord+' ')
    }
    setLoading(false)
    setInput('')

  };

  // onSent("what is html")

  const contextValue = {
   prevPrompts,
    setPrevPrompts,onSent,setRecentPrompts,recentPrompts,showResult,loading,resultData,input,setInput,newChat
    
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;



