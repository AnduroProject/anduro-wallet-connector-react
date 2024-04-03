// src/hooks/useConnector.tsx
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
import React, { useState, useEffect } from "react";
import { jsx } from "react/jsx-runtime";
var useConnector = React.createContext(null);
var resolvePromise = null;
var UseConnectorProvider = function(props) {
    var _useState = _sliced_to_array(useState(null), 2), childWindow = _useState[0], setChildWindow = _useState[1];
    var _useState1 = _sliced_to_array(useState(""), 2), requestType = _useState1[0], setRequestType = _useState1[1];
    var _useState2 = _sliced_to_array(useState({
        transactionType: "",
        amount: 0,
        receiverAddress: "",
        feeRate: 1
    }), 2), transactionData = _useState2[0], setTransactionData = _useState2[1];
    var _React_useState = _sliced_to_array(React.useState(null), 2), requestData = _React_useState[0], setRequestData = _React_useState[1];
    var _React_useState1 = _sliced_to_array(React.useState({
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
        receiverAddress: ""
    }), 2), createAssetData = _React_useState1[0], setCreateAssetData = _React_useState1[1];
    var _React_useState2 = _sliced_to_array(React.useState({
        assetId: 0,
        receiverAddress: "",
        supply: 0
    }), 2), transferAssetData = _React_useState2[0], setTransferAssetData = _React_useState2[1];
    var _React_useState3 = _sliced_to_array(React.useState({
        chainId: null,
        networkType: ""
    }), 2), networkState = _React_useState3[0], setNetworkState = _React_useState3[1];
    var _React_useState4 = _sliced_to_array(React.useState({
        accountPublicKey: "",
        connectionState: "disconnected"
    }), 2), walletState = _React_useState4[0], setWalletState = _React_useState4[1];
    var _useState3 = _sliced_to_array(useState(localStorage.getItem("walletURL") || props.walletURL), 2), walletURL = _useState3[0], setWalletURL = _useState3[1];
    var windowFeatures = "left=1000,top=100,width=370,height=550,fullscreen=yes,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,directories=no, status=no, titlebar=no";
    useEffect(function() {
        if (networkState.chainId === null && requestType !== "disconnect") {
            var url = "".concat(walletURL, "?requestType=networkinfo");
            var targetWindow = window.open(url, "_blank", windowFeatures);
            setChildWindow(targetWindow);
            setRequestType("networkinfo");
        }
    }, [
        networkState
    ]);
    useEffect(function() {
        if (childWindow != null) {
            window.addEventListener("message", handleMessage);
            return function() {
                window.removeEventListener("message", handleMessage);
            };
        }
    }, [
        childWindow
    ]);
    useEffect(function() {
        if (localStorage.getItem("walletURL") && localStorage.getItem("walletURL") !== props.walletURL || localStorage.getItem("walletURL") === null && props.walletURL) {
            localStorage.setItem("walletURL", props.walletURL);
        }
    }, []);
    var handleMessage = function(event) {
        if (event.data.type === "connection-response" /* connectionResponse */ ) {
            if (event.data.status) {
                childWindow.close();
                updateNetworkInformation(event.data.result);
                updateWalletInformation("connected", event.data.result.accountPublicKey);
                resolvePromise({
                    status: true,
                    result: event.data
                });
            } else {
                resolvePromise({
                    status: false,
                    result: event.data
                });
            }
        } else if (event.data.type === "account-not-created" /* accountNotCreated */ ) {
            childWindow.close();
            resolvePromise({
                status: false,
                result: event.data
            });
        } else if (event.data.type === "wallet-loaded" /* walletLoaded */ ) {
            if (event.data.status) {
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
                }
            }
        } else if (event.data.type === "networkinfo-response" /* networkinfoResponse */ ) {
            childWindow.close();
            if (event.data.status) {
                updateNetworkInformation(event.data.result);
                updateWalletInformation("conneted", event.data.result.accountPublicKey);
            }
        } else if (event.data.type === "send-response" /* sendResponse */  || event.data.type === "create-asset-response" /* createAssetResponse */ ) {
            childWindow.close();
            resolvePromise({
                status: event.data.status,
                result: event.data
            });
        } else if (event.data.type === "disconnect-response" /* disconnectResponse */ ) {
            childWindow.close();
            updateNetworkInformation({
                chainId: null,
                networkType: ""
            });
            updateWalletInformation("disconnected", "");
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
                    new Promise(function(resolve, reject) {
                        var url = "".concat(walletURL, "?requestType=connect");
                        var childWindow2 = window.open(url, "_blank", windowFeatures);
                        setWalletURL(walletURL);
                        setRequestType("connect");
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
    var disconnect = function() {
        return new Promise(function(resolve, reject) {
            var url = "".concat(walletURL, "?requestType=disconnect");
            var childWindow2 = window.open(url, "_blank", windowFeatures);
            setRequestType("disconnect");
            setChildWindow(childWindow2);
            updateWalletInformation("disconnecting", "");
            resolvePromise = resolve;
        });
    };
    var send = function(params) {
        return new Promise(function(resolve, reject) {
            if (checkWalletConnection(resolve, "")) {
                var validateTransactionTypeResult = validateSendTransactionType(params.transactionType);
                if (!validateTransactionTypeResult) {
                    resolve({
                        status: false,
                        error: "can't process your request, Invalid transaction type",
                        result: null
                    });
                    return;
                }
                var url = "".concat(walletURL, "?requestType=send");
                var childWindow2 = window.open(url, "_blank", windowFeatures);
                setRequestType("send");
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
            error = "The wallet is not connected.";
        } else if (transactionType && networkState.networkType === "bitcoin" /* bitcoin */ ) {
            status = false;
            error = "can't process your request, Invalid transaction type.";
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
        return new Promise(function(resolve, reject) {
            if (checkWalletConnection(resolve, params.transactionType)) {
                var url = "".concat(walletURL, "?requestType=create-asset");
                var childWindow2 = window.open(url, "_blank", windowFeatures);
                setRequestType("create-asset");
                setChildWindow(childWindow2);
                setCreateAssetData(params);
                resolvePromise = resolve;
            }
        });
    };
    var transferasset = function(params) {
        return new Promise(function(resolve, reject) {
            if (checkWalletConnection(resolve, "transfer")) {
                var url = "".concat(walletURL, "?requestType=transfer-asset");
                var childWindow2 = window.open(url, "_blank", windowFeatures);
                setRequestType("transfer-asset");
                setChildWindow(childWindow2);
                setTransferAssetData(params);
                resolvePromise = resolve;
            }
        });
    };
    var children = props.children;
    return /* @__PURE__ */ jsx(useConnector.Provider, {
        value: {
            walletState: walletState,
            networkState: networkState,
            connect: connect,
            disconnect: disconnect,
            send: send,
            createasset: createasset,
            transferasset: transferasset
        },
        children: children
    });
};
export { UseConnectorProvider, useConnector };
//# sourceMappingURL=index.mjs.map