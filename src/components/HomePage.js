import React from 'react';
import {Link} from 'react-router';

const HomePage = () => {
  return (
    <div>
      <h2>Get Started by <Link to="create-board">Creating A Board</Link></h2>
    </div>
  );
};

export default HomePage;
