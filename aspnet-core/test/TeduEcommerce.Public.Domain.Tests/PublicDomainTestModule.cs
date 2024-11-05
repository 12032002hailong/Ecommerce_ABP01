using Volo.Abp.Modularity;

namespace TeduEcommerce.Public;

[DependsOn(
    typeof(TeduEcommerceDomainModule),
    typeof(TeduEcommerceTestBaseModule)
)]
public class TeduEcommercePublicDomainTestModule : AbpModule
{

}
