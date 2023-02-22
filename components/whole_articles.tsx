import {useEffect,useState,FC,useLayoutEffect} from "react"
import type { PageObj,TagObj } from "@/utils/process_page"; 
import { create_page_to_pageobj } from "@/utils/process_page";
import { Grid, GridItem,Text,Center} from '@chakra-ui/react'
import { PagePreview } from "@/components/preview";

const  WholeArtilcles:FC<{content:Array<PageObj>}> = (props:{content:Array<PageObj>})=> {
  const content = props.content
  
  const useWindowSize = ():number[] =>{
    const [windowsize,SetWindowsize] = useState<number[]>([0,0])
    useLayoutEffect(()=>{
      SetWindowsize([innerWidth,innerHeight])
      const updateSize = ()=>{SetWindowsize([window.innerWidth,window.innerHeight]);}
      window.addEventListener("resize",updateSize)
      return ()=>window.removeEventListener("resize",updateSize)
    },[])
    return windowsize
  }
  
  const size = useWindowSize()

  //adjust grid size
    let templateColumns = "1fr"
    let autoRows = "100px"
    if (size[0]*0.7 <= 500){templateColumns=`${size[0] * 0.6}px`;autoRows=`${size[0]*0.6}px`}
    else if (size[0]*0.7 <= 1000){templateColumns=`${size[0]*0.3}px `.repeat(2);autoRows=`${size[0]*0.3}px`}
    else if (size[0]*0.7 <= 1500){templateColumns="1fr 1fr 1fr";autoRows=`600px`}
    else if (size[0]*0.7 <= 1500){templateColumns="1fr 1fr 1fr";autoRows=`800px`}
    else if (size[0]*0.7 <= 4000){templateColumns="1fr 1fr 1fr";autoRows=`1000px`}
    else if (size[0]*0.7 > 4000){templateColumns="1fr 1fr 1fr";autoRows=`2000px`}


  return (
    <Center>
     <Grid m="20px" w="90%" templateColumns={templateColumns} gridAutoRows={autoRows} marginLeft="5%" gap={6}>
      {
      content.length > 0 ?
        content.map(item => <GridItem w="100%" h="100%" colSpan={1} rowSpan={1} key={item.name}><PagePreview page={item}/></GridItem>)
        :<Text>記事がありません</Text>
      }

    </Grid>
    </Center>
  )
}

export default WholeArtilcles