import { getAuth, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { FcHome } from "react-icons/fc";
import { Link } from "react-router-dom";

export default function Profile() {
  const auth = getAuth();
  const [changeDetail, setChangeDetail] = useState(false);
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

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        //update display name in firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // update name in the firestore

        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success("Profile details updated");
    } catch (error) {
      toast.error("Could not update the profile details");
    }
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
              type="text"
              id="name"
              value={name}
              disabled={!changeDetail}
              onChange={onChange}
              className={`w-full px-4 py-2 text-xl 
            text-gray-700 bg-white border border-gray-300 rounded
            transition ease-in-out mb-6 ${
              changeDetail && "bg-red-200 focus:bg-red-200"
            }`}
            />

            {/*Email Input*/}
            <input
              type="email"
              id="email"
              value={email}
              disabled
              className="w-full px-4 py-2 text-xl 
            text-gray-700 bg-white border border-gray-300 rounded
            transition ease-in-out mb-6"
            />
          </form>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white uppercase 
            px-7 py-3 text-sm font-medium rounded shadow-md 
            hover:bg-blue-700 transition duration-150 ease-in-out
            hover:shadow-lg active:bg-blue-800"
          >
            <Link
              to="/create-listing"
              className="flex justify-center items-center"
            >
              Sell or Rent your Home
              <FcHome className="mr-2 text-3xl bg-red-200 rounded p-1 border-2" />
            </Link>
          </button>

          <div
            className="flex justify-between whitespace-nowrap 
          text-sm sm-text-large"
          >
            <p className="flex item-center">
              Do you want to change your name?
              <span
                onClick={() => {
                  changeDetail && onSubmit();
                  setChangeDetail((prevState) => !prevState);
                }}
                className="text-red-600 hover:text-red-700
              transition ease-in-out duration-200 ml-1
              cursor-pointer"
              >
                {changeDetail ? "Apply change" : "Edit"}
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
