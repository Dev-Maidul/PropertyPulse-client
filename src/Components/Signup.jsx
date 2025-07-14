import React, { useContext, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import toast from "react-hot-toast";
import { motion } from "framer-motion"; // Added for animations
import { saveUserInDb } from "../API/utils";

const Signup = () => {
  const { CreateUser, setUser, updateUser, googleSignIn } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const handleGoogleLogIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result);
        const user = result.user;
        const name = user.displayName;
        const photoURL = user.photoURL;

        const userData = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        image: result?.user?.photoURL,
      }
      saveUserInDb(userData)
        updateUser({ displayName: name, photoURL })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL });
            navigate(from, { replace: true });
          })
          .catch((error) => {
            setUser(user);
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;

    // Reset state
    setSuccess(false);
    setErrorMessage("");

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      return;
    }
    if (!terms) {
      setErrorMessage("Please accept our terms and conditions");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setErrorMessage("Password should contain at least one lowercase letter.");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setErrorMessage("Password should contain at least one Uppercase letter.");
      return;
    }

    CreateUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        const userData = {
        name:user.displayName,
        email,
        image: user.photoURL,
      }
      // Save user data in db
       saveUserInDb(userData)

        toast.success("Registration Successful");
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            navigate(from, { replace: true });
          })
          .catch((error) => {
            setUser(user);
            console.log(error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        alert(errorMessage);
      });
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };
  const scaleUp = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="card bg-property-bg mx-auto w-full max-w-6xl shadow-2xl overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* Left Column - Form */}
        <div className="w-full lg:w-1/2 p-6 lg:p-10">
          <div className="card-body">
            <h1 className="text-4xl lg:text-5xl font-bold text-property-text">Register now!</h1>
            <form onSubmit={handleSignup}>
              <fieldset className="fieldset">
                <label className="label text-property-text">Name</label>
                <input
                  name="name"
                  type="text"
                  className="input w-full bg-white text-property-text border-gray-300"
                  placeholder="Name"
                />
                <label className="label text-property-text">Photo</label>
                <input
                  name="photo"
                  type="text"
                  className="input w-full bg-white text-property-text border-gray-300"
                  placeholder="Photo Url"
                />
                <label className="label text-property-text">Email</label>
                <input
                  name="email"
                  type="email"
                  className="input w-full bg-white text-property-text border-gray-300"
                  placeholder="Your email"
                />
                <label className="label text-property-text">Password</label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="input w-full bg-white text-property-text border-gray-300"
                    placeholder="Password"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn btn-xs absolute top-3 right-3 text-property-text"
                  >
                    {showPassword ? <FaRegEye size={18} /> : <FaEyeSlash size={18} />}
                  </button>
                </div>
                <br />
                <label className="label text-property-text">
                  <input name="terms" type="checkbox" className="checkbox mr-2" />
                  Accept Terms and Conditions
                </label>
                <button type="submit" className="btn btn-neutral mt-4 w-full bg-property-secondary text-white hover:bg-opacity-80">
                  Register
                </button>
              </fieldset>
            </form>
            <button onClick={handleGoogleLogIn} className="btn w-full mt-4 bg-white text-black border-gray-300 hover:bg-gray-100">
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                  <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                  <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                  <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                </g>
              </svg>
              Login with Google
            </button>
            <p className="mt-4 text-property-text">
              Already have an Account? Please{" "}
              <Link to="/login" className="text-property-secondary underline">
                LogIn
              </Link>
            </p>
            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
            {success && <p className="text-green-600 mt-2">User created Account</p>}
          </div>
        </div>

        {/* Right Column - Infographics */}
        <div className="w-full lg:w-1/2 bg-property-bg p-6 lg:p-10 flex items-center justify-center">
          <div className="text-center">
            <motion.h2
              className="text-3xl lg:text-4xl font-bold text-property-text mb-6"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              Why Choose PropertyPulse?
            </motion.h2>
            <motion.div
              className="flex flex-col lg:flex-row justify-around items-center"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
            >
              <motion.div
                className="mb-6 lg:mb-0"
                variants={scaleUp}
              >
                <svg
                  className="w-16 h-16 mx-auto text-property-secondary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L2 7v10l10 5 10-5V7l-10-5zm0 2.71l7 3.5v6.58l-7 3.5-7-3.5V8.21l7-3.5zm-1 2.61v4h2v-4h-2zm2 6h-2v2h2v-2zm-4 0H7v2h2v-2zm0-4H7v2h2v-2zm4 0v2h2v-2h-2z"/>
                </svg>
                <p className="mt-2 text-property-text">100+ Properties Listed</p>
              </motion.div>
              <motion.div
                className="mb-6 lg:mb-0"
                variants={scaleUp}
              >
                <svg
                  className="w-16 h-16 mx-auto text-property-secondary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
                <p className="mt-2 text-property-text">24/7 Support</p>
              </motion.div>
              <motion.div
                variants={scaleUp}
              >
                <svg
                  className="w-16 h-16 mx-auto text-property-secondary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1zm-4.44-6.19l-5.66 5.66-2.83-2.83 1.41-1.41 1.41 1.41 4.25-4.25 1.42 1.42z"/>
                </svg>
                <p className="mt-2 text-property-text">Expert Agents</p>
              </motion.div>
            </motion.div>
            <motion.p
              className="mt-6 text-lg text-property-text"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: 0.4 }}
            >
              Join thousands of satisfied clients finding their perfect property with us!
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;