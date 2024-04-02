"use strict";
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
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
// src/config/WalletConfig.ts
var WALLETURL = "http://localhost:5002";
// src/hooks/useConnector.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var useConnector = import_react.default.createContext(null);
var UseConnectorProvider = function(props) {
    var _ref = _sliced_to_array((0, import_react.useState)(null), 2), childWindow = _ref[0], setChildWindow = _ref[1];
    var _ref1 = _sliced_to_array((0, import_react.useState)(""), 2), requestType = _ref1[0], setRequestType = _ref1[1];
    var _ref2 = _sliced_to_array((0, import_react.useState)(false), 2), isConnected = _ref2[0], setIsConnected = _ref2[1];
    var _ref3 = _sliced_to_array((0, import_react.useState)({
        transactionType: "",
        amount: 0,
        receiverAddress: "",
        feeRate: 1,
        onComplete: null
    }), 2), transactionData = _ref3[0], setTransactionData = _ref3[1];
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
    var _import_react_default_useState3 = _sliced_to_array(import_react.default.useState({
        chainId: null,
        networkType: ""
    }), 2), networkState = _import_react_default_useState3[0], setNetworkState = _import_react_default_useState3[1];
    var _import_react_default_useState4 = _sliced_to_array(import_react.default.useState({
        accountPublicKey: "",
        connectionState: "disconnected"
    }), 2), walletState = _import_react_default_useState4[0], setWalletState = _import_react_default_useState4[1];
    var windowFeatures = "left=1000,top=100,width=370,height=550,fullscreen=yes,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,directories=no, status=no, titlebar=no";
    (0, import_react.useEffect)(function() {
        if (networkState.chainId === null && childWindow === null && !isConnected) {
            var url = "".concat(WALLETURL, "?requestType=networkinfo");
            var targetWindow = window.open(url, "_blank", windowFeatures);
            setChildWindow(targetWindow);
            setRequestType("networkinfo");
        }
    }, [
        networkState,
        isConnected
    ]);
    (0, import_react.useEffect)(function() {
        console.log("isConnectedeeeee1111", isConnected);
        if (childWindow.closed) {
            console.log("its ******* came");
        }
        if (childWindow != null) {
            console.log("close");
            childWindow.addEventListener("close", handleWindowClose);
            window.addEventListener("message", handleMessage);
            return function() {
                childWindow.removeEventListener("close", handleWindowClose);
                window.removeEventListener("message", handleMessage);
            };
        }
    }, [
        childWindow,
        isConnected
    ]);
    var handleWindowClose = function() {
        alert("Window closed");
    };
    var handleMessage = function(event) {
        console.log("Message Received", event.data);
        if (event.data.type === "connection-response" /* connectionResponse */ ) {
            if (event.data.status) {
                childWindow.close();
                setTimeout(function() {
                    setIsConnected(true);
                });
                console.log("isconnected2222", isConnected);
                updateNetworkInformation(event.data.result);
                requestData.onComplete(event.data);
                console.log("test22222");
                console.log("isconnected22221111", isConnected);
                updateWalletInformation("connected", event.data.result.accountPublicKey);
            } else {
                requestData.onComplete(event.data);
            }
        } else if (event.data.type === "account-not-created" /* accountNotCreated */ ) {
            childWindow.close();
            requestData.onComplete(event.data);
        } else if (event.data.type === "wallet-loaded" /* walletLoaded */ ) {
            if (event.data.status) {
                if (requestType === "connect" /* connect */  || requestType === "disconnected" /* disconnected */ ) {
                    sendMessageToChildWindow({
                        requestType: requestType,
                        siteurl: window.location.origin,
                        chainId: requestData.chainId
                    });
                    console.log("test1");
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
                }
            }
        } else if (event.data.type === "networkinfo-response" /* networkinfoResponse */ ) {
            childWindow.close();
            if (event.data.status) {
                updateNetworkInformation(event.data.result);
            }
        } else if (event.data.type === "send-response" /* sendResponse */  || event.data.type === "create-asset-response" /* createAssetResponse */  || event.data.type === "disconnect-response" /* disconnectResponse */ ) {
            childWindow.close();
            if (transactionData.onComplete) {
                transactionData.onComplete(event.data);
            } else if (createAssetData.onComplete) {
                createAssetData.onComplete(event.data);
            }
            if (event.data.type === "disconnect-response") {
                updateWalletInformation("disconnected", "");
            }
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
    var connect = function(params) {
        return new Promise(function(resolve, reject) {
            var url = "".concat(WALLETURL, "?requestType=connect");
            var childWindow2 = window.open(url, "_blank", windowFeatures);
            setRequestType("connect");
            setChildWindow(childWindow2);
            console.log("datares4", params);
            setRequestData({
                chainId: params.chainId,
                onComplete: params.onComplete
            });
            updateWalletInformation("connecting", "");
            console.log("datares1", params);
            console.log("isconnected", isConnected);
        });
    };
    var disconnect = function() {
        var url = "".concat(WALLETURL, "?requestType=disconnect");
        var childWindow2 = window.open(url, "_blank", windowFeatures);
        setRequestType("disconnect");
        setChildWindow(childWindow2);
        updateWalletInformation("disconnecting", "");
    };
    var getNetworkInformation = function() {
        return networkState;
    };
    var getWalletInformation = function() {
        return walletState;
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
            var url = "".concat(WALLETURL, "?requestType=send");
            var childWindow2 = window.open(url, "_blank", windowFeatures);
            setRequestType("send");
            setChildWindow(childWindow2);
            setTransactionData(params);
        }
    };
    var checkWalletConnection = function(onError, transactionType) {
        var status = true;
        var error = null;
        if (networkState.chainId === null || networkState.networkType === "") {
            status = false;
            error = "The wallet is not connected.";
        } else if (transactionType && networkState.networkType === "bitcoin" /* bitcoin */ ) {
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
        if (checkWalletConnection(params.onComplete, params.transactionType)) {
            var url = "".concat(WALLETURL, "?requestType=create-asset");
            var childWindow2 = window.open(url, "_blank", windowFeatures);
            setRequestType("create-asset");
            setChildWindow(childWindow2);
            setCreateAssetData(params);
        }
    };
    var transferasset = function(params) {
        if (checkWalletConnection(params.onComplete, "transfer")) {
            var url = "".concat(WALLETURL, "?requestType=transfer-asset");
            var childWindow2 = window.open(url, "_blank", windowFeatures);
            setRequestType("transfer-asset");
            setChildWindow(childWindow2);
            setTransferAssetData(params);
        }
    };
    var children = props.children;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(useConnector.Provider, {
        value: {
            walletState: walletState,
            networkState: networkState,
            connect: connect,
            disconnect: disconnect,
            send: send,
            createasset: createasset,
            transferasset: transferasset,
            isConnected: isConnected
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