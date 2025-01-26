import { Heading, Grid, Flex, Text, IconButton } from "@chakra-ui/react";
import { Card, HStack, Image as CardImage, Box as CardBox, Button as CardButton } from "@chakra-ui/react";

import axios from "axios";
import { useEffect, useState } from "react";

const CardHorizontal = ({image, address, price, property_type, like}) => (
  <Card.Root flexDirection="row" overflow="hidden" maxW="100%" borderColor={like ? "green" : "red"} borderWidth={2} backgroundColor={like ? "rgb(229, 255, 204, 40%)" : "transparent"}>
    <CardImage
      objectFit="cover"
      maxW="106px"
      maxH="100%"
      src={image}
      alt="Caffe Latte"
    />
    <CardBox >
      <Card.Body>
        <Card.Title mb="2" maxW="50px" maxH="10px" fontSize="20px" whiteSpace="nowrap">
          {address.substring(address.indexOf("Irvine"), address.indexOf("Irvine") + 6) + " " + property_type}
        </Card.Title>
        <Text fontSize="sm" color="gray.500" mt="5">
        {address}
        </Text>
        <HStack mt="2" maxW="50px" maxH="50px"></HStack>
      </Card.Body>
      <Card.Footer>
        <IconButton backgroundColor="transparent"></IconButton>
      </Card.Footer>
    </CardBox>
  </Card.Root>
);

const SavedPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/history");
        setData(response.data);
        console.log("istory", response.data);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center" p="4">
      <Heading mb="4">Saved Page</Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap="6">
        {data.filter((item) => item.like).map((house) => (
          <CardHorizontal address={house.formattedAddress} price={house.price} property_type={house.propertyType} like={house.like}/>
        ))}
      </Grid>
    </Flex>
  )
}

export { SavedPage };