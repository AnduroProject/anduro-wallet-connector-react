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
    UseConnectorProvider: function() {
        return UseConnectorProvider;
    },
    useConnector: function() {
        return useConnector;
    }
});
module.exports = __toCommonJS(src_exports);
// src/hooks/useConnector.tsx
var import_react = __toESM(require("react"));
// src/helpers/errorMessages.tsx
var FAIL_PROCESS = "Can't process your request";
var ERROR_MESSAGES = {
    walletNotConnected: "The wallet is not connected.",
    transactionTypeRequired: "".concat(FAIL_PROCESS, ", Transaction Type is required"),
    transactionTypeInvalid: "".concat(FAIL_PROCESS, ", Invalid transaction type"),
    amountRequired: "".concat(FAIL_PROCESS, ", Amount is required"),
    nameRequired: "".concat(FAIL_PROCESS, ", Name is required"),
    symbolRequired: "".concat(FAIL_PROCESS, ", Symbol is required"),
    imageUrlRequired: "".concat(FAIL_PROCESS, ", Image Url is required"),
    supplyRequired: "".concat(FAIL_PROCESS, ", Supply is required"),
    assetTypeRequired: "".concat(FAIL_PROCESS, ", Asset Type is required"),
    assetTypeInvalid: "".concat(FAIL_PROCESS, ", Invalid Asset Type"),
    assetIdRequired: "".concat(FAIL_PROCESS, ", Asset Id is required"),
    receiverAddressRequired: "".concat(FAIL_PROCESS, ", Receiver Address is required")
};
// src/helpers/handleResponse.tsx
var handleErrorResponse = function() {
    var error = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
    return {
        status: false,
        result: null,
        error: error
    };
};
var handleSuccessResponse = function() {
    var result = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
    return {
        status: true,
        result: result.result ? result.result : result,
        error: null
    };
};
// src/helpers/handleWalletWindow.tsx
var openWalletWindow = function(url) {
    var _window_top, _window_top1, _window_top2, _window_top3;
    var inputWidth = 370;
    var inputHeight = 550;
    var viewportwidth = document.documentElement.clientWidth;
    var tempW = (_window_top = window.top) === null || _window_top === void 0 ? void 0 : _window_top.outerWidth;
    var tempH = (_window_top1 = window.top) === null || _window_top1 === void 0 ? void 0 : _window_top1.outerHeight;
    var tempSY = (_window_top2 = window.top) === null || _window_top2 === void 0 ? void 0 : _window_top2.screenY;
    var tempSX = (_window_top3 = window.top) === null || _window_top3 === void 0 ? void 0 : _window_top3.screenX;
    var y = tempH / 2 + tempSY - inputHeight / 2;
    var x = tempW / 2 + tempSX - inputWidth / 2;
    if (viewportwidth > 800) {
        x = viewportwidth - 300;
        y = 0;
    }
    return window.open(url, "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=".concat(inputWidth, ", height=").concat(inputHeight, ", right=0, top=").concat(y, ", left=").concat(x));
};
// src/hooks/useConnector.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var useConnector = import_react.default.createContext(null);
var resolvePromise = null;
var UseConnectorProvider = function(props) {
    var _ref = _sliced_to_array((0, import_react.useState)(null), 2), childWindow = _ref[0], setChildWindow = _ref[1];
    var _ref1 = _sliced_to_array((0, import_react.useState)(), 2), requestType = _ref1[0], setRequestType = _ref1[1];
    var _ref2 = _sliced_to_array((0, import_react.useState)({}), 2), transactionData = _ref2[0], setTransactionData = _ref2[1];
    var _ref3 = _sliced_to_array((0, import_react.useState)({}), 2), signData = _ref3[0], setSignData = _ref3[1];
    var _import_react_default_useState = _sliced_to_array(import_react.default.useState(null), 2), requestData = _import_react_default_useState[0], setRequestData = _import_react_default_useState[1];
    var _import_react_default_useState1 = _sliced_to_array(import_react.default.useState({}), 2), createAssetData = _import_react_default_useState1[0], setCreateAssetData = _import_react_default_useState1[1];
    var _import_react_default_useState2 = _sliced_to_array(import_react.default.useState({}), 2), transferAssetData = _import_react_default_useState2[0], setTransferAssetData = _import_react_default_useState2[1];
    var _import_react_default_useState3 = _sliced_to_array(import_react.default.useState({
        chainId: null,
        networkType: ""
    }), 2), networkState = _import_react_default_useState3[0], setNetworkState = _import_react_default_useState3[1];
    var _import_react_default_useState4 = _sliced_to_array(import_react.default.useState({
        accountPublicKey: "",
        connectionState: "disconnected"
    }), 2), walletState = _import_react_default_useState4[0], setWalletState = _import_react_default_useState4[1];
    var _ref4 = _sliced_to_array((0, import_react.useState)(props.walletURL), 2), walletURL = _ref4[0], setWalletURL = _ref4[1];
    var _ref5 = _sliced_to_array((0, import_react.useState)(), 2), signTransactionData = _ref5[0], setSignTransactionData = _ref5[1];
    (0, import_react.useEffect)(function() {
        if (childWindow != null) {
            window.addEventListener("message", handleMessage);
            return function() {
                window.removeEventListener("message", handleMessage);
            };
        }
    }, [
        childWindow
    ]);
    var handleMessage = function(event) {
        if (!event.data.type) return false;
        if (event.data.type == "webpackOk") return false;
        if (event.data.type === "wallet-loaded" /* walletLoaded */ ) return handlewalletLoadedMessage();
        if (childWindow) childWindow.close();
        if (!event.data.status) {
            if (resolvePromise) {
                return resolvePromise(handleErrorResponse(event.data.error ? event.data.error : event.data));
            } else {
                return handleErrorResponse(event.data.error ? event.data.error : event.data);
            }
        }
        switch(event.data.type){
            case "connection-response" /* connectionResponse */ :
                updateNetworkInformation(event.data.result);
                updateWalletInformation("connected", event.data.result.accountPublicKey);
                resolvePromise(handleSuccessResponse(event.data));
                break;
            case "account-not-created" /* accountNotCreated */ :
                if (resolvePromise) resolvePromise(handleErrorResponse(event.data));
                break;
            case "networkinfo-response" /* networkinfoResponse */ :
                updateNetworkInformation(event.data.result);
                updateWalletInformation("conneted", event.data.result.accountPublicKey);
                break;
            case "disconnect-response" /* disconnectResponse */ :
                updateNetworkInformation({
                    chainId: null,
                    networkType: ""
                });
                updateWalletInformation("disconnected", "");
                if (resolvePromise) resolvePromise(handleSuccessResponse(event.data));
                break;
            default:
                if (resolvePromise) resolvePromise(handleSuccessResponse(event.data));
                break;
        }
    };
    var handlewalletLoadedMessage = function() {
        if (requestType === "connect" /* connect */  || requestType === "disconnect" /* disconnected */ ) {
            sendMessageToChildWindow({
                requestType: requestType,
                siteurl: window.location.origin,
                chainId: requestData ? requestData.chainId : 0
            });
        } else if (requestType === "networkinfo" /* networkinfo */ ) {
            sendMessageToChildWindow({
                requestType: requestType,
                siteurl: window.location.origin
            });
        } else if (requestType === "send" /* send */ ) {
            sendMessageToChildWindow({
                requestType: requestType,
                transactionType: transactionData.transactionType,
                amount: transactionData.amount,
                receiverAddress: transactionData.receiverAddress,
                feerate: transactionData.feeRate,
                chainId: networkState.chainId
            });
        } else if (requestType === "create-asset" /* createAsset */ ) {
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
                chainId: networkState.chainId,
                supply: createAssetData.supply,
                receiverAddress: createAssetData.receiverAddress,
                assetId: createAssetData.assetId
            });
        } else if (requestType === "transfer-asset" /* transferAsset */ ) {
            sendMessageToChildWindow({
                requestType: requestType,
                chainId: networkState.chainId,
                supply: transferAssetData.supply,
                receiverAddress: transferAssetData.receiverAddress,
                assetId: transferAssetData.assetId
            });
        } else if (requestType === "sign" /* sign */ ) {
            sendMessageToChildWindow({
                requestType: requestType,
                chainId: networkState.chainId,
                message: signData.message
            });
        } else if (requestType === "sign-transaction" /* signTransaction */  || requestType === "send-transaction" /* sendTransaction */  || requestType === "sign-and-send-transaction" /* signAndSendTransaction */ ) {
            sendMessageToChildWindow({
                requestType: requestType,
                chainId: networkState.chainId,
                hex: signTransactionData === null || signTransactionData === void 0 ? void 0 : signTransactionData.hex
            });
        }
    };
    var sendMessageToChildWindow = function(data) {
        childWindow.postMessage(data, "*");
    };
    var updateNetworkInformation = function(params) {
        setNetworkState({
            chainId: params.chainId,
            networkType: params.networkType
        });
    };
    var updateWalletInformation = function(connectionState, accountPublicKey) {
        setWalletState({
            accountPublicKey: accountPublicKey,
            connectionState: connectionState
        });
    };
    var connect = function() {
        var _ref = _async_to_generator(function(params) {
            return _ts_generator(this, function(_state) {
                return [
                    2,
                    new Promise(function(resolve) {
                        var url = "".concat(walletURL, "?requestType=", "connect" /* connect */ );
                        var childWindow2 = openWalletWindow(url);
                        setWalletURL(walletURL);
                        setRequestType("connect" /* connect */ );
                        setChildWindow(childWindow2);
                        setRequestData({
                            chainId: params.chainId
                        });
                        updateWalletInformation("connecting", "");
                        resolvePromise = resolve;
                    })
                ];
            });
        });
        return function connect(params) {
            return _ref.apply(this, arguments);
        };
    }();
    var networkInfo = function() {
        var _ref = _async_to_generator(function() {
            return _ts_generator(this, function(_state) {
                return [
                    2,
                    new Promise(function(resolve) {
                        var url = "".concat(walletURL, "?requestType=", "networkinfo" /* networkinfo */ );
                        var childWindow2 = openWalletWindow(url);
                        setRequestType("networkinfo" /* networkinfo */ );
                        setChildWindow(childWindow2);
                        resolvePromise = resolve;
                    })
                ];
            });
        });
        return function networkInfo() {
            return _ref.apply(this, arguments);
        };
    }();
    var disconnect = function() {
        return new Promise(function(resolve) {
            var url = "".concat(walletURL, "?requestType=", "disconnect" /* disconnected */ );
            var childWindow2 = openWalletWindow(url);
            setRequestType("disconnect" /* disconnected */ );
            setChildWindow(childWindow2);
            updateWalletInformation("disconnecting", "");
            resolvePromise = resolve;
        });
    };
    var send = function(params) {
        if (!params.transactionType) return handleErrorResponse(ERROR_MESSAGES.transactionTypeRequired);
        if (!params.amount) return handleErrorResponse(ERROR_MESSAGES.amountRequired);
        if (!validateSendTransactionType(params.transactionType)) return handleErrorResponse(ERROR_MESSAGES.transactionTypeInvalid);
        return new Promise(function(resolve) {
            if (checkWalletConnection(resolve, "") && params.transactionType) {
                var url = "".concat(walletURL, "?requestType=", "send" /* send */ );
                var childWindow2 = openWalletWindow(url);
                setRequestType("send" /* send */ );
                setChildWindow(childWindow2);
                setTransactionData(params);
                resolvePromise = resolve;
            }
        });
    };
    var checkWalletConnection = function(resolve, transactionType) {
        var status = true;
        var error = null;
        if (networkState.chainId === null || networkState.networkType === "") {
            status = false;
            error = ERROR_MESSAGES.walletNotConnected;
        } else if (transactionType && networkState.networkType === "bitcoin" /* bitcoin */ ) {
            status = false;
            error = ERROR_MESSAGES.transactionTypeInvalid;
        }
        if (!status) {
            resolve({
                status: status,
                result: null,
                error: error
            });
        }
        return status;
    };
    var validateSendTransactionType = function(transactionType) {
        var status = false;
        if (transactionType === "normal" /* normal */ ) {
            status = true;
        } else if (transactionType === "pegin" /* pegin */ ) {
            status = networkState.networkType === "bitcoin" /* bitcoin */ ;
        } else if (transactionType === "pegout" /* pegout */ ) {
            status = networkState.networkType === "sidechain" /* sidechain */ ;
        }
        return status;
    };
    var createasset = function(params) {
        if (!params.transactionType) return handleErrorResponse(ERROR_MESSAGES.transactionTypeRequired);
        if (!params.name) return handleErrorResponse(ERROR_MESSAGES.nameRequired);
        if (!params.symbol) return handleErrorResponse(ERROR_MESSAGES.symbolRequired);
        if (!params.imageUrl) return handleErrorResponse(ERROR_MESSAGES.imageUrlRequired);
        if (!params.supply) return handleErrorResponse(ERROR_MESSAGES.supplyRequired);
        if (params.assetType === void 0 || params.assetType === null) return handleErrorResponse(ERROR_MESSAGES.assetTypeRequired);
        return new Promise(function(resolve) {
            if (params.transactionType && checkWalletConnection(resolve, params.transactionType)) {
                var url = "".concat(walletURL, "?requestType=", "create-asset" /* createAsset */ );
                var childWindow2 = openWalletWindow(url);
                setRequestType("create-asset" /* createAsset */ );
                setChildWindow(childWindow2);
                setCreateAssetData(params);
                resolvePromise = resolve;
            }
        });
    };
    var transferasset = function(params) {
        if (!params.assetId) return handleErrorResponse(ERROR_MESSAGES.assetIdRequired);
        if (!params.receiverAddress) return handleErrorResponse(ERROR_MESSAGES.receiverAddressRequired);
        if (!params.supply) return handleErrorResponse(ERROR_MESSAGES.supplyRequired);
        return new Promise(function(resolve) {
            if (checkWalletConnection(resolve, "transfer")) {
                var url = "".concat(walletURL, "?requestType=", "transfer-asset" /* transferAsset */ );
                var childWindow2 = openWalletWindow(url);
                setRequestType("transfer-asset" /* transferAsset */ );
                setChildWindow(childWindow2);
                setTransferAssetData(params);
                resolvePromise = resolve;
            }
        });
    };
    var sign = function(params) {
        return new Promise(function(resolve) {
            if (checkWalletConnection(resolve, "")) {
                var url = "".concat(walletURL, "?requestType=", "sign" /* sign */ );
                var childWindow2 = openWalletWindow(url);
                setRequestType("sign" /* sign */ );
                setChildWindow(childWindow2);
                setSignData(params);
                resolvePromise = resolve;
            }
        });
    };
    var signTransaction = function(params) {
        return new Promise(function(resolve) {
            if (checkWalletConnection(resolve, "")) {
                var url = "".concat(walletURL, "?requestType=", "sign-transaction" /* signTransaction */ );
                var childWindow2 = openWalletWindow(url);
                setRequestType("sign-transaction" /* signTransaction */ );
                setChildWindow(childWindow2);
                setSignTransactionData(params);
                resolvePromise = resolve;
            }
        });
    };
    var sendTransaction = function(params) {
        return new Promise(function(resolve) {
            if (checkWalletConnection(resolve, "")) {
                var url = "".concat(walletURL, "?requestType=", "send-transaction" /* sendTransaction */ );
                var childWindow2 = openWalletWindow(url);
                setRequestType("send-transaction" /* sendTransaction */ );
                setChildWindow(childWindow2);
                setSignTransactionData(params);
                resolvePromise = resolve;
            }
        });
    };
    var signAndSendTransaction = function(params) {
        return new Promise(function(resolve) {
            if (checkWalletConnection(resolve, "")) {
                var url = "".concat(walletURL, "?requestType=", "sign-and-send-transaction" /* signAndSendTransaction */ );
                var childWindow2 = openWalletWindow(url);
                setRequestType("sign-and-send-transaction" /* signAndSendTransaction */ );
                setChildWindow(childWindow2);
                setSignTransactionData(params);
                resolvePromise = resolve;
            }
        });
    };
    var children = props.children;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(useConnector.Provider, {
        value: {
            walletState: walletState,
            networkState: networkState,
            connect: connect,
            networkInfo: networkInfo,
            disconnect: disconnect,
            send: send,
            createasset: createasset,
            transferasset: transferasset,
            sign: sign,
            signTransaction: signTransaction,
            sendTransaction: sendTransaction,
            signAndSendTransaction: signAndSendTransaction
        },
        children: children
    });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    UseConnectorProvider: UseConnectorProvider,
    useConnector: useConnector
});
//# sourceMappingURL=index.js.map