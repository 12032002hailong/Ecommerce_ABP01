using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeduEcommerce.Admin
{
    public abstract class PageResultBase
    {
        public long CurrentPage { get; set; }
        public long PageSize { get; set; }
        public long RowCount { get; set; }
        public long PageCount 
        {
            get
            {
                var pageCount = (double)RowCount / PageSize;
                return (int)Math.Ceiling(pageCount);
            }
            set { 
            if(value < 0) throw new ArgumentOutOfRangeException(nameof(value));
            PageCount = value;
            }
        }
        public long FirstRowOnPage => (CurrentPage - 1) * PageSize + 1;
        public long LastRowOnPage => Math.Min(CurrentPage * PageSize, RowCount);
        public string AdditionalData { get; set; }
    }

}
