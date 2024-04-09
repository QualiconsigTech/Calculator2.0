
import { Portabilidade } from "@/components/resultSide/portabilidade";
import { BalanceDataSystem } from "@/components/saldoReal/saldoreal";
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