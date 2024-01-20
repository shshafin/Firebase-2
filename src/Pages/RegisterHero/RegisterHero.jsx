import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../Firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterHero = () => {
  const [regError, setRegError] = useState("");
  const [success, setSuccess] = useState("");
  const [hide, setHide] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;
    console.log(email, password);

    // reset states
    setRegError("");
    setSuccess("");

    // password validation
    if (password.length < 6) {
      setRegError("Password must be 6 character");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegError("your password should have one uppercase character");
      return;
    } else if (!accepted) {
      setRegError("Please accept our terms and condition");
      return;
    }

    // create user
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess("user created successfully");
      })
      .catch((error) => {
        console.error(error);
        setRegError(error.message);
      });
  };

  return (
    <div>
      <div className="hero h-[70vh] bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleRegister} className="card-body">
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
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={hide ? "text" : "password"}
                    name="password"
                    placeholder="password"
                    className="input input-bordered w-full"
                    required
                  />
                  <span
                    className="absolute top-4 right-4 "
                    onClick={() => setHide(!hide)}
                  >
                    {hide ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
                  </span>
                </div>
              </div>
              <div className="form-control mt-6">
                <div className="flex gap-2 mb-2">
                  <input type="checkbox" name="terms" id="terms" />
                  <label htmlFor="terms">
                    Accept our{" "}
                    <a className="text-purple-600">Terms and Conditions</a>
                  </label>
                </div>
                <button className="btn btn-primary">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {regError && <p className="text-xl text-red-700">{regError}</p>}
      {success && <p className="text-xl text-green-500">{success}</p>}
    </div>
  );
};

export default RegisterHero;
