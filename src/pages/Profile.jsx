import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formaData, setFormData] = useState({
    name: "auth.currentUser.displayName",
    email: "auth.currentUser.email",
  });
  const { name, email } = formaData;
  function onLogout() {
    auth.signOut();
    navigate("/");
  }

  return (
    <>
      <section
        className="max-w-6xl mx-auto flex  justify-center
      items-center flex-col"
      >
        <h1 className="text-3xl text-center font-bold mt-6 ">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            {/*Name Input*/}
            <input
              className="w-full px-4 py-2 text-xl 
            text-gray-700 bg-white border border-gray-300 rounded
            transition ease-in-out mb-6"
              type="text"
              id="name"
              value={name}
            />

            {/*Email Input*/}
            <input
              className="w-full px-4 py-2 text-xl 
            text-gray-700 bg-white border border-gray-300 rounded
            transition ease-in-out mb-6"
              type="email"
              id="email"
              value={email}
            />
          </form>
          <div
            className="flex justify-between whitespace-nowrap 
          text-sm sm-text-large"
          >
            <p className="flex item-center">
              Do you want to change your name?
              <span
                className="text-red-600 hover:text-red-700
              transition ease-in-out duration-200 ml-1
              cursor-pointer"
              >
                Edit?
              </span>
            </p>
            <p
              onClick={onLogout}
              className="text-blue-600 hover:text-blue-800
              transition ease-in-out cursor-pointer"
            >
              Sign out
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
