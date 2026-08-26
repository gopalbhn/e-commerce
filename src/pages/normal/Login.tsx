// Login.tsx
import { useState, useMemo, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff, FiShoppingCart, FiUser, FiMail, FiLock } from "react-icons/fi";
import { toast } from "sonner";
import Logo from "@/assets/ecom_logo.webp";

const BG_IMAGES = [
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1920&auto=format&fit=crop",
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

// ---------- Sliding Image Background ----------
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
      <div className="absolute inset-0  z-10" />
      {images.map((img, i) => (
        <div
          key={img}
          className="absolute inset-0 w-full h-full bg-cover bg-center transition  duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${img})`,
            opacity: i === index ? 1 : 0,
          }}
        />
      ))}
    </div>
  );
}

// ---------- Shared Field ----------
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
      <label className="text-sm font-medium text-white/80 font-ibm-plex-mono">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full ${icon ? "pl-10" : "pl-4"} pr-10 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 text-sm outline-none focus:border-purple-500/50 transition-colors`}
        />
        {rightSlot && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white cursor-pointer transition-colors">
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
    <div className="flex flex-col gap-6">
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
        <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
          Forgot password?
        </a>
      </div>

      <button
        disabled={!canSubmit || isSubmitting}
        onClick={handleLogin}
        className={`w-full rounded-lg py-3 text-sm font-semibold text-white transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg  hover:shadow-background/5
          ${canSubmit ? "bg-primary hover:bg-primary-hover cursor-pointer" : "bg-white/10 text-white/40 cursor-not-allowed"}
          disabled:opacity-70 disabled:transform-none`}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-xs text-white/50">quick access via</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      <button
        className="w-full flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
        onClick={handleLoginWithGoogle}
      >
        <FcGoogle size={18} />
        Login with Google
      </button>
    </div>
  );
}

// ---------- Consumer Registration ----------
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
                  className={`h-1.5 flex-1 rounded-full transition-colors ${i <= strength.score ? strength.color : "bg-white/10"}`}
                />
              ))}
            </div>
            <span className="text-xs font-medium text-white/70">{strength.label}</span>
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
        {!passwordsMatch && <span className="text-xs text-red-400">Passwords do not match</span>}
      </div>

      <button
        disabled={!canSubmit}
        onClick={handleConsumerRegister}
        className={`w-full rounded-lg py-3 text-sm font-semibold text-white transition-all mt-1 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40
          ${canSubmit ? "bg-purple-600 hover:bg-purple-700 cursor-pointer" : "bg-white/10 text-white/40 cursor-not-allowed"}`}
      >
        Create Account
      </button>
    </div>
  );
}

// ---------- Seller Registration ----------
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
    <div className="flex flex-col gap-4 ">
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
                  className={`h-1.5 flex-1 rounded-full transition-colors ${i <= strength.score ? strength.color : "bg-white/10"}`}
                />
              ))}
            </div>
            <span className="text-xs font-medium text-white/70">{strength.label}</span>
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
        {!passwordsMatch && <span className="text-xs text-red-400">Passwords do not match</span>}
      </div>

      <Field label="Store Name" value={shopName} placeholder="Store Name" onChange={setShopName} />
      <Field label="Address" value={address} placeholder="Address" onChange={setAddress} />
      <Field label="Store Type" value={storeType} placeholder="Store Type (eg. Electronic, Clothing)" onChange={setStoreType} />

      <button
        disabled={!canSubmit}
        onClick={handleSellerRegistration}
        className={`w-full rounded-lg py-3 text-sm font-semibold text-white transition-all mt-1 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40
          ${canSubmit ? "bg-purple-600 hover:bg-purple-700 cursor-pointer" : "bg-white/10 text-white/40 cursor-not-allowed"}`}
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
      <h1 className="text-xl font-semibold text-center text-white">Register as</h1>
      <p className="text-sm text-white/60 text-center">Choose your path to join our platform</p>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <button
          onClick={() => onSelect("consumer")}
          className="border border-white/10 bg-white/5 rounded-xl p-6 text-left hover:border-purple-500/50 hover:bg-white/10 transition cursor-pointer"
        >
          <div className="flex gap-3 items-center">
            <FiUser size={26} className="text-white/80" />
            <h3 className="font-semibold text-lg text-white">Consumer</h3>
          </div>
          <p className="text-sm text-white/60 mt-2">
            Browse products, place orders, track deliveries and manage your purchases.
          </p>
        </button>
        <button
          onClick={() => onSelect("seller")}
          className="border border-white/10 bg-white/5 rounded-xl p-6 text-left hover:border-purple-500/50 hover:bg-white/10 transition cursor-pointer"
        >
          <div className="flex gap-3 items-center">
            <FiShoppingCart size={26} className="text-white/80" />
            <h3 className="font-semibold text-lg text-white">Seller</h3>
          </div>
          <p className="text-sm text-white/60 mt-2">
            Open your own store, upload products and manage customer orders.
          </p>
        </button>
      </div>
    </div>
  );
}

// ---------- Main Page ----------
type Tab = "login" | "register";
type RegisterType = "consumer" | "seller" | null;

const Login = () => {
  const [tab, setTab] = useState<Tab>("login");
  const [registerType, setRegisterType] = useState<RegisterType>(null);

  const isWide = tab === "register" && registerType !== null;

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 py-10 overflow-hidden">
      <SlidingBackground images={BG_IMAGES} />

      <div className={`relative z-20 w-full transition-all duration-300 ${isWide ? "max-w-xl" : "max-w-md"}`}>
        <div
          className={`p-8 rounded-2xl backdrop-blur-sm bg-black/40 border border-white/10 ${tab === "register" ? "max-h-[85vh] overflow-y-auto scrollbar-none" : ""
            }`}
        >
          {/* Brand */}
          <div className="mb-8 text-center">
            <div className="h-12 w-40 mx-auto mb-3">
              <img src={Logo} className="h-full w-full object-contain" alt="Logo" />
            </div>
            <p className="text-white/70 text-sm font-ibm-plex-mono">
              {tab === "login" ? "Welcome back! Sign in to continue." : "Create your account to get started."}
            </p>
          </div>

          {/* Toggle tabs */}
          <div className="flex rounded-lg border border-white/10 p-1 mb-6">
            <button
              onClick={() => {
                setTab("login");
                setRegisterType(null);
              }}
              className={`flex-1 rounded-md py-2 text-sm font-semibold font-ibm-plex-mono transition-colors cursor-pointer
                ${tab === "login" ? "bg-primary text-white " : "text-white/60 hover:text-white"}`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setTab("register");
                setRegisterType(null);
              }}
              className={`flex-1 rounded-md py-2 text-sm font-semibold font-ibm-plex-mono transition-colors cursor-pointer
                ${tab === "register" ? "bg-primary text-white" : "text-white/60 hover:text-white"}`}
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

      <footer className="absolute bottom-4 left-0 right-0 text-center text-white/50 text-sm z-20">
        © 2025. All rights reserved.
      </footer>
    </div>
  );
};

export default Login;