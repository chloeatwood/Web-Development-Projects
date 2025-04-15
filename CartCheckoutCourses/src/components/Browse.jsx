import React from 'react';
import {Courses} from '../data/Courses';
import { useState } from 'react';

  // DONE:
  // - Display list of courses (use props or mock data) -> Used mock data
  // - Add filters for subject and difficulty (In requirements for Browse View in Project Requirements)
  // - Add search input fields (extra credit)
  // - Add "Add to Cart" button for each course

//Added to filter bu subject. Did not want to edit the Courses.js file so did it here
const subjectMapping = {
  "Software Development Practices": "Software Engineering",
  "Object Oriented Analysis and Design": "Software Engineering",
  "Software Testing": "Software Engineering",
  "Agile Project Management": "Software Engineering",
  "Mobile App Development": "Software Engineering",
  "UX/UI Design": "Software Engineering",
  "Human-Computer Interaction": "Software Engineering",
  "Cloud Computing": "Computer Science",
  "Object-oriented Programming": "Computer Science",
  "Introduction to Data Structures": "Computer Science",
  "Principles of Programming Languages": "Computer Science",
  "Design Analysis and Algorithms": "Computer Science",
  "Database Management Systems": "Computer Science",
  "Information Retrieval": "Computer Science",
  "Quantum Computing": "Computer Science",
  "Data Visualization": "Computer Science",
  "Neural Networks": "Computer Science",
  "Speech Recognition": "Computer Science",
  "Artificial Intelligence": "Computer Science",
  "Machine Learning": "Computer Science",
  "Formal Languages and Automata": "Computer Science",
  "Embedded Systems": "Computer Engineering",
  "Digital Logic": "Computer Engineering",
  "High-Performance Computing": "Computer Engineering",
  "Robotics": "Computer Engineering",
  "IoT Systems": "Computer Engineering",
  "Compiler Design": "Computer Engineering",
  "Cyber Security Fundamentals": "Cyber Security",
  "Cloud Security": "Cyber Security",
  "Ethical Hacking": "Cyber Security",
  "Blockchain Fundamentals": "Cyber Security"

};

