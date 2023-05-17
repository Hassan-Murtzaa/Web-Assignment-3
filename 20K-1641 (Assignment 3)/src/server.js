const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const UserProfiling = require('./schema/User');

// for Adding with User

const createwithUser = require('./schema/CreateBlogWithUser');

const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connect to DB
const dbURL = 'mongodb+srv://hassan:hassan123@cluster0.nmngsy8.mongodb.net/HassanAssignment3?retryWrites=true&w=majority';

mongoose.connect(dbURL)
  .then(() => app.listen(3000, () => {
    console.log("Server is running on port 3000");
  }))
  .catch((err) => console.log(err));

// define a route to handle the post request to handle SignUp
app.post('/submitSignUp', (req, res) => {
  const { username, email, password } = req.body;

  // create a new instance of the model with the received data
  const myData = new UserProfiling({ username, email, password });

  // save the data to MongoDB
  myData.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => console.log(err))
});

// define a route to handle the post request to handle Login
app.post('/submitLogin', (req, res) => {
  const { email, password } = req.body;

  UserProfiling.findOne({ email, password })
    .then((user) => {
      if (user) {
        console.log('User found');
        res.sendStatus(200);
      } else {
        console.log('User not found');
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// Route for updating the user's password
app.post('/updatePassword', (req, res) => {
  // Extract the email and new password from the request body
  const { email, newPassword } = req.body;

  // Assuming you have a MongoDB connection setup, you can use your MongoDB driver or an ORM like Mongoose to update the password
  UserProfiling.findOneAndUpdate(
    { email }, // Use the email as the unique identifier to find the user
    { $set: { password: newPassword } }, // Set the new password
    { new: true } // Return the updated user object
  )
    .then(updatedUser => {
      // Send a response indicating the successful password update
      res.status(200).json({ message: 'Password updated successfully', user: updatedUser });
    })
    .catch(error => {
      // Send a response indicating the error occurred during the password update
      res.status(500).json({ error: 'Error updating password', message: error.message });
    });
});


// Storage configuration for multer
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// File upload middleware using multer
const upload = multer({ storage });

app.use(express.json());

// Create a new blog post
app.post('/blog', upload.single('image'), async (req, res) => {
  try {
    // Extract form data
    const { title, content } = req.body;

    // Access the uploaded file via req.file
    const image = req.file.filename;

    // Create a new blog post instance
    const blog = new createBlog({
      title,
      content,
      image
    });

    console.log('Title:', title);
    console.log('Content:', content);
    console.log('Image:', image);


    // Save the blog post to the database
    await blog.save();

    const responseData = "Succesfully Submitted";
    res.send(responseData);

  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

//-----------------------------------------------------------------------------------------------

// Create a new blog post
app.post('/bloguser', upload.single('image'), async (req, res) => {
  try {
    // Extract form data
    const { user, title, content } = req.body;

    // Access the uploaded file via req.file
    const image = req.file.filename;

    // Create a new blog post instance
    const blog = new createwithUser({
      user,
      title,
      content,
      image
    });

    console.log('User:', user);
    console.log('Title:', title);
    console.log('Content:', content);
    console.log('Image:', image);


    // Save the blog post to the database
    await blog.save();

    const responseData = "Succesfully Submitted";
    res.send(responseData);

  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

app.use('/uploads', express.static('uploads'));

app.get('/read', async (req, res) => {
  try {
    const blogs = await createwithUser.find({});
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

// Update a blog post by title
app.put('/blog/:title', upload.single('image'), async (req, res) => {
  try {
    const { title } = req.params;
    const { content } = req.body;
    let image = '';

    // Check if a new image is uploaded
    if (req.file) {
      image = req.file.filename;
    }

    const updatedData = {
      content,
      image
    };

    // Update the blog post based on title
    const updatedBlog = await createwithUser.findOneAndUpdate({ title }, updatedData, { new: true });

    console.log("Update Sucessfully");

    res.status(200).json({ message: 'Blog post updated successfully', blog: updatedBlog });
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

// Delete a blog post by title
app.delete('/blog/:title', async (req, res) => {
  try {
    const { title } = req.params;

    // Delete the blog post based on title
    await createwithUser.findOneAndDelete({ title });

    console.log("Blog is successfully Deleted");

  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});


//------------------for specific Users---------------


// Create an API endpoint to search for users by email
app.get('/alluser/:email', async (req, res) => {
  const { email } = req.params;

  try {
    // Search for users with matching email
    const users = await createwithUser.find({ user: email });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while searching for users.' });
  }
});


//---------------------------------For Comments-------------------------------

app.get('/blog/:title', async (req, res) => {
  const { title } = req.params;

  try {
    const blog = await createwithUser.findOne({ title });
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(blog);
  } catch (error) {
    console.error('Error fetching the blog post:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

app.post('/comment/:blogId', async (req, res) => {
  try {
    const { blogId } = req.params;
    const { comment } = req.body;

    const blog = await createwithUser.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    blog.comments = blog.comments || [];
    blog.comments.push(comment);
    await blog.save();

    res.status(200).json({ message: 'Comment added successfully', blog });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});