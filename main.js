const mainContent = document.querySelectorAll(".main-content-data");
const nextBtn = document.querySelector(".next-btn");
const backBtn = document.querySelector(".back-btn");
const pageNumbers = document.querySelectorAll(".numbered-items-numbering");
const buttons = document.querySelector(".buttons");
const inputFields = document.querySelectorAll(".info-form input");
const inputLabels = document.querySelectorAll(".info-form label");
const planChoices = document.querySelectorAll(".choice-data");
const planPrice = document.querySelectorAll(".plan-details p");
const planDetails = document.querySelectorAll(".plan-details");
const optionDuration = document.querySelectorAll(".option-duration");
const finalPlan = document.querySelector(".final-plan span");
const finalPlanPrice = document.querySelector(".final-plan p");
const finalAddons = document.querySelectorAll(".final-add-ons");
const finalAddonsPrices = document.querySelectorAll(".final-add-ons p");
const totalPrice = document.querySelector(".total-price span");
const totalPriceDuration = document.querySelector(".total-price p");
const changePlan = document.querySelector(".change-plan");

let currentPage = 0;
const totalPages = 5;
let monthly = true;
let mainPlanPrice = 0;
const plans = ["Arcade", "Advanced", "Pro"];
const monthlyPrices = [9, 12, 15];
const yearlyPrices = [90, 120, 150];
const monthlyAddons = [1, 2, 2];
const yearlyAddons = [10, 20, 20];
let selectedDivIndex = null;
const addOns = [false, false, false];

mainContent[currentPage].classList.add("show");
pageNumbers[currentPage].classList.add("active");

// Handler for next button click
nextBtn.onclick = function () {
  if (currentPage < totalPages - 1) {
    switch (currentPage) {
      case 0:
        const check = checkInfo();
        if (!check) {
          return;
        }
        break;

      case 1:
        updateOptionDurationText();
        break;

      case 2:
        updateFinalPlanInfo();
        break;
    }

    mainContent[currentPage].classList.remove("show");
    pageNumbers[currentPage].classList.remove("active");
    currentPage++;
    mainContent[currentPage].classList.add("show");

    if (currentPage === totalPages - 1) {
      buttons.style.display = "none";
      console.log("test");
    } else {
      pageNumbers[currentPage].classList.add("active");
    }
  }
};

// Handler for back button click
backBtn.onclick = function () {
  if (currentPage !== 0) {
    mainContent[currentPage].classList.remove("show");
    pageNumbers[currentPage].classList.remove("active");
    currentPage--;
    mainContent[currentPage].classList.add("show");
    pageNumbers[currentPage].classList.add("active");
  }
};

// Check input fields for validation
const checkInfo = function () {
  let check = true;
  for (let i = 0; i < inputFields.length; i++) {
    if (inputFields[i].value.length === 0) {
      check = false;
      inputLabels[i].classList.add("blank");
    } else {
      inputLabels[i].classList.remove("blank");
    }
  }
  return check;
};

// Update option duration text based on monthly/yearly selection
const updateOptionDurationText = function () {
  optionDuration[0].textContent = monthly ? "+$1/mo" : "+$10/yr";
  optionDuration[1].textContent = monthly ? "+$2/mo" : "+$20/yr";
  optionDuration[2].textContent = monthly ? "+$2/mo" : "+$20/yr";
};

// Update final plan information
const updateFinalPlanInfo = function () {
  let finalTotalPrice = mainPlanPrice;

  finalPlan.textContent =
    plans[selectedDivIndex] + "(" + (monthly ? "Monthly" : "Yearly") + ")";
  finalPlanPrice.textContent = "$" + mainPlanPrice + (monthly ? "/mo" : "/yr");

  finalAddons.forEach((div, i) => {
    if (addOns[i]) {
      div.style.display = "flex";
      finalTotalPrice = monthly
        ? finalTotalPrice + monthlyAddons[i]
        : finalTotalPrice + yearlyAddons[i];
    } else {
      div.style.display = "none";
    }
  });

  finalAddonsPrices.forEach((e, i) => {
    e.textContent =
      "$" + (monthly ? monthlyAddons[i] + "/mo" : yearlyAddons[i] + "/yr");
  });

  totalPriceDuration.textContent =
    "Total (per " + (monthly ? "month" : "year") + ")";
  totalPrice.textContent = "+$" + finalTotalPrice + (monthly ? "/mo" : "/yr");
};

// Handler for plan choice selection
planChoices.forEach((div, index) => {
  div.addEventListener("click", () => {
    if (selectedDivIndex !== null) {
      planChoices[selectedDivIndex].classList.remove("active");
    }
    selectedDivIndex = index;
    planChoices[selectedDivIndex].classList.add("active");
    mainPlanPrice = monthly
      ? monthlyPrices[selectedDivIndex]
      : yearlyPrices[selectedDivIndex];
  });
});

// Handler for monthly/yearly switch
const checkbox = document.querySelector(".switch input");
checkbox.addEventListener("change", function (event) {
  if (event.target.checked) {
    monthly = false;
    planPrice[0].textContent = "$90/yr";
    planPrice[1].textContent = "$120/yr";
    planPrice[2].textContent = "$150/yr";
    planDetails.forEach((e) => e.classList.add("active"));
    mainPlanPrice = yearlyPrices[selectedDivIndex];
  } else {
    monthly = true;
    planPrice[0].textContent = "$9/mo";
    planPrice[1].textContent = "$12/mo";
    planPrice[2].textContent = "$15/mo";
    planDetails.forEach((e) => e.classList.remove("active"));
    mainPlanPrice = monthlyPrices[selectedDivIndex];
  }

  updateOptionDurationText();
  updateFinalPlanInfo();
});

// Handler for addon checkbox changes
const optionCheck = document.querySelectorAll(".option-check");
const addOnsDivs = document.querySelectorAll(".add-ons-option");
optionCheck.forEach((checkbox, index) => {
  checkbox.addEventListener("change", () => {
    addOns[index] = checkbox.checked;
    addOnsDivs[index].classList.toggle("active");
    updateFinalPlanInfo();
  });
});

// Handler for change plan button
changePlan.addEventListener("click", function () {
  backBtn.click();
  backBtn.click();
});
