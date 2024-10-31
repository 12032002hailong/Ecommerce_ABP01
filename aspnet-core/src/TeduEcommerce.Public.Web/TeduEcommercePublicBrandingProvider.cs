using Microsoft.Extensions.Localization;
using TeduEcommerce.Localization;
using Volo.Abp.Ui.Branding;
using Volo.Abp.DependencyInjection;

namespace TeduEcommerce.Public.Web;

[Dependency(ReplaceServices = true)]
public class TeduEcommercePublicBrandingProvider : DefaultBrandingProvider
{
    private IStringLocalizer<TeduEcommerceResource> _localizer;

    public TeduEcommercePublicBrandingProvider(IStringLocalizer<TeduEcommerceResource> localizer)
    {
        _localizer = localizer;
    }

    public override string AppName => _localizer["AppName"];
}
