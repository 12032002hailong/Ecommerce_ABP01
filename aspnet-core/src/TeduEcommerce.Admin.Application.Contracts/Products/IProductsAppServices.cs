using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace TeduEcommerce.Admin.Products
{
    public interface IProductsAppServices: ICrudAppService<
        ProductDto,
        Guid,
        PagedResultRequestDto,
        CreateUpdateProductDto,
        CreateUpdateProductDto
        >
    {
        Task<PagedResultDto<ProductInListDto>> GetListFilterAsync(BaseListFilterDto input);
        Task<List<ProductInListDto>> GetListAllAsync();

        Task DeleteMultipleAsync(IEnumerable<Guid> ids);
       
    }
}
