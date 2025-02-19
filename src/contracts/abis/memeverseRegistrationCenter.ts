export const memeverseRegistrationCenterAbi = [{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_lzEndpoint","type":"address"},{"internalType":"address","name":"_localMemeverseRegistrar","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"target","type":"address"}],"name":"AddressEmptyCode","type":"error"},{"inputs":[],"name":"EmptyOmnichainIds","type":"error"},{"inputs":[],"name":"FailedCall","type":"error"},{"inputs":[{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"InsufficientBalance","type":"error"},{"inputs":[],"name":"InsufficientLzFee","type":"error"},{"inputs":[],"name":"InvalidDelegate","type":"error"},{"inputs":[],"name":"InvalidDurationDays","type":"error"},{"inputs":[],"name":"InvalidEndpointCall","type":"error"},{"inputs":[],"name":"InvalidInput","type":"error"},{"inputs":[],"name":"InvalidLockupDays","type":"error"},{"inputs":[],"name":"InvalidNameLength","type":"error"},{"inputs":[{"internalType":"uint32","name":"omnichainId","type":"uint32"}],"name":"InvalidOmnichainId","type":"error"},{"inputs":[{"internalType":"uint16","name":"optionType","type":"uint16"}],"name":"InvalidOptionType","type":"error"},{"inputs":[],"name":"InvalidSymbolLength","type":"error"},{"inputs":[],"name":"InvalidURILength","type":"error"},{"inputs":[],"name":"LengthMismatch","type":"error"},{"inputs":[],"name":"LzTokenUnavailable","type":"error"},{"inputs":[],"name":"MaxFundNotSetCorrectly","type":"error"},{"inputs":[{"internalType":"uint32","name":"eid","type":"uint32"}],"name":"NoPeer","type":"error"},{"inputs":[{"internalType":"uint256","name":"msgValue","type":"uint256"}],"name":"NotEnoughNative","type":"error"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"OnlyEndpoint","type":"error"},{"inputs":[{"internalType":"uint32","name":"eid","type":"uint32"},{"internalType":"bytes32","name":"sender","type":"bytes32"}],"name":"OnlyPeer","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"inputs":[],"name":"PermissionDenied","type":"error"},{"inputs":[{"internalType":"uint8","name":"bits","type":"uint8"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"SafeCastOverflowedUintDowncast","type":"error"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"SafeERC20FailedOperation","type":"error"},{"inputs":[{"internalType":"uint64","name":"unlockTime","type":"uint64"}],"name":"SymbolNotUnlock","type":"error"},{"inputs":[],"name":"ZeroCreatorAddress","type":"error"},{"inputs":[],"name":"ZeroInput","type":"error"},{"inputs":[],"name":"ZeroUPTAddress","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"uniqueId","type":"uint256"},{"indexed":true,"internalType":"string","name":"symbol","type":"string"}],"name":"CancelRegistration","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint32","name":"eid","type":"uint32"},{"indexed":false,"internalType":"bytes32","name":"peer","type":"bytes32"}],"name":"PeerSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"uniqueId","type":"uint256"},{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"string","name":"uri","type":"string"},{"internalType":"uint256","name":"durationDays","type":"uint256"},{"internalType":"uint256","name":"lockupDays","type":"uint256"},{"internalType":"uint32[]","name":"omnichainIds","type":"uint32[]"},{"internalType":"address","name":"creator","type":"address"},{"internalType":"address","name":"upt","type":"address"}],"indexed":false,"internalType":"struct IMemeverseRegistrationCenter.RegistrationParam","name":"param","type":"tuple"}],"name":"Registration","type":"event"},{"inputs":[],"name":"DAY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"LOCAL_MEMEVERSE_REGISTRAR","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint32","name":"srcEid","type":"uint32"},{"internalType":"bytes32","name":"sender","type":"bytes32"},{"internalType":"uint64","name":"nonce","type":"uint64"}],"internalType":"struct Origin","name":"origin","type":"tuple"}],"name":"allowInitializePath","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"uniqueId","type":"uint256"},{"internalType":"string","name":"symbol","type":"string"}],"name":"cancelRegistration","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endpoint","outputs":[{"internalType":"contract ILayerZeroEndpointV2","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"chainId","type":"uint32"}],"name":"endpointIds","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint32","name":"srcEid","type":"uint32"},{"internalType":"bytes32","name":"sender","type":"bytes32"},{"internalType":"uint64","name":"nonce","type":"uint64"}],"internalType":"struct Origin","name":"","type":"tuple"},{"internalType":"bytes","name":"","type":"bytes"},{"internalType":"address","name":"_sender","type":"address"}],"name":"isComposeMsgSender","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint32","name":"srcEid","type":"uint32"},{"internalType":"bytes32","name":"sender","type":"bytes32"},{"internalType":"uint64","name":"nonce","type":"uint64"}],"internalType":"struct Origin","name":"_origin","type":"tuple"},{"internalType":"bytes32","name":"_guid","type":"bytes32"},{"internalType":"bytes","name":"_message","type":"bytes"},{"internalType":"address","name":"_executor","type":"address"},{"internalType":"bytes","name":"_extraData","type":"bytes"}],"name":"lzReceive","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint32","name":"dstEid","type":"uint32"},{"internalType":"bytes","name":"message","type":"bytes"},{"internalType":"bytes","name":"options","type":"bytes"},{"components":[{"internalType":"uint256","name":"nativeFee","type":"uint256"},{"internalType":"uint256","name":"lzTokenFee","type":"uint256"}],"internalType":"struct MessagingFee","name":"fee","type":"tuple"},{"internalType":"address","name":"refundAddress","type":"address"}],"name":"lzSend","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"maxDurationDays","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxLockupDays","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minDurationDays","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minLockupDays","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"","type":"uint32"},{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"nextNonce","outputs":[{"internalType":"uint64","name":"nonce","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"oAppVersion","outputs":[{"internalType":"uint64","name":"senderVersion","type":"uint64"},{"internalType":"uint64","name":"receiverVersion","type":"uint64"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"eid","type":"uint32"}],"name":"peers","outputs":[{"internalType":"bytes32","name":"peer","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"symbol","type":"string"}],"name":"previewRegistration","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32[]","name":"omnichainIds","type":"uint32[]"},{"internalType":"bytes","name":"message","type":"bytes"}],"name":"quoteSend","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"uint32[]","name":"","type":"uint32[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"registerGasLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"string","name":"uri","type":"string"},{"internalType":"uint256","name":"durationDays","type":"uint256"},{"internalType":"uint256","name":"lockupDays","type":"uint256"},{"internalType":"uint32[]","name":"omnichainIds","type":"uint32[]"},{"internalType":"address","name":"creator","type":"address"},{"internalType":"address","name":"upt","type":"address"}],"internalType":"struct IMemeverseRegistrationCenter.RegistrationParam","name":"param","type":"tuple"}],"name":"registration","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_delegate","type":"address"}],"name":"setDelegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint128","name":"_minDurationDays","type":"uint128"},{"internalType":"uint128","name":"_maxDurationDays","type":"uint128"}],"name":"setDurationDaysRange","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint128","name":"_minLockupDays","type":"uint128"},{"internalType":"uint128","name":"_maxLockupDays","type":"uint128"}],"name":"setLockupDaysRange","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint32","name":"chainId","type":"uint32"},{"internalType":"uint32","name":"endpointId","type":"uint32"}],"internalType":"struct IMemeverseRegistrationCenter.LzEndpointIdPair[]","name":"pairs","type":"tuple[]"}],"name":"setLzEndpointIds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"_eid","type":"uint32"},{"internalType":"bytes32","name":"_peer","type":"bytes32"}],"name":"setPeer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_registerGasLimit","type":"uint256"}],"name":"setRegisterGasLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint256","name":"uniqueId","type":"uint256"}],"name":"symbolHistory","outputs":[{"internalType":"uint256","name":"uniqueId","type":"uint256"},{"internalType":"address","name":"creator","type":"address"},{"internalType":"uint64","name":"unlockTime","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"symbol","type":"string"}],"name":"symbolRegistry","outputs":[{"internalType":"uint256","name":"uniqueId","type":"uint256"},{"internalType":"address","name":"creator","type":"address"},{"internalType":"uint64","name":"unlockTime","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}] as const;