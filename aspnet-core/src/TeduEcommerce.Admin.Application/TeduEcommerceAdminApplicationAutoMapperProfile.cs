
using AutoMapper;
using TeduEcommerce.Admin.Manufacturers;
using TeduEcommerce.Admin.ProductAttributes;
using TeduEcommerce.Admin.ProductCategories;
using TeduEcommerce.Admin.Products;
using TeduEcommerce.Admin.Roles;
using TeduEcommerce.Manufacturers;
using TeduEcommerce.ProductAttributes;
using TeduEcommerce.ProductCategories;
using TeduEcommerce.Products;
using TeduEcommerce.Roles;
using Volo.Abp.Identity;

namespace TeduEcommerce.Admin;

public class TeduEcommerceAdminApplicationAutoMapperProfile : Profile
{
    public TeduEcommerceAdminApplicationAutoMapperProfile()
    {
        //Product Category
        CreateMap<ProductCategory, ProductCategoryDto>();
        CreateMap<ProductCategory, ProductCategoryInListDto>();
        CreateMap<CreateUpdateProductCategoryDto, ProductCategory>();

        //Product
        CreateMap<Product, ProductDto>();
        CreateMap<Product, ProductInListDto>();
        CreateMap<CreateUpdateProductDto, Product>();

        //Manufacturer
        CreateMap<Manufacturer, ManufacturerDto>();
        CreateMap<Manufacturer, ManufacturerInListDto>();
        CreateMap<CreateUpdateManufacturerDto, Manufacturer>();

        //Product Attribute
        CreateMap<ProductAttribute, ProductAttributeDto>();
        CreateMap<ProductAttribute, ProductAttributeInListDto>();
        CreateMap<CreateUpdateProductAttributeDto, ProductAttribute>();

        //Role
        CreateMap<IdentityRole, RoleDto>().ForMember(x => x.Description,
            map => map.MapFrom(x => x.ExtraProperties.ContainsKey(RoleConsts.DescriptionfileName)
            ? x.ExtraProperties[RoleConsts.DescriptionfileName]
            : null));
        CreateMap<IdentityRole, RoleInListDto>().ForMember(x => x.Description, 
            map => map.MapFrom( x => x.ExtraProperties.ContainsKey(RoleConsts.DescriptionfileName)
            ? x.ExtraProperties[RoleConsts.DescriptionfileName]
            : null));
        CreateMap<CreateUpdateRoleDto, IdentityRole>();

    }
}
