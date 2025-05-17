import { Link as RouterLink } from 'react-router-dom';
import { login } from '../api/queries';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import {
  Box,
  Stack,
  Heading,
  Field,
  Input,
  Button,
  Link,
  Flex,
  Text,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const NewLoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login: contextLogin } = useAuth();

  const handleSubmit = async () => {
    const user = await login(username, password);
    contextLogin(user);
  };

  return (
    <Box
      borderWidth="1px"
      bg="bg.subtle"
      borderColor="border.emphasized"
      shadow="lg"
      p="4"
      borderRadius="md"
    >
      <Stack>
        <Heading>Sign In</Heading>
        <Stack gap="2">
          <Field.Root>
            <Field.Label>Username</Field.Label>
            <Input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></Input>
          </Field.Root>
          <Field.Root>
            <Field.Label>Password</Field.Label>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
          </Field.Root>
          <Button
            type="submit"
            onClick={handleSubmit}
            variant="subtle"
            bg="pink.subtle"
          >
            Log In
          </Button>
        </Stack>
        <Box divideY="1px"></Box>
        <Flex gap="2">
          <Button variant="subtle" bg="pink.subtle">
            <FcGoogle />
            Sign in with Google
          </Button>
          <Button variant="subtle" bg="pink.subtle">
            <FaGithub /> Sign in with Github
          </Button>
        </Flex>
        <Flex justifyContent="center">
          <Link colorPalette="blue" asChild>
            <RouterLink to="/sign-up">Sign up</RouterLink>
          </Link>
        </Flex>
      </Stack>
    </Box>
  );
};

export default NewLoginForm;
