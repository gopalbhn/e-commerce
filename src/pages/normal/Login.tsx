import { useState, useMemo } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import heroImage from "../../assets/hero.png";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


interface StrengthResult {
  score: number;
  label: string;
  color: string;
}

function getPasswordStrength(password: string): StrengthResult {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const levels: StrengthResult[] = [
    { score: 0, label: "Too short", color: "bg-gray-300" },
    { score: 1, label: "Weak", color: "bg-red-500" },
    { score: 2, label: "Fair", color: "bg-yellow-400" },
    { score: 3, label: "Good", color: "bg-blue-500" },
    { score: 4, label: "Strong", color: "bg-green-500" },
  ];
  return levels[score];
}


interface InputProps {
  label: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
  rightSlot?: React.ReactNode;
}

function Field({ label, type = "text", value, placeholder, onChange, rightSlot }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-secondary">{label}</label>
      <div className="relative">
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-secondary-light px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors pr-10"
        />
        {rightSlot && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary cursor-pointer">
            {rightSlot}
          </span>
        )}
      </div>
    </div>
  );
}


function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPw, setShowPw] = useState<boolean>(false);

  const canSubmit = email.trim() !== "" && password.trim() !== "";

  function handleLoginWithGoogle() {
    window.location.href = "http://localhost:3000/api/user/google-login";
  }

  async function handleLogin() {
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long", {
        duration: 1000
      })
      return
    }

    const res = await fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password
      })
    })

    const data = await res.json()

    if (data.success) {
      toast.success("Login Successful")
      setTimeout(() => {
        window.location.href = "/"
      }, 2000)
    } else {
      toast.error(data.message)
    }
  }



  return (
    <div className="flex flex-col gap-6 overflow-hidden">
      <Field
        label="Email"
        type="email"
        value={email}
        placeholder="you@example.com"
        onChange={setEmail}
      />
      <Field
        label="Password"
        type={showPw ? "text" : "password"}
        value={password}
        placeholder="••••••••"
        onChange={setPassword}
        rightSlot={
          <span onClick={() => setShowPw((p) => !p)}>
            {showPw ? <FiEyeOff size={16} /> : <FiEye size={16} />}
          </span>
        }
      />

      <div className="text-right">
        <a href="#" className="text-sm text-primary hover:underline">
          Forgot password?
        </a>
      </div>

      <button
        disabled={!canSubmit}
        onClick={handleLogin}
        className={`w-full rounded-lg py-2.5 text-sm font-semibold text-white transition-colors
          ${canSubmit ? "bg-primary hover:bg-primary-hover cursor-pointer" : "bg-secondary-light text-secondary cursor-not-allowed"}`}
      >
        Login
      </button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-secondary-light" />
        <span className="text-xs text-secondary">or</span>
        <div className="flex-1 h-px bg-secondary-light" />
      </div>

      <button
        className="w-full flex items-center justify-center gap-2 rounded-lg border border-secondary-light py-2.5 text-sm font-medium hover:bg-secondary-light transition-colors cursor-pointer"
        onClick={handleLoginWithGoogle}
      >
        <FcGoogle size={18} />
        Login with Google
      </button>
    </div>
  );
}

// ──────────────────────────────────────────
// Register form
// ──────────────────────────────────────────
function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  const canSubmit =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    phone.trim() !== "" &&
    email.trim() !== "" &&
    password.trim() !== "" &&
    confirmPassword.trim() !== "" &&
    password === confirmPassword;

  const passwordsMatch = confirmPassword === "" || password === confirmPassword;

  async function handleRegister() {

    if (phone.length !== 10) {
      toast.error("Phone number must be 10 digits", {
        duration: 1000
      })
      return
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        duration: 1000
      })
      return
    }
    const name = `${firstName} ${lastName}`;
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword,
        phoneNumber: phone
      })
    })
    const data = await res.json()
    if (data.success) {
      toast.success("Check Your Email for verificcation Email", {
        duration: 5000
      })
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } else {
      toast.error(data.message)
    }
  }



  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <Field
          label="First Name"
          value={firstName}
          placeholder="John"
          onChange={setFirstName}
        />
        <Field
          label="Last Name"
          value={lastName}
          placeholder="Doe"
          onChange={setLastName}
        />
      </div>

      <Field
        label="Phone Number"
        type="tel"
        value={phone}
        placeholder="+977 98XXXXXXXX"
        onChange={setPhone}
      />

      <Field
        label="Email"
        type="email"
        value={email}
        placeholder="you@example.com"
        onChange={setEmail}
      />

      {/* Password with strength checker */}
      <div className="flex flex-col gap-1">
        <Field
          label="Password"
          type={showPw ? "text" : "password"}
          value={password}
          placeholder="••••••••"
          onChange={setPassword}
          rightSlot={
            <span onClick={() => setShowPw((p) => !p)}>
              {showPw ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </span>
          }
        />
        {password.length > 0 && (
          <div className="flex flex-col gap-1 mt-1">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${i <= strength.score ? strength.color : "bg-secondary-light"
                    }`}
                />
              ))}
            </div>
            <span className={`text-xs font-medium ${strength.score <= 1 ? "text-red-500"
              : strength.score === 2 ? "text-yellow-500"
                : strength.score === 3 ? "text-blue-500"
                  : "text-green-500"
              }`}>
              {strength.label}
            </span>
          </div>
        )}
      </div>

      {/* Confirm password */}
      <div className="flex flex-col gap-1">
        <Field
          label="Confirm Password"
          type={showConfirm ? "text" : "password"}
          value={confirmPassword}
          placeholder="••••••••"
          onChange={setConfirmPassword}
          rightSlot={
            <span onClick={() => setShowConfirm((p) => !p)}>
              {showConfirm ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </span>
          }
        />
        {!passwordsMatch && (
          <span className="text-xs text-red-500">Passwords do not match</span>
        )}
      </div>

      <button
        disabled={!canSubmit}
        onClick={handleRegister}
        className={`w-full rounded-lg py-2.5 text-sm font-semibold text-white transition-colors mt-1
          ${canSubmit ? "bg-primary hover:bg-primary-hover cursor-pointer" : "bg-secondary-light text-secondary cursor-not-allowed"}`}
      >
        Create Account
      </button>
    </div>
  );
}

type Tab = "login" | "register";

const Login = () => {
  const [tab, setTab] = useState<Tab>("login");



  return (
    <div className="h-screen flex bg-secondary-light/30">
      <div className="w-full flex overflow-hidden bg-white">

        {/* ── Left: Form Panel ── */}
        <div className="w-1/2 flex flex-col overflow-y-auto px-10">
          {/* Inner wrapper: centered when content fits, top-aligned when it overflows */}
          <div className="my-auto px-10 py-5">

            {/* Brand */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-primary">ShopKaro</h1>
              <p className="text-sm text-secondary mt-1">
                {tab === "login" ? "Welcome back! Sign in to continue." : "Create your account to get started."}
              </p>
            </div>

            {/* Toggle tabs */}
            <div className="flex rounded-lg border border-secondary-light p-1 mb-5">
              <button
                onClick={() => setTab("login")}
                className={`flex-1 rounded-md py-2 text-sm font-semibold transition-colors cursor-pointer
                  ${tab === "login" ? "bg-primary text-white" : "text-secondary hover:text-primary"}`}
              >
                Login
              </button>
              <button
                onClick={() => setTab("register")}
                className={`flex-1 rounded-md py-2 text-sm font-semibold transition-colors cursor-pointer
                  ${tab === "register" ? "bg-primary text-white" : "text-secondary hover:text-primary"}`}
              >
                Register
              </button>
            </div>


            {tab === "login" ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>

        {/* ── Right: Image Panel ── */}
        <div className="w-1/2 relative hidden md:block">
          <img
            src={heroImage}
            alt="Login visual"
            className="w-full h-full object-cover"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-linear-to-br from-primary/60 to-accent/60 flex flex-col items-center justify-end pb-12 px-8 text-white text-center">
            <h2 className="text-2xl font-bold leading-snug">
              Shop smarter, live better
            </h2>
            <p className="text-sm mt-2 opacity-90">
              Discover thousands of products at unbeatable prices.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
