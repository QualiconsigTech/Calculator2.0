
import { RealBalance } from "@/components/dataSistema/datasistema";
import { Portabilidade } from "@/components/resultSide/portabilidade";
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