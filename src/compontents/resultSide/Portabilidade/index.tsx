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
  color,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import qualiconsi from "../../../../public/qualiconsi.png";
import { ModalComponent } from "@/utils/modalBox/modal";
import { FaBuilding, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";

export const Portabilidade = () => {
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
          };
          formattedData.push(obj);
        }
      });

      formattedData.sort((a, b) => a.tax - b.tax);

      setOrdenedList(formattedData);
      console.log("this", formattedData);
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
        return color;
    }
  };

  const [selectedBank, setSelectedBank] = useState<string | null>(null);

  const handleBankSelect = (bank: string | null) => {
    setSelectedBank(bank);
  };

  const handleRowClick = (row: any) => {
    setSelectedRow(row);
    onOpen();
  };

  function handleModalClose(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Flex flex={2} flexDir={"column"} bg={"#98ABEE"} color={"white"} p={4}>
      <Box>Portabilidade</Box>
      <Flex>
        <List display={"flex"} gap={5} w={"100%"} justifyContent={"center"}>
          <ListItem
            color={!selectedBank ? "blue.400" : "white"}
            cursor="pointer"
            onClick={() => handleBankSelect(null)}
          >
            Todos
          </ListItem>
          <ListItem
            color={selectedBank === "Inbursa" ? "purple" : "white"}
            cursor="pointer"
            onClick={() => handleBankSelect("Inbursa")}
          >
            Inbursa
          </ListItem>
          <ListItem
            color={selectedBank === "Pagbank" ? "green.400" : "white"}
            cursor="pointer"
            onClick={() => handleBankSelect("Pagbank")}
          >
            Pagbank
          </ListItem>
          <ListItem
            color={selectedBank === "C6" ? "black" : "white"}
            cursor="pointer"
            onClick={() => handleBankSelect("C6")}
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
        {inbursatax?.InbursaResponse.pmt[0] > 0 && (
          <Tbody>
            {ordenedList
              .filter((item) => !selectedBank || item.nameBank === selectedBank) // Filtro baseado no banco selecionado
              .map((item, index) => (
                <Tr
                  key={index}
                  cursor="pointer"
                  onClick={() => handleRowClick(item)}
                  transition={"all ease 0.2s"}
                  _hover={{
                    background: getRowColor(item.nameBank),
                    color: "white",
                  }}
                >
                  <Td>{item.nameBank}</Td>
                  <Td>{item.tax}</Td>
                  <Td>{FormatedNumber(item.pmt)}</Td>
                  <Td>{FormatedNumber(item.parcelaAtual - item.pmt)}</Td>
                  <Td>
                    {FormatedNumber(
                      (item.parcelaAtual - item.pmt) * item.parcelaRestante
                    )}
                  </Td>
                </Tr>
              ))}
          </Tbody>
        )}
      </Table>
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
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
                  <Box p={4} borderRadius={"lg"} bg={"white"} boxShadow={"md"}>
                    <Text fontSize="xl" fontWeight="bold">
                      Contrato Atual
                    </Text>
                    <Text fontSize="lg">{selectedRow?.parcelaAtual}</Text>
                    <Text fontSize="xl" fontWeight="bold">
                      Parcela Atual
                    </Text>
                    <Text fontSize="lg">{selectedRow?.parcelaAtual}</Text>
                    <Text fontSize="xl" fontWeight="bold">
                      Saldo Devedor
                    </Text>
                    <Text fontSize="lg">{selectedRow?.saldoDevedor}</Text>
                    <Text fontSize="xl" fontWeight="bold">
                      Saldo Devedor Aprox.
                    </Text>
                    <Text fontSize="lg">{selectedRow?.saldoDevedor}</Text>
                  </Box>
                </GridItem>
                <GridItem>
                  <Box p={4} borderRadius={"lg"} bg={"white"} boxShadow={"md"}>
                    <Text fontSize="xl" fontWeight="bold">
                      Nova Taxa
                    </Text>
                    <Text fontSize="lg">{selectedRow?.tax}</Text>
                    <Text fontSize="xl" fontWeight="bold">
                      Nova Parcela
                    </Text>
                    <Text fontSize="lg">{selectedRow?.pmt}</Text>
                    <Text fontSize="xl" fontWeight="bold">
                      Parcela restante:
                    </Text>
                    <Text fontSize="lg">{selectedRow?.parcelaRestante}</Text>
                  </Box>
                </GridItem>
                <GridItem>
                  <Box p={4} borderRadius={"lg"} bg={"white"} boxShadow={"md"}>
                    <Text fontSize="xl" fontWeight="bold">
                      Economia do cliente
                    </Text>
                    <Text fontSize="xl" fontWeight="bold">
                      Economia Mensal:
                    </Text>
                    <Text fontSize="lg" color={"#07e05a"} fontWeight={"bold"}>
                      R${" "}
                      {(selectedRow?.parcelaAtual - selectedRow?.pmt).toFixed(
                        2
                      )}
                    </Text>
                    <Text fontSize="xl" fontWeight="bold">
                      Economia Total:
                    </Text>
                    <Text fontSize="lg" color={"#07e05a"} fontWeight={"bold"}>
                      R${" "}
                      {(
                        (selectedRow?.parcelaAtual - selectedRow?.pmt) *
                        selectedRow?.parcelaRestante
                      ).toFixed(2)}
                    </Text>
                  </Box>
                </GridItem>
              </Grid>
            </ModalBody>
            <ModalFooter justifyContent="center">
              <Flex gap={3}>
                <Flex alignItems={'center'} gap={2}>
                  <Icon as={FaPhoneAlt} textAlign={'center'}/>
                  <Text color={'black'} textAlign={'center'} fontWeight={650}>Contato</Text>
                  <Text textAlign={'center'}>0800-888-5842</Text>
                </Flex>
                <Flex gap={2} alignItems={'center'}>
                  <Icon as={MdOutlineMail} textAlign={'center'}/>
                  <Text textAlign={'center'}>Contato</Text>
                  <Text>contato@qualiconsig.com.br</Text>
                </Flex>
                <Flex gap={2} alignItems={'center'}>
                  <Icon as={FaBuilding}/>
                  <Text textAlign={'center'}>CNPJ</Text>
                  <Text textAlign={'center'}>27.733.374/0001-72</Text>
                </Flex>
                 
              </Flex>
              
            </ModalFooter>
          </Box>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
