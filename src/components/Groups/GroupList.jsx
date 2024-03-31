
  
const GroupList = ({ groups}) => {
  

  return (
    
    // <br></br><br></br>
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {groups.map((group) => (
        <div className="col" key={group.groupId}>
          <div className="card border-info mb-3" style={{MaxWidth: "18rem"}}>
            <div className="card-body" style={{padding: 0}}>
            <div class="card-header">Category: {group.categoryId}</div>
            <div class="card-body text-dark">
              <h5 class="card-title">{group.groupName}</h5>
              <p class="card-text">Owner: {group.groupOwner}</p>
              <p class="card-text">Code: {group.groupCode}</p>
            </div>
            </div>
          </div>
        </div>
      ))}
    </div>
   
  );
};

export default GroupList;