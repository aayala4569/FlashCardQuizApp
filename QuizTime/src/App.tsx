import React, { Box, FormControl, FormLabel, Select, Input, Button } from '@chakra-ui/react';
import Flashcard from './Componets/FlashCard';
import './App.css';
import axios from 'axios';
import CardList from './Componets/CardList';
import { FormEvent, useEffect, useRef, useState } from 'react';


//Defining Typescript interfaces for Category and Flashcard data structures.
interface Category {
  id: number;
  name: string;
}

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  options: string[];
}

//Defining the main APP functional component
function App(): JSX.Element {

  //Using the UseState hook to manage the state of flashcard and categories
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  //Ref declarations to access the <select> and <input> elements in the form
  const categoryEl = useRef<HTMLSelectElement>(null);
  const amountEl = useRef<HTMLInputElement>(null);

//Using useEffect hook to fetch categories from the Open Trivia Database API when the component mounts
  useEffect(() => {
    axios.get('https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986').then(res => {
      setCategories(res.data.trivia_categories);
    });
  }, []);
//Defining a string function to decode HTML entities in strings
  function decodeString(str: string): string {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
  }
//Below Handles the form submission and fetching flashcards based on user inputs from the Open Trivia Database API
  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (amountEl.current && categoryEl.current) {
      axios
        .get('https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986', {
          params: {
            amount: amountEl.current.value,
            category: categoryEl.current.value,
          },
        })
        .then(res => {
          setFlashcards(
            res.data.results.map((questionItem: any, index: number) => {
              const answer = decodeString(questionItem.correct_answer);
              const options = [
                ...questionItem.incorrect_answers.map((a: string) =>
                  decodeString(a)
                ),
                answer,
              ];
              return {
                id: `${index}-${Date.now()}`,
                question: decodeString(questionItem.question),
                answer: answer,
                options: options.sort(() => Math.random() - 0.5),
              };
            })
          );
        });
    }
  }

 //Returning JSX that includes a form with Chakra UI components for category selection and question amount input
 //And Displaying the list of flashcards using the CardList component
  return (
    <Box>
      {/* A standard HTML form element with the onSubmit event handler set to the handleSubmit function. */}
      <form className="header" onSubmit={handleSubmit}>
 {/* Below components are used to create the category selection dropdown */}
        <FormControl>
          <FormLabel htmlFor="category">Category</FormLabel>
          <Select id="category" ref={categoryEl}>
{/* This maps over the categories array and generates an <option> element for each category. */}
            {categories.map(category => (
                  <option value={category.id} key={category.id}>
                  {category.name}
                </option>
           ))}      
          </Select>
        </FormControl>

 {/* Chakra UI's FormControl, FormLabel, and Input components are used for the question amount input */}
        <FormControl>
          <FormLabel htmlFor="amount">Number of Questions</FormLabel>
          <Input
            type="number"
            id="amount"
            min="1"
            step="1"
            defaultValue={10}
            ref={amountEl}
          />
        </FormControl>

{/* A Chakra UI Button component for triggering the form submission */}
          <Button type="submit" className="btn">Generate</Button>
      </form>


{/* This renders your CardList component, passing the flashcards data as a prop. */}
      <Box className="container">
        <CardList flashcards={flashcards} />
      </Box>
    </Box>
  );
}

export default App;
