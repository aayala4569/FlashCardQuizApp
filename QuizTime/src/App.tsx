import React, { useState, useEffect, useRef, FormEvent, Box, FormControl, FormLabel, Select, Input, Button } from '@chakra-ui/react';
import FlashcardList from './Componets/CardList';
import './App.css';
import axios from 'axios';
import CardList from './Componets/CardList';

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

function App(): JSX.Element {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const categoryEl = useRef<HTMLSelectElement>(null);
  const amountEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php').then(res => {
      setCategories(res.data.trivia_categories);
    });
  }, []);

  function decodeString(str: string): string {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (amountEl.current && categoryEl.current) {
      axios
        .get('https://opentdb.com/api.php', {
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

  return (
    <Box>
      <form className="header" onSubmit={handleSubmit}>
        <FormControl>
          
          <FormLabel htmlFor="category">Category</FormLabel>
          <Select id="category" ref={categoryEl}>
            {categories.map(category => {
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
            })}
          </Select>
        </FormControl>

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

       
          <Button type="submit" className="btn">Generate</Button>
        
      </form>
      <Box className="container">
        <CardList flashcards={flashcards} />
      </Box>
    </Box>
  );
}

export default App;
