export async function load(productId) {
    let name = "";
    let price = 0;
    let stock = 0;
    let detail = "";
    let status = "";
    let categoryId = 0;
    let storeId = 0;
    let productAvatar = "";

    try {
        // Dynamically insert the product ID into the URL
        const res = await fetch(`http://127.0.0.1:8080/api/v1/product/get-product-id/${productId}`);
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        const items = await res.json();
        
        // Update the variables with the fetched data
        name = items.name;
        price = items.price;
        stock = items.stock;
        detail = items.detail;
        status = items.status;
        categoryId = items.categoryId;
        storeId = items.storeId;
        productAvatar = items.productAvatar;

        return { items, name, price, stock, detail, status, categoryId, storeId, productAvatar };
    } catch (error) {
        return { error: error.message };
    }
}