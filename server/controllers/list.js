const List = require("../models/List");
const asyncHandler = require("express-async-handler");

//add a list to the collection
//Route POST /list/addList
exports.addList = asyncHandler(async (req, res, next) => {
	let list = req.body;
	list.id = req.user.id;
	List.create(list).then(function (list) {
		res.send(list);
	});
});

//remove a list from the collection by id parameter
//Route DELETE /list/removeList/:id
exports.removeList = asyncHandler(async (req, res, next) => {
	try {
		const list = await List.findById(req.params.id);
		await list.remove();
		res.send({ data: true });
	} catch {
		res.status(404).send({ error: "List not found" });
	}
});

//edit a list in the collection
//Route PATCH /list/updateList/:id
exports.updateList = asyncHandler(async (req, res, next) => {
	try {
		const list = await List.findById(req.params.id);
		Object.assign(list, req.body);
		list.save();
		res.send({ data: list });
	} catch {
		res.status(404).send({ error: "List not found" });
	}
});

//find the lists by userId
//Route GET /list/findList
exports.findList = asyncHandler(async (req, res, next) => {
	try {
		const lists = await List.find({ userId: req.user.id }).populate("products");
		res.send({ data: lists });
	} catch (err) {
		console.log(err);
		res.status(404).send({ error: "List not found" });
	}
});
