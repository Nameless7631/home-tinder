import { Box, IconButton, Text, Button } from "@chakra-ui/react";
import { IoPersonSharp } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { useState } from "react";
import {
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerRoot,
    DrawerTitle,
    DrawerTrigger,
    DrawerActionTrigger,
  } from "./drawer"

const Header = () => {
    const [open, setOpen] = useState(false)
    const [history, setHistory] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"])
    return (
        <Box display = "flex" justifyContent={"space-between"}>
            <Text>Home Tinder</Text>
            <Box>
                <IconButton backgroundColor="white">
                    <IoPersonSharp color="black"/>
                </IconButton>
                <DrawerRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
                    <DrawerBackdrop />
                    <DrawerTrigger asChild>
                        <IconButton backgroundColor="white">
                            <FaHistory color="black"/>
                        </IconButton>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>History</DrawerTitle>
                        </DrawerHeader>
                        <DrawerBody>
                        {history.map(h => <p>{h}</p>)} 
                        </DrawerBody>
                        <DrawerFooter>
                        <DrawerActionTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerActionTrigger>
                        <Button>Save</Button>
                        </DrawerFooter>
                        <DrawerCloseTrigger />
                    </DrawerContent>
                    </DrawerRoot>
            </Box>
        </Box>
    );
};

export { Header };
