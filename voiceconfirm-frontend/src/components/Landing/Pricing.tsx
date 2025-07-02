import React, { useState } from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { StarIcon } from '@heroicons/react/24/outline';

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for small businesses getting started',
      monthlyPrice: 29,
      annualPrice: 290,
      features: [
        'Up to 100 calls/month',
        'Basic voice templates',
        'Email support',
        'Dashboard analytics',
        'API integration',
        'Multi-language support'
      ],
      limitations: [
        'Advanced analytics',
        'Custom voice training',
        'Priority support',
        'White-label solution'
      ],
      popular: false,
      color: 'blue'
    },
    {
      name: 'Professional',
      description: 'Ideal for growing e-commerce businesses',
      monthlyPrice: 99,
      annualPrice: 990,
      features: [
        'Up to 1,000 calls/month',
        'Custom voice templates',
        'Priority support',
        'Advanced analytics',
        'API integration',
        'Multi-language support',
        'Call recordings',
        'Custom webhooks'
      ],
      limitations: [
        'Custom voice training',
        'White-label solution'
      ],
      popular: true,
      color: 'purple'
    },
    {
      name: 'Enterprise',
      description: 'For large businesses with high volume',
      monthlyPrice: 299,
      annualPrice: 2990,
      features: [
        'Unlimited calls',
        'Custom voice training',
        'Dedicated support',
        'Advanced analytics',
        'API integration',
        'Multi-language support',
        'Call recordings',
        'Custom webhooks',
        'White-label solution',
        'SLA guarantee'
      ],
      limitations: [],
      popular: false,
      color: 'indigo'
    }
  ];

  const getPrice = (plan: typeof plans[0]) => {
    return isAnnual ? plan.annualPrice : plan.monthlyPrice;
  };

  const getSavings = (plan: typeof plans[0]) => {
    const monthlyCost = plan.monthlyPrice * 12;
    const annualCost = plan.annualPrice;
    return Math.round(((monthlyCost - annualCost) / monthlyCost) * 100);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your business. All plans include our core features with no hidden fees.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isAnnual ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Save up to 20%
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                plan.popular ? 'ring-2 ring-purple-600 scale-105' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1">
                    <StarIcon className="h-4 w-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {plan.description}
                  </p>
                  
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-gray-900">
                      ${getPrice(plan)}
                    </span>
                    <span className="text-gray-600 ml-2">
                      /{isAnnual ? 'year' : 'month'}
                    </span>
                  </div>

                  {isAnnual && (
                    <div className="text-sm text-green-600 font-medium">
                      Save {getSavings(plan)}% annually
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.limitations.map((limitation, limitationIndex) => (
                    <div key={limitationIndex} className="flex items-center gap-3 opacity-50">
                      <XMarkIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-500">{limitation}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                </button>

                {plan.name !== 'Enterprise' && (
                  <p className="text-center text-sm text-gray-500 mt-3">
                    14-day free trial • No credit card required
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We offer custom enterprise solutions with dedicated support, custom integrations, 
              and volume discounts for high-volume businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                Contact Sales
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-gray-400 transition-all duration-200">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Teaser */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Have questions about our pricing?
          </p>
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            View Frequently Asked Questions →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

