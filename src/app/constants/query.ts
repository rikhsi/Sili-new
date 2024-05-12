export enum FEEDBACK_QUERY {
  get = 'requests/all?',
  getById = 'requests/get_by_id',
  search = 'requests/autocomplete',
  create = 'requests/create',
  update = 'requests/update',
  delete = 'requests/delete/',
}

export enum REQUEST_QUERY {
  get = 'applications/all?',
  getById = 'applications/get_by_id',
  search = 'applications/autocomplete',
  create = 'applications/create',
  update = 'applications/update',
  delete = 'applications/delete/',
}

export enum PARTNER_QUERY {
  get = 'partners/all?',
  getById = 'partners/get_by_id',
  search = 'partners/autocomplete',
  create = 'partners/create',
  update = 'partners/update',
  delete = 'partners/delete/',
}

export enum SHOP_QUERY {
  get = 'shops/all?',
  getById = 'shops/get_by_id',
  getByName = 'shops/get_by_name',
  search = 'shops/autocomplete',
  create = 'shops/create',
  update = 'shops/update',
  delete = 'shops/delete/',
}

export enum AUTH_QUERY {
  login = 'auth/login',
}
