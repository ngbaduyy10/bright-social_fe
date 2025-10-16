import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function HomeFooter() {
  return (
    <footer className="bg-primary py-18">
      <div className="page-container grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-6 text-white">
          <div className="col-span-2 md:col-span-2 mb-4">
              <div className="font-extrabold text-3xl mb-3">Bright</div>
              <p className="text-md text-justify">
                  With its lease expiring, the shoe shop began searching for a new location to continue serving
                  its loyal customers.
              </p>
              <div className="flex items-center gap-3 mt-5">
                  <Facebook size={20} />
                  <Instagram size={20} />
                  <Twitter size={20} />
                  <Linkedin size={20} />
              </div>
          </div>

          <div className="hidden lg:block lg:col-span-1"></div>

          <div className="col-span-1">
              <div className="font-bold text-xl border-b mb-5 pb-2">Company</div>
              <div className="flex flex-col justify-start gap-3 text-md">
                  <div>About Us</div>
                  <div>Our Services</div>
                  <div>Our Pricing</div>
                  <div>Latest News</div>
              </div>
          </div>

          <div className="col-span-1">
              <div className="font-bold text-xl border-b mb-5 pb-2">Support</div>
              <div className="flex flex-col justify-start gap-3 text-md">
                  <div>FAQ’s</div>
                  <div>Terms & Conditions</div>
                  <div>Privacy Policy</div>
                  <div>Contact Us</div>
              </div>
          </div>

          <div className="col-span-1">
              <div className="font-bold text-xl border-b mb-5 pb-2">Address</div>
              <div className="flex flex-col justify-start gap-3 text-md">
                  <div><strong className="text-white">Location:</strong> District 10, Ho Chi Minh City</div>
                  <div><strong className="text-white">Email:</strong> ngbaduyy05</div>
                  <div><strong className="text-white">Phone:</strong> 0827872272</div>
              </div>
          </div>
      </div>
  </footer>
  )
}