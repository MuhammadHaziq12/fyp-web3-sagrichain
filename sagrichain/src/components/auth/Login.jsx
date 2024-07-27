"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import http from "../../app/(dashboards)/http.js";
import { Signer, ethers } from "ethers";


const schema = z.object({
  role: z.string().nonempty("Role is required"),
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});

export default function Login() {
  const [token, setToken] = useState('');
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);

  useEffect(() => {
    setIsMetamaskInstalled(!!window.ethereum);
  });

  async function handleMetamaskLogin() {
    try {
      if (!isMetamaskInstalled) {
        throw new Error('Metamask is not installed');
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log("Metamask Connected : " + address);

      const responce = await fetch('http://localhost:4000/api/users/nonce', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ address })
      });

      if (!responce.ok) {
        const error = await responce.json();
        console.log(error);
      }

      const resp = await responce.json();
      const nonce = resp.message;

      const signedMessage = await signer.signMessage(nonce);
      // const data = (signedMessage, nonce, address);
      const loginResponse = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ signedMessage, nonce, address })
      });
      
      if (!loginResponse.ok) {
        throw new Error('Failed to authenticate');
      }

      const data = await loginResponse.json();
      const { token } = data;
      const user = data.user;
      console.log('Token:', token);
      console.log('User data:', user);
      console.log('Token:', token);
      document.cookie = `role=${user.role}; path=/; max-age=3600; secure; sameSite=Strict`;

      document.cookie = `token=${token}; path=/; max-age=3600; secure; sameSite=Strict`;
      document.cookie = `address=${address}; path=/; max-age=3600; secure; sameSite=Strict`;

      localStorage.setItem(address,token);
      // document.cookie = token=${token}; path=/; max-age=3600; // Expires in 1 hour

      sessionStorage.setItem('userData', JSON.stringify(user));

      // localStorage.setItem('userData', JSON.stringify(usedd));

      switch (user.role) {
        case 'farmer':
          router.push('/farmer');
          break;
        case 'processor':
          router.push('/processor');
          break;
        case 'distributor':
          router.push('/distributor');
          break;
        case 'wholesaler':
          router.push('/wholesaler');
          break;
        case 'retailer':
          router.push('/retailer');
          break;
        case 'admin':
          router.push('/admin');
          break;
        case 'consumer':
          router.push('/market');
          break;
        default:
          console.log('Role not recognized');
      }

      setToken(token);

    } catch (error) {
      console.error('Login error:', error);
      alert('Failed to login with MetaMask');
    }
  }


  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),

  });

  const submitHandler = async (values) => {
    try {
      const response = await http.post("/users/login", values);
      if (response.status === 200) {
        const userData = response.data.user; // Assuming the response contains a 'user' object
        console.log("User data:", userData); // Log the user data

        // Store user data in session or state management
        // Example with sessionStorage:
        sessionStorage.setItem('userData', JSON.stringify(userData));

        const { role } = values;
        if (role === "farmer") {
          router.push("/farmer");
        } else if (role === "processor") {
          router.push("/processor");
        } else if (role === "distributor") {
          router.push("/distributor");
        } else if (role === "wholesaler") {
          router.push("/wholesaler");
        } else if (role === "retailer") {
          router.push("/retailer");
        } else if (role === "admin") {
          router.push("/admin");
        } else if (role === "consumer") {
          router.push("/market");
        }
        else {
          console.log("Role not selected or not farmer");
        }
      } else {
        setErrorMessage("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      console.log("Error details:", error.response, error.request, error.message);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };


  return (
    <div className="bg-green-200 relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <center>
          <img
            src={"/1.png"}
            className="h-[60px] w-[150px] items-center"
            alt="SagriChain Logo"
          />
        </center>



        <div className="mt-2">
          <button
            onClick={handleMetamaskLogin}
            type="submit"
            className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Login with Metamask
          </button>
        </div>
        {errorMessage && (
          <div className="text-red-500 mt-2">{errorMessage}</div>
        )}

        <div className="relative flex items-center justify-center w-full mt-6 border border-t">
          <div className="absolute px-5 bg-white">Or</div>
        </div>
        <div className="flex mt-4 gap-x-2">
          {/* Social login buttons */}
        </div>

        <p className="mt-4 text-sm text-center text-gray-700">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}