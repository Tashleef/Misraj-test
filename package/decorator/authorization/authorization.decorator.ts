import { HttpCode, HttpStatus, applyDecorators } from '@nestjs/common';
import { Api } from 'package/utils/api-methods';
import { Authorized } from './authorized.decorator';
import { ApiMethods } from 'package/utils/api-methods';
import { privilegeKeys } from 'package/utils/enums/privilege.enum';

export function AuthorizedApi({
  api,
  url,
  privilege = [],
}: {
  api: Api;
  url: string;
  privilege?: privilegeKeys[];
}) {
  return applyDecorators(
    Authorized({ privilege }),
    api === Api.POST ? HttpCode(HttpStatus.CREATED) : HttpCode(HttpStatus.OK),
    new ApiMethods(url).get(api),
  );
}
