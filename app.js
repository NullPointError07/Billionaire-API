const loadBillionaires = async () => {
  const url = `https://forbes400.onrender.com/api/forbes400?limit=10`;
  const spinnerIcon = document.getElementById("spinner");
  spinnerIcon.classList.remove("d-none");
  const res = await fetch(url);
  const data = await res.json();
  displayBillionaires(data);
  // toggleSpinner(true);
  showLoadMoreButton(spinnerIcon);
};

const displayBillionaires = (richMen) => {
  const billionContainer = document.getElementById("dollarContainer");
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
const showLoadMoreButton = (spinnerIcon) => {
  spinnerIcon.classList.add("d-none");
  const loadMoreButton = document.getElementById("Load-More");
  loadMoreButton.classList.remove("d-none");
};

loadBillionaires();

const loadAllBillionaires = document
  .getElementById("Load-More")
  .addEventListener("click", function () {
    const url = `https://forbes400.onrender.com/api/forbes400/getAllBillionaires`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayAllBillionaires(data));
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
  // console.log(allFourHundred);
  allFourHundred.forEach((billionaire) => {
    const allBillionaireDiv = document.createElement("div");
    allBillionaireDiv.classList.add("col-md-4", "mb-3");
    // const image = billionaire.squareImage
    //   ? billionaire.squareImage
    //   : (onerror = "this.src='images/placeholder.jpg'");
    const totalShare = (financialAssets) => {
      if (!financialAssets) {
        return 0;
      }

      const total = financialAssets.reduce(
        (sum, asset) => sum + asset.numberOfShares,
        0
      );

      // Convert to million
      const million = total / 1e6;

      return million;
    };

    const sharePrice = (financialAssets) => {
      if (!financialAssets) {
        return 0;
      }

      const total = financialAssets.reduce(
        (total, asset) => total + asset.numberOfShares * asset.sharePrice,
        0
      );
      // Convert to million
      const billion = total / 1e9;

      return billion;
    };
    // const sharePrice = billionaire.financialAssets
    //   ? billionaire.financialAssets.reduce(
    //       (total, asset) => total + asset.numberOfShares * asset.sharePrice,
    //       0
    //     )
    //   : 0;
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
            <h6 class="card-text">Total Share: ${totalShare(
              billionaire.financialAssets
            ).toFixed(2)}M</h6>
            <h6 class="card-text">Share Price: ${sharePrice(
              billionaire.financialAssets
            ).toFixed(2)}B</h6>
          </div>
        </div>
      </div>
    </div>
    `;
    allBillionaires.appendChild(allBillionaireDiv);
  });
};

// const counter = allFourHundred => {
//   let count =0;
//   allFourHundred.forEach((billionaire) => {
//     if(!billionaire.squareImage) {
//       count++
//     }
//   })
//   console.log(count);
// }
