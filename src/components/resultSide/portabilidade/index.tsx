import { useInbursaContextHook } from "@/Context/InbursaContext";
import { FormatedNumber } from "@/utils/formatNumbersFunction/formatNumbers";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import qualiconsi from "../../../../public/qualiconsi.png";
import { FaBuilding, FaPercent, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { TbCurrencyReal } from "react-icons/tb";
import { PiBankFill } from "react-icons/pi";

export const Portabilidade = ({taxa}:any) => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { inbursatax } = useInbursaContextHook();
  const [ordenedList, setOrdenedList] = useState<any[]>([]);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (inbursatax) {
      const inbursa = inbursatax?.InbursaResponse;
      const pagbank = inbursatax?.PagBankResponse;
      const c6 = inbursatax?.C6Response;

      const allbank = [inbursa, pagbank, c6].filter(Boolean);

      const formattedData: any[] = [];
      allbank.forEach((element: any) => {
        const tax = element.taxas || [];
        for (let i = 0; i < tax.length; i++) {
          const obj = {
            nameBank: element.nameBank,
            tax: tax[i],
            pmt: element.pmt[i],
            parcelaAtual: element.parcelaAtual,
            parcelaRestante: element.parcelaRestante,
            saldoDevedor: element.SaldoDevedor,
            parcelasPagas: element.parcelasPagas,
          };
          formattedData.push(obj);
        }
      });

      formattedData.sort((a, b) => a.tax - b.tax);

      setOrdenedList(formattedData);
      console.log("this", inbursatax);
      console.log('dd', selectedRow)
    }
  }, [inbursatax]);

  const getRowColor = (nameBank: string) => {
    switch (nameBank) {
      case "Pagbank":
        return "#85c790";
      case "Inbursa":
        return "#b094e6";
      case "C6":
        return "#1e1e20";
      default:
        return "white";
    }
  };

  const [selectedBank, setSelectedBank] = useState<string | null>(null);

  const handleBankSelect = (bank: string | null) => {
    setSelectedBank(bank);
  };

  const handleRowClick = (row: any) => {
    setSelectedRow(row);
    console.log(row)
    onOpen();
  };

  return (
    <Flex  flexDir={"column"} bg={"#98ABEE"} color={"white"} p={4}>
      <Box>Portabilidade</Box>
      <Flex>
        <List display={"flex"} gap={5} w={"100%"} justifyContent={"center"}>
          <ListItem
            color={!selectedBank ? "blue.400" : "white"}
            cursor="pointer"
            onClick={() => handleBankSelect(null)}
            fontWeight={650}
          >
            Todos
          </ListItem>
          <ListItem
            color={selectedBank === "Inbursa" ? "purple" : "white"}
            cursor="pointer"
            onClick={() => handleBankSelect("Inbursa")}
            fontWeight={650}
          >
            Inbursa
          </ListItem>
          <ListItem
            color={selectedBank === "Pagbank" ? "#037416" : "white"}
            cursor="pointer"
            onClick={() => handleBankSelect("Pagbank")}
            fontWeight={650}
          >
            Pagbank
          </ListItem>
          <ListItem
            color={selectedBank === "C6" ? "black" : "white"}
            cursor="pointer"
            onClick={() => handleBankSelect("C6")}
            fontWeight={650}
          >
            C6
          </ListItem>
        </List>
      </Flex>
      <Table
        variant="simple"
        mt={4}
        borderRadius={5}
        bg={"white"}
        color={"#201658"}
        shadow={"md"}
      >
        <Thead>
          <Tr>
            <Th color={"white"} bg={"#201658"}>
              Bancos
            </Th>
            <Th color={"white"} bg={"#201658"}>
              Nova taxa
            </Th>
            <Th color={"white"} bg={"#201658"}>
              Nova parcela
            </Th>
            <Th color={"white"} bg={"#201658"}>
              Economia Mensal Cliente
            </Th>
            <Th color={"white"} bg={"#201658"}>
              Economia Total periodo
            </Th>
          </Tr>
        </Thead>
       
        {inbursatax?.InbursaResponse?.pmt[0] > 0 && (
          <Tbody>
            {ordenedList
              .filter((item) => !selectedBank || item.nameBank === selectedBank) // Filtro baseado no banco selecionado
              .map((item, index) => (
                <Tr
                key={index}
                cursor="pointer"
                onClick={() => handleRowClick(item)}
                transition="all ease 0.2s"
                _hover={{
                    background: getRowColor(item.nameBank),
                    color: "white",
                }}
            >
                <Td>
                    <Flex align="center">
                        <Icon as={PiBankFill} mr={2} />
                        {item.nameBank}
                    </Flex>
                </Td>
                <Td>
                    {item.tax.toFixed(2)} <Icon fontSize={'12px'} as={FaPercent} />
                </Td>
                <Td>
                    <Flex align="center">
                        <Icon as={TbCurrencyReal} mr={2} />
                        {FormatedNumber(item.pmt)}
                    </Flex>
                </Td>
                <Td>
                    <Flex align="center">
                        <Icon as={TbCurrencyReal} mr={2} />
                        {FormatedNumber(item.parcelaAtual - item.pmt)}
                    </Flex>
                </Td>
                <Td>
                    <Flex align="center">
                        <Icon as={TbCurrencyReal} mr={2} />
                        {FormatedNumber((item.parcelaAtual - item.pmt) * item.parcelaRestante)}
                    </Flex>
                </Td>
            </Tr>
              ))}
          </Tbody>
        )}
     
      </Table>
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent
          borderRadius={"14px"}
          boxShadow={"0px 4px 12px rgba(0, 0, 0, 0.1)"}
          bgGradient="linear(to-r, #87CEEB ,#1E90FF )"
        >
          <Box
            borderRadius={"14px"}
            bgGradient="linear(to-r, #87CEEB ,#1E90FF )"
          >
            <ModalHeader
              fontSize="2xl"
              fontWeight="bold"
              color="cyan.500"
              textAlign="center"
            >
              <Box w={"200px"} h={"100px"} mx="left" mb={10}>
                <Image src={qualiconsi} alt="Logo" width={200} height={100} />
              </Box>
              <Text color={"blue.800"}>Detalhes da Parcela</Text>
            </ModalHeader>
            <ModalCloseButton color="gray.500" />
            <ModalBody>
              <Grid templateColumns={"repeat(3, 1fr)"} gap={6}>
                <GridItem>
                  <Box borderRadius={'14px'} bg={'blue.500'} color={'white'} p={2}>
                    <Box>
                      <Text fontSize={'xl'} fontWeight={'650'}>Contrato Atual</Text>
                    </Box>
                    <Flex gap={2} mt={2} mb={2}>
                      <Text fontSize={'14px'} flex={2}>Parcela atual :</Text>
                      <Flex gap={2} align="center" flex={1}><Icon as={TbCurrencyReal}/>{FormatedNumber(selectedRow?.parcelaAtual) }</Flex>
                    </Flex>
                    <Flex gap={2} mt={2} mb={2}>
                      <Text fontSize={'14px'} flex={2}>Taxa atual contrato :</Text>
                      
                      <Flex gap={2} align="center" flex={1}>{taxa}<Icon as={FaPercent} fontSize={'12px'}/></Flex>
                      
                      
                      </Flex>
                    <Flex gap={2} mt={2} mb={2}>
                      <Text fontSize={'14px'} flex={2}>Saldo devedor aproximado :</Text>
                      <Flex gap={2} align="center" flex={1}><Icon as={TbCurrencyReal}/>{FormatedNumber(selectedRow?.saldoDevedor)}</Flex>
                    </Flex>
                    {selectedRow?.parcelasPagas &&
                    <Flex gap={2} mt={2} mb={2}>
                      <Text fontSize={'14px'} flex={2}>Parcelas restantes :</Text>
                      <Flex gap={2} align="center" flex={1}>{parseInt(selectedRow?.parcelaRestante) - parseInt(selectedRow?.parcelasPagas)}</Flex>
                    </Flex>
                    }
                     {!selectedRow?.parcelasPagas &&
                    <Flex gap={2} mt={2} mb={2}>
                      <Text fontSize={'14px'} flex={2}>Parcelas restantes :</Text>
                      <Flex gap={2} align="center" flex={1}>{parseInt(selectedRow?.parcelaRestante) }</Flex>
                    </Flex>
                    }
                  </Box>
                </GridItem>
                <GridItem>
                <Box borderRadius={'14px'} bg={'blue.500'} color={'white'} p={2}>
                    <Box>
                      <Text fontSize={'xl'} fontWeight={'650'}>Novo contrato</Text>
                    </Box>
                    <Flex gap={2} mt={2} mb={2}>
                      <Text flex={2} fontSize={'14px'}>Nova Parcela :</Text>
                      <Flex gap={2}  align="center" flex={1}><Icon as={TbCurrencyReal}/>{FormatedNumber(selectedRow?.pmt)}</Flex>
                    </Flex>
                    <Flex gap={2} mt={2} mb={2}>
                      <Text flex={2} fontSize={'14px'}>Nova taxa contrado</Text>
                      <Flex gap={2} align="center"  flex={1}>{selectedRow?.tax}<Icon as={FaPercent} fontSize={'12px'}/></Flex>
                    </Flex>
                   
                    
                    {selectedRow?.parcelasPagas &&
                    <Flex gap={2} mt={2} mb={2}>
                      <Text fontSize={'14px'} flex={2}>Parcelas restantes :</Text>
                      <Flex gap={2} align="center" flex={1}>{parseInt(selectedRow?.parcelaRestante) - parseInt(selectedRow?.parcelasPagas)}</Flex>
                    </Flex>
                    }
                     {!selectedRow?.parcelasPagas &&
                    <Flex gap={2} mt={2} mb={2}>
                      <Text fontSize={'14px'} flex={2}>Parcelas restantes :</Text>
                      <Flex gap={2} align="center" flex={1}>{parseInt(selectedRow?.parcelaRestante) }</Flex>
                    </Flex>
                    }
                  
                  </Box>
                </GridItem>
                <GridItem>
                <Box borderRadius={'14px'} bg={'blue.500'} color={'white'} p={2}>
                    <Box>
                      <Text fontSize={'xl'} fontWeight={'650'}>Economia do cliente</Text>
                    </Box>
                    <Flex gap={2} mt={2} mb={2}>
                      <Text fontSize={'14px'} flex={2}>Economia Mensal :</Text>
                      <Flex gap={2} align="center" flex={1}><Icon as={TbCurrencyReal}/>{FormatedNumber(selectedRow?.parcelaAtual - selectedRow?.pmt)} </Flex>
                    </Flex>
                    <Flex gap={2}  mb={2}>
                      <Text   fontSize={'14px'} flex={2}>Economia total :</Text>
                      <Flex gap={2} align="center" flex={1}><Icon as={TbCurrencyReal}/>{((selectedRow?.parcelaAtual - selectedRow?.pmt) * selectedRow?.parcelaRestante).toFixed(2)}</Flex>
                    </Flex>
                    
                  </Box>
                </GridItem>
              </Grid>
            </ModalBody>
            <ModalFooter justifyContent="center">
            <Flex flexDir={'column'} justify={'center'} align={'center'} >
              <Flex gap={3}  justify={'center'} mb={4}>
                <Flex alignItems={"center"} gap={2}>
                  <Icon as={FaPhoneAlt} textAlign={"center"} />
                  <Text color={"black"} textAlign={"center"} fontWeight={650}>
                    Contato
                  </Text>
                  <Text textAlign={"center"}>0800-888-5842</Text>
                </Flex>
                <Flex gap={2} alignItems={"center"}>
                  <Icon as={MdOutlineMail} textAlign={"center"} />
                 
                  <Text>contato@qualiconsig.com.br</Text>
                </Flex>
                <Flex gap={2} alignItems={"center"}>
                  <Icon as={FaBuilding} />
                  <Text textAlign={"center"}>CNPJ</Text>
                  <Text textAlign={"center"}>27.733.374/0001-72</Text>
                </Flex>
                
              </Flex>
              <Flex ml={10} flexDir={'column'} w={'50%'} bg={'yellow.400'} p={4} borderRadius={20} color={'blue.800'}> 
                <Text>Valores do novo contrato aproximado, sujeitos a alteração, pois, dependem 100% do saldo devedor real que será enviado pelo seu Banco originador (Atual) </Text>
              </Flex>
              </Flex>
            </ModalFooter>
          </Box>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
