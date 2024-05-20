import  Title  from '../components/Title';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import SearchExercises from '../components/SearchExercises';
import Exercises from '../components/Exercises';

const Home = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState('all');

  return (
    <Box>
        <Title/>
        <SearchExercises setExercises={setExercises} bodyPart={bodyPart} setBodyPart={setBodyPart} />
        <Exercises exercises={exercises} setExercises={setExercises} bodyPart={bodyPart}/>
    </Box>
  )
}

export default Home;