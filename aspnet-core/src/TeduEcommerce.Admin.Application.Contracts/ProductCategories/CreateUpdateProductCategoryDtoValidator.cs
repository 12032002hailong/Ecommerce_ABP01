using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeduEcommerce.Admin.ProductCategories
{
    public class CreateUpdateProductCategoryDtoValidator : AbstractValidator<CreateUpdateProductCategoryDto>
    {
        public CreateUpdateProductCategoryDtoValidator()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(50);
            RuleFor(x => x.Code).NotEmpty().MaximumLength(50);
            RuleFor(x => x.Name).NotEmpty().MaximumLength(50);
            RuleFor(x => x.CoverPicture).MaximumLength(250);
            RuleFor(x => x.SeoMetaDescription).MaximumLength(250);

        }
    }
}
