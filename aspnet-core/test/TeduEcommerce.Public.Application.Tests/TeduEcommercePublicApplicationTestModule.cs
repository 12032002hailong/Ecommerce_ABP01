using Volo.Abp.Modularity;

namespace TeduEcommerce.Public;

[DependsOn(
    typeof(TeduEcommercePublicApplicationModule),
    typeof(TeduEcommercePublicDomainTestModule)
)]
public class TeduEcommercePublicApplicationTestModule : AbpModule
{

}
