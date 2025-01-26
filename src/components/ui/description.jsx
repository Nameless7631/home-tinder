import { useState } from "react";
import { Box } from "@chakra-ui/react";

const Description = ({ address, bed, bath, sqft, text }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(prevState => !prevState);
  };

  const halfwayIdx = text.length > 120 ? Math.floor(text.length / 2) : text.length;
  const firstHalf = text.slice(0, halfwayIdx);
  const secondHalf = text.slice(halfwayIdx);

  return (
    <Box>
        <Box onClick={handleToggle} style={{ cursor: "pointer", display: "inline"}}>
            {(address) ? (
                <>
                Address: {address}<br/>
                </>
            ) : <></>
            }
             {(bed > 0) ? (
                <>
                Bed: {bed}<br/>
                </>
            ) : <></>}
             {(bath > 0) ? (
                <>
                Bath: {bath}<br/>
                </>
            ) : <></>}
            {(sqft > 0) ? (
                <>
                Sqft: {sqft}<br/>
                </>
            ) : <></>}
            <br/>
            {firstHalf}
        </Box>
        {isOpen && (
            <Box style={{ display: "inline"}}>
                {secondHalf}
            </Box>
        )}
    </Box>
  );
};

export { Description };
