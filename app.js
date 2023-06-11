const loadBillionaires = async () => {
  const url = `https://forbes400.onrender.com/api/forbes400?limit=10`;
  const res = await fetch(url);
  const data = await res.json();
  displayBillionaires(data);
};

const displayBillionaires = (richMen) => {
  const billionContainer = document.getElementById("dollarContainer");
  console.log(richMen);
  richMen.forEach((richMan) => {
    const billionaireDiv = document.createElement("div");
    billionaireDiv.classList.add("col-md-4", "mb-3");
    billionaireDiv.innerHTML = `
        <div class="card h-100" style="background-color: #0E1B34; color: white;">
        <h4 class="card-title text-center my-3">${richMan.personName}</h4>
          <div class="row g-3">
            <div class="col-md-6 p-4">
              <img src="${
                richMan.squareImage
              }" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-6">
              <div class="card-body">
                <h6 class="card-text">Citizenship: ${
                  richMan.countryOfCitizenship
                }</h6>
                <h6 class="card-text">State: ${richMan.state}</h6>
                <h6 class="card-text">City: ${richMan.city}</h6>
                <h6 class="card-text">Total Share: ${
                  richMan.financialAssets[0].numberOfShares
                }</h6>
                <h6 class="card-text">Share Price: ${richMan.financialAssets[0].sharePrice.toFixed(
                  2
                )}</h6>
              </div>
            </div>
          </div>
        </div>
      `;
    billionContainer.appendChild(billionaireDiv);
  });
};

loadBillionaires();
