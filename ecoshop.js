// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  // Panel toggle listeners  
  const searchIcon = document.getElementById('searchIcon');
  const searchPanel = document.getElementById('searchPanel');
  const closePanel = document.getElementById('closePanel');
  
  searchIcon.addEventListener('click', () => {
    searchPanel.classList.remove('translate-x-full');
    searchPanel.classList.add('translate-x-0');
  });
  
  closePanel.addEventListener('click', () => {
    searchPanel.classList.remove('translate-x-0');
    searchPanel.classList.add('translate-x-full');
  });
  
  // Debounce function to limit API calls during typing
  function debounce(func, delay) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }
  
  // Simulated API function (only fetching products)
  async function fetchSearchResults(query) {
    const productsData = [
      { id: 1, title: "Facial Cleansing Oil",link:"https://amzn.to/4c2Uc2B", sustainabilityRating: 4, price: "389", image: "facialcleansingoil.jpg" },
      { id: 2, title: "Sunday Brunch - Tea Bags",link:"https://amzn.to/4inH8ag", sustainabilityRating: 4, price: "145", image: "sundaybrunch.jpg" },
      { id: 3, title: "Recyclable Mascara - Zero Waste",link:"https://amzn.to/41JNA4f", sustainabilityRating: 5, price: "696", image: "maskara.jpg" },
      { id: 4, title: "Yoga Mat",link:"https://amzn.to/4bKa1ej", sustainabilityRating: 4.5, price: "399", image: "mat.jpg" },
      { id: 5, title: "Bamboo coffee Mug", link:"https://amzn.to/4iLqj96",sustainabilityRating: 4, price: "373", image: "mug.jpg" },
      { id: 6, title: "scruber", link:"https://amzn.to/41Ive3D",sustainabilityRating:4.5 , price: "469", image: "scrub.png" },
      { id: 7, title: "Laundry Detergent Sheets - 60 Loads",link:"https://amzn.to/4kWTTKG", sustainabilityRating:3 , price: "349", image: "detergent.jpg" },
      { id: 8, title: "green glow led bulb",link:"https://amzn.to/4iJ4Z3Z", sustainabilityRating:4.5 , price: "59", image: "led.jpg" },
      { id: 9, title: "plant pure vegan skincare kit",link:"https://amzn.to/4iFcdGJ", sustainabilityRating:4.5 , price: "516", image: "skin.png" },
      { id: 10, title: "Bamboo soap shellf",link:"https://amzn.to/4iuEi3q", sustainabilityRating:4, price: "299", image: "bamboo.jpg" },
      { id: 12, title: "Reusable water botle",link:"https://amzn.to/4kJ6Pnf", sustainabilityRating:4.5, price: "319", image: "botle.jpg" },
      { id: 11, title: "Reusable cleaning cloths",link:"https://amzn.to/4itbI2m", sustainabilityRating:4.5, price: "284", image: "cloth.jpg" },
      { id: 13, title: "bar soaps",link:"https://amzn.to/4hvaxOx", sustainabilityRating:4.5, price: "617", image: "soap.jpg" },
      { id: 14, title: "refinable jar",link:"https://amzn.to/4kIL9aP", sustainabilityRating:4.5, price: "249", image: "jar.jpg" },
      { id: 15, title: "zeo waste safty razor",link:"https://amzn.to/4iSm63r", sustainabilityRating:4.5, price: "139", image: "razor.jpg" },
      { id: 16, title: "Bamboo toothbrush ",link:"https://amzn.to/4iKHnvP", sustainabilityRating:4.5, price: "199", image: "tooth.jpg" },
      { id: 17, title: "shopping bags ",link:"https://amzn.to/4bL5rMR", sustainabilityRating:4.5, price: "228", image: "bag.jpg" },
      { id: 18, title: "bamboo cooking utensils set ",link:"https://amzn.to/4iPIv1b", sustainabilityRating:4.5, price: "169", image: "cook.png" },
      { id: 19, title: "Laundry Detergent Sheets - 60 Loads",link:"https://amzn.to/4kWTTKG", sustainabilityRating:3 , price: "349", image: "detergent.jpg" },
      { id: 20, title: "vinager",link:"https://amzn.to/41Mp8zf", sustainabilityRating:4 , price: "155", image: "vinager.png" },
      { id: 21, title: "Bamboo soap shellf",link:"https://amzn.to/4iuEi3q", sustainabilityRating:4, price: "299", image: "bamboo.jpg" },
      { id: 22, title: "Baking soda",link:"https://amzn.to/4kMV27o", sustainabilityRating:4, price: "125", image: "soda.png" },
      { id: 23, title: "toothpaste tablates",link:"https://amzn.to/4kMuMdn", sustainabilityRating:4, price: "399", image: "tab.png" },
      { id: 24, title: "Indoor Air-Purifying Plants",link:"https://amzn.to/4kNtUoS", sustainabilityRating:4.5, price: "179", image: "air.png" },
      { id: 25, title: "refinable jar",link:"https://amzn.to/4kIL9aP", sustainabilityRating:4.5, price: "249", image: "jar.jpg" },
      { id: 26, title: "lunch box", link:"https://amzn.to/4hxphMW",sustainabilityRating:4.5, price: "398", image: "lunch.png" },
      { id: 27, title: "soy candles",link:"https://amzn.to/4htKCXu", sustainabilityRating:4.5, price: "323", image: "soy.png" },
      { id: 28, title: "luxury cotton bedsheet",link:"https://amzn.to/41SOOu7", sustainabilityRating:4.5, price: "2155", image: "sheet.png" },
      { id: 29, title: "Recyclable Mascara - Zero Waste",link:"https://amzn.to/41REBy4", sustainabilityRating:4.5, price: "387", image: "maskara.jpg" },
      { id: 30, title: "compact",link:"https://amzn.to/4irHLzH", sustainabilityRating:4.5, price: "489", image: "compac.jpg" },
      { id: 31, title: "Make up removal pads",link:"https://amzn.to/4iqVfvt", sustainabilityRating:4.5, price: "289", image: "remove.png" },
      { id: 32, title: "sunscreen",link:"https://amzn.to/4bNTUwd", sustainabilityRating:4.5, price: "1449", image: "sun.png" },
      { id: 33, title: "toner",link:"https://amzn.to/4bT5k1M", sustainabilityRating:4.5, price: "1075", image: "toner.jpg" },
      { id: 34, title: "makeup kit",link:"https://amzn.to/4kMOVQx", sustainabilityRating:4.5, price: "1092", image: "makeup.jpg" },
      { id: 35, title: "reg lip stick",link:"https://amzn.to/41MBc3v", sustainabilityRating:4.5, price: "75", image: "stick.jpg" },
      { id: 36, title:"face mask",link:"https://amzn.to/4isKQzq", sustainabilityRating:4.5, price: "420", image: "face.jpg" },
      { id: 37, title: "Lip Therapy Balm - Zero Waste Lip Care",link:"https://amzn.to/4kOf69u", sustainabilityRating:4.5, price: "249", image: "lip.jpg" },
      { id: 38, title: "soy candles",link:"https://amzn.to/4hxwKLY", sustainabilityRating:4.5, price: "284", image: "soy.png" },
      { id: 39, title: "organic cotton bed sheet",link:"https://amzn.to/4hGxize", sustainabilityRating:4.5, price: "689", image: "sheet.png" },
      { id: 40, title: "organic soap bars",link:"https://amzn.to/4kIDjhv", sustainabilityRating:4.5, price: "440", image: "soap.jpg" },
      { id: 41, title: "dish washing block soap bar",link:"https://amzn.to/41Osyla", sustainabilityRating:4.5, price: "199", image: "soap.jpg" },
      { id: 42, title: "toothpaste",link:"https://amzn.to/4iSq781", sustainabilityRating:4.5, price: "219", image: "paste.jpg" },
      { id: 43, title: "toilet paper",link:"https://amzn.to/4bVhUxE", sustainabilityRating:4.5, price: "299", image: "paper.png" },
      { id: 44, title: "toilet brush",link:"https://amzn.to/4kIWYxP", sustainabilityRating:4.5, price: "260", image: "brush.jpg" },
      { id: 45, title: "bamboo clip",link:"https://amzn.to/41OPpgm", sustainabilityRating:4.5, price: "288", image: "clip.jpg" },
      { id: 46, title: "body wash",link:"https://amzn.to/4kNAfk5", sustainabilityRating:4.5, price: "336", image: "toner.jpg" },
      { id: 47, title: "mirror cleaner",link:"https://amzn.to/4iJHXKR", sustainabilityRating:4.5, price: "99", image: "mirror.jpg" },
      { id: 48, title: "floor cleaner",link:"https://amzn.to/4iJHXKR", sustainabilityRating:4.5, price: "379", image: "floor.jpg" },
      { id: 49, title: "toilet cleaner",link:"https://amzn.to/41IagSs", sustainabilityRating:4.5, price: "160", image: "floor.jpg" },
       
    ];
  
    return productsData.filter(p =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  // Function to update search results in the UI
  async function updateSearchResults() {
    const query = document.getElementById('searchInput').value;
    const productsResults = document.getElementById('productsResults');
  
    if (!query) {
      productsResults.innerHTML = "";
      return;
    }
  
    productsResults.innerHTML = "<p class='text-gray-600'>Searching products...</p>";
  
    try {
      const products = await fetchSearchResults(query);
  
      productsResults.innerHTML = "";
      if (products.length > 0) {
        products.forEach(product => {
          const productDiv = document.createElement('div');
          productDiv.className = "p-4 border rounded-lg bg-white shadow flex space-x-4 items-center";
  
          const img = document.createElement('img');
          img.src = product.image;
          img.alt = product.title;
          img.className = "h-16 w-16 rounded object-cover";
  
          const detailsDiv = document.createElement('div');
          detailsDiv.className = "flex flex-col flex-grow";
          detailsDiv.innerHTML = `
            <h3 class="text-xl font-bold">
            <a href="${product.link}" target="_blank" class="text-white-500 hover:underline"> ${product.title}</a></h3>
            <p class="text-green-700">Rating: ${product.sustainabilityRating} / 5</p>
            <p class="text-blue-600 font-semibold">Price: ₹${product.price}</p>
          `;
  
          productDiv.appendChild(img);
          productDiv.appendChild(detailsDiv);
  
          productsResults.appendChild(productDiv);
        });
      } else {
        productsResults.innerHTML = "<p class='text-gray-600'>No products found.</p>";
      }
    } catch (error) {
      console.error(error);
      productsResults.innerHTML = "<p class='text-red-600'>Error loading products.</p>";
    }
  }
  
  const debouncedUpdate = debounce(updateSearchResults, 300);
  document.getElementById('searchInput').addEventListener('input', debouncedUpdate);
});
