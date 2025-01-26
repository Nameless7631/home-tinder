import { Box, IconButton, Text, Stack, Heading } from "@chakra-ui/react";
import { IoPersonSharp } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { useState } from "react";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerRoot,
  DrawerActionTrigger,
} from "./drawer";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

import { Card, HStack, Image as CardImage, Box as CardBox, Button as CardButton } from "@chakra-ui/react";

const CardHorizontal = () => (
  <Card.Root flexDirection="row" overflow="hidden" maxW="100%">
    <CardImage
      objectFit="cover"
      maxW="106px"
      maxH="100%"
      src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
      alt="Caffe Latte"
    />
    <CardBox>
      <Card.Body>
        <Card.Title mb="2" maxW="50px" maxH="10px" fontSize="20px" whiteSpace="nowrap">
          The perfect Matcha
        </Card.Title>
        <Text fontSize="sm" color="gray.500" mt="5">
          A delicious blend of steamed milk and fine Japanese Matcha Powder
        </Text>
        <HStack mt="2" maxW="50px" maxH="50px"></HStack>
      </Card.Body>
      <Card.Footer></Card.Footer>
    </CardBox>
  </Card.Root>
);

const Header = () => {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]);
  return (
    <Box display="flex" justifyContent={"space-between"}>
      {/* Wrap the heading inside Link */}
      <Link to="/home">
        <Heading
          top="0"
          left="0"
          p="20px"
          fontSize="2xl"
          textAlign="left"
          cursor="pointer"
        >
          match
          <Text as="span" color="#99c280">A</Text>house
        </Heading>
      </Link>

      <Box>
        <IconButton backgroundColor="white">
          <IoPersonSharp color="black" />
        </IconButton>

        <DrawerRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
          <DrawerBackdrop />
          <DrawerTrigger asChild>
            <IconButton backgroundColor="white">
              <FaHistory color="black" />
            </IconButton>
          </DrawerTrigger>
          <DrawerContent maxW="450px">
            <DrawerHeader>
              <DrawerTitle>History</DrawerTitle>
            </DrawerHeader>
            <DrawerBody maxHeight="80vh" overflowY="auto">
              {history.map((h, index) => (
                <Stack key={index} mb={4}>
                  <CardHorizontal />
                </Stack>
              ))}
            </DrawerBody>
            <DrawerFooter>
              <DrawerActionTrigger></DrawerActionTrigger>
            </DrawerFooter>
            <DrawerCloseTrigger />
          </DrawerContent>
        </DrawerRoot>
      </Box>
    </Box>
  );
};

export { Header };
