"use client";
import { useState, useEffect } from "react";
import DashboardNav from "@/Compunent/DashboardNav";
import { Button } from "@/Compunent/ui/button"; 
import { UserCircle, Mail, Bell, Shield, Palette } from "lucide-react";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();

  const [displayName, setDisplayName] = useState("Alex Johnson");
  const [email, setEmail] = useState("alex@example.com");
  const [prefs, setPrefs] = useState({
    dailyReminders: true,
    privacyMode: true,
    calmingAnimations: true,
  });

  // ✅ Load user from localStorage
  useEffect(() => {
    const token = localStorage.getItem("access");

    // 🔐 Protect page (optional but recommended)
    if (!token) {
      router.push("/login");
      return;
    }

    const storedName = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email"); // ✅ FIXED

    if (storedName) setDisplayName(storedName);
    else setDisplayName("User");

    if (storedEmail) setEmail(storedEmail);
  }, [router]);

  const togglePref = (key) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    alert(`Saved! Display Name: ${displayName}`);

    // ✅ Save updates
    localStorage.setItem("username", displayName);
    localStorage.setItem("email", email); // ✅ FIXED
  };

  const handleDownload = () => {
    const userData = { displayName, email, prefs };
    const blob = new Blob([JSON.stringify(userData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${displayName.replace(" ", "_")}_data.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete your account?")) {
      setDisplayName("");
      setEmail("");
      setPrefs({
        dailyReminders: false,
        privacyMode: false,
        calmingAnimations: false,
      });

      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("access");

      alert("Account deleted.");
      router.push("/login"); // redirect after delete
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <DashboardNav />

      <main className="container max-w-2xl mx-auto px-6 py-8 space-y-8">
        <h1 className="text-2xl font-bold">
          Your Profile
        </h1>

        {/* User Info */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-8">
          <div className="flex items-center gap-5 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
              <UserCircle className="h-8 w-8 text-gray-700" />
            </div>
            <div>
              <h2 className="font-bold text-lg">{displayName || "User"}</h2>
              <p className="text-sm text-gray-600">{email || "No Email"}</p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block font-medium mb-1">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-2 border rounded-xl bg-gray-100"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 px-4 py-2 border rounded-xl bg-gray-100"
                />
              </div>
            </div>

            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-2xl shadow-lg border p-8">
          <h2 className="font-bold text-lg mb-6 flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Preferences
          </h2>

          <div className="space-y-6">
            {[
              { key: "dailyReminders", icon: Bell, label: "Daily reminders" },
              { key: "privacyMode", icon: Shield, label: "Privacy mode" },
              { key: "calmingAnimations", icon: Palette, label: "Animations" },
            ].map((pref) => (
              <div key={pref.key} className="flex justify-between">
                <div className="flex gap-3">
                  <pref.icon className="h-4 w-4" />
                  <p>{pref.label}</p>
                </div>
                <input
                  type="checkbox"
                  checked={prefs[pref.key]}
                  onChange={() => togglePref(pref.key)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white rounded-2xl shadow-lg border p-8">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy & Safety
          </h2>

          <div className="flex gap-3">
            <Button onClick={handleDownload}>
              Download My Data
            </Button>
            <Button onClick={handleDelete}>
              Delete Account
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;