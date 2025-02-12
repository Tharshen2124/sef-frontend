import { useEffect, useState } from "react";
import { NavigationBar } from "../components/NavigationBar";
import { CheckCircle, MessageCircle, Zap, ChevronRight } from 'lucide-react'

export default function MainPage() {
    return (
        <>
            <NavigationBar />
            
            <section className="bg-blue-600 text-white py-20">
                <div className="px-4 flex flex-col md:flex-row items-center justify-around">
                    <div className="mb-10 md:mb-0 lg:w-[480px] md:w-[400px]">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center md:text-start">Welcome to Our Amazing Platform</h1>
                        <p className="text-xl mb-6 text-center md:text-start">Discover the power of our innovative solution and take your business to new heights.</p>
                        <a href="/account-selection" className="bg-white w-[170px] no-underline text-blue-600 hover:bg-blue-100 flex rounded-md py-3 px-3 mx-auto md:mx-0">Get Started <ChevronRight className="ml-2" /></a>
                    </div>
                    <div className="">
                        <img src="/heroImage.jpg" width={400} height={400} alt="Hero Image" className="rounded-lg shadow-lg" />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">Our Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard 
                    icon={<CheckCircle className="w-12 h-12 text-blue-500" />}
                    title="Easy to Use"
                    description="Our platform is designed with simplicity in mind, ensuring a smooth user experience."
                    />
                    <FeatureCard 
                    icon={<Zap className="w-12 h-12 text-blue-500" />}
                    title="Lightning Fast"
                    description="Experience blazing fast performance that keeps your business running efficiently."
                    />
                    <FeatureCard 
                    icon={<MessageCircle className="w-12 h-12 text-blue-500" />}
                    title="24/7 Support"
                    description="Our dedicated support team is always ready to assist you with any questions or issues."
                    />
                </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-blue-100 py-20">
                <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">What Our Customers Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <TestimonialCard 
                    quote="This platform has revolutionized the way we do business. Highly recommended!"
                    author="John Doe"
                    company="Tech Innovators Inc."
                    />
                    <TestimonialCard 
                    quote="The features and support are unmatched. It's been a game-changer for our team."
                    author="Jane Smith"
                    company="Creative Solutions LLC"
                    />
                </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4 text-blue-800">Ready to Get Started?</h2>
                <p className="text-xl mb-8 text-blue-600">Join thousands of satisfied customers and transform your business today.</p>
                <div className="flex gap-x-2 justify-center">
                    <a href="/account-selection" className="hover:no-underline bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">Sign Up</a>
                </div>
                </div>
            </section>


        </>
    )
}

function FeatureCard({ icon, title, description }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-center mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2 text-blue-800 text-center">{title}</h3>
        <p className="text-gray-600 text-center">{description}</p>
      </div>
    )
  }
  
  function TestimonialCard({ quote, author, company }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-600 mb-4">"{quote}"</p>
        <div>
          <p className="font-semibold text-blue-800">{author}</p>
          <p className="text-sm text-gray-500">{company}</p>
        </div>
      </div>
    )
  }
  