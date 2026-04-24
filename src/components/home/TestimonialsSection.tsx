import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Rajeshbhai Patel",
    location: "Ahmedabad",
    text: "All Gujarat Travels provides excellent one-way service. I booked a cab from Ahmedabad to Bhuj, and the experience was seamless. Professional driver and very clean car.",
    rating: 5,
  },
  {
    name: "Minaben Shah",
    location: "Surat",
    text: "We used their service for a family round trip to the Statue of Unity. The driver was very polite and knew all the best routes. Highly recommend for family travels!",
    rating: 5,
  },
  {
    name: "Harishbhai Gadhvi",
    location: "Bhuj",
    text: "Best airport pickup and drop service in Gujarat. They are always on time and very reliable. I use them for all my business trips now.",
    rating: 5,
  },
  {
    name: "Anitaben Desai",
    location: "Vadodara",
    text: "Amazing tour package! They planned our entire Gujarat heritage tour perfectly. From Somnath to Dwarka, everything was well-managed and comfortable.",
    rating: 5,
  },
  {
    name: "Chiragbhai Mehta",
    location: "Rajkot",
    text: "Very transparent pricing and no hidden costs. The WhatsApp booking is super fast. Had a great experience travelling from Rajkot to Surat.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-background overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Happy Travelers Say
          </h2>
          <p className="text-muted-foreground">
            Read stories from our satisfied customers who explored Gujarat with us
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="relative p-8 bg-card rounded-2xl border border-border shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              {/* Quote Icon Overlay */}
              <div className="absolute top-4 right-8 text-primary/5 group-hover:text-primary/10 transition-colors">
                <Quote size={64} />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-orange-400 text-orange-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-muted-foreground mb-8 italic leading-relaxed relative z-10">
                "{review.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{review.name}</h4>
                  <p className="text-xs text-muted-foreground">{review.location}, Gujarat</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
