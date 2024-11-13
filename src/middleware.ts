// // middleware.ts
// import { withAuth } from "next-auth/middleware";

// export default withAuth({
//     pages: {
//         signIn: "/",
//     },
//     callbacks: {
//         authorized: ({ token }) => !!token, // Only allow access if there's a valid token

//     },
// });
export default (props) => {
    console.log('middleware called');
}

// export const config = {
//     matcher: ["/user/:path*", "/hr/:path*"], // Protect these routes
// };
