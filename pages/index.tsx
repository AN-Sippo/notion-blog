import {useEffect,useState,FC,PropsWithChildren} from "react"
import {Drawer,DrawerBody,DrawerContent,DrawerHeader, Grid, GridItem,Text,Box,Flex,Center} from '@chakra-ui/react'
import WholeArtilcles from "@/components/whole_articles";
import { HamburgerIcon } from "@chakra-ui/icons";
import Header from "@/utils/header";
import { Sider } from "@/components/sider";
import type { PageObj } from "@/utils/process_page";
import { create_page_to_pageobj } from "@/utils/process_page";
import type { search_tag_prop } from "@/components/tag";
import { filterTags } from "@/utils/filterTags";
import { useWindowSize } from "@/utils/hooks";

const Hamberger:FC<any> = (props)=>{
  const size = useWindowSize();
  const w = size[0];
  return(
      <>
      <Box ><HamburgerIcon boxSize="20" onClick={()=>props.setOpen((prev:boolean)=>!prev)} style={props.open?{transform:"rotate(-0.5turn)"}:{}}/></Box>
      </>
  )
  }

const  Home = ()=> {
  const [content,setContent] = useState<Array<PageObj>>([])
  const [allTags,setAllTags] = useState<{[key:string]:search_tag_prop}>({})
  const size = useWindowSize();
  const w = size[0];
  const [open,setOpen] = useState<boolean>(false)


  // fetch articles
  useEffect(
    () => {
      const fetcher = async (url:string)=>{
        const res = await fetch(url);
        const datas:any= await res.json()
        const datas_array:Array<any> = datas.results
        setContent(datas_array.map(data => create_page_to_pageobj(data)))
      }
      fetcher("api/fetch_test")
    },[]
  )

  // init AllTags
  useEffect(
    ()=>{
      let lst:{[key:string]:search_tag_prop} = {}
      content.forEach((page)=>{
        page.tags.forEach((tag)=>{
          //color 
          let color = tag.color
          if (tag.color == "default") color = "gray" //defaultで入ってくる謎仕様があったのでとりあえずこれで
          //name
          let name = tag.name

          lst[name] = {name:name,color:color,selected:false}
        })
      })
      setAllTags(lst)
    },[content]
  )// end of init AllTags

  const setTagState:(tag_name:string,bool:boolean)=>void = (tag_name:string,bool:boolean) =>{
    setAllTags(prev=>({...prev,[tag_name]:{"name":prev[tag_name].name,"color":prev[tag_name].color,"selected":bool}}))
  }// end of setTrue


  const pagesToShow:Array<PageObj> = filterTags(content,allTags)

  return (
    <>
    <Header/>
    <Flex h="100%" >
      {/* 記事部分 */}
      <Box h="100%" w={w < 700 ?"90%":"70%"} verticalAlign="top">
        <Center>
        <WholeArtilcles content={pagesToShow}/>
        </Center>
      </Box>

      {/* sider */}
      {w < 700 ? 
      <Hamberger open={open} setOpen={setOpen}/>
      :
      <Box w="30%" verticalAlign="top" h="100%">
        <Sider allTags={allTags} setTagState={setTagState}/>
      </Box>
      }
    </Flex>

    <Drawer isOpen={open} onClose={()=>{setOpen(false)}} size="lg">
          <DrawerContent bg="rgb(193,179,170)">
              <DrawerHeader>
                  <Box marginLeft="80%" w="20%"><HamburgerIcon boxSize="20" onClick={()=>setOpen((prev)=>!prev)} style={open?{transform:"rotate(0.5turn)"}:{}}/></Box>
              </DrawerHeader>
              <DrawerBody >
              <Sider allTags={allTags} setTagState={setTagState}/>
              </DrawerBody>
          </DrawerContent>
      </Drawer>
    </>
    
  )
}

export default Home