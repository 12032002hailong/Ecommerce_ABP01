using TeduEcommerce.Public;
using Volo.Abp.Modularity;

namespace TeduEcommerce.Admin;

[DependsOn(
    typeof(TeduEcommerceAdminApplicationModule),
    typeof(TeduEcommercePublicDomainTestModule)
)]
public class TeduEcommerceApplicationTestModule : AbpModule
{

}
