import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Homepage from './Homepage';
import Blog from './Blog'
import ReadBlog from './ReadBlog'
import UpdateBlog from './UpdateBlog'

import DeleteBlog from './Delete';
import { Route, BrowserRouter, Routes } from "react-router-dom";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

<BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/ReadBlog" element={<ReadBlog />} />
          </Route>
         
        </Routes>
      </BrowserRouter>

    {/* <App /> */}

    {/* <Blog/> */}                   

     {/* <ReadBlog/> */}

    {/* <UpdateBlog/> */}

    {/* <DeleteBlog/> */}
  </React.StrictMode>
);