const spinnerIcon = document.getElementById("spinner");
const loadBillionaires = async () => {
  const url = `https://forbes400.onrender.com/api/forbes400?limit=10`;

  showSpinner(spinnerIcon);
  const res = await fetch(url);
  const data = await res.json();
  displayBillionaires(data);
  hideSpinner(spinnerIcon);
  showLoadMoreButton();
};

const showSpinner = (spinnerIcon) => {
  spinnerIcon.classList.remove("d-none");
};

const hideSpinner = (spinnerIcon) => {
  spinnerIcon.classList.add("d-none");
};

const displayBillionaires = (richMen) => {
  const billionContainer = document.getElementById("dollarContainer");
  richMen.forEach((richMan) => {
    const billionaireDiv = document.createElement("div");
    billionaireDiv.classList.add("col-md-4", "mb-3");
    const calculateValues = (financialAssets) => {
      if (!financialAssets) {
        return {
          totalShare: 0,
          sharePrice: 0,
        };
        // return statement is an object. Which holds two properties named totalShare and sharePrice and their assigned values.
      }
      const totalShare = financialAssets.reduce(
        (sum, asset) => sum + asset.numberOfShares,
        0
      );
      const sharePrice = financialAssets.reduce(
        (total, asset) => total + asset.numberOfShares * asset.sharePrice,
        0
      );

      // Convert to million
      const totalShareMillion = totalShare / 1e6;
      const sharePriceBillion = sharePrice / 1e9;

      return {
        totalShare: totalShareMillion,
        sharePrice: sharePriceBillion,
      };
    };
    const { totalShare, sharePrice } = calculateValues(richMan.financialAssets);
    billionaireDiv.innerHTML = `
    <div class="card h-100" style="background-color: #0E1B34; color: white;">
      <h4 class="card-title text-center my-3">${richMan.personName}</h4>
      <div class="row g-3">
      <div class="col-md-6 p-4">
      <img src="${
        richMan.squareImage
      }" class="img-fluid rounded-start" alt="Billionaire Image" onerror="this.src='https://specials-images.forbesimg.com/imageserve/6050f48ca1ab099ed6e290cc/416x416.jpg?background=000000&cropX1=0&cropX2=800&cropY1=0&cropY2=800';">
      </div>
        <div class="col-md-6">
          <div class="card-body">
          <h6 class="card-text">Citizenship: ${
            richMan.countryOfCitizenship
          }</h6>
          <h6 class="card-text">State: ${
            richMan.state ? richMan.state : "Not Found"
          }</h6>
          <h6 class="card-text">City: ${richMan.city}</h6>
          <h6 class="card-text">Total Share: ${totalShare.toFixed(2)}M</h6>
          <h6 class="card-text">Share Price: ${sharePrice.toFixed(2)}B</h6>
          </div>
        </div>
      </div>
    </div>
      `;
    billionContainer.appendChild(billionaireDiv);
  });
};

// is toggleSpinner function needed??
// const toggleSpinner = (isLoading) => {
//   const spinnerIcon = document.getElementById("spinner");
//   if (isLoading) {
//     spinnerIcon.classList.remove("d-none");
//   } else {
//     spinnerIcon.classList.add("d-none");
//   }
// };

// this function shows the loadMore button after the execution of the displayBillionaire() Function.
// visible is passed as an argument which takes boolean value true. thus it triggers the display property to block

// const toggleLoadMoreButton = (visible) => {
//   const loadMoreButton = document.getElementById("Load-More");
//   if (visible) {
//     loadMoreButton.style.display = "block";
//   } else {
//     loadMoreButton.style.display = "none";
//   }
// }

// Also i started to like use ternary operator a lot so here it goes

// const toggleLoadMoreButton = (visible) => {
//   const loadMoreButton = document.getElementById("Load-More");
//   loadMoreButton.style.display = visible ? "block" : "none";
// };

// Well it seems I dont even need to use if/else , ternary operator all those bullshit ..just use a normal function without any parameters..remove the (d-none) class & it's all good. Lmao
const loadMoreButton = document.getElementById("Load-More");
const showLoadMoreButton = () => {
  loadMoreButton.classList.remove("d-none");
};

const hideLoadMoreButton = () => {
  loadMoreButton.classList.add("d-none");
};

loadBillionaires();

const loadAllBillionaires = document
  .getElementById("Load-More")
  .addEventListener("click", function () {
    hideLoadMoreButton();
    const url = `https://forbes400.onrender.com/api/forbes400/getAllBillionaires`;
    showSpinner(spinnerIcon);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        displayAllBillionaires(data);
        hideSpinner(spinnerIcon);
      });
  });

// writing with async & await
// const loadAllBillionaires = document.getElementById("Load-More").addEventListener("click", async function () {
//   const url = `https://forbes400.onrender.com/api/forbes400/getAllBillionaires`;
//   try {
//     const res = await fetch(url);
//     const data = await res.json();
//     console.log(data);
//   } catch (error) {
//     console.error("Error loading billionaires:", error);
//   }
// });

const displayAllBillionaires = (allFourHundred) => {
  const allBillionaires = document.getElementById("allBillionaires");
  const newFourHundred = allFourHundred.slice(10);
  newFourHundred.forEach((billionaire) => {
    const allBillionaireDiv = document.createElement("div");
    allBillionaireDiv.classList.add("col-md-4", "mb-3");
    const calculateValues = (financialAssets) => {
      if (!financialAssets) {
        return {
          totalShare: 0,
          sharePrice: 0,
        };
        // return statement is an object. Which holds two properties named totalShare and sharePrice and their assigned values.
      }
      const totalShare = financialAssets.reduce(
        (sum, asset) => sum + asset.numberOfShares,
        0
      );
      const sharePrice = financialAssets.reduce(
        (total, asset) => total + asset.numberOfShares * asset.sharePrice,
        0
      );

      // Convert to million
      const totalShareMillion = totalShare / 1e6;
      const sharePriceBillion = sharePrice / 1e9;

      return {
        totalShare: totalShareMillion,
        sharePrice: sharePriceBillion,
      };
    };

    // object destructuring to assign the values returned by the calculateValues function to the variables totalShare and sharePrice.
    const { totalShare, sharePrice } = calculateValues(
      billionaire.financialAssets
    );

    allBillionaireDiv.innerHTML = `
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
    allBillionaires.appendChild(allBillionaireDiv);
  });
};
