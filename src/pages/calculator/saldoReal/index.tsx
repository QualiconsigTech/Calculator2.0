import { RealBalance } from "@/compontents/calculatorSide/dataSistema";
import { Portabilidade } from "@/compontents/resultSide/portabilidade";
import { Box, Flex } from "@chakra-ui/react";

export default function Calculator () {


    return (
        <Box>
            <Flex flexDir={['column', 'column','column', 'row']}>
                <RealBalance/>
                
                <Portabilidade/>
            </Flex>
        </Box>
    )
}