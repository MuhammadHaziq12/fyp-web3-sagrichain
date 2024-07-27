import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

const ServiceFirst = () => {
  return (
    <div className="flex flex-col p-10">
      <Card className="py-8 container mx-auto px-12 flex-col md:flex-row">
        <div className="md:w-2/5 flex justify-center items-start"> {/*Adjusted alignment*/}
          <CardHeader shadow={false} floated={false} className="m-0">
            <img
              src="/Bchain.png"
              alt="card-image"
              className="h-auto w-full object-cover"
              style={{ minHeight: "400px", maxHeight: "500px" }} // Adjust the image height
            />
          </CardHeader>
        </div>
        <CardBody className="flex flex-col justify-center mt-4 mb-8 md:w-3/5">
          <Typography
            variant="h6"
            color="gray"
            className="mb-4 uppercase text-center md:text-left"
          >
            Our Solutions
          </Typography>
          <Typography
            variant="h4"
            color="blue-gray"
            className="mb-2 text-center md:text-left"
          >
            Block Chain Technology:
          </Typography>
          <Typography
            variant="h6"
            color="gray"
            className="mb-4 uppercase text-center md:text-left"
          >
            The Future of Crop Storage
          </Typography>
          <Typography className="text-gray text-justify mb-8 font-normal">
            Our tech-enabled hermetic bags are at the forefront of our solution.
            Equipped with QR codes, these bags preserve and protect the
            agricultural produce from the moment it’s harvested, all the way to
            its final destination. Each bag is linked to a blockchain-based
            system. Upon scanning the QR code, pertinent information such as the
            content, origin, and condition of the produce is recorded on an
            unalterable digital ledger. This process ensures utmost transparency
            and traceability, giving everyone in the chain access to verified
            data about the journey of each bag of produce.
          </Typography>
          <div className="flex justify-center md:justify-start">
            <a href="#" className="inline-block">
              <Button variant="text" className="flex items-center gap-2">
                Learn More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </Button>
            </a>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ServiceFirst;