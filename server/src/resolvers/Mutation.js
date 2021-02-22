const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET } = require('../utils');

function post(parent, args, context, info) {
    const { userId } = context;

    const newToDo = context.prisma.toDo.create({
        data: {
            description: args.description,
            postedBy: { connect: { id: userId } },
        },
    });
    context.pubsub.publish('NEW_TODO', newToDo);

    return newToDo;
}

function updateToDo(parent, args, context, info) {
    const { userId } = context;

    console.log(args);

    const updatedToDo = context.prisma.toDo.update({
        where: {
            id: args.id,
        },
        data: { ...args.input },
    });

    return updatedToDo;
}

async function signup(parent, args, context, info) {
    const password = await bcrypt.hash(args.password, 10);
    const user = await context.prisma.user.create({
        data: { ...args, password },
    });

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
        token,
        user,
    };
}

async function login(parent, args, context, info) {
    const user = await context.prisma.user.findUnique({
        where: { email: args.email },
    });
    if (!user) {
        throw new Error('No such user found');
    }

    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
        throw new Error('Invalid password');
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
        token,
        user,
    };
}

module.exports = {
    post,
    updateToDo,
    signup,
    login,
};
