import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../../config";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS

const GroupCard = ({ handleFollowerClick }) => {
  const userId = localStorage.getItem("userId");
  const loggedInUserId = localStorage.getItem("userId");

  // State variables to hold form data and initial groups
  const [groupName, setGroupName] = useState("");
  const [categoryId, setCategoryId] = useState("1"); // Default value for category
  const [groups, setGroups] = useState([]);
  
  // Fetch initial groups when the component mounts
  useEffect(() => {
    fetchInitialGroups();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    const token = localStorage.getItem("jwtToken");
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      // Send form data to the backend
      const response = await axios.post(
        `${API_URL}/group/createGroup?groupName=${groupName}&categoryId=${categoryId}`,
        {},
        options
      );
      console.log('Request URL:', response.config.url); 
      console.log(response.data);

      // Optionally, reset the form after successful submission
      setGroupName("");
      setCategoryId("1"); // Reset category to default value

      // Reload groups after successful creation
      fetchInitialGroups();
      const modalElement = document.getElementById("modalCloseBtn");
      modalElement.click();
    } catch (error) {
      console.error('Error:', error);
      // Handle error if necessary
    }
  };

  const fetchInitialGroups = async () => {
    const token = localStorage.getItem("jwtToken");
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      // Fetch initial groups from the backend
      const response = await axios.get(`${API_URL}/group/getUserGroups`, options);
      console.log('Request URL:', response.config.url); 
      console.log(response.data);

      // Update state with fetched groups
      // console.log(response);
      
      const constGroups = response.data.map(item => ({
        groupId: item.groupId,
        groupName: item.groupName,
        categoryId: item.categoryId,
        groupCode: item.groupCode,
        groupOwner: item.groupOwner,
    }));
    setGroups(constGroups);
      console.log(groups);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="container">
      <h5 className="display-6">Groups</h5>
      <hr />
      
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Create new group
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">New group</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Group Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Group Name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlSelect1">Group Category</label>
                  <select
                    className="form-control"
                    id="exampleFormControlSelect1"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    required
                  >
                    <option value="1">Fitness</option>
                    <option value="2">Education</option>
                    <option value="3">Professional Goals</option>
                    <option value="4">Daily Goal</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" id = "modalCloseBtn" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      {/* <h5 className="display-6">My Groups</h5> */}
      {/* <br></br><br></br>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {groups.map((group) => (
          <div className="col" key={group.groupId}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{group.groupName}</h5>
                <p className="card-text">Category: {group.categoryId}</p>
                <p className="card-text">Code: {group.groupCode}</p>
                <p className="card-text">Owner: {group.groupOwner}</p>
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default GroupCard;
