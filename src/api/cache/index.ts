import mem from 'mem';
import { getPrices, getPrice, getOffers, getOffer } from '../providers/price-engine';

const memConig: any = {
  maxAge: 1000 * 60 * 5
}

export const memPrices = mem(getPrices, memConig);
export const memPrice = mem(getPrice, memConig);

export const memOffers = mem(getOffers, memConig);
export const memOffer = mem(getOffer, memConig);

export const getPricesFromCache = async (sku: string, currency: string = 'SGD') => {
  const skuFm = sku.toUpperCase().trim();
  const currencyFm = currency.toUpperCase().trim();
  return await memPrices(skuFm, currencyFm);
}

export const getOffersFromCache = async (sku: string, currency: string = 'SGD') => {
  const skuFm = sku.toUpperCase().trim();
  const currencyFm = currency.toUpperCase().trim();
  return await memOffers(skuFm, currencyFm);
}

export const getPriceFromCache = async (sku: string, size: string, currency: string = 'SGD') => {
  const skuFm = sku.toUpperCase().trim();
  const currencyFm = currency.toUpperCase().trim();
  const sizeFm = size.toUpperCase().trim();
  const data = await memPrices(skuFm, currencyFm);
  return data.find((e: any) => Number(e.size) === Number(sizeFm));
}

export const getOfferFromCache = async (sku: string, size: string, currency: string = 'SGD') => {
  const skuFm = sku.toUpperCase().trim();
  const currencyFm = currency.toUpperCase().trim();
  const sizeFm = size.toUpperCase().trim();
  const data = await memOffers(skuFm, currencyFm);
  return data.find((e: any) => Number(e.size) == Number(sizeFm));
}