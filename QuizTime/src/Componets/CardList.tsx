import { Box } from '@chakra-ui/react';
import Flashcard from './FlashCard';

interface FlashcardListProps {
  flashcards: {
    id: string;
    question: string;
    answer: string;
    options: string[];
  }[];
}

export default function FlashcardList({ flashcards }: FlashcardListProps): JSX.Element {
  return (
    <Box className="card-grid" display="grid" gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4}>
    
      {flashcards.map(flashcard => (
        <Flashcard flashcard={flashcard} key={flashcard.id}/>
      ))}
    </Box>
  );
}

