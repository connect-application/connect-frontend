
import React from 'react';

export const HeadUserLog = () => (
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sign In</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
    <style>
      {`
        body {
            font-family: 'Roboto', sans-serif;
            overflow: hidden; /* Prevent scrolling */
        }
        .no-margin {
            margin: 0 !important; /* Remove margins */
        }
        .move-up {
            margin-top: -100px; /* Move up by 30px */
        }
        .title {
            color: #009999; /* New color */
            font-weight: bold; /* Bold text */
            font-size: 4em; /* Larger font size */
        }
        .btn-primary, .btn-show {
            background-color: #009999; /* New color */
            border-color: #009999; /* New color */
            color: #fff; /* White text */
        }
        .error-message {
          color: red;
          height: 20px;
        }
        a {
            color: #009999; /* New color */
        }
        .custom-container {
          height: 80vh; /* adjust this value to move the form up or down */
      }
        
      `}
    </style>
  </head>
);

export default HeadUserLog;