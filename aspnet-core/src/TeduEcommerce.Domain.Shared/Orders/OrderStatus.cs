using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeduEcommerce.Orders
{
    public enum OrderStatus
    {
        New = 1 ,
        Confirmed = 2,
        Processing = 3,
        Shipping = 4,
        Finished = 5,
        Canceled = 6
    }
}
