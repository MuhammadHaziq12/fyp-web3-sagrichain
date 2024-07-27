// components/Footer.js
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between">
        <div className="mb-4 lg:mb-0">
          <h3 className="text-white text-lg font-bold mb-2">Categories</h3>
          <ul>
            <li>
              <Link className="hover:text-gray-200" href="/category1">
                Category 1
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-200" href="/category2">
                Category 2
              </Link>
            </li>
            {/* Add more categories as needed */}
          </ul>
        </div>
        <div className="mb-4 lg:mb-0">
          <h3 className="text-white text-lg font-bold mb-2">Stores</h3>
          <ul>
            <li>
              <Link className="hover:text-gray-200" href="/category1">
                All Stores 
              </Link>
            </li>
            
            {/* Add more categories as needed */}
          </ul>
        </div>
        <div className="mb-4 lg:mb-0">
          <h3 className="text-white text-lg font-bold mb-2">Help</h3>
          <ul>
            <li>
              <Link className="hover:text-gray-200" href="/help">
                Help Center
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-200" href="/contact">
                Contact Us
              </Link>
            </li>
            {/* Add more help links as needed */}
          </ul>
        </div>
        <div>
          <h3 className="text-white text-lg font-bold mb-2">Follow Us</h3>
          <ul>
            <li>
            <Link className="hover:text-gray-200" href="#" >Facebook</Link>
            </li>
            <li>
            <Link className="hover:text-gray-200" href="#" >Twitter</Link>
            </li>
            {/* Add more social media links as needed */}
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p>&copy; {new Date().getFullYear()} Instacart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
