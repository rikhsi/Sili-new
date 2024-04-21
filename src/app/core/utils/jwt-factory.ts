import { JwtOptions } from 'src/app/typings';

import { StorageService } from '../services';

export function jwtOptionsFactory(storageService: StorageService): JwtOptions {
  return {
    tokenGetter: (): string => storageService.token,
  };
}
