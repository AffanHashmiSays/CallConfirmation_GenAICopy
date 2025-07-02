import React from 'react';
import {
  CogIcon,
  PhoneIcon,
  CheckCircleIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: 1,
      icon: CogIcon,
      title: 'Connect Your Store',
      description: 'Integrate VoiceConfirm with your e-commerce platform in just a few clicks. We support Shopify, WooCommerce, Magento, and custom APIs.',
      details: [
        'Simple API integration',
        'Pre-built connectors',
        'Custom webhook support',
        '5-minute setup process'
      ]
    },
    {
      step: 2,
      icon: PhoneIcon,
      title: 'AI Makes the Call',
      description: 'Our AI voice assistant automatically calls customers to confirm their orders using natural, human-like conversation powered by advanced AI.',
      details: [
        'Human-like voice quality',
        'Multi-language support',
        'Intelligent conversation flow',
        'Automatic retry logic'
      ]
    },
    {
      step: 3,
      icon: CheckCircleIcon,
      title: 'Order Confirmed',
      description: 'Customer confirms the order through voice interaction. The system updates your dashboard and notifies you of the confirmation status.',
      details: [
        'Real-time status updates',
        'Instant notifications',
        'Order status synchronization',
        'Customer response recording'
      ]
    },
    {
      step: 4,
      icon: ChartBarIcon,
      title: 'Track & Optimize',
      description: 'Monitor performance through our comprehensive dashboard. Get insights on success rates, call analytics, and optimization recommendations.',
      details: [
        'Detailed analytics dashboard',
        'Performance metrics',
        'Success rate tracking',
        'ROI calculations'
      ]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How VoiceConfirm Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple, automated, and effective. Get started in minutes and see results immediately.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-16">
          {steps.map((step, index) => (
            <div key={index} className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              {/* Content */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold text-lg">
                    {step.step}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">
                    {step.title}
                  </h3>
                </div>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  {step.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {step.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center gap-3">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual */}
              <div className="flex-1 relative">
                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 shadow-lg">
                  {/* Icon */}
                  <div className="absolute -top-6 left-8">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-xl shadow-lg">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  {/* Mock Interface */}
                  <div className="mt-8 space-y-4">
                    {step.step === 1 && (
                      <div className="space-y-3">
                        <div className="bg-white p-4 rounded-lg shadow-sm border">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Shopify Store</span>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Connected</span>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">API Webhook</span>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Active</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {step.step === 2 && (
                      <div className="space-y-3">
                        <div className="bg-white p-4 rounded-lg shadow-sm border">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm text-gray-700">Calling +1 (555) 123-4567...</span>
                          </div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <p className="text-sm text-blue-800 italic">
                            "Hi John, this is VoiceConfirm calling about your recent order #12345..."
                          </p>
                        </div>
                      </div>
                    )}

                    {step.step === 3 && (
                      <div className="space-y-3">
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-green-800">Order #12345</span>
                            <CheckCircleIcon className="h-5 w-5 text-green-600" />
                          </div>
                          <p className="text-xs text-green-700 mt-1">Confirmed by customer</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border">
                          <span className="text-xs text-gray-500">Status updated in your store</span>
                        </div>
                      </div>
                    )}

                    {step.step === 4 && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white p-3 rounded-lg shadow-sm border text-center">
                            <div className="text-lg font-bold text-blue-600">98.5%</div>
                            <div className="text-xs text-gray-500">Success Rate</div>
                          </div>
                          <div className="bg-white p-3 rounded-lg shadow-sm border text-center">
                            <div className="text-lg font-bold text-green-600">1,234</div>
                            <div className="text-xs text-gray-500">Calls Made</div>
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-sm border">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full w-4/5"></div>
                          </div>
                          <span className="text-xs text-gray-500 mt-1">Monthly Progress</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 lg:hidden">
                    <div className="w-px h-16 bg-gradient-to-b from-blue-600 to-purple-600"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-gray-600 mb-8">
            Set up your automated order confirmations in less than 5 minutes
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
            Start Free Trial Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

