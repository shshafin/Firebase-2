import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link } from "react-router-dom";
import auth from "../../Firebase.config";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRef, useState } from "react";

const Login2 = () => {
  const [regError, setRegError] = useState("");
  const [success, setSuccess] = useState("");
  const [show, setShow] = useState(false);
  const emailRef = useRef();

  const handleLog = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
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
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess("Successfully registration completed!");
      })
      .catch((error) => {
        console.log(error);
        setRegError("not successfully user created");
        return;
      });
  };
  const handleForgetPass = () => {
    const email = emailRef.current.value;
    if (!email) {
      alert("enter a email first");
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
      alert("please provide correct email");
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("please forget password");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 ">
      <form onSubmit={handleLog} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            ref={emailRef}
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
        <label className="label">
          <a
            onClick={handleForgetPass}
            href="#"
            className="label-text-alt link link-hover"
          >
            Forgot password?
          </a>
        </label>
        <p>
          Have not an account? Please{" "}
          <Link to={"/Reg"} className="font-bold text-pink-700">
            Register
          </Link>
        </p>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
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

export default Login2;
