import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../../config";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import GroupList from "./GroupList";
import { Link } from "react-router-dom";

const GroupCard = ({ handleFollowerClick }) => {
  const userId = localStorage.getItem("userId");
  const loggedInUserId = localStorage.getItem("userId");

  const [groupName, setGroupName] = useState("");
  const [categoryId, setCategoryId] = useState("1");
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetchInitialGroups();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("jwtToken");
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(
        `${API_URL}/group/createGroup?groupName=${groupName}&categoryId=${categoryId}`,
        {},
        options
      );
      setGroupName("");
      setCategoryId("1");

      fetchInitialGroups();
      const modalElement = document.getElementById("modalCloseBtn");
      modalElement.click();
    } catch (error) {
      console.error('Error:', error);
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
      const response = await axios.get(`${API_URL}/group/getUserGroups`, options);
      console.log('Request URL:', response.config.url);
      console.log(response.data);


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
    <div className="container" style={{ height: "100vh", overflowY: "auto" }}>
      <h5 className="display-6"  style={{color:"#009999" }}>Groups</h5>
      <hr />

      <button type="button"  style={{backgroundColor:"#009999" }} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Create new group
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">New group</h5>
              <button type="button" id="modalCloseBtn" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
          </div>
        </div>
      </div>

      <br></br><br></br>
      {groups.map((group) => (
        <Link style={{color:"#009999" }} key={group.groupId} to={`/groups/${group.groupId}`}>
      <GroupList key={group.groupId} group={group} />
      </Link>))}
    </div>
  );
};

export default GroupCard;
