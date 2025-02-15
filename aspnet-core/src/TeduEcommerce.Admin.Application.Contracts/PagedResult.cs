using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeduEcommerce.Admin
{

    public class PagedResult<T> :PageResultBase where T : class
    {
        public List<T> Results { get; set; }

        public PagedResult(List<T> data, long rowCount, int currentPage, int pageSize )
        { 
            Results = data;
            RowCount = rowCount;
            CurrentPage = currentPage;
            PageSize = pageSize;            
        }
    }
}
