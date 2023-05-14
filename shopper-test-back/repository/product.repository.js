import Product from "../model/product.model.js"

const productRepository = {
    async getAllProducts() {
        const products = await Product.findAll()

        return products;
    },

    async getOneProduct(code) {
        const product = await Product.findOne({
            where: {
                code
            }
        });

        return product;
    }
}

export { productRepository };
