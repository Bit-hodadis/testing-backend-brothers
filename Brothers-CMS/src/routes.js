import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import RTLDefault from "views/rtl/default";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  FaHome,
  FaTags,
  FaUsers,
  FaProjectDiagram,
  FaNewspaper,
  FaCommentDots,
  FaBox,
  FaConciergeBell,
  FaUser,
} from "react-icons/fa";

import Forget from "views/auth/Forget";
import VerifyToken from "views/auth/VerifyToken";

import VerifyEmail from "views/auth/VerifyEmail";
import Signup from "views/auth/SignUp";
import News from "views/admin/News";
import NewsCategory from "views/admin/categories/News";
import Category from "views/admin/categories";
import Services from "views/admin/Services";
import Products from "views/admin/products";
import Stackholder from "views/admin/stakholders";
import Users from "views/admin/users";
import Testimonial from "views/admin/testimonial";
import FormComponent from "views/admin/profile";
import SetupAccount from "views/auth/setupAccount";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "default",
    icon: <FaHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <FaUser className="h-6 w-6" />,
    component: <FormComponent />,
  },
  {
    name: "Services",
    layout: "/admin",
    path: "service",
    icon: <FaConciergeBell className="h-6 w-6" />,
    component: <Services></Services>,
    secondary: true,
  },
  {
    name: "Products",
    layout: "/admin",
    icon: <FaBox className="h-6 w-6" />,
    path: "products",
    component: <Products />,
  },
  {
    name: "News",
    layout: "/admin",
    path: "news",
    icon: <FaNewspaper className="h-6 w-6" />,
    component: <News />,
  },
  {
    name: "Testimonials",
    layout: "/admin",
    path: "testimonial",
    icon: <FaCommentDots className="h-6 w-6" />,
    component: <Testimonial />,
  },
  {
    name: "Stackholders",
    layout: "/admin",
    path: "stackholders",
    icon: <FaUsers className="h-6 w-6" />,
    component: <Stackholder />,
  },
  {
    name: "Users",
    layout: "/admin",
    path: "users",
    icon: <FaUsers className="h-6 w-6" />,
    component: <Users />,
  },
  {
    layout: "/auth",
    path: "sign-in",
    component: <SignIn />,
  },
  {
    layout: "/auth",
    path: "forget",

    component: <Forget />,
  },
  {
    layout: "/auth",
    path: "verifyToken",

    component: <VerifyToken />,
  },
  {
    layout: "/auth",
    path: "verifyToken",

    component: <VerifyToken />,
  },
  {
    layout: "/auth",
    path: "verifyEmailEmployee",

    component: <SetupAccount />,
  },
  {
    layout: "/auth",
    path: "verifyEmail",

    component: <VerifyEmail />,
  },
  {
    layout: "/auth",
    path: "signup",

    component: <Signup />,
  },
  {
    name: "Catagories",
    layout: "/admin",
    path: "category",
    icon: <FaTags className="h-6 w-6" />,
    component: <Category />,
  },
];
export default routes;
