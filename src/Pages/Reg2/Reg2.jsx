import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import auth from "../../Firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Reg2 = () => {
  const [regError, setRegError] = useState("");
  const [success, setSuccess] = useState("");
  const [show, setShow] = useState(false);

  const handleReg = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const accept = e.target.accept.checked;
    console.log(email, password, name, accept);

    // remove states
    setRegError("");
    setSuccess("");

    // validation
    if (password.length < 6) {
      setRegError("must be more than 6 character");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegError("need a Uppercase letter");
      return;
    } else if (!accept) {
      setRegError("Please accept our Terms and condition");
      return;
    }

    //   registration
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess("Successfully registration completed!");
        // update user name
        updateProfile(result.user, {
          displayName: name,
        })
          .then(() => {
            console.log("name added");
          })
          .catch((error) => {
            console.log(error);
          });

        //   email verification
        sendEmailVerification(result.user).then(() => {
          alert("please check your email");
        });
        return;
      })
      .catch((error) => {
        console.log(error);
        setRegError("not successfully user created");
        return;
      });
  };

  return (
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 ">
      <form onSubmit={handleReg} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Username"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control ">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              name="password"
              placeholder="password"
              className="input input-bordered w-full"
              required
            />
            <span
              className="absolute top-4 right-2"
              onClick={() => setShow(!show)}
            >
              {show ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
            </span>
          </div>
        </div>
        <div>
          <input className="mr-1" type="checkbox" name="accept" id="" />
          Accept our{" "}
          <span className="text-purple-700 font-bold">Terms & Condition</span>
        </div>
        <p>
          Have an account? Please{" "}
          <Link to={"/Log"} className="font-bold text-pink-700">
            Login
          </Link>
        </p>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Register</button>
        </div>
      </form>
      <div>
        {regError && (
          <p className="text-red-700 text-xl text-center">{regError}</p>
        )}
        {success && (
          <p className="text-green-700 text-xl text-center">{success}</p>
        )}
      </div>
    </div>
  );
};

export default Reg2;
