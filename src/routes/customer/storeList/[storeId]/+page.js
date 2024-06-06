export async function load({ params }) {
    const { storeId } = params;

    try {
        const response = await fetch(`http://127.0.0.1:8080/api/v1/product/get-products-by-store-id/${storeId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch product: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched product data:', data); // Log the fetched data

        // Extract product data based on your API's structure

        let product = data.result;

        if (!product) {
            throw new Error('Product data is missing');
        }

        return {
            product
        };
    } catch (error) {
        console.error('Error fetching product data:', error);
        return {
            error: error.message
        };
    }
}

