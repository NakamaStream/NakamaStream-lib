const axios = require('axios');

/**
 * Class to interact with the Nakamastream API for captcha generation.
 *
 * This class provides methods to retrieve a new captcha from the Nakamastream API.
 */
class CaptchaService {
  /**
   * Creates an instance of CaptchaService.
   * 
   * @param {string} [baseUrl='https://nakamastream.lat/api'] - The base URL for the API.
   * @param {number} [timeout=5000] - The timeout for requests in milliseconds (default is 5000).
   * @param {number} [maxRequestsPerMinute=60] - The maximum number of requests allowed per minute.
   */
  constructor(baseUrl = 'https://nakamastream.lat/api', timeout = 5000, maxRequestsPerMinute = 60) {
    this.baseUrl = baseUrl;
    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: timeout,
    });

    this.maxRequestsPerMinute = maxRequestsPerMinute;
    this.requestCount = 0;
    this.resetTimer();
  }

  resetTimer() {
    // Reset the request count every minute
    setInterval(() => {
      this.requestCount = 0;
    }, 60000);
  }

  /**
   * Fetches a new captcha from the API.
   *
   * This method makes an HTTP GET request to the '/auth/new-captcha' endpoint of the API to 
   * retrieve a new captcha image or data.
   *
   * @returns {Promise<Object>} - A promise that resolves to the captcha data.
   * @throws {Error} - Throws an error if unable to fetch the new captcha.
   * 
   * @example
   * const captcha = await captchaService.getNewCaptcha();
   */
  async getNewCaptcha() {
    if (this.requestCount >= this.maxRequestsPerMinute) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    try {
      const { data: captchaData } = await this.client.get('/auth/new-captcha');
      this.requestCount++; // Increment the request count after a successful request
      return captchaData; // Returns the captcha data
    } catch (error) {
      this.handleApiError(error);
    }
  }

  /**
   * Handles errors from API requests.
   * 
   * @param {Error} error - The error object thrown during the request.
   * @throws {Error} - Throws a more descriptive error based on the response.
   */
  handleApiError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('API error:', error.response.data);
      throw new Error(`API error: ${error.response.data.message || 'Unknown error'}`);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      throw new Error('No response received from the API. Please check your network connection.');
    } else {
      // Something happened in setting up the request
      console.error('Error in request setup:', error.message);
      throw new Error('Error in setting up the API request. Please try again.');
    }
  }
}

module.exports = CaptchaService; // Exports the CaptchaService class for use in other modules
