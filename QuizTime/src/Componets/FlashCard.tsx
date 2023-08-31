import {
    Box,
    Text,
    Button,
    Flex,
    Center,
    Spacer,
    IconButton,
    Heading,
  } from '@chakra-ui/react';
  import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';
  import { useEffect, useRef, useState } from 'react';

//Interface dfines props expected by the Flashcard component.
export interface FlashcardProps {
  flashcard: {
    question: string;
    answer: string;
    options: string[];
  };
}


//Below export is the main functional component, it receives the flashcard prop according to the prop interface
export default function Flashcard({ flashcard }: FlashcardProps): JSX.Element {


//using the useState hook to manage the state of FLIP and HEIGHT of the card
  const [flip, setFlip] = useState(false);
  
  const [height, setHeight] = useState<number | string>('initial');

  //useRef hooks are used to referencethe front and back elements of the card
  const frontEl = useRef<HTMLDivElement | null>(null);
  const backEl = useRef<HTMLDivElement | null>(null);

//This function calculates the Max height between the front and back of the card and sets the height of the card
  function setMaxHeight() {
    if (frontEl.current && backEl.current) {
      const frontHeight = frontEl.current.getBoundingClientRect().height;
      const backHeight = backEl.current.getBoundingClientRect().height;
      setHeight(Math.max(frontHeight, backHeight, 100));
    }
  }

//This useEffect hook runs setMaxHeight whenever the flashcard prop changes
  useEffect(setMaxHeight, [flashcard.question, flashcard.answer, flashcard.options]);

//This use effect adds an event listener for window resize 
//And returns a cleanup function to remove the eventvlistener when the component unmounts
  useEffect(() => {
    window.addEventListener('resize', setMaxHeight);
    return () => window.removeEventListener('resize', setMaxHeight);
  }, []);

//Rendering the card
  return (
    <Box 
      h={height}
      style={{ height: height }}
      onClick={() => setFlip(!flip)}
      bg="lightblue"
      borderWidth="1px"
      boxShadow="0 0 5px 2px rgba(0,0,0,0.3)"
      borderRadius="lg"
      overflow="hidden" 
      width="100%"
      margin={50}
      >
        {!flip ? 
       <Box p={4} ref={frontEl}>
        <Text fontSize="xl">{flashcard.question}</Text>
        <Box mt={2} className="flashcard-options"> 

{/* Mapping through flashcard options array to render the multiple choice options for the front of the card */}
        {flashcard.options.map(option => (
            <Box key={option}
            p={2}
            borderWidth="1px"
            borderRadius="md"
            borderColor="gray.300"
            _hover={{ bg: 'gray.100' }}>
            {option}
            </Box>
        ))} 
           </Box>
      </Box> :<Box p={4} ref={backEl}>
        <Text fontSize="xl">{flashcard.answer}</Text>
      </Box>}


      
    </Box>
  );
}
   
     
       
       
       
    
