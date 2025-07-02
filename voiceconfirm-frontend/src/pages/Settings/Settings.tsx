import React, { useState, useEffect } from 'react';
import {
  UserIcon,
  BellIcon,
  CreditCardIcon,
  KeyIcon,
  CogIcon,
  MicrophoneIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import GoogleSheetsManager from '../../components/GoogleSheets/GoogleSheetsManager';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: '',
    phone: '',
    timezone: 'UTC'
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    callUpdates: true,
    weeklyReports: true,
    systemAlerts: true
  });

  const [voiceSettings, setVoiceSettings] = useState({
    voice: 'alloy',
    speed: 1.0,
    language: 'en-US',
    customScript: 'Hello, this is VoiceConfirm calling about your recent order...'
  });

  const [apiSettings, setApiSettings] = useState({
    elevenLabsApiKey: '',
    twilioAccountSid: '',
    twilioAuthToken: '',
    twilioPhoneNumber: ''
  });

  const tabs = [
    { id: 'profile', name: 'Profile', icon: UserIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'voice', name: 'Voice Settings', icon: MicrophoneIcon },
    { id: 'integrations', name: 'Integrations', icon: CogIcon },
    { id: 'api', name: 'API Keys', icon: KeyIcon },
    { id: 'billing', name: 'Billing', icon: CreditCardIcon },
  ];

  const handleSaveProfile = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('Profile updated successfully!');
    }, 1000);
  };

  const handleSaveNotifications = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('Notification settings updated!');
    }, 1000);
  };

  const handleSaveVoiceSettings = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('Voice settings updated!');
    }, 1000);
  };

  const handleSaveApiSettings = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('API settings updated!');
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="mr-3 h-5 w-5" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={profile.company}
                      onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timezone
                    </label>
                    <select
                      value={profile.timezone}
                      onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                    </select>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    onClick={handleSaveProfile}
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
                <div className="space-y-6">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {key === 'emailNotifications' && 'Receive email notifications for important updates'}
                          {key === 'smsNotifications' && 'Receive SMS notifications for urgent alerts'}
                          {key === 'callUpdates' && 'Get notified when calls are completed'}
                          {key === 'weeklyReports' && 'Receive weekly performance reports'}
                          {key === 'systemAlerts' && 'Get notified about system maintenance and updates'}
                        </p>
                      </div>
                      <button
                        onClick={() => setNotifications({ ...notifications, [key]: !value })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          value ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <button
                    onClick={handleSaveNotifications}
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            )}

            {/* Voice Settings Tab */}
            {activeTab === 'voice' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Voice Configuration</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Voice Model
                    </label>
                    <select
                      value={voiceSettings.voice}
                      onChange={(e) => setVoiceSettings({ ...voiceSettings, voice: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="alloy">Alloy (Neutral)</option>
                      <option value="echo">Echo (Male)</option>
                      <option value="fable">Fable (British)</option>
                      <option value="onyx">Onyx (Deep)</option>
                      <option value="nova">Nova (Female)</option>
                      <option value="shimmer">Shimmer (Soft)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Speech Speed: {voiceSettings.speed}x
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="2.0"
                      step="0.1"
                      value={voiceSettings.speed}
                      onChange={(e) => setVoiceSettings({ ...voiceSettings, speed: parseFloat(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Language
                    </label>
                    <select
                      value={voiceSettings.language}
                      onChange={(e) => setVoiceSettings({ ...voiceSettings, language: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="en-US">English (US)</option>
                      <option value="en-GB">English (UK)</option>
                      <option value="es-ES">Spanish</option>
                      <option value="fr-FR">French</option>
                      <option value="de-DE">German</option>
                      <option value="it-IT">Italian</option>
                      <option value="pt-BR">Portuguese</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Custom Script Template
                    </label>
                    <textarea
                      value={voiceSettings.customScript}
                      onChange={(e) => setVoiceSettings({ ...voiceSettings, customScript: e.target.value })}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your custom script template..."
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Use variables like {`{customer_name}`}, {`{order_id}`}, {`{product_name}`} in your script
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    onClick={handleSaveVoiceSettings}
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            )}

            {/* Integrations Tab */}
            {activeTab === 'integrations' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Integrations</h2>
                <GoogleSheetsManager />
              </div>
            )}

            {/* API Keys Tab */}
            {activeTab === 'api' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">API Configuration</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ElevenLabs API Key
                    </label>
                    <input
                      type="password"
                      value={apiSettings.elevenLabsApiKey}
                      onChange={(e) => setApiSettings({ ...apiSettings, elevenLabsApiKey: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your ElevenLabs API key"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Twilio Account SID
                    </label>
                    <input
                      type="text"
                      value={apiSettings.twilioAccountSid}
                      onChange={(e) => setApiSettings({ ...apiSettings, twilioAccountSid: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your Twilio Account SID"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Twilio Auth Token
                    </label>
                    <input
                      type="password"
                      value={apiSettings.twilioAuthToken}
                      onChange={(e) => setApiSettings({ ...apiSettings, twilioAuthToken: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your Twilio Auth Token"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Twilio Phone Number
                    </label>
                    <input
                      type="tel"
                      value={apiSettings.twilioPhoneNumber}
                      onChange={(e) => setApiSettings({ ...apiSettings, twilioPhoneNumber: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+1234567890"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    onClick={handleSaveApiSettings}
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            )}

            {/* Billing Tab */}
            {activeTab === 'billing' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Billing & Subscription</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Current Plan: Professional</h3>
                  <p className="text-blue-700">$99/month - Up to 1,000 calls per month</p>
                  <p className="text-sm text-blue-600 mt-2">Next billing date: January 15, 2024</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Usage This Month</h4>
                      <p className="text-sm text-gray-600">342 of 1,000 calls used</p>
                    </div>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full w-1/3"></div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                      Upgrade Plan
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50">
                      View Invoices
                    </button>
                    <button className="border border-red-300 text-red-700 px-6 py-2 rounded-lg hover:bg-red-50">
                      Cancel Subscription
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

