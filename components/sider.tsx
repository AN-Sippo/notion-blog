import {useState,FC, PropsWithChildren} from "react"
import {Box,Stack,Card,CardBody,Image,Center,Text,Grid,GridItem, Drawer, DrawerContent, DrawerBody, DrawerHeader} from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons"
import { Tag_Search } from "./tag_search"
import type { search_tag_prop } from "./tag"
import { useWindowSize } from "@/utils/hooks"

export type propsToHandleTags = {
    allTags:{[key:string]:search_tag_prop}
    setTagState:(tag_name:string,bool:boolean)=>void
}




const Sider:FC<propsToHandleTags> = (props:propsToHandleTags) =>{
    const allTags:{[key:string]:search_tag_prop} = props.allTags
    const setTagState:(tag_name:string,bool:boolean)=>void = props.setTagState
    const size = useWindowSize();
    const w = size[0];
    
    const self_introduction = "機械学習・Flutter・webなど。最近は、web(特にReact)にはまっている。"
    return (
    <Box  w="100%" borderLeft="solid whitesmoke" h="100%"> {/* サイド全体のラッパー */}
        <Stack  w="100%" h="100%">
            <Box  w="100%" padding="10px"> {/* 名刺部分のラッパー */}
                <Card backgroundColor="rgba(0,0,0,0)" w="100%" bg="whitesmoke">
                    <CardBody>
                        <Stack>
                            <Center w="100%"><Image borderRadius="full" src="icon.jpg" boxSize="150px"/></Center>
                            <Center bg="whitesmoke" borderRadius="md"><Text>{self_introduction}</Text></Center>
                        </Stack>
                    </CardBody>
                </Card>
            </Box>

            <Tag_Search allTags={props.allTags} setTagState={setTagState}/>
        </Stack>
    </Box>
    )
}

export {Sider}