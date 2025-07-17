////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Nextjs, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { faker } from '@faker-js/faker';
import { matchSorter } from 'match-sorter'; // For filtering

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Define the shape of Product data
export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

export type Contract = {
  id: number;
  tenant: string;
  start_date: string;
  term: number;
  sqm: number;
  license_fee: number;
  services_fee: number;
  license_fee_increase: number;
  services_fee_increase: number;
  photo_urls: string[];
  updated_at: string;
};

// Mock product data store
export const fakeProducts = {
  records: [] as Product[], // Holds the list of product objects

  // Initialize with sample data
  initialize() {
    const sampleProducts: Product[] = [];
    function generateRandomProductData(id: number): Product {
      const categories = [
        'Electronics',
        'Furniture',
        'Clothing',
        'Toys',
        'Groceries',
        'Books',
        'Jewelry',
        'Beauty Products'
      ];

      return {
        id,
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        created_at: faker.date
          .between({ from: '2022-01-01', to: '2023-12-31' })
          .toISOString(),
        price: parseFloat(faker.commerce.price({ min: 5, max: 500, dec: 2 })),
        photo_url: `https://api.slingacademy.com/public/sample-products/${id}.png`,
        category: faker.helpers.arrayElement(categories),
        updated_at: faker.date.recent().toISOString()
      };
    }

    // Generate remaining records
    for (let i = 1; i <= 20; i++) {
      sampleProducts.push(generateRandomProductData(i));
    }

    this.records = sampleProducts;
  },

  // Get all products with optional category filtering and search
  async getAll({
    categories = [],
    search
  }: {
    categories?: string[];
    search?: string;
  }) {
    let products = [...this.records];

    // Filter products based on selected categories
    if (categories.length > 0) {
      products = products.filter((product) =>
        categories.includes(product.category)
      );
    }

    // Search functionality across multiple fields
    if (search) {
      products = matchSorter(products, search, {
        keys: ['name', 'description', 'category']
      });
    }

    return products;
  },

  // Get paginated results with optional category filtering and search
  async getProducts({
    page = 1,
    limit = 10,
    categories,
    search
  }: {
    page?: number;
    limit?: number;
    categories?: string;
    search?: string;
  }) {
    await delay(1000);
    const categoriesArray = categories ? categories.split('.') : [];
    const allProducts = await this.getAll({
      categories: categoriesArray,
      search
    });
    const totalProducts = allProducts.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedProducts = allProducts.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: 'Sample data for testing and learning purposes',
      total_products: totalProducts,
      offset,
      limit,
      products: paginatedProducts
    };
  },

  // Get a specific product by its ID
  async getProductById(id: number) {
    await delay(1000); // Simulate a delay

    // Find the product by its ID
    const product = this.records.find((product) => product.id === id);

    if (!product) {
      return {
        success: false,
        message: `Product with ID ${id} not found`
      };
    }

    // Mock current time
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: `Product with ID ${id} found`,
      product
    };
  }
};

// Initialize sample products
fakeProducts.initialize();

// Mock contract data store
export const fakeContracts = {
  records: [] as Contract[],

  initialize() {
    const sample: Contract[] = [];
    function generate(id: number): Contract {
      const start = faker.date.between({ from: '2021-01-01', to: '2024-12-31' });
      const term = faker.number.int({ min: 12, max: 60 });
      const photo = `https://api.slingacademy.com/public/sample-products/${id}.png`;
      return {
        id,
        tenant: faker.company.name(),
        start_date: start.toISOString(),
        term,
        sqm: faker.number.int({ min: 50, max: 500 }),
        license_fee: faker.number.int({ min: 500, max: 5000 }),
        services_fee: faker.number.int({ min: 100, max: 1000 }),
        license_fee_increase: faker.number.int({ min: 1, max: 5 }),
        services_fee_increase: faker.number.int({ min: 1, max: 5 }),
        photo_urls: [photo],
        updated_at: faker.date.recent().toISOString()
      };
    }

    for (let i = 1; i <= 20; i++) {
      sample.push(generate(i));
    }

    this.records = sample;
  },

  async getAll({ search }: { search?: string }) {
    let results = [...this.records];
    if (search) {
      results = matchSorter(results, search, { keys: ['tenant'] });
    }
    return results;
  },

  async getContracts({
    page = 1,
    limit = 10,
    search
  }: {
    page?: number;
    limit?: number;
    search?: string;
  }) {
    await delay(1000);
    const all = await this.getAll({ search });
    const total = all.length;
    const offset = (page - 1) * limit;
    const paginated = all.slice(offset, offset + limit);
    const currentTime = new Date().toISOString();
    return {
      success: true,
      time: currentTime,
      total_contracts: total,
      offset,
      limit,
      contracts: paginated
    };
  },

  async getContractById(id: number) {
    await delay(1000);
    const contract = this.records.find((c) => c.id === id);
    if (!contract) {
      return { success: false, message: `Contract with ID ${id} not found` };
    }
    const currentTime = new Date().toISOString();
    return {
      success: true,
      time: currentTime,
      contract
    };
  }
};

// Initialize sample contracts
fakeContracts.initialize();
