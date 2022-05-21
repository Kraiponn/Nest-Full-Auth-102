import { SetMetadata } from '@nestjs/common';

export const PUBLIC_KEY = 'PUBLIC_KEY/roles';
export const Public = () => SetMetadata(PUBLIC_KEY, true);
