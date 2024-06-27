
import Load from "@/components/load";
import { Portabilidade } from "@/components/resultSide/portabilidade";
import { PortabilidadeMarg } from "@/components/resultSide/portabilidadeMarg";
import { BalanceDataSystem } from "@/components/saldoReal/saldoreal";
import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";

export default function Calculatortwo() {
    const [taxaAtual, setTaxaAtual] = useState<any>()
    function tax(data:any) {
       setTaxaAtual(data)
    }
    return (
        <Box>
            <Flex flexDir={['column', 'column', 'column', 'row']}>          
                <BalanceDataSystem taxaatual={tax} />
                <PortabilidadeMarg taxa={taxaAtual}/>
            </Flex>
        </Box>
    );
}