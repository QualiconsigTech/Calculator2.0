import { useInbursaContextHook } from "../../Context/InbursaContext";
import { CalcularTaxa } from "../AllBanksCalc/calculated";
import {
  C6DataSystem,
  CalcularTaxaSystem,
  InbursaDataSystem,
  PagbankDataSystem,
  QualiDataSystem,
} from "../AllBanksCalc/calculatedDtsys";
import { saldoDataSyst, saldoReal } from "../../types/SaldoReal/saldoReal";
import { BoxInput, TextInput } from "../../utils/formBox/boxInput";
import { FormBox } from "../../utils/formBox/formBox";
import { Box, Button, Flex, Icon, Input, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CiCalculator1 } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";

export function BalanceDataSystem({ taxaatual }: any) {
  const { inbursatax, setInbursaTax } = useInbursaContextHook();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>();
  const [formData, setFormData] = useState<saldoDataSyst | any>();
  const [taxaResponse, setTaxaResponse] = useState<any>();
  const onSubmit: SubmitHandler<any> = async (data: saldoDataSyst) => {
    setFormData(data);
  };

  const FormReceived = () => {
    if (formData?.ParcelaAtual !== undefined) {
      const parcelaAtual = formData?.ParcelaAtual.toString().replace(".", "");
      const valorEmprestimo = formData?.ValorEmprestimoContratado.toString().replace(".", "");
      const InbursaResponse = InbursaDataSystem(
        parseFloat(parcelaAtual!),
        formData?.prazoInicial,
        parseFloat(valorEmprestimo!),
        formData?.parcelasPagas
      );
      const PagBankResponse = PagbankDataSystem(
        parseFloat(parcelaAtual!),
        formData?.prazoInicial,
        parseFloat(valorEmprestimo!),
        formData?.parcelasPagas
      );
      const C6Response = C6DataSystem(
        parseFloat(parcelaAtual!),
        formData?.prazoInicial,
        parseFloat(valorEmprestimo!),
        formData?.parcelasPagas
      );
      const QualiBank = QualiDataSystem(
        parseFloat(parcelaAtual!),
        formData?.prazoInicial,
        parseFloat(valorEmprestimo!),
        formData?.parcelasPagas
      );
      const taxaResponse = CalcularTaxaSystem(
        parseFloat(parcelaAtual!),
        formData?.prazoInicial,
        parseFloat(valorEmprestimo!),
        formData?.parcelasPagas
      );
      setInbursaTax({ InbursaResponse, PagBankResponse, C6Response, QualiBank });
      setTaxaResponse(taxaResponse);
      taxaatual(taxaResponse);
    }
  };

  useEffect(() => {
    FormReceived();
  }, [formData]);

  const handleClearForm = () => {
    reset();
    setFormData({});
    setTaxaResponse(0)
    setInbursaTax({});
    taxaatual();
  };

  return (
    <Flex
      flexDir={"column"}
      justify={"center"}
      align={"center"}
      flex={1}
      minHeight={"100vh"}
      bg={"#F5F5F5"}
      p={4}
    >
      <Box mb={5}>
        <Text fontWeight={"600"} fontSize={["lg", "xl"]} textAlign="center">
          Simulação calculadora
        </Text>
        <Text fontSize={["sm", "md"]} textAlign="center">
          Preencher dados somente em amarelo
        </Text>
      </Box>
      <Flex mb={20} justify={"center"} gap={10}>
        <Link href="realsaldo">
          <Button
            bg={"#201658"}
            color={"white"}
            _hover={{ bg: "#3F3D56" }}
            fontSize={["sm", "md"]}
          >
            Dados Sistema
          </Button>
        </Link>
        <Link href="sistemaDado">
          <Button
            bg={"#201658"}
            color={"white"}
            _hover={{ bg: "#3F3D56" }}
            fontSize={["sm", "md"]}
          >
            Saldo Real
          </Button>
        </Link>
      </Flex>
      <Box bg={"#FFFFFF"} p={[4, 6]} borderRadius={10} boxShadow={"md"} w={"100%"}>
        <Flex justify={"center"} align={"center"}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <FormBox>
              <BoxInput>
                <Text mb={'10px'}>Prazo inicial</Text>
                <Input
                  bg={"yellow.100"}
                  type="text"
                  placeholder="Prazo Inicial"
                  borderRadius={5}
                  {...register("prazoInicial")}
                />
              </BoxInput>
              <BoxInput>
                <Text mb={'10px'}>Parcela Atual</Text>
                <Input
                  bg={"yellow.100"}
                  type="text"
                  placeholder="Parcela atual"
                  borderRadius={5}
                  {...register("ParcelaAtual")}
                />
              </BoxInput>
              <BoxInput>
                <Text mt={'20px'} mb={'10px'}>Vl. emprestimo</Text>
                <Input
                  bg={"yellow.100"}
                  type="text"
                  placeholder="vl. emprestimo"
                  borderRadius={5}
                  {...register("ValorEmprestimoContratado")}
                />
              </BoxInput>
              <BoxInput>
                <Text mt={'20px'} mb={'10px'}>Parcelas pagas</Text>
                <Input
                  bg={"yellow.100"}
                  type="text"
                  placeholder="Parcelas Pagas"
                  borderRadius={5}
                  {...register("parcelasPagas")}
                />
              </BoxInput>
              <BoxInput>
                <Text mt={'20px'} mb={'10px'}>Parcelas restantes</Text>
                <Flex justify={"center"} align={"center"} bg={"blue.200"} h={"40px"} borderRadius={5}>
                  {formData?.parcelasPagas !== undefined && (
                    <Text>{formData!.prazoInicial - formData!.parcelasPagas}</Text>
                  )}
                </Flex>
              </BoxInput>
              <BoxInput>
                <Text mt={'20px'} mb={'10px'}>Taxa atual contrato</Text>
                <Flex justify={"center"} align={"center"} bg={"blue.200"} h={"40px"} borderRadius={5}>
                  {taxaResponse?.TaxaCalc !== 100 && (
                    <Text>{taxaResponse?.TaxaCalc}</Text>
                  )}
                </Flex>
              </BoxInput>
              <BoxInput>
                <Text mt={'20px'} mb={'10px'}>Saldo devedor aproximado</Text>
                <Flex justify={"center"} align={"center"} bg={"blue.200"} h={"40px"} borderRadius={5}>
                  {taxaResponse?.formatedVp > 0 && (
                    <Text>{taxaResponse?.formatedVp}</Text>
                  )}
                </Flex>
              </BoxInput>
              <Button
                type="submit"
                alignSelf="flex-end"
                gap={2}
                bg={"#074173"}
                color={"white"}
                _hover={{ background: "#073173" }}
              >
                <Icon as={CiCalculator1} />
                Calcular
              </Button>
              <Button gap={2}  type="button"
                  bg={"#9CA3AF"}
                  color={"white"}
                  _hover={{ background: "#6B7280" }} onClick={handleClearForm}><Icon as={FaTrash }/>Limpar</Button>
            </FormBox>
          </form>
        </Flex>
      </Box>
    </Flex>
  );
}
