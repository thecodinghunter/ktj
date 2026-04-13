import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  MessageCircle,
  Mail,
  Phone,
  User,
  Calendar,
  Users,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface BookingFormProps {
  packageName: string;
  packagePrice: number;
  packageDays: string;
}

const BookingForm = ({
  packageName,
  packagePrice,
  packageDays,
}: BookingFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    numberOfPeople: "1",
    tourDate: "",
    roomType: "Twin Sharing",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const emailBody = `
Hello,

I am interested in booking the following tour package:

Package Details:
- Package Name: ${packageName}
- Duration: ${packageDays}
- Price: ₹${packagePrice} per person
- Room Type: ${formData.roomType}
- Number of People: ${formData.numberOfPeople}
- Preferred Tour Date: ${formData.tourDate || "Not specified"}

Traveler Information:
- Full Name: ${formData.fullName}
- Email: ${formData.email}
- Phone: ${formData.phone}

Please provide more details about availability and booking confirmation.

Thank you,
${formData.fullName}
      `.trim();

      const response = await fetch("https://formspree.io/f/mnqdzplr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          package: packageName,
          message: emailBody,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          numberOfPeople: "1",
          tourDate: "",
          roomType: "Twin Sharing",
        });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError("Failed to send booking. Please try again.");
      }
    } catch (err) {
      setError("Error sending booking. Please try WhatsApp or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppSubmit = () => {
    const message = `Hello! I'm interested in booking the "${packageName}" tour package.

Details:
- Duration: ${packageDays}
- Price: ₹${packagePrice} per person
- Room Type: ${formData.roomType}
- Number of People: ${formData.numberOfPeople}
- Preferred Date: ${formData.tourDate || "Flexible"}

My Contact Information:
- Name: ${formData.fullName || "Not provided"}
- Email: ${formData.email || "Not provided"}
- Phone: ${formData.phone || "Not provided"}

Please provide more information and confirm availability.`;

    const whatsappLink = `https://wa.me/919099266227?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader className="bg-primary/10">
        <h3 className="text-2xl font-bold text-foreground">
          Book {packageName}
        </h3>
        <p className="text-sm text-muted-foreground mt-2">
          Fill in your details below and choose your preferred contact method
        </p>
      </CardHeader>

      <CardContent className="pt-8">
        <form onSubmit={handleEmailSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Your Information</h4>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="tel"
                  name="phone"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          {/* Tour Details */}
          <div className="space-y-4 border-t border-border pt-6">
            <h4 className="font-semibold text-foreground">Tour Details</h4>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Number of People *
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select
                    name="numberOfPeople"
                    value={formData.numberOfPeople}
                    onChange={handleChange}
                    className="pl-10 w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Person" : "People"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Room Type *
                </label>
                <select
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="Twin Sharing">Twin Sharing (₹14,000)</option>
                  <option value="Triple Sharing">Triple Sharing (₹13,000)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Preferred Tour Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  name="tourDate"
                  value={formData.tourDate}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-muted p-4 rounded-lg border border-border">
            <h4 className="font-semibold text-foreground mb-3">
              Booking Summary
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Package:</span>
                <span className="font-medium text-foreground">
                  {packageName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-medium text-foreground">{packageDays}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Room Type:</span>
                <span className="font-medium text-foreground">
                  {formData.roomType}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Number of People:</span>
                <span className="font-medium text-foreground">
                  {formData.numberOfPeople}
                </span>
              </div>
              <div className="border-t border-border pt-2 mt-2 flex justify-between">
                <span className="text-foreground font-semibold">
                  Estimated Total:
                </span>
                <span className="text-lg font-bold text-primary">
                  ₹
                  {(
                    packagePrice *
                    parseInt(formData.numberOfPeople)
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 border-t border-border pt-6">
            <div className="grid md:grid-cols-2 gap-3">
              <Button
                type="button"
                onClick={handleWhatsAppSubmit}
                disabled={!formData.fullName || !formData.email || !formData.phone}
                className="gap-2 bg-green-600 hover:bg-green-700"
              >
                <MessageCircle className="h-4 w-4" />
                Book via WhatsApp
              </Button>

              <Button
                type="submit"
                disabled={
                  !formData.fullName || !formData.email || !formData.phone || loading
                }
                variant="outline"
                className="gap-2"
              >
                <Mail className="h-4 w-4" />
                {loading ? "Sending..." : "Book via Email"}
              </Button>
            </div>

            {submitted && (
              <div className="p-3 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-200 rounded-lg text-sm flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                ✓ Booking inquiry sent successfully! We'll contact you soon.
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-200 rounded-lg text-sm flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            <p className="text-xs text-muted-foreground text-center">
              Or call us directly: <span className="font-semibold">+91-9726126216</span>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
