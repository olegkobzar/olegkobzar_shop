/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "b79e94f2b63c1064bd86";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./app.js","vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./app.scss":
/*!***************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./app.scss ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ":root {\n  --purple: #800080;\n  --grey: #708090;\n  --body-bg: #E6E6FA;\n  --main-fz: 16px;\n  --second-fz: 20px;\n  --container-width: 1120px;\n  --container-padding: 20px; }\n\nbody {\n  background-color: var(--body-bg);\n  margin: 0;\n  font-size: var(--main-fz);\n  font-family: 'Roboto', sans-serif;\n  min-height: 100vh; }\n\nhtml {\n  min-height: 100vh; }\n\n.wrapper {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  min-height: 100vh;\n  overflow: hidden; }\n\nul {\n  list-style: none;\n  padding: 0;\n  margin: 0; }\n\na {\n  text-decoration: none;\n  color: var(--grey); }\n\n.container {\n  width: 100%;\n  max-width: var(--container-width);\n  padding: 0 var(--container-padding);\n  margin: 0 auto; }\n", ""]);



/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/aboutProduct/aboutProduct.scss":
/*!************************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/aboutProduct/aboutProduct.scss ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".about-product {\n  max-width: 700px;\n  margin: 0 auto;\n  border-radius: 5px;\n  background-color: rgba(0, 0, 0, 0.2);\n  padding: 20px 30px; }\n  .about-product__name {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    line-height: 1;\n    margin-bottom: 30px; }\n  .about-product__title {\n    font-size: 25px;\n    font-weight: 700;\n    text-transform: uppercase;\n    margin-right: 10px;\n    margin-top: -3px; }\n  .about-product__price {\n    display: flex;\n    align-items: center;\n    margin-bottom: 20px; }\n  .about-product__label {\n    margin-right: 10px; }\n  .about-product__info {\n    margin-bottom: 20px; }\n  .about-product .btn {\n    background-color: #000;\n    color: #fff;\n    border: none;\n    text-align: center;\n    font-size: 20px;\n    padding: 10px 20px;\n    border-radius: 5px;\n    cursor: pointer;\n    outline: none; }\n", ""]);



/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/clock/clock.scss":
/*!**********************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/clock/clock.scss ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".clock h3 {\n  margin: 0 0 10px 0; }\n\n.clock time {\n  width: 100px;\n  height: 100px;\n  border: 2px solid #000;\n  border-radius: 50%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  background-color: #000;\n  color: #fff; }\n  .clock time p {\n    margin-bottom: 0; }\n", ""]);



/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/editText/editText.scss":
/*!****************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/editText/editText.scss ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".edit-text span {\n  cursor: pointer; }\n\n.edit-text input,\n.edit-text textarea {\n  outline: none;\n  font-size: 16px;\n  display: block;\n  width: 100%;\n  padding: 5px 5px; }\n\n.edit-text textarea {\n  resize: none;\n  height: 60px; }\n", ""]);



/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/form/form.scss":
/*!********************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/form/form.scss ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".form {\n  display: flex;\n  flex-direction: column; }\n  .form input,\n  .form select {\n    margin-bottom: 10px;\n    border: 1px solid #000;\n    padding: 10px 10px;\n    outline: none; }\n    .form input.error,\n    .form select.error {\n      border-color: red; }\n    .form input.correct,\n    .form select.correct {\n      border-color: green; }\n", ""]);



/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/gallery/gallery.scss":
/*!**************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/gallery/gallery.scss ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".gallery {\n  display: flex; }\n  .gallery > div {\n    width: 33.33%;\n    height: 190px; }\n    .gallery > div img {\n      max-width: 100%;\n      max-height: 100%;\n      width: auto;\n      height: auto; }\n", ""]);



/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/header/header.scss":
/*!************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/header/header.scss ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".header {\n  background-color: var(--purple); }\n  .header__wrap {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    height: 50px; }\n  .header__logo {\n    text-transform: uppercase;\n    font-weight: 700;\n    font-size: 24px; }\n    .header__logo:hover {\n      color: #fff; }\n  .header__phone {\n    font-weight: 700;\n    font-size: 24px; }\n    .header__phone:hover {\n      color: #fff; }\n", ""]);



/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/info/info.scss":
/*!********************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/info/info.scss ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".info {\n  margin: 20px 0;\n  padding: 10px;\n  border: 1px solid #000; }\n  .info span {\n    display: block;\n    font-size: 20px;\n    padding-bottom: 10px; }\n  .info p {\n    margin-bottom: 10px; }\n", ""]);



/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/infoCategories/infoCategories.scss":
/*!****************************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/infoCategories/infoCategories.scss ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".info-categories {\n  margin: 20px 0;\n  padding: 10px;\n  border: 1px solid #000; }\n  .info-categories span {\n    display: block;\n    font-size: 20px;\n    padding-bottom: 10px; }\n  .info-categories p {\n    margin-bottom: 10px; }\n  .info-categories a {\n    text-decoration: underline; }\n", ""]);



/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/main/main.scss":
/*!********************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/main/main.scss ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".main {\n  padding: 30px 0;\n  overflow: auto; }\n  .main p {\n    margin: 0 0 30px 0; }\n\n.posts li {\n  margin-bottom: 10px;\n  padding-left: 20px;\n  position: relative; }\n  .posts li:before {\n    position: absolute;\n    content: '-';\n    left: 0;\n    top: 0; }\n", ""]);



/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/navigation/navigation.scss":
/*!********************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/navigation/navigation.scss ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".nav ul {\n  display: flex;\n  align-items: center;\n  margin: 0 -15px; }\n  .nav ul li {\n    padding: 0 15px; }\n  .nav ul a {\n    color: #fff; }\n    .nav ul a:hover {\n      color: var(--grey); }\n", ""]);



/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/numbers/numbers.scss":
/*!**************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/numbers/numbers.scss ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".numbers {\n  display: flex;\n  flex-wrap: wrap; }\n  .numbers li {\n    padding-right: 10px; }\n", ""]);



/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/tabs/tabs.scss":
/*!********************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/tabs/tabs.scss ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".nav-tab ul {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  display: flex; }\n  .nav-tab ul a {\n    display: block;\n    padding: 10px 15px;\n    background-color: #eee;\n    transition: all .3s; }\n    .nav-tab ul a.active {\n      color: #fff;\n      background-color: #000; }\n", ""]);



/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/taskList/taskList.scss":
/*!****************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/taskList/taskList.scss ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".task {\n  max-width: 500px;\n  margin: 0 auto; }\n  .task__controlled {\n    display: inline-block;\n    margin-left: 30px; }\n    .task__controlled span {\n      display: inline-block;\n      padding: 0 5px;\n      cursor: pointer; }\n  .task li {\n    text-decoration: none;\n    color: #000; }\n    .task li.done {\n      text-decoration: line-through;\n      opacity: .5; }\n", ""]);



/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/todo/todo.scss":
/*!********************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/todo/todo.scss ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".todo__controlled {\n  display: inline-block;\n  margin-left: 30px; }\n  .todo__controlled span {\n    display: inline-block;\n    padding: 0 5px;\n    cursor: pointer; }\n\n.todo li {\n  text-decoration: none;\n  color: #000; }\n  .todo li.done {\n    text-decoration: line-through;\n    opacity: .5; }\n", ""]);



/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/usersList/usersList.scss":
/*!******************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/usersList/usersList.scss ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".users li strong {\n  margin-right: 4px; }\n", ""]);



/***/ }),

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "../node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "../node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _app_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.scss */ "./app.scss");
/* harmony import */ var _app_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_app_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/header */ "./components/header/index.js");
/* harmony import */ var _components_main__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/main */ "./components/main/index.js");







