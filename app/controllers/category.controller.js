const db = require('../db/db-connection')
const query = require('../queries/queries')

// Method to get all categories
function getCategories(req, res) {

	let { getCategories } = query.category

	db.query(getCategories, (err, categories) => {

		if (err) return res.status(500).send({ message: `Error from the server getting the categories: ${err}` })
		else if (!categories[0].length) return res.status(404).send({ message: 'Categories not found!' })

		return res.status(200).json({categories: categories[0]})
	})
}

// Method to get a category by his category_id
function getCategory(req, res) {

	let { getOneCategory } = query.category
	let { category_id } = req.params

	db.query(getOneCategory, category_id, (err, category) => {

		if (err) return res.status(500).send({ message: `Error from the server getting the category: ${err}` })
		else if (!category[0].length) return res.status(404).send({ message: 'Category not found!' })

		return res.status(200).json({ category: category[0] })
	})
}

// Method to create a new category
function newCategory(req, res) {

	let { newCategory } = query.category
	let { category_name } = req.body

	db.query(newCategory, category_name, (err, response) => {

		err ? res.status(500).send({ message: `There was an error: ${err.sqlMessage}` }) : res.status(200).send({ message: 'Category successfully created' })

	})
}

// Method to update an existing category
function updateCategory(req, res) {

	let { updateCategory } = query.category
	let { category_id } = req.params
	let { category_name } = req.body

	db.query(updateCategory, [category_id, category_name], (err, response) => {

		if (err) return res.status(500).send({ message: `Error updating the category: ${err}` })

		return res.status(200).send({ message: 'Category successfully updated' })
	})
}

// Method to remove an existing category
function removeCategory(req, res) {

	let { removeCategory } = query.category
	let { category_id } = req.params

	db.query(removeCategory, category_id, (err, response) => {

		if (err) res.status(500).send({ message: `Error removing the category: ${err}` })

		return res.status(200).send({ message: 'Category successfully removed' })
	})
}

function removeCategories(req, res) {

	let { removeCategories } = query.category

	db.query(removeCategories, (err, response) => {

		if (err) res.status(500).send({ message: `Error removing categories: ${err}` })

		return res.status(200).send({ message: 'Categories successfully removed' })
	})
}

module.exports = {
	getCategories,
	getCategory,
	newCategory,
	updateCategory,
	removeCategory,
	removeCategories
}
