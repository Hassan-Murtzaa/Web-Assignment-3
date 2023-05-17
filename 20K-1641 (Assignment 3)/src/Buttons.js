import React, { useState } from 'react';
import ReadComponent from './ReadUser';
import AddComponent from './Blog';
import UpdateComponent from './UpdateBlog';
import DeleteComponent from './Delete';
import ReadBlog from './ReadBlog'
import Comments from './Comments';
import './Styles.css'
export default function Buttons(props) {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'add':
        return <AddComponent email={props.email} />;
      case 'read':
        return <ReadComponent email={props.email} />;
      case 'update':
        return <UpdateComponent />;
      case 'delete':
        return <DeleteComponent />;
      case 'ReadAll':
        return <ReadBlog />;
      case 'AddComments':
        return <Comments email={props.email} />;
      default:
        return null;
    }
  };

  return (
    <div className='Hassan'>
      <button onClick={() => handleButtonClick('add')}>Add</button>
      <button onClick={() => handleButtonClick('read')}>Read</button>
      <button onClick={() => handleButtonClick('update')}>Update</button>
      <button onClick={() => handleButtonClick('delete')}>Delete</button>
      <button onClick={() => handleButtonClick('ReadAll')}>Read All posts</button>
      <button onClick={() => handleButtonClick('AddComments')}>Comment</button>
      {renderComponent()}
    </div>
  );
}
