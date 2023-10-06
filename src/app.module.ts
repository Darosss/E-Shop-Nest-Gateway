import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { CategoryModule } from './category/category.module';
import { RouterModule } from '@nestjs/core';
import { ProductPropertyModule } from './product/product-property/product-property.module';
import { PropertyCategoryModule } from './product/property-category/property-category.module';
import { PropertyModule } from './product/property/property.module';

@Module({
  imports: [
    AuthModule,
    ProductModule,
    OrderModule,
    CategoryModule,
    RouterModule.register([
      {
        path: 'product',
        module: ProductModule,
        children: [
          {
            path: 'property',
            module: PropertyModule,
            children: [
              {
                path: 'category',
                module: PropertyCategoryModule,
              },
            ],
          },
          {
            path: 'product-property',
            module: ProductPropertyModule,
          },
        ],
      },
    ]),
  ],
})
export class AppModule {}