var App = function App() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "wrapper"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_header__WEBPACK_IMPORTED_MODULE_4__["Header"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "container"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "wrap"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_main__WEBPACK_IMPORTED_MODULE_5__["Main"], null))));
};

var Root = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["BrowserRouter"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(App, null));
react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(Root, document.getElementById('app'));

if (true) {
  module.hot.accept();
}

/***/ }),

/***/ "./app.scss":
/*!******************!*\
  !*** ./app.scss ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./app.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./app.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./app.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./app.scss", function() {
		var newContent = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./app.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./app.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./components/aboutProduct/AboutProduct.js":
/*!*************************************************!*\
  !*** ./components/aboutProduct/AboutProduct.js ***!
  \*************************************************/
/*! exports provided: AboutProduct */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Component, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutProduct", function() { return AboutProduct; });
/* harmony import */ var _aboutProduct_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./aboutProduct.scss */ "./components/aboutProduct/aboutProduct.scss");
/* harmony import */ var _aboutProduct_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_aboutProduct_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _editText__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../editText */ "./components/editText/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var AboutProduct =
/*#__PURE__*/
function (_Component) {
  _inherits(AboutProduct, _Component);

  function AboutProduct() {
    _classCallCheck(this, AboutProduct);

    return _possibleConstructorReturn(this, _getPrototypeOf(AboutProduct).apply(this, arguments));
  }

  _createClass(AboutProduct, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "about-product"
      }, React.createElement("div", {
        className: "about-product__name"
      }, React.createElement("span", {
        className: "about-product__title"
      }, "Title:"), React.createElement(_editText__WEBPACK_IMPORTED_MODULE_1__["EditText"], {
        placeholder: "Product name"
      })), React.createElement("div", {
        className: "about-product__price"
      }, React.createElement("span", {
        className: "about-product__label"
      }, "$"), React.createElement(_editText__WEBPACK_IMPORTED_MODULE_1__["EditText"], {
        placeholder: "Product price"
      })), React.createElement("div", {
        className: "about-product__info"
      }, React.createElement(_editText__WEBPACK_IMPORTED_MODULE_1__["EditText"], {
        textarea: true,
        placeholder: "Product info"
      })), React.createElement("button", {
        className: "btn"
      }, "Save"));
    }
  }]);

  return AboutProduct;
}(Component);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! react */ "../node_modules/react/index.js")["Component"], __webpack_require__(/*! react */ "../node_modules/react/index.js")))

/***/ }),

/***/ "./components/aboutProduct/aboutProduct.scss":
/*!***************************************************!*\
  !*** ./components/aboutProduct/aboutProduct.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./aboutProduct.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/aboutProduct/aboutProduct.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./aboutProduct.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/aboutProduct/aboutProduct.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./aboutProduct.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/aboutProduct/aboutProduct.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./components/aboutProduct/index.js":
/*!******************************************!*\
  !*** ./components/aboutProduct/index.js ***!
  \******************************************/
/*! exports provided: AboutProduct */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AboutProduct__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AboutProduct */ "./components/aboutProduct/AboutProduct.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AboutProduct", function() { return _AboutProduct__WEBPACK_IMPORTED_MODULE_0__["AboutProduct"]; });



/***/ }),

/***/ "./components/clock/Clock.js":
/*!***********************************!*\
  !*** ./components/clock/Clock.js ***!
  \***********************************/
/*! exports provided: Clock */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Component, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Clock", function() { return Clock; });
/* harmony import */ var _clock_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clock.scss */ "./components/clock/clock.scss");
/* harmony import */ var _clock_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_clock_scss__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var date = new Date();
var Clock =
/*#__PURE__*/
function (_Component) {
  _inherits(Clock, _Component);

  function Clock() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Clock);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Clock)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds()
    });

    return _this;
  }

  _createClass(Clock, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.interval = setInterval(function () {
        return _this2.changeClock();
      }, 1000);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.interval);
    }
  }, {
    key: "changeClock",
    value: function changeClock() {
      var date = new Date();
      this.setState({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds()
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          year = _this$state.year,
          month = _this$state.month,
          day = _this$state.day,
          hours = _this$state.hours,
          minutes = _this$state.minutes,
          seconds = _this$state.seconds;
      return React.createElement("div", {
        className: "clock"
      }, React.createElement("h3", null, "Clock:"), React.createElement("time", null, React.createElement("p", null, day >= 10 ? day : "0".concat(day), ".", month >= 10 ? month : "0".concat(month), ".", year), React.createElement("p", null, hours, ":", minutes, ":", seconds)));
    }
  }]);

  return Clock;
}(Component);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! react */ "../node_modules/react/index.js")["Component"], __webpack_require__(/*! react */ "../node_modules/react/index.js")))

/***/ }),

/***/ "./components/clock/clock.scss":
/*!*************************************!*\
  !*** ./components/clock/clock.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./clock.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/clock/clock.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./clock.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/clock/clock.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./clock.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/clock/clock.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./components/clock/index.js":
/*!***********************************!*\
  !*** ./components/clock/index.js ***!
  \***********************************/
