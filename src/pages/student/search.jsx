import React from 'react';

export function Search() {
  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 py-10">
      <div className="max-w-3xl mx-auto text-white px-4">
        <h1 className="text-3xl font-bold mb-4">Find the best courses for you</h1>
        <p className="mb-6">
          Discover, Learn, and Upskill with our wide range of courses
        </p>
        <form className='flex item-center'>
          <input
            type="text"
            placeholder="Please search the courses here"
            className="w-full p-3 rounded-md text-black large rounding"
          />
        <button className="relative bg-green-500 text-white px-4 py-2 rounded br-rd-3xl">
         Search
        </button>
         </form>
           <button className='bg-red-500 mt-4 ml-80'> Explore courses</button>
      </div>
    </div>
  );
}
