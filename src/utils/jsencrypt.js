/*****
 * RSA加密解密工具类
 * **/
import { JSEncrypt } from 'jsencrypt' // 导入
// 公钥
const publicKey = '-----BEGIN PUBLIC KEY----- MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu1jvn8dje6IiKnBk7hlE pUtkIXkTxLnIrvMSKvc4PqqJAya2wppXx+KVlDWF+FfGOscNiTBsPSZpR/IdNsiR 7K0sm3xECfvAcMxkX+Azlc7OBzKb9+dzRpnq8DhKo8O4NDlijewHjZbs4HXJQyD/ Ct15au/sEcvrgPRPVAe4px3XgONnZFovqQC8628VW+NmTm4NZGceX1ayfDjF2ExT XfGKKDWmBcvqGYgaKpi1CiP1IkMaxXRYHiFrz3cdTiExXDjudTxnNatP0FzZIoXs ezz+ckF6nLd2s0dmC+gATc283kLtGsW9kuZBH/Ud3xlRdcsZqkRHnwa+RpEGbB0O AwIDAQAB -----END PUBLIC KEY-----'
// 私钥
const privateKey = 'QglzIsNE5Kci5AaxZDRQSPQAL96mXDLCi4CmMSkXQHjjNw5Xc1hknXg8lLO0NbnSr5FmUufxNXv2YGnYT12Syn+Oz3jrcjixYt/PuWWnjI8GajHwTjz30cgW2BKhWQtxE3+WBQPiT9MrJlc5K6YgLpe0kQnUJL68r4VxzZjCXv7LZPYUizmmAzN27L1/cUd37CSie3BFSl6YY1xqb/MSQRdDFzxVQi9OHJLCpMm6o8epTlkPg577veRUwOafW/AORIDObtMC3/A2KeRQRlvhPRkBSulqjNhJxaxGatAvK4JE5RDebHhApnCIlzUK9K9Gqm7IJpEASVt7aLqm2/kUdg=='

export default {
  // 加密
  encrypt: (txt) => {
    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(publicKey); // 设置公钥
    return encryptor.encrypt(txt); // 对需要加密的数据进行加密
  },

  // 解密
  decrypt: (txt) => {
    const encryptor = new JSEncrypt();
    encryptor.setPrivateKey(privateKey);
    return encryptor.decrypt(txt);
  }
}