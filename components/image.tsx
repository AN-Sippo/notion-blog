import {FC} from "react";
import type { image_block } from "@/utils/block_type";
import {Image,Box,Center} from "@chakra-ui/react"

export const ImageNotion:FC<image_block> = (props) =>{
    const url = props.content.url;
    return (
        <Box>
        <Center>
            <Image src={url} w="70%" borderRadius="2%"/>
        </Center>
        </Box>
    )

}