/*! exports provided: Clock */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Clock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Clock */ "./components/clock/Clock.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Clock", function() { return _Clock__WEBPACK_IMPORTED_MODULE_0__["Clock"]; });



/***/ }),

/***/ "./components/editText/EditText.js":
/*!*****************************************!*\
  !*** ./components/editText/EditText.js ***!
  \*****************************************/
/*! exports provided: EditText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Component, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditText", function() { return EditText; });
/* harmony import */ var _editText_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editText.scss */ "./components/editText/editText.scss");
/* harmony import */ var _editText_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_editText_scss__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var EditText =
/*#__PURE__*/
function (_Component) {
  _inherits(EditText, _Component);

  function EditText() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, EditText);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(EditText)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      hidden: false,
      text: ''
    });

    _defineProperty(_assertThisInitialized(_this), "handlerClick", function () {
      _this.setState({
        hidden: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handlerBlur", function (e) {
      _this.setState({
        hidden: false
      });

      _this.props.result(e.target.value);
    });

    _defineProperty(_assertThisInitialized(_this), "handlerChange", function (_ref) {
      var target = _ref.target;

      _this.setState({
        text: target.value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "typeEdit", function () {
      var _this$props = _this.props,
          textarea = _this$props.textarea,
          placeholder = _this$props.placeholder;
      var text = _this.state.text;
      return textarea ? React.createElement("textarea", {
        value: text,
        placeholder: placeholder,
        onChange: _this.handlerChange,
        onBlur: _this.handlerBlur,
        autoFocus: true
      }) : React.createElement("input", {
        type: "text",
        value: text,
        placeholder: placeholder,
        onChange: _this.handlerChange,
        onBlur: _this.handlerBlur,
        autoFocus: true
      });
    });

    return _this;
  }

  _createClass(EditText, [{
    key: "render",
    value: function render() {
      var _this$state = this.state,
          hidden = _this$state.hidden,
          text = _this$state.text;
      var placeholder = this.props.placeholder;
      return React.createElement("div", {
        className: "edit-text"
      }, hidden ? this.typeEdit() : React.createElement("span", {
        onClick: this.handlerClick
      }, text || placeholder));
    }
  }]);

  return EditText;
}(Component);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! react */ "../node_modules/react/index.js")["Component"], __webpack_require__(/*! react */ "../node_modules/react/index.js")))

/***/ }),

/***/ "./components/editText/editText.scss":
/*!*******************************************!*\
  !*** ./components/editText/editText.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./editText.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/editText/editText.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./editText.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/editText/editText.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./editText.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/editText/editText.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./components/editText/index.js":
/*!**************************************!*\
  !*** ./components/editText/index.js ***!
  \**************************************/
/*! exports provided: EditText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EditText__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditText */ "./components/editText/EditText.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EditText", function() { return _EditText__WEBPACK_IMPORTED_MODULE_0__["EditText"]; });



/***/ }),

/***/ "./components/form/Form.js":
/*!*********************************!*\
  !*** ./components/form/Form.js ***!
  \*********************************/
/*! exports provided: Form */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Component, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Form", function() { return Form; });
/* harmony import */ var _form_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form.scss */ "./components/form/form.scss");
/* harmony import */ var _form_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_form_scss__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var Form =
/*#__PURE__*/
function (_Component) {
  _inherits(Form, _Component);

  function Form() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Form);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Form)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "fields", [{
      label: 'email',
      reg: /^\w+@\w+\.[a-z]{2,}$/
    }, {
      label: 'name',
      reg: /^[^ ]{3,20}$/
    }, {
      label: 'surname',
      reg: /^[^ ]{3,20}$/
    }, {
      label: 'password',
      reg: /^[^ ]{6,20}$/,
      secure: true
    }]);

    _defineProperty(_assertThisInitialized(_this), "state", _this.fields.reduce(function (acc, item) {
      return _objectSpread({}, acc, _defineProperty({}, item.label, {
        value: '',
        error: ''
      }));
    }, {}));

    _defineProperty(_assertThisInitialized(_this), "changeField", function (_ref) {
      var target = _ref.target;
      var value = target.hasOwnProperty('checked') ? target.checked : target.value;

      _this.setState(_defineProperty({}, target.name, {
        value: value,
        error: ''
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "validateField", function (_ref2, index) {
      var target = _ref2.target;
      var field = _this.fields[index];
      var stateField = _this.state[field.label];

      if (stateField.value.length === 0) {
        _this.setState(_defineProperty({}, field.label, _objectSpread({}, stateField, {
          error: 'This field is required'
        })));

        return;
      }

      if (!field.reg.test(stateField.value)) {
        _this.setState(_defineProperty({}, field.label, _objectSpread({}, stateField, {
          error: 'This field is wrong'
        })));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onSubmit", function (event) {
      event.preventDefault();
      console.log(_this.state);
    });

    return _this;
  }

  _createClass(Form, [{
    key: "getDisabledState",
    value: function getDisabledState() {
      return Object.values(this.state).some(function (state) {
        return !state.value || state.error;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props$disabledF = this.props.disabledFields,
          disabledFields = _this$props$disabledF === void 0 ? [] : _this$props$disabledF;
      return React.createElement("form", {
        className: "form",
        onSubmit: this.onSubmit
      }, this.fields.map(function (_ref3, index) {
        var label = _ref3.label,
            secure = _ref3.secure;
        var state = _this2.state[label];
        return React.createElement("p", {
          key: label
        }, React.createElement("input", {
          type: secure ? 'password' : 'text',
          name: label,
          placeholder: "Enter a ".concat(label),
          value: state.value,
          onChange: _this2.changeField,
          onBlur: function onBlur(e) {
            return _this2.validateField(e, index);
          },
          className: state.error ? 'error' : 'correct',
          disabled: disabledFields.includes(label)
        }), state.error && React.createElement("mark", null, state.error));
      }), React.createElement("input", {
        type: "submit",
        value: "Save",
        disabled: this.getDisabledState()
      }));
    }
  }]);

  return Form;
}(Component);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! react */ "../node_modules/react/index.js")["Component"], __webpack_require__(/*! react */ "../node_modules/react/index.js")))

/***/ }),

