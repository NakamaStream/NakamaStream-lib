const axios = require('axios');

/**
 * AnimesAll - A class for interacting with the Nakamastream API to fetch and manage anime data.
 * 
 * This class provides methods to fetch, search, and cache anime data from the Nakamastream API.
 * It includes rate limiting functionality to prevent API abuse and caching mechanisms for
 * efficient data retrieval.
 * 
 * @class
 */
class AnimesAll {
  /**
   * Creates an instance of AnimesAll.
   * 
   * @param {string} [baseUrl='https://nakamastream.lat/api'] - The base URL of the Nakamastream API.
   * @param {number} [rateLimit=60000] - Rate limit for API requests in milliseconds (default: 1 minute).
   */
  constructor(baseUrl = 'https://nakamastream.lat/api', rateLimit = 60000) {
    this.baseUrl = baseUrl;
    
    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: 5000,
    });

    this.lastFetchTime = 0;
    this.rateLimit = rateLimit;
    this.cachedAnimes = null;
  }

  /**
   * Fetches the complete list of animes from the API.
   * This method is rate-limited and will throw an error if called too frequently.
   *
   * @async
   * @returns {Promise<Object[]>} A promise that resolves to an array of anime objects.
   * @throws {Error} If the rate limit is exceeded or if the API request fails.
   * 
   * @example
   * try {
   *   const animes = await animesAll.fetchAllAnimes();
   *   console.log(animes);
   * } catch (error) {
   *   console.error(error.message);
   * }
   */
  async fetchAllAnimes() {
    const now = Date.now();

    if (now - this.lastFetchTime < this.rateLimit) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    try {
      const { data: animes } = await this.client.get('/animes');
      this.lastFetchTime = Date.now();
      this.cachedAnimes = animes;
      return animes;
    } catch (error) {
      console.error('Error fetching animes:', error);
      throw new Error('Failed to fetch animes');
    }
  }

  /**
   * Searches for animes by title in the cached data.
   * Returns an empty array if no cache is available.
   * 
   * @param {string} query - The search term to filter animes by title.
   * @returns {Object[]} An array of anime objects that match the search term.
   * 
   * @example
   * const results = animesAll.searchAnimes('Naruto');
   */
  searchAnimes(query) {
    if (!this.cachedAnimes) {
      return [];
    }

    const searchTerm = query.toLowerCase();
    return this.cachedAnimes.filter(anime => 
      anime.title.toLowerCase().includes(searchTerm)
    );
  }

  /**
   * Retrieves the cached anime data without making a new API request.
   * 
   * @returns {Object[]|null} The cached array of anime objects or null if no cache exists.
   * 
   * @example
   * const cachedData = animesAll.getCachedAnimes();
   * if (cachedData) {
   *   console.log('Using cached data:', cachedData);
   * }
   */
  getCachedAnimes() {
    return this.cachedAnimes;
  }
}

module.exports = AnimesAll; 
