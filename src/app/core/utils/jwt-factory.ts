import { StorageService } from "../services";

export function jwtOptionsFactory(storageService: StorageService) {
    return {
      tokenGetter: () => {
        return storageService.token
      },
    };
  }