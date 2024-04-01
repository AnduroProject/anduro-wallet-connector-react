"use strict";
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = function(target, all) {
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = function(to, from, except, desc) {
    if (from && typeof from === "object" || typeof from === "function") {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            var _loop = function() {
                var key = _step.value;
                if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
                    get: function() {
                        return from[key];
                    },
                    enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
                });
            };
            for(var _iterator = __getOwnPropNames(from)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop();
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
    return to;
};
var __toESM = function(mod, isNodeMode, target) {
    return target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(// If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
        value: mod,
        enumerable: true
    }) : target, mod);
};
var __toCommonJS = function(mod) {
    return __copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
};
// src/index.ts
var src_exports = {};
__export(src_exports, {
    useConnector: function() {
        return useConnector;
    }
});
module.exports = __toCommonJS(src_exports);
// src/hooks/useConnector.ts
var import_react = __toESM(require("react"));
var import_events = require("events");
var walletInformation = {
    accountPublicKey: "",
    connectionState: "disconnected"
};
var networkInformation = {
    chainId: null,
    networkType: ""
};
var useConnector = function(props) {
    var walletEvent = new import_events.EventEmitter();
    var _ref = _sliced_to_array((0, import_react.useState)(null), 2), childWindow = _ref[0], setChildWindow = _ref[1];
    var _ref1 = _sliced_to_array((0, import_react.useState)(""), 2), requestType = _ref1[0], setRequestType = _ref1[1];
    var _ref2 = _sliced_to_array((0, import_react.useState)({
        transactionType: "",
        amount: 0,
        receiverAddress: "",
        feeRate: 1,
        onComplete: null
    }), 2), transactionData = _ref2[0], setTransactionData = _ref2[1];
    var _import_react_default_useState = _sliced_to_array(import_react.default.useState(null), 2), requestData = _import_react_default_useState[0], setRequestData = _import_react_default_useState[1];
    var _import_react_default_useState1 = _sliced_to_array(import_react.default.useState({
        name: "",
        symbol: "",
        imageUrl: "",
        supply: 0,
        properties: [
            {
                type: "",
                value: ""
            }
        ],
        assetType: 0,
        transactionType: "",
        receiverAddress: "",
        onComplete: null
    }), 2), createAssetData = _import_react_default_useState1[0], setCreateAssetData = _import_react_default_useState1[1];
    var _import_react_default_useState2 = _sliced_to_array(import_react.default.useState({
        assetId: 0,
        receiverAddress: "",
        supply: 0,
        onComplete: null
    }), 2), transferAssetData = _import_react_default_useState2[0], setTransferAssetData = _import_react_default_useState2[1];
    var windowFeatures = "left=1000,top=100,width=370,height=550,fullscreen=yes,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,directories=no, status=no, titlebar=no";
    (0, import_react.useEffect)(function() {
        if (networkInformation.chainId === null && childWindow === null) {
            var url = "".concat(props.walletUrl, "?requestType=networkinfo");
            var targetWindow = window.open(url, "_blank", windowFeatures);
            setChildWindow(targetWindow);
            setRequestType("networkinfo");
        }
    }, [
        networkInformation
    ]);
    (0, import_react.useEffect)(function() {
        if (childWindow != null) {
            window.addEventListener("close", function(event) {
                alert("Window closed");
            });
            window.addEventListener("message", handleMessage);
            return function() {
                window.removeEventListener("message", handleMessage);
            };
        }
    }, [
        childWindow
    ]);
    var handleMessage = function(event) {
        console.log("Message Received", event.data);
        if (event.data.type === "connection-response") {
            if (event.data.status) {
                childWindow.close();
                setNetworkInformation(event.data.result);
                requestData.onComplete(event.data);
                console.log("test22222");
                walletEvent.emit("connectionresponse", event.data);
            } else {
                requestData.onComplete(event.data);
            }
        } else if (event.data.type === "account-not-created") {
            childWindow.close();
            requestData.onComplete(event.data);
        } else if (event.data.type === "wallet-loaded") {
            if (event.data.status) {
                if (requestType === "connect" || requestType === "disconnect") {
                    sendMessageToChildWindow({
                        requestType: requestType,
                        siteurl: window.location.origin,
                        chainId: requestData.chainId
                    });
                    console.log("test1");
                    walletEvent.emit("connectionresponse", event.data);
                } else if (requestType === "networkinfo") {
                    sendMessageToChildWindow({
                        requestType: requestType,
                        siteurl: window.location.origin
                    });
                } else if (requestType === "send") {
                    sendMessageToChildWindow({
                        requestType: requestType,
                        transactionType: transactionData.transactionType,
                        amount: transactionData.amount,
                        receiverAddress: transactionData.receiverAddress,
                        feerate: transactionData.feeRate,
                        chainId: networkInformation.chainId
                    });
                } else if (requestType === "create-asset") {
                    var formValues = {
                        headline: createAssetData.name,
                        imageUrl: createAssetData.imageUrl,
                        supply: createAssetData.supply,
                        imagebase64Data: {
                            data: "",
                            type: ""
                        },
                        symbol: createAssetData.symbol
                    };
                    sendMessageToChildWindow({
                        requestType: requestType,
                        transactionType: createAssetData.transactionType,
                        formValues: formValues,
                        assetType: createAssetData.assetType,
                        properties: createAssetData.properties,
                        chainId: networkInformation.chainId,
                        supply: createAssetData.supply,
                        receiverAddress: createAssetData.receiverAddress,
                        assetId: createAssetData.assetId
                    });
                } else if (requestType === "transfer-asset") {
                    sendMessageToChildWindow({
                        requestType: requestType,
                        chainId: networkInformation.chainId,
                        supply: transferAssetData.supply,
                        receiverAddress: transferAssetData.receiverAddress,
                        assetId: transferAssetData.assetId
                    });
                }
            }
        } else if (event.data.type === "networkinfo-response") {
            childWindow.close();
            if (event.data.status) {
                setNetworkInformation(event.data.result);
            }
        } else if (event.data.type === "send-response" || event.data.type === "create-asset-response" || event.data.type === "disconnect-response") {
            childWindow.close();
            if (transactionData.onComplete) {
                transactionData.onComplete(event.data);
            } else if (createAssetData.onComplete) {
                createAssetData.onComplete(event.data);
            }
        }
    };
    var sendMessageToChildWindow = function(data) {
        childWindow.postMessage(data, "*");
    };
    var setNetworkInformation = function(params) {
        networkInformation.chainId = params.chainId;
        networkInformation.networkType = params.networkType;
        walletInformation.accountPublicKey = params.accountPublicKey;
        walletInformation.connectionState = params.connectionState;
    };
    var connect = function() {
        var _ref = _async_to_generator(function(params) {
            return _ts_generator(this, function(_state) {
                return [
                    2,
                    new Promise(function(resolve, reject) {
                        var url = "".concat(props.walletUrl, "?requestType=connect");
                        var childWindow2 = window.open(url, "_blank", windowFeatures);
                        setRequestType("connect");
                        setChildWindow(childWindow2);
                        console.log("datares4", params);
                        setRequestData({
                            chainId: params.chainId,
                            onComplete: params.onComplete
                        });
                        console.log("datares1", params);
                        walletEvent.on("connectionresponse", function() {
                            var _ref = _async_to_generator(function(data) {
                                var response;
                                return _ts_generator(this, function(_state) {
                                    switch(_state.label){
                                        case 0:
                                            console.log("datares", data);
                                            return [
                                                4,
                                                data
                                            ];
                                        case 1:
                                            response = _state.sent();
                                            console.log("datares111", response);
                                            resolve(response);
                                            return [
                                                2
                                            ];
                                    }
                                });
                            });
                            return function(data) {
                                return _ref.apply(this, arguments);
                            };
                        }());
                    })
                ];
            });
        });
        return function connect(params) {
            return _ref.apply(this, arguments);
        };
    }();
    var disconnect = function() {
        var url = "".concat(props.walletUrl, "?requestType=disconnect");
        var childWindow2 = window.open(url, "_blank", windowFeatures);
        setRequestType("disconnect");
        setChildWindow(childWindow2);
    };
    var getNetworkInformation = function() {
        return networkInformation;
    };
    var getWalletInformation = function() {
        return walletInformation;
    };
    var send = function(params) {
        if (checkWalletConnection(params.onComplete, "")) {
            var validateTransactionTypeResult = validateSendTransactionType(params.transactionType);
            if (!validateTransactionTypeResult) {
                params.onComplete({
                    status: false,
                    error: "can't process your request, Invalid transaction type",
                    result: null
                });
                return;
            }
            var url = "".concat(props.walletUrl, "?requestType=send");
            var childWindow2 = window.open(url, "_blank", windowFeatures);
            setRequestType("send");
            setChildWindow(childWindow2);
            setTransactionData(params);
        }
    };
    var checkWalletConnection = function(onError, transactionType) {
        var status = true;
        var error = null;
        if (networkInformation.chainId === null || networkInformation.networkType === "") {
            status = false;
            error = "The wallet is not connected.";
        } else if (transactionType && networkInformation.networkType === "bitcoin") {
            status = false;
            error = "can't process your request, Invalid transaction type.";
        }
        if (!status) {
            onError({
                status: status,
                result: null,
                error: error
            });
        }
        return status;
    };
    var validateSendTransactionType = function(transactionType) {
        var status = false;
        if (transactionType === "normal") {
            status = true;
        } else if (transactionType === "pegin") {
            status = networkInformation.networkType === "bitcoin";
        } else if (transactionType === "pegout") {
            status = networkInformation.networkType === "sidechain";
        }
        return status;
    };
    var createasset = function(params) {
        if (checkWalletConnection(params.onComplete, params.transactionType)) {
            var url = "".concat(props.walletUrl, "?requestType=create-asset");
            var childWindow2 = window.open(url, "_blank", windowFeatures);
            setRequestType("create-asset");
            setChildWindow(childWindow2);
            setCreateAssetData(params);
        }
    };
    var transferasset = function(params) {
        if (checkWalletConnection(params.onComplete, "transfer")) {
            var url = "".concat(props.walletUrl, "?requestType=transfer-asset");
            var childWindow2 = window.open(url, "_blank", windowFeatures);
            setRequestType("transfer-asset");
            setChildWindow(childWindow2);
            setTransferAssetData(params);
        }
    };
    return {
        connect: connect,
        getNetworkInformation: getNetworkInformation,
        send: send,
        createasset: createasset,
        transferasset: transferasset,
        disconnect: disconnect,
        getWalletInformation: getWalletInformation
    };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    useConnector: useConnector
});
//# sourceMappingURL=index.js.map