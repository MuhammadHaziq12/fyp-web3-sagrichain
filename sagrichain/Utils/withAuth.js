import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';

const withAuth = (Component) => {
  const Auth = (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(null); // null initially

    useEffect(() => {
      const checkMetamask = async () => {
        if (typeof window.ethereum !== 'undefined') {
          try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const currentAddress = await signer.getAddress();
            const token = localStorage.getItem(currentAddress);

            if (token) {
              const response = await fetch('http://localhost:4000/api/users/verify', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
              });
              const newResponse = await response.json();

              if (newResponse.message === 'Valid') {
                setIsAuthenticated(true);
              } else {
                throw new Error('Invalid token');
              }
            } else {
              throw new Error('No token found');
            }
          } catch (err) {
            console.error('Authentication error:', err);
            router.push('/access-denied');
          }
        } else {
          console.log("MetaMask is not installed.");
          router.push('/login');
        }
      };

      checkMetamask();
    }, [router]);

    if (isAuthenticated === null) {
      return <div>Loading authentication status...</div>; // Or render nothing or a spinner
    }

    if (!isAuthenticated) {
      return null; // or redirect, handled in useEffect
    }

    return <Component {...props} />;
  };

  return Auth;
};

export default withAuth;
