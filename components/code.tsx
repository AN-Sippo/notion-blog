import {FC} from "react";
import {Code,Center,Box} from "@chakra-ui/react"
import type { code_block,rich_text_block } from "@/utils/block_type";

export const CodeNotion:FC<code_block> = (props)=>{
    console.log(props.content)
    return (
            <Box bg="rgb(0,22,38)" w="100%" padding="2%">
                <pre style={{whiteSpace:"pre-line"}}>
                {props.content.map((richt:rich_text_block,idx:number)=><p key={idx} style={{color:"whitesmoke"}} >{richt.content}</p>)}
                </pre>
            </Box>
    )
}