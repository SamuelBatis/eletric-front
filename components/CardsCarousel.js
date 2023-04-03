import { useState } from "react";
import { Flex, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const CardCarousel = ({ cards }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevClick = () => {
    setActiveIndex(activeIndex === 0 ? cards.length - 1 : activeIndex - 1);
  };

  const handleNextClick = () => {
    setActiveIndex(activeIndex === cards.length - 1 ? 0 : activeIndex + 1);
  };

  return (
    <Flex align="center" justify="center" mb={4}>
      <IconButton
        icon={<ChevronLeftIcon />}
        aria-label="previous card"
        onClick={handlePrevClick}
      />
      {cards.map((card, index) => (
        <Flex
          key={card.id}
          position={index === activeIndex ? "static" : "absolute"}
          opacity={index === activeIndex ? 1 : 0.5}
          transition="opacity 0.3s ease-in-out"
          width="calc(100% / 3)"
          justify="center"
          marginLeft={index > 0 ? 2 : 0}
          zIndex={index === activeIndex ? 1 : 0} // define um z-index maior para o cartão ativo
        >
          {/* render your card content here */}
          {card.content}
        </Flex>
      ))}
      <IconButton
        icon={<ChevronRightIcon />}
        aria-label="next card"
        onClick={handleNextClick}
      />
    </Flex>
  );
};

export default CardCarousel;
