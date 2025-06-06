﻿using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeduEcommerce.Admin.Catalog.Manufacturers;
using TeduEcommerce.Admin.Permissions;
using TeduEcommerce.ProductAttributes;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.ObjectMapping;

namespace TeduEcommerce.Admin.Catalog.ProductAttributes
{
    [Authorize(TeduEcommercePermissions.Attribute.Default, Policy = "AdminOnly")]
    public class ProductAttributesAppService : CrudAppService<
        ProductAttribute,
        ProductAttributeDto,
        Guid,
        PagedResultRequestDto,
        CreateUpdateProductAttributeDto,
        CreateUpdateProductAttributeDto>, IProductAttributesAppService
    {
        public ProductAttributesAppService(IRepository<ProductAttribute, Guid> repository)
            : base(repository)
        {
            GetPolicyName = TeduEcommercePermissions.Attribute.Default;
            GetListPolicyName = TeduEcommercePermissions.Attribute.Default;
            CreatePolicyName = TeduEcommercePermissions.Attribute.Create;
            UpdatePolicyName = TeduEcommercePermissions.Attribute.Update;
            DeletePolicyName = TeduEcommercePermissions.Attribute.Delete;

        }

        [Authorize(TeduEcommercePermissions.Attribute.Delete)]
        public async Task DeleteMultipleAsync(IEnumerable<Guid> ids)
        {
            await Repository.DeleteManyAsync(ids);
            await UnitOfWorkManager.Current.SaveChangesAsync();
        }

        [Authorize(TeduEcommercePermissions.Attribute.Default)]
        public async Task<List<ProductAttributeInListDto>> GetListAllAsync()
        {
            var query = await Repository.GetQueryableAsync();
            query = query.Where(x => x.IsActive == true);
            var data = await AsyncExecuter.ToListAsync(query);

            return ObjectMapper.Map<List<ProductAttribute>, List<ProductAttributeInListDto>>(data);

        }

        [Authorize(TeduEcommercePermissions.Attribute.Default)]
        public async Task<PagedResult<ProductAttributeInListDto>> GetListFilterAsync(BaseListFilterDto input)
        {
            var query = await Repository.GetQueryableAsync();
            query = query.WhereIf(!string.IsNullOrWhiteSpace(input.Keyword), x => x.Label.Contains(input.Keyword));

            var totalCount = await AsyncExecuter.LongCountAsync(query);
            var data = await AsyncExecuter
                           .ToListAsync(
                           query.Skip((input.CurrentPage - 1) * input.PageSize)
                           .Take(input.PageSize));

            return new PagedResult<ProductAttributeInListDto>(
                ObjectMapper.Map<List<ProductAttribute>, List<ProductAttributeInListDto>>(data),
                totalCount,
                input.CurrentPage,
                input.PageSize
                );
        }
    }
}