/***/ "./components/form/form.scss":
/*!***********************************!*\
  !*** ./components/form/form.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./form.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/form/form.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./form.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/form/form.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./form.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/form/form.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./components/form/index.js":
/*!**********************************!*\
  !*** ./components/form/index.js ***!
  \**********************************/
/*! exports provided: Form */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Form */ "./components/form/Form.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Form", function() { return _Form__WEBPACK_IMPORTED_MODULE_0__["Form"]; });



/***/ }),

/***/ "./components/gallery/Gallery.js":
/*!***************************************!*\
  !*** ./components/gallery/Gallery.js ***!
  \***************************************/
/*! exports provided: Gallery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Component, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Gallery", function() { return Gallery; });
/* harmony import */ var _gallery_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gallery.scss */ "./components/gallery/gallery.scss");
/* harmony import */ var _gallery_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_gallery_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _images__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./images */ "./components/gallery/images/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Gallery =
/*#__PURE__*/
function (_Component) {
  _inherits(Gallery, _Component);

  function Gallery() {
    _classCallCheck(this, Gallery);

    return _possibleConstructorReturn(this, _getPrototypeOf(Gallery).apply(this, arguments));
  }

  _createClass(Gallery, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "gallery"
      }, _images__WEBPACK_IMPORTED_MODULE_1__["default"].map(function (item, index) {
        return React.createElement("div", {
          key: index
        }, React.createElement("img", {
          src: item,
          alt: "kyky"
        }));
      }));
    }
  }]);

  return Gallery;
}(Component);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! react */ "../node_modules/react/index.js")["Component"], __webpack_require__(/*! react */ "../node_modules/react/index.js")))

/***/ }),

/***/ "./components/gallery/gallery.scss":
/*!*****************************************!*\
  !*** ./components/gallery/gallery.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./gallery.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/gallery/gallery.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./gallery.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/gallery/gallery.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./gallery.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/gallery/gallery.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./components/gallery/images/css-logo.svg":
/*!************************************************!*\
  !*** ./components/gallery/images/css-logo.svg ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "3707da3c6a394c7ee2523273f8d98a25.svg";

/***/ }),

/***/ "./components/gallery/images/html-logo.png":
/*!*************************************************!*\
  !*** ./components/gallery/images/html-logo.png ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,bW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArICJlYjhlNGIxYjc2ZGY1NDY1N2VlODg4ZjVjNWQ0MTdmYi5wbmciOw=="

/***/ }),

/***/ "./components/gallery/images/index.js":
/*!********************************************!*\
  !*** ./components/gallery/images/index.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_logo_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js-logo.png */ "./components/gallery/images/js-logo.png");
/* harmony import */ var _js_logo_png__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_logo_png__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _html_logo_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./html-logo.png */ "./components/gallery/images/html-logo.png");
/* harmony import */ var _html_logo_png__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_html_logo_png__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _css_logo_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./css-logo.svg */ "./components/gallery/images/css-logo.svg");
/* harmony import */ var _css_logo_svg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_css_logo_svg__WEBPACK_IMPORTED_MODULE_2__);



/* harmony default export */ __webpack_exports__["default"] = ([_js_logo_png__WEBPACK_IMPORTED_MODULE_0___default.a, _html_logo_png__WEBPACK_IMPORTED_MODULE_1___default.a, _css_logo_svg__WEBPACK_IMPORTED_MODULE_2___default.a]);

/***/ }),

/***/ "./components/gallery/images/js-logo.png":
/*!***********************************************!*\
  !*** ./components/gallery/images/js-logo.png ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,bW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArICIxYTc1NmViNmNhNDcxMTc3Y2RiZDIzMTc0NWFmNTg4NS5wbmciOw=="

/***/ }),

/***/ "./components/gallery/index.js":
/*!*************************************!*\
  !*** ./components/gallery/index.js ***!
  \*************************************/
/*! exports provided: Gallery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Gallery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gallery */ "./components/gallery/Gallery.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Gallery", function() { return _Gallery__WEBPACK_IMPORTED_MODULE_0__["Gallery"]; });



/***/ }),

/***/ "./components/header/Header.js":
/*!*************************************!*\
  !*** ./components/header/Header.js ***!
  \*************************************/
/*! exports provided: Header */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Component, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Header", function() { return Header; });
/* harmony import */ var _header_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header.scss */ "./components/header/header.scss");
/* harmony import */ var _header_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_header_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../navigation */ "./components/navigation/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Header =
/*#__PURE__*/
function (_Component) {
  _inherits(Header, _Component);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, _getPrototypeOf(Header).apply(this, arguments));
  }

  _createClass(Header, [{
    key: "render",
    value: function render() {
      return React.createElement("header", {
        className: "header"
      }, React.createElement("div", {
        className: "container"
      }, React.createElement("div", {
        className: "header__wrap"
      }, React.createElement("a", {
        href: "/one",
        className: "header__logo"
      }, "LOGO"), React.createElement(_navigation__WEBPACK_IMPORTED_MODULE_1__["Navigation"], {
        list: ['Home', 'Products', 'Contacts']
      }), React.createElement("a", {
        href: "tel:0663804909",
        className: "header__phone"
      }, "066-380-49-09"))));
    }
  }]);

  return Header;
}(Component);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! react */ "../node_modules/react/index.js")["Component"], __webpack_require__(/*! react */ "../node_modules/react/index.js")))

/***/ }),

/***/ "./components/header/header.scss":
/*!***************************************!*\
  !*** ./components/header/header.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./header.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/header/header.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./header.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/header/header.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./header.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/header/header.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./components/header/index.js":
/*!************************************!*\
  !*** ./components/header/index.js ***!
  \************************************/
/*! exports provided: Header */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Header */ "./components/header/Header.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Header", function() { return _Header__WEBPACK_IMPORTED_MODULE_0__["Header"]; });



/***/ }),

/***/ "./components/info/Info.js":
/*!*********************************!*\
  !*** ./components/info/Info.js ***!
  \*********************************/
