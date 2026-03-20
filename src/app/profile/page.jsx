"use client";
import { useState, useEffect } from "react";
import DashboardNav from "@/Compunent/DashboardNav";
import { Button } from "@/Compunent/ui/button"; 
import { UserCircle, Mail, Bell, Shield } from "lucide-react";
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

  // ✅ LOAD USER FROM LOCALSTORAGE
  useEffect(() => {
    const token = localStorage.getItem("access");

    // protect page
    if (!token) {
      router.push("/login");
      return;
    }

    const storedName = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");

    if (storedName) setDisplayName(storedName);
    else setDisplayName("User");

    if (storedEmail) setEmail(storedEmail);
  }, [router]);

  const togglePref = (key) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    // ✅ SAVE TO LOCALSTORAGE
    localStorage.setItem("username", displayName);
    localStorage.setItem("email", email);

    alert("Changes saved!");
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
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("access");

      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <DashboardNav />

      <main className="max-w-2xl mx-auto px-6 py-10 space-y-8">
        {/* Title */}
        <h1 className="text-xl font-semibold">Your Profile</h1>

        {/* PROFILE CARD */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <UserCircle className="text-purple-500 w-6 h-6" />
            </div>

            <div>
              <h2 className="font-semibold text-sm">
                {displayName || "User"}
              </h2>
              <p className="text-xs text-gray-500">
                Member since February 2026
              </p>
            </div>
          </div>

          {/* INPUTS */}
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-600">
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full mt-1 px-4 py-2 rounded-full border bg-gray-50 text-sm"
              />
            </div>

            <div>
              <label className="text-xs text-gray-600">Email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 px-4 py-2 rounded-full border bg-gray-50 text-sm"
                />
              </div>
            </div>

            <Button
              onClick={handleSave}
              className="bg-purple-200 text-purple-700 hover:bg-purple-300 rounded-full text-sm px-4"
            >
              Save Changes
            </Button>
          </div>
        </div>

        {/* PREFERENCES */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h2 className="text-sm font-semibold mb-4">Preferences</h2>

          <div className="space-y-4">
            {[
              {
                key: "dailyReminders",
                label: "Daily wellness reminders",
                desc: "Get gentle nudges to check in with yourself",
                icon: Bell,
              },
              {
                key: "privacyMode",
                label: "Enhanced privacy mode",
                desc: "Extra layers of data protection",
                icon: Shield,
              },
              {
                key: "calmingAnimations",
                label: "Calming animations",
                desc: "Enable soothing micro-animations",
                icon: Bell,
              },
            ].map((pref) => (
              <div key={pref.key} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">{pref.label}</p>
                  <p className="text-xs text-gray-500">{pref.desc}</p>
                </div>

                <input
                  type="checkbox"
                  checked={prefs[pref.key]}
                  onChange={() => togglePref(pref.key)}
                  className="toggle"
                />
              </div>
            ))}
          </div>
        </div>

        {/* PRIVACY */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h2 className="text-sm font-semibold mb-2">
            Privacy & Safety
          </h2>

          <p className="text-xs text-gray-500 mb-4">
            Your privacy is our top priority. All conversations are encrypted
            and never shared with third parties.
          </p>

          <div className="flex gap-3">
            <Button
              onClick={handleDownload}
              className="rounded-full text-xs"
            >
              Download My Data
            </Button>

            <Button
              onClick={handleDelete}
              className="rounded-full text-xs border border-red-400 text-red-500 bg-white hover:bg-red-50"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;