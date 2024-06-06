export async function load() {
    try {
        const response = await fetch(`http://127.0.0.1:8080/api/v1/store/get-stores`);

        if (!response.ok) {
            throw new Error(`Failed to fetch store: ${response.statusText}`);
        }

        const data = await response.json();

        let storeData = data.result;

        const defaultImageData = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP2znm2BD8Q-Urpfkbvf-kYE7CKWHS3e545g&s";

        const processedStoreData = storeData.map(store => {
            store.files_data = store.files_data.length < 1 ? {
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
            } : store.files_data;
            return store;
        });

        console.log('Fetched store data:', processedStoreData);

        return {
            store: processedStoreData
        };
    } catch (error) {
        console.error('Error fetching store data:', error);
        return {
            error: error.message
        };
    }
}