/*! exports provided: Info */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Component, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Info", function() { return Info; });
/* harmony import */ var _info_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./info.scss */ "./components/info/info.scss");
/* harmony import */ var _info_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_info_scss__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var Info =
/*#__PURE__*/
function (_Component) {
  _inherits(Info, _Component);

  function Info() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Info);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Info)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      tasks: 10,
      done: 3,
      progress: 1,
      waiting: 5
    });

    _defineProperty(_assertThisInitialized(_this), "toDo", function () {
      var _this$state = _this.state,
          tasks = _this$state.tasks,
          done = _this$state.done,
          progress = _this$state.progress,
          waiting = _this$state.waiting;

      _this.setState({
        tasks: tasks,
        done: done,
        progress: progress,
        waiting: waiting
      });
    });

    return _this;
  }

  _createClass(Info, [{
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          tasks = _this$state2.tasks,
          done = _this$state2.done,
          progress = _this$state2.progress,
          waiting = _this$state2.waiting;
      return React.createElement("div", {
        className: "info"
      }, React.createElement("span", null, "Hello, UserName"), React.createElement("p", null, "You have ", React.createElement("b", null, tasks), " tasks"), React.createElement("p", null, "Done: ", React.createElement("b", null, done)), React.createElement("p", null, "In progress: ", React.createElement("b", null, progress)), React.createElement("p", null, "Waiting: ", React.createElement("b", null, waiting)), React.createElement("a", {
        href: "/link"
      }, "Go to the task list"));
    }
  }]);

  return Info;
}(Component);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! react */ "../node_modules/react/index.js")["Component"], __webpack_require__(/*! react */ "../node_modules/react/index.js")))

/***/ }),

/***/ "./components/info/index.js":
/*!**********************************!*\
  !*** ./components/info/index.js ***!
  \**********************************/
/*! exports provided: Info */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Info__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Info */ "./components/info/Info.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Info", function() { return _Info__WEBPACK_IMPORTED_MODULE_0__["Info"]; });



/***/ }),

/***/ "./components/info/info.scss":
/*!***********************************!*\
  !*** ./components/info/info.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./info.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/info/info.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./info.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/info/info.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./info.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/info/info.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./components/infoCategories/index.js":
/*!********************************************!*\
  !*** ./components/infoCategories/index.js ***!
  \********************************************/
/*! exports provided: InfoCategories */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _infoCategories__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./infoCategories */ "./components/infoCategories/infoCategories.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InfoCategories", function() { return _infoCategories__WEBPACK_IMPORTED_MODULE_0__["InfoCategories"]; });



/***/ }),

/***/ "./components/infoCategories/infoCategories.js":
/*!*****************************************************!*\
  !*** ./components/infoCategories/infoCategories.js ***!
  \*****************************************************/
/*! exports provided: InfoCategories */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Component, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InfoCategories", function() { return InfoCategories; });
/* harmony import */ var _infoCategories_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./infoCategories.scss */ "./components/infoCategories/infoCategories.scss");
/* harmony import */ var _infoCategories_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_infoCategories_scss__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var InfoCategories =
/*#__PURE__*/
function (_Component) {
  _inherits(InfoCategories, _Component);

  function InfoCategories() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, InfoCategories);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(InfoCategories)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      name: 'John',
      categories: 10,
      published: 3,
      products: 50
    });

    return _this;
  }

  _createClass(InfoCategories, [{
    key: "render",
    value: function render() {
      var _this$state = this.state,
          name = _this$state.name,
          categories = _this$state.categories,
          published = _this$state.published,
          products = _this$state.products;
      return React.createElement("div", {
        className: "info-categories"
      }, React.createElement("span", null, "Hello, ", React.createElement("b", null, name)), React.createElement("p", null, "You have ", React.createElement("b", null, categories), " categories (", React.createElement("b", null, published), " published)"), React.createElement("p", null, "You have ", React.createElement("b", null, products), " products"), React.createElement("a", {
        href: "/link"
      }, "Go to categories"));
    }
  }]);

  return InfoCategories;
}(Component);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! react */ "../node_modules/react/index.js")["Component"], __webpack_require__(/*! react */ "../node_modules/react/index.js")))

/***/ }),

/***/ "./components/infoCategories/infoCategories.scss":
/*!*******************************************************!*\
  !*** ./components/infoCategories/infoCategories.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./infoCategories.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/infoCategories/infoCategories.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./infoCategories.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/infoCategories/infoCategories.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./infoCategories.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/infoCategories/infoCategories.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./components/main/Main.js":
/*!*********************************!*\
  !*** ./components/main/Main.js ***!
  \*********************************/
/*! exports provided: Main */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Component) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Main", function() { return Main; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main.scss */ "./components/main/main.scss");
/* harmony import */ var _main_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_main_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../form */ "./components/form/index.js");
/* harmony import */ var _numbers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../numbers */ "./components/numbers/index.js");
/* harmony import */ var _usersList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../usersList */ "./components/usersList/index.js");
/* harmony import */ var _info__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../info */ "./components/info/index.js");
/* harmony import */ var _clock__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../clock */ "./components/clock/index.js");
/* harmony import */ var _editText__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../editText */ "./components/editText/index.js");
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../todo */ "./components/todo/index.js");
/* harmony import */ var _infoCategories__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../infoCategories */ "./components/infoCategories/index.js");
/* harmony import */ var _tabs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../tabs */ "./components/tabs/index.js");
/* harmony import */ var _gallery__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../gallery */ "./components/gallery/index.js");
/* harmony import */ var _taskList__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../taskList */ "./components/taskList/index.js");
/* harmony import */ var _aboutProduct__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../aboutProduct */ "./components/aboutProduct/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }















