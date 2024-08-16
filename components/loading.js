import React, {useState, useEffect, useRef} from 'react'

function ActivityIndicator(props) {
    const indic = useRef();
  return (
    <div className={`bg-[#0000009c] absolute w-screen h-screen flex items-center justify-center z-[100] ${props.visible ? "visible" : "hidden"}`} ref={indic}>
        <div className='h-[60px] w-[60px] rounded-t-full border-t-[2px] animate-spin'></div>
    </div>
  )
}

export default ActivityIndicator
