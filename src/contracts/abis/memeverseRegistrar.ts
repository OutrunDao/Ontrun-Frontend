export const MemeverseRegistrarAbi = [{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_registrationCenter","type":"address"},{"internalType":"address","name":"_memecoinDeployer","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint32","name":"omnichainId","type":"uint32"}],"name":"InvalidOmnichainId","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"inputs":[],"name":"PermissionDenied","type":"error"},{"inputs":[],"name":"ZeroAddress","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"DAY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"chainId","type":"uint32"}],"name":"endpointIds","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"chainId","type":"uint32"}],"name":"getEndpointId","outputs":[{"internalType":"uint32","name":"endpointId","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"memeverseLauncher","type":"address"}],"name":"launcherToUPT","outputs":[{"internalType":"address","name":"UPT","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"string","name":"uri","type":"string"},{"internalType":"uint256","name":"uniqueId","type":"uint256"},{"internalType":"uint64","name":"endTime","type":"uint64"},{"internalType":"uint64","name":"unlockTime","type":"uint64"},{"internalType":"uint32[]","name":"omnichainIds","type":"uint32[]"},{"internalType":"address","name":"creator","type":"address"},{"internalType":"address","name":"upt","type":"address"}],"internalType":"struct IMemeverseRegistrar.MemeverseParam","name":"param","type":"tuple"}],"name":"localRegistration","outputs":[{"internalType":"address","name":"memecoin","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"memecoinDeployer","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"string","name":"uri","type":"string"},{"internalType":"uint256","name":"durationDays","type":"uint256"},{"internalType":"uint256","name":"lockupDays","type":"uint256"},{"internalType":"uint32[]","name":"omnichainIds","type":"uint32[]"},{"internalType":"address","name":"creator","type":"address"},{"internalType":"address","name":"upt","type":"address"}],"internalType":"struct IMemeverseRegistrationCenter.RegistrationParam","name":"param","type":"tuple"},{"internalType":"uint128","name":"","type":"uint128"}],"name":"quoteRegister","outputs":[{"internalType":"uint256","name":"lzFee","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"string","name":"uri","type":"string"},{"internalType":"uint256","name":"durationDays","type":"uint256"},{"internalType":"uint256","name":"lockupDays","type":"uint256"},{"internalType":"uint32[]","name":"omnichainIds","type":"uint32[]"},{"internalType":"address","name":"creator","type":"address"},{"internalType":"address","name":"upt","type":"address"}],"internalType":"struct IMemeverseRegistrationCenter.RegistrationParam","name":"param","type":"tuple"},{"internalType":"uint128","name":"value","type":"uint128"}],"name":"registerAtCenter","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"registrationCenter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint32","name":"chainId","type":"uint32"},{"internalType":"uint32","name":"endpointId","type":"uint32"}],"internalType":"struct IMemeverseRegistrar.LzEndpointIdPair[]","name":"pairs","type":"tuple[]"}],"name":"setLzEndpointIds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_memecoinDeployer","type":"address"}],"name":"setMemecoinDeployer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_registrationCenter","type":"address"}],"name":"setRegistrationCenter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"upt","type":"address"},{"internalType":"address","name":"memeverseLauncher","type":"address"}],"internalType":"struct IMemeverseRegistrar.UPTLauncherPair[]","name":"pairs","type":"tuple[]"}],"name":"setUPTLauncher","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"UPT","type":"address"}],"name":"uptToLauncher","outputs":[{"internalType":"address","name":"memeverseLauncher","type":"address"}],"stateMutability":"view","type":"function"}] as const