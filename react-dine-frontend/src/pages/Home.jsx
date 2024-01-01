import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Importing CSS for styling

function Home() {
  // useRef hook to reference the video element
  const videoRef = useRef();
  // useState hooks for controlling fade to black and displaying content
  const [fadeToBlack, setFadeToBlack] = useState(false);
  const [showContent, setShowContent] = useState(false);
  // useNavigate hook from react-router-dom for navigation
  const navigate = useNavigate();

  // Constants for controlling the timing of fade and content display
  const fadeDuration = 2; // Duration of the fade effect in seconds
  const fadeOutStartTime = 6; // Start time for fade out effect in seconds

  useEffect(() => {
    // Accessing the video element
    const video = videoRef.current;
    let fadeOutTimeout;

    // Event listener function for time updates in video
    const onTimeUpdate = () => {
      const currentTime = video.currentTime;
      // Check if it's time to start fading to black
      if (currentTime >= fadeOutStartTime && !fadeToBlack) {
        setFadeToBlack(true);
        // Reset the fade effect after the duration
        fadeOutTimeout = setTimeout(() => {
          setFadeToBlack(false);
        }, fadeDuration * 1000);
      }
    };

    // Adding event listener to the video element
    video.addEventListener('timeupdate', onTimeUpdate);

    // Timeout to display content after the video has played for a while
    const contentTimeout = setTimeout(() => {
      setShowContent(true);
    }, 6000); // Time after which the content is shown

    // Cleanup function to remove event listeners and clear timeouts
    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      clearTimeout(fadeOutTimeout);
      clearTimeout(contentTimeout);
    };
  }, [fadeToBlack]);

  // Function to handle menu button click
  const handleMenuButtonClick = () => {
    navigate('/menu'); // Navigate to menu page
  };

  return (
    <div className='background'>
      <div className="video-container">
        {/* Video element */}
        <video autoPlay loop muted playsInline ref={videoRef} className='background-video'>
          <source src="foodVideo.mp4" type="video/mp4" />
          {/* Fallback text if the browser doesn't support the video tag */}
          Your browser does not support the video tag.
        </video>
        {/* Overlay div for fade effect */}
        <div className={`video-overlay ${fadeToBlack ? 'fade-to-black' : ''}`}></div>
      </div>

      {/* Conditional rendering for welcome text and menu button */}
      {showContent && (
        <div className='center-content show'>
          <h1>Welcome to reactDine</h1>
          <button onClick={handleMenuButtonClick}>Check out our menu</button>
        </div>
      )}
    </div>
  );
}

export default Home;
