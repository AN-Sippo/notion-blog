import {FC} from "react";
import type { rich_text_block } from "@/utils/block_type";
import {Text,Box} from "@chakra-ui/react";

export const RichText:FC<rich_text_block> = (props) =>{
    const text = props.content;
    return (
        <p >{text}</p>
    )
}