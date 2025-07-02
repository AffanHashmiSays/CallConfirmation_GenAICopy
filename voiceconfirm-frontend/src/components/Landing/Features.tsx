import React from 'react';
import {
  PhoneIcon,
  CpuChipIcon,
  ClockIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  BoltIcon,
} from '@heroicons/react/24/outline';

const Features: React.FC = () => {
  const features = [
    {
      icon: PhoneIcon,
      title: 'AI Voice Calls',
      description: 'Human-like voice calls powered by ElevenLabs AI technology that sound natural and professional.',
      color: 'blue',
    },
    {
      icon: CpuChipIcon,
      title: 'Smart Automation',
      description: 'Intelligent automation that handles order confirmations, reduces manual work, and scales with your business.',
      color: 'purple',
    },
    {
      icon: ClockIcon,
      title: '24/7 Operation',
      description: 'Round-the-clock service that works while you sleep, ensuring no order confirmation is missed.',
      color: 'green',
    },
    {
      icon: ChartBarIcon,
      title: 'Real-time Analytics',
      description: 'Comprehensive dashboard with insights, success rates, and performance metrics to optimize your operations.',
      color: 'indigo',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with 99.9% uptime guarantee and GDPR compliance for your peace of mind.',
      color: 'red',
    },
    {
      icon: GlobeAltIcon,
      title: 'Multi-language Support',
      description: 'Support for 25+ languages and regional accents to serve your global customer base effectively.',
      color: 'yellow',
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Cost Effective',
      description: 'Save up to 80% compared to human agents while improving efficiency and customer satisfaction.',
      color: 'emerald',
    },
    {
      icon: BoltIcon,
      title: 'Easy Integration',
      description: 'Simple API integration with popular e-commerce platforms like Shopify, WooCommerce, and Magento.',
      color: 'orange',
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
      purple: 'bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white',
      green: 'bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white',
      indigo: 'bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white',
      red: 'bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white',
      yellow: 'bg-yellow-100 text-yellow-600 group-hover:bg-yellow-600 group-hover:text-white',
      emerald: 'bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white',
      orange: 'bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern E-commerce
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to automate your order confirmations and scale your business efficiently
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="mb-4">
                <div className={`inline-flex p-3 rounded-lg transition-all duration-300 ${getColorClasses(feature.color)}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-800">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join hundreds of e-commerce businesses that have already automated their order confirmations with VoiceConfirm
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg">
              Start Your Free Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

