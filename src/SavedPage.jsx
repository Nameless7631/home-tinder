import { Heading, Grid, GridItem, Box, Flex, Text, Image } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const SavedPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/");
        setData(response.data);
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
      <Image
        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt="Green double couch with wooden legs"
        boxSize='128px'
        objectFit="cover"
      />
      
      </Grid>
    </Flex>
  )
}

export { SavedPage };