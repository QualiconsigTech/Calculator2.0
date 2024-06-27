
import { RealBalance } from "@/components/dataSistema/datasistema";
import { Portabilidade } from "@/components/resultSide/portabilidade";
import { RefinanciamentoCalc } from "@/components/resultSide/refinanciamento";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";

export default function Calculator () {
    const [taxas, setTaxa] = useState<any>()

    function taxa (data:any) {
        setTaxa(data)
}
    const [isRefinSelected, setRefinSelected] = useState(false)
    const [isPorSelected, setPortSelected] = useState(false)
    
    const handleSelectRefin = () => {
        setPortSelected(false)
        setRefinSelected(true)
    }
    const handleSelectPort = () => {
        setRefinSelected(false)
        setPortSelected(true)
    }

    return (
        <Box>
            <Flex flexDir={['column', 'column','column', 'row']}> 
                <RealBalance taxaares={taxa} selectedRefin={isRefinSelected} selectedPort={isPorSelected}/>
                <Box position={'absolute'} ml={'20px'} mt={'10px'}>
                    <Button bg={'green.300'} mr={'15px'} _hover={{background: 'green.200'}} onClick={handleSelectRefin}>Refinanciamento</Button>
                    <Button bg={'blue.300'} _hover={{background: 'blue.200'}} onClick={handleSelectPort}>Portabilidade</Button>
                </Box>
               {isPorSelected  == true &&  isRefinSelected == false && 
                <Portabilidade taxa={taxas}/>
                }
                {isRefinSelected == true && isPorSelected == false &&
                <RefinanciamentoCalc taxa={taxas}/>
                }
            </Flex>
        </Box>
    )
}