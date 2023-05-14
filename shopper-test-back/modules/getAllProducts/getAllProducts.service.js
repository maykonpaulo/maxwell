import { productRepository } from "../../repository/product.repository";

const getAllProductsService = {
    async execute() {
        try {
            const repository = productRepository;

            const products = await repository.getAllProducts();

            if (products.length === 0) {
                return {
                    error: 'Nenhum produto encontrado',
                    status: 404
                };
            }

            return products;
        } catch (err) {
            return {
                error: err.message,
                status: 500
            };
        }
    }
}

export { getAllProductsService };
