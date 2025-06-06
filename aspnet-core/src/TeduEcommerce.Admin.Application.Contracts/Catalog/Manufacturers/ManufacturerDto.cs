﻿using System;
using Volo.Abp.Application.Dtos;

namespace TeduEcommerce.Admin.Catalog.Manufacturers
{
    public class ManufacturerDto : IEntityDto<Guid>
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public string Slug { get; set; }
        public string CoverPicture { get; set; }
        public bool Visibility { get; set; }
        public bool IsActive { get; set; }
        public string Country { get; set; }
        public Guid Id { get; set; }
    }
}