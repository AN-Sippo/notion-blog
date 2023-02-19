import {FC} from "react";
import type { paragraph_block,rich_text_block } from "@/utils/block_type";
import { RichText } from "./rich_text";
import {Box,Center} from "@chakra-ui/react"

export const Paragraph:FC<paragraph_block> = (props) =>{
   const content:Array<rich_text_block> = props.content
    return (
        <Box padding="0.2%">
            <Center >
            {content.map((rtx,idx)=><RichText {...rtx} key={idx}/>)}
            </Center>
        </Box>
    )
}
