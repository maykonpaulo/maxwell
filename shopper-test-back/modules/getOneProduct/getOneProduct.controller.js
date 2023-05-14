import { getOneProductService } from "./getOneProduct.service";

const getOneProductController = {
    async handle(req, res) {
        const { code } = req.params;

        const service = getOneProductService;

        const getOneProduct = await service.execute(code);

        return res.json(getOneProduct);
    }
}

export { getOneProductController };
