const countriesContainer = document.querySelector('.countries');
const searchInput = document.getElementById('search');
const regionFilter = document.getElementById('region-filter');

let allCountries = [];

fetch('https://restcountries.com/v3.1/all')
  .then(response => response.json())
  .then(data => {
    allCountries = data;
    displayCountries(allCountries);
  })
  .catch(error => {
    console.error('Error fetching countries:', error);
    countriesContainer.innerHTML = '<p>Failed to load countries.</p>';
  });

function displayCountries(countries) {
  countriesContainer.innerHTML = '';
  countries.forEach(country => {
    const card = document.createElement('article');
    card.classList.add('country-card');
    card.innerHTML = `
      <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" />
      <div class="card-content">
        <h2>${country.name.common}</h2>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
      </div>
    `;

    card.addEventListener('click', () => {
      const selectedCountry = {
        name: country.name.common,
        nativeName: Object.values(country.name.nativeName || {})[0]?.common || country.name.common,
        population: country.population.toLocaleString(),
        region: country.region,
        capital: country.capital ? country.capital[0] : 'N/A',
        flag: country.flags.svg,
        domain: country.tld ? country.tld[0] : 'N/A',
        currency: country.currencies ? Object.values(country.currencies)[0].name : 'N/A',
        language: country.languages ? Object.values(country.languages)[0] : 'N/A',
        borders: country.borders || []
      };
      localStorage.setItem('selectedCountry', JSON.stringify(selectedCountry));
      window.location.href = 'detail.html';
    });

    countriesContainer.appendChild(card);
  });
}

searchInput.addEventListener('input', e => {
  const query = e.target.value.toLowerCase();
  const filteredCountries = allCountries.filter(country =>
    country.name.common.toLowerCase().includes(query)
  );
  displayCountries(filteredCountries);
});

regionFilter.addEventListener('change', e => {
  const region = e.target.value;
  const filteredCountries = region
    ? allCountries.filter(country => country.region === region)
    : allCountries;

  displayCountries(filteredCountries);
});




// Get the toggle button
const toggleBtn = document.getElementById('theme-toggle');

// When user clicks the button
toggleBtn.addEventListener('click', () => {
  // Toggle dark mode class on body
  document.body.classList.toggle('dark-mode');

  // Check if dark mode is active
  const isDark = document.body.classList.contains('dark-mode');

  // Save mode in localStorage
  localStorage.setItem('mode', isDark ? 'dark' : 'light');

  // Update the button text
  toggleBtn.textContent = isDark ? 'Light Mode' : 'Dark Mode';
});

// When page loads
window.addEventListener('DOMContentLoaded', () => {
  const savedMode = localStorage.getItem('mode');

  // If dark mode was saved, apply it and update the button text
  if (savedMode === 'dark') {
    document.body.classList.add('dark-mode');
    toggleBtn.textContent = 'Light Mode';
  } else {
    toggleBtn.textContent = 'Dark Mode';
  }
});
