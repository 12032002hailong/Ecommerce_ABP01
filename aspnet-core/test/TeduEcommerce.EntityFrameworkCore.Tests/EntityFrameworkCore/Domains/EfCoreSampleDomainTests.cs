using TeduEcommerce.Public.Samples;
using Xunit;

namespace TeduEcommerce.EntityFrameworkCore.Domains;

[Collection(TeduEcommerceTestConsts.CollectionDefinitionName)]
public class EfCoreSampleDomainTests : SampleDomainTests<TeduEcommerceEntityFrameworkCoreTestModule>
{

}
