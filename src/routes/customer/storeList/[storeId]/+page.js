export async function load({ params }) {
    const { storeId } = params;

    try {
        const response = await fetch(`http://127.0.0.1:8080/api/v1/product/get-products-by-store-id/${storeId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch product: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched product data:', data);

        // Extract product data based on your API's structure
        let product = data.result || [];

        if (!Array.isArray(product)) {
            throw new Error('Invalid product data format');
        }

        return {
            product
        };
    } catch (error) {
        console.error('Error fetching product data:', error);
        return {
            product: [], // Return an empty array in case of an error
            error: error.message
        };
    }
}
