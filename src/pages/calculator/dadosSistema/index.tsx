
import { BalanceDataSystem  } from '../../../compontents/calculatorSide/saldoReal';
import { Portabilidade } from "@/compontents/resultSide/portabilidade";
import { Box, Flex } from "@chakra-ui/react";

export default function Calculator () {

    return (
        <Box>
            <Flex flexDir={['column', 'column','column', 'row']}> 
                <BalanceDataSystem/>     
                <Portabilidade/>
            </Flex>
        </Box>
    )
}