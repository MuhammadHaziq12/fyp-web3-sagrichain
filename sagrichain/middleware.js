export { default } from "next-auth/middleware";

export default function middleware(){
  console.log("i am from middleware")
}

export const config = {
  matcher: ["/dasboard","/dashboard/farmer", "/dashboard/farmer/addproduct", "/dashboard/farmer/addcategory"]
};
