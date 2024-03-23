import React, { useState } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack, Text, useToast } from "@chakra-ui/react";
import { FaSignInAlt, FaSignOutAlt, FaUserPlus } from "react-icons/fa";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [clockedIn, setClockedIn] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [totalHours, setTotalHours] = useState(0);
  const toast = useToast();

  const handleLogin = () => {
    // Simulated login logic
    if (username === "user" && password === "password") {
      setIsLoggedIn(true);
      toast({
        title: "Login Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Invalid Credentials",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleClockIn = () => {
    setStartTime(new Date());
    setClockedIn(true);
    toast({
      title: "Clocked In",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleClockOut = () => {
    const endTime = new Date();
    const hours = (endTime - startTime) / 3600000; // Convert milliseconds to hours
    setTotalHours((prevHours) => prevHours + hours);
    setClockedIn(false);
    toast({
      title: "Clocked Out",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Flex minHeight="100vh" alignItems="center" justifyContent="center">
      <Box borderWidth={1} borderRadius="lg" p={8} boxShadow="lg">
        <Heading mb={6} textAlign="center">
          Time Card App
        </Heading>
        {!isLoggedIn ? (
          <form>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </FormControl>
              <Button leftIcon={<FaSignInAlt />} onClick={handleLogin}>
                Login
              </Button>
              <Button leftIcon={<FaUserPlus />} variant="outline">
                Register
              </Button>
            </Stack>
          </form>
        ) : (
          <Stack spacing={4}>
            <Text fontSize="xl" fontWeight="bold">
              Welcome, {username}!
            </Text>
            <Text>Total Hours Worked: {totalHours.toFixed(2)}</Text>
            {!clockedIn ? (
              <Button leftIcon={<FaSignInAlt />} colorScheme="green" onClick={handleClockIn}>
                Clock In
              </Button>
            ) : (
              <Button leftIcon={<FaSignOutAlt />} colorScheme="red" onClick={handleClockOut}>
                Clock Out
              </Button>
            )}
          </Stack>
        )}
      </Box>
    </Flex>
  );
};

export default Index;
