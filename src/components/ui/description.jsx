import { useState } from "react";
import { Box, IconButton, Collapsible, Icon } from "@chakra-ui/react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";


const Description = () => {
  return (
    <Box>
        <Collapsible.Root>
        <Collapsible.Trigger>
            <IconButton backgroundColor="red">
                <FaChevronDown/>
            </IconButton>
        </Collapsible.Trigger>
        <Collapsible.Content>
            <Box padding="4" borderWidth="1px" color = "gray">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book.
            </Box>
        </Collapsible.Content>
        </Collapsible.Root>
    </Box>
  );
};

export { Description };
