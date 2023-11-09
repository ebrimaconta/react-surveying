# React Surveying

React Surveying is a customizable polling component for React applications that allows users to create and participate in polls with various options.

## Installation

You can install the React Poll package using npm or yarn:

```bash
npm install react-surveying
```

```jsx
import React from 'react';
import { ReactSurvey } from 'react-surveying';

const question = 'What is your favorite color?';
const answers = [
  { option: 'Red', votes: 0 },
  { option: 'Blue', votes: 0 },
];

const handleVote = (selectedOption) => {
  // Handle the vote logic here
};

const customStyles = {
  // Customize the styles here
};

const disable = false; // Set to true to disable voting

const YourComponent = () => {
  return (
    <ReactSurvey
      question={question}
      answers={answers}
      onVote={handleVote}
      customStyles={customStyles}
      disable={disable}
    />
  );
};

export default YourComponent;
```
