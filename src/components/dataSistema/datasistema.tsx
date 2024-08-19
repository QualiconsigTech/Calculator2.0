import { useInbursaContextHook } from "../../Context/InbursaContext";
import { CalculadoraC6, CalculadoraInbursa, CalculadoraPagBank, CalculadoraQualiBank, CalcularTaxa } from "../AllBanksCalc/calculated";
import { saldoReal } from "../../types/SaldoReal/saldoReal";
import { BoxInput, TextInput } from "../../utils/formBox/boxInput";
import { FormBox } from "../../utils/formBox/formBox";
import { CiCalculator1 } from "react-icons/ci";

import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import { BaseDeCalculo } from "../resultSide/refinanciamento/refinCalc";

export function RealBalance({taxaares, selectedRefin, selectedPort}:any) {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { inbursatax, setInbursaTax } = useInbursaContextHook();

  const {
    register,
    handleSubmit,
    reset, 
    formState: { errors },
  } = useForm<any>();
  const [formData, setFormData] = useState<saldoReal | any>();
  const [taxaResponse, setTaxaResponse] = useState<number>();

  const onSubmit: SubmitHandler<any> = async (data: saldoReal) => {
    setFormData(data);
  };

  const selectedTypeSearch = async () => {
    if (!formData) return;

    const parcelaAtual = parseFloat(formData?.ValorParcelaAtual?.toString().replace(',', '.'));
    const valorEmprestimo = parseFloat(formData?.VlEmprestimo?.toString().replace(',', '.'));
    const prazoRestante = parseInt(formData?.PrazoRestante, 10);

    if (isNaN(parcelaAtual) || isNaN(valorEmprestimo) || isNaN(prazoRestante)) {
      console.error('Invalid input values');
      return;
    }

    if (selectedRefin == true) {
      setInbursaTax({})
      setTaxaResponse(0);
      taxaares();
      const taxaResponse = CalcularTaxa(parcelaAtual, prazoRestante, valorEmprestimo);
      // const InbursaResponse = BaseDeCalculo.inbursaCalculator(parcelaAtual, prazoRestante, valorEmprestimo, taxaResponse);
      const PagBankResponse = BaseDeCalculo.pagbankCalculator(parcelaAtual, prazoRestante, valorEmprestimo, taxaResponse);
      const C6Response = BaseDeCalculo.c6Calculator(parcelaAtual, prazoRestante, valorEmprestimo, taxaResponse);
      const QualiBank = BaseDeCalculo.CalculadoraQualiBank(parcelaAtual, prazoRestante,valorEmprestimo, taxaResponse )

      setTaxaResponse(taxaResponse);
      taxaares(taxaResponse);
      setInbursaTax({PagBankResponse, C6Response, QualiBank });
    }

    if (selectedPort) {
      setInbursaTax({})
      const InbursaResponse = CalculadoraInbursa(parcelaAtual, prazoRestante, valorEmprestimo);
      const PagBankResponse = CalculadoraPagBank(parcelaAtual, prazoRestante, valorEmprestimo);
      const C6Response = CalculadoraC6(parcelaAtual, prazoRestante, valorEmprestimo);
      const taxaResponse = CalcularTaxa(parcelaAtual, prazoRestante, valorEmprestimo);
      const QualiBank = CalculadoraQualiBank(parcelaAtual, prazoRestante,valorEmprestimo )

      setInbursaTax({ InbursaResponse, PagBankResponse, C6Response, QualiBank });
      setTaxaResponse(taxaResponse);
      taxaares(taxaResponse);
    }
  }

  useEffect(() => {
    selectedTypeSearch();
  }, [formData]);

  const handleClearForm = () => {
    reset(); 
    setFormData({});
  };

  return (
    <Flex flexDir={"column"} justify={"center"} align={"center"} flex={1} h={isMobile ? "auto" : "100vh"} bg={"#f5f5f5"} p={4}>
      <Box mb={5}>
        <Text fontWeight={"600"} fontSize={["17px"]}>
          Simulação calculadora
        </Text>
        <Text>Preencher dados somente em amarelo</Text>
      </Box>
      <Flex mb={20} justify={"center"} gap={10}>
        <Link href="realsaldo">
          <Button bg={"#201658"} color={"white"} _hover={{ bg: "#3F3D56" }}>
            Dados Sistema 
          </Button>
        </Link>
        <Link href="sistemaDado">
          <Button bg={"#201658"} color={"white"} _hover={{ bg: "#3F3D56" }}>
            Saldo Real
          </Button>
        </Link>
      </Flex>
      <Box bg={"#FFFFFF"} p={10} borderRadius={10} boxShadow={"md"} w={"100%"}>
        <Flex justify={"center"} align={"center"}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormBox>
              <BoxInput>
                <Text mb='10px'>Valor parcela atual</Text>
                <Input
                  bg={"yellow.100"}
                  type="text"
                  placeholder="Valor parcela atual"
                  borderRadius={5}
                  {...register('ValorParcelaAtual')}
                />
              </BoxInput>
              <BoxInput>
                <Text mb='10px' >Prazo Restante</Text>
                <Input
                  bg={"yellow.100"}
                  type="text"
                  placeholder="Prazo restante"
                  borderRadius={5}
                  {...register('PrazoRestante')}
                />
              </BoxInput>
              <BoxInput>
                <Text mb='10px' mt={'10px'}>Saldo real</Text>
                <Input
                  bg={"yellow.100"}
                  type="text"
                  placeholder="Saldo real"
                  borderRadius={5}
                  {...register('VlEmprestimo')}
                />
              </BoxInput>
              <BoxInput>
                <Text mb='10px' mt={'10px'}>Taxa atual</Text>
                <Flex justify={"center"} align={"center"} bg={"blue.200"} h={"40px"} borderRadius={5} {...register('TaxaAtual')}>
                  {taxaResponse !== 100 && <Text>{taxaResponse}</Text>}
                </Flex>
              </BoxInput>
              <Button mt={'10px'} type="submit" gap={2} bg={'#074173'} color={'white'} _hover={{ background: '#073173' }}>
                <Icon as={CiCalculator1 }/>Calcular
              </Button>
              <Button gap={2} mt={'10px'} onClick={handleClearForm}>
                <Icon as={FaTrash }/>Limpar
              </Button>
            </FormBox>
          </form>
        </Flex>
      </Box>
    </Flex>
  );
};