var Main =
/*#__PURE__*/
function (_Component) {
  _inherits(Main, _Component);

  function Main() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Main);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Main)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      users: [],
      posts: [],
      todo: [],
      filterTodo: ''
    });

    _defineProperty(_assertThisInitialized(_this), "showUserInfo", function (id) {
      fetch("https://jsonplaceholder.typicode.com/posts?userId=".concat(id)).then(function (data) {
        return data.json();
      }).then(function (posts) {
        return _this.setState({
          posts: posts
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "todoList", function () {
      fetch('https://jsonplaceholder.typicode.com/todos').then(function (data) {
        return data.json();
      }).then(function (todo) {
        return _this.setState({
          todo: todo
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setFilter", function (_ref) {
      var target = _ref.target;

      _this.setState({
        filterTodo: target.value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "filterTodos", function (item) {
      var filterTodo = _this.state.filterTodo;
      return item.title.toLowerCase().includes(filterTodo);
    });

    _defineProperty(_assertThisInitialized(_this), "fn", function (text) {
      return console.log(text);
    });

    return _this;
  }

  _createClass(Main, [{
    key: "getUsers",
    value: function getUsers() {
      var _this2 = this;

      fetch('https://jsonplaceholder.typicode.com/users').then(function (data) {
        return data.json();
      }).then(function (users) {
        return _this2.setState({
          users: users
        });
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      this.getUsers();
      this.todoList();
      setTimeout(function () {
        _this3.setState({
          selectedIndex: 1
        });
      }, 3000);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          users = _this$state.users,
          posts = _this$state.posts,
          todo = _this$state.todo,
          filterTodo = _this$state.filterTodo;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", {
        className: "main"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_tabs__WEBPACK_IMPORTED_MODULE_10__["Tabs"], {
        selectedIndex: this.state.selectedIndex
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_tabs__WEBPACK_IMPORTED_MODULE_10__["Tab"], {
        title: "One"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Users"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_usersList__WEBPACK_IMPORTED_MODULE_4__["UsersList"], {
        list: users
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_tabs__WEBPACK_IMPORTED_MODULE_10__["Tab"], {
        title: "Two"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Gallery"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_gallery__WEBPACK_IMPORTED_MODULE_11__["Gallery"], null))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_taskList__WEBPACK_IMPORTED_MODULE_12__["TaskList"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_aboutProduct__WEBPACK_IMPORTED_MODULE_13__["AboutProduct"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_editText__WEBPACK_IMPORTED_MODULE_7__["EditText"], {
        placeholder: "Click on me and edit",
        result: this.fn
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        placeholder: "Filter",
        value: filterTodo,
        onChange: this.setFilter
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_todo__WEBPACK_IMPORTED_MODULE_8__["Todo"], {
        list: todo.slice(0, 20).filter(this.filterTodos)
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_infoCategories__WEBPACK_IMPORTED_MODULE_9__["InfoCategories"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_form__WEBPACK_IMPORTED_MODULE_2__["Form"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_numbers__WEBPACK_IMPORTED_MODULE_3__["Numbers"], {
        from: "5",
        to: "10"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_numbers__WEBPACK_IMPORTED_MODULE_3__["Numbers"], {
        from: "5",
        to: "10",
        odd: true
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_numbers__WEBPACK_IMPORTED_MODULE_3__["Numbers"], {
        from: "5",
        to: "10",
        even: true
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_usersList__WEBPACK_IMPORTED_MODULE_4__["UsersList"], {
        list: users,
        onClick: this.showUserInfo
      }), posts.length !== 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "posts"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Posts:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, posts.map(function (post, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          key: index
        }, post.body);
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_info__WEBPACK_IMPORTED_MODULE_5__["Info"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_clock__WEBPACK_IMPORTED_MODULE_6__["Clock"], null));
    }
  }]);

  return Main;
}(Component);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! react */ "../node_modules/react/index.js")["Component"]))

/***/ }),

/***/ "./components/main/index.js":
/*!**********************************!*\
  !*** ./components/main/index.js ***!
  \**********************************/
/*! exports provided: Main */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Main */ "./components/main/Main.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Main", function() { return _Main__WEBPACK_IMPORTED_MODULE_0__["Main"]; });



/***/ }),

/***/ "./components/main/main.scss":
/*!***********************************!*\
  !*** ./components/main/main.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./main.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/main/main.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./main.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/main/main.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./main.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/main/main.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./components/navigation/Navigation.js":
/*!*********************************************!*\
  !*** ./components/navigation/Navigation.js ***!
  \*********************************************/
/*! exports provided: Navigation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Navigation", function() { return Navigation; });
/* harmony import */ var _navigation_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./navigation.scss */ "./components/navigation/navigation.scss");
/* harmony import */ var _navigation_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_navigation_scss__WEBPACK_IMPORTED_MODULE_0__);

var Navigation = function Navigation(_ref) {
  var list = _ref.list;
  return React.createElement("nav", {
    className: "nav"
  }, React.createElement("ul", null, list.map(function (listItem, index) {
    return React.createElement("li", {
      key: index
    }, React.createElement("a", {
      href: "/".concat(listItem.toLowerCase())
    }, listItem));
  })));
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! react */ "../node_modules/react/index.js")))

/***/ }),

/***/ "./components/navigation/index.js":
/*!****************************************!*\
  !*** ./components/navigation/index.js ***!
  \****************************************/
/*! exports provided: Navigation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Navigation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Navigation */ "./components/navigation/Navigation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Navigation", function() { return _Navigation__WEBPACK_IMPORTED_MODULE_0__["Navigation"]; });



/***/ }),

/***/ "./components/navigation/navigation.scss":
/*!***********************************************!*\
  !*** ./components/navigation/navigation.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./navigation.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/navigation/navigation.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./navigation.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/navigation/navigation.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./navigation.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/navigation/navigation.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./components/numbers/Numbers.js":
/*!***************************************!*\
  !*** ./components/numbers/Numbers.js ***!
  \***************************************/
/*! exports provided: Numbers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Numbers", function() { return Numbers; });
/* harmony import */ var _numbers_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./numbers.scss */ "./components/numbers/numbers.scss");
/* harmony import */ var _numbers_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_numbers_scss__WEBPACK_IMPORTED_MODULE_0__);

var Numbers = function Numbers(_ref) {
  var from = _ref.from,
      to = _ref.to,
      odd = _ref.odd,
      even = _ref.even;
  var arr = [];

  for (var i = Number(from); i <= Number(to); i++) {
    if (i % 2 && odd) {
      arr.push(i);
    } else if (!(i % 2) && even) {
      arr.push(i);
    } else if (!odd && !even) {
      arr.push(i);
    }
  }

  return React.createElement("ul", {
    className: "numbers"
  }, arr.map(function (item, index) {
    return React.createElement("li", {
      key: index
    }, item);
  }));
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! react */ "../node_modules/react/index.js")))

/***/ }),

/***/ "./components/numbers/index.js":
/*!*************************************!*\
  !*** ./components/numbers/index.js ***!
  \*************************************/
/*! exports provided: Numbers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Numbers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Numbers */ "./components/numbers/Numbers.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Numbers", function() { return _Numbers__WEBPACK_IMPORTED_MODULE_0__["Numbers"]; });



