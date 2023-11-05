import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import { updateProfile } from "firebase/auth";
import { AuthContext } from "../providers/AuthProvider";

const Registration = () => {
  const [showPass, setShowPass] = useState(false);
  const [signUpError, setSignUpError] = useState("");

  const { registerWithEmailPassword } = useContext(AuthContext);

  //================== Register using Email and Password ==================
  const handleRegisterWithEmailAndPassword = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.pass.value;
    const photoUrl = form.photo.value;

    setSignUpError("");

    if (password.length < 6) {
      setSignUpError("Password must have at least 6 characters!");
    } else if (/[A-Z]/.test(password) === false) {
      setSignUpError("At least 1 uppercase letter is required!");
    } else if (/[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/.test(password) === false) {
      setSignUpError("Password must have at least 1 special character!");
    } else {
      registerWithEmailPassword(email, password)
        .then((result) => {
          const user = result.user;
          updateProfile(user, {
            displayName: name,
            photoURL: photoUrl,
          })
            .then(() => {
              toast.success("Account created Successfully!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });

              form.reset();
            })
            .catch((err) => setSignUpError(err.code + "---" + err.message));
        })
        .catch((err) => {
          setSignUpError(err.code + "---" + err.message);
        });
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-1/2 border rounded-lg px-10">
        <form
          className="flex flex-col gap-4 text-left"
          onSubmit={handleRegisterWithEmailAndPassword}
        >
          <h1 className="text-[#444] text-[40px] font-semibold text-center">
            Sign UP
          </h1>

          <label htmlFor="in1" className="">
            Name
            <input
              type="text"
              id="in1"
              name="name"
              placeholder="Type Here"
              required
              className="input input-bordered w-full"
            />
          </label>

          <label htmlFor="in2" className="">
            Email
            <input
              type="email"
              id="in2"
              name="email"
              placeholder="Type Here"
              required
              className="input input-bordered w-full"
            />
          </label>

          <label htmlFor="in3" className="">
            Password
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                id="in3"
                name="pass"
                placeholder="Type Here"
                required
                className="input input-bordered w-full"
              />
              <span
                className="text-2xl absolute right-4 top-0 translate-y-[50%]"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? (
                  <AiFillEyeInvisible></AiFillEyeInvisible>
                ) : (
                  <AiFillEye></AiFillEye>
                )}
              </span>
            </div>
          </label>

          <label htmlFor="in4" className="">
            Photo URl
            <input
              type="text"
              id="in4"
              name="photo"
              placeholder="Type Here"
              // required
              className="input input-bordered w-full"
            />
          </label>

          {/* <div className="w-full flex gap-4 justify-start items-center">
            <input
              type="checkbox"
              name="termsCheck"
              id="terms"
              className="w-5 h-5"
            />
            <label htmlFor="terms">Accept terms and conditions?</label>
          </div> */}

          {signUpError && (
            <p className="text-red-500 text-center font-bold">{signUpError}</p>
          )}

          <input
            type="submit"
            value="Sign Up"
            className="input w-full bg-[#FF3811] text-white"
          />
        </form>
        <p className="my-6 text-center">
          Already have an account?
          <Link className="text-[#FF3811]" to="/login">
            Sign In
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Registration;
