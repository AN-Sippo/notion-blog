import {useState,FC} from "react"
import { Card, CardHeader, CardBody, CardFooter ,Text,Stack,Flex,Badge,Center, Divider} from '@chakra-ui/react'
import { PageObj } from "@/utils/process_page" 
import Link from "next/link"


type PagePreviewProps = {
    "page":PageObj
}


const PagePreview:FC<PagePreviewProps> = (props:PagePreviewProps)=>{
    const pageobj = props.page

    // apiを叩く段階でfilterする予定だけど、一応ここでも。
    if (pageobj.status == "secret"){
        throw Error("cannot display a page whose tatus property is 'secret'.")
    }


    return(
        <Link href={{pathname:"page/[pid]" ,query:{pid:pageobj.id,title:pageobj.name}}}>
        <Card h="95%" w="95%" backgroundColor="whitesmoke" marginLeft="2.5%" marginTop="2.5%" padding="0" _hover={{transform:"scale(1.05,1.05)",backgroundColor:"rgb(230,230,230)"}}>
            <CardBody padding="0.5rem" m="0" h="70%">
                <Stack mt="6" spacing='3' padding="0" margin="0rem">
                    <Text fontSize='1.1rem'>{pageobj.name}</Text>
                    <Text fontSize='0.7rem'>{pageobj.caption}</Text>
                </Stack>
            </CardBody>
            <CardFooter padding="0" m="0" h="30%">
                <Center m="0" padding="0">
                    <Flex w="80%" gap='3' display="inline-block" margin="0" padding="0">
                        {pageobj.tags.map(tag=><Badge fontSize="0.5em" variant="subtle" colorScheme={tag.color} marginLeft="0.2rem">{tag.name}</Badge>)}
                    </Flex>
                </Center>
            </CardFooter>
        </Card>
        </Link>
    )
}

export {PagePreview}