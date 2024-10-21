using System;
using System.Collections.Generic;
using System.Text;

namespace TeduEcommerce.Admin.Catalog.Products
{
    public class ProductListFilterDto : BaseListFilterDto
    {
        public Guid? CategoryId { get; set; }
    }
}