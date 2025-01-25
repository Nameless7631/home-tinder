"use client";

import { Code, Slider, Stack, Text, Flex, CheckboxGroup, Box, Heading } from "@chakra-ui/react";
import { useSlider } from "@chakra-ui/react";
import { useState } from "react";
import { CheckboxCard } from "./components/ui/checkbox-card";

const Survey = () => {
  const [leftValue, setLeftValue] = useState(0);
  const [rightValue, setRightValue] = useState(100);
  const [left2, setLeft2] = useState(0);
  const [right2, setRight2] = useState(100);
  const slider = useSlider({
    defaultValue: [leftValue, rightValue], // Set default values for the range slider
    thumbAlignment: "center",
  });
  const slider2 = useSlider({
    defaultValue: [leftValue, rightValue], // Set default values for the range slider
    thumbAlignment: "center",
  });

  return (
    <Flex justifyContent="center" >
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

        {/* Range Slider Section (2 columns layout) */}
        <Flex justify="space-between" mt="24px">
          {/* First Range Slider */}
          <Stack>
            <Heading>current: [{slider.value.join(", ")}]</Heading>
              <Slider.RootProvider value={slider} width="200px">
                <Slider.Label>Number of Beds</Slider.Label>
              <Flex justifyContent='space-evenly' w='100%'>
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
                </Flex>
              </Slider.RootProvider>
          </Stack>

          {/* Duplicate Range Slider to the right */}
          <Stack>
            <Heading>current: [{slider2.value.join(", ")}]</Heading>
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
      </Stack>
    </Flex>
  );
};

const items = [
  { value: "Apartment", title: "Apartment(s)", description: "" },
  { value: "House", title: "House", description: "" },
  { value: "Condo", title: "Condo", description: "" },
  { value: "Studio/Single Home", title: "Studio/Single Home", description: "" },
  { value: "Town House", title: "Town House", description: "" },
];

export { Survey };
