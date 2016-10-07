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
	this._testRouteOn(data, 0);
};

Constructor.prototype._testRouteOn = function (data, id) {
	var route;

	if (id < this._routes.length) {
		route = this._routes[id || 0];

		if (this._matchRoutePatternOn(data, route)) {
			var next = this._testRouteOn.bind(this, data, ++id);
			route.callback(data, next);
		} else {
			this._testRouteOn(data, ++id);
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