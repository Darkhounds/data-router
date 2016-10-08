data-router
===

Data routing largely inspired on express routing pattern but decoupled from the request / response paradigm

* Handles routes to be used on all cases.
* Handles routes to be used when the data as a specifc property.
* Handles routes to be used when the data as a property set to a specific value.
* Handles routes to be used when the data as a property with a value matching a specific regex pattern.

- Each route callback receives the evaluated data as first argument and a "next" callback as second argument.
- Every route can invoke the "next" callback argument to resolve the next valid route.

Initialize the router
---
```js
var DataRouter = require('data-router');
var dataRouter = new DataRouter();
```

Register a route to be used on all cases
---
```js
dataRouter.register(function (data, next) {
	console.log('Data:', data);

	next();
});
```

Register a route based on a property name:
---
```js
dataRouter.register('foo', function (data, next) {
	console.log('Data with property "foo":', data);

	next();
});
```

Register a route based on a property exact value
---
```js
dataRouter.register('foo', 'bar', function (data, next) {
	console.log('Data with property "foo" set to "bar":', data);

	next();
});
```

Register a route based on a property value partial match:
---
```js
dataRouter.register('foo', /ba/ig, function (data, next) {
	console.log('Data with property "foo" conaining the /ba/ pattern:', data);

	next();
});
```


Apply existing routes on data object:
---
```js
var data = {
	foo: 'bar',
	payload: {
		bogus: 'stuff',
		name: 'jhon doe'
	}
}

dataRouter.resolve(data);
```
