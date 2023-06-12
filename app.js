const loadBillionaires = async () => {
  const url = `https://forbes400.onrender.com/api/forbes400?limit=10`;
  const res = await fetch(url);
  const data = await res.json();
  displayBillionaires(data);
  showLoadMoreButton();
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
const showLoadMoreButton = () => {
  const loadMoreButton = document.getElementById("Load-More");
  loadMoreButton.classList.remove("d-none");
};

loadBillionaires();
