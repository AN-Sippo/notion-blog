import { useState,useLayoutEffect } from "react"

export const useWindowSize = ():number[] =>{
    const [windowsize,SetWindowsize] = useState<number[]>([0,0])
    useLayoutEffect(()=>{
      SetWindowsize([innerWidth,innerHeight])
      const updateSize = ()=>{SetWindowsize([window.innerWidth,window.innerHeight]);}
      window.addEventListener("resize",updateSize)
      return ()=>window.removeEventListener("resize",updateSize)
    },[])
    return windowsize
  }