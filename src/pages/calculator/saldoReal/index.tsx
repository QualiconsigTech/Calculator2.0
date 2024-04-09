
import { BalanceDataSystem } from "@/compontents/calculatorSide/saldoreal";
import { Portabilidade } from "@/compontents/resultSide/portabilidade";
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