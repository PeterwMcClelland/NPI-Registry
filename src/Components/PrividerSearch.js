
import React, { useState } from 'react';


function ProviderSearch() {
  const [results, setResults] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();
  
    const formData = new FormData(event.target);
  
    const queryParams = new URLSearchParams(formData).toString();
  
    const response = await fetch('http://localhost:3000/providers?' + queryParams);
  
    if (response.ok) {
      const data = await response.json();

      setResults(data.slice(0, 50));

    } else {
      const errorText = await response.text();
      console.error(`HTTP ${response.status} - ${errorText}`);
      setResults([]);
      
    }
  }
  

  return (
    <div className='form'>
      <h1 className='header'>Healthcare Provider Search</h1>
      <form className='form-inputs' onSubmit={handleSubmit}>
        <label htmlFor="first-name">First Name:</label>
        <input type="text" id="first-name" name="firstName" /><br />

        <label htmlFor="last-name">Last Name:</label>
        <input type="text" id="last-name" name="lastName" /><br />

        <label htmlFor="npi-number">NPI Number:</label>
        <input type="text" id="npi-number" name="npiNumber" /><br />

        <label htmlFor="taxonomy-description">Taxonomy Description:</label>
        <input type="text" id="taxonomy-description" name="taxonomyDescription" /><br />

        <label htmlFor="city">City:</label>
        <input type="text" id="city" name="city" /><br />

        <label htmlFor="state">State:</label>
        <input type="text" id="state" name="state" /><br />

        <label htmlFor="zip">ZIP Code:</label>
        <input type="text" id="zip" name="zip" /><br />

        <button type="submit">Search</button>
      </form>
       
      {results.length > 0 ? (
        <div>
          <p>Showing up to {results.length} Providers:</p>
          {results.map((provider) => (
            <div className='inputs' key={provider.number}>
              <h2>{provider.basic.first_name} {provider.basic.last_name}</h2>
              <p><strong>NPI Number:</strong> {provider.number}</p>
              {provider.taxonomy && provider.taxonomy.length > 0 && (
              <p><strong>Taxonomy Description:</strong> {provider.taxonomy[0].desc}</p>
              )}
              <p className='address'><strong>Address:</strong> {provider.addresses[0].address_1}, {provider.addresses[0].city}, {provider.addresses[0].state} {provider.addresses[0].postal_code}</p>
            </div>
          ))}
          
            <button onClick>Load 50 More Providers</button>
    
        </div>
      ) : (
        <p>No providers found.</p>
      )}
    </div>
  );
}

export default ProviderSearch;