"use client";

import { Code, Slider, Stack, Text, Flex, CheckboxGroup, Box, Heading, VStack, Image, Button} from "@chakra-ui/react";
import { useSlider } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { CheckboxCard } from "./components/ui/checkbox-card";
import { CUIAutoComplete } from 'chakra-ui-autocomplete';
import { Link } from 'react-router-dom'; // Import Link from next/link
import apartment from "./images/luke-van-zyl-koH7IVuwRLw-unsplash.jpg"
import singleFamily from "./images/phil-hearing-IYfp2Ixe9nM-unsplash.jpg"
import condo from "./images/naasu-asakura-6n0jjVPxUgY-unsplash.jpg"
import multiFamily from "./images/marcus-lenk-wKO0rx50VWo-unsplash.jpg"
import axios from 'axios';  // Add this import at the top
import { useNavigate } from 'react-router-dom';

const Survey = () => {

  const navigate = useNavigate();

  // Move these functions before any state declarations
  const transformToPrice = (value) => {
    // Transform 0-100 to exponential scale from 50k to 10M
    const minPrice = 50000;
    const maxPrice = 10000000;
    const exp = Math.exp((value / 100) * Math.log(maxPrice / minPrice));
    const price = minPrice * exp;
    // Round to nearest 50k
    return Math.round(price / 50000) * 50000;
  };

  const formatPrice = (price) => {
    return price >= 1000000 
      ? `$${(price / 1000000).toFixed(1)}M` 
      : `$${(price / 1000).toFixed(0)}K`;
  };

  // State declarations follow
  const [leftValue, setLeftValue] = useState(0);
  const [rightValue, setRightValue] = useState(5);
  const [left2, setLeft2] = useState(0);
  const [right2, setRight2] = useState(5);
  const [priceLeft, setPriceLeft] = useState(0);
  const [priceRight, setPriceRight] = useState(100);

  const [formData, setFormData] = useState({
    houseType: [],
    numberOfBeds: [0, 5],
    numberOfBathrooms: [0, 5],
    priceRange: [transformToPrice(0), transformToPrice(100)],
    city: []
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleSubmit = async () => {
    try {
      // Ensure all numbers are properly converted from strings
      const formattedData = {
        ...formData,
        numberOfBeds: formData.numberOfBeds.map(Number),
        numberOfBathrooms: formData.numberOfBathrooms.map(Number),
        priceRange: formData.priceRange.map(Number)
      };
      
      const response = await axios.post('http://localhost:8000/preferences', formattedData);
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error submitting preferences:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
  };

  const slider = useSlider({
    defaultValue: [leftValue, rightValue], // Set default values for the range slider
    thumbAlignment: "center",
    min: 0, // Set minimum value for the slider
    max: 5, // Set maximum value for the slider
  });
  const slider2 = useSlider({
    defaultValue: [left2, right2], // Set default values for the range slider
    thumbAlignment: "center",
    min: 0, // Set minimum value for the slider
    max: 5, // Set maximum value for the slider
  });

  const priceSlider = useSlider({
    defaultValue: [0, 100],
    thumbAlignment: "center",
    min: 0,
    max: 100,
    step: 1,
  });

  const countries = [
    { value: "Irvine", label: "Irvine" },
  ];

  const [pickerItems, setPickerItems] = useState(countries);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCreateItem = (item) => {
    setPickerItems((curr) => [...curr, item]);
    setSelectedItems((curr) => [...curr, item]);
  };

  const handleSelectedItemsChange = (changes) => {
    if (changes.selectedItems) {
      setSelectedItems(changes.selectedItems);
      setFormData(prevFormData => ({
        ...prevFormData,
        city: changes.selectedItems.map(item => item.value)
      }));
    }
  };

  return (
    <Flex justifyContent="center">
      <Stack align="flex-start" spacing={4} mt="24px">
        {/* Wrap Heading in Link to navigate */}
        <Link to="/home">
          <Heading
            position="absolute"
            top="0"
            left="0"
            p="20px"
            fontSize="2xl"
            textAlign="left"
            cursor="pointer"  // Add pointer cursor for visual cue
          >
            match
            <Text as="span" color="#99c280">A</Text>house
          </Heading>
        </Link>

        <Heading size="2xl" textAlign="center" mt="50px" fontSize="4xl"> Preferences </Heading>
        <Heading textAlign="center" mt="30px">House Type</Heading>

        <CheckboxGroup defaultValue={["next"]}>
          <Flex justify="center" align="center" gap="4">
            {items.map((item) => (
              <VStack>
                <Box
                  w="156px"
                  h="156px"
                  border="2px"
                  borderColor="black"
                  bg="gray.100"
                  borderRadius="md"
                  overflow="hidden"
                  >
                    <Image
                      src={item.value === "Apartment" ? apartment : 
                           item.value === "House" ? singleFamily :
                           item.value === "Condo" ? condo : 
                           multiFamily} // fallback to apartment for other types
                      boxSize="100%"
                      objectFit="cover"
                    />
                  </Box>
                <CheckboxCard
                  w="156px"
                  label={item.title}
                  description={item.description}
                  key={item.value}
                  value={item.value}
                  onChange={() => setFormData(prevFormData => ({
                    ...prevFormData,
                    houseType: !prevFormData.houseType.includes(item.value)
                      ? [...prevFormData.houseType, item.value]
                      : prevFormData.houseType.filter(type => type !== item.value)
                  }))}
                />
              </VStack>
            ))}
          </Flex>
        </CheckboxGroup>

        {/* Range Slider Section (centered with gap between the sliders) */}
        <Flex justify="center" align="center" mt="30px" gap="24">
          {/* Number of Beds Slider */}
          <Stack align="center" spacing={2}>
            <Slider.RootProvider value={slider} width="200px">
              <Slider.Label>Number of Beds: [{slider.value.join(" - ")}]</Slider.Label>
              <Slider.Control>
                <Slider.Track bg="#d0d2cd">
                  <Slider.Range bg="#99c280" /> 
                </Slider.Track>
                <Slider.Thumb index={0} bg="#4c7422">
                  <Slider.HiddenInput onChange={(e) => setLeftValue(e.target.value)} />
                </Slider.Thumb>
                <Slider.Thumb index={1} bg="#4c7422" onChange={(e) => setRightValue(e.target.value)}>
                  <Slider.HiddenInput />
                </Slider.Thumb>
              </Slider.Control>
            </Slider.RootProvider>
          </Stack>

          {/* Number of Bathrooms Slider */}
          <Stack align="center" spacing={2} ml="170px">
            <Slider.RootProvider value={slider2} width="210px">
              <Slider.Label>Number of Bathrooms: [{slider2.value.join(" - ")}]</Slider.Label>
              <Slider.Control>
                <Slider.Track bg="#d0d2cd">
                  <Slider.Range bg="#99c280" />
                </Slider.Track>
                <Slider.Thumb index={0} bg="#4c7422">
                  <Slider.HiddenInput onChange={(e) => setLeft2(e.target.value)} />
                </Slider.Thumb>
                <Slider.Thumb index={1} bg="#4c7422" onChange={(e) => setRight2(e.target.value)}>
                  <Slider.HiddenInput />
                </Slider.Thumb>
              </Slider.Control>
            </Slider.RootProvider>
          </Stack>
        </Flex>

        {/* Price Range Slider Section */}
        <Flex justify="center" align="center" mt="30px" width="100%">
          <Stack align="center" spacing={2} width="100%">
            <Heading size="sm">Price Range: {formatPrice(transformToPrice(priceSlider.value[0]))} - {formatPrice(transformToPrice(priceSlider.value[1]))}</Heading>
            <Slider.RootProvider value={priceSlider} width="100%">
              <Slider.Label>Price Range</Slider.Label>
              <Slider.Control>
                <Slider.Track bg="#d0d2cd">
                  <Slider.Range bg="#99c280" />
                </Slider.Track>
                <Slider.Thumb index={0} bg="#4c7422">
                  <Slider.HiddenInput onChange={(e) => {
                    const transformedPrice = transformToPrice(e.target.value);
                    setPriceLeft(transformedPrice);
                    setFormData(prev => ({
                      ...prev,
                      priceRange: [transformedPrice, prev.priceRange[1] || priceRight]
                    }));
                  }} />
                </Slider.Thumb>
                <Slider.Thumb index={1} bg="#4c7422">
                  <Slider.HiddenInput onChange={(e) => {
                    const transformedPrice = transformToPrice(e.target.value);
                    setPriceRight(transformedPrice);
                    setFormData(prev => ({
                      ...prev,
                      priceRange: [prev.priceRange[0] || priceLeft, transformedPrice]
                    }));
                  }} />
                </Slider.Thumb>
              </Slider.Control>
            </Slider.RootProvider>
          </Stack>
        </Flex>

        {/* Country Picker (CUIAutoComplete) */}
        <Stack mt="60px">
          <CUIAutoComplete
            label="Choose Your City"
            placeholder="Type a City (i.e. Irvine)"
            onCreateItem={handleCreateItem}
            items={pickerItems}
            selectedItems={selectedItems}
            onSelectedItemsChange={(changes) =>
              handleSelectedItemsChange(changes)
            }
          />
        </Stack>
        <Button 
          mt="20px" 
          width="100%" 
          bg="#99c280" 
          color="white" 
          borderRadius="md" 
          _hover={{ bg: "#74995d" }}
          onClick={() => {
            handleSubmit();
            navigate("/main");
          }}
          >Submit</Button>
      </Stack>
    </Flex>
  );
};

const items = [
  { value: "Apartment", title: "Apartment", description: "" },
  { value: "Condo", title: "Condo", description: "" },
  { value: "House", title: "Single Family", description: "" },
  { value: "Town House", title: "Multi Family", description: "" },
];

export { Survey };
