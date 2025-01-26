import { useState, useEffect, useRef } from 'react';
import { ChakraProvider, Box, Flex, Heading, Text } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './navbar';
import homeImage from './homematcha.png';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is in view
    );
    
    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  return (
    <div style={{ fontFamily: "'Palatino Linotype', 'Book Antiqua', serif", fontSize: '20px' }}>
      <div style={{ position: 'relative', height: '100vh', overflowY: 'auto' }}>
        <Navbar style={{ position: 'fixed', top: '0', left: '0', width: '100%', zIndex: 10 }} />

        <img
          src={homeImage}
          alt="Matcha at home"
          style={{
            width: '100%',
            height: '100vh',
            objectFit: 'cover',
            top: '0',
            left: 0,
            zIndex: 0,
          }}
        />

        <section id="about" ref={aboutRef} style={aboutStyle}>
          <Flex direction="column" align="flex-start">
            <Box flex="1" padding="10px">
              <Heading
                as="h2"
                size="xl"
                marginBottom="10px"
                style={{
                  fontSize: '45px',
                  fontWeight: 'bold',
                  wordSpacing: '3px',
                  lineHeight: '1',
                  marginBottom: '10px',
                  paddingTop: '50px',
                  opacity: isVisible ? 1 : 0,
                  transition: 'opacity 1s ease',  // Fade-in effect with transition
                }}
              >
                <span>Match. Swipe. Move in.</span>
              </Heading>
            </Box>

            <Box flex="3" padding="10px">
              <Text
                style={{
                  fontSize: '20px',
                  paddingLeft: '350px',
                  paddingTop: '50px',
                  opacity: isVisible ? 1 : 0,
                  transition: 'opacity 1s ease 0.2s', // Fade-in with delay for sequential appearance
                }}
              >
                matchAhome believes that the perfect home can be found in almost an instant.
              </Text>
              <Text
                style={{
                  fontSize: '20px',
                  paddingLeft: '350px',
                  opacity: isVisible ? 1 : 0,
                  transition: 'opacity 1s ease 0.4s', // Fade-in with delay
                }}
              >
                With a seamless user interface and smart recommendations, finding your dream home is easier than ever.
              </Text>
              <Text
                style={{
                  fontSize: '20px',
                  paddingLeft: '350px',
                  opacity: isVisible ? 1 : 0,
                  transition: 'opacity 1s ease 0.6s', // Fade-in with delay
                }}
              >
                Explore listings, connect with landlords, and start the next chapter of your life today.
              </Text>
            </Box>
          </Flex>
        </section>
      </div>
    </div>
  );
};

const aboutStyle = {
  fontSize: '20px',
  position: 'relative',
  zIndex: 1,
  paddingBottom: '60px',
  paddingLeft: '150px',
  paddingRight: '150px',
};

export { Home };