import { UseGuards, applyDecorators } from '@nestjs/common';
import { RoleGuard } from 'package/guards/role.guard';
import { Privileges } from './privilege-set-metadata.decorator';
import { PrivilegeGuard } from 'package/guards/privilege.guard';
import { privilegeKeys } from 'package/utils/enums/privilege.enum';

export function Authorized({ privilege }: { privilege: privilegeKeys[] }) {
  return applyDecorators(Privileges(privilege), UseGuards(PrivilegeGuard));
}
