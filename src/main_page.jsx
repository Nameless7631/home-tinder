import logo from './logo.svg';
import { Flex, Input } from "@chakra-ui/react"
import { Swipe } from './components/swipe';


function MainPage() {
  return (
    <Flex justifyContent='center' mt="24px">
      <Swipe/>
    </Flex>
  );
}

export default MainPage;
