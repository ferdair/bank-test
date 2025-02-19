export const environment = {
    production: false,
    apiUrl: 'http://localhost:3002',
    endpoints: {
      products: {
        base: '/bp/products',
        verification: '/bp/products/verification'
      }
    }
  } as const;