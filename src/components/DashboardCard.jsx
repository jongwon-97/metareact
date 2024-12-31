import React from "react";

function DashboardCards() {
  const cards = [
    { title: "Primary Card", color: "bg-primary" },
    { title: "Warning Card", color: "bg-warning" },
    { title: "Success Card", color: "bg-success" },
    { title: "Danger Card", color: "bg-danger" },
  ];

  return (
    <div className="row">
      {cards.map((card, index) => (
        <div className="col-xl-3 col-md-6" key={index}>
          <div className={`card ${card.color} text-white mb-4`}>
            <div className="card-body">{card.title}</div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <a className="text-white" href="#">
                View Details
              </a>
              <i className="fas fa-angle-right"></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;
