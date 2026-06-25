import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login | Mediatas",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col text-on-surface overflow-x-hidden">
      <Header />

      <main className="flex-grow pt-32 pb-12 px-4 flex items-center justify-center relative overflow-hidden canvas-bg">
        {/* Decorative gradient blobs */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
          <div className="absolute top-[10%] right-[10%] w-96 h-96 bg-primary-fixed-dim rounded-full blur-[100px]" />
          <div className="absolute bottom-[10%] left-[10%] w-64 h-64 bg-secondary-fixed rounded-full blur-[80px]" />
        </div>

        <LoginForm />
      </main>

      <Footer />
    </div>
  );
}