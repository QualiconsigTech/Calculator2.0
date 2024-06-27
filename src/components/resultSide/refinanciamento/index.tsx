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

interface RefinanciamentoData {
  banco: string;
  taxa: number;
  troco: number;
  prazo: number;
  parcela: number;
  saldoDevedor: number;
  parcelaAtual: number;
}

export const RefinanciamentoCalc = ({ taxa }: { taxa: any }) => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { inbursatax } = useInbursaContextHook();
  const [ordenedList, setOrdenedList] = useState<RefinanciamentoData[]>([]);
  const [selectedRow, setSelectedRow] = useState<RefinanciamentoData | null>(
    null
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (inbursatax) {
      const inbursa = inbursatax?.InbursaResponse?.data?.dados;
      const pagbank = inbursatax?.PagBankResponse?.data?.dados;
      const c6 = inbursatax?.C6Response?.data?.dados;
      console.log(inbursatax)
      const processBankData = (bankData: any, bankName: string): RefinanciamentoData[] => {
        if (!bankData) return [];
        return bankData.map((item: any) => ({
          banco: bankName,
          taxa: item.taxa,
          troco: item.troco,
          prazo: 36, // Adjust prazo if needed
          parcela: item.novaParcela,
          saldoDevedor: item.saldoDevedor,
          parcelaAtual: 1000, // Adjust parcelaAtual if needed
        }));
      };

      const allbank: RefinanciamentoData[] = [
        ...processBankData(inbursa, "Inbursa"),
        ...processBankData(pagbank, "Pagbank"),
        ...processBankData(c6, "C6"),
      ];

      allbank.sort((a, b) => a.taxa - b.taxa);
      setOrdenedList(allbank);
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

  const handleBankSelect = (bank: string | null) => {
    setSelectedRow(null); // Limpar linha selecionada ao trocar de banco
  };

  const handleRowClick = (row: RefinanciamentoData) => {
    setSelectedRow(row);
    onOpen();
  };

  return (
    <Flex flexDir="column" bg="#98ABEE" color="white" p={4}>
      <Box>Refinanciamento</Box>
      <Flex>
        <List display="flex" gap={5} w="100%" justifyContent="center">
          <ListItem
            color={!selectedRow ? "blue.400" : "white"}
            cursor="pointer"
            onClick={() => handleBankSelect(null)}
            fontWeight={650}
          >
            Todos
          </ListItem>
          <ListItem
            color={selectedRow?.banco === "Inbursa" ? "purple" : "white"}
            cursor="pointer"
            onClick={() => handleBankSelect("Inbursa")}
            fontWeight={650}
          >
            Inbursa
          </ListItem>
          <ListItem
            color={selectedRow?.banco === "PagBank" ? "#037416" : "white"}
            cursor="pointer"
            onClick={() => handleBankSelect("PagBank")}
            fontWeight={650}
          >
            PagBank
          </ListItem>
          <ListItem
            color={selectedRow?.banco === "C6" ? "black" : "white"}
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
        bg="white"
        color="#201658"
        shadow="md"
      >
        <Thead>
          <Tr>
            <Th color="white" bg="#201658">
              Bancos
            </Th>
            <Th color="white" bg="#201658">
              Nova taxa
            </Th>
            <Th color="white" bg="#201658">
              Saldo devedor
            </Th>
            <Th color="white" bg="#201658">
              Parcela
            </Th>
            <Th color="white" bg="#00b167">
              Troco
            </Th>
            <Th color="white" bg="#201658">
              Prazo
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {ordenedList.map((item, index) => (
            <Tr
              key={index}
              cursor="pointer"
              onClick={() => handleRowClick(item)}
              transition="all ease 0.2s"
              _hover={{
                background: getRowColor(item.banco),
                color: "white",
              }}
            >
              <Td>
                <Flex align="center">
                  <Icon as={PiBankFill} mr={2} />
                  {item.banco}
                </Flex>
              </Td>
              <Td>
                {item.taxa.toFixed(2)} <Icon fontSize={"12px"} as={FaPercent} />
              </Td>
              <Td>
                <Flex align="center">
                  <Icon as={TbCurrencyReal} mr={2} />
                  {FormatedNumber(item.saldoDevedor)}
                </Flex>
              </Td>
              <Td>
                <Flex align="center">
                  <Icon as={TbCurrencyReal} mr={2} />
                  {FormatedNumber(item.parcela)}
                </Flex>
              </Td>
              <Td>
                <Flex align="center">
                  <Icon as={TbCurrencyReal} mr={2} />
                  {FormatedNumber(item.troco)}
                </Flex>
              </Td>
              <Td>
                84
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent
          borderRadius="14px"
          boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
          bgGradient="linear(to-r, #87CEEB ,#1E90FF )"
        >
          <Box borderRadius="14px" bgGradient="linear(to-r, #87CEEB ,#1E90FF )">
            <ModalHeader
              fontSize="2xl"
              fontWeight="bold"
              color="cyan.500"
              textAlign="center"
            >
              <Box w="200px" h="100px" mx="left" mb={10}>
                <Image src={qualiconsi} alt="Logo" width={200} height={100} />
              </Box>
              <Text color="blue.800">Detalhes da Parcela</Text>
            </ModalHeader>
            <ModalCloseButton color="gray.500" />
            <ModalBody>
              <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                <GridItem>
                  <Box borderRadius="14px" bg="blue.500" color="white" p={2}>
                    <Box>
                      <Text fontSize="xl" fontWeight="650">
                        Contrato Atual
                      </Text>
                    </Box>
                    <Flex gap={2} mt={2} mb={2}>
                      <Text fontSize="14px" flex={2}>
                        Parcela atual :
                      </Text>
                      <Flex gap={2} align="center" flex={1}>
                        <Icon as={TbCurrencyReal} />
                        <Text fontSize="md">{FormatedNumber(1000)}</Text>
                      </Flex>
                    </Flex>
                    <Flex gap={2} mb={2}>
                      <Text fontSize="14px" flex={2}>
                        Saldo devedor :
                      </Text>
                      <Flex gap={2} align="center" flex={1}>
                        <Icon as={TbCurrencyReal} />
                        <Text fontSize="md">{FormatedNumber(selectedRow?.saldoDevedor || 0)}</Text>
                      </Flex>
                    </Flex>
                    <Flex gap={2} mb={2}>
                      <Text fontSize="14px" flex={2}>
                        Taxa de Juros :
                      </Text>
                      <Flex gap={2} align="center" flex={1}>
                        <Text fontSize="md">1.97%</Text>
                      </Flex>
                    </Flex>
                  </Box>
                </GridItem>
                <GridItem>
                  <Box borderRadius="14px" bg="green.500" color="white" p={2}>
                    <Box>
                      <Text fontSize="xl" fontWeight="650">
                        Novo Contrato
                      </Text>
                    </Box>
                    <Flex gap={2} mt={2} mb={2}>
                      <Text fontSize="14px" flex={2}>
                        Nova parcela:
                      </Text>
                      <Flex gap={2} align="center" flex={1}>
                        <Icon as={TbCurrencyReal} />
                        <Text fontSize="md">
                          {FormatedNumber(selectedRow?.parcela || 0)}
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex gap={2} mb={2}>
                      <Text fontSize="14px" flex={2}>
                        Saldo devedor :
                      </Text>
                      <Flex gap={2} align="center" flex={1}>
                        <Icon as={TbCurrencyReal} />
                        <Text fontSize="md">{FormatedNumber(selectedRow?.saldoDevedor || 0)}</Text>
                      </Flex>
                    </Flex>
                    <Flex gap={2} mb={2}>
                      <Text fontSize="14px" flex={2}>
                        Nova taxa de Juros :
                      </Text>
                      <Flex gap={2} align="center" flex={1}>
                        <Text fontSize="md">{selectedRow?.taxa.toFixed(2)}%</Text>
                      </Flex>
                    </Flex>
                  </Box>
                </GridItem>
                <GridItem>
                  <Box borderRadius="14px" bg="yellow.500" color="white" p={2}>
                    <Box>
                      <Text fontSize="xl" fontWeight="650">
                        Diferença de Valores
                      </Text>
                    </Box>
                    <Flex gap={2} mt={2} mb={2}>
                      <Text fontSize="14px" flex={2}>
                        Redução da parcela:
                      </Text>
                      <Flex gap={2} align="center" flex={1}>
                        <Icon as={TbCurrencyReal} />
                        <Text fontSize="md">
                          {FormatedNumber(1000 - (selectedRow?.parcela || 0))}
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex gap={2} mb={2}>
                      <Text fontSize="14px" flex={2}>
                        Troco :
                      </Text>
                      <Flex gap={2} align="center" flex={1}>
                        <Icon as={TbCurrencyReal} />
                        <Text fontSize="md">{FormatedNumber(selectedRow?.troco || 0)}</Text>
                      </Flex>
                    </Flex>
                  </Box>
                </GridItem>
              </Grid>
              <HStack mt={4} spacing={4} justify="center">
                <Button
                  colorScheme="blue"
                  leftIcon={<FaPhoneAlt />}
                  onClick={onClose}
                >
                  Ligar
                </Button>
                <Button
                  colorScheme="green"
                  leftIcon={<MdOutlineMail />}
                  onClick={onClose}
                >
                  Enviar E-mail
                </Button>
              </HStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Fechar
              </Button>
            </ModalFooter>
          </Box>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
