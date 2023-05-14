import { getAllProductsService } from "./getAllProducts.service";

const getAllProductsController = {
    async handle(req, res) {
        const service = getAllProductsService;

        const getAllProducts = await service.execute();

        return res.json(getAllProducts);
    }
}

export { getAllProductsController };
