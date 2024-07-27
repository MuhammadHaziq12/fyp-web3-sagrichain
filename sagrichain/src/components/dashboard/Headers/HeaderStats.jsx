"use client";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import TrackingContract from "../../../../../hardhat-contract/artifacts/contracts/TrackingSagriChain.sol/TrackingSagriChain.json";
import http from "../../../app/(dashboards)/http.js";

// Update with your contract's address
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

import CardStats from "../Cards/CardStats.js";

export default function HeaderStats() {
  const [productCount, setProductCount] = useState(0);
  const [previousProductCount, setPreviousProductCount] = useState(0); // Simulated previous count
  const [salesCount, setSalesCount] = useState(0);
  const [previousSalesCount, setPreviousSalesCount] = useState(0); // Simulated previous count
  const [userCount, setUserCount] = useState(0);
  const [previousUserCount, setPreviousUserCount] = useState(0); // Simulated previous count

  // Function to calculate percentage change
  const calculatePercentageChange = (current, previous) => {
    if (previous === 0) return 0;
    return (((current - previous) / previous) * 100).toFixed(2);
  };

  // Function to determine arrow direction and color based on counts
  const getStatsAppearance = (count, threshold) => {
    const percentageChange = calculatePercentageChange(count, threshold);
    const isAboveThreshold = count >= threshold;
    return {
      arrow: isAboveThreshold ? "up" : "down",
      color: isAboveThreshold ? "text-emerald-500" : "text-red-500",
    };
  };

  const calculatePerformance = () => {
    const productChange = parseFloat(
      calculatePercentageChange(productCount, previousProductCount)
    );
    const salesChange = parseFloat(
      calculatePercentageChange(salesCount, previousSalesCount)
    );
    const userChange = parseFloat(
      calculatePercentageChange(userCount, previousUserCount)
    );

    // Calculate average of changes
    return ((productChange + salesChange + userChange) / 3).toFixed(2);
  };

  useEffect(() => {
    setPreviousProductCount(140); // Simulated previous value
    setPreviousSalesCount(95); // Simulated previous value
    setPreviousUserCount(180); // Simulated previous value

    const fetchProductCount = async () => {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const contract = new ethers.Contract(
          contractAddress,
          TrackingContract.abi,
          provider
        );

        try {
          const count = await contract.productCount();
          setProductCount(count.toNumber());
        } catch (error) {
          console.error("Error fetching product count:", error);
        }
      } else {
        console.log("Ethereum object not found, you should install MetaMask.");
      }
    };

    fetchProductCount();

    const fetchSalesCount = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress,
        TrackingContract.abi,
        provider
      );
      const count = await contract.salesCount();
      setSalesCount(count.toNumber());
    };

    fetchSalesCount();

    const fetchUserCount = async () => {
      try {
        const response = await http.get("/users/count");
        setUserCount(response.data.count);
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    fetchUserCount();
  }, []);

  const productStats = getStatsAppearance(productCount, 50);
  const salesStats = getStatsAppearance(salesCount, 30);
  const userStats = getStatsAppearance(userCount, 20);
  const performanceIndicator = calculatePerformance();

  return (
    <>
      {/* Header */}
      <div className="relative bg-green-200 md:pt-32 pb-36 pt-32">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="PRODUCTS"
                  statTitle={`${productCount}+`}
                  statArrow={productStats.arrow}
                  statPercent={calculatePercentageChange(
                    productCount,
                    previousProductCount
                  )}
                  statPercentColor={productStats.color}
                  statDescripiron="Since last month"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="SALES"
                  statTitle={`${salesCount}+`}
                  statArrow={salesStats.arrow}
                  statPercent={calculatePercentageChange(
                    salesCount,
                    previousSalesCount
                  )}
                  statPercentColor={salesStats.color}
                  statDescripiron="Since last week"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="USERS"
                  statTitle={`${userCount}+`}
                  statArrow={userStats.arrow}
                  statPercent={calculatePercentageChange(
                    userCount,
                    previousUserCount
                  )}
                  statPercentColor={userStats.color}
                  statDescripiron="Since yesterday"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="PERFORMANCE"
                  statTitle={`${performanceIndicator}%`}
                  statArrow={performanceIndicator >= 0 ? "up" : "down"}
                  statPercent={performanceIndicator}
                  statPercentColor={
                    performanceIndicator >= 0
                      ? "text-emerald-500"
                      : "text-red-500"
                  }
                  statDescripiron="Since last evaluation"
                  statIconName="fas fa-percent"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
