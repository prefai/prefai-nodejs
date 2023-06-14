
# PrefAI Node.js Library

The PrefAI Node.js Library enables applications coded in node.js to interface with the PrefAI API.

It is not recommended to use this on a web client, as it would leak your API key.

## Installation

Install with:

```bash
npm install prefai
```

## Usage

The library needs an API key, which you get on your [pref.ai developer account](https://pref.ai/dev/account/keys).

```bash
export PREFAI_API_KEY=<YOUR_SECRET_KEY>
```

We can now add a user record like this:

```js
const PrefAI = require('prefai');

const apiKey = process.env.PREFAI_API_KEY;
const prefaiClient = new PrefAI(apiKey);

// Add record
prefaiClient.addRecord({
  user_email: "test@pref.ai",
  user_action: "What's a spicy appetizer you'd recommend for a BBQ with 6 people?",
});
```

For more information and next steps, read the [quickstart](https://pref.ai/dev/docs/quickstart).
