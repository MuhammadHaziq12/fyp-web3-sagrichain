import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

const ServiceSecond = () => {
  return (
    <div className="flex flex-col p-10">
      <Card className="py-8 container mx-auto px-12 flex-col md:flex-row">
        <div className="md:w-2/5 flex justify-center items-start"> {/*Adjusted alignment*/}
          <CardHeader shadow={false} floated={false} className="m-0">
            <img
              src="/F_T.jpg"
              alt="card-image"
              style={{ width:489.600, height:490.575}}
              className="h-auto w-full object-cover"
              
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
          Farm to Table:
          </Typography>
          <Typography
            variant="h6"
            color="gray"
            className="mb-4 uppercase text-center md:text-left"
          >
            To provide end-to-end visibility into the journey of agricultural
            products
          </Typography>
          <Typography className="text-gray text-justify mb-8 font-normal">
          We are offering complete visibility into the journey of agricultural products, enabling stakeholders to trace the
            products from farms to consumers. The system ensures transparency
            and traceability at each stage of the supply chain, including
            cultivation, processing, distribution, and retail. Farmers input
            details about their products, processors verify and process them,
            wholesalers distribute to retailers, and retailers make the products
            available to consumers. Consumers can access detailed information
            about the origin and quality of the products they purchase.

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

export default ServiceSecond;