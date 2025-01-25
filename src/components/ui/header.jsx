import { Box, IconButton, Text } from "@chakra-ui/react";
import { IoPersonSharp } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";

const Header = () => {
    return (
        <Box display = "flex" justifyContent={"space-between"}>
            <Text>Home Tinder</Text>
            <Box>
                <IconButton backgroundColor="white">
                    <IoPersonSharp color="black"/>
                </IconButton>
                <IconButton backgroundColor="white">
                    <FaHistory color="black"/>
                </IconButton>
            </Box>
        </Box>
    );
};

export { Header };
