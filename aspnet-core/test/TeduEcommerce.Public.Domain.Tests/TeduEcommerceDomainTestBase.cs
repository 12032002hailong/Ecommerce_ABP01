using Volo.Abp.Modularity;

namespace TeduEcommerce.Public;

/* Inherit from this class for your domain layer tests. */
public abstract class TeduEcommerceDomainTestBase<TStartupModule> : TeduEcommerceTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
