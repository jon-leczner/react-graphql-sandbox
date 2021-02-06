function newToDoSubscribe(parent, args, context, info) {
  return context.pubsub.asyncIterator("NEW_TODO")
}

const newToDo = {
  subscribe: newToDoSubscribe,
  resolve: payload => {
    return payload
  },
}

module.exports = {
  newToDo
}