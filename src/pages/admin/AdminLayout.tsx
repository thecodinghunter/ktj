import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  LogOut,
  Ticket,
  CarFront,
  MapPin,
  TrendingUp,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const adminNavItems = [
  { path: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { path: "/admin/bookings", label: "Bookings", icon: Ticket },
  { path: "/admin/fleet", label: "Fleet", icon: CarFront },
  { path: "/admin/gallery", label: "Gallery", icon: MapPin },
  { path: "/admin/reports", label: "Reports", icon: TrendingUp },
];

export default function AdminLayout() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isStaticAuthenticated, setIsStaticAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (auth === "true") setIsStaticAuthenticated(true);
  }, []);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

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
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
                />
              </div>
              {authError && <p className="text-sm text-destructive font-medium">{authError}</p>}
              <Button
                onClick={handleSignIn}
                disabled={isSigningIn}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white mt-4 transition-colors"
              >
                {isSigningIn ? "Signing in..." : "Sign In to Dashboard"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <>
      {adminNavItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.exact
          ? location.pathname === item.path
          : location.pathname.startsWith(item.path);
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-colors ${
              isActive
                ? "bg-orange-50 text-orange-600"
                : "text-muted-foreground hover:text-orange-600 hover:bg-orange-50/50"
            }`}
          >
            <Icon className="h-4 w-4 flex-shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </>
  );

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Kutch Jannat Tours And Travels</title>
      </Helmet>

      <div className="min-h-screen bg-muted/20 text-foreground flex flex-col md:flex-row">

        {/* ── Mobile overlay ── */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── Sidebar (desktop: persistent | mobile: drawer) ── */}
        <aside
          className={`
            fixed top-0 left-0 h-full z-50 w-72 flex flex-col border-r bg-background shadow-lg
            transition-transform duration-300
            md:static md:translate-x-0 md:shadow-sm
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          {/* Sidebar header */}
          <div className="border-b p-5 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-orange-600">Kutch Jannat Admin</h1>
              <p className="text-xs text-muted-foreground mt-0.5">Control Center</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Nav links */}
          <div className="p-4 flex-1 space-y-1 overflow-y-auto">
            <NavLinks onClick={() => setSidebarOpen(false)} />
          </div>

          {/* Signed-in user badge */}
          <div className="p-4 border-t">
            <div className="bg-orange-50 rounded-xl p-3 border border-orange-100">
              <p className="text-xs font-semibold text-orange-800 uppercase mb-1">Signed In As</p>
              <p className="text-sm text-orange-900 font-medium truncate">adminkutchhjannt</p>
            </div>
          </div>
        </aside>

        {/* ── Main content ── */}
        <main className="flex-1 flex flex-col min-w-0 md:h-screen md:overflow-y-auto">

          {/* Top header bar */}
          <header className="sticky top-0 z-30 flex items-center justify-between border-b bg-background/95 backdrop-blur px-4 md:px-6 py-3 md:py-4">
            <div className="flex items-center gap-3">
              {/* Hamburger — mobile only */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <p className="text-sm font-semibold md:hidden text-foreground">Kutch Jannat Admin</p>
                <p className="text-sm font-medium text-muted-foreground hidden md:block">Dashboard Overview</p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="text-muted-foreground hover:text-foreground gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </header>

          {/* Page content */}
          <div className="p-4 md:p-6 pb-24 md:pb-10 max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>

        {/* ── Mobile bottom tab bar ── */}
        <nav className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-background border-t shadow-lg">
          <div className="flex items-center justify-around px-1 py-1">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center gap-0.5 px-2 py-2 rounded-xl flex-1 transition-colors ${
                    isActive ? "text-orange-600" : "text-muted-foreground"
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? "stroke-[2.5]" : ""}`} />
                  <span className="text-[10px] font-medium leading-tight">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
}
