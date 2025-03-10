﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace TeduEcommerce.Admin.System.Users
{
    public interface IUsersAppService : ICrudAppService<
        UserDto,
        Guid,
        PagedResultRequestDto,
        CreateUserDto,
        UpdateUserDto
        >
    {
        Task DeleteMultipleAsync(IEnumerable<Guid> ids);
        Task<PagedResult<UserInListDto>> GetListWithFilterAsync(BaseListFilterDto input);
        Task<List<UserInListDto>> GetListAllAsync(string filterKeyword);
        Task AssignRolesAsync(Guid userId, string[] roleNames);

        Task SetPasswordAsync(Guid userId, SetPasswordDto input);
    }
}
