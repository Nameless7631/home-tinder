"use client";

import { Code, Slider, Stack, Text, Flex, CheckboxGroup, Box, Heading } from "@chakra-ui/react";
import { useSlider } from "@chakra-ui/react";
import { useState } from "react";
import { CheckboxCard } from "./components/ui/checkbox-card";

const Survey = () => {
  const [leftValue, setLeftValue] = useState(0);
  const [rightValue, setRightValue] = useState(20);
  const [left2, setLeft2] = useState(0);
  const [right2, setRight2] = useState(20);
  const [priceLeft, setPriceLeft] = useState(50000);
  const [priceRight, setPriceRight] = useState(10000000);

  const slider = useSlider({
    defaultValue: [leftValue, rightValue], // Set default values for the range slider
    thumbAlignment: "center",
    min: 0, // Set minimum value for the slider
    max: 20, // Set maximum value for the slider
  });
  const slider2 = useSlider({
    defaultValue: [left2, right2], // Set default values for the range slider
    thumbAlignment: "center",
    min: 0, // Set minimum value for the slider
    max: 20, // Set maximum value for the slider
  });

  const priceSlider = useSlider({
    defaultValue: [priceLeft, priceRight], // Set default values for the price range slider
    thumbAlignment: "center",
    min: 50000, // Set minimum value for price slider
    max: 10000000, // Set maximum value for price slider
  });

  return (
    <Flex justifyContent="center">
      <Stack align="flex-start" spacing={4} mt="24px">
        <Heading textAlign="center">House Type</Heading>
        <Flex justifyContent="space-between" w="100%">
          <Box
            w="128px"
            h="128px"
            border="2px"
            borderColor="black"
            bg="gray.100"
            borderRadius="md"
          />
          <Box
            w="128px"
            h="128px"
            border="2px"
            borderColor="black"
            bg="gray.100"
            borderRadius="md"
          />
          <Box
            w="128px"
            h="128px"
            border="2px"
            borderColor="black"
            bg="gray.100"
            borderRadius="md"
          />
          <Box
            w="128px"
            h="128px"
            border="2px"
            borderColor="black"
            bg="gray.100"
            borderRadius="md"
          />
        </Flex>

        <CheckboxGroup defaultValue={["next"]}>
          <Heading textAlign="center">Choose House Types</Heading>
          <Flex justify="center" align="center" gap="4">
            {items.map((item) => (
              <CheckboxCard
                label={item.title}
                description={item.description}
                key={item.value}
                value={item.value}
              />
            ))}
          </Flex>
        </CheckboxGroup>

        {/* Range Slider Section (centered with gap between the sliders) */}
        <Flex justify="center" align="center" mt="30px" gap="24">
          {/* First Range Slider */}
          <Stack align="center" spacing={2}>
            <Heading size="sm">Current: [{slider.value.join(", ")}]</Heading>
            <Slider.RootProvider value={slider} width="200px">
              <Slider.Label>Number of Beds</Slider.Label>
              <Slider.Control>
                <Slider.Track>
                  <Slider.Range />
                </Slider.Track>
                <Slider.Thumb index={0}>
                  <Slider.HiddenInput onChange={(e) => setLeftValue(e.target.value)} />
                </Slider.Thumb>
                <Slider.Thumb index={1} onChange={(e) => setRightValue(e.target.value)}>
                  <Slider.HiddenInput />
                </Slider.Thumb>
              </Slider.Control>
            </Slider.RootProvider>
          </Stack>

          {/* Second Range Slider */}
          <Stack align="center" spacing={2} ml="60px">
            <Heading size="sm">Current: [{slider2.value.join(", ")}]</Heading>
            <Slider.RootProvider value={slider2} width="200px">
              <Slider.Label>Number of Bathrooms</Slider.Label>
              <Slider.Control>
                <Slider.Track>
                  <Slider.Range />
                </Slider.Track>
                <Slider.Thumb index={0}>
                  <Slider.HiddenInput onChange={(e) => setLeft2(e.target.value)} />
                </Slider.Thumb>
                <Slider.Thumb index={1} onChange={(e) => setRight2(e.target.value)}>
                  <Slider.HiddenInput />
                </Slider.Thumb>
              </Slider.Control>
            </Slider.RootProvider>
          </Stack>
        </Flex>

        {/* Price Range Slider Section */}
        <Flex justify="center" align="center" mt="30px" width="100%">
          <Stack align="center" spacing={2} width="100%">
            <Heading size="sm">Price Range $: [{priceSlider.value.join(", ")}]</Heading>
            <Slider.RootProvider value={priceSlider} width="100%">
              <Slider.Label>Price Range</Slider.Label>
              <Slider.Control>
                <Slider.Track>
                  <Slider.Range />
                </Slider.Track>
                <Slider.Thumb index={0}>
                  <Slider.HiddenInput onChange={(e) => setPriceLeft(e.target.value)} />
                </Slider.Thumb>
                <Slider.Thumb index={1} onChange={(e) => setPriceRight(e.target.value)}>
                  <Slider.HiddenInput />
                </Slider.Thumb>
              </Slider.Control>
            </Slider.RootProvider>
          </Stack>
        </Flex>
      </Stack>
    </Flex>
  );
};

const items = [
  { value: "Apartment", title: "Apartment(s)", description: "" },
  { value: "House", title: "House", description: "" },
  { value: "Condo", title: "Condo", description: "" },
  { value: "Town House", title: "Town House", description: "" },
];

export { Survey };
