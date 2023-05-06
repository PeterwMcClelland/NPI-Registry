const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const API_BASE_URL = 'https://npiregistry.cms.hhs.gov/api/';

app.use(cors());

app.get('/providers', async (req, res) => {
  try {
    const { firstName, lastName, npiNumber, taxonomyDescription, city, state, zip } = req.query;

    const url = `${API_BASE_URL}?version=2.1&pretty=true&limit=50`;
    console.log(url);

    const params = {
      limit: 50
    };

    if (firstName !== undefined) {
      params.first_name = firstName;
    }

    if (lastName !== undefined) {
      params.last_name = lastName;
    }

    if (npiNumber !== undefined) {
      params.number = npiNumber;
    }

    if (taxonomyDescription !== undefined) {
      params.taxonomy_description = taxonomyDescription;
    }

    if (city !== undefined) {
      params.city = city;
    }

    if (state !== undefined) {
      params.state = state;
    }

    if (zip !== undefined) {
      params.postal_code = zip;
    }

    const response = await axios.get(url, { params });

    res.json(response.data.results);
  } catch (error) {
    console.error(error);
    res.status(500).send(
      'An error occurred while processing your request.'
      );
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
}); 