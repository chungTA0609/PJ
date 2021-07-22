using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure.Data;
using Core.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.Interfaces;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController: ControllerBase
    {
        private readonly IProductRepository _repo;
        public ProductController(IProductRepository repo)
        {
            _repo = repo;    
        }
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var proDucts = await _repo.GetProductsAsync();
            return Ok(proDucts);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id){
            var product = await _repo.GetProductByIdAsync(id);
            return Ok(product);
        }
        [HttpGet("brand")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrand()
        {
            return Ok(await _repo.GetProductBrandAsync());
        }
        [HttpGet("type")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductType()
        {
            return Ok(await _repo.GetProductTypeAsync());
        }
    }
}