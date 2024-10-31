using Volo.Abp.Modularity;

namespace TeduEcommerce.Admin;

public abstract class TeduEcommerceApplicationTestBase<TStartupModule> : TeduEcommerceTestBase<TeduEcommerceApplicationTestModule>
    where TStartupModule : IAbpModule
{

}
