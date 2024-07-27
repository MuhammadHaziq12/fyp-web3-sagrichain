import React from "react";
import PropTypes from "prop-types";


export const metadata = {
  title: "Processor Dashboard: SagriChain",
};


export default function CardTable({ color }) {
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
              <img src="./SCM-FYP.jpeg"></img>
          </div>
      </div>
      </div>
    </>
  );
}

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
