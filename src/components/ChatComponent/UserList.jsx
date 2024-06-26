import React from 'react';
import FollowerItem from './FollowerItem';

const ListStyle = {
  backgroundColor: '#f8f9fa',
  border: '1px solid #e3e3e3',
  overflowY: 'auto',
  maxHeight: 'calc(100vh - 60px)', // Maximum height of the list container
  fontSize: '0.9rem',
  color: '#606770',
  fontFamily: "'Roboto', sans-serif",
};

const ChatWindowStyle = {
  position: 'absolute',
  right: 0,
  top: 0,
  width: '100%', // Adjust width as needed
  height: '100%', // Take full height of the parent
  backgroundColor: '#fff',
  borderLeft: '1px solid #e3e3e3',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
};

const UserList = ({ users, headerText, handleFollowerClick }) => {
  return (
    <div className="col-lg-7 mb-4" style={{ position: 'relative' }}><br></br>
      <h5 class = "display-6" style={{ color: "#009999"}}>
        {headerText}
      </h5><hr></hr>
      <div >
        {users.length === 0 ? (
          <div style={{ textAlign: 'center' }}>
            <p>Follow others to start chatting with them</p>
          </div>
        ) : (
          users.map((user, index) => (
            <div class="btn-group-vertical">
            <FollowerItem
              key={index}
              follower={user}
              handleFollowerClick={handleFollowerClick}
            />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserList;