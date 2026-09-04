import { useState, useMemo, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff, FiShoppingCart, FiUser, FiMail, FiLock } from "react-icons/fi";
import { toast } from "sonner";
import HeroLottie from "@/components/normal/Lottie";
import logoAnimation from "../../assets/easymart-logo.json"
import LogoImage from "../../assets/ecom_logo.webp"

const BG_IMAGES = [
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1920&auto=format&fit=crop",
];


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

function SlidingBackground({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {images.map((img, i) => (
        <div
          key={img}
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${img})`,
            opacity: i === index ? 1 : 0,
          }}
        />
      ))}
    </div>
  );
}

interface InputProps {
  label: string;
  type?: string;
  value: string;
  placeholder?: string;
  icon?: React.ReactNode;
  onChange: (v: string) => void;
  rightSlot?: React.ReactNode;
}

function Field({ label, type = "text", value, placeholder, icon, onChange, rightSlot }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-secondary font-ibm-plex-mono">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full ${icon ? "pl-10" : "pl-4"} pr-10 py-2.5 bg-white border border-secondary-light rounded-lg text-gray-900 placeholder-gray-400 text-sm outline-none focus:border-primary transition-colors`}
        />
        {rightSlot && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary cursor-pointer transition-colors">
            {rightSlot}
          </span>
        )}
      </div>
    </div>
  );
}

// ---------- Login Form ----------
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = email.trim() !== "" && password.trim() !== "";

  function handleLoginWithGoogle() {
    window.location.href = "http://localhost:3000/api/user/google-login";
  }

  async function handleLogin() {
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long", { duration: 1000 });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Login Successful");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        toast.error(data.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-3 ">
      <Field
        label="Email"
        type="email"
        value={email}
        placeholder="you@example.com"
        icon={<FiMail size={16} />}
        onChange={setEmail}
      />
      <Field
        label="Password"
        type={showPw ? "text" : "password"}
        value={password}
        placeholder="••••••••"
        icon={<FiLock size={16} />}
        onChange={setPassword}
        rightSlot={
          <span onClick={() => setShowPw((p) => !p)}>
            {showPw ? <FiEyeOff size={16} /> : <FiEye size={16} />}
          </span>
        }
      />

      <div className="text-right">
        <a href="#" className="text-sm text-primary hover:underline transition-colors">
          Forgot password?
        </a>
      </div>

      <button
        disabled={!canSubmit || isSubmitting}
        onClick={handleLogin}
        className={`w-full rounded-lg py-3 text-sm font-semibold text-white transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg
          ${canSubmit ? "bg-primary hover:bg-primary-hover cursor-pointer" : "bg-secondary-light text-secondary cursor-not-allowed"}
          disabled:opacity-70 disabled:transform-none`}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>



      <button
        className="w-full flex items-center justify-center gap-2 rounded-lg border border-secondary-light bg-white py-2.5 text-sm font-medium text-gray-700 hover:bg-secondary-light/40 transition-colors cursor-pointer"
        onClick={handleLoginWithGoogle}
      >
        <FcGoogle size={18} />
        Login with Google
      </button>
    </div>
  );
}

function ConsumerRegistrationForm() {
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

  async function handleConsumerRegister() {
    if (phone.length !== 10) {
      toast.error("Phone number must be 10 digits", { duration: 1000 });
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", { duration: 1000 });
      return;
    }
    const name = `${firstName} ${lastName}`;
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/user/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, confirmPassword, phoneNumber: phone }),
    });
    const data = await res.json();
    if (data.success) {
      toast.success("Check Your Email for verification Email", { duration: 5000 });
      setTimeout(() => window.location.reload(), 2000);
    } else {
      toast.error(data.message);
    }
  }

  return (
    <div className="flex flex-col gap-4 scrollbar-none">
      <div className="grid grid-cols-2 gap-3">
        <Field label="First Name" value={firstName} placeholder="John" onChange={setFirstName} />
        <Field label="Last Name" value={lastName} placeholder="Doe" onChange={setLastName} />
      </div>

      <Field label="Phone Number" type="tel" value={phone} placeholder="+977 98XXXXXXXX" onChange={setPhone} />
      <Field label="Email" type="email" value={email} placeholder="you@example.com" icon={<FiMail size={16} />} onChange={setEmail} />

      <div className="flex flex-col gap-1">
        <Field
          label="Password"
          type={showPw ? "text" : "password"}
          value={password}
          placeholder="••••••••"
          icon={<FiLock size={16} />}
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
                  className={`h-1.5 flex-1 rounded-full transition-colors ${i <= strength.score ? strength.color : "bg-secondary-light"}`}
                />
              ))}
            </div>
            <span
              className={`text-xs font-medium ${strength.score <= 1
                ? "text-red-500"
                : strength.score === 2
                  ? "text-yellow-500"
                  : strength.score === 3
                    ? "text-blue-500"
                    : "text-green-500"
                }`}
            >
              {strength.label}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Field
          label="Confirm Password"
          type={showConfirm ? "text" : "password"}
          value={confirmPassword}
          placeholder="••••••••"
          icon={<FiLock size={16} />}
          onChange={setConfirmPassword}
          rightSlot={
            <span onClick={() => setShowConfirm((p) => !p)}>
              {showConfirm ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </span>
          }
        />
        {!passwordsMatch && <span className="text-xs text-red-500">Passwords do not match</span>}
      </div>

      <button
        disabled={!canSubmit}
        onClick={handleConsumerRegister}
        className={`w-full rounded-lg py-3 text-sm font-semibold text-white transition-all mt-1 shadow-lg
          ${canSubmit ? "bg-primary hover:bg-primary-hover cursor-pointer" : "bg-secondary-light text-secondary cursor-not-allowed"}`}
      >
        Create Account
      </button>
    </div>
  );
}

function SellerRegistrationForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [shopName, setShopName] = useState("");
  const [address, setAddress] = useState("");
  const [storeType, setStoreType] = useState("");

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

  async function handleSellerRegistration() {
    if (phone.length !== 10) {
      toast.error("Phone number must be 10 digits", { duration: 1000 });
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", { duration: 1000 });
      return;
    }
    const name = `${firstName} ${lastName}`;
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/user/register-seller`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name, email, password, confirmPassword, phoneNumber: phone, shopName, address, storeType,
      }),
    });
    const data = await res.json();
    if (data.success) {
      toast.success("Check Your Email for verification Email", { duration: 5000 });
      setTimeout(() => window.location.reload(), 2000);
    } else {
      toast.error(data.message);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="First Name" value={firstName} placeholder="John" onChange={setFirstName} />
        <Field label="Last Name" value={lastName} placeholder="Doe" onChange={setLastName} />
      </div>

      <Field label="Phone Number" type="tel" value={phone} placeholder="+977 98XXXXXXXX" onChange={setPhone} />
      <Field label="Email" type="email" value={email} placeholder="you@example.com" icon={<FiMail size={16} />} onChange={setEmail} />

      <div className="flex flex-col gap-1">
        <Field
          label="Password"
          type={showPw ? "text" : "password"}
          value={password}
          placeholder="••••••••"
          icon={<FiLock size={16} />}
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
                  className={`h-1.5 flex-1 rounded-full transition-colors ${i <= strength.score ? strength.color : "bg-secondary-light"}`}
                />
              ))}
            </div>
            <span
              className={`text-xs font-medium ${strength.score <= 1
                ? "text-red-500"
                : strength.score === 2
                  ? "text-yellow-500"
                  : strength.score === 3
                    ? "text-blue-500"
                    : "text-green-500"
                }`}
            >
              {strength.label}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Field
          label="Confirm Password"
          type={showConfirm ? "text" : "password"}
          value={confirmPassword}
          placeholder="••••••••"
          icon={<FiLock size={16} />}
          onChange={setConfirmPassword}
          rightSlot={
            <span onClick={() => setShowConfirm((p) => !p)}>
              {showConfirm ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </span>
          }
        />
        {!passwordsMatch && <span className="text-xs text-red-500">Passwords do not match</span>}
      </div>

      <Field label="Store Name" value={shopName} placeholder="Store Name" onChange={setShopName} />
      <Field label="Address" value={address} placeholder="Address" onChange={setAddress} />
      <Field label="Store Type" value={storeType} placeholder="Store Type (eg. Electronic, Clothing)" onChange={setStoreType} />

      <button
        disabled={!canSubmit}
        onClick={handleSellerRegistration}
        className={`w-full rounded-lg py-3 text-sm font-semibold text-white transition-all mt-1 shadow-lg
          ${canSubmit ? "bg-primary hover:bg-primary-hover cursor-pointer" : "bg-secondary-light text-secondary cursor-not-allowed"}`}
      >
        Create Account
      </button>
    </div>
  );
}

// ---------- Registration Type Picker ----------
interface RegestrationSectionProps {
  onSelect: (type: "consumer" | "seller") => void;
}

function RegestrationSection({ onSelect }: RegestrationSectionProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-center text-gray-900">Register as</h1>
      <p className="text-sm text-secondary text-center">Choose your path to join our platform</p>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <button
          onClick={() => onSelect("consumer")}
          className="border border-secondary-light bg-white rounded-xl p-6 text-left hover:border-primary hover:bg-primary/5 transition cursor-pointer shadow-sm"
        >
          <div className="flex gap-3 items-center">
            <FiUser size={26} className="text-secondary" />
            <h3 className="font-semibold text-lg text-gray-900">Consumer</h3>
          </div>
          <p className="text-sm text-secondary mt-2">
            Browse products, place orders, track deliveries and manage your purchases.
          </p>
        </button>
        <button
          onClick={() => onSelect("seller")}
          className="border border-secondary-light bg-white rounded-xl p-6 text-left hover:border-primary hover:bg-primary/5 transition cursor-pointer shadow-sm"
        >
          <div className="flex gap-3 items-center">
            <FiShoppingCart size={26} className="text-secondary" />
            <h3 className="font-semibold text-lg text-gray-900">Seller</h3>
          </div>
          <p className="text-sm text-secondary mt-2">
            Open your own store, upload products and manage customer orders.
          </p>
        </button>
      </div>
    </div>
  );
}

type Tab = "login" | "register";
type RegisterType = "consumer" | "seller" | null;

const Login = () => {
  const [tab, setTab] = useState<Tab>("login");
  const [registerType, setRegisterType] = useState<RegisterType>(null);

  return (
    <div className="h-screen w-full flex bg-white">
      <div className="w-full md:w-1/2 flex flex-col overflow-y-auto scrollbar-none bg-white">
        <div className="my-auto px-8 py-10 md:px-14 w-full max-w-lg mx-auto border border-secondary-light rounded-lg p-6">
          <div className="mb-8 text-center md:text-left">
            <div className="h-12 w-40 mx-auto md:mx-0 mb-3">
              <Logo />
              {/* <img src={LogoImage} className="h-full w-full object-contain" /> */}
            </div>
            <p className="text-secondary text-sm font-ibm-plex-mono">
              {tab === "login" ? "Welcome back! Sign in to continue." : "Create your account to get started."}
            </p>
          </div>

          {/* Toggle tabs */}
          <div className="flex rounded-lg border border-secondary-light p-1 mb-6">
            <button
              onClick={() => {
                setTab("login");
                setRegisterType(null);
              }}
              className={`flex-1 rounded-md py-2 text-sm font-semibold font-ibm-plex-mono transition-colors cursor-pointer
                ${tab === "login" ? "bg-primary text-white" : "text-secondary hover:text-primary"}`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setTab("register");
                setRegisterType(null);
              }}
              className={`flex-1 rounded-md py-2 text-sm font-semibold font-ibm-plex-mono transition-colors cursor-pointer
                ${tab === "register" ? "bg-primary text-white" : "text-secondary hover:text-primary"}`}
            >
              Register
            </button>
          </div>

          {tab === "login" ? (
            <LoginForm />
          ) : registerType == null ? (
            <RegestrationSection onSelect={setRegisterType} />
          ) : registerType === "consumer" ? (
            <ConsumerRegistrationForm />
          ) : (
            <SellerRegistrationForm />
          )}
        </div>
      </div>

      <div className="hidden md:block md:w-1/2 relative">
        <SlidingBackground images={BG_IMAGES} />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/60 to-accent/60 flex flex-col items-center justify-end pb-16 px-8 text-white text-center">
          <h2 className="text-2xl font-bold leading-snug">Shop smarter, live better</h2>
          <p className="text-sm mt-2 opacity-90">
            Discover thousands of products at unbeatable prices.
          </p>
        </div>
      </div>
    </div>
  );
};



const Logo = () => {
  return (
    <a href="/">
      <HeroLottie />
    </a>
  );
}



export default Login;