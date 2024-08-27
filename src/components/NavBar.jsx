import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import CostMateLogo from "/CostMate.png";
import { signOut } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const NavBar = () => {
  const [user, loading, error] = useAuthState(auth);
  const [username, setUsername] = useState("");
  const [settings, setSettings] = useState(false);
  console.log(username);

  useEffect(() => {
    const fetchUsername = async () => {
      if (auth.currentUser) {
        const uid = auth.currentUser.uid;
        const userDoc = await getDoc(doc(db, "users", uid));

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUsername(userData.username);
        } else {
          console.log("No such document!");
        }
      } else {
        console.log("No user is signed in");
      }
    };

    fetchUsername();
  }, []);

  const handleDropDown = () => {
    setSettings(!settings);
  };

  const handleSignOut = () => {
    toast.success("Signed out successfully");
    setSettings(false);
    signOut(auth);
  };

  return (
    <nav className="relative flex justify-between items-center border-b border-r-slate-200 mb-4  z-10">
      <img
        className="w-2/5 sm:w-2/5 md:w-1/5 lg:w-1/4"
        src={CostMateLogo}
        alt="Our Logo"
      />
      {/* <h1 className="text-2xl font-light text-slate-100 font-logo">COSTMATE</h1> */}
      {/* <p className="text-slate-300 justify-center">Good morning...</p> */}

      <div className="flex items-center gap-3">
        {user && (
          <h1 className="text-slate-100 font-bold">{username || "Guest"}</h1>
        )}
        <button
          className="w-[40px] text-slate-100 mr-5"
          onClick={handleDropDown}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </button>
      </div>
      <div
        className={`${
          settings ? "flex" : "hidden"
        } flex flex-col absolute gap-5 top-12 right-5 bg-black/40 text-slate-100 px-8 py-3 rounded-md`}
      >
        <button>Profile</button>
        <button>Setting</button>
        <button
          className="border-t border-t-slate-200 py-3"
          onClick={handleSignOut}
        >
          Log Out
        </button>
      </div>
      <Toaster />
    </nav>
  );
};

export default NavBar;
