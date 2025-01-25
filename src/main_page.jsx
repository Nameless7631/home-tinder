import logo from './logo.svg';
import { Flex, Input, IconButton, Stack } from "@chakra-ui/react"
import { Swipe } from './components/swipe';
import { FaBookmark } from "react-icons/fa";


function MainPage() {
  return (
    <Flex justifyContent='center' mt="24px">
      <Stack>
        <Swipe/>

        <Flex>
         <IconButton backgroundColor='transparent'><FaBookmark color='black'/></IconButton>
        </Flex>

      </Stack>
    </Flex>
  );
}

export default MainPage;
