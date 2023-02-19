import {FC} from "react"
import { Box,Stack,Divider,Text,Center} from '@chakra-ui/react'

const Header:FC = ()=>{
    const main_color = "rgb(193,179,170)"


    return (
        <Box width="100%">
            <Stack>
                <Box width="70%" marginLeft="7%" >
                   <Text color="whitesmoke" fontWeight="30" fontSize="5xl">Sippoのblog</Text>
                </Box>
                <Divider color="whitesmoke" />
            </Stack>
        </Box>
    )
}

export default Header