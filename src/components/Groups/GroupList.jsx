
  
const GroupList = ({ groups}) => {
  

  return (
    
    // <br></br><br></br>
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
    </div>
   
  );
};

export default GroupList;