
import { Portabilidade } from "@/components/resultSide/portabilidade";

import { Box, Flex } from "@chakra-ui/react";

export default function Calculatortwo() {
    return (
        <Box>
            <Flex flexDir={['column', 'column', 'column', 'row']}>
            
                <Portabilidade />
            </Flex>
        </Box>
    );
}