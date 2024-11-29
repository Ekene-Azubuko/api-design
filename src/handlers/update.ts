import { connect } from "http2";
import prisma from "../db";

export const getOneUpdate = async (req, res) => {
    const update = await prisma.update.findUnique({
        where: {
            id: req.params.id
        }
    })

    res.json({ data: update });
};
export const getUpdates = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    },[])

    res.json({ data: updates });
};
export const createUpdate = async (req, res) => {
    const product = await prisma.product.findUnique({
        where: {
            id: req.body.productId
        }
    })

    if (!product) {
        res.status(404);
        res.json({ message: 'Product not found' });
        return;
    }

    const update = await prisma.update.create({
        // data: req.body
        data:{
            product: {connect: {id: req.body.productId}},
            title: req.body.title,
            body: req.body.body,
        }
    });

    res.json({ data: update });
};
export const updateUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    });

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    },[])

    const match = updates.find(update => update.id === req.params.id);

    if (!match) {
        res.status(404);
        res.json({ message: 'Update not found' });
        return;
    }

    const updatedUpdate = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    });

    res.json({ data: updatedUpdate });
};

export const deleteUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    });

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    },[])

    const match = updates.find(update => update.id === req.params.id);

    if (!match) {
        res.status(404);
        res.json({ message: 'Update not found' });
        return;
    }

    const deleted = await prisma.update.delete({
        where: {
            id: req.params.id
        }
    });

    res.json({ data: deleted });
};