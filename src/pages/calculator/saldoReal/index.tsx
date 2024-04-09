
import { Portabilidade } from "@/compontents/resultSide/portabilidade";
import { BalanceDataSystem } from "@/compontents/saldoReal/saldoreal";
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