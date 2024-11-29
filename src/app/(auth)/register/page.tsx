"use client";

import { useState } from "react";
import { FiUser } from "react-icons/fi";
import InputWithIcon from "@/components/form/input";
import { MdOutlineEmail } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");
    
    if (!formData.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      setErrorMessage("Invalid email format.");
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(baseURL + '/auth/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Registration successful.");
        setFormData({
          name: "",
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        });
        router.push("/login");
      } else {
        toast.error("Registration failed.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setErrorMessage("An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-background px-8 lg:px-24 py-8 w-full h-screen">
      <Toaster/>
      <div className="bg-white rounded-2xl w-full h-full flex">
        <div className="bg-[#EFF4FF] rounded-2xl w-[40%] hidden lg:flex items-center justify-center">
          <NextImage src="/login/login-img.png" alt="doctor" width={500} height={500} />
        </div>
        <div className="w-full px-8 lg:w-3/5 p-12 lg:px-20 h-full justify-center flex flex-col space-y-3">
          <Typography variant="h5" weight="medium">
            Daftar ke <span className="text-[#458FF6]">X</span>
          </Typography>
          <form onSubmit={handleSubmit}>
            <InputWithIcon
              name="name"
              icon={FiUser}
              placeholder="Nama"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              inputClassName="text-sm border-gray-400 rounded-lg"
              iconClassName="text-button"
              
            />
            <InputWithIcon
              name="email"
              icon={MdOutlineEmail}
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              inputClassName="text-sm border-gray-400 rounded-lg"
              iconClassName="text-button"
              
            />
            <InputWithIcon
              name="username"
              icon={FiUser}
              placeholder="Username"
              type="text"
              value={formData.username}
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
            <InputWithIcon
              name="confirmPassword"
              icon={IoLockClosedOutline}
              placeholder="Konfirmasi Password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              inputClassName="text-sm border-gray-400 rounded-lg"
              iconClassName="text-button"
              
            />

            <div className="flex items-center">
              <input type="checkbox" className="mr-2"  />
              <label>
                Saya setuju dengan semua{" "}
                <span className="text-[#458FF6]">syarat dan ketentuan*</span>
              </label>
            </div>

            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}

            <div className="flex space-x-2 items-center mt-4">
              <button
                type="submit"
                className={`w-full text-sm ${loading ? 'bg-gray-400' : 'bg-[#458FF6]'} text-white py-[11px] rounded-md my-2`}
                disabled={loading} // Disable button during loading
              >
                {loading ? 'Loading...' : 'Daftar'}
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
                <span className="text-gray-400"> Sudah punya akun? </span>Masuk
              </Typography>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
