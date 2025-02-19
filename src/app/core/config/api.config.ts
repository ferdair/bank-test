export const environment = {
    production: false,
    apiUrl: '',
    endpoints: {
      products: {
        base: '/bp/products',
        verification: '/bp/products/verification'
      }
    }
  } as const;