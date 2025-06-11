
const data = JSON.parse(localStorage.getItem('selectedCountry'));


if (!data) {
  document.body.innerHTML = '<p>Country data not found. Go back to the home page.</p>';
  throw new Error('No country data found');
}


document.querySelector('.flag').src = data.flag;
document.querySelector('.flag').alt = `Flag of ${data.name}`;
document.querySelector('.country-name').textContent = data.name;
document.querySelector('.native-name').textContent = data.nativeName;
document.querySelector('.population').textContent = data.population;
document.querySelector('.region').textContent = data.region;
document.querySelector('.capital').textContent = data.capital;
document.querySelector('.domain').textContent = data.domain;
document.querySelector('.currency').textContent = data.currency;
document.querySelector('.language').textContent = data.language;


const borderList = document.querySelector('.border-list');


if (data.borders.length > 0) {
  data.borders.forEach(borderCode => {
    const li = document.createElement('li');
    li.textContent = borderCode; 
    borderList.appendChild(li);
  });
} else {
  borderList.innerHTML = '<li>No border countries</li>';
}


document.getElementById('back-btn').addEventListener('click', () => {
  window.location.href = 'index.html'; 
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
