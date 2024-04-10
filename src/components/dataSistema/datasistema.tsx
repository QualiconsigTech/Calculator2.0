import { useInbursaContextHook } from "../../Context/InbursaContext";
import { CalculadoraC6, CalculadoraInbursa, CalculadoraPagBank, CalcularTaxa } from "../AllBanksCalc/calculated";
import { saldoReal } from "../../types/SaldoReal/saldoReal";
import { BoxInput, TextInput } from "../../utils/formBox/boxInput";
import { FormBox } from "../../utils/formBox/formBox";
import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export function RealBalance({taxaares}:any) {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { inbursatax, setInbursaTax } = useInbursaContextHook();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();
  const [formData, setFormData] = useState<saldoReal>();
  const [taxaResponse, setTaxaResponse] = useState<number>();
  const onSubmit: SubmitHandler<any> = async (data: saldoReal) => {
    setFormData(data);
  };

  const FormReceived = () => {
    const parcelaAtual = formData?.ValorParcelaAtual.toString().replace(',', '.')
    const valorEmprestimo = formData?.VlEmprestimo.toString().replace(',', '.')
    const InbursaResponse = CalculadoraInbursa(
      parseFloat(parcelaAtual!),
      formData?.PrazoRestante,
      parseFloat(valorEmprestimo!)
    );
    const PagBankResponse = CalculadoraPagBank(
      parseFloat(parcelaAtual!),
      formData?.PrazoRestante,
      parseFloat(valorEmprestimo!)
    );
    const C6Response = CalculadoraC6(
      parseFloat(parcelaAtual!),
      formData?.PrazoRestante,
      parseFloat(valorEmprestimo!)
    );
    const taxaResponse = CalcularTaxa(
      parseFloat(parcelaAtual!),
      formData?.PrazoRestante,
      parseFloat(valorEmprestimo!)
    );
    setInbursaTax({ InbursaResponse, PagBankResponse, C6Response });
    setTaxaResponse(taxaResponse);
    taxaares(taxaResponse)
  };

  useEffect(() => {
    FormReceived();
  }, [formData]);

  return (
    <Flex
      flexDir={"column"}
      justify={"center"}
      align={"center"}
      flex={1}
      h={isMobile ? "auto" : "100vh"}
      bg={"#f5f5f5"}
      p={4}
    >
      <Box mb={5}>
        <Text fontWeight={"600"} fontSize={["17px"]}>
          Simulação calculadora
        </Text>
        <Text>Preencher dados somente em amarelo</Text>
      </Box>
      <Flex mb={20} justify={"center"} gap={10}>
        <Link href="realsaldo">
          <Button
            bg={"#201658"}
            color={"white"}
            _hover={{ bg: "#3F3D56" }}
          >
            Dados Sistema 
          </Button>
        </Link>
        <Link href="sistemaDado">
          <Button
            bg={"#201658"}
            color={"white"}
            _hover={{ bg: "#3F3D56" }}
          >
            Saldo Real
          </Button>
        </Link>
      </Flex>
      <Box bg={"#FFFFFF"} p={10} borderRadius={10} boxShadow={"md"} w={"100%"}>
        <Flex justify={"center"} align={"center"}>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormBox>
              <BoxInput>
                <TextInput>Valor parcela atual</TextInput>
                <Input
                  bg={"yellow.100"}
                  type="text"
                  placeholder="Valor parcela atual"
                  borderRadius={5}
                  {...register('ValorParcelaAtual')}
                />
              </BoxInput>
              <BoxInput>
                <TextInput>Prazo Restante</TextInput>
                <Input
                  bg={"yellow.100"}
                  type="text"
                  placeholder="Prazo restante"
                  borderRadius={5}
                  {...register('PrazoRestante')}
                />
              </BoxInput>
              <BoxInput>
                <TextInput>Saldo real</TextInput>
                <Input
                  bg={"yellow.100"}
                  type="text"
                  placeholder="Saldo real"
                  borderRadius={5}
                  {...register('VlEmprestimo')}
                />
              </BoxInput>
              <BoxInput>
                <TextInput>Taxa atual</TextInput>
                <Flex
                  justify={"center"}
                  align={"center"}
                  bg={"blue.200"}
                  h={"40px"}
                  borderRadius={5}
                  {...register('TaxaAtual')}
                >
                  {taxaResponse !== 100 &&
                  <Text>{taxaResponse}</Text>
                 
                }
                </Flex>
              </BoxInput>
              <Button type="submit">Calcular</Button>
            </FormBox>
          </form>

        </Flex>
      </Box>
    </Flex>
  );
};
