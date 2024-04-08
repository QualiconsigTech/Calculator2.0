import { useInbursaContextHook } from "@/Context/InbursaContext";
import { CalcularTaxa } from "@/compontents/AllBanksCalc/calculated";
import { C6DataSystem, InbursaDataSystem, PagbankDataSystem } from "@/compontents/AllBanksCalc/calculatedDtsys";
import { saldoDataSyst, saldoReal } from "@/types/SaldoReal/saldoReal";
import { BoxInput, TextInput } from "@/utils/formBox/boxInput";
import { FormBox } from "@/utils/formBox/formBox";
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

export const BalanceDataSystem = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const {inbursatax, setInbursaTax} = useInbursaContextHook()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();
  const [formData, setFormData] = useState<saldoDataSyst>();
  const [taxaResponse, setTaxaResponse] = useState<number>()
  const onSubmit: SubmitHandler<any> = async (data:saldoDataSyst) => {
    setFormData(data);
    
  };

  const FormReceived = () => {
    const InbursaResponse = InbursaDataSystem(formData?.ParcelaAtual, formData?.prazoInicial, formData?.ValorEmprestimoContratado, formData?.parcelasPagas)
    const PagBankResponse = PagbankDataSystem(formData?.ParcelaAtual, formData?.prazoInicial, formData?.ValorEmprestimoContratado, formData?.parcelasPagas)
    const C6Response = C6DataSystem(formData?.ParcelaAtual, formData?.prazoInicial, formData?.ValorEmprestimoContratado, formData?.parcelasPagas)
    const taxaResponse = CalcularTaxa(formData?.ParcelaAtual, formData?.prazoInicial, formData?.ValorEmprestimoContratado)
    setInbursaTax({InbursaResponse, PagBankResponse, C6Response})
    setTaxaResponse(taxaResponse)
   
    console.log('esse', inbursatax)
  }

  useEffect(()=> {
    FormReceived()
  },[formData])

  return (
    <Flex
      flexDir={"column"}
      justify={"center"}
      align={"center"}
      flex={1}
      h={isMobile ? "auto" : "100vh"}
      bg={"#F5F5F5"}
      p={4}
    >
      <Box mb={5}>
        <Text fontWeight={"600"} fontSize={["17px"]}>
          Simulação calculadora
        </Text>
        <Text>Preencher dados somente em amarelo</Text>
      </Box>
      <Flex mb={20} justify={"center"} gap={10}>
        <Link href="saldoReal">
          <Button bg={"#201658"} color={"white"} _hover={{ bg: "#3F3D56" }}>
            Saldo Real
          </Button>
        </Link>
        <Link href="dadosSistema">
          <Button bg={"#201658"} color={"white"} _hover={{ bg: "#3F3D56" }}>
            Dados Sistema
          </Button>
        </Link>
      </Flex>
      <Box bg={"#FFFFFF"} p={10} borderRadius={10} boxShadow={"md"} w={"100%"}>
        <Flex justify={"center"} align={"center"}>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormBox>
              <BoxInput>
                <TextInput>Prazo inicial</TextInput>
                <Input
                  bg={"yellow.100"}
                  type="text"
                  placeholder="Prazo Inicial"
                  borderRadius={5}
                  {...register('prazoInicial')}
                />
              </BoxInput>
              <BoxInput>
                <TextInput>Parcela Atual</TextInput>
                <Input
                  bg={"yellow.100"}
                  type="text"
                  placeholder="Parcela atual"
                  borderRadius={5}
                  {...register('ParcelaAtual')}
                />
              </BoxInput>
              <BoxInput>
                <TextInput>Vl emprestimo</TextInput>
                <Input
                  bg={"yellow.100"}
                  type="text"
                  placeholder="Vl emprestimo"
                  borderRadius={5}
                  {...register('ValorEmprestimoContratado')}
                />
              </BoxInput>
              <BoxInput>
                <TextInput>Parcelas pagas</TextInput>
                <Input
                  bg={"yellow.100"}
                  type="text"
                  placeholder="Parcelas Pagas"
                  borderRadius={5}
                  {...register('parcelasPagas')}
                />
              </BoxInput>
              
              <BoxInput>
                <TextInput>Parcelas restantes</TextInput>
                <Flex
                  justify={"center"}
                  align={"center"}
                  bg={"blue.200"}
                  h={"40px"}
                  borderRadius={5}
                  
                >
               {formData?.parcelasPagas !== undefined &&
                  <Text>
                {formData!.prazoInicial - formData!.parcelasPagas}
                  </Text>
              }
                </Flex>
              </BoxInput>
              <BoxInput>
                <TextInput>Taxa atual contrato</TextInput>
                <Flex
                  justify={"center"}
                  align={"center"}
                  bg={"blue.200"}
                  h={"40px"}
                  borderRadius={5}
                  
                >
                 {taxaResponse}
                </Flex>
              </BoxInput>
              <BoxInput>
                <TextInput>Saldo devedor aproximado</TextInput>
                <Flex
                  justify={"center"}
                  align={"center"}
                  bg={"blue.200"}
                  h={"40px"}
                  borderRadius={5}
                  
                >
               {formData?.ValorEmprestimoContratado }
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