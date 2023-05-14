import { productRepository } from "../../repository/product.repository";

const getOneProductService = {
    async execute(code) {
        try {
            const repository = productRepository;

            const product = await repository.getOneProduct(code);

            if (!product) {
                return {
                    error: 'Produto não encontrado',
                    status: 404
                };
            }

            return product;
        } catch (err) {
            return {
                error: err.message,
                status: 500
            };
        }
    }
}

export { getOneProductService };
