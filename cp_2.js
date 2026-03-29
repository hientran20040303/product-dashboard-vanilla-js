const apiURL = 'https://www.course-api.com/javascript-store-products';

// Retrieve data using fetch() and .catch
function fetchProductsThen() {
    fetch(apiURL)
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch (Then)');
            return response.json();
        })
        .then(products => {
            console.log("- Names via fetchProductsThen -");
            products.forEach(item => {
                console.log(item.fields.name);
            });
        })
        .catch(error => {
            console.error("Error in fetchProductsThen:", error);
        });
}

// Step 4
async function fetchProductsAsync() {
    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error('Uh oh, network response was not good');
        }
        const data = await response.json();
        
        displayProducts(data);
    } catch (error) {
        handleError(error);
    }
}

function displayProducts(products) {
    const container = document.getElementById('product-container');
    
    container.innerHTML = "";

    const featured = products.slice(0, 5);

    featured.forEach(product => {
        const { name, price, image } = product.fields;
        const imgUrl = image[0].url;
        const formattedPrice = (price / 100).toFixed(2);

        const card = document.createElement('div');
        card.classList.add('product-card');

        card.innerHTML = `
            <img src="${imgUrl}" alt="${name}">
            <h3>${name}</h3>
            <p>$${formattedPrice}</p>
        `;

        container.appendChild(card);
    });
}

function handleError(error) {
    console.log(`An error occurred: ${error.message}`);
    const container = document.getElementById('product-container');
    container.innerHTML = `<p class="error">An error occurred: ${error.message}</p>`;
}

// Call functions
fetchProductsThen();
fetchProductsAsync();