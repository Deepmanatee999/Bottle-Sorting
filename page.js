"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data.message || "เข้าสู่ระบบไม่สำเร็จ");
      }

      // ล็อกอินสำเร็จ → ไปหน้า dashboard หรือ home
      router.push("/dashboard"); // ถ้าไม่มีหน้า dashboard จะเปลี่ยนเป็น "/" ก็ได้
    } catch (err) {
      setError(err.message || "เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#050810] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md space-y-8">
        {/* หัวข้อ */}
        <div className="text-center">
          <h1 className="text-3xl font-semibold">เข้าสู่ระบบ</h1>
          <div className="mt-2 flex justify-center">
            <span className="h-[3px] w-24 bg-teal-400 rounded-full" />
          </div>
        </div>

        {/* ฟอร์ม */}
        <form className="space-y-5" onSubmit={handleLogin}>
          {/* เบอร์โทร */}
          <div className="space-y-1">
            <label className="text-sm text-zinc-300">เบอร์โทร</label>
            <input
              type="tel"
              placeholder="กรอกเบอร์โทรที่ใช้สมัคร"
              className="w-full bg-[#111827] px-4 py-3 rounded-lg outline-none placeholder:text-zinc-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Error */}
          {error && <p className="text-sm text-red-400">{error}</p>}

          {/* ปุ่มเข้าสู่ระบบ */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-teal-500 py-3 font-medium text-black hover:bg-teal-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>

        {/* ลิงก์ไปสมัคร */}
        <p className="text-center text-xs text-zinc-400">
          ยังไม่มีบัญชี?{" "}
          <a href="/register" className="text-teal-400 hover:underline">
            สร้างบัญชี
          </a>
        </p>
      </div>
    </div>
  );
}
