import React, {useEffect, useState} from 'react';

const FuncComp = () => {

  const [count, setCount] = useState(0)  

  useEffect(()=>{

  },[]) //  componentDidMount

  useEffect(()=>{

  }, [state1, state2, props1, props2]) // componentDidUpdate

  useEffect(()=>{
   return ()=>{

   } 
  }, []) // componentWillUnmount

  return (
    <>
        <div>
            <h1>Button Clicket : {count}</h1>
            <div>
                <button onClick={()=>{
                    setCount(prev=>prev+1)
                }}>
                    Click
                </button>
            </div>
        </div>
    </>
  )

}

export default FuncComp