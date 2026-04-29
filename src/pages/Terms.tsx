import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | Kutch Jannat Tours and Travels</title>
        <meta
          name="description"
          content="Terms and Conditions for Kutch Jannat Tours and Travels. Read our booking policies, cancellation terms, and service conditions."
        />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="bg-primary py-12 md:py-16">
          <div className="container-custom text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
              Terms & Conditions
            </h1>
            <p className="text-primary-foreground/80">Last updated: December 2024</p>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">1. Booking Policy</h2>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>All bookings are subject to vehicle availability.</li>
                    <li>
                      Bookings can be made via phone call or WhatsApp at +91 90992 66227.
                    </li>
                    <li>
                      Advance payment may be required for confirmed bookings, especially during
                      peak season.
                    </li>
                    <li>
                      Full payment details and mode will be communicated at the time of booking.
                    </li>
                    <li>
                      Booking confirmation will be provided via WhatsApp or phone call.
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">2. Payment Terms</h2>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>
                      <span className="font-semibold text-foreground">100% Advance Payment:</span> Full payment is required before 30 days of the tour date.
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">Partial Payment (31+ days before):</span> 25% advance payment with remaining 75% due before the tour starts.
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">Accepted Payment Methods:</span>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li><strong>Online:</strong> UPI & Net Banking</li>
                        <li><strong>Offline:</strong> Cheque, Demand Draft, NEFT, RTGS, IMPS</li>
                        <li>Cheque/Draft should be in favor of "Kutch Jannat Tours and Travels"</li>
                      </ul>
                    </li>
                    <li>
                      Payment receipts will be provided for all transactions.
                    </li>
                    <li>
                      No refunds will be processed to third-party accounts. Refunds will be made to the account from which payment was received.
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    3. Cancellation Policy
                  </h2>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>
                      <span className="font-semibold text-foreground">Cancellation Notice:</span> Cancellations must be communicated in writing or via email/WhatsApp.
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">Refund Based on Days Before Tour:</span>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li><strong>30-45 Days before:</strong> 50% of Package Price refunded</li>
                        <li><strong>16-30 Days before:</strong> 75% of Package Price deducted</li>
                        <li><strong>6-15 Days before:</strong> 100% of Package Price charged (No refund)</li>
                        <li><strong>Less than 6 Days:</strong> 100% of Package Price charged (No refund)</li>
                      </ul>
                    </li>
                    <li>
                      In case of issues at arrival not covered by company liability, the charges mentioned above shall be borne by the guest.
                    </li>
                    <li>
                      For tour packages, specific cancellation terms will be communicated at booking.
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    4. Passenger Requirements
                  </h2>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>
                      Valid government-issued ID (Aadhaar, Passport, Driving License, etc.) is
                      mandatory for all travelers.
                    </li>
                    <li>ID verification may be done before or during the journey.</li>
                    <li>
                      For inter-state travel, carry appropriate identification as per government
                      regulations.
                    </li>
                    <li>
                      Passengers are responsible for their personal belongings during the
                      journey.
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    5. Service Conditions
                  </h2>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>All vehicles provided are well-maintained and air-conditioned.</li>
                    <li>
                      Drivers are experienced, licensed, and familiar with local routes.
                    </li>
                    <li>
                      Itineraries are subject to change based on weather, road conditions, or
                      unforeseen circumstances.
                    </li>
                    <li>
                      Smoking and alcohol consumption inside vehicles is strictly prohibited.
                    </li>
                    <li>Extra charges may apply for night halts, toll, parking, and permits.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    6. Liability Limitations
                  </h2>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>
                      Kutch Jannat Tours and Travels is not responsible for delays or service
                      disruptions caused by:
                    </li>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Adverse weather conditions</li>
                      <li>Natural disasters or acts of God</li>
                      <li>Traffic congestion or road closures</li>
                      <li>Political unrest or strikes</li>
                      <li>Mechanical breakdowns (alternative arrangements will be made)</li>
                    </ul>
                    <li>
                      We are not liable for loss or damage to personal belongings during travel.
                    </li>
                    <li>
                      Travel insurance is recommended for all travelers.
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">7. Pricing</h2>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>
                      All prices are quoted in Indian Rupees (INR) and are subject to change
                      without prior notice.
                    </li>
                    <li>
                      Quoted prices may or may not include toll, parking, and state permits
                      (clarified at booking).
                    </li>
                    <li>Extra charges apply for additional stops or route deviations.</li>
                    <li>Night charges may apply for services beyond 10 PM.</li>
                    <li>Fuel surcharges may apply during periods of significant fuel price changes.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    7. Conduct & Behavior
                  </h2>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>
                      Passengers are expected to maintain respectful behavior during the journey.
                    </li>
                    <li>
                      Any damage to the vehicle by passengers will be charged accordingly.
                    </li>
                    <li>
                      We reserve the right to terminate service for unruly or dangerous behavior.
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    8. Dispute Resolution
                  </h2>
                  <p className="text-muted-foreground">
                    Any disputes arising from our services will be resolved through mutual
                    discussion. If unresolved, disputes shall be subject to the jurisdiction of
                    courts in Ahmedabad, Gujarat, India.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">9. Contact</h2>
                  <p className="text-muted-foreground mb-4">
                    For any questions regarding these terms, please contact:
                  </p>
                  <div className="p-4 bg-secondary rounded-lg">
                    <p className="font-semibold text-foreground">Kutch Jannat Tours and Travels</p>
                    <p className="text-muted-foreground">Phone: +91 97261 26217</p>
                    <p className="text-muted-foreground">WhatsApp: +91 90992 66227</p>
                    <p className="text-muted-foreground">Location: Ahmedabad/Bhuj, Gujarat, India</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">10. Acceptance</h2>
                  <p className="text-muted-foreground">
                    By booking our services, you acknowledge that you have read, understood, and
                    agree to be bound by these Terms & Conditions.
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

export default Terms;
