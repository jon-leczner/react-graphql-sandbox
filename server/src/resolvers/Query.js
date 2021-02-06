async function feed(parent, args, context, info) {
  // const where = args.filter
  //   ? {
  //       OR: [
  //         { description: { contains: args.filter } },
  //         { url: { contains: args.filter } }
  //       ]
  //     }
  //   : {};

  const toDos = await context.prisma.todo.findMany({
    // where,
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy
  });

  const count = await context.prisma.todo.count();

  return {
    id: 'main-feed',
    toDos,
    count
  };
}

module.exports = {
  feed
};