"use client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import http from "../../http.js";

const schema = z.object({
    carouselName: z.string().nonempty("Carousel Name is required"),
});

export default function Settings() {
  // const navigate = useNavigate();
  const router = useRouter();
  const [carouselOptions, setCarouselOptions] = useState([]);
  const [image, setImage] = useState(null); // New state for image file
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    // Retrieve user data from session storage or state management
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await http.get("/category");
//       setCategoryOptions(response.data);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

  // const submitForm = async (data) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("categoryName", data.categoryName);
  //     formData.append("userID", userData._id);
  //     formData.append("image", image);

  //     // Perform the HTTP POST request with the form data
  //     const response = await http.post("/products", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     // Handle the response
  //     console.log("Product added successfully:", response.data);
  //     // Redirect or perform any other action after successful submission
  //     router.push(`/${userData.role}/listproduct`);
  //   } catch (error) {
  //     // Handle errors
  //     console.error("Error adding product:", error);
  //   }
  // };

  // client-side code
const submitForm = async (data) => {
    try{
         // Set the userID in the data object
    data.userID = userData._id; // Assuming userData contains the user's ID
    const formData = new FormData();
    formData.append("carouselName", data.carouselName);
    //formData.append("userID", userData._id);
    formData.append("image", image); 

    // // Perform the HTTP POST request with the form data
    // const response = await http.post("/products", formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });

      // Perform the HTTP POST request with the form data
      const response = await http.post("/carousel", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle the response
      console.log("Categoey added successfully:", response.data);
      // Redirect or perform any other action after successful submission
      router.push(`/${userData.role}/listcarousel`);
    } catch (error) {
      // Handle errors
      console.error("Error adding category:", error);
    }
  };
  const [userData, setUserData] = useState(null);
  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set the image file in the state
  };

  return (
    <>
      <div className="px-4 md:px-10 flex flex-wrap">
        <div className="mt-20 w-full lg:w-24/12 px-6">
          <h1 className="mt-20 mb-10 font-semibold text-lg text-blueGray-700">
            ADD NEW CAROUSEL
          </h1>
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">
                  CAROUSEL DETAIL
                </h6>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form onSubmit={handleSubmit(submitForm)}>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/24 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="mt-4 block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="carouselName"
                      >
                        Carousel Name
                      </label>
                      <input
                        type="text"
                        name="carouselName"
                        id="carouselName"
                        {...register("carouselName")}
                        className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                          errors.CarouselName ? "border-red-500" : ""
                        }`}
                        placeholder="Enter carousel name"
                      />
                      {errors.carouselName && (
                        <span className="text-red-500">
                          {errors.carouselName.message}
                        </span>
                      )}
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="image"
                      >
                        Carousel Image
                      </label>
                      <input
                        type="file"
                        name="image"
                        id="image"
                        onChange={handleImageChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                      {errors.image && (
                        <span className="text-red-500">
                          {errors.image.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-center flex justify-between">
                  <button
                    type="submit"
                    className="bg-green-600  active:bg-green-500  text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  >
                    Add Carousel
                  </button>
                </div>
              </form>
              {/* {errors.categoryName && (
                <div className="text-red-500 mt-2">
                  {errors.categoryName.message}
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
