﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeduEcommerce.IdentitySettings
{
    public class IdentitySettingConfiguration: IEntityTypeConfiguration<IdentitySetting>
    {
        public void Configure(EntityTypeBuilder<IdentitySetting> builder)
        {
            builder.ToTable(TeduEcommerceConsts.DbTablePrefix + "IdentitySettings",
                
                TeduEcommerceConsts.DbSchema);
            builder.HasKey(x => x.Id);
            builder.Property(e => e.Name).IsRequired().HasMaxLength(200);
        }
    }
}