const GroupList = ({ group }) => {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4" >
      <div className="col" key={group.groupId}>
        <div className="card border-info mb-3" style={{ MaxWidth: "18rem" }}>
          <div className="card-body" style={{ padding: 0 }}>
            <div className="card-header">Category: {group.categoryId}</div>
            <div className="card-body text-dark">
              <h5 className="card-title">{group.groupName}</h5>
              <p className="card-text">Owner: {group.groupOwner}</p>
              <p className="card-text">Code: {group.groupCode}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupList;
