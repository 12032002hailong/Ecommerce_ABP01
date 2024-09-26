using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeduEcommerce.Admin.Products.Attributes
{
    public class ProductAttributeListFilterDto : BaseListFilterDto
    {
        public Guid ProductId { get; set; }
    }
}
