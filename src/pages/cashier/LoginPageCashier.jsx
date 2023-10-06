import { Flex, Heading, Input, Button, Text, useToast } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import useValueInput from '../../hooks/useValueInput';
import { asyncSetAuthUser } from '../../states/authUser/action';

function LoginPageCashier() {
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
    <Flex
      h="100vh"
      alignItems="center"
      justifyContent="center"
      backgroundImage=" https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      backgroundSize="cover"
      position="relative"
    >
      <Flex flexDirection="column" p={12} borderRadius={8} bg="#FFFF">
        <Heading mb={6} textAlign="center" color="#B42318">
          <Text>Pizza</Text>
          <Text>Pizzazz</Text>
        </Heading>
        <Input
          placeholder="Username"
          color="gray.500"
          mb={3}
          onChange={handleUsernameChange}
        />
        <Input
          placeholder="Password"
          type="password"
          color="gray.500"
          mb={6}
          onChange={handlePasswordChange}
        />
        <Button bgColor="#B42318" color="white" mb={5} onClick={handleSubmit}>
          Log In
        </Button>
      </Flex>
    </Flex>
  );
}

export default LoginPageCashier;