/***/ }),

/***/ "./components/numbers/numbers.scss":
/*!*****************************************!*\
  !*** ./components/numbers/numbers.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./numbers.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/numbers/numbers.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./numbers.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/numbers/numbers.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./numbers.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/numbers/numbers.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./components/tabs/TabNav.js":
/*!***********************************!*\
  !*** ./components/tabs/TabNav.js ***!
  \***********************************/
/*! exports provided: TabNav */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabNav", function() { return TabNav; });
/* harmony import */ var _tabs_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tabs.scss */ "./components/tabs/tabs.scss");
/* harmony import */ var _tabs_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tabs_scss__WEBPACK_IMPORTED_MODULE_0__);

var TabNav = function TabNav(_ref) {
  var list = _ref.list,
      select = _ref.select,
      selectedIndex = _ref.selectedIndex;

  var _onClick = function onClick(e, index) {
    select(index);
    e.preventDefault();
  };

  return React.createElement("nav", {
    className: "nav-tab"
  }, React.createElement("ul", null, list.map(function (el, index) {
    return React.createElement("li", {
      key: index
    }, React.createElement("a", {
      href: "#",
      onClick: function onClick(e) {
        return _onClick(e, index);
      },
      className: selectedIndex === index ? 'active' : ''
    }, el));
  })));
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! react */ "../node_modules/react/index.js")))

/***/ }),

/***/ "./components/tabs/Tabs.js":
/*!*********************************!*\
  !*** ./components/tabs/Tabs.js ***!
  \*********************************/
/*! exports provided: Tab, Tabs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Component, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tab", function() { return Tab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tabs", function() { return Tabs; });
/* harmony import */ var _TabNav__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TabNav */ "./components/tabs/TabNav.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var Tab = function Tab() {
  return null;
};
var Tabs =
/*#__PURE__*/
function (_Component) {
  _inherits(Tabs, _Component);

  function Tabs() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Tabs);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Tabs)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      selectedIndex: _this.props.selectedIndex ? _this.props.selectedIndex : 0
    });

    _defineProperty(_assertThisInitialized(_this), "changeTab", function (selectedIndex) {
      _this.setState({
        selectedIndex: selectedIndex
      });
    });

    return _this;
  }

  _createClass(Tabs, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.selectedIndex !== this.props.selectedIndex) {
        this.setState({
          selectedIndex: this.props.selectedIndex
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var selectedIndex = this.state.selectedIndex;
      var children = this.props.children;
      var childrenType = children.filter(function (child) {
        return child.type === Tab;
      });
      var titles = childrenType.map(function (el) {
        return el.props.title;
      });
      var content = childrenType.map(function (el) {
        return el.props.children;
      });
      return React.createElement("div", null, React.createElement(_TabNav__WEBPACK_IMPORTED_MODULE_0__["TabNav"], {
        list: titles,
        select: this.changeTab,
        selectedIndex: selectedIndex
      }), React.createElement("div", {
        className: "tab"
      }, content[selectedIndex]));
    }
  }]);

  return Tabs;
}(Component);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! react */ "../node_modules/react/index.js")["Component"], __webpack_require__(/*! react */ "../node_modules/react/index.js")))

/***/ }),

/***/ "./components/tabs/index.js":
/*!**********************************!*\
  !*** ./components/tabs/index.js ***!
  \**********************************/
/*! exports provided: Tab, Tabs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tabs */ "./components/tabs/Tabs.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Tab", function() { return _Tabs__WEBPACK_IMPORTED_MODULE_0__["Tab"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Tabs", function() { return _Tabs__WEBPACK_IMPORTED_MODULE_0__["Tabs"]; });



/***/ }),

/***/ "./components/tabs/tabs.scss":
/*!***********************************!*\
  !*** ./components/tabs/tabs.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./tabs.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/tabs/tabs.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./tabs.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/tabs/tabs.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./tabs.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/tabs/tabs.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./components/taskList/TaskList.js":
/*!*****************************************!*\
  !*** ./components/taskList/TaskList.js ***!
  \*****************************************/
/*! exports provided: TaskList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Component, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskList", function() { return TaskList; });
/* harmony import */ var _taskList_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./taskList.scss */ "./components/taskList/taskList.scss");
/* harmony import */ var _taskList_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_taskList_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tabs */ "./components/tabs/index.js");
/* harmony import */ var _tasks_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tasks.js */ "./components/taskList/tasks.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var TaskList =
/*#__PURE__*/
function (_Component) {
  _inherits(TaskList, _Component);

  function TaskList() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TaskList);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TaskList)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      tasks: _tasks_js__WEBPACK_IMPORTED_MODULE_2__["tasks"]
    });

    _defineProperty(_assertThisInitialized(_this), "dayTitle", ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']);

    _defineProperty(_assertThisInitialized(_this), "getCurrentDay", function () {
      var date = new Date();
      var indexNumber = date.getDay();
      if (indexNumber === 0) return 6;
      return indexNumber - 1;
    });

    return _this;
  }

  _createClass(TaskList, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var tasks = this.state.tasks;
      return React.createElement("div", {
        className: "task"
      }, React.createElement(_tabs__WEBPACK_IMPORTED_MODULE_1__["Tabs"], {
        selectedIndex: this.getCurrentDay()
      }, tasks.map(function (day, index) {
        return React.createElement(_tabs__WEBPACK_IMPORTED_MODULE_1__["Tab"], {
          key: index,
          title: _this2.dayTitle[index]
        }, React.createElement("ol", null, " ", day.map(function (dayTask) {
          return React.createElement("li", {
            key: dayTask.id,
            className: dayTask.done ? 'done' : ''
          }, dayTask.title, React.createElement("div", {
            className: "task__controlled"
          }, React.createElement("span", null, "X"), React.createElement("span", null, "V"), React.createElement("span", null, "~")));
        })), React.createElement("a", {
          href: ""
        }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u044B\u0439"));
      })));
    }
  }]);

  return TaskList;
}(Component);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! react */ "../node_modules/react/index.js")["Component"], __webpack_require__(/*! react */ "../node_modules/react/index.js")))

/***/ }),

/***/ "./components/taskList/index.js":
/*!**************************************!*\
  !*** ./components/taskList/index.js ***!
  \**************************************/
