import { Card, Image, Text, HStack, colorPalettes, IconButton, Button } from "@chakra-ui/react";
import { FaHeart, FaHeartBroken} from "react-icons/fa";
import { IoMdPin } from "react-icons/io";
import { motion, useAnimation } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Description } from "./ui/description.jsx"
import axios from "axios";



const Swipe = () => {
  const controls = useAnimation(); // Controls for the animation
  const [swiped, setSwiped] = useState(null); // Track swipe direction (optional)
  const [history, setHistory] = useState([]);
  const [house, setHouse] = useState({
    formattedAddress: "",
    bedrooms: "",
    bathrooms: "",
    price: "",
    propertyType: "",
    taxAssessments: {},
  });
  // const [randomIdx, setRandomIdx] = useState(null);
  const [mostRecentYear, setMostRecentYear] = useState(null);
  const [algo, setAlgo] = useState({});
  const cardRef = useRef(null);

  const [formData, setFormData] = useState({
    address: "",
    bedrooms: "",
    bathrooms: "",
    price: "",
    property_type: "",
    like: false,
  });

  const fetchHouses = async () => {
    try {
      const response = await axios.get("http://localhost:8000/");

      
      setHouse(response.data);
      // console.log("Response:", response.data);  
      // console.log("House:", house);
      // console.log("Houses array:", response.data.house_ids); 
    } catch (error) {
      console.error("Error fetching houses: ", error);
    }
  };
  
  useEffect(() => {


    const fetchAlgo = async () => {
      const response = await axios.get('http://localhost:8000/algo');
      setAlgo(response.data.result);
      // console.log("Algo:", response.data.result);
    }

    // Call the async function
    fetchHouses();
    fetchAlgo();
  }, []);

  // useEffect(() => {
  //   console.log("House:", house);
  // }, [house]);

  const handleAlgoSubmit = async () => {
    const response = await axios.post('http://localhost:8000/algo', algo);
    // console.log("Algo response:", response);
    // console.log("Algo:", algo);
  }


  // useEffect(() => {
  //   if (house.length > 0) {
  //     setRandomIdx(Math.floor(Math.random() * house.length)); // Set initial random index once houses are loaded
      
  //   }
  // }, [house]); // Update randomIdx whenever houses array is updated

  // useEffect(() => {
  //   if (randomIdx !== null && houses.length > 0) {
  //     const house = houses; // Ensure we use the updated randomIdx
  //     if (house?.taxAssessments) {
  //       setMostRecentYear(Math.max(...Object.keys(house.taxAssessments).map(Number)));
  //     } else {
  //       setMostRecentYear(null);
  //     }
  //   }
  // }, [randomIdx, houses]);

  const checkImageExists = async (url) => {
    try {
      const response = await axios.head(url);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  const getImage = async (address) => {
    const imageType = ["jpg", "webp"];
    for (let type of imageType){
      const imagePath = `houses/${address}.${type}`;
      const exists = await checkImageExists(imagePath);
      if(exists){
        return imagePath;
      }
    }
    return "houses/matcha.jpg"
  }

  const MyComponent = ({ address }) => {
    const [imageSrc, setImageSrc] = useState(
      "houses/matcha.jpg"
    );
  
    useEffect(() => {
      const fetchImage = async () => {
        const img = await getImage(address);
        setImageSrc(img);
      };
  
      fetchImage();
    }, [address]); // Runs every time the address prop changes
    console.log("Checking path:", imageSrc);
    return (
      <Image
        src={imageSrc}
        alt="Dynamic image loaded based on existence"
      />
    );
  };

  const handleDragEnd = async (_, info) => {
    const currentHouse = houses[randomIdx];
    if (info.offset.x > 100) {
      setSwiped("right");
      // console.log("Swiped Right");
      // Get current house data before changing randomIdx
      const currentHouse = house;
      const currentYear = mostRecentYear;
      
      await controls.start({
        x: 300,
        opacity: 0,
        transition: { duration: 0.5 },
      });
      setHistory((prevHistory) => [...prevHistory, house.house_id]);

      // Now update for next house
      // setRandomIdx(Math.floor(Math.random() * house.length));
      console.log("House:", house);
      setFormData({
        address: house.formattedAddress,
        bedrooms: house.bedrooms  ? house.bedrooms : 0,
        bathrooms: house.bathrooms ? house.bedrooms : 0,
        price: house.price ? house.price : "",
      });
        
      // Prepare history data from current house
      const historyData = {
        address: houses[randomIdx].formattedAddress,
        property_type: currentHouse.propertyType,
        bedrooms: Number(currentHouse.bedrooms || 0),
        bathrooms: Number(currentHouse.bathrooms || 0),
        price: currentHouse.taxAssessments?.[mostRecentYear]?.value 
          ? Number(currentHouse.taxAssessments[mostRecentYear].value) 
          : "",
          like: true
      };
      console.log(currentHouse.propertyType);
      setAlgo(prevAlgo => ({
        ...prevAlgo,
        "Apartment": currentHouse?.propertyType === "Apartment" ? prevAlgo["Apartment"] + 1 : prevAlgo["Apartment"],
        "Condo": currentHouse?.propertyType === "Condo" ? prevAlgo["Condo"] + 1 : prevAlgo["Condo"],
        "Single Family": currentHouse?.propertyType === "Single Family" ? prevAlgo["Single Family"] + 1 : prevAlgo["Single Family"],
        "Multi-Family": house?.propertyType === "Multi-Family" ? prevAlgo["Multi-Family"] + 1 : prevAlgo["Multi-Family"],
        "moreThan3Beds": currentHouse?.bedrooms > 3 ? prevAlgo["moreThan3Beds"] + 1 : prevAlgo["moreThan3Beds"],
        "threeOrLessBeds": currentHouse?.bedrooms <= 3 ? prevAlgo["threeOrLessBeds"] + 1 : prevAlgo["threeOrLessBeds"],
        "moreThan2Baths": currentHouse?.bathrooms > 2 ? prevAlgo["moreThan2Baths"] + 1 : prevAlgo["moreThan2Baths"],
        "lessThan2Baths": currentHouse?.bathrooms <= 2 ? prevAlgo["lessThan2Baths"] + 1 : prevAlgo["lessThan2Baths"]
      }));
      console.log("Multi-Family", algo["Multi-Family"])
      handleAlgoSubmit();
      // const response = await axios.post('http://localhost:8000/algo', algo);
      // console.log("Algo response:", response);
      await axios.post('http://localhost:8000/history/', historyData);
      fetchHouses();

    } else if (info.offset.x < -100) {
      setSwiped("left");
      const currentHouse = house;
      const currentYear = mostRecentYear;
      
      await controls.start({
        x: -300,
        opacity: 0,
        transition: { duration: 0.5 },
      });
      setHistory((prevHistory) => [...prevHistory, house.house_id]);

      // Now update for next house
        setFormData({
          address: house.formattedAddress,
          bedrooms: house.bedrooms  ? house.bedrooms : 0,
          bathrooms: house.bathrooms ? house.bedrooms : 0,
          price: house.price ? house.price : "",
        });
        // console.log(formData)
      // Prepare history data from current house
      const historyData = {
        address: currentHouse.formattedAddress,
        property_type: house.propertyType,
        bedrooms: Number(currentHouse.bedrooms || 0),
        bathrooms: Number(currentHouse.bathrooms || 0),
        price: currentHouse.taxAssessments?.[mostRecentYear]?.value 
          ? Number(currentHouse.taxAssessments[mostRecentYear].value) 
          : "",
          like: false
      };
      setAlgo(prevAlgo => ({
        ...prevAlgo,
        "Apartment": currentHouse?.propertyType === "Apartment" ? prevAlgo["Apartment"] - 1 : prevAlgo["Apartment"],
        "Condo": currentHouse?.propertyType === "Condo" ? prevAlgo["Condo"] - 1 : prevAlgo["Condo"],
        "Single Family": currentHouse?.propertyType === "Single Family" ? prevAlgo["Single Family"] - 1 : prevAlgo["Single Family"],
        "Multi-Family": currentHouse?.propertyType === "Multi-Family" ? prevAlgo["Multi-Family"] - 1 : prevAlgo["Multi-Family"],
        "moreThan3Beds": currentHouse?.bedrooms > 3 ? prevAlgo["moreThan3Beds"] - 1 : prevAlgo["moreThan3Beds"],
        "threeOrLessBeds": currentHouse?.bedrooms <= 3 ? prevAlgo["threeOrLessBeds"] - 1 : prevAlgo["threeOrLessBeds"],
        "moreThan2Baths": currentHouse?.bathrooms > 2 ? prevAlgo["moreThan2Baths"] - 1 : prevAlgo["moreThan2Baths"],
        "lessThan2Baths": currentHouse?.bathrooms <= 2 ? prevAlgo["lessThan2Baths"] - 1 : prevAlgo["lessThan2Baths"]
      }));
      handleAlgoSubmit();
      await axios.post('http://localhost:8000/history/', historyData);
      fetchHouses();
    } else {
      controls.start({ x: 0 });
    }
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
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        initial={{ scale: 1 }}
        
        animate={controls}
        style={{ width: "400px" }}
      > 
    <Card.Root 
      outline='none'
      ref={cardRef}
      maxW="xl" 
      overflow="hidden" 
      h="800px"
      tabIndex={0} // Makes the card focusable to capture key events
      onKeyDown={async (event) => {
        if (event.key === "ArrowLeft") {
          setSwiped("left");
          // console.log("Swiped Left with Arrow Key");
          // Get current house data before changing randomIdx
          const currentHouse = house;
          const currentYear = mostRecentYear;
          
          await controls.start({
            x: -300,
            opacity: 0,
            transition: { duration: 0.5 },
          });
          setHistory((prevHistory) => [...prevHistory, house.house_id]);

          // Prepare history data from current house
          const historyData = {
            address: currentHouse.formattedAddress,
            property_type: house.propertyType,
            bedrooms: Number(currentHouse.bedrooms || 0),
            bathrooms: Number(currentHouse.bathrooms || 0),
            price: currentHouse.taxAssessments?.[currentYear]?.value 
              ? Number(currentHouse.taxAssessments[currentYear].value) 
              : "",
              like: false
          };
          setAlgo(prevAlgo => ({
            ...prevAlgo,
            "Apartment": currentHouse?.propertyType === "Apartment" ? prevAlgo["Apartment"] - 1 : prevAlgo["Apartment"],
            "Condo": currentHouse?.propertyType === "Condo" ? prevAlgo["Condo"] - 1 : prevAlgo["Condo"],
            "Single Family": currentHouse?.propertyType === "Single Family" ? prevAlgo["Single Family"] - 1 : prevAlgo["Single Family"],
            "Multi-Family": currentHouse?.propertyType === "Multi-Family" ? prevAlgo["Multi-Family"] - 1 : prevAlgo["Multi-Family"],
            "moreThan3Beds": currentHouse?.bedrooms > 3 ? prevAlgo["moreThan3Beds"] - 1 : prevAlgo["moreThan3Beds"],
            "threeOrLessBeds": currentHouse?.bedrooms <= 3 ? prevAlgo["threeOrLessBeds"] - 1 : prevAlgo["threeOrLessBeds"],
            "moreThan2Baths": currentHouse?.bathrooms > 2 ? prevAlgo["moreThan2Baths"] - 1 : prevAlgo["moreThan2Baths"],
            "lessThan2Baths": currentHouse?.bathrooms <= 2 ? prevAlgo["lessThan2Baths"] - 1 : prevAlgo["lessThan2Baths"]
          }));
          handleAlgoSubmit();
          await axios.post('http://localhost:8000/history/', historyData);

          // Now update for next house
          // setRandomIdx(Math.floor(Math.random() * house.length));
          if (house.taxAssessments) {
            setMostRecentYear(Math.max(...Object.keys(house.taxAssessments).map(Number)));
            setFormData({
              address: house.formattedAddress,
              bedrooms: house.bedrooms  ? house.bedrooms : 0,
              bathrooms: house.bathrooms ? house.bedrooms : 0,
              price: house.taxAssessments[mostRecentYear].value ? house.taxAssessments[mostRecentYear].value : "",
            });
            // console.log(formData)
          } else {
            setMostRecentYear(null);
            setFormData({
              address: house.formattedAddress,
              bedrooms: house.bedrooms  ? house.bedrooms : 0,
              bathrooms: house.bathrooms ? house.bedrooms : 0,
              price: "",
            });
          }
          // console.log(formData)
          controls.start({ x: 0, opacity: 1 });
          fetchHouses();
        } else if (event.key === "ArrowRight") {
          setSwiped("right");
          // console.log("Swiped Right with Arrow Key");
          // Get current house data before changing randomIdx
          const currentHouse = house;
          const currentYear = mostRecentYear;
          await controls.start({
            x: 300,
            opacity: 0,
            transition: { duration: 0.5 },
          });
          setHistory((prevHistory) => [...prevHistory, house.house_id]);
          setSwiped(null);
          // setRandomIdx(Math.floor(Math.random() * house.length));
          if (house.taxAssessments) {
            setMostRecentYear(Math.max(...Object.keys(house.taxAssessments).map(Number)));
            setFormData({
              address: house.formattedAddress,
              bedrooms: house.bedrooms  ? house.bedrooms : 0,
              bathrooms: house.bathrooms ? house.bedrooms : 0,
              price: house.taxAssessments[mostRecentYear].value ? house.taxAssessments[mostRecentYear].value : "",
            });
            // console.log(formData)
          } else {
            setMostRecentYear(null);
            setFormData({
              address: house.formattedAddress,
              bedrooms: house.bedrooms  ? house.bedrooms : 0,
              bathrooms: house.bathrooms ? house.bedrooms : 0,
              price: "",
            });
          }
          
          const historyData = {
            address: currentHouse.formattedAddress,
            property_type: house.propertyType,
            bedrooms: Number(currentHouse.bedrooms || 0),
            bathrooms: Number(currentHouse.bathrooms || 0),
            price: currentHouse.taxAssessments?.[currentYear]?.value 
              ? Number(currentHouse.taxAssessments[currentYear].value) 
              : "",
            like: true
          };
          // console.log("historyData", historyData);

          setAlgo(prevAlgo => ({
            ...prevAlgo,
            "Apartment": currentHouse?.propertyType === "Apartment" ? prevAlgo["Apartment"] + 1 : prevAlgo["Apartment"],
            "Condo": currentHouse?.propertyType === "Condo" ? prevAlgo["Condo"] + 1 : prevAlgo["Condo"],
            "Single Family": currentHouse?.propertyType === "Single Family" ? prevAlgo["Single Family"] + 1 : prevAlgo["Single Family"],
            "Multi-Family": house?.propertyType === "Multi-Family" ? prevAlgo["Multi-Family"] + 1 : prevAlgo["Multi-Family"],
            "moreThan3Beds": currentHouse?.bedrooms > 3 ? prevAlgo["moreThan3Beds"] + 1 : prevAlgo["moreThan3Beds"],
            "threeOrLessBeds": currentHouse?.bedrooms <= 3 ? prevAlgo["threeOrLessBeds"] + 1 : prevAlgo["threeOrLessBeds"],
            "moreThan2Baths": currentHouse?.bathrooms > 2 ? prevAlgo["moreThan2Baths"] + 1 : prevAlgo["moreThan2Baths"],
            "lessThan2Baths": currentHouse?.bathrooms <= 2 ? prevAlgo["lessThan2Baths"] + 1 : prevAlgo["lessThan2Baths"]
          }));
          handleAlgoSubmit();
          const response = await axios.post('http://localhost:8000/history/', historyData);
          fetchHouses();
          controls.start({ x: 0, opacity: 1 });
          
        }
      }}
      >
    {/* <Image
        src={getImage(houses[randomIdx]?.formattedAddress)}
        alt="Green double couch with wooden legs"
      />       */}
        <MyComponent address={houses[randomIdx]?.formattedAddress || ""} />
      <Card.Body gap="2">
        {/* <Card.Title>Location- City/State and Price</Card.Title> */}
        <HStack>
        <IoMdPin color="#EA4335" style={{ fontSize: '28px' }}/>
        <Card.Title fontSize="20px">
            {house.propertyType} - {house.city} / {house.state}
            {
              house?.price ? (
                <>
                  - ${house.price}
                </>
              ) : null
            }
        </Card.Title>
        </HStack>
        <Card.Description paddingTop="15px">
            <Description
              address={`${house.formattedAddress}`}
              bed={`${house?.bedrooms}`}
              bath={`${house?.bathrooms}`}
              sqft={`${house?.squareFootage}`}
              // text={`${algo[house.propertyType]}`}
              text={`${house.text}`}
              // text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            />
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
            // console.log("Swiped Left");
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
          // console.log("Swiped Right");
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

