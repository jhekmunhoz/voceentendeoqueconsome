import { prepareImportedPackage } from './imported-packages.js';

export async function preparePackage(product) {
  return prepareImportedPackage(product);
}
