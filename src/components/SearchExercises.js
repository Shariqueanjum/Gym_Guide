import React from 'react';
import { useState,useEffect } from 'react';
import { Stack,Typography,Box,Button,TextField } from '@mui/material';
import { exerciseOptions,fetchData } from '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
     const [search,setSearch]=useState('');
     const [bodyParts,setBodyParts]=useState([]);

     useEffect(() => {
      const fetchExercisesData = async () => {
        const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
  
        setBodyParts(['all', ...bodyPartsData]);
      };
  
      fetchExercisesData();
    }, []);

     const handleSearch= async ()=>{
        
        if(search){
             const exercisesData=await fetchData('https://exercisedb.p.rapidapi.com/exercises?limit=1300',exerciseOptions);
             const searchedExercises=exercisesData.filter((exercise)=>{
               return (
                      exercise.name.toLowerCase().includes(search)||
                      exercise.target.toLowerCase().includes(search)||
                      exercise.equipment.toLowerCase().includes(search)||
                      exercise.bodyPart.toLowerCase().includes(search)
               )
             })
             window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
             setExercises(searchedExercises);
             setSearch('');
        }
     }



    return (
        <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
          <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="49px" textAlign="center">
            Awesome Exercises You <br /> Should Know
          </Typography>
          <Box position="relative" mb="72px">
            <TextField
              height="76px"
              sx={{ input: { fontWeight: '700', border: 'none', borderRadius: '4px' }, width: { lg: '1170px', xs: '350px' }, backgroundColor: '#fff', borderRadius: '40px' }}
              value={search}
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
              placeholder="Search Exercises"
              type="text"
            />
            <Button className="search-btn" sx={{ bgcolor: '#FF2625', color: '#fff', textTransform: 'none', width: { lg: '173px', xs: '80px' }, height: '56px', position: 'absolute', right: '0px', fontSize: { lg: '20px', xs: '14px' } }} onClick={handleSearch}>
              Search
            </Button>
          </Box>
          <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
            { <HorizontalScrollbar data={bodyParts} isBodyParts={bodyParts}  setBodyPart={setBodyPart} bodyPart={bodyPart} />}
          </Box>
        </Stack>
      );
}

export default SearchExercises;