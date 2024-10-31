using Volo.Abp.Modularity;

namespace TeduEcommerce.Public;

public abstract class TeduEcommercePublicApplicationTestBase<TStartupModule> : TeduEcommerceTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
