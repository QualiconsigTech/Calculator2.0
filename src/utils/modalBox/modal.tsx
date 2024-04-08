import { Box, Button, Flex, Grid, GridItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack } from "@chakra-ui/react"
import Image from "next/image";
import { useEffect, useState } from "react";
import qualiconsi from '../../../public/qualiconsi.png'

export const ModalComponent = ({ parcelaAtual, saldoDevedor, taxa, pmt, parcelaRestante, isOpen }:any) => {
  const handleModalClose = () => {
    isOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose} size="xl">
      <ModalOverlay />
      <ModalContent
        borderRadius={"14px"}
        boxShadow={"0px 4px 12px rgba(0, 0, 0, 0.1)"}
        bgGradient="linear(to-r, #87CEEB,#1E90FF )"
      >
        <Box
          borderRadius={"14px"}
          bgGradient="linear(to-r, #87CEEB,#1E90FF )"
        >
          <ModalHeader
            fontSize="2xl"
            fontWeight="bold"
            color="cyan.500"
            textAlign="center"
          >
            <Box w={"200px"} h={"100px"} mx="left" mb={10}>
              <Image src={qualiconsi} alt="Logo" width={10} height={10} />
            </Box>
            <Text color={"blue.800"}>Detalhes da Parcela</Text>
          </ModalHeader>
          <ModalCloseButton color="gray.500" />
          <ModalBody>
            <Grid templateColumns={'gridColumns'} gap={6}>
              <GridItem>
                <VStack alignItems="flex-start">
                  <Text fontSize="lg" fontWeight="bold">
                    Contrato Atual
                  </Text>
                  <Text fontSize="lg">{parcelaAtual}</Text>
                  <Text fontSize="lg" fontWeight="bold">
                    Parcela Atual
                  </Text>
                  <Text fontSize="lg">{parcelaAtual}</Text>
                  <Text fontSize="lg" fontWeight="bold">
                    Saldo Devedor
                  </Text>
                  <Text fontSize="lg">{saldoDevedor}</Text>
                  <Text fontSize="lg" fontWeight="bold">
                    Saldo Devedor Aprox.
                  </Text>
                  <Text fontSize="lg">{saldoDevedor}</Text>
                </VStack>
              </GridItem>
              <GridItem>
                <VStack alignItems="flex-start">
                  <Text fontSize="lg" fontWeight="bold">
                    Nova Taxa
                  </Text>
                  <Text fontSize="lg">{taxa}</Text>
                  <Text fontSize="lg" fontWeight="bold">
                    Nova Parcela
                  </Text>
                  <Text fontSize="lg">{pmt}</Text>
                  <Text fontSize="lg" fontWeight="bold">
                    Parcela restante:
                  </Text>
                  <Text fontSize="lg">{parcelaRestante}</Text>
                </VStack>
              </GridItem>
              <GridItem>
                <VStack alignItems="flex-start">
                  <Text fontSize="lg" fontWeight="bold">
                    Economia do cliente
                  </Text>
                  <Text fontSize="lg" fontWeight="bold">
                    Economia Mensal:
                  </Text>
                  <Text fontSize="lg" color={"#fff"} fontWeight={"bold"}>
                    R${" "}
                    {(
                      (parcelaAtual - pmt).toFixed(2)
                    )}
                  </Text>
                  <Text fontSize="lg" fontWeight="bold">
                    Economia Total:
                  </Text>
                  <Text fontSize="lg" color={"#fff"} fontWeight={"bold"}>
                    R${" "}
                    {(
                      (
                        (parcelaAtual - pmt) *
                        parcelaRestante
                      ).toFixed(2)
                    )}
                  </Text>
                </VStack>
              </GridItem>
            </Grid>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Flex></Flex>

            <Button
              ml={4}
              bg="gray.500"
              _hover={{ bg: "gray.600" }}
              onClick={handleModalClose}
              size="lg"
            >
              Fechar
            </Button>
          </ModalFooter>
        </Box>
      </ModalContent>
    </Modal>
  );
};