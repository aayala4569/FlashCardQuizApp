import { Box } from '@chakra-ui/react';
import Flashcard from './FlashCard';

//This interface defines the props expected by the flashcardlist
interface FlashcardListProps {
  flashcards: {
    id: string;
    question: string;
    answer: string;
    options: string[];
  }[];
}

//This is the functional component that receives the props from above
export default function FlashcardList({ flashcards }: FlashcardListProps): JSX.Element {

//Rendering the flashcards
  return (
    <Box className="card-grid" display="grid" gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4}>

{/* Within this layout I am mapping through flashcard component within flashcardlist by passing through the flashcard props */}
      {flashcards.map(flashcard => (
        <Flashcard flashcard={flashcard} key={flashcard.id}/>
      ))}
    </Box>
  );
}

