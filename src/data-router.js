var Constructor = function () {
	this._routes = [];
};

Constructor.prototype.register = function (property, pattern, callback) {

	if (pattern === undefined) {
		callback = property;
		property = undefined;
	} else if (callback === undefined) {
		callback = pattern;
		pattern = undefined;
	}

	var route = {
		property: property,
		pattern: pattern,
		callback: callback
	};

	this._routes.push(route);
};

Constructor.prototype.resolve = function (data) {
	var args = Array.from(arguments);

	this._testRouteOn.call(this, 0, data, args);
};

Constructor.prototype._testRouteOn = function (id, data, args) {
	var route;

	if (id < this._routes.length) {
		route = this._routes[id || 0];

		if (this._matchRoutePatternOn(data, route)) {
			var next = this._testRouteOn.bind(this, ++id, data, args);

			args.push(next);

			route.callback.apply(this, args);
		} else {
			this._testRouteOn.call(this, ++id, data, args);
		}
	}
};

Constructor.prototype._matchRoutePatternOn = function (data, route) {
	var match;

	if (!route.property) {
		match = true;
	} else if (!route.pattern && data[route.property]) {
		match = true;
	} else if (route.property && route.pattern && typeof route.pattern === 'string' && data[route.property] === route.pattern) {
		match = true;
	} else if (route.property && route.pattern && typeof route.pattern === 'object' && data[route.property]) {
		match = data[route.property].match(route.pattern)?true:false;
	} else {
		match = false;
	}

	return match;
};

module.exports = Constructor;