import React from "react";
import { Heart, User, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const navigate = useNavigate();
  const cardContent = [
    {
      name: "patient",
      role: "I'm a Patient",
      icon: <User className="text-[#1d4ed8] w-10 h-10" />,
      text: "#1d4ed8",
      iconbgColor: "#bfdbfe",
      duty: "Track your medication schedule and maintain your health records",
      pointers: [
        "Mark medications as taken",
        "Upload proof photos (optional)",
        "View your medication calendar",
        "Large, easy-to-use interface",
      ],
      button: "Continue as Patient",
    },
    {
      name: "caretaket",
      role: "I'm a Caretaker",
      icon: <Users className="text-[#15803d] w-10 h-10" />,
      text: "#15803d",
      iconbgColor: "#bbf7d0",
      duty: "Monitor and support your loved one's medication adherence",
      pointers: [
        "Monitor medication compliance",
        "Set up notification preferences",
        "View detailed reports",
        "Receive email alerts",
      ],
      button: "Continue as Caretaker",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col items-center justify-center p-10">
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Heart className="text-white w-10 h-10" />
        </div>

        <h3 className="text-4xl font-bold mb-4">
          Welcome to MediCare Companion
        </h3>
        <p className="text-[#64748b] text-xl max-w-2xl mx-auto">
          Your trusted partner in medication management. Choose your role to get
          started with personalized features.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 px-4">
        {cardContent.map((card, index) => (
          <div
            key={index}
            className="bg-white group hover:shadow-xl transition-all duration-300 border-3 hover:border-blue-200 cursor-pointer w-full max-w-sm flex flex-col border-[#e1e6ed] rounded-md p-6"
            style={{ "--marker-color": card.text }}
          >
            <div className="flex flex-col items-center gap-5">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                style={{ backgroundColor: card.iconbgColor }}
              >
                {card.icon}
              </div>
              <h3 className="text-2xl font-medium" style={{ color: card.text }}>
                {card.role}
              </h3>
              <h5 className="text-[#64748b] text-center">{card.duty}</h5>
            </div>

            <ul className="list-disc pl-5 mt-4  custom-bullets">
              {card.pointers.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
            <button
              onClick={() => {
                localStorage.setItem("user", card.name);
                navigate("/progress");
              }}
              className=" cursor-pointer mt-5 w-full text-white h-10 text-lg font-medium rounded-md"
              style={{ backgroundColor: card.text }}
            >
              {card.button}
            </button>
          </div>
        ))}
      </div>

      <style>{`
        .custom-bullets li::marker {
          color: var(--marker-color);
           font-size: 1.25rem;
        }
      `}</style>
    </div>
  );
}

export default Dashboard;
