// import React, { useState } from 'react';
import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import { asyncSetAuthUser } from '../../states/authUser/action';
import useValueInput from '../../hooks/useValueInput';

function LoginPageAdmin() {
  const toast = useToast();
  const [username, handleUsernameChange] = useValueInput();
  const [password, handlePasswordChange] = useValueInput();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(asyncSetAuthUser({ username, password }))
      .then(() => {
        // Display a success toast
        toast({
          title: 'Login Successful',
          description: 'You have successfully logged in.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      })
      .catch((error) => {
        toast({
          title: 'Login Failed',
          description: error?.response?.data?.message || error?.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Box
      h="100vh"
      backgroundImage="https://images.unsplash.com/photo-1590234229790-b210b3dcd422?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1450&q=80"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      backgroundSize="cover"
      position="relative"
    >
      <Container
        as={SimpleGrid}
        maxW="7xl"
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack>
          <Heading
            color="#FFFFFF"
            lineHeight={1.4}
            fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
            letterSpacing={4}
            display="flex"
            flexDirection="column"
          >
            <span>Welcome To</span>
            <span>Pizza Pizzazz</span>
            <span>Back Office Platform</span>
          </Heading>
        </Stack>
        <Stack
          bg="	#E6E6FA"
          rounded="xl"
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 5 }}
          maxW={{ lg: 'md' }}
        >
          <Stack>
            <Heading
              color="#B42318"
              textAlign="center"
              lineHeight={1.1}
              fontSize="50px"
            >
              Pizza
              <Text bg="#B42318" bgClip="text">
                Pizzazz
              </Text>
            </Heading>
            <Text color="gray.500" fontSize={{ base: 'sm', sm: 'md' }} />
          </Stack>
          <Box as="form" mt={10}>
            <Stack spacing={5}>
              <Input
                placeholder="Username"
                bg="gray.100"
                border={0}
                color="gray.500"
                _placeholder={{
                  color: 'gray.500',
                }}
                // onChange={(e) => formik.setFieldValue('email', e.target.value)}
                onChange={handleUsernameChange}
              />
              <Input
                type="password"
                placeholder="Password"
                bg="gray.100"
                border={0}
                color="gray.500"
                _placeholder={{
                  color: 'gray.500',
                }}
                // onChange={(e) =>
                //   formik.setFieldValue('password', e.target.value)
                // }
                onChange={handlePasswordChange}
              />
            </Stack>
            <Button
              fontFamily="heading"
              mt={8}
              w="full"
              bg="#B42318"
              // bgGradient="linear(to-r, red.400,pink.400)"
              color="white"
              _hover={{
                boxShadow: 'xl',
              }}
              // onClick={formik.handleSubmit}
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default LoginPageAdmin;
