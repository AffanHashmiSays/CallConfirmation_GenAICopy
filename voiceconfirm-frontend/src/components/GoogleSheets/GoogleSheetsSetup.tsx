import React, { useState } from 'react';
import { 
  DocumentTextIcon, 
  CloudArrowUpIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';
import { apiService } from '../../services/api';

interface GoogleSheetsSetupProps {
  onSetupComplete: (data: any) => void;
  onClose: () => void;
}

const GoogleSheetsSetup: React.FC<GoogleSheetsSetupProps> = ({ onSetupComplete, onClose }) => {
  const [step, setStep] = useState(1);
  const [credentialsType, setCredentialsType] = useState<'service_account' | 'oauth2'>('service_account');
  const [credentialsData, setCredentialsData] = useState('');
  const [spreadsheetTitle, setSpreadsheetTitle] = useState('VoiceConfirm Orders');
  const [existingSpreadsheetId, setExistingSpreadsheetId] = useState('');
  const [useExisting, setUseExisting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          JSON.parse(content); // Validate JSON
          setCredentialsData(content);
          setError('');
        } catch (err) {
          setError('Invalid JSON file. Please upload a valid credentials file.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleSetup = async () => {
    if (!credentialsData.trim()) {
      setError('Please provide credentials data');
      return;
    }

    if (useExisting && !existingSpreadsheetId.trim()) {
      setError('Please provide the existing spreadsheet ID');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await apiService.post('/integrations/google-sheets/setup', {
        credentials_type: credentialsType,
        credentials_data: credentialsData,
        spreadsheet_title: useExisting ? undefined : spreadsheetTitle,
        existing_spreadsheet_id: useExisting ? existingSpreadsheetId : undefined
      });

      if (response.data.success) {
        onSetupComplete(response.data);
      } else {
        setError(response.data.message || 'Setup failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to set up Google Sheets integration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Google Sheets Integration</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center mb-8">
          <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              1
            </div>
            <span className="ml-2 font-medium">Credentials</span>
          </div>
          <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              2
            </div>
            <span className="ml-2 font-medium">Spreadsheet</span>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-2" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Step 1: Google Credentials</h3>
              <p className="text-gray-600 mb-4">
                To integrate with Google Sheets, you need to provide Google API credentials. 
                You can use either a Service Account or OAuth2 credentials.
              </p>
            </div>

            {/* Credentials Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Credentials Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setCredentialsType('service_account')}
                  className={`p-4 border rounded-lg text-left ${
                    credentialsType === 'service_account'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-medium">Service Account</div>
                  <div className="text-sm text-gray-600">Recommended for server-to-server access</div>
                </button>
                <button
                  onClick={() => setCredentialsType('oauth2')}
                  className={`p-4 border rounded-lg text-left ${
                    credentialsType === 'oauth2'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-medium">OAuth2</div>
                  <div className="text-sm text-gray-600">For user-authorized access</div>
                </button>
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Credentials File
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <CloudArrowUpIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <div className="text-sm text-gray-600 mb-2">
                  Upload your Google credentials JSON file
                </div>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="credentials-file"
                />
                <label
                  htmlFor="credentials-file"
                  className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Choose File
                </label>
              </div>
            </div>

            {/* Manual Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Or Paste Credentials JSON
              </label>
              <textarea
                value={credentialsData}
                onChange={(e) => setCredentialsData(e.target.value)}
                placeholder="Paste your Google credentials JSON here..."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setStep(2)}
                disabled={!credentialsData.trim()}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Step 2: Spreadsheet Setup</h3>
              <p className="text-gray-600 mb-4">
                Choose whether to create a new spreadsheet or use an existing one.
              </p>
            </div>

            {/* Spreadsheet Option */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Spreadsheet Option
              </label>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={!useExisting}
                    onChange={() => setUseExisting(false)}
                    className="mr-3"
                  />
                  <span>Create new spreadsheet</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={useExisting}
                    onChange={() => setUseExisting(true)}
                    className="mr-3"
                  />
                  <span>Use existing spreadsheet</span>
                </label>
              </div>
            </div>

            {!useExisting ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Spreadsheet Title
                </label>
                <input
                  type="text"
                  value={spreadsheetTitle}
                  onChange={(e) => setSpreadsheetTitle(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter spreadsheet title"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Existing Spreadsheet ID
                </label>
                <input
                  type="text"
                  value={existingSpreadsheetId}
                  onChange={(e) => setExistingSpreadsheetId(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter spreadsheet ID from URL"
                />
                <p className="text-sm text-gray-500 mt-1">
                  You can find the spreadsheet ID in the URL: 
                  https://docs.google.com/spreadsheets/d/<strong>SPREADSHEET_ID</strong>/edit
                </p>
              </div>
            )}

            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
              >
                Back
              </button>
              <button
                onClick={handleSetup}
                disabled={loading || (!useExisting && !spreadsheetTitle.trim()) || (useExisting && !existingSpreadsheetId.trim())}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Setting up...
                  </>
                ) : (
                  <>
                    <CheckCircleIcon className="h-4 w-4 mr-2" />
                    Complete Setup
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Need Help?</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>• For Service Account: Create a service account in Google Cloud Console</p>
            <p>• For OAuth2: Set up OAuth2 credentials in Google Cloud Console</p>
            <p>• Make sure to enable the Google Sheets API</p>
            <p>• Grant necessary permissions to access spreadsheets</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleSheetsSetup;

