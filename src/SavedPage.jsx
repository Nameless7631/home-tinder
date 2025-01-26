import { Heading, Grid, Flex, Text, IconButton } from "@chakra-ui/react";
import { Card, HStack, Image as CardImage, Box as CardBox } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdHome } from "react-icons/io";
import { useNavigate } from "react-router-dom";

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

  return defaultImage; // Fallback image
};

// Horizontal Card Component
const CardHorizontal = ({ address, price, property_type, like }) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      const imagePath = await getImage(address);
      setImage(imagePath);
    };
    fetchImage();
  }, [address]);

  return (
    <Card.Root
      flexDirection="row"
      overflow="hidden"
      maxW="100%"
      borderColor={like ? "green" : "red"}
      borderWidth={2}
      backgroundColor={like ? "rgb(229, 255, 204, 40%)" : "transparent"}
    >
      <CardImage objectFit="cover" maxW="106px" maxH="100%" src={image} alt="Property" />
      <CardBox>
        <Card.Body>
          <Card.Title mb="2" fontSize="20px" whiteSpace="nowrap">
            {`${address.substring(address.indexOf("Irvine"), address.indexOf("Irvine") + 6)} ${property_type}`}
          </Card.Title>
          <Text fontSize="sm" color="gray.500" mt="5">
            {address}
          </Text>
          <HStack mt="2" />
        </Card.Body>
        <Card.Footer>
          <IconButton backgroundColor="transparent" />
        </Card.Footer>
      </CardBox>
    </Card.Root>
  );
};

// Saved Page Component
const SavedPage = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/history");
        setData(response.data.history || []);
        console.log("history", response.data.history);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center" p="4">
      <IconButton
      onClick={() => navigate("/main")}
      position="absolute"
      top="10px" // Adjust the distance from the top
      left="10px" // Adjust the distance from the right
      aria-label="Go to Home"
      icon={<IoMdHome color="black" />}
      backgroundColor="white"
    ><IoMdHome color="#99c280"/>
    </IconButton>
      <Heading mb="4">Saved Page</Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {data
          .filter((item) => item.like) // Filter items where `like` is true
          .map((item, index) => (
            <CardHorizontal
              key={index}
              address={item.address}
              price={item.price}
              property_type={item.property_type}
              like={item.like}
            />
          ))}
      </Grid>
    </Flex>
  );
};

export { SavedPage };
