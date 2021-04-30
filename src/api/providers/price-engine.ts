import axios from "axios"

const PRICE_ENGINE_URL = process.env.PRICE_ENGINE_URL || 'https://pricing.oxstreet.com/api';

const ROW_LENGTH = 10;
const fillStr = (str: string): string => ' '.repeat(ROW_LENGTH - str.length) + str;

export const formatResultTable = (data: Array<any>) => {
  return data.map(e => fillStr(e.size) + fillStr(e.oxstreet) + fillStr(e.goat) + fillStr(e.stockx)).join('\n');
}

export const getPrices = async (sku: string, currency: string = '') => {
  const url = `${PRICE_ENGINE_URL}/${sku.toUpperCase()}/prices${currency ? `?currency=${currency.toUpperCase()}`: ``}`;
  console.log(`calling url ${url}`);
  const { data } = await axios.get(url);
  console.log('result data', data);
  return data;
}

export const getOffers = async (sku: string, currency: string = '') => {
  const url = `${PRICE_ENGINE_URL}/${sku.toUpperCase()}/offers${currency ? `?currency=${currency.toUpperCase()}`: ``}`;
  console.log(`calling url ${url}`);
  const { data } = await axios.get(url);
  console.log('result data', data);
  return data;
}


export const getPrice = async (sku: string, size: string, currency: string = '') => {
  const url = `${PRICE_ENGINE_URL}/${sku.toUpperCase()}/${size}/price${currency ? `?currency=${currency.toUpperCase()}`: ``}`;
  console.log(`calling url ${url}`);
  const { data } = await axios.get(url);
  console.log('result data', data);
  return data;
}

export const getOffer = async (sku: string, size: string, currency: string = '') => {
  const url = `${PRICE_ENGINE_URL}/${sku.toUpperCase()}/${size}/offer${currency ? `?currency=${currency.toUpperCase()}`: ``}`;
  console.log(`calling url ${url}`);
  const { data } = await axios.get(url);
  console.log('result data', data);
  return data;
}