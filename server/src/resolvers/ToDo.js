function postedBy(parent, args, context) {
    return context.prisma.toDo
        .findUnique({ where: { id: parent.id } })
        .postedBy();
}

module.exports = {
    postedBy,
};
