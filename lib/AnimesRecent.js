const axios = require('axios');

/**
 * Class to interact with the Nakamastream API for fetching recent animes.
 *
 * This class provides methods to retrieve a list of recent animes from the Nakamastream API,
 * enforcing rate limits to manage the frequency of requests and keeping track of the last 
 * uploaded anime for comparison.
 */
class AnimesRecent {
  /**
   * Creates an instance of AnimesRecent.
   * 
   * @param {string} [baseUrl='https://nakamastream.lat/api'] - The base URL for the API.
   * @param {number} [rateLimit=60000] - The rate limit for requests in milliseconds (default is 60 seconds).
   */
  constructor(baseUrl = 'https://nakamastream.lat/api', rateLimit = 60000) {
    /**
     * The base URL for the API used for making requests.
     * @type {string}
     */
    this.baseUrl = baseUrl;

    /**
     * Axios instance configured with the base URL and a timeout.
     * @type {Object}
     */
    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: 5000, // Sets a timeout of 5000 milliseconds for requests
    });

    /**
     * Stores the last uploaded anime object for comparison with fetched results.
     * @type {Object|null}
     */
    this.lastUploadedAnime = null;

    /**
     * Timestamp of the last fetch operation.
     * @type {number}
     */
    this.lastFetchTime = 0;

    /**
     * The rate limit for API requests in milliseconds.
     * @type {number}
     */
    this.rateLimit = rateLimit;
  }

  /**
   * Fetches recent animes from the API with rate limiting.
   *
   * This method makes an HTTP GET request to the '/recent-animes' endpoint of the API to 
   * retrieve a list of recently uploaded animes. It ensures that requests are not made 
   * more frequently than the defined rate limit.
   *
   * @returns {Promise<Object[]>} - A promise that resolves to an array of recent animes.
   * @throws {Error} - Throws an error if unable to fetch recent animes or if the rate limit is exceeded.
   * 
   * @example
   * const animes = await animesRecent.fetchRecentAnimes();
   */
  async fetchRecentAnimes() {
    const now = Date.now();

    // Check if the rate limit has been exceeded
    if (now - this.lastFetchTime < this.rateLimit) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    try {
      const { data: recentAnimes } = await this.client.get('/recent-animes');
      this.lastFetchTime = Date.now(); // Update last fetch time

      // Check if there is a new anime at the beginning of the list
      if (recentAnimes.length > 0) {
        const currentLatestAnime = recentAnimes[0];

        // Update lastUploadedAnime if it's different from the current latest
        if (!this.lastUploadedAnime || currentLatestAnime.id !== this.lastUploadedAnime.id) {
          this.lastUploadedAnime = currentLatestAnime; // Updates the last uploaded anime
        }
      }

      return recentAnimes; // Returns the list of recent animes
    } catch (error) {
      console.error('Error fetching recent animes:', error);
      throw new Error('Unable to fetch recent animes'); // Throws an error if the fetch fails
    }
  }

  /**
   * Retrieves the most recently uploaded anime if it's new.
   *
   * This method checks if there has been a new anime uploaded since the last fetch and
   * returns the details of that anime. If no new anime has been uploaded, it returns null.
   *
   * @returns {Object|null} - Information of the last uploaded anime, or null if there's no new anime.
   * 
   * @example
   * const lastAnime = animesRecent.getMostRecentUploadedAnime();
   */
  getMostRecentUploadedAnime() {
    return this.lastUploadedAnime; // Returns the last uploaded anime
  }
}

module.exports = AnimesRecent; // Exports the AnimesRecent class for use in other modules