/*! exports provided: TaskList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TaskList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TaskList */ "./components/taskList/TaskList.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TaskList", function() { return _TaskList__WEBPACK_IMPORTED_MODULE_0__["TaskList"]; });



/***/ }),

/***/ "./components/taskList/taskList.scss":
/*!*******************************************!*\
  !*** ./components/taskList/taskList.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./taskList.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/taskList/taskList.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./taskList.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/taskList/taskList.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./taskList.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/taskList/taskList.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./components/taskList/tasks.js":
/*!**************************************!*\
  !*** ./components/taskList/tasks.js ***!
  \**************************************/
/*! exports provided: tasks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tasks", function() { return tasks; });
var tasks = [[{
  "description": "Read 'Eloquent javascript'",
  "title": "Read book",
  "day": 0,
  "id": "00",
  "done": true
}, {
  "title": "Write new article",
  "day": 0,
  "id": "01",
  "done": true
}, {
  "title": "Do exercises",
  "day": 0,
  "id": "02",
  "done": true
}, {
  "title": "Cleaning Room",
  "day": 0,
  "id": "03"
}, {
  "title": "Read road rules",
  "day": "0",
  "id": "01544369036785",
  "done": false,
  "description": "1-3 items"
}], [{
  "title": "Make homework",
  "day": 1,
  "id": "10",
  "done": false
}, {
  "title": "Some new task",
  "description": "Task for test purposes",
  "id": "11526855381117",
  "day": "1"
}], [{
  "description": "",
  "title": "Go to gym",
  "day": "2",
  "id": "20"
}, {
  "description": "I need this!",
  "title": "Play PC",
  "day": "2",
  "id": "21"
}], [{
  "title": "Прийти на работу",
  "description": "Не хоцца",
  "id": "30",
  "day": "3"
}], [{
  "title": "Visit a doctor",
  "description": "Go to therapist to check my stomach",
  "id": "40",
  "day": "4",
  "done": false
}, {
  "title": "Meet Red John",
  "id": "41",
  "day": "4",
  "done": true
}], [{
  "title": "Visit grandmother",
  "day": 5,
  "id": "50",
  "done": true,
  "description": ""
}, {
  "title": "Visit Easycode",
  "id": "52",
  "day": "5",
  "done": false,
  "description": ""
}, {
  "title": "Check student's homework",
  "day": "5",
  "id": "53",
  "done": true
}, {
  "title": "New Test",
  "description": "",
  "id": "51526658181443",
  "day": "5"
}], [{
  "title": "Watch cartoons",
  "day": 6,
  "id": "60",
  "done": false
}]];

/***/ }),

/***/ "./components/todo/Todo.js":
/*!*********************************!*\
  !*** ./components/todo/Todo.js ***!
  \*********************************/
/*! exports provided: Todo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Component, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Todo", function() { return Todo; });
/* harmony import */ var _todo_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo.scss */ "./components/todo/todo.scss");
/* harmony import */ var _todo_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_todo_scss__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


var Todo =
/*#__PURE__*/
function (_Component) {
  _inherits(Todo, _Component);

  function Todo() {
    _classCallCheck(this, Todo);

    return _possibleConstructorReturn(this, _getPrototypeOf(Todo).apply(this, arguments));
  }

  _createClass(Todo, [{
    key: "render",
    value: function render() {
      var list = this.props.list;
      return React.createElement("ol", {
        className: "todo"
      }, list.map(function (_ref) {
        var id = _ref.id,
            title = _ref.title,
            completed = _ref.completed;
        var getClass = completed ? 'done' : '';
        return React.createElement("li", {
          key: id,
          className: getClass
        }, title, React.createElement("div", {
          className: "todo__controlled"
        }, React.createElement("span", null, "X"), React.createElement("span", null, "V"), React.createElement("span", null, "~")));
      }));
    }
  }]);

  return Todo;
}(Component);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! react */ "../node_modules/react/index.js")["Component"], __webpack_require__(/*! react */ "../node_modules/react/index.js")))

/***/ }),

/***/ "./components/todo/index.js":
/*!**********************************!*\
  !*** ./components/todo/index.js ***!
  \**********************************/
/*! exports provided: Todo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Todo */ "./components/todo/Todo.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Todo", function() { return _Todo__WEBPACK_IMPORTED_MODULE_0__["Todo"]; });



/***/ }),

/***/ "./components/todo/todo.scss":
/*!***********************************!*\
  !*** ./components/todo/todo.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./todo.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/todo/todo.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./todo.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/todo/todo.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./todo.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/todo/todo.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./components/usersList/UsersList.js":
/*!*******************************************!*\
  !*** ./components/usersList/UsersList.js ***!
  \*******************************************/
/*! exports provided: UsersList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersList", function() { return UsersList; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _usersList_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./usersList.scss */ "./components/usersList/usersList.scss");
/* harmony import */ var _usersList_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_usersList_scss__WEBPACK_IMPORTED_MODULE_1__);



var User = function User(_ref) {
  var data = _ref.data,
      onClick = _ref.onClick;

  var clickHandler = function clickHandler(event) {
    event.preventDefault();
    onClick(data.id);
  };

  var name = data.name,
      email = data.email;
  return React.createElement("li", null, React.createElement("a", {
    href: "#",
    onClick: clickHandler
  }, React.createElement("strong", null, name, " -"), email));
};

var UsersList = function UsersList(_ref2) {
  var list = _ref2.list,
      onClick = _ref2.onClick;
  return React.createElement("ul", {
    className: "users"
  }, list.map(function (data) {
    return React.createElement(User, {
      key: data.id,
      data: data,
      onClick: onClick
    });
  }));
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! react */ "../node_modules/react/index.js")))

/***/ }),

/***/ "./components/usersList/index.js":
/*!***************************************!*\
  !*** ./components/usersList/index.js ***!
  \***************************************/
/*! exports provided: UsersList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UsersList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UsersList */ "./components/usersList/UsersList.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UsersList", function() { return _UsersList__WEBPACK_IMPORTED_MODULE_0__["UsersList"]; });



/***/ }),

/***/ "./components/usersList/usersList.scss":
/*!*********************************************!*\
  !*** ./components/usersList/usersList.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./usersList.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/usersList/usersList.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./usersList.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/usersList/usersList.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./usersList.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./components/usersList/usersList.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ })

/******/ });
//# sourceMappingURL=main.js.map