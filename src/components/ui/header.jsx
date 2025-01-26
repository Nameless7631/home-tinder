import { Box, IconButton, Text, Stack, Heading } from "@chakra-ui/react";
import { IoPersonSharp } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { useEffect, useState} from "react";
import {useNavigate} from "react-router-dom"
import { FaHeart, FaHeartBroken } from "react-icons/fa";
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
import axios from 'axios';
import apartment from "../../images/luke-van-zyl-koH7IVuwRLw-unsplash.jpg"
import singleFamily from "../../images/phil-hearing-IYfp2Ixe9nM-unsplash.jpg"
import condo from "../../images/naasu-asakura-6n0jjVPxUgY-unsplash.jpg"
import multiFamily from "../../images/marcus-lenk-wKO0rx50VWo-unsplash.jpg"


// Check if an image exists
const checkImageExists = async (url) => {
  try {
    const response = await axios.head(url);
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

// Get the appropriate image
const getImage = async (address) => {
  const imageFormats = ["jpg", "webp"];
  const defaultImage = "houses/matcha.jpg";

  for (const format of imageFormats) {
    const imagePath = `houses/${address}.${format}`;
    const exists = await checkImageExists(imagePath);
    if (exists) {
      return imagePath;
    }
  }
  return null;
};


function Header() {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  const CardHorizontal = ({image, address, price, property_type, like}) => {
    const [imageSrc, setImageSrc] = useState(" "); // Start with fallback
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const loadImage = async () => {
        if (!address) return;
        
        try {
          const path = await getImage(address);
          // Preload the image
          const img = new Image();
          img.onload = () => {
            setImageSrc(path);
            setIsLoading(false);
          };
          img.onerror = () => {
            setImageSrc("houses/matcha.jpg");
            setIsLoading(false);
          };
          img.src = path;
        } catch (error) {
          setImageSrc("houses/matcha.jpg");
          setIsLoading(false);
        }
      };

      loadImage();
    }, [address, property_type]);

    if (!address) return null;

    return (
      <Card.Root 
        flexDirection="row" 
        overflow="hidden" 
        maxW="100%" 
        borderColor={like ? "green" : "red"} 
        borderWidth={2} 
        backgroundColor={like ? "rgb(229, 255, 204, 40%)" : "transparent"}
      >
        <CardImage
          objectFit="cover"
          maxW="106px"
          maxH="100%"
          src={imageSrc}
          alt="Property Image"
        />
        <CardBox>
          <Card.Body>
            <Card.Title mb="2" maxW="50px" maxH="10px" fontSize="20px" whiteSpace="nowrap">
              {address && address.includes("Irvine") 
                ? `${address.substring(address.indexOf("Irvine"), address.indexOf("Irvine") + 6)} ${property_type}`
                : property_type}
            </Card.Title>
            <Text fontSize="sm" color="gray.500" mt="5">
              {address}
            </Text>
            <HStack mt="2" maxW="50px" maxH="50px"></HStack>
          </Card.Body>
          <Card.Footer>
            <IconButton backgroundColor="transparent">
              {like ? (<FaHeart color="green"/>) : (<FaHeartBroken color="red"/>)}
            </IconButton>
          </Card.Footer>
        </CardBox>
      </Card.Root>
    );
  };


  const fetchHistory = async () => {
    try {
      const response = await axios.get('http://localhost:8000/history/');
      setHistory(Array.isArray(response.data.history) ? response.data.history : []);
    } catch (error) {
      console.error('Error fetching history:', error);
      setHistory([]);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <Box display="flex" justifyContent={"space-between"}>
      {/* Wrap the heading inside Link */}
      <Link to="/">
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
        <IconButton backgroundColor="white" onClick={() => navigate("/saved")}>
          <IoPersonSharp
            color="black"
            style={{ cursor: "pointer" }}
          />
        </IconButton>

        <DrawerRoot 
          open={open} 
          onOpenChange={(e) => {
            setOpen(e.open);
            fetchHistory();
          }}
        >
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
            <DrawerBody overflowY="auto">
              {history && history.map((h, index) => (
                <Stack key={index} mb={4}>
                  <CardHorizontal 
                    address={h?.address} 
                    price={h?.price} 
                    property_type={h?.property_type} 
                    like={h?.like}
                  />
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
