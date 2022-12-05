modifyById = async (id, obj) => {
        if (!id) return { status: "error", message: "Indique el Id por favor" };
        if (fs.existsSync(productFile)) {
          let data = await fs.promises.readFile(productFile, "utf-8");
          let products = JSON.parse(data);
          let productId = products.findIndex((prod) => prod.id === id);
          if (productId !== -1) {
            products[productId] = {
              ...products[productId],
              id: id,
              name: obj.name,
              description: obj.description,
              url: obj.url,
              price: obj.price,
              stock: obj.stock,
              code: obj.code,
            };
            await fs.promises.writeFile(productFile, JSON.stringify(products, null, 2));
            return { status: "success", message: "Producto Modificado" };
          }
          return { status: "error", message: "Producto no Encontrado" };
        } else {
          return { status: "error", message: "Ocurrio un error" };
        }
      }

/// ========================================================================///
LEER ACA
{
productsRouter.get("/", async (req, res) => {
  res.send(await manager.getAll());
});
productsRouter.get("/:id", async (req, res) => {
  res.send(await manager.getById(parseInt(req.params.id)));
});
productsRouter.post("/", midProducts, async (req, res) => {
  res.send(await manager.save(req.body));
});
productsRouter.put("/:id", async (req, res) => {
  res.send(await manager.modifyById(parseInt(req.params.id), req.body));
});
productsRouter.delete("/:id", async (req, res) => {
  res.send(await manager.deleteById(parseInt(req.params.id)));
});

module.exports = productsRouter;
}