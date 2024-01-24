/*

  This component is used to display a cookie message to the user. It will only display if the user has not seen the message before. The cookie will expire in 7 days.

  How to use:

  <CookieMessage />


*/

"use client";

import React, { useState, useEffect } from "react";

// Utility functions for cookies
const setCookie = (name, value, daysToLive) => {
  // Encode value in order to escape semicolons, commas, and whitespace
  const valueToSet = encodeURIComponent(value);

  let cookie = name + "=" + valueToSet;

  if (daysToLive) {
    // Set the max-age attribute to number of seconds
    cookie += "; max-age=" + daysToLive * 24 * 60 * 60;
    cookie += "; path=/"; // Set path to root for wide availability within the app
  }

  document.cookie = cookie;
};

const getCookie = (name) => {
  const cookieArr = document.cookie.split(";");

  for (let i = 0; i < cookieArr.length; i++) {
    const cookiePair = cookieArr[i].split("=");
    if (name === cookiePair[0].trim()) {
      // Decode the cookie value and return
      return decodeURIComponent(cookiePair[1]);
    }
  }

  // Return null if not found
  return null;
};

const CookieMessage = () => {
  const [hasSeenMessage, setHasSeenMessage] = useState(true);

  useEffect(() => {
    // Check if the cookie exists
    const seenMessage = getCookie("hasSeenMessage");

    if (seenMessage) {
      setHasSeenMessage(true);
    }
    if (!seenMessage) {
      setHasSeenMessage(false);
    }
  }, []);

  const handleDismiss = () => {
    // Set the cookie to indicate the message has been seen
    setCookie("hasSeenMessage", "true", 7); // Expires in 7 days
    setHasSeenMessage(true);
  };

  return (
    <>
      {!hasSeenMessage && (
        <div className=" bg-black fixed bottom-0 inset-x-0 flex justify-center border-solid border-2 border-white p-4">
          <div className="text-center">
            <p>
              We use cookies to improve your experience. By using our site, you
              agree to our use of cookies.
            </p>

            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleDismiss}
            >
              Accept our use of cookies 🍪
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieMessage;
