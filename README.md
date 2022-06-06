# Welcome to the Store Manager Project Repository!

This individual project was developed within Trybe Course. The main goal was to build a RESTful API for the management of a store, with endpoints to register and update sales and inventory changes.

## Running locally

To run this application locally, you will need to clone this repository with:

```git clone git@github.com:andrewerk/store-manager.git```

Then, just go to the project root with:

```cd store-manager```

Finally, build the containers to run the API with docker-compose:

```docker-compose up -d```

This applications unit tests are still in development, but some have been already developed, resulting in test coverage of 60%. If you want to run these tests, you should enter the container shell by typing:

```docker exec -it store-manager-app sh```

And:

```npm test```

If the images created for this application are removed, when rebuilding the Database will be restored.

## Endpoints

To use the API with some client like Insomnia or Postman, you should request to [localhost](http://localhost:3000) with the following endpoints:

### To list all products, the requisition must be of type get to the endpoint: ```/products```

### To get a product by id, the requisition must be of type get to the endpoint: ```/products/id```

### To add a product, the requisition must be of type post to the endpoint: ```/products```

And to pass the validations middleware, the requisition body must be a JSON with the format: ```{ "name": "product", "quantity": 20 }```

### To update a product, the requisition must be of type put to the endpoint: ```/products```

And to pass the validations middleware, the requisition body must be a JSON with the format: ```{ "id": 1, "name": "product", "quantity": 20 }```

To list all sales: ```/sales```



## Skills developed during this Project



## Credits

This application uses the database StoreManager.sql, which was provided by Trybe to complete the project 
