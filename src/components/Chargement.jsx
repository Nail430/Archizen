import React from "react";

function Chargement() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-700 text-white">
      <div className="text-center">
        <div className="animate-ping rounded-b-full h-16 w-16 border-b-4 border-white mx-auto"></div>
        <p className="mt-4 text-lg">Chargement...</p>
      </div>
    </div>
  );
}export default Chargement
