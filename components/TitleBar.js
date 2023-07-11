import React from 'react';

const TitleBar = () => {
  const linkedinURL = "https://www.linkedin.com/in/shashank-tiwari-128334192/";
  const githubURL = "https://github.com/shashank40";

  return (
    <div className="title-bar bg-gray-100 py-3 px-6 flex justify-between items-center">
      <h1 className="text-lg font-semibold text-gray-800">Shashank Tiwari</h1>
      <div className="social-links">
        <a href={linkedinURL} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-blue-600 mx-2">
          <i className="fab fa-linkedin"></i>
        </a>
        <br/>
        <a href={githubURL} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-black mx-2">
          <i className="fab fa-github"></i>
        </a>
      </div>
    </div>
  );
};

export default TitleBar;
