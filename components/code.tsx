import {FC} from "react";
import {Code,Center,Box} from "@chakra-ui/react"
import type { code_block,rich_text_block } from "@/utils/block_type";

export const CodeNotion:FC<code_block> = (props)=>{
    return (
        <Center >
            <Box bg="rgb(0,22,38)" w="70%" padding="2%">
                {props.content.map((richt:rich_text_block)=><pre><Code bg="rgb(0,22,38)" color="whitesmoke">{richt.content}</Code></pre>)}
            </Box>
        </Center>
    )
}