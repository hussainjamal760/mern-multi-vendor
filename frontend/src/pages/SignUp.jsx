import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import axios from "axios"; 
const server = "http://localhost:8000/api/v2";

const SignUp = () => {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]; 
    setAvatar(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!avatar) {
      alert("Please select an avatar image");
      return;
    }

    setLoading(true);
    
    try {
      const config = { 
        headers: { 
          "Content-Type": "multipart/form-data" 
        } 
      };

      const newForm = new FormData();
      newForm.append("file", avatar);
      newForm.append("name", name);
      newForm.append("email", email);
      newForm.append("password", password);

      const response = await axios.post(
        `${server}/user/create-user`, 
        newForm, 
        config
      );
      

      setName("");
      setEmail("");
      setPassword("");
      setAvatar(null);
      
    } catch (error) {
    console.error("Full error object:", error);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-8 bg-gray-100">
      <h1 className="text-4xl font-bold text-center">Register as New User</h1>

      <div className="bg-gray-50 shadow-lg rounded-2xl p-8 w-96">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="fullname" className="mb-1 font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border rounded-lg px-3 py-2 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border rounded-lg px-3 py-2 focus:outline-none"
            />
          </div>

          <div className="flex flex-col relative">
            <label htmlFor="password" className="mb-1 font-medium">
              Password
            </label>
            <input
              type={visible ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border rounded-lg px-3 py-2 focus:outline-none pr-10"
            />
            {visible ? (
              <IoIosEye
                className="absolute right-3 top-9 cursor-pointer text-gray-700"
                onClick={() => setVisible(false)}
              />
            ) : (
              <IoIosEyeOff
                className="absolute right-3 top-9 cursor-pointer text-gray-700"
                onClick={() => setVisible(true)}
              />
            )}
          </div>

          <div>
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-700"
            >
              Avatar
            </label>
            <div className="mt-2 flex items-center">
              <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                {avatar ? (
                  <img
                    src={URL.createObjectURL(avatar)}
                    alt="avatar"
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : (
                  <RxAvatar className="h-8 w-8" />
                )}
              </span>
              <label
                htmlFor="file-input"
                className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <span>Upload a file</span>
                <input
                  type="file"
                  name="avatar"
                  id="file-input"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileInputChange}
                  className="sr-only"
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;