using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace TeduEcommerce.Admin.Orders
{
    public interface IOrdersAppService : ICrudAppService
           <OrderDto,
           Guid,
           PagedResultRequestDto, CreateOrderDto, CreateOrderDto>
    {

    }
}
