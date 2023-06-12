const spinnerIcon = document.getElementById("spinner");
const loadMoreButton = document.getElementById("Load-More");
const billionContainer = document.getElementById("dollarContainer");

// Show spinner
const showSpinner = () => {
  spinnerIcon.classList.remove("d-none");
};

// Hide spinner
const hideSpinner = () => {
  spinnerIcon.classList.add("d-none");
};

// Calculate total share and share price
const calculateValues = (financialAssets) => {
  if (!financialAssets) {
    // return statement is an object. Which holds two properties named totalShare and sharePrice and their assigned values.
    return {
      totalShare: 0,
      sharePrice: 0,
    };
  }
  const totalShare = financialAssets.reduce(
    (sum, asset) => sum + asset.numberOfShares,
    0
  );
  const sharePrice = financialAssets.reduce(
    (total, asset) => total + asset.numberOfShares * asset.sharePrice,
    0
  );
  const totalShareMillion = totalShare / 1e6;
  const sharePriceBillion = sharePrice / 1e9;
  return {
    totalShare: totalShareMillion,
    sharePrice: sharePriceBillion,
  };
};

// Create a card element for a billionaire
const createBillionaireCard = (billionaire) => {
  const billionaireDiv = document.createElement("div");
  billionaireDiv.classList.add("col-md-4", "mb-3");
  // object destructuring to assign the values returned by the calculateValues function to the
  // variables totalShare and sharePrice.
  const { totalShare, sharePrice } = calculateValues(
    billionaire.financialAssets
  );
  billionaireDiv.innerHTML = `
    <div class="card h-100" style="background-color: #0E1B34; color: white;">
      <h4 class="card-title text-center my-3">${billionaire.personName}</h4>
      <div class="row g-3">
        <div class="col-md-6 p-4">
          <img src="${
            billionaire.squareImage
          }" class="img-fluid rounded-start" alt="Billionaire Image" onerror="this.src='https://specials-images.forbesimg.com/imageserve/6050f48ca1ab099ed6e290cc/416x416.jpg?background=000000&cropX1=0&cropX2=800&cropY1=0&cropY2=800';">
        </div>
        <div class="col-md-6">
          <div class="card-body">
            <h6 class="card-text">Citizenship: ${
              billionaire.countryOfCitizenship
            }</h6>
            <h6 class="card-text">State: ${
              billionaire.state ? billionaire.state : "Not Found"
            }</h6>
            <h6 class="card-text">City: ${billionaire.city}</h6>
            <h6 class="card-text">Total Share: ${totalShare.toFixed(2)}M</h6>
            <h6 class="card-text">Share Price: ${sharePrice.toFixed(2)}B</h6>
          </div>
        </div>
      </div>
    </div>
  `;
  return billionaireDiv;
};

// Display billionaires
const displayBillionaires = (richMen) => {
  richMen.forEach((richMan) => {
    const billionaireDiv = createBillionaireCard(richMan);
    billionContainer.appendChild(billionaireDiv);
  });
  setupLoadMoreButton();
};

// loading initial first 10
const loadBillionaires = async () => {
  const url = `https://forbes400.onrender.com/api/forbes400?limit=10`;
  showSpinner();
  const res = await fetch(url);
  const data = await res.json();
  displayBillionaires(data);
  hideSpinner();
  showLoadMoreButton();
};

// Load all billionaires 400
const loadAllBillionaires = async () => {
  const url = "https://forbes400.onrender.com/api/forbes400/getAllBillionaires";
  showSpinner();

  try {
    const res = await fetch(url);
    const data = await res.json();
    displayBillionaires(data.slice(10));
    hideLoadMoreButton();
  } catch (error) {
    console.error("Error loading billionaires:", error);
  }

  hideSpinner();
};

const setupLoadMoreButton = () => {
  loadMoreButton.addEventListener("click", () => {
    loadAllBillionaires();
    hideLoadMoreButton();
  });

  showLoadMoreButton();
};

// Display all billionaires
const displayAllBillionaires = (allFourHundred) => {
  const allBillionaires = document.getElementById("allBillionaires");
  const newFourHundred = allFourHundred.slice(10);
  newFourHundred.forEach((billionaire) => {
    const allBillionaireDiv = createBillionaireCard(billionaire);
    allBillionaires.appendChild(allBillionaireDiv);
  });
};

// Show load more button
const showLoadMoreButton = () => {
  loadMoreButton.classList.remove("d-none");
};

// Hide load more button
const hideLoadMoreButton = () => {
  loadMoreButton.classList.add("d-none");
};

loadBillionaires();
