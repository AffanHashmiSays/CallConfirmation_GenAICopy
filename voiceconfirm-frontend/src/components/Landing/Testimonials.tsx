import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'E-commerce Manager',
      company: 'TechGadgets Pro',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      content: 'VoiceConfirm has revolutionized our order confirmation process. We\'ve reduced our operational costs by 75% while improving customer satisfaction. The AI voice quality is so natural that customers can\'t tell it\'s not human.',
      rating: 5,
      metrics: {
        costSaving: '75%',
        timeReduction: '90%'
      }
    },
    {
      name: 'Michael Chen',
      role: 'Founder & CEO',
      company: 'Fashion Forward',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      content: 'As a growing fashion e-commerce business, we needed a scalable solution for order confirmations. VoiceConfirm delivered exactly what we needed. The setup was incredibly easy, and the results were immediate.',
      rating: 5,
      metrics: {
        orderConfirmation: '98.5%',
        customerSatisfaction: '4.9/5'
      }
    },
    {
      name: 'Emily Rodriguez',
      role: 'Operations Director',
      company: 'Home & Garden Plus',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      content: 'The multi-language support has been a game-changer for our international customers. VoiceConfirm handles confirmations in 8 different languages seamlessly. Our global expansion became so much easier.',
      rating: 5,
      metrics: {
        languages: '8+',
        globalReach: '25 countries'
      }
    },
    {
      name: 'David Thompson',
      role: 'Head of Customer Success',
      company: 'SportZone Online',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      content: 'We process thousands of orders daily, and VoiceConfirm handles them all flawlessly. The 24/7 operation means we never miss a confirmation, even during peak seasons. It\'s like having a tireless team working around the clock.',
      rating: 5,
      metrics: {
        dailyOrders: '2,500+',
        uptime: '99.9%'
      }
    },
    {
      name: 'Lisa Park',
      role: 'Marketing Manager',
      company: 'Beauty Essentials',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
      content: 'The analytics dashboard provides incredible insights into our customer behavior. We can see confirmation patterns, optimize our processes, and make data-driven decisions. It\'s not just automation, it\'s intelligence.',
      rating: 5,
      metrics: {
        dataInsights: '100%',
        processOptimization: '40%'
      }
    },
    {
      name: 'James Wilson',
      role: 'CTO',
      company: 'ElectroMart',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      content: 'The API integration was seamless with our existing tech stack. VoiceConfirm\'s technical team provided excellent support throughout the implementation. The system is robust, reliable, and scales perfectly with our growth.',
      rating: 5,
      metrics: {
        integrationTime: '< 1 hour',
        scalability: 'Unlimited'
      }
    }
  ];

  const stats = [
    { value: '500+', label: 'Happy Customers' },
    { value: '1M+', label: 'Calls Processed' },
    { value: '98.5%', label: 'Success Rate' },
    { value: '4.9/5', label: 'Customer Rating' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Growing Businesses
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how businesses like yours are transforming their operations with VoiceConfirm
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {Object.entries(testimonial.metrics).map(([key, value], metricIndex) => (
                  <div key={metricIndex} className="text-center bg-white rounded-lg p-3">
                    <div className="text-lg font-bold text-blue-600">{value}</div>
                    <div className="text-xs text-gray-500 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-blue-600 font-medium">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join These Successful Businesses
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Start your free trial today and see why hundreds of e-commerce businesses trust VoiceConfirm 
              to automate their order confirmations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                Start Free Trial
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-gray-400 transition-all duration-200">
                Schedule Demo
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              14-day free trial • No credit card required • Setup in 5 minutes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

