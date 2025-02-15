import { prisma } from '@/prisma/client';
import type {
  helloEntity,
  helloEntityGetProps,
  helloEntityPostProps,
} from '../domain/model';

export async function getAllHello() {
  const hello = await prisma.hello.findMany();
  return hello;
}

export async function getHelloByName(
  props: helloEntityGetProps,
): Promise<helloEntity | null> {
  const hello = await prisma.hello.findUnique({
    where: {
      name: props.name,
    },
  });
  if (!hello) {
    return null;
  }
  return {
    id: hello?.publicId,
    name: hello?.name,
  };
}

export async function createHello(
  props: helloEntityPostProps,
): Promise<helloEntity | null> {
  const hello = await prisma.hello.create({
    data: props,
  });
  return hello;
}
