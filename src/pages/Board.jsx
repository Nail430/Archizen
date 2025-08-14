// src/pages/dashboard/ArchitectDashboard.jsx
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Home, Calendar, Users, FileText } from "lucide-react";

const projectData = [
  { month: "Jan", projets: 4 },
  { month: "Fév", projets: 6 },
  { month: "Mar", projets: 5 },
  { month: "Avr", projets: 7 },
  { month: "Mai", projets: 3 },
];

export default function Board() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-[#2C3E50]">Tableau de bord Architecte</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="card p-6 bg-white rounded-lg shadow border border-gray-200 flex flex-col items-center">
          <Home className="text-[#A67B5B]" size={32} />
          <h2 className="text-xl font-semibold mt-4 mb-2">Projets en cours</h2>
          <p className="mb-4">5 projets actifs</p>

          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={projectData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="projets" fill="#A67B5B" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-6 bg-white rounded-lg shadow border border-gray-200">
          <Calendar className="text-[#A67B5B]" size={32} />
          <h2 className="text-xl font-semibold mt-4 mb-2">Rendez-vous</h2>
          <p>3 rendez-vous cette semaine</p>
        </div>

        <div className="card p-6 bg-white rounded-lg shadow border border-gray-200">
          <Users className="text-[#A67B5B]" size={32} />
          <h2 className="text-xl font-semibold mt-4 mb-2">Équipe</h2>
          <p>7 collaborateurs</p>
        </div>

        <div className="card p-6 bg-white rounded-lg shadow border border-gray-200">
          <FileText className="text-[#A67B5B]" size={32} />
          <h2 className="text-xl font-semibold mt-4 mb-2">Documents récents</h2>
          <p>12 fichiers</p>
        </div>
      </div>
    </div>
  );
}
