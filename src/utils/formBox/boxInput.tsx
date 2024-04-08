import { Box, Text } from "@chakra-ui/react"

export const BoxInput = ({children}:any) => {


    return (
        <Box mt={2} >
            {children}
        </Box>
    )
}

export const TextInput = ({children}:any) => {


    return (
        <Text mb={10} fontSize={["11px","13px", '15px', '17px']}>{children}</Text>
    )
}