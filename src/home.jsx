import { useState, useEffect, useRef } from 'react';
import { ChakraProvider, Box, Flex, Heading, Text, Image }  from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import "@fontsource/signika-negative";
import Navbar from './navbar';
import homeImage from './homematcha.png';
import loveHome from './loveforhomes.jpg';
import './home.css';

const Home = () => {
  const [hasAppeared, setHasAppeared] = useState(false);
  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAppeared) {
          setHasAppeared(true);
        }
      },
      {
        threshold: 0,
        rootMargin: '0px',
      }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, [hasAppeared]);

  return (
    <div style={{fontSize: '20px', backgroundColor: '#F3F3F3', }}>
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
            <Box flex="1" padding="50px">
                  <Heading
                      as="h2"
                      size="xl"
                      marginBottom="10px"
                      style={{
                        fontSize: '45px',
                        fontWeight: 'bold',
                        wordSpacing: '3px',
                        lineHeight: '1',
                        paddingTop: '20px',
                        opacity: hasAppeared ? 1 : 0,
                        transition: 'opacity 1s ease',
                      }}
                    >
        <span>Match. Swipe. </span>
        <span style={{ textDecoration: 'underline' }}>Move in.</span>
      </Heading>
      </Box>
      <Box flex="3" padding="10px">

  <hr
    style={{
      width: '40%',
      borderTop: '1px solid #ccc',
      margin: '0 auto 20px auto',
      marginLeft: '45%'
    }}
  />

  <Text
    style={{
      fontSize: '19px',
      paddingLeft: '650px',
      paddingRight: '200px',
      opacity: hasAppeared ? 1 : 0,
      transition: 'opacity 1s ease 0.2s',
    }}
  >
    We believe that the perfect home can be found in almost an instant. Just like your favorite cup of matcha, the experience is smooth, refreshing, and perfectly tailored to you.
    Explore listings, connect with landlords, and start the next chapter of your life today.
  </Text>

  <Link to="/survey">
    <button
      style={{
        padding: '5px 5px',
        backgroundColor: "#99c280",
        color: '#fff',
        border: 'none',
        borderRadius: '30px',
        fontSize: '15px',
        cursor: 'pointer',
        marginTop: '30px',
        marginLeft: '650px',
        marginRight: '100px',
        padding: '15px',
      }}
    >
      Get started
    </button>
  </Link>

  <hr
    style={{
      width: '40%',
      borderTop: '1px solid #ccc',
      margin: '20px auto 0 auto',
      marginLeft: '45%'
    }}
  />
  </Box>
</Flex>
</section>

        <section id="swiperight" ref={aboutRef} style={aboutStyle}>
          <Flex direction="row" align="center">
            <Box flex="1">
              <Image
                src={loveHome}
                alt="Eyes Matcha"
                style={{
                  maxWidth: '600px',
                  height: '500px',
                  objectFit: 'cover',
                  marginRight: '30px',
                  marginLeft: '50px',
                  borderRadius: '20px', 
                }}
              />
            </Box>

            <Box flex="3" padding="10px">
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
                  paddingLeft: '80px',
                  opacity: hasAppeared ? 1 : 0,
                  transition: 'opacity 1s ease',
                }}
              >
                <span>Love at First Sight… For Homes.</span>
              </Heading>
              <hr
                style={{
                width: '90%',
                borderTop: '1px solid #ccc',
                margin: '20px auto 0 auto',
                marginLeft: '10%'
                }}
  />

              <Text
                style={{
                  paddingTop: '20px',
                  fontSize: '20px',
                  opacity: hasAppeared ? 1 : 0,
                  transtion: 'opacity 1s ease 0.2s',
                  paddingLeft: '80px',
                }}
              >
                Just like a spark in romance, it’s about that instant connection when you see a home that feels just right.
                With matchAhouse, every swipe brings you closer to your true house love.
                Because your next home should be more than a place—it should be love.
              </Text>
              <hr
    style={{
      width: '90%',
      borderTop: '1px solid #ccc',
      margin: '20px auto 0 auto',
      marginLeft: '10%'
    }}
  />
            </Box>
          </Flex>
        </section>

        <section id="engineer" ref={aboutRef} style={aboutStyle}>
          <Flex direction="row" align="center">

            <Box flex="3" padding>
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
                  paddingLeft: '80px',
                  paddingRight: '800px',
                  opacity: hasAppeared ? 1 : 0,
                  transition: 'opacity 1s ease',
                }}
              >
                <span>Engineered for Your Perfect Match.</span>
              </Heading>
              <hr
                style={{
                width: '46%',
                borderTop: '1px solid #ccc',
                margin: '20px auto 0 auto',
                marginLeft: '5%'
                }}
  />

              <Text
                style={{
                  paddingTop: '20px',
                  fontSize: '20px',
                  opacity: hasAppeared ? 1 : 0,
                  transtion: 'opacity 1s ease 0.2s',
                  paddingLeft: '80px',
                  paddingRight: '700px',
                }}
              >
                Our platform is designed with precision and care, using advanced algorithms to connect you with homes that fit your style, budget, and needs. Every swipe is backed by cutting-edge technology to ensure you're only seeing the best matches.
                We’ve taken the guesswork out of the process, so you can focus on falling in love with your future space.
              </Text>
              <hr
            style={{
            width: '46%',
            borderTop: '1px solid #ccc',
            margin: '20px auto 0 auto',
            marginLeft: '5%'
            }}
  />
            </Box>
          </Flex>
        </section>

        <section id="bottomRow" ref={aboutRef} style={engineerStyle}>
          <Flex direction="row" align="center">

            <Box flex="3" padding>
              <Heading
                as="h2"
                size="xl"
                marginBottom="50px"
                style={{
                  fontSize: '45px',
                  fontWeight: 'bold',
                  wordSpacing: '3px',
                  lineHeight: '1',
                  marginBottom: '50px',
                  paddingLeft: '80px',
                  paddingRight: '800px',
                  opacity: hasAppeared ? 1 : 0,
                  transition: 'opacity 1s ease',
                }}
              >
                              <hr
            style={{
            width: '1250px',
            borderTop: '1px solid #ccc',
            margin: '20px auto 0 auto',
            marginLeft: '0%',
            marginTop: '-100px',
            }}
  />
                <span>Engineered for Your Perfect Match.</span>
              </Heading>

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
  paddingBottom: '185px',
  paddingLeft: '150px',
  paddingRight: '150px',
};

const engineerStyle = {
  fontSize: '20px',
  position: 'relative',
  zIndex: 1,
  paddingBottom: '185px',
  paddingLeft: '150px',
  paddingRight: '150px',
  background: '#000',
  color: '#fff',
  paddingTop: '200px',
  paddingBottom: '300px',
}

export { Home };