import { Card, Image, Text, HStack, colorPalettes, IconButton } from "@chakra-ui/react";
import { FaHeart, FaHeartBroken, FaChevronUp } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Description } from "./ui/description.jsx"
// import axios from "axios";



const Swipe = () => {
  const controls = useAnimation(); // Controls for the animation
  const [swiped, setSwiped] = useState(null); // Track swipe direction (optional)
  const [history, setHistory] = useState([]);
  const cardRef = useRef(null);

  useEffect(() => {
    console.log("Updated history:", history);
  }, [history]);

  // useEffect(() => {
  //   if (cardRef.current) {
  //     cardRef.current.focus(); // Autofocus the card when it mounts
  //   }
  //   // Fetch data from the API
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://127.0.0.1:8000/");
  //       console.log(response.data); // Log the data for debugging
  //     } catch (err) {
  //       console.error("Error fetching data:", err.message);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const handleDragEnd = async (_, info) => {
    if (info.offset.x > 100) {
      setSwiped("right");
      console.log("Swiped Right");
      // Exit animation for swipe right
      await controls.start({
        x: 300,
        opacity: 0,
        transition: { duration: 0.5 },
      });
      setHistory((prevHistory) => [...prevHistory, "Right"]);
    } else if (info.offset.x < -100) {
      setSwiped("left");
      console.log("Swiped Left");
      // Exit animation for swipe left
      await controls.start({
        x: -300,
        opacity: 0,
        transition: { duration: 0.5 },
      });
      setHistory((prevHistory) => [...prevHistory, "Left"]);
    } else {
      // Reset the card to its original position if no swipe
      controls.start({ x: 0 });
    }
    // Reset swiped state and animation after swipe
    setSwiped(null);
    controls.start({ x: 0, opacity: 1 });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
      }}
    >
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }} // Only allow horizontal dragging
        onDragEnd={handleDragEnd} // Trigger action after dragging
        initial={{ scale: 1 }}
        
        animate={controls} // Use controls for exit animation
        style={{ width: "400px" }}
      > 
    <Card.Root 
      outline='none'
      ref={cardRef}
      maxW="xl" 
      overflow="hidden" 
      h="900px"
      tabIndex={0} // Makes the card focusable to capture key events
      onKeyDown={async (event) => {
        if (event.key === "ArrowLeft") {
          // Trigger left swipe animation
          setSwiped("left");
          console.log("Swiped Left with Arrow Key");
          await controls.start({
            x: -300,
            opacity: 0,
            transition: { duration: 0.5 },
          });
          setHistory((prevHistory) => [...prevHistory, "Left"]);
          setSwiped(null);
          controls.start({ x: 0, opacity: 1 });
        } else if (event.key === "ArrowRight") {
          // Trigger right swipe animation
          setSwiped("right");
          console.log("Swiped Right with Arrow Key");
          await controls.start({
            x: 300,
            opacity: 0,
            transition: { duration: 0.5 },
          });
          setHistory((prevHistory) => [...prevHistory, "Right"]);
          setSwiped(null);
          controls.start({ x: 0, opacity: 1 });
        }
      }}
      >
      <Image
        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt="Green double couch with wooden legs"
      />
      <Card.Body gap="2">
        <Card.Title>Location- City/State and Price</Card.Title>
        <Card.Description>

        </Card.Description>

      </Card.Body>
      <Card.Footer
        display="flex"
        justifyContent="center"
        gap="4" // Adjust spacing between buttons
      >
        <IconButton rounded="full" backgroundColor="red" width="72px" height="72px"
          onClick={async () => {
            setSwiped("left");
            console.log("Swiped Left");
            // Exit animation for swipe left
            await controls.start({
              x: -300,
              opacity: 0,
              transition: { duration: 0.5 },
            });
            setHistory((prevHistory) => [...prevHistory, "Left"]);
            setSwiped(null);
            controls.start({ x: 0, opacity: 1 });
          }}
        >
          <FaHeartBroken width="128px" height="128px"/>
        </IconButton>
        <IconButton rounded="full" backgroundColor="green" width="72px" height="72px" 
        onClick={async () => {
          setSwiped("right");
          console.log("Swiped Right");
          // Exit animation for swipe right
          await controls.start({
            x: 300,
            opacity: 0,
            transition: { duration: 0.5 },
          });
          setHistory((prevHistory) => [...prevHistory, "Right"]);
          setSwiped(null);
            controls.start({ x: 0, opacity: 1 });
        }}>
          <FaHeart />
        </IconButton>
      </Card.Footer>
    </Card.Root>
      </motion.div>
    </div>
  );
};

export { Swipe };

