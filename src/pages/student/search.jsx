import React from 'react';
import { useState,useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { useSearchedcourseMutation } from '@/features/api/courseapi'
export function Search() {




  const [Searchedcourse, { data,isSuccess}] = useSearchedcourseMutation();

const navigate=useNavigate();
  const [formdata, setformdata] = useState('')


  const submitform = (e) => {
    e.preventDefault();
    Searchedcourse(formdata)
  }


   useEffect(() => {
    navigate("/", { state: { searchResults: null } });
  }, [navigate]);


  useEffect(() => {
  if (isSuccess && data) {
    

    navigate('/', { state: { searchResults: data } });
  }
}, [isSuccess, data, navigate]);



  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 py-10">
      <div className="max-w-3xl mx-auto text-white px-4">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Find the best courses for you</h1>
        <p className="mb-6">
          Discover, Learn, and Upskill with our wide range of courses
        </p>
        <form className='flex item-center' onSubmit={submitform}>
          <input
            type="text"
            value={formdata}
            onChange={(e) => setformdata(e.target.value)} placeholder="Please search the courses here"
            className="w-full p-3 rounded-md text-black large rounding"
          />
          <button type="submit" className="relative bg-green-500 text-white hover:bg-green-900 transition duration-300 px-4 py-2 rounded br-rd-3xl">
            Search
          </button>
        </form>
        <button className='mt-4 ml-80'> Explore courses</button>
      </div>
    </div>
  );
}
