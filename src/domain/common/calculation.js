
export default {
  // 乘法计算
  multiplication () {
    return (
      [...arguments].reduce((pre, cur, i) => {
        return pre *= (+cur)
      }, 1)
      || null
    )
  },
  // 货价（货值） 卖方单价*卖方数量
  sellerGoodsValue (sellerPrice, sellerQuantity) {
    return sellerPrice * sellerQuantity || ""
  },
  // 运费 货价*运费费率
  freight (sellerPrice, sellerQuantity, freightRate) {
    return this.sellerGoodsValue(sellerPrice, sellerQuantity) * freightRate || "";
  },
  // 保费 （货价+运费)*保费费率
  premium (sellerPrice, sellerQuantity, freightRate, premiumRate) {
    return (this.sellerGoodsValue(sellerPrice, sellerQuantity) + this.freight(sellerPrice, sellerQuantity, freightRate)) * this.premiumRate || ""
  },
  // 杂费 货价*杂费费率
  extras (sellerPrice, sellerQuantity, extrasRate) {
    return this.sellerGoodsValue(sellerPrice, sellerQuantity) * this.extrasRate || "";
  },
  // 运保杂费额 保费+杂费+运费
  costAmount (freight, premium, extras) {
    return (freight || 0) + (premium || 0) + (extras || 0) || "";
  },
  // 完税价格 参考不同情况下不同计算方式
  dutyPaidPrice (entrustOrderType, dealMode, sellerGoodsValue, freight, premium, extras, customsExchangeRate) {
    if (entrustOrderType && dealMode) {
      if (entrustOrderType == "1") {
        if (
          dealMode == "1" ||
          dealMode == "2" ||
          dealMode == "3" ||
          dealMode == "4"
        ) {
          return (
            Math.round(
              (sellerGoodsValue || 0) +
              (freight || 0) +
              (premium || 0) +
              (extras || 0)) *
            customsExchangeRate
            || ""
          );
        } else {
          return (
            Math.round(
              sellerGoodsValue * customsExchangeRate
            ) || ""
          );
        }
      }
      if (entrustOrderType == "2") {
        if (
          dealMode == "1" ||
          dealMode == "2" ||
          dealMode == "3" ||
          dealMode == "4"
        ) {
          return (
            Math.round(
              (sellerGoodsValue || 0) -
              (freight || 0) -
              (premium || 0) -
              (extras || 0)) *
            customsExchangeRate
            || ""
          );
        } else {
          return (
            Math.round(
              sellerGoodsValue * customsExchangeRate
            ) || ""
          );
        }
      }
    } else {
      return "";
    }
  },
  /* 以下收款单的计算 */
  // 折本位币 = 币种 + 汇率
  baseCurrency (currency = 0, exchangeRate = 0) {
    return this.multiplication(currency, exchangeRate)
  },
  // 原币金额 = 收款金额 * 原币结算汇率
  originalMoneyAmount (x, y) {
    return this.multiplication(x, y)
  }
}