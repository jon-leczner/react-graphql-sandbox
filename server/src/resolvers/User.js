function toDos(parent, args, context) {
  return context.prisma.user
    .findUnique({ where: { id: parent.id } })
    .toDos();
}

module.exports = {
  toDos
};
