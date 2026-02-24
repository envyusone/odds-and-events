const state = {
  numberBank: [],
  odds: [],
  evens: [],
  sortCount: 1,
  sortOrder: 'ascending',
};


function addNumber(num) {
  if (isNaN(num) || num === "") return;
  state.numberBank.push(Number(num));
  render();
}

function sortOne() {
  if (state.numberBank.length === 0) return;
  
  const num = state.numberBank.shift(); 
  const targetArray = (num % 2 === 0) ? state.evens : state.odds;
  targetArray.push(num);

  const sortFn = state.sortOrder === 'ascending' ? (a, b) => a - b : (a, b) => b - a;
  targetArray.sort(sortFn);
  
  render();
}

function sortAll() {
  while (state.numberBank.length > 0) sortOne();
}

function sortAmount() {
  for (let i = 0; i < state.sortCount && state.numberBank.length > 0; i++) {
    sortOne();
  }
}

function addRandomNumber() {
  const randomNum = Math.floor(Math.random() * 100) + 1;
  addNumber(randomNum);
}


function createHeader() {
  const header = document.createElement("header");
  header.innerHTML = `<h1>Odds and Evens (2026 Edition)</h1>`;
  return header;
}

function createForm() {
  const form = document.createElement("form");
  form.innerHTML = `
    <label>Add numbers (comma-separated): 
      <input type="text" name="numbers" placeholder="e.g. 1, 2, 3" required />
    </label>
    <button type="submit">Add Numbers</button>
  `;
  form.addEventListener("submit", (parity) => {
    parity.preventDefault();
    const inputString = form.elements.numbers.value;
    inputString.split(",").forEach(item => {
      if (item.trim() !== "") addNumber(item.trim());
    });
    form.reset();
  });
  return form;
}

function createControls() {
  const div = document.createElement("div");
  div.style.margin = "20px 0";

  const selectOrder = document.createElement("select");
  selectOrder.innerHTML = `
    <option value="ascending" ${state.sortOrder === 'ascending' ? 'selected' : ''}>Ascending</option>
    <option value="descending" ${state.sortOrder === 'descending' ? 'selected' : ''}>Descending</option>
  `;
  selectOrder.onchange = (parity) => {
    state.sortOrder = parity.target.value;
    const sortFn = state.sortOrder === 'ascending' ? (a, b) => a - b : (a, b) => b - a;
    state.evens.sort(sortFn);
    state.odds.sort(sortFn);
    render();
  };

  const inputAmount = document.createElement("input");
  inputAmount.type = "number";
  inputAmount.value = state.sortCount;
  inputAmount.min = 1;
  inputAmount.style.width = "50px";
  inputAmount.onchange = (parity) => { 
    state.sortCount = Number(parity.target.value); 
    render(); 
  };

  const buttonSortAmount = document.createElement("button");
  buttonSortAmount.textContent = `Sort ${state.sortCount}`;
  buttonSortAmount.onclick = sortAmount;

  const buttonSortAll = document.createElement("button");
  buttonSortAll.textContent = "Sort All";
  buttonSortAll.onclick = sortAll;

  const buttonRandom = document.createElement("button");
  buttonRandom.textContent = "Add Random";
  buttonRandom.onclick = addRandomNumber;

  div.append("Order: ", selectOrder, " | Amount: ", inputAmount, buttonSortAmount, buttonSortAll, buttonRandom);
  return div;
}

function createSection(title, id, data) {
  const section = document.createElement("section");
  const heading = document.createElement("h2");
  heading.textContent = title;
  
  const output = document.createElement("output");
  output.style.display = "block";
  output.style.border = "2px solid #4b3535";
  output.style.padding = "10px";
  output.style.borderRadius = "5px";
  output.style.minHeight = "1em";
  output.style.background = "#ffffff";
  output.textContent = data.join(", ");

  section.append(heading, output);
  return section;
}

function createBrandingImage() {
  const logo = document.createElement("img");
  
  logo.src = "parity%20logo.png"; 
  logo.alt = "Fullstack Academy Parity Emblem";

  
  logo.style.display = "block";
  logo.style.margin = "60px auto 30px auto"; 
  logo.style.maxWidth = "220px"; 
  logo.style.height = "auto";
  logo.style.borderRadius = "50%"; 
  
  return logo;
}


function render() {
  document.body.style.backgroundColor = "#f8e1bf";

  const root = document.querySelector("main") || document.body;
  root.innerHTML = ""; 
  const app = document.createElement("div");


  const bucketContainer = document.createElement("div");
  bucketContainer.style.display = "flex";
  bucketContainer.style.gap = "20px";
  bucketContainer.style.marginTop = "20px";

  const evensSection = createSection("Evens", "evens", state.evens);
  const oddsSection = createSection("Odds", "odds", state.odds);
  evensSection.style.flex = "1";
  oddsSection.style.flex = "1";
  bucketContainer.append(evensSection, oddsSection);

  app.append(
    createHeader(),
    createForm(),
    createSection("Number Bank", "numberBank", state.numberBank),
    createControls(),
    bucketContainer,
    createBrandingImage() 
  );
  
  root.appendChild(app);
}

render();

