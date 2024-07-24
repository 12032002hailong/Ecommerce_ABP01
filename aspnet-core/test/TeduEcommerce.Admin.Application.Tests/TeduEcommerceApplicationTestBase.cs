using Volo.Abp.Modularity;

namespace TeduEcommerce.Admin;

public abstract class TeduEcommerceApplicationTestBase<TStartupModule> : TeduEcommerceTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
