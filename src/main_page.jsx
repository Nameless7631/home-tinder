import { Flex} from "@chakra-ui/react"
import { Swipe } from './components/swipe';
// import Swipe from './components/swipe';
import { Header } from "./components/ui/header.jsx"
;

function MainPage() {
  return (
    <>
      <Header></Header>
      <Flex justifyContent='center' mt="24px">
        <Swipe/>
      </Flex>
    </>
  );
}
 
export default MainPage;
