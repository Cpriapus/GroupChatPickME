if (!Object.keys) {
	Object.keys = function(obj) {
		var keys = [];
		for (var key in obj) {
			keys.push(key);
		}
		return keys;
	}
}

if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(val) {
		return $.inArray(val, this);
	};
}

if (!Array.isArray) {
	Array.isArray = function(obj) {
		return Object.prototype.toString.call(obj) === "[object Array]";
	}
}

function JFramework(app, entry) {

	function getQueryStringArgs() {
		var qs = location.search.length > 0 ? location.search.substring(1) : "",
			args = {},
			items = qs.split("&"),
			len = items.length,
			name = null,
			value = null;
		if (qs.length == 0) {
			return {};
		};
		for (var i = 0; i < len; i++) {
			item = items[i].split("=");
			name = decodeURIComponent(item[0]);
			value = decodeURIComponent(item[1]);
			args[name] = value;
		}
		return args;
	}

	var args = getQueryStringArgs();

	this.getQueryParam = function(key) {
		return args[key];
	}

	this.ready = function(callback) {
		callback && setTimeout(callback, 0);
	}

	entry = entry || 'Index.php';

	var domain = 'lol.ams.game.qq.com';

	this.setDomain = function(name) {
		domain = name;
	}

	this.getDomain = function() {
		return domain;
	}

	var dev;

	this.isDev = function() {
		return dev;
	}

	function getRequestUrl() {
		return '//' + domain + '/lol/' + app + '/' + entry;
	}

	var source = 0;

	if (typeof CommApp_QT != 'undefined') {
		// include <script src="http://qt.qq.com/act/CommonWebQuery/js/QTCommonApp.js"></script>
		CommApp_QT.CheckPlat('lolapp', function() {
			switch (CommApp_QT.sPlat) {
				case 'Browser':
					source = 1;
					break;
				case 'QQ':
					source = 2;
					break;
				case 'WX':
					source = 3;
					break;
				case 'APP':
					source = 4;
					break;
				default:
					console.log('Unknown platform: ' + CommApp_QT.sPlat);
					break;
			}
		});
	}

	var handlers = {};

	var undefined;

	var self = this;

	document.domain = "qq.com";

	this.registerHandler = function(action, func) {
		handlers[action] = func;
	}

	var presendHook;

	this.setPresendHook = function(callback) {
		presendHook = callback;
	}

	var postsendHook;

	this.setPostsendHook = function(callback) {
		postsendHook = callback;
	}

	this.get = function(params, success, fail, sync) {
		var url = getRequestUrl();

		var options = {
			source: source,
		};

		var data = constructData(params, options);
		var actions = data.action.split(',');

		var label = data.action;
		if ($.Deferred) {
			var deferred = $.Deferred();
		}
		try {
			presendHook && presendHook();
			$.ajax({
				url: url,
				async: !sync,
				data: data,
				dataType: 'jsonp',
				xhrFields: {
					// Send cookie
					withCredentials: true
				},
				jsonp: 'callback',
				success: function(data) {
					// Dev
					dev = data.dev;
					if (data.status >= 0) {
						if (actions.length == 1) {
							// Only one action
							success && success(data.msg[actions[0]], data);
							if ($.Deferred) {
								deferred.resolve(data.msg[actions[0]]);
							}
						} else {
							success && success(data.msg, data);
							if ($.Deferred) {
								deferred.resolve(data.msg);
							}
						}
						if (!success) {
							$.each(data.msg, function(key, value) {
								handlers[key] && handlers[key](value);
							});
						}
					} else {
						console.log(url + ' get failed. Code: ' + data.status + '. Error: ' + data.msg);
						if (fail) {
							fail(data.msg, data);
						}
					}
					postsendHook && postsendHook();
				},
				error: function() {
					console.log(url + ' get error.');
					fail && fail();
					postsendHook && postsendHook();
				}
			});
		} catch (ex) {
			fail && fail(ex.message);
		}
		if ($.Deferred) {
			return deferred;
		}
	}

	this.getSync = function(params, success, fail) {
		return self.get(params, success, fail, true);
	}

	this.post = function(params, success, fail) {
		var url = getRequestUrl();
		// Add the iframe with a unique name
		var iframe = document.createElement("iframe");
		var iframeId = "JFramework_" + Date.now();
		document.body.appendChild(iframe);
		iframe.style.display = "none";
		iframe.contentWindow.name = iframeId;
		var iframeCallback = 'jframework_callback_' + Date.now();

		var options = {
			source: source,
			callback: iframeCallback
		};

		var data = constructData(params, options);
		var actions = data.action.split(',');

		var label = data.action;

		if ($.Deferred) {
			var deferred = $.Deferred();
		}

		window[iframeCallback] = function(data) {
			// Remove call back function first, in case exception occured which will prevent the deletion
			delete window[iframeCallback];
			// Dev
			dev = data.dev;
			if (data.status >= 0) {
				if (actions.length == 1) {
					// Only one action
					if (success) {
						success(data.msg[actions[0]], data);
					} else {
						handlers[data.msg[actions[0]]] && handlers[data.msg[actions[0]]](value);
					}
					if ($.Deferred) {
						deferred.resolve(data.msg[actions[0]], data);
					}
				} else {
					if (success) {
						success(data.msg, data);
					} else {
						$.each(data.msg, function(key, value) {
							handlers[key] && handlers[key](value);
						});
					}
					if ($.Deferred) {
						deferred.resolve(data.msg, data);
					}
				}
			} else {
				console.log(url + ' post failed. Error: ' + data.msg);
				fail && fail(data.msg, data);
				if ($.Deferred) {
					deferred.reject(data.msg, data);
				}
			}
		};

		// construct a form with hidden inputs, targeting the iframe
		var form = document.createElement("form");
		form.target = iframeId;
		form.action = url + '?' + $.param(options);
		form.method = "POST";
		// form.enctype = "multipart/form-data";
		// Bug in iOS, use multipart/form-data to post large data will crash
		form.enctype = "application/x-www-form-urlencoded";
		form.acceptCharset = "UTF-8";

		// repeat for each parameter
		$.each(data, function(key, value) {
			if (value instanceof $) {
				// Set form enctype to send file
				form.enctype = "multipart/form-data";
				// Clone a new one and replace
				var clone = value.clone();
				// Clear cloned value
				clone.val('');
				value.before(clone);
				// Hide real
				value.hide();
				value.removeAttr('id');
				var input = value[0];
			} else {
				var input = document.createElement("input");
				input.type = 'hidden';
				if (typeof value === 'string') {
					input.maxlength = value.length;
				}
				input.value = value;
			}
			input.name = key;
			input.visibility = 'hidden';
			form.appendChild(input);
		});

		document.body.appendChild(form);
		presendHook && presendHook();

		iframe.addEventListener('load', function(event) {
			form.remove();
			iframe.remove();
			if (window[iframeCallback]) {
				// Not fire callback
				console.log(url + ' post error.');
				delete window[iframeCallback];
				fail && fail();
			}
			postsendHook && postsendHook();
		});

		// Submit
		document.body.appendChild(form);
		form.submit();

		if ($.Deferred) {
			return deferred;
		}
	}

	this.postFormData = function(params, success, fail, progress, sync) {
		var url = getRequestUrl();

		var options = {
			source: source,
		};

		var data = constructData(params, options);
		var actions = data.action.split(',');

		var label = data.action;

		if ($.Deferred) {
			var deferred = $.Deferred();
		}

		var formData = new FormData();
		$.each(data, function(key, value) {
			formData.append(key, value);
		});

		try {
			presendHook && presendHook();
			$.ajax({
				url: url + '?' + $.param(options),
				method: 'POST',
				async: !sync,
				data: formData,
				dataType: 'json',
				xhr: function() { // custom xhr
					var customXhr = $.ajaxSettings.xhr();
					if (customXhr.upload) { // check if upload property exists
						customXhr.upload.addEventListener('progress', progress, false); // for handling the progress of the upload
					}
					return customXhr;
				},
				xhrFields: {
					// Send cookie
					withCredentials: true
				},
				contentType: false,
				processData: false,
				success: function(data) {
					console.timeEnd(label);
					// Print log
					if (data.log) {
						printLog(data.log, label);
					}
					// Dev
					dev = data.dev;
					if (data.status >= 0) {
						if (actions.length == 1) {
							// Only one action
							success && success(data.msg[actions[0]], data);
							if ($.Deferred) {
								deferred.resolve(data.msg[actions[0]]);
							}
						} else {
							success && success(data.msg, data);
							if ($.Deferred) {
								deferred.resolve(data.msg);
							}
						}
						if (!success) {
							$.each(data.msg, function(key, value) {
								handlers[key] && handlers[key](value);
							});
						}
					} else {
						console.log(url + ' get failed. Code: ' + data.status + '. Error: ' + data.msg);
						if (fail) {
							fail(data.msg, data);
						}
					}
					postsendHook && postsendHook();
				},
				error: function() {
					console.timeEnd(label);
					console.log(url + ' get error.');
					fail && fail();
					postsendHook && postsendHook();
				}
			});
		} catch (ex) {
			fail && fail(ex.message);
		}

		if ($.Deferred) {
			return deferred;
		}
	}

	// Authenticate with cache
	var auth_pass_cbs = [];
	var auth_fail_cbs = [];
	var is_auth;
	var auth_result;
	var auth_init = false;

	this.auth = function(pass, fail, options) {
		if (is_auth === undefined) {
			pass && auth_pass_cbs.push(pass);
			fail && auth_fail_cbs.push(fail);
			if (!auth_init) {
				// Only request once
				auth_init = true;
				var ticket = self.getQueryParam('ticket');
				var param = {
					'Authenticate': {},
				}
				if (options) {
					param.options = options;
				} else {
					param.options = {};
				}
				if (ticket) {
					$.extend(param.options, {
						ticket: ticket
					});
				}
				self.get(param, function(data) {
					is_auth = false;
					auth_result = data.msg;
					if (data.status >= 0) {
						is_auth = true;
						for (var idx in auth_pass_cbs) {
							auth_pass_cbs[idx](data.msg);
						}
					} else if (data.status == -606) {
						// Not login
						need("biz.login", function(LoginManager) {
							LoginManager.login();
						});
					} else if (data.status == -616) {
						for (var idx in auth_fail_cbs) {
							auth_fail_cbs[idx](data.msg);
						}
					} else {
						console.log('Authenticate failed. ErrCode: ' + data.status + '. ErrMsg: ' + data.msg);
					}
					auth_pass_cbs = [];
					auth_fail_cbs = [];
				});
			}
		} else if (is_auth) {
			// Cached
			pass && pass(auth_result);
		} else {
			// Cached
			fail && fail(auth_result);
		}
	}

	// Authenticate without cache
	this.authenticate = function(pass, fail) {
		self.get('Authenticate', function(data) {
			if (data.status >= 0) {
				pass && pass(data.msg);
			} else if (data.status == -606) {
				// Login
				need("biz.login", function(LoginManager) {
					LoginManager.login();
				});
			} else if (data.status == -616) {
				fail && fail(data.msg);
			} else {
				console.log('Authenticate failed. ErrCode: ' + data.status + '. ErrMsg: ' + data.msg);
			}
		});
	}

	this.download = function(params, fail, cookieName) {
		var url = getRequestUrl();

		// Add the iframe with a unique name
		var iframe = document.createElement("iframe");
		var iframeId = "JFramework_" + Date.now();
		document.body.appendChild(iframe);
		iframe.style.display = "none";
		iframe.contentWindow.name = iframeId;
		var iframeCallback = 'jframework_callback_' + Date.now();

		var options = {
			source: source,
			callback: iframeCallback
		};

		var data = constructData(params, options);
		var actions = data.action.split(',');

		var label = data.action;

		// construct a form with hidden inputs, targeting the iframe
		var form = document.createElement("form");
		form.target = iframeId;
		form.action = url + '?' + $.param(options);
		form.method = "POST";
		form.enctype = "multipart/form-data";
		form.acceptCharset = "UTF-8";

		// repeat for each parameter
		$.each(data, function(key, value) {
			var input = document.createElement("input");
			input.type = 'hidden';
			input.value = value;
			input.name = key;
			input.visibility = 'hidden';
			form.appendChild(input);
		});

		// Set timer to check download cookie
		var checkCount = 0;
		var interval = setInterval(function() {
			checkCount++;
			// Only validate 10 times
			if (checkCount > 10 || milo.cookie.get(cookieName || 'jFileDownload') == '1') {
				// Remove callback
				delete window[iframeCallback];
				// Clear timer
				clearInterval(interval);
				// Claer all
				form.remove();
				iframe.remove();
				milo.cookie.set(cookieName || 'jFileDownload', '');
			}
		}, 5000);

		window[iframeCallback] = function(data) {
			console.log(url + ' download failed.');
			// Remove call back function first, in case exception occured which will prevent the deletion
			delete window[iframeCallback];
			// Clear timer
			clearInterval(interval);
			if (data.status >= 0) {
				if (actions.length == 1) {
					// Only one action
					if (fail) {
						fail(data.msg[actions[0]], data);
					} else {
						handlers[data.msg[actions[0]]] && handlers[data.msg[actions[0]]](value);
					}
				} else {
					if (fail) {
						fail(data.msg, data);
					} else {
						$.each(data.msg, function(key, value) {
							handlers[key] && handlers[key](value);
						});
					}
				}
			} else {
				fail && fail(data, data);
			}
		};

		iframe.addEventListener('load', function(event) {
			form.remove();
			iframe.remove();
		});

		// Submit
		document.body.appendChild(form);
		form.submit();

	}

	this.parseParamFromElem = function(config, success, fail) {
		var deferred = $.Deferred();
		var succeeded = true;
		var params = {};
		var elemList = config.config;
		var prefix = config.prefix || '';
		var gAllowEmpty = config.allowEmpty === true;
		var gAutoFocus = config.autoFocus !== false;
		for (var id in elemList) {
			var elem = $('#' + prefix + id);
			if (!elem.length) {
				throw 'Element: ' + prefix + id + ' does not exist';
				return;
			}
			var type = typeof elemList[id] === 'string' ? elemList[id] : elemList[id].type;
			var allowEmpty = typeof(elemList[id].empty) == "undefined" ? gAllowEmpty : elemList[id].empty === true;
			var required = typeof(elemList[id].required) == "undefined" ? false : elemList[id].required;
			var autoFocus = typeof(elemList[id].empty) == "undefined" ? gAllowEmpty : elemList[id].focus !== false;
			var hint = elemList[id].hint;
			var value;
			switch (type) {
				case 'string':
					value = elem.val();
					break;
				case 'text':
					if (elem.prop('tagName').toLowerCase() == 'select') {
						value = elem.find('option:selected').text();
					} else {
						value = elem.text();
					}
					break;
				case 'int':
					value = parseInt(elem.val()) || 0;
					break;
				case 'float':
					value = parseFloat(elem.val());
					break;
				case 'radio-radio':
					value = elem.find('input[type="radio"]:checked').val();
					break;
				case 'checkbox-list':
					value = elem.find('input[type="checkbox"]:checked').map(function() {
						return this.value;
					}).get().join();
					break;
				case 'file':
					if (elem.val()) {
						value = elem;
					}
					break;
				default:
					throw 'Unknown param type ' + elemList[id];
					break;
			}
			if (!value) {
				if (!allowEmpty) {
					succeeded = false;
					hint && alert(hint);
					autoFocus && elem.focus();
					break;
				} else if (required) {
					params[id] = value;
				}
			} else {
				params[id] = value;
			}
		}

		if (succeeded) {
			deferred.resolve(params);
			success && success(params);
		} else {
			deferred.reject();
			fail && fail();
		}

		return deferred.promise;
	}

	this.fillElemFromParam = function(config, data) {
		var elemList = config.config;
		var prefix = config.prefix || '';
		for (var id in elemList) {
			var elem = $('#' + prefix + id);
			if (!elem.length) {
				throw 'Element: ' + prefix + id + ' does not exist';
				return;
			}
			if (data[id]) {
				var type = typeof elemList[id] === 'string' ? elemList[id] : elemList[id].type;
				switch (type) {
					case 'radio-radio':
						elem.find('input[type="radio"][value="' + data[id] + '"]').prop('checked', true).change();
						break;
					case 'checkbox-list':
						var list = data[id].split(',');
						for (var idx in list) {
							elem.find('input[type="checkbox"][value="' + list[idx] + '"]').prop('checked', true).change();
						}
						break;
					case 'text':
						if (elem.prop('tagName').toLowerCase() == 'select') {
							elem.find("option:contains('" + data[id] + "')").attr('selected', 'selected');
							elem.change();
						} else {
							elem.text(data[id]);
						}
						break;
					case 'string':
					case 'int':
					case 'float':
					default:
						elem.val(data[id]).change();
						break;
				}
			} else {
				console.log('Data: ' + id + ' does not exist');
			}
		}
	}

	this.clearElemByConfig = function(config) {
		var elemList = config.config;
		var prefix = config.prefix || '';
		for (var id in elemList) {
			var elem = $('#' + prefix + id);
			if (!elem.length) {
				throw 'Element: ' + prefix + id + ' does not exist';
				return;
			}
			var type = typeof elemList[id] === 'string' ? elemList[id] : elemList[id].type;
			switch (type) {
				case 'radio-radio':
					elem.find('input[type="radio"]').prop('checked', false);
					break;
				case 'checkbox-list':
					elem.find('input[type="checkbox"]').prop('checked', false);
					break;
				case 'text':
					if (elem.prop('tagName').toLowerCase() == 'select') {
						elem.find("option").removeAttr('selected');
						elem.change();
					} else {
						elem.text(data[id]);
					}
					break;
				case 'string':
				case 'int':
				case 'float':
				default:
					if (elemList[id]['default']) {
						elem.val(elemList[id]['default']);
					} else {
						elem.val('');
					}
					break;
			}
		}
	}

	function constructData(params, options) {
		// Construct data
		var data = {};
		// Process options
		if (params.options) {
			$.extend(options, params.options);
			delete params.options;
		}
		for (var idx in options) {
			data[idx] = options[idx];
		}
		var actions;
		if (typeof params === 'object') {
			if (Array.isArray(params)) {
				actions = params;
			} else {
				actions = Object.keys(params);
				for (var idx in actions) {
					for (var key in params[actions[idx]]) {
						var param = params[actions[idx]][key];
						var value;
						if (param instanceof $) {
							// Whether file input
							if (!param[0].nodeName == 'input' || param.attr('type') != 'file') {
								throw 'None input file passed';
							}
							value = param;
						} else if (param instanceof File) {
							value = param;
						} else if (typeof param === 'object') {
							value = JSON.stringify(param);
						} else if (param == undefined) {
							value = null;
						} else {
							value = param.toString();
						}
						data[idx + '_' + key] = value;
					}
				}
			}
		} else if (typeof params === 'string') {
			actions = [params];
		} else {
			console.log('Unsupported type ' + typeof params);
			return;
		}
		data.action = actions.join(',');
		return data;
	}

	// Error report
	window.onerror = function(msg, url, line) {
		// self.get({
		// 	FrontErrorReport: {
		// 		msg: msg,
		// 		url: url,
		// 		line: line,
		// 	}
		// }, function(data) {
		// 	// Do nothing
		// });
		$.ajax({
			url: '//logs.game.qq.com/easnew/go/eas.php',
			data: {
				click_type: 210,
				errcode: 114,
				suberrcode: -1000,
				servicetype: 'lol',
				filepath: url,
				logcontent: msg + '(' + url + ':' + line + ')'
			},
			dataType: 'jsonp'
		});
	}

}