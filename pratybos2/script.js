const input = document.getElementById("countryInput");
const searchButton = document.getElementById("searchButton");
const result = document.getElementById("result");

// const getData = await fetch("https://www.apicountries.com/docs/countries.json");
// const data = await getData.json();

searchButton.addEventListener("click", async () => {
  const text = input.value;
  const response = await fetch(`https://restcountries.com/v3.1/name/${text}`);
  const data = await response.json();
  if (Array.isArray(data) && data.length > 0) {
    const countryInfo = data
      .map(
        (country) => `
        <h2>${country.name.common}</h2>
        <p>Capital: ${country.capital ? country.capital[0] : "N/A"}</p>
        <img src="${country.flags.png}" alt="Flag of ${
          country.name.common
        }" width="200"/>
      `
      )
      .join("");
    result.innerHTML = countryInfo;
  } else {
    result.innerHTML = "<p>Country not found.</p>";
  }
});
