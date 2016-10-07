var sinon = require('sinon');

describe('The DataRouter class', function () {
	var DataRouter, sandbox;

	beforeEach(function () {
		DataRouter = require('./../../src/data-router');
		sandbox = sinon.sandbox.create();
	});

	it ('should be a function', function () {
		DataRouter.should.be.a('function');
		sandbox.reset();
	});

	describe('as an instance', function () {
		var instance;

		beforeEach(function () {
			instance = new DataRouter();
		});
		afterEach(function () {
			instance = null;
		});

		it('should implement the use method', function () {
			instance.should.respondTo('register');
		});

		it('should implement the resolve method', function () {
			instance.should.respondTo('resolve');
		});

		it('should resolve to the expected callback when registering to the root routes', function () {
			var spy = sandbox.spy();
			var data = {};

			instance.register(spy);
			instance.resolve(data);

			spy.should.have.been.calledWith(data).once;
		});

		it('should resolve to the expected callback when registering multiple root routes', function () {
			var spy = sandbox.spy();
			var data = {};

			instance.register(function (data, next) {
				next();
			});
			instance.register(spy);
			instance.resolve(data);

			spy.should.have.been.calledWith(data).once;
		});

		it('should resolve to the expected callback when registering with a specific property route', function () {
			var spy = sandbox.spy();
			var data = { bogus: true };

			instance.register('bogus', spy);
			instance.resolve(data);

			spy.should.have.been.calledWith(data).once;
		});

		it('should resolve to the expected callback when registering with multiple specific property routes', function () {
			var spy = sandbox.spy();
			var data = { bogus: true };

			instance.register('bogus', function (data, next) {
				next();
			});
			instance.register('bogus', spy);
			instance.resolve(data);

			spy.should.have.been.calledWith(data).once;
		});

		it('should resolve to the expected callback when registering with a specific property with specific value route', function () {
			var spy = sandbox.spy();
			var data = { foo: 'bar'};

			instance.register('foo', 'bar', spy);
			instance.resolve(data);

			spy.should.have.been.calledWith(data).once;
		});

		it('should resolve to the expected callback when registering with multiple specific property with specific value routes', function () {
			var spy = sandbox.spy();
			var data = { foo: 'bar'};

			instance.register('foo', 'bar', function (data, next) {
				next();
			});
			instance.register('foo', 'bar', spy);
			instance.resolve(data);

			spy.should.have.been.calledWith(data).once;
		});

		it('should resolve to the expected callback when registering with a specific property with partial match route', function () {
			var spy = sandbox.spy();
			var data = { foo: 'barman'};

			instance.register('foo', /bar/gi, spy);
			instance.resolve(data);

			spy.should.have.been.calledWith(data).once;
		});

		it('should resolve to the expected callback when registering with multiple specific property with partial match routes', function () {
			var spy = sandbox.spy();
			var data = { foo: 'barman'};

			instance.register('foo', /ar/gi, function (data, next) {
				next();
			});
			instance.register('foo', /bar/gi, spy);
			instance.resolve(data);

			spy.should.have.been.calledWith(data).once;
		});

		it('should resolve without invoking the callback when there is no matching route', function () {
			var spy = sandbox.spy();
			var data = { foo: 'bar'};

			instance.register('foo', /box/gi, spy);
			instance.resolve(data);

			spy.should.not.have.been.called;
		});

		it('should resolve without invoking the callback when there is no route with a specific value to the specifc property', function () {
			var spy = sandbox.spy();
			var data = { foo: 'bar'};

			instance.register('foo', 'box', spy);
			instance.resolve(data);

			spy.should.not.have.been.called;
		});
	});
});