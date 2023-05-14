import Product from "../model/product.model.js"

const productController = {
    async getAllProducts(req, res) {
        try {
            const allProducts = await Product.findAll();

            /*
            ACHO DESNECESSÁRIO O USO DO status. 
            
            FARIA SENTIDO NA CRIAÇÃO DE REGISTRO, EX: res.status(201).json(product);

            OU NO RETORNO DE ERRO, 
            EX: res.status(404).json({ error: 'Nenhum produto encontrado' });
            */
            //return res.status(200).json(allProducts);
            return res.json(allProducts);
        } catch (err) {
            throw new Error(`Não foi possível obter os produtos: ${err.message}`);
            // COMO VAI SER USADO EM FRONT, DEVOLVA PARA O FRONT O ERRO!
            //console.error('Não foi possível obter os produtos:', err);
        }
    },

    async getOneProduct(req, res) {
        const { code } = req.params;

        try {
            const product = await Product.findOne({
                where:
                {
                    code
                }
            });

            //return res.status(200).json(product);
            return res.json(product);
        } catch (err) {
            throw new Error(`Não foi possível obter os produtos: ${err.message}`);
            // COMO VAI SER USADO EM FRONT, DEVOLVA PARA O FRONT O ERRO!
            //console.error('Não foi possível obter os produtos:', err);
        }
    }
}

export { productController }