const Browse = ({ cart, setCart, setStep }) => {
  const [search, setSearch] = useState("");
  const [selectedDifficulties, setSelectedDifficulties] = useState({
    Beginner: false,
    Intermediate: false,
    Expert: false,
  });

  const [selectedCategories, setSelectedCategories] = useState({
    "Software Engineering": false,
    "Computer Science": false,
    "Computer Engineering": false,
    "Cyber Security": false,
  });


  //Function determining difficulty based on course code
  const getDifficulty = (courseCode) => {
    const level = parseInt(courseCode.slice(-3)); //Gets the last 3 digits of the course code. Hope it works
    if(level < 300){
      return "Beginner"; 
    } else if(level < 400){
      return "Intermediate";
    }else{
      return "Expert";
    }
  };


  //Triggers when a checkbox is checked for the difficulty
  const handleDifficultyChange = (e) => {
    setSelectedDifficulties({
      ...selectedDifficulties,
      [e.target.name]: e.target.checked,
    });
  };

    // Triggers when a checkbox is checked for the category
    const handleCategoryChange = (e) => {
      setSelectedCategories({
        ...selectedCategories,
        [e.target.name]: e.target.checked,
      });
    };

  // Filter courses based on search, difficulty, and selected categories
  const filteredCourses = Courses.filter((course) => {
    // Map course title to its category using subjectMapping
    const courseCategory = subjectMapping[course.title] || ""; // Default to empty string if no match
    
    const difficulty = getDifficulty(course.id);
    return (
      course.title.toLowerCase().includes(search.toLowerCase()) &&
      (selectedDifficulties[difficulty] || Object.values(selectedDifficulties).every(value => !value)) &&
      (selectedCategories[courseCategory] || Object.values(selectedCategories).every(value => !value)) // Check if course category is selected
    );
  });

  const addToCart = (course) => {
    if(!cart.find((item) => item.offering_id === course.offering_id)){
      setCart([...cart, course]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-[#1b4965] text-white flex justify-between items-center p-4 mb-8">
        <h1 className="text-3xl font-bold">Browse Courses</h1>
        <button
          onClick={() => setStep("cart")}
          className="bg-[#1b4965] text-[#fffff2] font-bold py-2 px-4 text-center rounded-md m-3 mt-4 transition-all duration-300 hover:bg-[#57a773] hover:scale-105 active:scale-95"
        >
          Go to Cart
        </button>
      </div>

      {/* <h2 className="text-3xl font-bold mb-4">Browse Courses</h2> */}

      {/* Search Courses Bar */}
      <div className="flex justify-center items-center">
        <input
          type="text"
          placeholder="Search Courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-4 max-w-7xl mx-auto w-full mb-6 border border-[#1b4965] rounded-lg shadow-[0_8px_16px_rgba(0,0,0,0.3)] bg-[#deded2] "
        />
      </div>

      {/* Difficulty and Category Filters*/}
      <div className="p-4 max-w-7xl mx-auto mb-6 overflow-hidden flex flex-col lg:flex-row gap-6">
        {/* Difficulty Checkboxes */}
        <div className="shadow-[0_8px_16px_rgba(0,0,0,0.3)] bg-[#deded2] w-full border border-[#1b4965] rounded-[8px] p-4 flex flex-col">
          <label className="block text-lg font-semibold mb-4">
            Filter by Difficulty:
          </label>
          <div className="flex flex-wrap gap-4">
            {["Beginner", "Intermediate", "Expert"].map((level) => (
              <div key={level} className="flex items-center">
                <input
                  type="checkbox"
                  name={level}
                  checked={selectedDifficulties[level]}
                  onChange={handleDifficultyChange}
                  className="mr-2"
                />
                <span>{level}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter Checkboxes */}
        <div className="shadow-[0_8px_16px_rgba(0,0,0,0.3)] bg-[#deded2] ml-auto border border-[#1b4965] rounded-[8px] p-4 flex flex-col w-full">
          <label className="block text-lg font-semibold mb-4">
            Filter by Category:
          </label>
          <div className="flex flex-wrap gap-4">
            {[
              "Software Engineering",
              "Computer Science",
              "Computer Engineering",
              "Cyber Security",
            ].map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="checkbox"
                  name={category}
                  checked={selectedCategories[category]}
                  onChange={handleCategoryChange}
                  className="mr-2"
                />
                <span>{category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Displaying all the courses */}
      <div className="flex flex-wrap gap-6 justify-center items-start items-stretch  max-w-7xl mx-auto">
        {filteredCourses.map((course) => (
          <div
            key={course.offering_id}
            //                   Card bg-color                Regular Shadow around card          Increase Shadow on hover                    Border                 Keeps picture inside card   Increase scale on hover
            className="w-[300px] bg-[#deded2] rounded-[12px] shadow-[0_8px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.35)] border border-[#1b4965] overflow-hidden flex flex-col hover:scale-[1.02]"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-auto object-contain outline outline-4 outline-[#1b4965]"
            />
            <h2 className="text-[25px] text-[#1b4965] text-center mt-3 font-bold">
              {course.title}
            </h2>
            <h3 className="text-left text-[#7a306c] text-lg font-semibold mx-3 mt-1">
              {course.instructor}
            </h3>
            <p className="text-black mx-3 mt-1 flex-grow">
              {course.description}
            </p>
            <p className="text-black mx-3 font-bold">${course.price}</p>

            <button
              onClick={() => addToCart(course)}
              className="bg-[#1b4965] text-[#fffff2] font-bold py-2 px-4 text-center rounded-md m-3 mt-4 transition-all duration-300 hover:bg-[#57a773] hover:scale-105 active:scale-95"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div>
        <div className="bg-[#1b4965] text-white flex justify-between items-center p-4">
          <p>&copy; Chloe Atwood 2025</p>
        </div>
      </div>
    </div>
  );
};

export default Browse;
