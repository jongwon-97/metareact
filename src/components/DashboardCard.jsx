import React from "react";

function DashboardCards() {
  const cards = [
    { title: "회원수", color: "bg-primary" },
    { title: "게시판", color: "bg-warning" },
    { title: "신청중인 문의", color: "bg-success" },
    { title: "상담 문의", color: "bg-danger" },
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
