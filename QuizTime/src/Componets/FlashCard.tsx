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
  

interface FlashcardProps {
  flashcard: {
    question: string;
    answer: string;
    options: string[];
  };
}

export default function Flashcard({ flashcard }: FlashcardProps): JSX.Element {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState<number | string>('initial');

  const frontEl = useRef<HTMLDivElement | null>(null);
  const backEl = useRef<HTMLDivElement | null>(null);

  function setMaxHeight() {
    if (frontEl.current && backEl.current) {
      const frontHeight = frontEl.current.getBoundingClientRect().height;
      const backHeight = backEl.current.getBoundingClientRect().height;
      setHeight(Math.max(frontHeight, backHeight, 100));
    }
  }

  useEffect(setMaxHeight, [flashcard.question, flashcard.answer, flashcard.options]);
  useEffect(() => {
    window.addEventListener('resize', setMaxHeight);
    return () => window.removeEventListener('resize', setMaxHeight);
  }, []);

  return (
    <Box className={`card ${flip ? 'flip' : ''}`}
      h={height}
      style={{ height: height }}
      onClick={() => setFlip(!flip)}
      borderWidth="1px"
      borderRadius="1g"
      overflow="hidden" >

    <Box p={4} ref={frontEl}>
        <Text fontSize="xl">{flashcard.question}</Text>
        <Box mt={2} className="flashcard-options"> 
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
      </Box>
      <Box p={4} ref={backEl}>
        <Text fontSize="xl">{flashcard.answer}</Text>
      </Box>
    </Box>
  );
}
   
     
       
       
       
    
