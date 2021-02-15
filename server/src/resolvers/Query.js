async function feed(parent, args, context, info) {
    // const where = args.filter
    //   ? {
    //       OR: [
    //         { description: { contains: args.filter } },
    //         { url: { contains: args.filter } }
    //       ]
    //     }
    //   : {};

    const toDos = await context.prisma.toDo.findMany({
        // where,
        skip: args.skip,
        take: args.take,
        orderBy: args.orderBy,
    });

    const count = await context.prisma.toDo.count();

    return {
        id: 'main-feed',
        toDos,
        count,
    };
}

async function users(parent, args, context, info) {
    return await context.prisma.user.findMany();
}

module.exports = {
    feed,
    users,
};
