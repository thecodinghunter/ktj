import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut, Ticket, CarFront, MapPin, TrendingUp, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const adminNavItems = [
  { path: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { path: "/admin/bookings", label: "Bookings", icon: Ticket },
  { path: "/admin/fleet", label: "Fleet Management", icon: CarFront },
  { path: "/admin/gallery", label: "Places (Gallery)", icon: MapPin },
  { path: "/admin/reports", label: "Reports & Analytics", icon: TrendingUp },
];

export default function AdminLayout() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isStaticAuthenticated, setIsStaticAuthenticated] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Check local storage on mount
  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (auth === "true") {
      setIsStaticAuthenticated(true);
    }
  }, []);

  const handleSignIn = () => {
    setIsSigningIn(true);
    setAuthError("");
    if (email === "adminkutchhjannt" && password === "admin123") {
      setIsStaticAuthenticated(true);
      localStorage.setItem("adminAuth", "true");
    } else {
      setAuthError("Invalid username or password.");
    }
    setIsSigningIn(false);
  };

  const handleSignOut = () => {
    setIsStaticAuthenticated(false);
    localStorage.removeItem("adminAuth");
    setEmail("");
    setPassword("");
    navigate("/admin");
  };

  if (!isStaticAuthenticated) {
    return (
      <>
        <Helmet>
          <title>Admin Login | Kutch Jannat Tours And Travels</title>
        </Helmet>
        <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-xl border-border">
            <CardHeader className="space-y-2 text-center pb-6">
              <div className="mx-auto bg-orange-500 h-14 w-14 rounded-full flex items-center justify-center mb-4 shadow-sm">
                <ShieldCheck className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold">Admin Access</CardTitle>
              <CardDescription>
                Sign in with your credentials to manage Kutch Jannat Tours and Travels.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" type="text" placeholder="Enter username" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSignIn()} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSignIn()} />
              </div>
              {authError && <p className="text-sm text-destructive font-medium">{authError}</p>}
              <Button onClick={handleSignIn} disabled={isSigningIn} className="w-full bg-orange-500 hover:bg-orange-600 text-white mt-4 transition-colors">
                {isSigningIn ? "Signing in..." : "Sign In to Dashboard"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Kutch Jannat Tours And Travels</title>
      </Helmet>

      <div className="min-h-screen bg-muted/20 text-foreground flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="hidden md:flex w-72 flex-col border-r bg-background shadow-sm z-10">
          <div className="border-b p-6">
            <h1 className="text-xl font-bold text-orange-600">Kutch Jannat Admin</h1>
            <p className="text-xs text-muted-foreground mt-1">Control Center</p>
          </div>
          <div className="p-4 flex-1 space-y-2">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-colors ${
                    isActive ? "bg-orange-50 text-orange-600" : "text-muted-foreground hover:text-orange-600 hover:bg-orange-50/50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="p-4 border-t">
            <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
              <p className="text-xs font-semibold text-orange-800 uppercase mb-1">Signed In As</p>
              <p className="text-sm text-orange-900 font-medium truncate">adminkutchhjannt</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
          <header className="sticky top-0 z-30 flex items-center justify-between border-b bg-background/95 backdrop-blur px-6 py-4">
            <div>
              <h2 className="text-lg font-semibold md:hidden mb-1">Kutch Jannat Admin</h2>
              <h2 className="text-sm font-medium text-muted-foreground hidden md:block">Dashboard Overview</h2>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={handleSignOut} className="text-muted-foreground hover:text-foreground">
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </Button>
            </div>
          </header>

          <div className="p-6 pb-20 max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
