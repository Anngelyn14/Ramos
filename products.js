// Products page functionality
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
});

async function loadProducts() {
    try {
        // Try to load from XML first
        const xmlResponse = await fetch('data/products.xml');
        if (xmlResponse.ok) {
            const xmlText = await xmlResponse.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "text/xml");
            displayProductsFromXML(xmlDoc);
        } else {
            // Fallback to JSON
            const jsonResponse = await fetch('data/products.json');
            const productsData = await jsonResponse.json();
            displayProductsFromJSON(productsData);
        }
    } catch (error) {
        console.error('Error loading products:', error);
        // Fallback to hardcoded data
        displayProductsFromJSON(getFallbackProducts());
    }
}

function displayProductsFromXML(xmlDoc) {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';
    
    const categories = xmlDoc.getElementsByTagName('category');
    
    for (let category of categories) {
        const categoryName = category.getElementsByTagName('name')[0].textContent;
        const products = category.getElementsByTagName('product');
        
        for (let product of products) {
            const id = product.getElementsByTagName('id')[0].textContent;
            const name = product.getElementsByTagName('name')[0].textContent;
            const price = product.getElementsByTagName('price')[0].textContent;
            const image = product.getElementsByTagName('image')[0].textContent;
            const description = product.getElementsByTagName('description')[0].textContent;
            
            createProductCard(productsContainer, {
                id, name, price, image, description, category: categoryName
            });
        }
    }
}

function displayProductsFromJSON(productsData) {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';
    
    productsData.categories.forEach(category => {
        category.products.forEach(product => {
            createProductCard(productsContainer, {
                ...product,
                category: category.name
            });
        });
    });
}

function createProductCard(container, product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <div class="product-title">${product.name}</div>
            <p class="product-description">${product.description}</p>
            <div class="product-category" style="color: #666; font-size: 0.9rem; margin-bottom: 0.5rem;">${product.category}</div>
            <div class="product-price">$${parseFloat(product.price).toFixed(2)}</div>
            <button class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Add to Cart</button>
        </div>
    `;
    container.appendChild(productCard);
}

function getFallbackProducts() {
    return {
        categories: [
            {
                name: "Web Development",
                products: [
                    {
                        id: 1,
                        name: "Responsive Website Template",
                        price: 49.99,
                        image: "https://via.placeholder.com/300x200/4361ee/ffffff?text=Web+Template",
                        description: "Fully responsive website template with modern design"
                    },
                    {
                        id: 2,
                        name: "E-commerce Solution",
                        price: 199.99,
                        image: "https://via.placeholder.com/300x200/3f37c9/ffffff?text=E-commerce",
                        description: "Complete e-commerce platform with payment integration"
                    }
                ]
            },
            {
                name: "Mobile Apps",
                products: [
                    {
                        id: 3,
                        name: "Fitness Tracking App",
                        price: 149.99,
                        image: "https://via.placeholder.com/300x200/4895ef/ffffff?text=Fitness+App",
                        description: "Mobile application for tracking fitness activities"
                    },
                    {
                        id: 4,
                        name: "Food Delivery App",
                        price: 249.99,
                        image: "https://via.placeholder.com/300x200/4cc9f0/ffffff?text=Food+App",
                        description: "Complete food ordering and delivery application"
                    }
                ]
            }
        ]
    };
}