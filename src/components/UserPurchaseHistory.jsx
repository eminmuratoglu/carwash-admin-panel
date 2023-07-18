const UserPurchaseHistory = ({ purchaseHistory }) => {
  return (
    <div>
      {purchaseHistory.map((history, i) => {
        return (
          <div key={`${i}${history.plate}`}>
            <div className="modalContent">
              <div>Plan: </div> <div>{history.plan}</div>
              <div>Start Date: </div>
              <div>{history.start_date}</div>
              <div>End Date: </div>
              <div>{history.end_date}</div>
              <div>Plate: </div> <div>{history.car_plate}</div>
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default UserPurchaseHistory;
