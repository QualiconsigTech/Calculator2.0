import { BalanceDataSystem } from '../../../compontents/calculatorSide/saldoReal';
import { Portabilidade } from "@/compontents/resultSide/portabilidade/index";
import { Box, Flex } from "@chakra-ui/react";

export default function Calculatortwo() {
    return (
        <Box>
            <Flex flexDir={['column', 'column', 'column', 'row']}>
                <BalanceDataSystem />
                <Portabilidade />
            </Flex>
        </Box>
    );
}