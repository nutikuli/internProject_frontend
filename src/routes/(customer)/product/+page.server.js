export async function loadAll() {
    try {
        // Fetch all products
        const res = await fetch('http://127.0.0.1:8080/api/v1/product/get-products');
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        const products = await res.json();
        
        // Extract relevant data from the response
        const formattedProducts = products.map(product => ({
            name: product.name,
            price: product.price,
            stock: product.stock,
            detail: product.detail,
            status: product.status,
            categoryId: product.categoryId,
            storeId: product.storeId,
            productAvatar: product.productAvatar
        }));

        return { products: formattedProducts };
    } catch (error) {
        return { error: error.message };
    }
}