const axios = require('axios');

const baseURL = 'https://api.pref.ai';
// const baseURL = 'http://127.0.0.1:8000';

class PrefaiError extends Error {
  constructor(error) {
    const code = error.response.status;
    let detail = error.response.data.detail;
    // Validation errors produce detail of the form:
    // [
    //   {
    //     loc: [ 'body', 'user_action' ],
    //     msg: 'field required',
    //     type: 'value_error.missing'
    //   }
    // ]
    if (detail[0] && detail[0].loc && detail[0].loc.length > 0) {
      detail = `${detail[0].msg}: ${detail[0].loc[1]}`;
    }
    super(`Pref.ai request failed [${code}]: ${detail}`); // Pass the message to the Error class constructor
    this.name = 'PrefaiError'; // Set the name of the error
    this.code = code;
    this.detail = detail;
  }
}

class PrefAI {
  constructor(api_key = null) {
    this.apiKey = api_key || process.env.PREFAI_API_KEY;
    if (!this.apiKey) {
      throw new Error('PREFAI_API_KEY environment variable is required');
    }

    this.client = axios.create({
      baseURL,
      // Longer timeout needed for Cloud Run coldstart.
      timeout: 10000,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      },
    });
  }

  async addRecord(record) {
    try {
      const response = await this.client.post('/v1/records/add', record);
      return response.data;
    } catch (error) {
      // console.error(`Error adding record: ${error}`);
      throw new PrefaiError(error);
    }
  }

  async retrieveRecords(record) {
    try {
      const response = await this.client.post('/v1/records/retrieve', record);
      return response.data;
    } catch (error) {
      throw new PrefaiError(error);
    }
  }

  async prefPrompt(record) {
    try {
      const response = await this.client.post('/v1/prompt/new', record);
      return response.data;
    } catch (error) {
      throw new PrefaiError(error);
    }
  }
}

module.exports = PrefAI;
