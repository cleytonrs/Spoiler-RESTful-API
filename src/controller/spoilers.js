const Spoiler = require('../model/spoiler');
const Status = require('http-status');

exports.findOne = (request, response, next) => {
    const id = request.params.id

    Spoiler.findByPk(id).then((spoiler) => {
        if (spoiler) {
            response.send(spoiler);
        } else {
            response.status(Status.NOT_FOUND).send();
        }
    }).catch((error) => next(error));

}

exports.findAll = (request, response, next) => {
    let limit = parseInt(request.query.limit || 0)
    let page = parseInt(request.query.page || 0)

    if (!Number.isInteger(limit) || !Number.isInteger(page)) {
        response.status(Status.BAD_REQUEST).send()
    }

    const ITEMS_PER_PAGE = 10

    limit = limit > ITEMS_PER_PAGE || limit <= 0 ? ITEMS_PER_PAGE : limit
    page = page <= 0 ? 0 : page * limit

    Spoiler.findAll({ limit: limit, offset: page }).then((spoilers) => {
        if (spoilers && spoilers.length) {
            response.send(spoilers)
        } else {
            response.status(Status.NOT_FOUND).send()
        }
    }).catch((error) => next(error))

}

exports.create = (request, response, next) => {
    const title = request.body.title
    const author = request.body.author
    const description = request.body.description

    Spoiler.create({
        title: title,
        author: author,
        description: description
    }).then(() => {
        response.status(Status.CREATED).send()
    }).catch((error) => next(error))

}

exports.update = (request, response, next) => {
    const id = request.params.id   
    const title = request.body.title
    const author = request.body.author
    const description = request.body.description

    Spoiler.findByPk(id).then((spoiler) => {
        if (spoiler) {
            Spoiler.update({
                title: title,
                author: author,
                description: description
            }, { where: { id: id } }).then(() => {
                response.send()
            }).catch((error) => next(error))
        } else {
            response.status(Status.NOT_FOUND).send()
        }
    }).catch((error) => next(error))

}

exports.delete = (request, response, next) => {
    const id = request.params.id

    Spoiler.findByPk(id).then((spoiler) => {
        if (spoiler) {
            Spoiler.destroy({
                where: { id: id }
            }).then(() => {
                response.send()
            }).catch((error) => next(error))
        } else {
            response.status(Status.NOT_FOUND).send()
        }
    }).catch((error) => next(error))
    
}