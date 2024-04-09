
import { RealBalance } from "@/components/dataSistema/datasistema";
import { Portabilidade } from "@/components/resultSide/portabilidade";
import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";

export default function Calculator () {
    const [taxas, setTaxa] = useState<any>()

    function taxa (data:any) {
        setTaxa(data)
}
    return (
        <Box>
            <Flex flexDir={['column', 'column','column', 'row']}> 
                <RealBalance taxaares={taxa}/>
                <Portabilidade taxa={taxas}/>
            </Flex>
        </Box>
    )
}