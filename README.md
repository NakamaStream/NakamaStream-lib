<h1 align="center">NakamaStream Lib</h1>

<p align="center">
  <a href="https://nakamastream.domcloud.dev" target="_blank">
    <img src="https://github.com/NakamaStream/Resources/blob/main/NakamStream-logo-HD-removebg.png?raw=true" alt="Logo" width="200"/>
  </a>
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black"/></a>
  <a href="#"><img src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white"/></a>
</p>

## Description

**NakamaStream Lib** is a library created by NakamaStream to facilitate the integration of our services and APIs into your projects. This tool allows you to access essential functionalities quickly and easily.

## Features

- **Easy Use of the Library:** Intuitive access to the functions and services you need.
- **Quick Integration:** Access multiple services through a single library.
- **Comprehensive Documentation:** Guides and examples to help you get started quickly.

## Installation

To install NakamaStream Lib, simply use npm:

```bash
npm install nakamastream-lib
```

## Current Modules

The following modules are currently available in NakamaStream Lib:

```javascript
const AnimesRecent = require('./lib/AnimesRecent');
const CaptchaService = require('./lib/auth/CaptchaService');

module.exports = {
  AnimesRecent,
  CaptchaService
};
```

# AnimesRecent

## Methods

### `fetchRecentAnimes()`

- **Description**: 
  Performs a GET request to the API to retrieve a list of recent animes. This function adheres to a defined rate limit, ensuring that requests to the API are not made more frequently than allowed.

- **Returns**: 
  A promise that resolves to an array of objects representing the recent animes.

- **Errors**: 
  Throws an error if the rate limit is exceeded or if there is an issue fetching the animes.

- **Example**:
  ```javascript
  const recentAnimes = await animesRecent.fetchRecentAnimes();
  console.log(recentAnimes);
   ```

### getMostRecentUploadedAnime()

- **Description**:
 Retrieves information about the last uploaded anime, if there has been a new one since the last fetch.

- **Returns**:
 An object containing information about the last uploaded anime or null if there are no new animes.

- **Example**:
  ```javascript
  const lastAnime = animesRecent.getMostRecentUploadedAnime();
  console.log(lastAnime);
  ```

# AnimesAll

## Methods

### `fetchAllAnimes()`

- **Description**: 
  Performs a GET request to the API to retrieve the complete list of animes. This method adheres to a defined rate limit to prevent too frequent requests to the API.

- **Returns**: 
  A promise that resolves to an array of objects representing all animes.

- **Errors**: 
  Throws an error if the rate limit is exceeded or if there is an issue fetching the animes.

- **Example**:
  ```javascript
  try {
    const allAnimes = await animesAll.fetchAllAnimes();
    console.log(allAnimes);
  } catch (error) {
    console.error(error.message);
  }
  ```

### `searchAnimes(query)`

- **Description**:
  Searches for animes by title in the cached data.

- **Parameters**:
  - `query` (string): The search term to filter animes by title.

- **Returns**:
  An array of anime objects that match the search term. Returns an empty array if no cache is available.

- **Example**:
  ```javascript
  const results = animesAll.searchAnimes('Death Note');
  console.log(results);
  ```

### `getCachedAnimes()`

- **Description**:
  Retrieves the cached anime data without making a new API request.

- **Returns**:
  The cached array of anime objects or null if no cache exists.

- **Example**:
  ```javascript
  const cachedData = animesAll.getCachedAnimes();
  if (cachedData) {
    console.log('Using cached data:', cachedData);
  }
  ```

# CaptchaService

## Methods

### `getNewCaptcha()`

Fetches a new captcha from the API.

**Returns:** `Promise<Object>` - A promise that resolves to the captcha data.

**Example:**

```javascript
try {
    const captcha = await captchaService.getNewCaptcha();
    console.log('Captcha obtained:', captcha);
} catch (error) {
    console.error('Error fetching captcha:', error.message);
}
```

### `handleApiError(error)`

Handles errors from API requests.

- **Parameters**:
  - `error` `(Error)`: The error object thrown during the request.
  - **Throws:** Throws a more descriptive error based on the response.

- **Example**:
  This method is called internally within `getNewCaptcha()` and does not need to be called directly.


<div style="text-align: left;">
    <img src="https://github.com/user-attachments/assets/f0fd18c8-5084-4078-9aca-4cd5e7b115a0" alt="Nker" width="500" style="float: left; margin-right: 10px;" />
</div>
