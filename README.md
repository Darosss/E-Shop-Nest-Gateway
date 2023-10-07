# E-Shop-Nest-Gateway

This repository houses the gateway service for our e-commerce shop system, which serves as a centralized entry point to access and interact with a constellation of microservices. This gateway facilitates seamless communication, request routing, authentication, and security across the various microservices, enabling a cohesive and efficient e-commerce experience for customers and administrators

# Linked repositories:

- microservices:

  - [Authorization](https://github.com/Darosss/E-Shop-Nest-Auth)
  - [Order](https://github.com/Darosss/E-Shop-Nest-Order)
  - [Product](https://github.com/Darosss/E-Shop-Nest-Product)
  - [Category](https://github.com/Darosss/E-Shop-Nest-Category)

- proto files:

  - [Proto](https://github.com/Darosss/E-Shop-Nest-Proto)

- Frontend implementation:
  - [Frontend](https://github.com/Darosss/E-Shop-Nest-Morele-Clone)

# Getting started

### Prerequisites

    - PostgreSQL 15.3
    - NodeJS v20.6.1

### Installation

```
    Firstly you need to install microservices showed above, each of them have instruction how to install.

    then

    - npm install

    - npm run proto:install
    - npm run proto:all

    then

    depends on which mode you want to work:
    - start:dev
    - start:debug
    - start:prod
```
