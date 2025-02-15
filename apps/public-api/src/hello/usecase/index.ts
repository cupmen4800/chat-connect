import type {
  helloEntity,
  helloEntityGetProps,
  helloEntityPostProps,
} from '../domain/model';

export async function getAllHello() {
  return [{id: 'gjMVbFXBQgZ6yu_xMD_gs', name: 'taro'}];
}

export async function getHelloByName(
  props: helloEntityGetProps,
): Promise<helloEntity | null> {
  return {id: 'gjMVbFXBQgZ6yu_xMD_gs', name: 'taro'};
}

export async function createHello(
  props: helloEntityPostProps,
): Promise<helloEntity | null> {
  return {id: 'gjMVbFXBQgZ6yu_xMD_gs', name: 'taro'};
}
