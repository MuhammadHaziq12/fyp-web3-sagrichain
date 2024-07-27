import React from "react";

const TrackTrace = () => {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto py-20">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-2">Tracebility and Transparency</h1>
            <div className="border-b-2 border-green-500 w-20"></div>
            <h2 className="text-xl font-semibold mt-4">Your Harvest’s Journey, Visible in Real-Time</h2>
            <p className="text-gray-600 leading-loose text-justify text-center">
              Scan the QR code on our hermatic storage units to access key
              information about your produce: from where it was harvested, how
              it was stored, to the journey it took to get to you. This level of
              transparency is unprecedented, empowering farmers, suppliers, and
              consumers with knowledge and fostering trust in the agriculture
              ecosystem.
            </p>
          </div>
          <div className="flex justify-center items-center rounded">
          <img
              src="/trace.jpeg"
              alt="card-image"
              className="h-100 w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackTrace;
