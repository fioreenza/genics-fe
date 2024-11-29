'use client';

import { useState } from "react";

import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import toast, {Toaster} from "react-hot-toast";
import InputWithIcon from "@/components/form/input";
import { FiUser } from "react-icons/fi";
import { IoLockClosedOutline } from "react-icons/io5";
import { useRouter } from 'next/navigation';

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const router = useRouter();
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    setErrorMessage("");
  
    if (!formData.email || !formData.password) {
      setErrorMessage("Both fields are required.");
      return;
    }
  
    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }
  
    if (!termsAccepted) {
      setErrorMessage("You must accept the terms and conditions.");
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await fetch(baseURL + '/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (result.success) {
        const { data } = result;
        console.log(data);
  
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("userRole", data.user.role);
  
        const currentTime = new Date().getTime();
        localStorage.setItem("token_time", currentTime.toString());
  
        toast.success("Login successful!");
        router.push("/"); 
      } else {
        setErrorMessage(result.message || "Login failed.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <section className="bg-background px-8 lg:px-24 py-8 w-full h-screen">
      <Toaster></Toaster>
      <div className="bg-white rounded-2xl w-full h-full flex">
        <div className="w-full px-8 lg:w-3/5 p-12 lg:px-20 h-full justify-center flex flex-col space-y-3">
          <Typography variant="h5" weight="medium">
            Masuk ke <span className="text-[#458FF6]">X</span>
          </Typography>
          <form onSubmit={handleSubmit}>
            <InputWithIcon
              name="email"
              icon={FiUser}
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              inputClassName="text-sm border-gray-400 rounded-lg"
              iconClassName="text-button"
            />
            <InputWithIcon
              name="password"
              icon={IoLockClosedOutline}
              placeholder="Password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              inputClassName="text-sm border-gray-400 rounded-lg"
              iconClassName="text-button"
            />
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mr-2"
              />
              <Typography variant="bs">
                <label>
                  Saya setuju dengan semua{" "}
                  <span className="text-[#458FF6]">syarat dan ketentuan*</span>
                </label>
              </Typography>
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <div className="flex space-x-2 items-center">
              <button
                type="submit"
                className={`w-full text-sm ${loading ? 'bg-gray-400' : 'bg-[#458FF6]'} text-white py-[11px] rounded-md my-2`}
                disabled={loading}
              >
                {loading ? "Loading..." : "Masuk"}
              </button>
              <button type="button" className="bg-[#ECF4FE] px-3 h-fit py-2 rounded-md">
                <NextImage src="/login/google.png" alt="google" width={28} height={28} />
              </button>
            </div>
          </form>
          <div className="flex flex-col">
            <a href="#">
              <Typography variant="bs" className="text-button text-center">
                Lupa Password?
              </Typography>
            </a>
            <a href="#" className="text-[#458FF6] text-center">
              <Typography variant="bs" className="text-button text-center">
                <span className="text-gray-400"> Belum punya akun? </span>Daftar
              </Typography>
            </a>
          </div>
        </div>
        <div className="bg-[#EFF4FF] rounded-2xl w-[40%] hidden lg:flex items-center justify-center">
          <NextImage
            src="/login/login-img.png"
            alt="doctor"
            width={500}
            height={500}
          />
        </div>
      </div>
    </section>
  );
}
