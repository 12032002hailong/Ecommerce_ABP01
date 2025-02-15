using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeduEcommerce.Admin
{
    public  class PagedResultRequestBase
    {
        public int CurrentPage { get; set; } = 1;
        public int PageSize { get; set; } = 12;
    }
}
