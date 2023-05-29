import { IsString, Length } from 'class-validator';

import { CategoryCreationAttrs } from '@categories/category.model';

export class CreateCategoryDto
  implements Omit<CategoryCreationAttrs, 'userId'>
{
  @IsString()
  @Length(2, 32)
  readonly name: string;
}
