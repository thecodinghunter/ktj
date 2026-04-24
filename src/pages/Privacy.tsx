import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | All Gujarat Travels</title>
        <meta
          name="description"
          content="Privacy Policy for All Gujarat Travels. Learn how we collect, use, and protect your personal information."
        />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="bg-primary py-12 md:py-16">
          <div className="container-custom text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
              Privacy Policy
            </h1>
            <p className="text-primary-foreground/80">
              Last updated: December 2024
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto prose prose-gray">
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">1. Introduction</h2>
                  <p className="text-muted-foreground">
                    All Gujarat Travels ("we," "our," or "us") is committed to protecting
                    your privacy. This Privacy Policy explains how we collect, use, and safeguard
                    your personal information when you use our travel services or visit our
                    website.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    2. Information We Collect
                  </h2>
                  <p className="text-muted-foreground mb-3">
                    We collect personal information only for booking and enquiry purposes,
                    including:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Name and contact details (phone number, email if provided)</li>
                    <li>Travel dates and destination preferences</li>
                    <li>Number of travelers</li>
                    <li>Pickup/drop locations</li>
                    <li>Government ID (for travel verification purposes only)</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    3. How We Use Your Information
                  </h2>
                  <p className="text-muted-foreground mb-3">
                    Your personal data is used solely for:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Processing your tour bookings and reservations</li>
                    <li>Communicating about your travel arrangements</li>
                    <li>Providing customer support and assistance</li>
                    <li>Sending booking confirmations and updates</li>
                    <li>Improving our services based on feedback</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">4. Data Security</h2>
                  <p className="text-muted-foreground">
                    We implement appropriate security measures to protect your personal
                    information from unauthorized access, alteration, disclosure, or destruction.
                    Your data is stored securely and accessed only by authorized personnel for
                    legitimate business purposes.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    5. Information Sharing
                  </h2>
                  <p className="text-muted-foreground">
                    We do not sell, trade, or share your personal information with third parties
                    for marketing purposes. Your information may only be shared with:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-3">
                    <li>Our drivers and guides directly involved in your tour</li>
                    <li>Partner hotels or services (if included in your package)</li>
                    <li>Government authorities if required by law</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    6. Communication Preferences
                  </h2>
                  <p className="text-muted-foreground">
                    Your contact details are used only for service-related communication. We may
                    contact you via phone, WhatsApp, or email regarding your bookings, special
                    offers, or travel updates. You can opt out of promotional communications at
                    any time.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">7. Your Rights</h2>
                  <p className="text-muted-foreground">You have the right to:</p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-3">
                    <li>Request access to your personal data</li>
                    <li>Request correction of inaccurate data</li>
                    <li>Request deletion of your data (subject to legal requirements)</li>
                    <li>Withdraw consent for marketing communications</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">8. Contact Us</h2>
                  <p className="text-muted-foreground">
                    For any privacy-related concerns or requests, please contact us:
                  </p>
                  <div className="mt-3 p-4 bg-secondary rounded-lg">
                    <p className="font-semibold text-foreground">All Gujarat Travels</p>
                    <p className="text-muted-foreground">Phone: +91 97261 26217</p>
                    <p className="text-muted-foreground">WhatsApp: +91 90992 66227</p>
                    <p className="text-muted-foreground">Email: allgujrattravels@gmail.com</p>
                    <p className="text-muted-foreground">Location: Gujarat, India</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    9. Policy Updates
                  </h2>
                  <p className="text-muted-foreground">
                    We may update this Privacy Policy from time to time. Any changes will be
                    reflected on this page with an updated "Last updated" date.
                  </p>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-border">
                <Link
                  to="/"
                  className="text-primary hover:text-accent transition-colors font-medium"
                >
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Privacy;
