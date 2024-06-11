import { CookiesJsonParser } from "$lib/pkg/utils/cookies";


/** @type {import('./$types').PageServerLoad} */
export const load = async (event) => {
    try {
        const response = await fetch(`http://127.0.0.1:8080/api/v1/product/get-products`);

        if (!response.ok) {
            throw new Error(`Failed to fetch product: ${response.statusText}`);
        }

        const data = await response.json();

        let productData = data.result;

        const defaultImageData = "http://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP2znm2BD8Q-Urpfkbvf-kYE7CKWHS3e545g&s";

		const { customer_account } = CookiesJsonParser(event.cookies, 'customer_account');


        const processedProductData = productData.map(product => {
            product.files_data = product.files_data.length < 1 ? {
                "id": 1,
                "file_name": "default_file",
                "file_data": defaultImageData,
                "file_type": "JPG",
                "entity_type": "ACCOUNT",
                "account_id": null,
                "product_id": null,
                "order_id": null,
                "bank_id": null,
                "created_at": new Date().toISOString(),
                "updated_at": new Date().toISOString()
            } : product.files_data;
            return product;
        });

        console.log('Fetched product data:', processedProductData);

        return {
            product: processedProductData,
            customer_account
        };
    } catch (error) {
        console.error('Error fetching product data:', error);
        return {
            error: error.message
        };
    }
}
